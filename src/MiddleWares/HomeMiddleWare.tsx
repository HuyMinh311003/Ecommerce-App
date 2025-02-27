import React from "react";
import {
  FetchProductsParams,
  ProductListParams,
} from "../TypesCheck/HomeProps";
import axios from "axios";

interface ICateProps {
  setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface IProductByCateProps {
  cateID: string;
  setGetProductsByCateID: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
}

export const fetchCategories = async ({ setGetCategory }: ICateProps) => {
  try {
    const response = await axios.get(
      "http://10.0.2.2:9000/category/getAllCategories"
    );

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));

      setGetCategory(fixedData);
    } else {
      console.warn("fetchCategories: API data is not an array", response.data);
      setGetCategory([]);
    }
  } catch (error) {
    console.log("axios get error", error);
    setGetCategory([]);
  }
};

export const fetchProductsByCateID = async ({
  setGetProductsByCateID,
  cateID,
}: IProductByCateProps) => {
  try {
    const response: FetchProductsParams = await axios.get(
      `http://10.0.2.2:9000/product/getProductByCateID/${cateID}`
    );

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));
      setGetProductsByCateID(fixedData);
    } else {
      console.warn(
        "fetchProductsByCateID: API data is not an array",
        response.data
      );
      setGetProductsByCateID([]);
    }
  } catch (error) {
    console.log("axios get error", error);
    setGetProductsByCateID([]);
  }
};

export const fetchFeaturedProducts = async ({
  setGetFeaturedProducts,
}: {
  setGetFeaturedProducts: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
}) => {
  try {
    const response: FetchProductsParams = await axios.get(
      "http://10.0.2.2:9000/product/getFeaturedProducts"
    );

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));
      setGetFeaturedProducts(fixedData);
    } else {
      console.warn(
        "fetchFeaturedProducts: API data is not an array",
        response.data
      );
      setGetFeaturedProducts([]);
    }
  } catch (error) {
    console.log("axios get error", error);
    setGetFeaturedProducts([]);
  }
};

export const fetchAllProducts = async ({
  setAllProducts,
}: {
  setAllProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}) => {
  try {
    const response = await axios.get(
      "http://10.0.2.2:9000/product/getAllProducts"
    );

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));
      setAllProducts(fixedData);
    } else {
      console.warn("fetchAllProducts: API data is not an array", response.data);
      setAllProducts([]);
    }
  } catch (error) {
    console.log("axios get error", error);
    setAllProducts([]);
  }
};

export const fetchFavoritedProducts = async ({
  setGetFavoritedProducts,
}: {
  setGetFavoritedProducts: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
}) => {
  try {
    const response: FetchProductsParams = await axios.get(
      "http://10.0.2.2:9000/product/getFavoritedProducts"
    );

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));
      setGetFavoritedProducts(fixedData);
    } else {
      console.warn(
        "fetchFeaturedProducts: API data is not an array",
        response.data
      );
      setGetFavoritedProducts([]);
    }
  } catch (error) {
    console.log("axios get error", error);
    setGetFavoritedProducts([]);
  }
};
