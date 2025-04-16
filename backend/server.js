
import express from 'express';
import dotenv from 'dotenv';
// import authRoutes from './routes/auth.routes.js';
import AppError from './src/utils/appError.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import taskRoutes from './src/routes/task.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import connectDB from './src/configs/db.js';


// configs
dotenv.config();
const server = express();

// database connection
connectDB()
    .then(() => {
        console.log('Database connection successful...');
    })
    .catch(err => {
        console.log(err);
    });

// cors middleware
server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

// express middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));



// routes 
server.use('/api/v1/tasks', taskRoutes);
server.use('/api/v1/auth', authRoutes);

// Route Handler for Undefined Routes
// server.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req?.originalUrl} on this server!`, 404));
// });

// server.use(globalErrorHandler);


// server listening
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});