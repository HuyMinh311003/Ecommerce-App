import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { fetchFavoritedProducts } from "../MiddleWares/HomeMiddleWare";
import { TabsStackScreenProps } from "../Navigation/TabNavigation";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const [getFavoritedProducts, setGetFavoritedProducts] = useState<
    ProductListParams[]
  >([]);

  useEffect(() => {
    fetchFavoritedProducts({ setGetFavoritedProducts });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavoritedProducts({ setGetFavoritedProducts });
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/100" }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Trần Huy Minh</Text>
      <Text style={styles.email}>tranhuyminh@gmail.com</Text>
      <Text style={styles.phone}>+84 123 456 789</Text>

      <Pressable
        style={styles.button}
        onPress={() => alert("Update Profile Here")}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </Pressable>

      <View style={styles.favoritesHeader}>
        <Text style={styles.favoritesTitle}>My Favorited Products</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "lightgray",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getFavoritedProducts?.length > 0 ? (
            getFavoritedProducts.map((item, index) => (
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
            <Text>No Favorited Products Available</Text>
          )}
        </ScrollView>
      </View>

      <Pressable
        style={[styles.button, styles.logoutButton]}
        onPress={() => alert("Log out!")}
      >
        <Text style={[styles.buttonText, { color: "white" }]}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 70,
    marginBottom: 20,
    backgroundColor: "lightblue",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 220,
    backgroundColor: "#FF4C4C",
  },
  favoritesHeader: {
    backgroundColor: "#2DAA9E",
    marginTop: 10,
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  favoritesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  productsContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  noProductsText: {
    fontSize: 14,
    color: "black",
    padding: 20,
  },
});

export default ProfileScreen;
