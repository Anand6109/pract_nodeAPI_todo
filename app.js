import express from 'express';
import { router as userRouter } from './routes/user.js';
import { router as taskRouter } from './routes/task.js';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";

const 
app = express();

config({
    path: "./data/config.env"
});


app.use(cookieParser());
// Middleware for parsing application/json
app.use(express.json());
app.use(cors());

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// Mount the task router on the /task path
app.use("/task", taskRouter);

export { app };
