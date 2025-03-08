import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import connectDb from './db/connect.js';
import jobRouter from './routes/jobs.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/auth.js';
import path from 'path';
import cloudinary from 'cloudinary';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.static(path.join(import.meta.dirname, 'client', 'dist')));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/jobs', authMiddleware, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authMiddleware, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'public', 'index.html'));
});
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

const start = (async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
})();
