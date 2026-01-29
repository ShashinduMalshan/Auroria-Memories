import './../global.css';

import { View, Text, Pressable } from "react-native";
import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <View className="flex-1 justify-center items-center bg-white px-5">
            <Text className="text-3xl font-bold mb-10 text-gray-800">Auroria Starter</Text>

            <Pressable
                className="bg-blue-500 rounded-lg py-3 px-8 mb-4 shadow"
                onPress={() => setCount(count + 1)}
            >
                <Text className="text-white text font-semibold">Increase</Text>
            </Pressable>


            <Pressable
                className="bg-blue-500 rounded-lg py-3 px-8 mb-4 shadow"
                onPress={() => setCount(count - 1)}
            >
                <Text className="text-white text font-semibold">Decrease</Text>
            </Pressable>

            <Pressable
                className="bg-red-500 rounded-lg py-3 px-8 mb-4 shadow"
                onPress={() => setCount(0)}
            >
                <Text className="text-white text font-semibold">Reset</Text>
            </Pressable>

            <Text className="text-xl text-gray-700">Total Memories: {count}</Text>
        </View>
    );
}
