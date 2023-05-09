import express from 'express';
import productController from '../controllers/product-api-controller.js';
import { verifyToken } from '../verifyToken.js';
import upload from '../upload.js';
const router = express.Router();


router.post('/create-product', verifyToken,  upload, productController.createProduct);
router.get('/get-all-products', productController.getAllProducts);
router.delete('/delete-product/:id', verifyToken, productController.deleteProduct);
router.put('/update-product', verifyToken, upload, productController.updateProduct);

export default router;


