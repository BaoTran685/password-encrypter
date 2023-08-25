import randomNumber from "@/func/randomNumber";
import initData from "../function/init";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import requestIp from 'request-ip';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(10, "10s"),
  ephemeralCache: new Map(),
  analytics: true,
});

const process = async (len, accessToken) => {
  var { list } = await initData(randomNumber(0, 10000), 0, accessToken);
  var result = "";
  var k = list.length;
  for (let i = 0; i < len; i++) {
    var n = randomNumber(0, k - 1);
    result += list[n];
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const ip = requestIp.getClientIp(req);
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const now=Date.now();
      const retryAfter=Math.floor((reset-now)/1000);
      return res.status(429).json(retryAfter);
    }
    else {
      const { number } = req.body;
      const accessToken = req.headers.authorization;
      const text = await process(parseInt(number), accessToken);
      return res.status(200).json(text);
    }
  } else {
    return res.status(400).json('unsupported method');
  }
}