import express from "express";
import eventApiController from "../controllers/event-api-controller.js";
import { verifyToken } from "../verifyToken.js";
import upload from './../upload.js';
const router = express.Router();

router.post('/create-event', verifyToken, upload, eventApiController.createEvent);
router.put('/update-event', verifyToken, upload, eventApiController.updateEvent);
router.get('/get-all-events', eventApiController.getAllEvents);
router.delete('/delete-event/:id', verifyToken, eventApiController.deleteEvent);

export default router;