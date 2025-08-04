import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const createTask = async (req, res) => {
  try {
    const { project,title, description, status } = req.body;
    

    const projectRC = await Project.findOne({ _id: project, owner: req.user._id });
    if (!projectRC) {
      return res.status(403).json({ message: 'Unauthorized or project not found' });
    }

    const task = new Task({
      title,
      description,
      status,
      project
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, owner: req.user._id });
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
    const { Id } = req.params;

    // const project = await Project.findOne({ _id: projectId, owner: req.user._id });
    // if (!project) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }

    const task = await Task.findOneAndUpdate(
      { _id: Id, },
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

export const deleteTask = async (req, res) => {
  try {
    const { Id } = req.params;

    // const project = await Project.findOne({ _id: Id, owner: req.user._id });
    // if (!project) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }

    const task = await Task.findOneAndDelete({
      _id: Id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
