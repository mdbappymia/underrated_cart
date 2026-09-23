import CartTabIcon from "@/components/CartTabIcon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          height: 65,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 8,
        },

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <CartTabIcon color={color as string} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={25}
              color={color}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="filter"
        options={{
          title: "Filter",
          href: null,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          href: null,
        }}
      />
      <Tabs.Screen
        name="details/[id]"
        options={{
          title: "Details",
          href: null,
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: "Checkout",
          href: null,
        }}
      />
      <Tabs.Screen
        name="successfull"
        options={{
          title: "Successfull",
          href: null,
        }}
      />
    </Tabs>
  );
}
