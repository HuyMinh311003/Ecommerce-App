import { View, Text, Platform, ScrollView, Pressable, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TabsStackScreenProps } from '../Navigation/TabNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderComponent } from '../Components/HeaderComponent'
import ImageSlider from '../Components/HomeScreenComponents/ImageSlider'
import { ProductListParams } from '../TypesCheck/HomeProps'
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard'
import { fetchCategories, fetchProductsByCateID, fetchFeaturedProducts } from '../MiddleWares/HomeMiddleWare'
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
  
  const [activeCate, setActiveCate] = useState<string>("")
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
  const [getProductsByCateID, setGetProductsByCateID] = useState<ProductListParams[]>([])

  const [getFeaturedProducts, setGetFeaturedProducts] = useState<ProductListParams[]>([])

  useEffect(() => {
    fetchCategories({setGetCategory});
  }, [])

  useEffect(() => {
    console.log("fetchProductByCateID", fetchProductsByCateID);
    if (activeCate) {
      fetchProductsByCateID({ setGetProductsByCateID, cateID: activeCate })
    }
  }, [activeCate]);

  useEffect(() => {
    console.log("fetchFeaturedProducts", fetchFeaturedProducts);
    fetchFeaturedProducts({ setGetFeaturedProducts });  // Gọi API để lấy sản phẩm nổi bật
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({setGetCategory});
      if (activeCate) {
        fetchProductsByCateID({ setGetProductsByCateID, cateID: activeCate });
      }
      fetchFeaturedProducts({ setGetFeaturedProducts }); 
    }, [activeCate])
  )

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40: 0, flex: 1, backgroundColor: "black"}}>
      <HeaderComponent goToCartScreen={goToCartScreen} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ImageSlider images={sliderImages}/>
      </ScrollView>

      <ScrollView>
      <View style={{backgroundColor: "yellow", flex: 1}}>
      <Text style={{fontSize: 14, fontWeight: "bold", padding: 10}}>
          Categories
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          style={{marginBottom: 10}}>
            {
              getCategory.map((item, index) => (
                <CategoryCard
                  key={index}
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

      <View style={{
        backgroundColor: "pink", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
        <Text style={{fontSize: 14, fontWeight: "bold", padding: 10}}>
          Products from Selected Category
        </Text>
        <Pressable>
          <Text style={{fontSize: 11, fontWeight: "bold", padding: 10}}>
            See All
          </Text>
        </Pressable>
      </View>

      <View style={{
          backgroundColor: "#fff", borderWidth: 7, borderColor: "green", flexDirection: "row", 
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            getProductsByCateID?.length > 0 ? (
              getProductsByCateID.map((item, index) => (
                <CategoryCard 
                  key={index}
                  item={{"name": item.name, "images": item.images, "_id": item._id}}
                  cateStyleProps={{
                    "height": 100,
                    "width": 100,
                    "radius": 10,
                    "resizeMode": "contain"
                  }}
                  cateProps={{
                    "onPress": () => Alert.alert(item.name)
                  }}
                />
              ))
            ) : (
              <Text>Không có sản phẩm nào</Text>
          )}
        </ScrollView>
      </View>

      <View style={{
        backgroundColor: "red", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
        <Text style={{fontSize: 14, fontWeight: "bold", padding: 10}}>
          Featured Products
        </Text>
        <Pressable>
          <Text style={{fontSize: 11, fontWeight: "bold", padding: 10}}>
            See All
          </Text>
        </Pressable>
      </View>

      <View style={{
        backgroundColor: "#fff", borderWidth: 7, borderColor: "green", flexDirection: "row",
        justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            getFeaturedProducts?.length > 0 ? (
              getFeaturedProducts.map((item, index) => (
                <CategoryCard
                  key={index}
                  item={{ "name": item.name, "images": item.images, "_id": item._id }}
                  cateStyleProps={{
                    "height": 100,
                    "width": 100,
                    "radius": 10,
                    "resizeMode": "contain"
                  }}
                  cateProps={{
                    "onPress": () => Alert.alert(item.name)
                  }}
                />
              ))
            ) : (
              <Text>Không có sản phẩm nào nổi bật</Text>
            )
          }
        </ScrollView>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
