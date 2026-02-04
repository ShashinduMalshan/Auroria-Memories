import { Slot } from "expo-router"
import React from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LoaderProvider } from "../context/LoaderContext"
import { AuthProvider } from "../context/authContext"
import { LockProvider } from "@/context/LockContext"

const RootLayout = () => {
  const insets = useSafeAreaInsets()
  console.log(insets);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Slot />
    // </SafeAreaView>

    <LoaderProvider>
      <AuthProvider>
        <LockProvider>
        <View style={{ marginTop: insets.top, flex: 1 }}>
          <Slot />
        </View>
        </LockProvider>
      </AuthProvider>
    </LoaderProvider>
  )
}

export default RootLayout