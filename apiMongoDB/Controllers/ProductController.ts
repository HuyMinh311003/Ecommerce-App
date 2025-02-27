import express, { Request, Response } from "express"
import { PRODUCTS } from "../Models/ProductModel"
import { ProductParams } from "../dto/Product"

const path = 'http://localhost:9000/assets/'

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, oldPrice, description, quantity, inStock, isFeatured, isFavorited, category } = <ProductParams>req.body;
    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => path + file.filename)

    const product = new PRODUCTS({
        name: name,
        images: images,
        price, oldPrice, description, quantity, inStock, isFeatured, isFavorited, category
    });

    try {
        console.log(product)
        await product.save();
        res.status(200).json(`Product created successfully at ${path}`)
    } catch(error) {
        res.status(500).json(`Failed to create Product ${error}`)
    }
}

export const getProductByCateID = async (req: Request, res: Response) => {
    console.log(req.params.CateID)
    try {
        const result = await PRODUCTS.find({category: req.params.CateID})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`ProductByCateID fetch failed ${error}`)
    }
}

export const getProductByID = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.findById(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Product fetch failed ${error}`)
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Products not found ${error}`)
    }
}

export const getFeaturedProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find({ isFeatured: true })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Products not found: ${error}`)
    }
}

export const getFavoritedProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find({ isFavorited: true })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Products not found: ${error}`)
    }
}

export const updateProductFavoriteStatus = async (req: Request, res: Response) => {
    try {
        const { isFavorited } = req.body;
        const { productId } = req.params;

        if (typeof isFavorited !== "boolean") {
            res.status(400).json({ message: "Invalid isFavorited value" });
            return;
        }

        const updatedProduct = await PRODUCTS.findByIdAndUpdate(
            productId, 
            { isFavorited }, 
            { new: true }
        );

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json({ 
            message: "Product favorite status updated successfully", 
            updatedProduct 
        });
    } catch (error) {
        res.status(500).json({ message: `Error updating product: ${error}` });
    }
};
