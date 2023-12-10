import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

//routes import
import testRoutes from './routes/testRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js';

//environment variables
dotenv.config();
const PORT = process.env.PORT || 5050

//database connection
connectDB();

//rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
app.use(cookieParser());

//route
app.use('/api/v1', testRoutes)
app.use('/api/v1/user', userRoutes)

app.get('/api/v1', (req, res) =>{
    res.status(200).send('Welcome');
})


app.listen(PORT, () => console.log(`Server listening on ${PORT}`.bgMagenta));