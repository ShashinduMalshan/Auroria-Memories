import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { 
    Animated,
    Keyboard,
    Pressable, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    View,
    Dimensions,
    StatusBar,
    ScrollView
} from "react-native";
import { useLoader } from "../../hooks/useLoder";
import { registation } from "../../service/authService";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Register() {
    const router = useRouter();

    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const { showLoader, hideLoader } = useLoader();

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

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
        } finally {
            hideLoader();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 bg-slate-950">
                <StatusBar barStyle="light-content" />
                
                {/* Animated Background Gradient */}
                <View className="absolute inset-0">
                    <LinearGradient
                        colors={['#0f172a', '#1e1b4b', '#312e81', '#1e1b4b', '#0f172a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="flex-1"
                    />
                    
                    {/* Floating Orbs - Different positions for variety */}
                    <View className="absolute top-32 right-10 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-3xl" />
                    <View className="absolute bottom-20 left-0 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
                    <View className="absolute top-96 left-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl" />
                </View>

                <ScrollView 
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View 
                        className="flex-1 justify-center items-center px-6 py-12"
                        style={{
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideAnim },
                                { scale: scaleAnim }
                            ]
                        }}
                    >
                        {/* Logo/Brand Section */}
                        <View className="mb-10">
                            <Text className="text-5xl font-bold text-center mb-3 tracking-tight">
                                <Text className="text-white">Auroria</Text>
                            </Text>
                            <Text className="text-violet-300 text-center text-base tracking-[0.3em] uppercase">
                                Memories
                            </Text>
                            <View className="h-px w-32 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-4" />
                        </View>

                        {/* Glass Card */}
                        <View className="w-full max-w-md">
                            <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                                
                                <Text className="text-3xl font-semibold text-white mb-2 tracking-tight">
                                    Create Account
                                </Text>
                                <Text className="text-violet-200/70 mb-7 text-sm">
                                    Begin your journey with us today
                                </Text>

                                {/* Full Name Input */}
                                <View className="mb-4">
                                    <Text className="text-violet-200 text-xs font-medium mb-2 uppercase tracking-wider">
                                        Full Name
                                    </Text>
                                    <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                        <TextInput
                                            value={fullName}
                                            onChangeText={setFullName}
                                            placeholder="Enter your full name"
                                            placeholderTextColor="rgba(255,255,255,0.3)"
                                            className="px-5 py-4 text-white text-base"
                                        />
                                    </View>
                                </View>

                                {/* Email Input */}
                                <View className="mb-4">
                                    <Text className="text-violet-200 text-xs font-medium mb-2 uppercase tracking-wider">
                                        Email
                                    </Text>
                                    <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                        <TextInput
                                            value={email}
                                            onChangeText={setEmail}
                                            placeholder="Enter your email"
                                            placeholderTextColor="rgba(255,255,255,0.3)"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            className="px-5 py-4 text-white text-base"
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View className="mb-4">
                                    <Text className="text-violet-200 text-xs font-medium mb-2 uppercase tracking-wider">
                                        Password
                                    </Text>
                                    <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                        <TextInput
                                            value={password}
                                            onChangeText={setPassword}
                                            placeholder="Create a password"
                                            placeholderTextColor="rgba(255,255,255,0.3)"
                                            secureTextEntry
                                            className="px-5 py-4 text-white text-base"
                                        />
                                    </View>
                                </View>

                                {/* Confirm Password Input */}
                                <View className="mb-7">
                                    <Text className="text-violet-200 text-xs font-medium mb-2 uppercase tracking-wider">
                                        Confirm Password
                                    </Text>
                                    <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                        <TextInput
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            placeholder="Confirm your password"
                                            placeholderTextColor="rgba(255,255,255,0.3)"
                                            secureTextEntry
                                            className="px-5 py-4 text-white text-base"
                                        />
                                    </View>
                                </View>

                                {/* Register Button */}
                                <Pressable
                                    onPress={handleRegister}
                                    className="active:opacity-80"
                                >
                                    <LinearGradient
                                        colors={['#8b5cf6', '#a855f7', '#d946ef']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        className="py-4 rounded-2xl items-center shadow-lg"
                                    >
                                        <Text className="text-white font-bold text-base tracking-wide">
                                            Create Account
                                        </Text>
                                    </LinearGradient>
                                </Pressable>

                                {/* Divider */}
                                <View className="flex-row items-center my-6">
                                    <View className="flex-1 h-px bg-white/10" />
                                    <Text className="text-white/40 mx-4 text-xs">OR</Text>
                                    <View className="flex-1 h-px bg-white/10" />
                                </View>

                                {/* Login Link */}
                                <View className="flex-row justify-center items-center">
                                    <Text className="text-violet-200/70 mr-2 text-sm">
                                        Already have an account?
                                    </Text>
                                    <TouchableOpacity onPress={() => router.replace("/login")}>
                                        <Text className="text-violet-300 font-semibold text-sm">
                                            Sign in
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {/* Bottom decorative element */}
                            <View className="items-center mt-6">
                                <View className="flex-row space-x-2">
                                    <View className="w-2 h-2 rounded-full bg-violet-400/50" />
                                    <View className="w-2 h-2 rounded-full bg-fuchsia-400/50" />
                                    <View className="w-2 h-2 rounded-full bg-indigo-400/50" />
                                </View>
                            </View>
                        </View>

                    </Animated.View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}