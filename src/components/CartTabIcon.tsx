import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function CartTabIcon({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) {
  const { cartItems } = useAuth();

  return (
    <View className="relative items-center justify-center">
      <Ionicons
        name={focused ? "cart" : "cart-outline"}
        size={25}
        color={color}
      />
      {cartItems.length > 0 && (
        <View className="absolute -top-1 -right-2 bg-red-600 rounded-full min-w-[16px] h-4 px-1 items-center justify-center border border-white">
          <Text className="text-white text-[10px] font-bold text-center">
            {cartItems.length > 99 ? "99+" : cartItems.length}
          </Text>
        </View>
      )}
    </View>
  );
}
