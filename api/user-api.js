import express from 'express';
import cors from 'cors'
import userApiController from './../controllers/user-api-controller.js'
const router = express.Router();

router.post('/create-user',  userApiController.createUser);
router.post('/login-user', userApiController.loginUser);
router.delete('/delete-user/:id', userApiController.deleteUser);
router.put('/update-user', userApiController.updateUser);
router.get('/all-users', userApiController.getAllUsers);


export default router;