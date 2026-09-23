import { useAuth } from "@/context/AuthContext";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const ProfileScreen = () => {
  const { user, handleLogout } = useAuth();

  const menuItems = [
    { title: "Profile", icon: "person-outline", route: "/profile" },
    { title: "Favorite", icon: "heart-outline", route: "/profile" },
    { title: "Payment Method", icon: "wallet-outline", route: "/profile" },
    { title: "Privacy Policy", icon: "lock-closed-outline", route: "/profile" },
    { title: "Settings", icon: "settings-outline", route: "/profile" },
    { title: "Help", icon: "help-circle-outline", route: "/profile" },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-12 ">
      {/* Top Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-red-600">My Profile</Text>
        <Pressable>
          <Ionicons name="menu-outline" size={28} color="black" />
        </Pressable>
      </View>

      <View className="items-center mb-4">
        <View className="relative mb-2">
          <Image
            source={{
              uri:
                user.image ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
            }}
            className="w-24 h-24 rounded-full"
          />
          <Pressable className="absolute bottom-0 right-0 bg-red-500 p-1.5 rounded-full border-2 border-white">
            <MaterialIcons name="edit" size={14} color="white" />
          </Pressable>
        </View>
        <Text className="text-lg font-bold text-gray-900">
          {user.firstName} {user.lastName}
        </Text>

        {/* QR Code */}
        <View className="mt-2 bg-white p-2 rounded-lg shadow-sm">
          <QRCode
            value={`${user.firstName} ${user.lastName} ID: ${user.id}`}
            size={60}
            color="black"
            backgroundColor="white"
          />
        </View>
      </View>

      {/* Menu List */}
      <View className="mb-6 space-y-3">
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(item.route as any)}
            className="flex-row items-center justify-between py-3 px-2 rounded-xl active:bg-gray-50"
          >
            <View className="flex-row items-center space-x-4">
              <View className="w-10 h-10 rounded-full bg-blue-50 justify-center items-center">
                <Ionicons name={item.icon as any} size={20} color="#60a5fa" />
              </View>
              <Text className="text-base font-medium text-gray-800">
                {item.title}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#93c5fd" />
          </Pressable>
        ))}
      </View>

      <View className="bg-white rounded-3xl p-6  shadow-xl border border-gray-100 mb-20 items-center">
        <Text className="text-xl font-bold text-red-600 mb-1">Logout</Text>
        <Text className="text-xs text-gray-500 mb-6">
          are you sure you want to log out?
        </Text>

        <View className="flex-row space-x-4 w-full">
          <Pressable
            onPress={() => {
              router.replace("/");
            }}
            className="flex-1 bg-pink-100 py-3 rounded-full items-center"
          >
            <Text className="text-pink-500 font-bold text-base">Cancel</Text>
          </Pressable>

          <Pressable
            onPress={handleLogout}
            className="flex-1 bg-red-600 py-3 rounded-full items-center shadow-md shadow-red-200"
          >
            <Text className="text-white font-bold text-base">Yes, Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
