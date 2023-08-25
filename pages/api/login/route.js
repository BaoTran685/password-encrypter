import { signJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const credentialsAccessToken=req.headers.authorization;
    if (credentialsAccessToken!=process.env.CREDENTIALS_TOKEN) {
      return res.status(401).json('unauthorized route')
    }

    const body = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      }
    })
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, letters, ...userWithoutPassword } = user;
      const accessToken = signJwt(userWithoutPassword);
      const result = {
        ...userWithoutPassword, accessToken
      }
      return res.status(200).json(result);
    } else {
      return res.status(401).json(null);
    }
  } else {
    return res.status(400).json('unsupported method')
  }
}