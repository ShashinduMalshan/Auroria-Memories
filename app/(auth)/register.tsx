import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Keyboard, Pressable, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useLoader } from "../../hooks/useLoder";
import { registation } from "../../service/authService";

export default function RegisterScreen() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

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
        } catch (error) {
            const err = error as any;
            console.log("Registration error:", err?.code, err?.message);
            alert(err?.message ?? "Registration failed");
        } finally {
            hideLoader();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <LinearGradient
                colors={['#F0F4FF', '#F9FAFB', '#FFFFFF']}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Abstract Emotional Shape */}
                    <View className="mb-10 items-center">
                        <View className="w-16 h-16 bg-blue-100 rounded-full opacity-40 absolute -top-2 -right-8" />
                        <View className="w-20 h-20 bg-purple-100 rounded-full opacity-50 absolute top-4 right-16" />

                        {/* Greeting */}
                        <Text className="text-3xl font-semibold text-gray-800 mb-2 mt-12">
                            Begin your journey 🌸
                        </Text>
                        <Text className="text-base text-gray-500 font-normal">
                            Create your personal space
                        </Text>
                    </View>

                    {/* Register Card */}
                    <View className="w-full bg-white rounded-3xl p-8 mb-6 shadow-sm" style={{
                        shadowColor: '#8B9FD9',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.12,
                        shadowRadius: 24,
                        elevation: 8
                    }}>
                        {/* Full Name Input */}
                        <View className="mb-4">
                            <Text className="text-xs font-medium text-gray-600 mb-2 ml-1">
                                Full Name
                            </Text>
                            <TextInput
                                placeholder="What should we call you?"
                                value={fullName}
                                onChangeText={setFullName}
                                placeholderTextColor="#9CA3AF"
                                onFocus={() => setNameFocused(true)}
                                onBlur={() => setNameFocused(false)}
                                className={`bg-gray-50 rounded-2xl px-5 py-4 text-gray-800 ${nameFocused ? 'border-2 border-purple-300' : 'border border-gray-200'
                                    }`}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'System'
                                }}
                            />
                        </View>

                        {/* Email Input */}
                        <View className="mb-4">
                            <Text className="text-xs font-medium text-gray-600 mb-2 ml-1">
                                Email
                            </Text>
                            <TextInput
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                className={`bg-gray-50 rounded-2xl px-5 py-4 text-gray-800 ${emailFocused ? 'border-2 border-purple-300' : 'border border-gray-200'
                                    }`}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'System'
                                }}
                            />
                        </View>

                        {/* Password Input */}
                        <View className="mb-4">
                            <Text className="text-xs font-medium text-gray-600 mb-2 ml-1">
                                Password
                            </Text>
                            <TextInput
                                placeholder="At least 6 characters"
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className={`bg-gray-50 rounded-2xl px-5 py-4 text-gray-800 ${passwordFocused ? 'border-2 border-purple-300' : 'border border-gray-200'
                                    }`}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'System'
                                }}
                            />
                        </View>

                        {/* Confirm Password Input */}
                        <View className="mb-8">
                            <Text className="text-xs font-medium text-gray-600 mb-2 ml-1">
                                Confirm Password
                            </Text>
                            <TextInput
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                onFocus={() => setConfirmPasswordFocused(true)}
                                onBlur={() => setConfirmPasswordFocused(false)}
                                className={`bg-gray-50 rounded-2xl px-5 py-4 text-gray-800 ${confirmPasswordFocused ? 'border-2 border-purple-300' : 'border border-gray-200'
                                    }`}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'System'
                                }}
                            />
                        </View>

                        {/* Register Button */}
                        <Pressable
                            onPress={handleRegister}
                            className="rounded-2xl mb-4 active:opacity-90"
                            style={{
                                shadowColor: '#8B5CF6',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 12,
                                elevation: 6
                            }}
                        >
                            <LinearGradient
                                colors={['#8B5CF6', '#6366F1']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="rounded-2xl py-4 items-center"
                            >
                                <Text className="text-white font-semibold text-base">
                                    Start your story
                                </Text>
                            </LinearGradient>
                        </Pressable>

                        {/* Login Link */}
                        <View className="flex-row justify-center items-center mt-2">
                            <Text className="text-gray-500 text-sm mr-1">
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => router.replace("/login")}>
                                <Text className="text-purple-600 font-semibold text-sm">
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bottom Tagline */}
                    <Text className="text-gray-400 text-xs mb-8 text-center">
                        Your thoughts matter. We'll keep them safe. 🔒
                    </Text>
                </ScrollView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}