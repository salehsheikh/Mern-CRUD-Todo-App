const {Router}=require("express");
const TaskModel=require("../models/TaskModel");
const mongoose=require('mongoose');
//  const Task = mongoose.model('Task', taskSchema);
 const router=Router();
router.get('/get', async (req, res) => {
    try {
      const tasks = await TaskModel.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });
  
  router.post('/save', async (req, res) => {
    const { task, date } = req.body;
  
    try {
      const newTask = new TaskModel({ task, date });
      const savedTask = await newTask.save();
      res.json(savedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save task' });
    }
  });
  
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { task, date } = req.body;
  
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(id, { task, date }, { new: true });
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await TaskModel.findByIdAndDelete(id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });
module.exports=router;