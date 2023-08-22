import prisma from "@/lib/prisma";
import { verifyJwt } from '@/lib/jwt';

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const accessToken = req.headers.authorization;
    if (accessToken===process.env.USER_ACCESS_TOKEN || verifyJwt(accessToken)?.isAdmin == true) {
      const users = await prisma.user.findMany();
      var usernameList = [];
      users.forEach(user => {
        const { password, letters, ...userWithoutPassword } = user;
        usernameList.push(userWithoutPassword);
      });
      return res.status(200).json(usernameList);
    } else {
      return res.status(401).json('unauthorized user');
    }
  } else {
    return res.status(400).json('unsupported method')
  }
}