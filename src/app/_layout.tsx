import { AuthProvider } from "@/context/AuthContext";
import "@/global.css";
import { router, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { configureReanimatedLogger } from "react-native-reanimated";

configureReanimatedLogger({ strict: false });

function BackButton() {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="ml-4 h-10 w-10 items-center justify-center rounded-full"
    >
      <ChevronLeft />
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackTitle: "",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      >
        {/* Loading  */}
        <Stack.Screen
          name="loading"
          options={{
            headerShown: false,
          }}
        />
        {/* Starter */}
        <Stack.Screen
          name="starter"
          options={{
            headerShown: false,
          }}
        />

        {/* Login */}
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* Main Tabs */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
