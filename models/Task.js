import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: String,
    status: {
        type: String,
        enum: ['complete', 'incomplete', 'in-progress'],
        default: 'incomplete'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;