import { View, Text, Platform, ScrollView, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TabsStackScreenProps } from "../Navigation/TabNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderComponent } from "../Components/HeaderComponent";
import ImageSlider from "../Components/HomeScreenComponents/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import {
  fetchCategories,
  fetchProductsByCateID,
  fetchFeaturedProducts,
  fetchAllProducts,
} from "../MiddleWares/HomeMiddleWare";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { CartState } from "../TypesCheck/ProductCartTypes";

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const cart = useSelector((state: CartState) => state.cart.cart);
  const [message, setMessage] = React.useState("");
  const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

  const goToCartScreen = () => {
    if (cart.length === 0) {
      setMessage("Cart is empty. Please add products to cart.");
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 3000);
    } else {
      navigation.navigate("TabsStack", { screen: "Cart" });
    }
  };

  const sliderImages = [
    require("../../assets/sliderImages/image1.jpg"),
    require("../../assets/sliderImages/image2.jpg"),
    require("../../assets/sliderImages/image3.jpg"),
  ];

  const [activeCate, setActiveCate] = useState<string>("");
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCateID, setGetProductsByCateID] = useState<
    ProductListParams[]
  >([]);

  const [getFeaturedProducts, setGetFeaturedProducts] = useState<
    ProductListParams[]
  >([]);

  useEffect(() => {
    fetchCategories({ setGetCategory });
    fetchFeaturedProducts({ setGetFeaturedProducts });
  }, []);

  useEffect(() => {
    if (activeCate) {
      fetchProductsByCateID({ setGetProductsByCateID, cateID: activeCate });
    }
  }, [activeCate]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCate) {
        fetchProductsByCateID({ setGetProductsByCateID, cateID: activeCate });
      }
      fetchFeaturedProducts({ setGetFeaturedProducts });
    }, [activeCate])
  );

  const [allProducts, setAllProducts] = useState<ProductListParams[]>([]);

  useEffect(() => {
    fetchAllProducts({ setAllProducts });
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 0 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeaderComponent
        goToCartScreen={goToCartScreen}
        cartLength={cart.length}
        allProducts={allProducts}
      />

      <ImageSlider images={sliderImages} />

      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ backgroundColor: "white", flex: 1, height: 200 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            style={{ marginBottom: 10 }}
          >
            {getCategory.map((item, index) => (
              <CategoryCard
                key={index}
                item={{ name: item.name, images: item.images, _id: item._id }}
                cateStyleProps={{
                  height: 95,
                  width: 95,
                  resizeMode: "contain",
                }}
                cateProps={{
                  activeCate: activeCate,
                  onPress: () => setActiveCate(item._id),
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: "blue",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              padding: 10,
              color: "white",
            }}
          >
            Products from Selected Category
          </Text>
          <Pressable>
            <Text style={{ fontSize: 14, padding: 10, color: "white" }}>
              See All
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 7,
            borderColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getProductsByCateID?.length > 0 ? (
              getProductsByCateID.map((item, index) => (
                <CategoryCard
                  key={index}
                  item={{ name: item.name, images: item.images, _id: item._id }}
                  cateStyleProps={{
                    height: 100,
                    width: 100,
                    radius: 10,
                    resizeMode: "contain",
                  }}
                  cateProps={{
                    onPress: () => navigation.navigate("productDetails", item),
                  }}
                />
              ))
            ) : (
              <Text style={{ padding: 10 }}>No Product Available</Text>
            )}
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: "#FF4C4C",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              padding: 10,
              color: "white",
            }}
          >
            Featured Products
          </Text>
          <Pressable>
            <Text style={{ fontSize: 14, padding: 10, color: "white" }}>
              See All
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 7,
            borderColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getFeaturedProducts?.length > 0 ? (
              getFeaturedProducts.map((item, index) => (
                <CategoryCard
                  key={index}
                  item={{ name: item.name, images: item.images, _id: item._id }}
                  cateStyleProps={{
                    height: 100,
                    width: 100,
                    radius: 10,
                    resizeMode: "contain",
                  }}
                  cateProps={{
                    onPress: () => navigation.navigate("productDetails", item),
                  }}
                />
              ))
            ) : (
              <Text>No Featured Products Available</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
