import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const successfull = () => {
  return (
    <SafeAreaView className="p-5">
      <View className="flex-row items-center justify-between mb-6">
        <Pressable onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <View style={{ width: 24 }} />
      </View>
      <View className="flex justify-center items-center h-[80vh]">
        <View className="bg-red-500 rounded-full font-thin">
          <Ionicons name="checkmark" size={250} color="white" />
        </View>
        <Text className="text-center font-bold text-3xl mt-32 mb-10 text-red-500">
          Congratulation
        </Text>
        <Text className="text-xl  text-red-500">Order is successful</Text>
      </View>
    </SafeAreaView>
  );
};

export default successfull;
