import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import requestIp from 'request-ip';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(2, "60s"),
  ephemeralCache: new Map(),
  analytics: true,
});

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const ip = requestIp.getClientIp(req);
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const now = Date.now();
      const retryAfter = reset - now;
      return res.status(429).json(retryAfter);
    } else {
      const accessToken = req.headers.authorization;
      if (accessToken && verifyJwt(accessToken)?.isAdmin == true) {
        const { list } = req.body;
        var users = [];
        for (let i = 0; i < list.length; i++) {
          const user = await prisma.user.delete({
            where: {
              id: list[i]
            }
          })
          const { password, letters, isAdmin, ...userWithoutPassword } = user;
          users.push(userWithoutPassword);
        }
        return res.status(200).json(users);
      } else {
        return res.status(401).json('unauthorized user');
      }
    }
  } else {
    return res.status(400).json('unsupported method');
  }
}