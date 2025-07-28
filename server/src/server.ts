import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import helmet from '@fastify/helmet';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();
const app = Fastify();

app.register(cors);
app.register(helmet);

app.get('/', async (req, reply) => {
  return { status: 'OneCitizen backend is live 🚀' };
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});
