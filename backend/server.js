// const express=require("express");
// const mongoose=require("mongoose");
// require("dotenv").config();
const routes=require("./routes/taskRoute");
// const cors =require("cors");
// const app=express();
// const PORT=process.env.PORT||8000;
// app.use(express.json());
// app.use(cors());
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>console.log("mongodb connected"))
// .catch((err)=>console.log(err));
// app.use("/api",routes);
// app.listen(PORT,()=>console.log(`listening at ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
require("dotenv").config();
app.use(cors());
const port = process.env.PORT||8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(err));

// Create a task schema
// const taskSchema = new mongoose.Schema({
//   task: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: null
//   }
// });

// Create a task model
// const Task = mongoose.model('Task', taskSchema);

// Middleware
app.use(express.json());

app.use("/api",routes);

// Routes
// app.get('/get', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch tasks' });
//   }
// });

// app.post('/save', async (req, res) => {
//   const { task, date } = req.body;

//   try {
//     const newTask = new Task({ task, date });
//     const savedTask = await newTask.save();
//     res.json(savedTask);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save task' });
//   }
// });

// app.put('/update/:id', async (req, res) => {
//   const { id } = req.params;
//   const { task, date } = req.body;

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(id, { task, date }, { new: true });
//     res.json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// });

// app.delete('/delete/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Task.findByIdAndDelete(id);
//     res.json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete task' });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
