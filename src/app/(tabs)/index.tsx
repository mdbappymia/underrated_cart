import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user, manageFavorite, checkFavorite } = useAuth();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({ name: "", image: "" });
  const [activeSlide, setActiveSlide] = useState(0);
  const categoriesPerPage = 8;
  const totalSlides = Math.ceil(categories.length / categoriesPerPage);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.round(
      event.nativeEvent.contentOffset.x / slideSize,
    );
    setActiveSlide(currentIndex);
  };

  const [featuredProducts, setFeatureProducts] = useState<any>([]);

  const [recommendedProducts, setRecommendedProducts] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories",
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchFeatureProducts = async () => {
      try {
        const response = await fetch(
          activeCategory.name === ""
            ? "https://dummyjson.com/products?limit=20"
            : `https://dummyjson.com/products/category/${activeCategory.name}?limit=20`,
        );
        const data = await response.json();
        setFeatureProducts(data.products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=10&sortBy=rating&order=desc",
        );
        const data = await response.json();
        setRecommendedProducts(data.products);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };
    if (user) {
      fetchCategories();
      fetchFeatureProducts();
      fetchRecommendedProducts();
    }
  }, [user, activeCategory]);

  return (
    <ScrollView
      className="flex-1 bg-white px-6 pt-12 pb-24"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center space-x-3">
          <Image
            source={{
              uri:
                user?.image ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
            }}
            className="w-12 h-12 rounded-full border border-gray-100"
          />
          <View>
            <Text className="text-gray-400 text-xs font-medium">Hello,</Text>
            <Text className="text-base font-bold text-gray-900">
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
        </View>

        {/* Filter Action Button */}
        <TouchableOpacity
          onPress={() => {
            router.push("/filter");
          }}
          className="flex-row items-center  border  px-3.5 py-2 rounded-xl"
        >
          <Ionicons name="options-outline" size={18} color="#dc2626" />
          <Text className="text-red-600 font-bold text-sm ml-1.5">Filter</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center space-x-3 mb-6">
        <Pressable
          onPress={() => router.navigate("/search")}
          className="flex-1 flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100"
        >
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <Text className="text-gray-800 text-sm ml-2 p-2">Search here</Text>
        </Pressable>
      </View>

      {/* Categories Header */}
      <View className="flex-row items-center mb-4 space-x-2">
        <Ionicons name="grid-outline" size={20} color="#dc2626" />
        <Text className="text-lg font-bold text-gray-900">Categories</Text>
      </View>

      {/* Categories Grid Card */}
      <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-3">
        <View className="mb-3 h-48">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const chunk = categories.slice(
                slideIndex * categoriesPerPage,
                (slideIndex + 1) * categoriesPerPage,
              );

              return (
                <View
                  key={slideIndex}
                  className="w-[100vw] flex-row flex-wrap justify-between px-1"
                >
                  {chunk.map((cat: any, index: number) => (
                    <Pressable
                      key={index}
                      className={`w-[22%] items-center mb-4 rounded-2xl py-2 ${
                        activeCategory.name === cat.name
                          ? "active:bg-gray-100"
                          : ""
                      }`}
                      onPress={() => setActiveCategory(cat)}
                    >
                      <View className="w-12 h-12 rounded-2xl bg-gray-50 justify-center items-center mb-1.5">
                        <Ionicons
                          name={"watch-outline"}
                          size={22}
                          color={
                            activeCategory.name === cat.name
                              ? "#dc2626"
                              : "#9ca3af"
                          }
                        />
                      </View>
                      <Text
                        className={
                          "text-xs font-medium text-center" +
                          (activeCategory.name === cat.name
                            ? " text-red-600"
                            : "text-gray-600")
                        }
                        numberOfLines={1}
                      >
                        {cat.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              );
            })}
          </ScrollView>

          {/* Carousel Indicator Dots */}
          <View className="flex-row justify-center items-center space-x-1.5 mt-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  activeSlide === index ? "w-4 bg-red-600" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Featured Section */}
      <View className="flex-row items-center justify-between mb-3 mt-4">
        <View className="flex-row items-center space-x-2">
          <Ionicons name="flame-outline" size={20} color="#dc2626" />
          <Text className="text-lg font-bold text-gray-900">Featured</Text>
        </View>
        <Pressable onPress={() => router.push("/search")}>
          <Text className="text-sm font-semibold text-blue-600">See All</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4 mb-4"
      >
        {featuredProducts.map((item: any) => (
          <Pressable
            onPress={() => router.push(`/details/${item.id}`)}
            key={item.id}
            className="w-40 bg-gray-50 rounded-2xl p-2.5 border border-gray-100 mr-3"
          >
            <View className="relative">
              <Image
                source={{ uri: item.thumbnail }}
                className="w-full h-36 rounded-xl"
              />
              <Pressable
                onPress={() => {
                  manageFavorite(item.id);
                }}
                className={`absolute top-2 right-2 ${checkFavorite(item.id) ? "bg-green-300" : "bg-black/20"} p-1.5 rounded-full`}
              >
                <Ionicons name="heart-outline" size={16} color={"white"} />
              </Pressable>
            </View>
            <Text className="text-sm font-bold text-gray-900 mt-2">
              {item.title}
            </Text>
            <Text className="text-xs font-semibold text-blue-600 mt-0.5">
              {item.price}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Recommended Section */}
      <View className="flex-row items-center justify-between mb-3 mt-2">
        <View className="flex-row items-center space-x-2">
          <Ionicons name="thumbs-up-outline" size={20} color="#dc2626" />
          <Text className="text-lg font-bold text-gray-900">Recommended</Text>
        </View>
        <Pressable onPress={() => router.push("/search")}>
          <Text className="text-sm font-semibold text-blue-600">See All</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4 mb-40"
      >
        {recommendedProducts.map((item: any) => (
          <Pressable
            onPress={() => router.push(`/details/${item.id}`)}
            key={item.id}
            className="w-40 bg-gray-50 rounded-2xl p-2.5 border border-gray-100 mr-3"
          >
            <View className="relative">
              <Image
                source={{ uri: item.thumbnail }}
                className="w-full h-36 rounded-xl"
              />
              <Pressable
                onPress={() => {
                  manageFavorite(item.id);
                }}
                className={`absolute top-2 right-2 ${checkFavorite(item.id) ? "bg-green-300" : "bg-black/20"} p-1.5 rounded-full`}
              >
                <Ionicons name="heart-outline" size={16} color="white" />
              </Pressable>
            </View>
            <Text className="text-sm font-bold text-gray-900 mt-2">
              {item.title}
            </Text>
            <Text className="text-xs font-semibold text-blue-600 mt-0.5">
              {item.price}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
