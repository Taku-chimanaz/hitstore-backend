import express from 'express';
import gossipController from '../controllers/gossip-controller.js';
import { verifyToken } from '../verifyToken.js';
import upload from '../upload.js';
const router = express.Router();

router.get('/get-all-gossips',  gossipController.getAllGossips);
router.post('/create-gossip', verifyToken, upload,gossipController.createGossip);
router.put('/update-gossip', verifyToken, upload,gossipController.updateGossip);
router.delete('/delete-gossip/:id', verifyToken, gossipController.deleteGossip);

export default router