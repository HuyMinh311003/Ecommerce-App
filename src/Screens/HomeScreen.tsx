import { View, Text, Platform, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TabsStackScreenProps } from '../Navigation/TabNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderComponent } from '../Components/HeaderComponent'
import ImageSlider from '../Components/HomeScreenComponents/ImageSlider'
import { ProductListParams } from '../TypesCheck/HomeProps'
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard'
import { fetchCategories } from '../MiddleWares/HomeMiddleWare'
import { useFocusEffect } from '@react-navigation/native'

type Props = {}

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const goToCartScreen = () => {
    navigation.navigate("Cart")
  }

  const sliderImages = [
    require("../../assets/sliderImages/image1.jpg"),
    require("../../assets/sliderImages/image2.jpg"),
    require("../../assets/sliderImages/image3.jpg"),
  ]
  
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
  const [activeCate, setActiveCate] = useState<string>("")

  useEffect(() => {
    fetchCategories({setGetCategory});
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchCategories({setGetCategory});
    }, [])
  )

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40: 0, flex: 1, backgroundColor: "black"}}>
      <HeaderComponent goToCartScreen={goToCartScreen} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ImageSlider images={sliderImages}/>
      </ScrollView>
      <View style={{backgroundColor: "yellow", flex: 1}}>
        <Text>
          Hello
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          style={{marginTop: 4}}>
            {
              getCategory.map((item, index) => (
                <CategoryCard
                  item={{"name": item.name, "images": item.images, _id: item._id}}
                  cateStyleProps={{
                    "height": 50,
                    "width": 55,
                    "radius": 20,
                    "resizeMode": "contain"
                  }}
                  cateProps={{
                    "activeCate": activeCate, "onPress": () => setActiveCate(item._id)
                  }} />
              ))
            }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
