import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState("8");
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<any>(null);

  // Fetch product details based on the ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const sizes = [
    { id: "8", available: true },
    { id: "10", available: true },
    { id: "38", available: true },
    { id: "40", available: false },
  ];

  const { width: screenWidth } = Dimensions.get("window");

  const [activeIndex, setActiveIndex] = useState(0);

  const imagesList =
    product?.images?.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400"];

  const calculateRating = useCallback(() => {
    if (product && product.reviews && product.reviews.length > 0) {
      const totalRating = product.reviews.reduce(
        (sum: number, review: any) => sum + review.rating,
        0,
      );
      return (totalRating / product.reviews.length).toFixed(1);
    }
    return 0;
  }, [product]);

  const rating = calculateRating();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative w-full h-80 bg-gray-100">
          <View className="relative w-full h-80 bg-gray-100">
            <FlatList
              data={imagesList}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                const currentIndex = Math.round(x / screenWidth);
                setActiveIndex(currentIndex);
              }}
              scrollEventThrottle={16}
              renderItem={({ item }) => (
                <View style={{ width: screenWidth }} className="h-80">
                  <Image
                    source={{ uri: item }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            />

            {imagesList.length > 1 && (
              <View className="absolute bottom-3 left-0 right-0 flex-row justify-center items-center space-x-1.5">
                {imagesList.map((_: any, index: any) => (
                  <View
                    key={index}
                    className={`h-1.5 rounded-full ${
                      activeIndex === index
                        ? "w-4 bg-white"
                        : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute top-12 left-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full items-center justify-center shadow-sm"
          >
            <Ionicons name="chevron-back" size={22} color="black" />
          </Pressable>

          {/* Favorite Button */}
          <Pressable
            onPress={() => setIsFavorite(!isFavorite)}
            className="absolute top-12 right-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full items-center justify-center shadow-sm"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? "#dc2626" : "black"}
            />
          </Pressable>
        </View>

        <View className="px-6 pt-6 pb-28">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-bold text-gray-900 wrap w-64">
              {product?.title}
            </Text>
            <Text className="text-2xl w-40 px-4 font-bold text-indigo-600">
              ${product?.price}
            </Text>
          </View>

          <View className="flex-row items-center mb-6">
            <Ionicons name="star" size={16} color="#eab308" />
            <Text className="text-sm font-bold text-gray-900 ml-1">
              {rating}
            </Text>
            <Text className="text-xs text-gray-500 ml-1.5">
              ( {product?.reviews.length || 0} Review )
            </Text>
          </View>

          <View className="mb-6 min-h-[100px]">
            <Text className="text-base font-bold text-gray-900 mb-2">
              Description
            </Text>
            <Text className="text-sm text-gray-500 leading-relaxed">
              {product?.description ||
                "No description available for this product."}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-base font-bold text-gray-900 mb-3">Size</Text>
            <View className="flex-row space-x-3">
              {sizes.map((sizeObj) => {
                const isSelected = selectedSize === sizeObj.id;
                return (
                  <Pressable
                    key={sizeObj.id}
                    disabled={!sizeObj.available}
                    onPress={() => setSelectedSize(sizeObj.id)}
                    className={`w-14 h-14 rounded-2xl items-center justify-center border relative ${
                      isSelected
                        ? "border-red-600 bg-white"
                        : sizeObj.available
                          ? "border-gray-200 bg-white"
                          : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    <Text
                      className={`font-bold text-base ${
                        isSelected ? "text-red-600" : "text-gray-800"
                      }`}
                    >
                      {sizeObj.id}
                    </Text>

                    {!sizeObj.available && (
                      <View className="absolute w-[120%] h-[1px] bg-gray-300 rotate-45" />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View className="mb-6 flex flex-row justify-between p-5 gap-6 items-center">
            <Pressable className="w-64 border rounded-full flex-row justify-center items-center bg-[#A10E10]">
              <Text className="text-base p-3 font-bold text-white">
                Buy now
              </Text>
            </Pressable>
            <ShoppingBag size={35} color={"#7d7a7a"} />
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-100 flex-row items-center space-x-4">
        {/* Cart Bag Icon Button */}
        <Pressable className="w-14 h-14 bg-gray-100 rounded-2xl items-center justify-center">
          <Ionicons name="bag-outline" size={22} color="#4b5563" />
        </Pressable>

        <Pressable
          onPress={() => {
            // Add your checkout or buy navigation logic here
          }}
          className="flex-1 bg-red-700 h-14 rounded-2xl items-center justify-center shadow-lg shadow-red-200"
        >
          <Text className="text-white font-bold text-base">Buy Now</Text>
        </Pressable>
      </View>
    </View>
  );
}
