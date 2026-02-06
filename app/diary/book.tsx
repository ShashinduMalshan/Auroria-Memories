import {
    View,
    Text,
    FlatList,
    Image,
    Dimensions,
} from "react-native";
import { Key, useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getAllMemories } from "@/service/memoryService";
import { Memory } from "../../types/memory";
import { ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

export default function DiaryBook() {
    const { startId } = useLocalSearchParams();
    const [memories, setMemories] = useState<Memory[]>([]);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const load = async () => {
            const data = await getAllMemories();
            // Ensure data is of type Memory[]
            setMemories(
                data.map((item: any) => ({
                    id: item.id,
                    images: item.images ?? [],
                    text: item.text ?? "",
                    userId: item.userId ?? "",
                    title: item.title ?? "",
                    createdAt: item.createdAt ?? null,
                    updatedAt: item.updatedAt ?? null,
                }))
            );

            // scroll to pressed memory
            const index = data.findIndex((m) => m.id === startId);
            if (index >= 0) {
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                        index,
                        animated: false,
                    });
                }, 100);
            }
        };

        load();
    }, []);
    return (

        <FlatList
            ref={flatListRef}
            data={memories}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
            })}
            renderItem={({ item }) => (
                <View
                    style={{ width, height }}
                    className="bg-[#F7F3EE] px-8 pt-20"
                >
                    <ScrollView>

                        {/* Date */}
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#6B7280",
                                fontStyle: "italic",
                                marginBottom: 6,
                            }}
                        >
                            {item.createdAt?.toDate
                                ? item.createdAt.toDate().toDateString()
                                : ""}
                        </Text>

                        {/* Title */}
                        <Text
                            style={{
                                fontSize: 26,
                                fontFamily: "serif", // later replace with handwritten font
                                color: "#1F2937",
                                marginBottom: 20,
                            }}
                        >
                            {item.title}
                        </Text>

                        {/* Images */}
                        {item.images?.map((img: string, index: number) => (
                            <View
                                key={`${item.id}-img-${index}`}
                                style={{
                                    marginBottom: 28,
                                    transform: [
                                        { rotate: index % 2 === 0 ? "-2deg" : "2deg" },
                                    ],
                                    shadowColor: "#000",
                                    shadowOpacity: 0.25,
                                    shadowRadius: 10,
                                    shadowOffset: { width: 0, height: 6 },
                                }}
                                className="bg-white rounded-xl overflow-hidden"
                            >
                                {/* Image */}
                                <Image
                                    source={{ uri: img }}
                                    className="w-full h-60"
                                    resizeMode="cover"
                                />

                                {/* Tape effect */}
                                <View
                                    style={{
                                        position: "absolute",
                                        top: -8,
                                        left: "38%",
                                        width: 70,
                                        height: 18,
                                        backgroundColor: "#E5E1D8",
                                        opacity: 0.9,
                                        transform: [{ rotate: "2deg" }],
                                        borderRadius: 4,
                                    }}
                                />
                            </View>
                        ))}


                        {/* Text */}
                        <Text className="text-base leading-7 text-gray-700">
                            {item.text}
                        </Text>
                    </ScrollView>
                </View>
            )}
        />
    );
}
