import express from 'express';
import { Home, Register, deleteUser, getAllUsers, killAll, login, logout, singleUser } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', Home);

router.get('/all', getAllUsers);

router.post('/register', Register);

router.post('/login', login);

router.get('/logout', isAuthenticated, logout)

router.get("/singleuser", isAuthenticated, singleUser);

router.get("/delete", isAuthenticated, deleteUser);

router.get("/killall", killAll);


export { router };

