import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchResultsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { addToCart, checkCartItemExists } = useAuth();

  const handleSearch = async (text: string) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${text}`,
      );
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <View className="flex-1 bg-white px-5 pt-12">
      {/* Top Header: Back Button & Search Bar */}
      <View className="flex-row items-center space-x-3 mb-4">
        <Pressable onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>

        <View className="flex-1 flex-row items-center bg-gray-50 rounded-full px-4 py-2.5 border border-gray-100">
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            placeholder="Search here"
            placeholderTextColor="#9ca3af"
            className="flex-1 ml-2 text-gray-800 text-sm font-medium"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#6b7280" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Results Header Info */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm text-gray-700">
          Results for <Text className="font-bold">"{searchQuery}"</Text>
        </Text>
        <Text className="text-sm font-semibold text-blue-600">
          {searchResults.length} Results Found
        </Text>
      </View>

      <FlatList
        className="mb-20"
        data={searchResults}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View className="w-[48%] bg-gray-50 rounded-2xl p-2.5 border border-gray-100 mb-4">
            <View className="relative">
              <Image
                source={{ uri: item.thumbnail }}
                className="w-full h-36 rounded-xl"
              />
              <Pressable className="absolute top-2 right-2 bg-black/20 p-1.5 rounded-full">
                <Ionicons name="heart-outline" size={16} color="white" />
              </Pressable>
            </View>

            <View className="mt-2.5 flex-row justify-between items-end">
              <View className="flex-1 mr-1">
                <Text
                  className="text-sm font-bold text-gray-900"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text className="text-xs font-bold text-blue-600 mt-0.5">
                  ${item.price.toFixed(2)}
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  addToCart(item);
                }}
                className="w-7 h-7 rounded-full bg-indigo-600 justify-center items-center shadow-sm"
              >
                {checkCartItemExists(item.id) ? (
                  <Ionicons name="checkmark" size={16} color="white" />
                ) : (
                  <Ionicons name="add" size={16} color="white" />
                )}
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
