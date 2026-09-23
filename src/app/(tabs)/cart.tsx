import { useAuth } from "@/context/AuthContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo, useCallback } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

type CartItem = {
  id: string;
  title: string;
  brand?: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartItemRowProps = {
  item: CartItem;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

function CartItemRow({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemRowProps) {
  return (
    <View className="bg-gray-50 border border-gray-100 rounded-3xl p-3.5 relative flex-row items-center mb-3">
      <Image
        source={{ uri: item.thumbnail }}
        className="w-20 h-20 rounded-2xl bg-white"
      />

      <View className="flex-1 ml-3.5 justify-between">
        <View className="flex-row justify-between items-start">
          <View className="max-w-[200px]">
            <Text className="text-base font-bold text-gray-900">
              {item.title}
            </Text>
            <Text className="text-xs text-gray-400 font-medium">
              {item.brand}
            </Text>
          </View>
          <Pressable onPress={() => onRemove(item.id)} className="p-1">
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-sm font-bold text-indigo-600">
            ${item.price.toFixed(2)}
          </Text>

          <View className="flex-row items-center space-x-3 gap-3">
            <Pressable
              onPress={() => onDecrease(item.id)}
              className="w-7 h-7 rounded-full bg-indigo-600/20 items-center justify-center"
            >
              <Ionicons name="remove" size={14} color="#4f46e5" />
            </Pressable>
            <Text className="text-sm font-bold text-gray-900">
              {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
            </Text>
            <Pressable
              onPress={() => onIncrease(item.id)}
              className="w-7 h-7 rounded-full bg-indigo-600 items-center justify-center"
            >
              <Ionicons name="add" size={14} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const MemoizedCartItemRow = memo(CartItemRow);

export default function CartScreen() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    orderSummary,
  } = useAuth();

  const removeItem = useCallback(
    (id: string) => removeFromCart(id),
    [removeFromCart],
  );
  const increaseItem = useCallback(
    (id: string) => increaseQuantity(id),
    [increaseQuantity],
  );
  const decreaseItem = useCallback(
    (id: string) => decreaseQuantity(id),
    [decreaseQuantity],
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-5 pt-12 mb-6">
        <Pressable onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900">Cart</Text>
        <Pressable className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100">
          <Feather name="more-vertical" size={20} color="black" />
        </Pressable>
      </View>

      {cartItems.length > 0 ? (
        <View>
          <FlatList
            className="max-h-96 min-h-[200px] px-5"
            contentContainerClassName="pb-2"
            showsVerticalScrollIndicator={false}
            data={cartItems as CartItem[]}
            keyExtractor={(item) => item.id + Math.random()}
            renderItem={({ item }) => (
              <MemoizedCartItemRow
                item={item}
                onRemove={removeItem}
                onIncrease={increaseItem}
                onDecrease={decreaseItem}
              />
            )}
          />
        </View>
      ) : (
        <View className="h-40 flex justify-center items-center">
          <Text className="text-3xl">No item in cart</Text>
          <Pressable
            onPress={() => {
              router.push("/search");
            }}
            className="border p-3 rounded-full mt-5 "
          >
            <Text>Add item</Text>
          </Pressable>
        </View>
      )}

      <View className="mx-5 bg-gray-50 border border-gray-100 rounded-3xl p-5 mb-6">
        <Text className="text-base font-bold text-gray-900 mb-4">
          Order Summary
        </Text>

        <View className="space-y-2.5">
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500 font-medium">Items</Text>
            <Text className="text-sm font-bold text-gray-900">
              {orderSummary.totalQuantity}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500 font-medium">Subtotal</Text>
            <Text className="text-sm font-bold text-gray-900">
              ${orderSummary.total > 0 && Number(orderSummary.total).toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500 font-medium">Discount</Text>
            <Text className="text-sm font-bold text-gray-900">
              $
              {cartItems.length > 0
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
            <Text className="text-sm font-bold text-gray-900">
              ${cartItems.length > 0 ? 2 : 0}
            </Text>
          </View>

          <View className="flex-row justify-between pt-2">
            <Text className="text-base font-bold text-gray-900">Total</Text>
            <Text className="text-base font-bold text-gray-900">
              $
              {cartItems.length > 0 && orderSummary.discountedTotal > 0
                ? Number(orderSummary.discountedTotal) + 2
                : 0}
            </Text>
          </View>
        </View>
      </View>

      <View className="absolute bottom-20 left-0 right-0 bg-white px-6 py-4 border-t border-gray-100">
        <Pressable
          onPress={() => {
            router.push("/checkout");
          }}
          className="w-full bg-red-700 h-14 rounded-2xl items-center justify-center shadow-lg shadow-red-200"
        >
          <Text className="text-white font-bold text-base">Check Out</Text>
        </Pressable>
      </View>
    </View>
  );
}
