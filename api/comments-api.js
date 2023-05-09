import express from 'express';
import commentsApiController from '../controllers/comments-api-controller.js';
const router = express.Router();

router.get('/get-gossip-comments/:id', commentsApiController.getGossipComments);
router.post('/post-comment', commentsApiController.postComment);

export default router;