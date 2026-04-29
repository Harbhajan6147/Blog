import express from 'express'
import { config } from 'dotenv';
config();
import cors from 'cors'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRouter from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

console.log(process.env.GOOGLE_API_KEY);

connectDB()

app.use(cors())
app.use(express.json())



app.use('/api/auth', authRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
 
const PORT = process.env.PORT || 3000;
console.log("PORT: ", PORT);

app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT)
})

export default app;