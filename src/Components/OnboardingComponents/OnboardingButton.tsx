import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";
import { OnboardingButtonParams } from "../../TypesCheck/OnboardingTypesCheck";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../Navigation/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {};

const OnboardingButton = ({
  flatListIndex,
  flatListRef,
  itemLength,
  x,
}: OnboardingButtonParams) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const buttonAnimation = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === itemLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimation = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === itemLength - 1 ? withTiming(0) : withTiming(1),
      width: 30,
      height: 30,
      transform: [
        {
          translateX:
            flatListIndex.value === itemLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimation = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === itemLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === itemLength - 1
              ? withTiming(0)
              : withTiming(100),
        },
      ],
    };
  });

  const colorAnimation = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#C80DFC", "#250DFC", "#251357"]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < itemLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          navigation.replace("TabsStack", { screen: "Home" });
        }
      }}
    >
      <Animated.View style={[sty.container, buttonAnimation, colorAnimation]}>
        <Animated.Text style={[sty.textButton, textAnimation]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require("../../../assets/onboarding/nextIcon.png")}
          style={[sty.arrow, arrowAnimation]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default OnboardingButton;

const sty = StyleSheet.create({
  container: {
    backgroundColor: "#c822fc",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
    position: "absolute",
  },
});
