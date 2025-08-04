import express from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below require authentication
router.use(protect);

// Tasks are nested under projects

router.post('/',createTask);                               
router.put('/:Id',updateTask);            
router.delete('/:Id',deleteTask);         

export default router;
