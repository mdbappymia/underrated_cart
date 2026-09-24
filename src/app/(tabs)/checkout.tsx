import { useAuth } from "@/context/AuthContext";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

function getFormattedDateTime() {
  const now = new Date();
  const timePart = now
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const dayNum = now.getDate();
  return `${timePart}, ${weekday} ${dayNum}`;
}

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState("wallet");
  const { orderSummary, user, clearCart, setOrderSummary } = useAuth();

  // console.log(user);
  return (
    <>
      {user.id && orderSummary ? (
        <View className="flex-1 bg-white">
          <ScrollView
            className="flex-1 px-5 pt-12 pb-28"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row items-center justify-between mb-6">
              <Pressable onPress={() => router.back()} className="p-1">
                <Ionicons name="chevron-back" size={24} color="black" />
              </Pressable>
              <Text className="text-lg font-bold text-gray-900">Check Out</Text>
              <View style={{ width: 24 }} />
            </View>

            <View className="flex-row items-center mb-5">
              <View className="w-12 h-12 rounded-full bg-indigo-50 items-center justify-center mr-3">
                <Ionicons name="location-outline" size={22} color="#4f46e5" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-900">
                  {(user.address && user.address.address) || ""},{" "}
                  {(user.address && user.address.city) || ""}
                </Text>
                <Text
                  className="text-xs text-gray-400 mt-0.5"
                  numberOfLines={1}
                >
                  {(user.address && user.address.state) || ""},{" "}
                  {(user.address && user.address.country) || ""}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 rounded-full bg-indigo-50 items-center justify-center mr-3">
                <Ionicons name="time-outline" size={22} color="#4f46e5" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-900">
                  {getFormattedDateTime()}
                </Text>
              </View>
            </View>

            <View className="bg-gray-50 border border-gray-100 rounded-3xl p-5 mb-6">
              <Text className="text-base font-bold text-gray-900 mb-4">
                Order Summary
              </Text>

              <View className="space-y-2.5">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500 font-medium">
                    Items
                  </Text>
                  <Text className="text-sm font-bold text-gray-900">
                    {orderSummary.totalProducts || 0}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500 font-medium">
                    Subtotal
                  </Text>
                  <Text className="text-sm font-bold text-gray-900">
                    $
                    {isNaN(orderSummary.total)
                      ? 0
                      : Number(orderSummary.total).toFixed(2)}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500 font-medium">
                    Discount
                  </Text>
                  <Text className="text-sm font-bold text-gray-900">
                    $
                    {Number.isFinite(Number(orderSummary.discountedTotal)) &&
                    Number(orderSummary.discountedTotal) > 0
                      ? (
                          Number(orderSummary.total) -
                          Number(orderSummary.discountedTotal)
                        ).toFixed(2)
                      : 0}
                  </Text>
                </View>

                <View className="flex-row justify-between pb-3 border-b border-gray-200">
                  <Text className="text-sm text-gray-500 font-medium">
                    Delivery Charges
                  </Text>
                  <Text className="text-sm font-bold text-gray-900">${2}</Text>
                </View>

                <View className="flex-row justify-between pt-2">
                  <Text className="text-base font-bold text-gray-900">
                    Total
                  </Text>
                  <Text className="text-base font-bold text-gray-900">
                    ${(Number(orderSummary.discountedTotal) + 2).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-base font-bold text-gray-900 mb-4">
              Choose payment method
            </Text>

            <Pressable
              onPress={() => setSelectedPayment("wallet")}
              className="flex-row items-center justify-between bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-3"
            >
              <View className="flex-row items-center gap-2 space-x-3">
                <View className="w-8 h-8 rounded-full bg-amber-400 items-center justify-center">
                  <Fontisto name="wallet" size={14} color="white" />
                </View>
                <Text className="text-sm font-bold text-gray-800">
                  My Pocket Wallet
                </Text>
              </View>

              <View
                className={`w-6 h-6 rounded-full border items-center justify-center ${
                  selectedPayment === "wallet"
                    ? "bg-indigo-600 border-indigo-600"
                    : "border-gray-300"
                }`}
              >
                {selectedPayment === "wallet" && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
            </Pressable>

            <Pressable className="flex-row items-center justify-between bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-6">
              <Text className="text-sm font-semibold text-gray-700">
                Add new payment method
              </Text>
              <View className="w-7 h-7 rounded-full bg-gray-200/60 items-center justify-center">
                <Ionicons name="add" size={16} color="black" />
              </View>
            </Pressable>
          </ScrollView>

          <View className="mb-20 bg-white px-6 py-4 border-t border-gray-100">
            <Pressable
              onPress={() => {
                clearCart(orderSummary.id);
                setOrderSummary({});
                router.push("/successfull");
              }}
              disabled={
                !Number.isFinite(Number(orderSummary.discountedTotal)) ||
                Number(orderSummary.discountedTotal) <= 0
              }
              className="w-full bg-red-700 disabled:bg-gray-700 h-14 rounded-2xl items-center justify-center shadow-lg shadow-red-200"
            >
              <Text className="text-white font-bold text-base">Order Now</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
    </>
  );
}
