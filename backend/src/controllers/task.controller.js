// import catchAsync from '../utils/catchAsync.js';
import Task from '../models/task.model.js';
import AppError from '../utils/appError.js';
import mongoose from 'mongoose';

const getAllTasks = async (req, res, next) => {
    const { page = 1, limit = 10, status, search, sort } = req.query;
    // console.log('page', page, 'limit', limit, 'status', status, 'search', search, 'sort', sort);

    // 🚨 TEMP FIX: Hardcoded user ID for testing
    const userId = req.query.user;

    try {
        if (status) query.status = status;
        if (search) query.name = { $regex: search, $options: 'i' };

        const tasks = await Task.find({ user: userId })
            .sort(sort || '-createdAt')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Task.countDocuments(query);

        res.status(200).json({
            success: true,
            results: tasks.length,
            total,
            tasks
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

// done and tested
const createTask = async (req, res, next) => {
    const { name, description, status, id } = req.body;

    console.log('name', name, 'description', description, 'status', status, 'id', id);

    if (!name || !description)
        return res.status(400)
            .json({
                success: false,
                message: 'Please provide name and description'
            });


    try {
        const task = await Task.create({
            name,
            description,
            status: status || 'PENDING',
            user: id
        });
        if (!task)
            return res.status(400)
                .json({
                    success: false,
                    message: 'Failed to create task'
                });

        res.status(201).json({
            success: true,
            task
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Failed to create task' });
    }
}
const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return next(new AppError('No task found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }

}
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return next(new AppError('No task found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
}
const getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return next(new AppError('No task found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
}

export { createTask, getAllTasks, getTask, updateTask, deleteTask };