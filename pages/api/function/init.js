import prisma from "@/lib/prisma";
import sumNumber from "./sum";
import { verifyJwt } from "@/lib/jwt";

export default async function initData(number, type, accessToken) {
  var l = process.env.DATA_LENGTH;
  var n = (sumNumber(number) * (parseInt(process.env.SECRET_LENGTH) + number)) % l;
  const logIn = verifyJwt(accessToken);

  const getData = async () => {
    if (logIn) {
      const data = await prisma.user.findUnique({
        where: {
          id: logIn.id
        }
      });
      return data;
    } else {
      const data = await prisma.data.findMany();
      return data[0];
    }
  }
  const { letters } = await getData();
  var list = letters[n].split('');

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