import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmAlert({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      {/* Overlay */}
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        {/* Card */}
        <View className="bg-white w-full rounded-3xl p-6 items-center">
          {/* Icon */}
          <View className="bg-red-100 p-4 rounded-full mb-4">
            <MaterialIcons
              name="warning"
              size={28}
              color="#DC2626"
            />
          </View>

          {/* Title */}
          <Text className="text-xl font-semibold text-gray-800 mb-2 text-center">
            {title}
          </Text>

          {/* Message */}
          <Text className="text-gray-600 text-center mb-6">
            {message}
          </Text>

          {/* Buttons */}
          <View className="flex-row w-full">
            <Pressable
              onPress={onCancel}
              className="flex-1 py-3 rounded-xl bg-gray-100 mr-2 items-center"
            >
              <Text className="text-gray-700 font-medium">
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="flex-1 py-3 rounded-xl bg-red-500 ml-2 items-center"
            >
              <Text className="text-white font-medium">
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
