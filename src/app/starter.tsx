import { router } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const starter = () => {
  return (
    <View className="flex justify-center items-center h-screen">
      <View className="flex justify-center items-center gap-4">
        <ShoppingCart size={100} color="black" strokeWidth={1} />
        <Text className="text-4xl font-bold">
          Underrated <Text className="font-thin">Cart</Text>
        </Text>
      </View>
      <View className="mt-10 flex justify-center items-center gap-2">
        <Text className="text-xl text-slate-500 font-bold">
          Let's get started
        </Text>
        <Text className="text-lg font-thin text-slate-500 mx-10 text-center">
          Login to enjoy features we have provided, and stay healthy
        </Text>
      </View>
      <View className="mt-10 flex justify-center items-center gap-2">
        <Pressable
          onPress={() => {
            router.push("/login");
          }}
          className="bg-[#A10E10] border border-[#A10E10] px-4 py-4 w-64 rounded-full items-center"
        >
          <Text className="text-white text-base font-bold">Login</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            // router.replace("/signup");
            alert("Sign Up feature is not available yet.");
          }}
          className=" border border-[#A10E10] px-4 py-4 w-64 rounded-full items-center mt-2"
        >
          <Text className="hover:text-white text-base font-bold">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default starter;
