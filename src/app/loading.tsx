import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user.id) {
        router.replace("/");
      } else {
        router.replace("/starter");
      }
    }
  }, [loading, user]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
};

export default Loading;
