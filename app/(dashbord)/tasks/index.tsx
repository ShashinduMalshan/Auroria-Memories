import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Task = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-200">

      <Text className="font-bold text-xl mb-4">
        Tasks List
      </Text>

      <TouchableOpacity className="absolute bottom-8 right-8 bg-blue-500 p-4 rounded-full shadow-lg"
      onPress={() => router.push('/tasks/create')}>
        <MaterialIcons name="add" size={20} color="#fff" />
      </TouchableOpacity>

    </View>
  )
}

export default Task
