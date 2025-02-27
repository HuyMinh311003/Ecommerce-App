import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GoBack } from "./HeaderComponent/GoBackButton";
import { useNavigation } from "@react-navigation/native";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { RootStackParams } from "../Navigation/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IHeaderParams {
  goToPrevious?: () => void;
  search?: () => void;
  cartLength?: number;
  goToCartScreen?: () => void;
  allProducts: ProductListParams[];
}

export const HeaderComponent = ({
  goToPrevious,
  search,
  cartLength,
  goToCartScreen,
  allProducts,
}: IHeaderParams) => {
  const [searchInput, setSearchInput] = useState("");

  const [filteredProducts, setFilteredProducts] = useState<ProductListParams[]>(
    []
  );
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParams, "productDetails">
    >();

  const handleSearch = (text: string) => {
    setSearchInput(text);
    if (text.trim().length > 0) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const selectProduct = (product: ProductListParams) => {
    setSearchInput(""); // Xóa input sau khi chọn
    setFilteredProducts([]);

    navigation.navigate(
      "productDetails",
      product as RootStackParams["productDetails"]
    );
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <GoBack onPress={goToPrevious} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: "white",
          borderRadius: 10,
          height: 38,
          flex: 1,
          position: "relative", // ✅ Đảm bảo FlatList có thể hiển thị đúng
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 15,
          }}
        >
          <Pressable style={{ padding: 10 }} onPress={search}>
            <AntDesign name="search1" size={15} color={"black"} />
          </Pressable>
          <TextInput
            style={{ fontSize: 12, flex: 1 }}
            value={searchInput}
            onChangeText={handleSearch}
            placeholder="Search Items..."
          />
        </View>

        {/* 🔥 Gợi ý tìm kiếm */}
        {filteredProducts.length > 0 && (
          <View
            style={{
              position: "absolute",
              top: 40, // ✅ Đặt ngay bên dưới thanh tìm kiếm
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              zIndex: 1000, // ✅ Đảm bảo hiển thị trên các phần khác
              elevation: 5,
              maxHeight: 150, // ✅ Giới hạn chiều cao danh sách
            }}
          >
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => selectProduct(item)}
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Text>{item.name}</Text>
                </Pressable>
              )}
            />
          </View>
        )}
      </View>
      <Pressable onPress={goToCartScreen}>
        <Text style={styles.cartNum}>{cartLength}</Text>
        <MaterialIcons name="shopping-cart" size={24} color={"black"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cartNum: {
    position: "absolute",
    top: -8,
    right: -6,
    height: 18,
    width: 18,
    backgroundColor: "#FF4C4C",
    color: "white",
    borderRadius: 10,
    zIndex: 1,
    paddingLeft: 5,
  },
});
