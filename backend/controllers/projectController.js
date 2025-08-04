import Project from '../models/Project.js';
import User from '../models/User.js';
import Task from '../models/Task.js'

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newProject = new Project({
      name,
      description,
      owner: req.user._id,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProjectById = async (req, res) => {
  try {
    console.log (req.params.id,
      req.user._id,)

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
// GET /api/project/:projectId/tasks - Get all tasks for a given project

export async function getProjectTasks(

req ,

res 

) {

try {

const project = await Project.findById(req.params.id);

if (!project || !project.owner)

return res

.status(404)

.json({ message: `No project found for id (${req.params.id}).` });

if (project.owner.toString() !== req.user._id)

return res

.status(403)

.json({ message: 'You are not allowed to access that project.' });

 

const tasks = await Task.find({ project: project._id });

if (!tasks || tasks.length === 0)

return res.status(400).json({ message: 'No tasks found' });

 

res.json(tasks);

} catch (err) {

console.log(err);

res.status(500).json(err);

}

}
