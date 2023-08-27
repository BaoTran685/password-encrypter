import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";
import { redis } from '@/lib/redis';

import sumNumber from "./sum";

export default async function initData(number, type, accessToken) {
  var l = process.env.DATA_LENGTH;
  var n = (sumNumber(number) * (parseInt(process.env.SECRET_LENGTH) + number)) % l;
  const logIn = verifyJwt(accessToken);

  const getData = async () => {
    if (logIn) {
      const cachedData = await redis.get(`${logIn.id}-${n}`);
      if (cachedData) {
        return cachedData;
      } else {
        const data = await prisma.user.findUnique({
          where: {
            id: logIn.id
          }
        });
        const { letters } = data;
        const ls = letters[n];
        await redis.set(`${logIn.id}-${n}`, ls);
        return ls;
      }
    } else {
      const cachedData = await redis.get(`DATA_FOR_USER-${n}`);
      if (cachedData) {
        return cachedData;
      } else {
        const data = await prisma.data.findMany();
        const { letters } = data[0];
        const ls = letters[n];
        await redis.set(`DATA_FOR_USER-${n}`, ls);
        return ls;
      }
    }
  }
  const listGot = await getData();
  console.log(listGot);
  var list = listGot.split('');
  if (type == 0) {
    list.reverse();
  }
  var k = list.length;
  var dict = {};
  for (let i = 0; i < k; i++) {
    dict[list[i]] = i;
  }
  return { list, dict };
}