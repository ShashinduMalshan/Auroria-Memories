import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput
} from 'react-native'; import React, { useEffect, useState } from 'react'
import { getUserMemories } from '@/service/memoryService';
import { router } from 'expo-router';

const AllMemories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allMemories, setAllMemories] = useState<any[]>([]);
  const [recentMemories, setRecentMemories] = useState<any[]>([]);

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const memories = await getUserMemories();
        setAllMemories(memories);
        setRecentMemories(memories);
      } catch (error) {
        console.error("Failed to load memories:", error);
      }
    };

    loadMemories();
  }, []);

  const getDateString = (createdAt: any) => {
    if (!createdAt) return "";

    return createdAt
      .toDate()
      .toLocaleDateString("en-GB") // 04/02/2026
      .toLowerCase();
  };

  const handleSearch = (text: string) => {


    setSearchQuery(text);

    if (text.trim() === "") {
      setRecentMemories(allMemories);
      return;
    }

    const searchText = text.toLowerCase();

    const filtered = allMemories.filter((memory) => {
      const title = memory?.title?.toLowerCase() || "";
      const body = memory?.text?.toLowerCase() || "";
      const date = getDateString(memory?.createdAt);

      return (
        title.includes(searchText) ||
        body.includes(searchText) ||
        date.includes(searchText)
      );
    });

    setRecentMemories(filtered);
  };



  return (
    <View className="px-6 mt-8 pb-16">
      <View className="mb-4">
        <View className="bg-gray-100 rounded-full flex-row items-center px-4 h-11">
          <TextInput
            placeholder="Search memories..."
            value={searchQuery}
            onChangeText={handleSearch}
            className="flex-1 text-base text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>


      <ScrollView>
        {recentMemories.map((memory) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/diary/book",
                params: { startId: memory.id },
              })
            }
            key={memory.id}
            className="bg-white rounded-3xl p-5 mb-4 active:opacity-90"
            style={{
              shadowColor: '#8B9FD9',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3
            }}
          >
            <View className="flex-row">
              {/* Content */}
              <View className="flex-1 pr-3">
                <Text className="text-base font-semibold text-gray-800 mb-2">
                  {memory.title
                  }
                </Text>
                <Text
                  className="text-sm text-gray-600 leading-5 mb-3"
                  numberOfLines={2}
                >
                  {memory.text}
                </Text>
                <Text className="text-xs text-gray-400">
                  {memory?.createdAt.toDate().toLocaleDateString() ?? ""}
                </Text>
              </View>

              {/* Image Thumbnail */}
              {memory.images && memory.images.length > 0 && (
                <View
                  className="bg-gray-200 rounded-2xl overflow-hidden"
                  style={{ width: 80, height: 80 }}
                >
                  <Image
                    source={{ uri: memory.images[0] }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

    </View>
  )
}

export default AllMemories
