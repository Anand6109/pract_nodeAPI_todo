import { Task } from "../models/task.js";

export const newTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const newTask = await Task.create({ title, description, user: req.user._id });
        res.json({
            success: true,
            message: "Task created successfully",
            task: newTask
        });
        console.log("Task created successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating task",
            error: error.message
        });
        console.error("Error creating task:", error.message);
    }
};

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json({
            success: true,
            message: "All tasks retrieved successfully",
            tasks: tasks
        });
        console.log("All tasks retrieved successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving tasks",
            error: error.message
        });
        console.error("Error retrieving tasks:", error.message);
    }
};

export const singleUserTask = async (req, res) => {
    try {
        const userTasks = await Task.find({ user: req.user._id });
        res.json({
            success: true,
            message: "Specific user tasks retrieved successfully",
            tasks: userTasks
        });
        console.log("Specific user tasks retrieved successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving specific user tasks",
            error: error.message
        });
        console.error("Error retrieving specific user tasks:", error.message);
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        task.isCompleted = !task.isCompleted;
        task.title = title;
        task.description = description;
        await task.save();

        res.json({
            success: true,
            message: "Task updated successfully",
            task: task
        });
        console.log("Task updated successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating task",
            error: error.message
        });
        console.error("Error updating task:", error.message);
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully"
        });
        console.log("Task deleted successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting task",
            error: error.message
        });
        console.error("Error deleting task:", error.message);
    }
};

