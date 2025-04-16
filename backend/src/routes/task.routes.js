
import express from 'express';
import {
    createTask, getAllTasks, updateTask, deleteTask
} from '../controllers/task.controller.js';

const router = express.Router();

router.route('/create').post(createTask);
router.route('/get-tasks').get(getAllTasks);
router.route('/delete/:id').delete(deleteTask);
router.route('/update/:id').put(updateTask);



export default router;