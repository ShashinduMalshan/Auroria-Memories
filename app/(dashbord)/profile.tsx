import { View, Text, TouchableHighlight, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks'
import { router } from 'expo-router'

const handleLogout = () => {

router.push('/login')

}

const Profile = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-xl">
        profile
      </Text>
    
    <Pressable className="absolute bottom-8 right-8 bg-blue-500 p-4 rounded-full shadow-lg"
    onPress={handleLogout}>
      <MaterialIcons name="person" size={20} color="#fff" />
    </Pressable>  

    </View>

  )
}

export default Profile
