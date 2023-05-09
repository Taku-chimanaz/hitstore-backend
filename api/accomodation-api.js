import express from 'express';
import { verifyToken } from '../verifyToken.js';
import upload from './../upload.js';
import accomodationApiController from '../controllers/accomodation-api-controller.js';
const router = express.Router();

router.get("/get-all-accomodations", accomodationApiController.getAllAccomodations);
router.post("/create-accomodation", verifyToken, upload, accomodationApiController.createAccomodation);
router.put("/update-accomodation/", verifyToken, upload, accomodationApiController.updateAccomodation);
router.delete("/delete-accomodation/:id", verifyToken, accomodationApiController.deleteAccomodation);

export default router;