import express from "express";
import orderApiController from './../controllers/order-api-controller.js'
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post('/create-order', orderApiController.createOrder);
router.get('/get-all-orders', orderApiController.getAllOrders);
router.put('/mark-order-delivered/:id', verifyToken,orderApiController.markOrderDelivered);
router.put('/cancel-order/:id',  verifyToken, orderApiController.cancelOrder);

export default router;


