import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GoBack } from "./HeaderComponent/GoBackButton";

interface IHeaderParams {
  goToPrevious?: () => void;
  search?: () => void;
  cartLength?: number;
  goToCartScreen?: () => void;
}

export const HeaderComponent = ({
  goToPrevious,
  search,
  cartLength,
  goToCartScreen,
}: IHeaderParams) => {
  const [searchInput, setSearchInput] = useState("");
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
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: "white",
          borderRadius: 10,
          height: 38,
          flex: 1,
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
            <AntDesign name="search1" size={15} color={"blue"} />
          </Pressable>
          <TextInput
            style={{ fontSize: 12 }}
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="Search Items..."
          />
        </View>
      </Pressable>
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
    top: 0,
    right: 0,
    height: 9,
    width: 9,
    backgroundColor: "red",
    borderRadius: 25,
    zIndex: 1,
  },
});
