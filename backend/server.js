import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import usersRouter from './routes/userRoutes.js';
import projectsRouter from './routes/projectRoutes.js';
import tasksRouter from './routes/taskRoutes.js';

// Load env variables
dotenv.config();
connectDB()

// Create Express app
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// CORS and Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json('welcome to pro-tasker')
})
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

// DB Events
// connectDB.once('open', () => {
//   console.log('✅ Connected to MongoDB');
//   app.listen(PORT, () => {
//     console.log(`🚀 Server is running at http://localhost:${PORT}`);
//   });
// });

// connectDB.on('error', (error) => {
//   console.error('❌ MongoDB error:', error.message);
//   process.exit(1);
// });

// connectDB.on('disconnected', () => {
//   console.log('⚠️ MongoDB disconnected');
// });
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)

})