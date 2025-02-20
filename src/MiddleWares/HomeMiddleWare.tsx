import React from "react";
import { ProductListParams } from "../TypesCheck/HomeProps";
import axios from "axios"

interface ICateProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

export const fetchCategories = async ({ setGetCategory }: ICateProps) => {
    try {
        const response = await axios.get("http://192.168.100.8/category/getAllCategories");
        console.log("API Response: ", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                )
            }))

            setGetCategory(fixedData);
        } else {
            console.warn("fetchCategories: API data is not an array", response.data);
            setGetCategory([]);
        }
    } catch (error) {
        console.log("axios get error", error);
        setGetCategory([]);
    }
}
