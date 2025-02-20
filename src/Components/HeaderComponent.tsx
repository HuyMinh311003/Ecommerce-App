import { View, Text, StyleSheet, Pressable, TextInput } from "react-native"
import React, { useState } from "react"
import { Entypo, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { GoBack } from "./HeaderComponent/GoBackButton"

interface IHeaderParams {
    goToPrevious?: () => void;
    search?: () => void;
    cartLength?: number;
    goToCartScreen?: () => void;
}

export const HeaderComponent = ({ goToPrevious, search, cartLength, goToCartScreen }: IHeaderParams) => {
    const[searchInput, setSearchInput] = useState("")
    return (
        <View style={{backgroundColor: "#000", padding: 10, flexDirection: "row", alignItems: "center"}}>
            <GoBack onPress={goToPrevious} />
            <Pressable style={{
                flexDirection: "row", alignItems: "center", marginHorizontal: 7,
                gap: 10, backgroundColor: "white", borderRadius: 10, height: 38, flex: 1
            }}>
                <Pressable style={{ padding: 10 }} onPress={search}>
                    <AntDesign name="search1" size={20} color={"blue"}/>
                </Pressable>
                <TextInput value={searchInput} onChangeText={setSearchInput} placeholder="Search Items..."/>
            </Pressable>
            <Pressable onPress={goToCartScreen}>
                <Text style={{ color: "pink" }}>
                    {cartLength}
                </Text>
                <MaterialIcons name="shopping-cart" size={24} color={"white"} style={{ padding: 5, marginTop: 3 }} />
            </Pressable>
        </View>
    )
}
