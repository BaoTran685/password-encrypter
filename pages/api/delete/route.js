import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const accessToken=req.headers.authorization;
    if (accessToken && verifyJwt(accessToken)?.isAdmin==true) {
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
    
  } else {
    return res.status(400).json('unsupported method');
  }
}