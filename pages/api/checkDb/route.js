import prisma from "@/lib/prisma";
import * as bcrypt from 'bcrypt';
import generateLetter from "../function/generateLetter";

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const admin = await prisma.user.findUnique({
      where: {
        username: process.env.ADMIN_USERNAME
      }
    });
    const data = await prisma.data.findMany();
    if (data.length === 0) {
      const source_data = await prisma.data.create({
        data: {
          letters: generateLetter()
        }
      })
    }
    if (admin === null) {
      await prisma.user.create({
        data: {
          username: process.env.ADMIN_USERNAME,
          password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
          isAdmin: true,
          letters: generateLetter()
        }
      });
    } 
    return res.status(200).json('all set up');
  } else {
    return res.status(400).json('unsupported method');
  }
}