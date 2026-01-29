import { Slot } from "expo-router"
import React from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LoaderProvider } from "../context/LoaderContext"
import { AuthProvider } from "../context/authContext"

const RootLayout = () => {
  const insets = useSafeAreaInsets()
  console.log(insets);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Slot />
    // </SafeAreaView>

    <LoaderProvider>
      <AuthProvider>
        <View style={{ marginTop: insets.top, flex: 1 }}>
          <Slot />
        </View>
      </AuthProvider>
    </LoaderProvider>
  )
}

export default RootLayout