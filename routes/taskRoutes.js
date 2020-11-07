import express from "express";
import {
    getTasks,
    createTask,
    deleteTask,
    deleteAll,
    updateTask
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.delete("/all", deleteAll);

export default router;
