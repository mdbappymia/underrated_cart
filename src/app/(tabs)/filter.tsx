import { useAuth } from "@/context/AuthContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { PanResponder, Pressable, ScrollView, Text, View } from "react-native";

export default function FilterScreen() {
  const { filter, setFilter } = useAuth();
  const [selectedGender, setSelectedGender] = useState(filter.gender || "All");
  const [selectedBrands, setSelectedBrands] = useState(
    filter.brands || ["Puma", "Nike", "Supreme"],
  );
  const [selectedColors, setSelectedColors] = useState(
    filter.colors || ["Black", "Yellow", "Green"],
  );

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b: string) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c: string) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const absoluteMin = 0;
  const absoluteMax = 1000;
  const [minPrice, setMinPrice] = useState(filter.minPrice ?? 16);
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice ?? 543);
  const activeThumb = useRef<"min" | "max">("min");
  const trackWidthRef = useRef(0);
  const minPriceRef = useRef(minPrice);
  const maxPriceRef = useRef(maxPrice);
  minPriceRef.current = minPrice;
  maxPriceRef.current = maxPrice;

  const updatePriceFromTouch = (locationX: number) => {
    if (!trackWidthRef.current) return;

    const nextValue = Math.round(
      Math.max(
        absoluteMin,
        Math.min(
          absoluteMax,
          (locationX / trackWidthRef.current) * absoluteMax,
        ),
      ),
    );

    if (activeThumb.current === "min") {
      setMinPrice(Math.min(nextValue, maxPriceRef.current));
    } else {
      setMaxPrice(Math.max(nextValue, minPriceRef.current));
    }
  };

  const priceTrackResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (event) => {
        const locationX = event.nativeEvent.locationX;
        const minPosition =
          (minPriceRef.current / absoluteMax) * trackWidthRef.current;
        const maxPosition =
          (maxPriceRef.current / absoluteMax) * trackWidthRef.current;
        activeThumb.current =
          Math.abs(locationX - minPosition) <= Math.abs(locationX - maxPosition)
            ? "min"
            : "max";
        updatePriceFromTouch(locationX);
      },
      onPanResponderMove: (event) => {
        updatePriceFromTouch(event.nativeEvent.locationX);
      },
    }),
  ).current;

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-12 pb-8">
      {/* Top Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900">Filter</Text>
      </View>

      {/* Gender Section */}
      <View className="mb-6">
        <Text className="text-base font-bold text-gray-900 mb-3">Gender</Text>
        <View className="flex-row space-x-3">
          {["All", "Men", "Women"].map((gender) => {
            const isSelected = selectedGender === gender;
            return (
              <Pressable
                key={gender}
                onPress={() => setSelectedGender(gender)}
                className={`flex-1 py-3 rounded-xl items-center justify-center ${
                  isSelected ? "bg-red-700" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-semibold ${isSelected ? "text-white" : "text-gray-500"}`}
                >
                  {gender}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Brand Section */}
      <View className="mb-6">
        <Text className="text-base font-bold text-gray-900 mb-3">Brand</Text>
        <View className="flex-row flex-wrap gap-3">
          {["Adidas", "Puma", "CR7", "Nike", "Yeezy", "Supreme"].map(
            (brand) => {
              const isSelected = selectedBrands.includes(brand);
              return (
                <Pressable
                  key={brand}
                  onPress={() => toggleBrand(brand)}
                  className={`py-3 px-6 rounded-xl items-center justify-center w-[30%] ${
                    isSelected ? "bg-red-700" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-500"}`}
                  >
                    {brand}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>
      </View>

      {/* Price Range Section */}
      <View className="mb-6">
        <Text className="text-base font-bold text-gray-900 mb-2">
          Price Range
        </Text>

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm font-semibold text-gray-700">
            ${minPrice}
          </Text>
          <Text className="text-sm font-semibold text-gray-700">
            ${maxPrice}
          </Text>
        </View>

        <View
          className="relative mx-2.5 h-10 justify-center"
          onLayout={(event) => {
            const width = event.nativeEvent.layout.width;
            trackWidthRef.current = width;
          }}
          {...priceTrackResponder.panHandlers}
        >
          <View className="absolute left-0 right-0 h-2 bg-gray-100 rounded-full" />

          <View
            className="absolute h-2 bg-red-700 rounded-full"
            style={{
              left: `${((minPrice - absoluteMin) / (absoluteMax - absoluteMin)) * 100}%`,
              right: `${100 - ((maxPrice - absoluteMin) / (absoluteMax - absoluteMin)) * 100}%`,
            }}
          />

          <View
            pointerEvents="none"
            className="absolute h-5 w-5 rounded-full border-2 border-white bg-red-700 shadow"
            style={{
              left: `${(minPrice / absoluteMax) * 100}%`,
              top: "50%",
              marginLeft: -10,
              marginTop: -10,
            }}
          />
          <View
            pointerEvents="none"
            className="absolute h-5 w-5 rounded-full border-2 border-white bg-red-700 shadow"
            style={{
              left: `${(maxPrice / absoluteMax) * 100}%`,
              top: "50%",
              marginLeft: -10,
              marginTop: -10,
            }}
          />
        </View>
      </View>

      {/* Color Section */}
      <View className="mb-6">
        <Text className="text-base font-bold text-gray-900 mb-3">Color</Text>
        <View className="flex-row flex-wrap gap-3">
          {["White", "Black", "Grey", "Yellow", "Red", "Green"].map((color) => {
            const isSelected = selectedColors.includes(color);
            return (
              <Pressable
                key={color}
                onPress={() => toggleColor(color)}
                className={`py-3 px-6 rounded-xl items-center justify-center w-[30%] ${
                  isSelected ? "bg-red-700" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-500"}`}
                >
                  {color}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Another Option Card */}
      <Pressable className="flex-row items-center justify-between bg-gray-50 p-4 rounded-2xl mb-8">
        <Text className="font-semibold text-gray-800">Another option</Text>
        <Feather name="chevron-right" size={20} color="black" />
      </Pressable>

      {/* Apply Filter Button */}
      <Pressable
        onPress={() => {
          setFilter({
            gender: selectedGender,
            brands: selectedBrands,
            colors: selectedColors,
            minPrice,
            maxPrice,
          });
          router.navigate("/search");
        }}
        className="bg-red-700 py-4 rounded-full items-center shadow-lg shadow-red-200 mb-6"
      >
        <Text className="text-white font-bold text-base">Apply Filter</Text>
      </Pressable>
    </ScrollView>
  );
}
