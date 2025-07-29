import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

import tokenRoute from './routes/token.js';
import userinfoRoute from './routes/userinfo.js';
import UserDataRoute from "./routes/users.js"

const app = express();
const prisma = new PrismaClient();
app.set('prisma', prisma); 



app.use(cors(
    {
        origin: 'http://localhost:3000', 
        credentials: true
    }
));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/token', tokenRoute);
app.use('/api/userinfo', userinfoRoute);
app.use('/api/users',UserDataRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));