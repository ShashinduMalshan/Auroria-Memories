import { useRouter } from 'expo-router';
import React from 'react';
import { Keyboard, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLoader } from '../../hooks/useLoder';
import { login } from '../../service/authService';

const LoginScreen = () => {
    const router = useRouter();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailFocused, setEmailFocused] = React.useState(false);
    const [passwordFocused, setPasswordFocused] = React.useState(false);

    const { showLoader, hideLoader } = useLoader();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        showLoader();
        try {
            await login(email, password);
            alert("Login successful");
            console.log('Logged in successfully');
            router.replace('/home');
        } catch (error) {
            const err = error as any;
            console.log("Login error:", err?.code , err?.message);
            alert(err?.message ?? "Login failed");
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
                <View className="flex-1 justify-center items-center px-6">
                    {/* Abstract Emotional Shape */}
                    <View className="mb-12 items-center">
                        <View className="w-20 h-20 bg-purple-100 rounded-full opacity-40 absolute -top-4 -left-8" />
                        <View className="w-16 h-16 bg-blue-100 rounded-full opacity-50 absolute top-2 left-12" />
                        
                        {/* Greeting */}
                        <Text className="text-3xl font-semibold text-gray-800 mb-2 mt-16">
                            Welcome back 🌱
                        </Text>
                        <Text className="text-base text-gray-500 font-normal">
                            Your thoughts are safe here
                        </Text>
                    </View>

                    {/* Login Card */}
                    <View className="w-full bg-white rounded-3xl p-8 shadow-sm" style={{
                        shadowColor: '#8B9FD9',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.12,
                        shadowRadius: 24,
                        elevation: 8
                    }}>
                        {/* Email Input */}
                        <View className="mb-5">
                            <Text className="text-xs font-medium text-gray-600 mb-2 ml-1">
                                Email
                            </Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="you@example.com"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                className={`bg-gray-50 rounded-2xl px-5 py-4 text-gray-800 ${
                                    emailFocused ? 'border-2 border-purple-300' : 'border border-gray-200'
                                }`}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'System'
                                }}
                            />
                        </View>

                        {/* Password Input */}
                        <View className="mb-8">
                            <Text className="text-xs font-medium text-gray-600 mb-2 ml-1">
                                Password
                            </Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className={`bg-gray-50 rounded-2xl px-5 py-4 text-gray-800 ${
                                    passwordFocused ? 'border-2 border-purple-300' : 'border border-gray-200'
                                }`}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'System'
                                }}
                            />
                        </View>

                        {/* Login Button */}
                        <Pressable
                            onPress={handleLogin}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl py-4 items-center mb-4 active:opacity-90"
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
                                className="w-full rounded-2xl py-4 items-center"
                            >
                                <Text className="text-white font-semibold text-base">
                                    Continue your story
                                </Text>
                            </LinearGradient>
                        </Pressable>

                        {/* Register Link */}
                        <View className="flex-row justify-center items-center mt-2">
                            <Text className="text-gray-500 text-sm mr-1">
                                New to Smart Diary?
                            </Text>
                            <TouchableOpacity onPress={() => router.replace("/register")}>
                                <Text className="text-purple-600 font-semibold text-sm">
                                    Create account
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bottom Tagline */}
                    <Text className="text-gray-400 text-xs mt-10 text-center">
                        A safe space for your thoughts and memories
                    </Text>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;