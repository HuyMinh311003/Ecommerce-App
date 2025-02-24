import {
  View,
  Image,
  Text,
  Platform,
  ScrollView,
  SectionList,
  Dimensions,
  Pressable,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { HeaderComponent } from "../Components/HeaderComponent";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
  } = route.params;

  const gotoCartScreen = () => {
    navigation.navigate("Cart");
  };

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      console.log("Go back to previous page.");
      navigation.goBack();
    } else {
      console.log("Cannot return, redirected to Onboarding page.");
      navigation.navigate("OnboardingScreen");
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
      <HeaderComponent
        goToCartScreen={gotoCartScreen}
        goToPrevious={goToPreviousScreen}
      />
      <ScrollView style={{ backgroundColor: "white" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={{
              width,
              height: 450,
              marginTop: 10,
              padding: 10,
              backgroundColor: "#eee",
            }}
          >
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
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#C60C30",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "yellow",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  {oldPrice ? ((1 - price / oldPrice) * 100).toFixed(1) : 0}%
                  off
                </Text>
              </View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#E0E0E0",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={25}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 20,
                backgroundColor: "#eee",
              }}
            >
              <Image
                style={{ width: 300, height: 300, resizeMode: "contain" }}
                source={{ uri: images[0] }}
              />
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 0, paddingTop: 2 }}
                name="heart"
                size={25}
                color="grey"
              />
            </View>
          </ImageBackground>
        </ScrollView>
        <View
          style={{
            backgroundColor: "#eee",
            width,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
            {name}
          </Text>
          <Text style={{ fontSize: 16, color: "green", marginLeft: 10 }}>
            {description}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            Price: {price} $
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
            Old Price: {oldPrice} $
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "green",
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
              color: "green",
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
            <Ionicons name="location-sharp" size={25} color="green" />
            <Text style={{ fontSize: 14, color: "brown", marginLeft: 5 }}>
              Delivery to: CAMPUS THANH THAI 7/1 Thanh Thai, Ward 14, District
              10, Ho Chi Minh City
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white", paddingBottom: 0 }}>
          <Pressable
            style={{
              backgroundColor: "green",
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              margin: 10,
            }}
            onPress={() =>
              Alert.alert("Add to Cart", "Product added to cart successfully.")
            }
          >
            <Text style={{ color: "yellow", fontSize: 20, fontWeight: "bold" }}>
              Add to Cart
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
