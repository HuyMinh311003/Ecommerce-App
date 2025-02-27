import {
  View,
  Image,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  Pressable,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { HeaderComponent } from "../Components/HeaderComponent";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { CartState } from "../TypesCheck/ProductCartTypes";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { addToCart } from "../Redux/CartReducer";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";
import { fetchAllProducts } from "../MiddleWares/HomeMiddleWare";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const ProductDetails = ({
  navigation,
  route,
}: RootStackScreenProps<"productDetails">) => {
  const {
    _id,
    images,
    name,
    price,
    oldPrice,
    inStock,
    color,
    size,
    description,
    quantity,
    isFavorited: initialIsFavorited,
  } = route.params;

  const gotoCartScreen = () => {
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

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Cannot return, redirected to Onboarding page.");
      navigation.navigate("OnboardingScreen");
    }
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View
      style={{
        width: width,
        height: 360,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: width * 0.8,
          height: 360,
          resizeMode: "contain",
        }}
        source={{ uri: item }}
      />
    </View>
  );

  const [isFavorited, setIsFavorited] = useState<boolean>(initialIsFavorited);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleFavorite = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.put(
        `http://10.0.2.2:9000/product/updateFavorite/${_id}`,
        {
          isFavorited: !isFavorited,
        }
      );
      if (response.status === 200) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error("Failed to update favorite status", error);
    } finally {
      setLoading(false);
    }
  };

  const cart = useSelector((state: CartState) => state.cart.cart);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);
  const productItemObj: ProductListParams = route.params as ProductListParams;

  const [allProducts, setAllProducts] = useState<ProductListParams[]>([]);

  useEffect(() => {
    fetchAllProducts({ setAllProducts });
  }, []);

  const addItemToCart = (ProductItemObj: ProductListParams) => {
    if (ProductItemObj.quantity <= 0) {
      setMessage("Product is out of stock.");
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 3000);
    } else {
      const findItem = cart.find((product) => product._id === _id);
      if (findItem) {
        setMessage("Product is already in cart.");
        setDisplayMessage(true);
        setTimeout(() => {
          setDisplayMessage(false);
        }, 3000);
      } else {
        setAddedToCart(!addedToCart);
        dispatch(addToCart(ProductItemObj));
        setMessage("Product added to cart successfully.");
        setTimeout(() => {
          setDisplayMessage(false);
        }, 3000);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 50 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {displayMessage && (
        <DisplayMessage
          message={message}
          visible={() => setDisplayMessage(!displayMessage)}
        />
      )}
      <HeaderComponent
        goToCartScreen={gotoCartScreen}
        cartLength={cart.length}
        goToPrevious={goToPreviousScreen}
        allProducts={allProducts}
      />
      <ScrollView style={{ backgroundColor: "white" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={{
              width,
              height: 480,
              marginTop: 10,
              backgroundColor: "#F1F0E9",
              padding: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F1F0E9",
                marginTop: 30,
              }}
            >
              <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View
              style={{
                padding: 3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F1F0E9",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <TouchableOpacity onPress={toggleFavorite} disabled={loading}>
                  <AntDesign
                    name="heart"
                    size={30}
                    color={isFavorited ? "red" : "black"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#F1F0E9",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={30}
                  color="black"
                />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
        <View
          style={{
            backgroundColor: "#F1F0E9",
            width,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 10 }}>
            {name}
          </Text>
          <Text style={{ fontSize: 16, color: "gray", marginLeft: 10 }}>
            {description}
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {price}₫
            <Text style={{ color: "red" }}>
              {" "}
              (SALE {oldPrice ? ((1 - price / oldPrice) * 100).toFixed(1) : 0}%
              OFF)
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "grey",
              textDecorationLine: "line-through",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            Old Price: {oldPrice}₫
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            {quantity > 0 ? `In Stock Quantity: ${quantity}` : "Out of Stock"}
          </Text>
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 6 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "blue",
              marginBottom: 10,
            }}
          >
            Delivery
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 14, color: "red" }}>
            Delivery is Available
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location-sharp" size={25} color="red" />
            <Text style={{ fontSize: 14, color: "black", marginLeft: 5 }}>
              Delivery to: CAMPUS THANH THAI 7/1 Thanh Thai, Ward 14, District
              10, Ho Chi Minh City
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white", paddingBottom: 0 }}>
        <Pressable
          style={{
            backgroundColor: "blue",
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            margin: 10,
          }}
          onPress={() => addItemToCart(productItemObj)}
        >
          {addedToCart ? (
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              ADD TO CART
            </Text>
          ) : (
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              ADD TO CART
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
