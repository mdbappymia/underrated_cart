import { Text, View } from "react-native";

export default function CartScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <Text className="text-4xl">🛒</Text>

      <Text className="mt-4 text-3xl font-bold text-slate-900">Cart</Text>

      <Text className="mt-2 text-base text-slate-500">Your cart is empty</Text>
    </View>
  );
}
