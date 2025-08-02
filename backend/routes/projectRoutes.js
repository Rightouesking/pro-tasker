import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below are protected by JWT middleware
router.use(protect);

router.route('/')
  .post(createProject)   // POST /api/projects
  .get(getProjects);     // GET /api/projects

router.route('/:id')
  .get(getProjectById)   // GET /api/projects/:id
  .put(updateProject)    // PUT /api/projects/:id
  .delete(deleteProject);// DELETE /api/projects/:id

export default router;
