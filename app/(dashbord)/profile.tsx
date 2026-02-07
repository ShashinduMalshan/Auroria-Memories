import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import ConfirmAlert from "@/components/ConfirmAlert";



const fonts = [
  { label: "Default", value: "default" },
  { label: "Caveat", value: "Caveat" },
  { label: "Dancing Script", value: "DancingScript" },
  { label: "Patrick Hand", value: "PatrickHand" },
];

export default function Profile() {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);



  return (
    <View className="flex-1 bg-white">
      {/* ===== Profile Header ===== */}
      <View className="items-center mt-16 mb-8">
        {/* Profile Image */}
        <View className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden mb-4">
          <Image
            source={{
              uri: "https://i.pravatar.cc/300", // demo image
            }}
            className="w-full h-full"
          />
        </View>

        {/* Name */}
        <Text className="text-xl font-semibold text-gray-800">
          Shasidu Malshan
        </Text>

        <Text className="text-sm text-gray-500">
          Personal Diary
        </Text>
      </View>
      <ScrollView>
        {/* ===== Settings Section ===== */}
        <View className="px-6">
          {/* Section Title */}
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Diary Settings
          </Text>

          {/* Font Settings */}
          <View className="mb-8">
            <Text className="text-sm text-gray-500 mb-3">
              Diary Font
            </Text>

            {fonts.map((f) => (
              <Pressable
                key={f.value}
                onPress={async () => {
                  await AsyncStorage.setItem("diaryFont", f.value);
                  Alert.alert(
                    "Confirm Action",
                    "Are you sure you want to continue?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "OK", onPress: () => console.log("Confirmed") },
                    ]
                  );
                }}
                className="mb-3 p-4 rounded-xl bg-gray-100 flex-row items-center justify-between"
              >
                <Text
                  style={{
                    fontFamily:
                      f.value === "default" ? undefined : f.value,
                    fontSize: 20,
                  }}
                >
                  {f.label}
                </Text>

                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color="#9CA3AF"
                />
              </Pressable>
            ))}
          </View>

          {/* Other Settings (future ready) */}
          <View className="mb-8">
            <Text className="text-sm text-gray-500 mb-3">
              Account
            </Text>

            <SettingItem icon="edit" label="Change Name" />
            <SettingItem icon="image" label="Change Profile Picture" />
            <SettingItem icon="lock" label="Change Password" />


            {/* ===== Logout Button ===== */}
            <Pressable
              onPress={() => setShowLogoutAlert(true)}
              className=" bg-red-500 py-4 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-base">
                Logout
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
      <ConfirmAlert
        visible={showLogoutAlert}
        title="Logout"
        message="Are you sure you want to logout from your diary?"
        onCancel={() => setShowLogoutAlert(false)}
        onConfirm={() => {
          setShowLogoutAlert(false);
          router.replace("/login");
        }}
      />
    </View>
  );



}

/* ===== Reusable Setting Item ===== */
const SettingItem = ({
  icon,
  label,
}: {
  icon: any;
  label: string;
}) => (
  <Pressable className="flex-row items-center justify-between p-4 bg-gray-100 rounded-xl mb-3">
    <View className="flex-row items-center">
      <MaterialIcons
        name={icon}
        size={20}
        color="#4B5563"
        style={{ marginRight: 12 }}
      />
      <Text className="text-base text-gray-700">
        {label}
      </Text>
    </View>

    <MaterialIcons
      name="chevron-right"
      size={22}
      color="#9CA3AF"
    />
  </Pressable>
);
