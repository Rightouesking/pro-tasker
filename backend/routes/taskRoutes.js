import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below require authentication
router.use(protect);

// Tasks are nested under projects
router.post('/:projectId/tasks', createTask);                   // POST /api/projects/:projectId/tasks
router.get('/:projectId/tasks', getTasksByProject);             // GET /api/projects/:projectId/tasks
router.put('/:projectId/tasks/:taskId', updateTask);            // PUT /api/projects/:projectId/tasks/:taskId
router.delete('/:projectId/tasks/:taskId', deleteTask);         // DELETE /api/projects/:projectId/tasks/:taskId

export default router;
