import { ActivityIndicator, View } from "react-native";
import ".././global.css"
import {useAuth}  from "../hooks/useAuth"

import { Redirect } from "expo-router"


export default function Index() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
        <View className="flex-1 justify-center items-center bg-gray-50">
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        )
    }

    if (user) {
        return <Redirect href="/home" />
    } else {
        return <Redirect href="/login" />
    }
}