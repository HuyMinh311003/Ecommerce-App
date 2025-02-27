import react, { useState, useRef } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useInterval } from "../../Hooks/UseInterval";

interface ImageProps {
  images: (ImageSourcePropType | string)[];
}

const Max_Width = Dimensions.get("screen").width;
const ImageSlider = ({ images }: ImageProps) => {
  const animation = useRef(new Animated.Value(0));
  const [currentImage, setCurrentImage] = useState(0);
  const handleAnimation = () => {
    let newCurrentImage = currentImage + 1;
    if (newCurrentImage >= images.length) {
      newCurrentImage = currentImage * 0;
    }
    Animated.spring(animation.current, {
      toValue: -(Dimensions.get("screen").width * newCurrentImage),
      useNativeDriver: true,
    }).start();
    setCurrentImage(newCurrentImage);
  };
  useInterval(() => handleAnimation(), 2000);

  return (
    <>
      <View>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateX: animation.current }] },
          ]}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={typeof image === "string" ? { uri: image } : image}
              style={styles.image}
            />
          ))}
        </Animated.View>
        <View style={styles.indicatorContainer}>
          {images.map((image, index) => (
            <View
              key={`${image}_${index}`}
              style={[
                styles.indicator,
                index === currentImage ? styles.activeIndicator : undefined,
              ]}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    height: 220,
    width: Dimensions.get("screen").width,
    borderWidth: 7,
    borderColor: "white",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Max_Width,
    bottom: 0,
    zIndex: 2,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 7.5,
    borderColor: "silver",
    borderWidth: 1,
    marginHorizontal: 3,
    marginBottom: 0,
    backgroundColor: "#eee",
  },
  activeIndicator: {
    backgroundColor: "blue",
  },
});
