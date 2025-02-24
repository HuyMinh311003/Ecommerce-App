import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { ICateProps } from "../../TypesCheck/CategoryTypes";

export const CategoryCard = ({
  item,
  cateProps,
  cateStyleProps,
}: ICateProps) => {
  let isActive = item._id == cateProps.activeCate;
  let activeButtonClass = isActive ? "orange" : "#eee";

  return (
    <View>
      {cateProps.imageBg !== undefined ? (
        <View style={{ alignItems: "center" }}>
          <Pressable
            style={st.imageContainer}
            key={item._id}
            onPress={cateProps.onPress}
          >
            <ImageBackground
              source={{ uri: cateProps?.imageBg }}
              style={styl(cateStyleProps.imageBgHt).imageBg}
            >
              <Image
                source={{ uri: item?.images[0] }}
                style={
                  sty(
                    cateStyleProps.width,
                    cateStyleProps.height,
                    cateStyleProps.radius
                  ).imgStyleProps
                }
                resizeMode={cateStyleProps?.resizeMode}
              />
            </ImageBackground>
          </Pressable>
          <Text style={st.cateName}>{item?.name}</Text>
        </View>
      ) : (
        <Pressable
          style={[st.touchableStyle, { backgroundColor: activeButtonClass }]}
          key={item._id}
          onPress={cateProps.onPress}
        >
          <View style={st.imageContainer}>
            <Image
              source={{ uri: item?.images[0] }}
              style={
                sty(
                  cateStyleProps.width,
                  cateStyleProps.height,
                  cateStyleProps.radius
                ).imgStyleProps
              }
              resizeMode={cateStyleProps?.resizeMode}
            ></Image>
          </View>
          <Text style={[st.cateName]}>{item?.name}</Text>
        </Pressable>
      )}
    </View>
  );
};

const st = StyleSheet.create({
  imageContainer: {
    padding: 3,
  },
  cateName: {
    fontSize: 8,
    fontWeight: "bold",
  },
  touchableStyle: {
    alignItems: "center",
    padding: 5,
    margin: 3,
  },
});

const styl = (heigth?: number) => ({
  imageBg: {
    heigth,
    borderRadius: 11,
  },
});

const sty = (width?: number, height?: number, radius?: number) => ({
  imgStyleProps: {
    width,
    height,
    borderRadius: radius,
  },
});
