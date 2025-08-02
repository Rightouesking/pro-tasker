// controllers/taskController.js

import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';

// @desc    Create task in project
// @route   POST /api/projects/:projectId/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, owner: req.user.id });
    if (!project) {
      return res.status(403).json({ message: 'Unauthorized or project not found' });
    }

    const task = new Task({
      title,
      description,
      status,
      project: projectId,
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
export const getTasksForProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, owner: req.user.id });
    if (!project) {
      return res.status(403).json({ message: 'Unauthorized or project not found' });
    }

    const tasks = await Task.find({ project: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/projects/:projectId/tasks/:taskId
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findOne({ _id: projectId, owner: req.user.id });
    if (!project) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/projects/:projectId/tasks/:taskId
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findOne({ _id: projectId, owner: req.user.id });
    if (!project) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const task = await Task.findOneAndDelete({
      _id: taskId,
      project: projectId,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
