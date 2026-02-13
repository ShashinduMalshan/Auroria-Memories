import { getUserMemories, getAllMemoryImages } from '@/service/memoryService';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { authenticateBiometric } from '../../service/biometricService';
import { router } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get("window");

const DashboardScreen = () => {

  const [recentMemories, setRecentMemories] = useState<any[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]);

  // 🔐 Biometric
  useEffect(() => {
    authenticateBiometric();
  }, []);

  // 📘 Load recent memories
  useEffect(() => {
    const loadMemories = async () => {
      const memories = await getUserMemories();
      setRecentMemories(memories.slice(0, 3));
    };
    loadMemories();
  }, []);

  // 🖼 Load all images for slideshow
  useEffect(() => {
    const loadImages = async () => {
      const images = await getAllMemoryImages();
      setAllImages(images);
      console.log("Loaded slideshow images:", images.length);
    };
    loadImages();
  }, []);

  return (
    <View className="flex-1">

      {/* 🌸 Soft Gradient Background */}
      <LinearGradient
        colors={['#F3E8FF', '#FDF2F8', '#EEF2FF']}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🖼 Memory Slideshow */}
        {allImages.length > 0 && (
          <View className="mt-16">
            <Text className="text-lg font-semibold text-gray-900 px-6 mb-4">
              Your Past Moments ✨
            </Text>

            <Carousel
              width={width}
              height={240}
              autoPlay
              autoPlayInterval={4000}
              data={allImages}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginHorizontal: 20,
                    borderRadius: 30,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.2,
                    shadowRadius: 15,
                    elevation: 8,
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: "100%",
                      height: 240,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
            />
          </View>
        )}

        {/* 💎 Hero Section */}
        <View className="mt-14 px-6">
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.85)",
              borderRadius: 40,
              padding: 28,
              shadowColor: "#7C3AED",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text className="text-3xl font-bold text-gray-900">
              Your memories are your treasure.
            </Text>

            <Text className="text-gray-600 mt-4 text-base">
              Reflect, grow, and protect your personal story
              in your private emotional space.
            </Text>

            <Pressable
              onPress={() => router.push("/(dashbord)/save")}
              style={{
                marginTop: 20,
                backgroundColor: "#7C3AED",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 25,
                alignSelf: "flex-start",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Start Writing ✍️
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 📘 Recent Memories */}
        <View className="mt-14 px-6 pb-32">
          <Text className="text-xl font-semibold text-gray-900 mb-6">
            Recent Memories
          </Text>

          {recentMemories.map((memory) => (
            <Pressable
              key={memory.id}
              onPress={() =>
                router.push({
                  pathname: "/diary/book",
                  params: { startId: memory.id },
                })
              }
              style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 30,
                padding: 20,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <Text className="text-lg font-semibold text-gray-900">
                {memory.title}
              </Text>

              <Text numberOfLines={2} className="text-gray-500 mt-3">
                {memory.text}
              </Text>

              {memory.images?.length > 0 && (
                <Image
                  source={{ uri: memory.images[0] }}
                  style={{
                    width: width - 80,
                    height: 160,
                    borderRadius: 25,
                    marginTop: 14,
                  }}
                />
              )}

              <Text className="text-gray-400 text-xs mt-4">
                {memory?.createdAt?.toDate()?.toLocaleDateString()}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* ➕ Floating Action Button */}
      <Pressable
        onPress={() => router.push("/(dashbord)/save")}
        style={{
          position: "absolute",
          bottom: 30,
          right: 24,
          backgroundColor: "#7C3AED",
          width: 70,
          height: 70,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#7C3AED",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          elevation: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 30 }}>+</Text>
      </Pressable>

    </View>
  );
};

export default DashboardScreen;
