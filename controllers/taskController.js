import Task from "../models/Task.js";
import mongoose from "mongoose";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        console.log("GET TASKS: ", tasks);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    const task = req.body;
    const newTask = new Task(task);
    console.log("CREATE TASK: ", newTask);

    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    console.log('UPDATE', id, title, status);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    const updatedTask = {};
    if (title) updatedTask.title = title;
    if (status) updatedTask.status = status;

    await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    console.log("DELETE TASK", id);

    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json(id);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteAll = async (req, res) => {
    console.log("DELETE ALL");

    try {
        await Task.deleteMany();
        res.status(200).json();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
