import express from 'express';
import { deleteTask, getAllTask, newTask, singleUserTask, updateTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post('/new',isAuthenticated,newTask);

router.get('/allTask',isAuthenticated,getAllTask);

router.get('/singleUserTask',isAuthenticated,singleUserTask);

router.put('/:id',isAuthenticated, updateTask)

router.delete('/delete/:id',isAuthenticated, deleteTask)




export{router};