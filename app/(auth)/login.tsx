import { useRouter } from 'expo-router';
import React from 'react';
import { Keyboard, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useLoader } from '../../hooks/useLoder';
import { login } from '../../service/authService';

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

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
            // router.replace('/home');
        } catch {
            alert("Login failed");
        } finally {
            hideLoader();
        }



    }

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 justify-center items-center bg-gray-50 p-6">
                <View className="w-full bg-white rounded-2xl p-8 shadow-lg">

                    <Text className="text-2xl font-bold text-center mb-6">
                        Login
                    </Text>

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor="#6B7280"
                        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
                        
                    />

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        placeholderTextColor="#6B7280"
                        secureTextEntry
                        className="border border-gray-300 rounded-lg px-4 py-2 mb-6"
                    />

                    <Pressable
                        className="bg-blue-600 py-3 rounded-lg items-center mb-4"
                        onPress={handleLogin}
                    >
                        <Text className="text-white font-semibold">
                            Submit
                        </Text>
                    </Pressable>

                    <View className="flex-row justify-center">
                        <Text className="text-gray-600 mr-1">
                            Don't have an account?
                        </Text>

                        <TouchableOpacity onPress={() =>
                           {}}>
                            <Text className="text-blue-600 font-semibold">
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default Login