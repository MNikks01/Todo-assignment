import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A task must have a name'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'DONE'],
        default: 'PENDING'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must belong to a user']
    }
}, { timestamps: true });

taskSchema.index({ user: 1 });
taskSchema.index({ status: 1 });

const Task = mongoose.model('Task', taskSchema);
export default Task;