import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLoader } from "../../hooks/useLoder";
import { registation } from "../../service/authService";

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showLoader, hideLoader } = useLoader();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    showLoader();
    try {


      await registation(fullName, email, password);
      alert("Registration successful");
      router.replace("/login");
      
    } catch (error: any) {
      console.log("Registration error:", error?.code, error?.message);
      alert(error?.message ?? "Registration failed");
    }
    finally {
      hideLoader();
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-6">
      <View className="w-full bg-white rounded-2xl p-8 shadow-lg">

        <Text className="text-2xl font-bold text-center mb-6">
          Register
        </Text>

        <TextInput
          placeholder="Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#6B7280"
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#6B7280"
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#6B7280"
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-2 mb-6"
        />

        <Pressable
          className="bg-blue-600 py-3 rounded-lg items-center mb-4"
          onPress={handleRegister}
        >
          <Text className="text-white font-semibold">
            Submit
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-600 mr-1">
            Already have an account?
          </Text>

          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="text-blue-600 font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
