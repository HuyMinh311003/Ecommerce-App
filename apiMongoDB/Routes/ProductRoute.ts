import express, { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { createProduct, getAllProducts, getFavoritedProducts, getFeaturedProducts, getProductByCateID, getProductByID, updateProductFavoriteStatus } from './../Controllers/ProductController';

const router = express.Router();
const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets')
    },

    filename: function (req, file, cb) {
        cb(null, req.body.name + "-" + Date.now() + path.extname(file.originalname))
    }
})

const images = multer({ storage: imagesStorage }).array('images');

router.post('/createProduct', images, createProduct);
router.get('/getProductByCateID/:CateID', getProductByCateID);
router.get('/getProductByID/:id', getProductByID);
router.get('/getAllProducts', getAllProducts);

router.get('/getFeaturedProducts', getFeaturedProducts);

router.get('/getFavoritedProducts', getFavoritedProducts);
router.put("/updateFavorite/:productId", updateProductFavoriteStatus);

export { router as ProductRoute };
