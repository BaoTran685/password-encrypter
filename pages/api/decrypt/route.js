import textProcess from "../function/process";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import requestIp from 'request-ip';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(8, "10s"),
  ephemeralCache: new Map(),
  analytics: true,
});
export default async function handler(req, res) {
  if (req.method == 'POST') {
    const ip = requestIp.getClientIp(req);
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const now=Date.now();
      const retryAfter=Math.floor((reset-now)/1000);
      return res.status(429).json(retryAfter);
    } else {
      const accessToken = req.headers.authorization;
      const { text, number } = req.body;
      const data = await textProcess(text, parseInt(number), 0, accessToken);
      return res.status(200).json(data);
    }
    
  } else {
    return res.status(400).json('unsupported method');
  }
}