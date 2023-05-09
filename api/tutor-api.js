import express from 'express';
const router = express.Router();
import tutorApiController from '../controllers/tutor-application-api-controller.js';
import {verifyToken} from './../verifyToken.js';
 
router.get('/get-all-applications', verifyToken, tutorApiController.getAllApplications);
router.get('/get-accepted-tutor-applications', verifyToken,  tutorApiController.getAcceptedTutorApplications);
router.get('/all-tutors', verifyToken,  tutorApiController.getAllTutors);
router.get('/get-rejected-tutor-applications', verifyToken,  tutorApiController.getRejectedTutorApplications);
router.get('/get-active-tutor-applications', verifyToken,  tutorApiController.getActiveTutorApplications);
router.post('/apply',  verifyToken, tutorApiController.applyForTutor);
router.put('/reject-tutor-application',  verifyToken,  tutorApiController.rejectApplication);
router.put('/accept-tutor-application', verifyToken,  tutorApiController.acceptApplication);
router.put('/disable-tutor', verifyToken,  tutorApiController.disableTutor);

export default router