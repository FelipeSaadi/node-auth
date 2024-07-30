import { Router } from 'express'
import { Auth } from '../middlewares/auth'
import * as authController from '../controllers/auth'
import * as userController from '../controllers/user'

export const router = Router()

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/users', Auth.private, userController.findAll)