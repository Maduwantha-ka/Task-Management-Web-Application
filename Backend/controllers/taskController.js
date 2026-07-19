const Task = require("../models/Task");

// Helper: validate incoming task data
const validateTaskInput = (body, isUpdate = false) => {
  const errors = [];
  const { title, priority, dueDate, status, description } = body;

  if (!isUpdate || title !== undefined) {
    if (!title || !title.trim()) errors.push("Title is required");
    else if (title.trim().length > 100)
      errors.push("Title cannot exceed 100 characters");
  }

  if (!isUpdate || priority !== undefined) {
    if (!priority) errors.push("Priority is required");
    else if (!["Low", "Medium", "High"].includes(priority))
      errors.push("Priority must be Low, Medium, or High");
  }

  if (!isUpdate || dueDate !== undefined) {
    if (!dueDate) errors.push("Due date is required");
    else if (isNaN(new Date(dueDate).getTime()))
      errors.push("Due date must be a valid date");
  }

  if (status !== undefined) {
    if (!["Pending", "In Progress", "Completed"].includes(status))
      errors.push("Status must be Pending, In Progress, or Completed");
  }

  if (description !== undefined && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  return errors;
};

// @desc  Get all tasks (supports ?priority=&status= filters)
// @route GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const filter = {};
    const { priority, status } = req.query;

    if (priority && priority !== "All") filter.priority = priority;
    if (status && status !== "All") filter.status = status;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single task
// @route GET /api/tasks/:id
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create a task
// @route POST /api/tasks
const createTask = async (req, res) => {
  try {
    const errors = validateTaskInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(", "), errors });
    }

    const task = await Task.create({
      title: req.body.title.trim(),
      description: (req.body.description || "").trim(),
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      status: req.body.status || "Pending",
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update a task (details or status)
// @route PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const errors = validateTaskInput(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(", "), errors });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete a task
// @route DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
