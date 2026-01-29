import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
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
    StatusBar
} from 'react-native';
import { useLoader } from '../../hooks/useLoder';
import { login } from '../../service/authService';
import { LinearGradient } from 'expo-linear-gradient';


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
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
        } catch (error: any) {
            console.log("Login error:", error?.code, error?.message);
            alert(error?.message ?? "Login failed");
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
                    
                    {/* Floating Orbs */}
                    <View className="absolute top-20 left-10 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />
                    <View className="absolute bottom-40 right-0 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl" />
                    <View className="absolute top-60 right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
                </View>

                <Animated.View 
                    className="flex-1 justify-center items-center px-6"
                    style={{
                        opacity: fadeAnim,
                        transform: [
                            { translateY: slideAnim },
                            { scale: scaleAnim }
                        ]
                    }}
                >
                    {/* Logo/Brand Section */}
                    <View className="mb-12">
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
                                Welcome Back
                            </Text>
                            <Text className="text-violet-200/70 mb-8 text-sm">
                                Sign in to continue your journey
                            </Text>

                            {/* Email Input */}
                            <View className="mb-5">
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
                            <View className="mb-8">
                                <Text className="text-violet-200 text-xs font-medium mb-2 uppercase tracking-wider">
                                    Password
                                </Text>
                                <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="Enter your password"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        secureTextEntry
                                        className="px-5 py-4 text-white text-base"
                                    />
                                </View>
                            </View>

                            {/* Login Button */}
                            <Pressable
                                onPress={handleLogin}
                                className="active:opacity-80"
                            >
                                <LinearGradient
                                    colors={['#8b5cf6', '#a855f7', '#d946ef']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="py-4 rounded-2xl items-center shadow-lg"
                                >
                                    <Text className="text-white font-bold text-base tracking-wide">
                                        Sign In
                                    </Text>
                                </LinearGradient>
                            </Pressable>

                            {/* Divider */}
                            <View className="flex-row items-center my-6">
                                <View className="flex-1 h-px bg-white/10" />
                                <Text className="text-white/40 mx-4 text-xs">OR</Text>
                                <View className="flex-1 h-px bg-white/10" />
                            </View>

                            {/* Register Link */}
                            <View className="flex-row justify-center items-center">
                                <Text className="text-violet-200/70 mr-2 text-sm">
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity onPress={() => router.replace("/register")}>
                                    <Text className="text-violet-300 font-semibold text-sm">
                                        Create one
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
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Login;