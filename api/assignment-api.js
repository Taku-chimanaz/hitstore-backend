import express from 'express';
import assignmentApiController from './../controllers/assignment-api-controller.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

router.post('/create-assignment-order', verifyToken, assignmentApiController.createAssignmentOrder);
router.put('/cancel-assignment-order', verifyToken, assignmentApiController.cancelAssignmentOrder);
router.put('/mark-as-delivered', verifyToken, assignmentApiController.markAsDelivered);

export default router;
