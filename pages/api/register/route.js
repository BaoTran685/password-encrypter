import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import generateLetter from '../function/generateLetter';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const accessToken = req.headers.authorization;
    if (accessToken && verifyJwt(accessToken)?.isAdmin == true) {
      const body = req.body;
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: await bcrypt.hash(body.password, 10),
          letters: generateLetter()
        }
      });
      const { password, lettesrs, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } else {
      return res.status(401).json('unauthorized user');
    }
  } else {
    return res.status(400).json('unsupported method')
  }
}