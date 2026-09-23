import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, loading } = useAuth();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 justify-center px-6">
        {/* Email */}
        <View className="mb-5">
          <View className="flex-row items-center rounded-2xl border border-slate-200 bg-white px-4">
            <Ionicons name="mail-outline" size={21} color="#64748B" />

            <TextInput
              className="ml-3 flex-1 py-4 text-base text-slate-900"
              placeholder="Enter your email"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password */}
        <View className="mb-3">
          <View className="flex-row items-center rounded-2xl border border-slate-200 bg-white px-4">
            <Ionicons name="lock-closed-outline" size={21} color="#64748B" />

            <TextInput
              className="ml-3 flex-1 py-4 text-base text-slate-900"
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={21}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot password */}
        <TouchableOpacity className="mb-7 self-end">
          <Text className="font-semibold text-[#A10E10]">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity
          onPress={() => handleLogin(email, password)}
          activeOpacity={0.8}
          className="items-center rounded-full bg-[#A10E10] py-4 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#3b82f6" />
          ) : (
            <Text className="text-base font-bold text-white">Login</Text>
          )}
        </TouchableOpacity>

        {/* Register */}
        <View className="mt-7 flex-row justify-center">
          <Text className="text-slate-500">Don't have an account? </Text>

          <TouchableOpacity>
            <Text className="font-bold text-[#A10E10]">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10 flex-row items-center justify-center">
          <Text className="mx-3 text-base font-thin text-slate-500">OR</Text>
        </View>

        <View className="mt-7 flex-row justify-center gap-4">
          <TouchableOpacity className="flex flex-row h-12 w-full items-center justify-center gap-10 rounded-full border border-slate-200">
            <Ionicons name="logo-google" size={24} color="#64748B" />
            <Text className="ml-3 text-base font-semibold text-slate-500">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
