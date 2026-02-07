import { Slot } from "expo-router"
import React from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LoaderProvider } from "../context/LoaderContext"
import { AuthProvider } from "../context/authContext"
import { LockProvider } from "@/context/LockContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const RootLayout = () => {

  const insets = useSafeAreaInsets()
  console.log(insets);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Slot />
    // </SafeAreaView>

    <LoaderProvider>
      <LockProvider>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ marginTop: insets.top, flex: 1 }}>
              <Slot />
            </View>
          </GestureHandlerRootView>
        </AuthProvider>
      </LockProvider>
    </LoaderProvider >
  )
}

export default RootLayout