import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { OnboardingDotParams } from '../../TypesCheck/OnboardingTypesCheck'

type Props = {}

const OnboardingDots = ({ index, x }: OnboardingDotParams) => {
  const { width: SCREEN_WITDH } = useWindowDimensions()
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(x.value,
      [
        (index - 1) * SCREEN_WITDH,
        index * SCREEN_WITDH,
        (index + 1) * SCREEN_WITDH
      ],
      [10, 30, 10],
      Extrapolation.CLAMP
    )
    const opacityAnimation = interpolate(x.value,
      [
        (index - 1) * SCREEN_WITDH,
        index * SCREEN_WITDH,
        (index + 1) * SCREEN_WITDH
      ],
      [1, 2, 1],
      Extrapolation.CLAMP
    )
    return {
      width: widthAnimation,
      opacity: opacityAnimation
    }
  })
  const colorAnimation = useAnimatedStyle(() => {
    const background = interpolateColor(x.value,
      [
        0,
        SCREEN_WITDH,
        2 * SCREEN_WITDH
      ],
      ["#8a14d4", "#39d4ba", "#f14546"]
    )
    return {
      backgroundColor: background
    }
  })
  return (
    <Animated.View style={[sty.dots, animatedDotStyle, colorAnimation]} />
  )
}

export default OnboardingDots

const sty = StyleSheet.create({
  dots: {
    height: 10,
    marginHorizontal: 10,
    borderRadius: 5
  }
})