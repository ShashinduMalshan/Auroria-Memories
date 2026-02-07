import { getUserMemories } from "@/service/memoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { DiaryFont, Memory } from "../../types/memory";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function DiaryBook() {
    const MIN_FONT = 14;
    const MAX_FONT = 28;

    const { startId } = useLocalSearchParams();
    const flatListRef = useRef<FlatList>(null);

    const [memories, setMemories] = useState<Memory[]>([]);
    const [diaryFont, setDiaryFont] = useState<DiaryFont>("default");
    const [fontSize, setFontSize] = useState(20);

    // 🎧 Audio state
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [barWidth, setBarWidth] = useState(1);




    // 🔍 Pinch zoom
    const scale = useSharedValue(1);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            const nextSize = Math.min(
                MAX_FONT,
                Math.max(MIN_FONT, fontSize * scale.value)
            );
            scale.value = 1;
            runOnJS(setFontSize)(Math.round(nextSize));
        });

    // ✍ Fonts
    const [fontsLoaded] = useFonts({
        Caveat: require("../../assets/fonts/Caveat-Regular.ttf"),
        DancingScript: require("../../assets/fonts/DancingScript-VariableFont_wght.ttf"),
        PatrickHand: require("../../assets/fonts/PatrickHand-Regular.ttf"),
    });

    // 📖 Load memories + font
    useEffect(() => {
        AsyncStorage.getItem("diaryFont").then((saved) => {
            if (saved) setDiaryFont(saved as DiaryFont);
        });

        const load = async () => {
            const data = await getUserMemories();
            setMemories(
                data.map((item: any) => ({
                    id: item.id,
                    images: item.images ?? [],
                    audioURL: item.audioURL ?? null,
                    text: item.text ?? "",
                    title: item.title ?? "",
                    createdAt: item.createdAt ?? null,
                    updatedAt: item.updatedAt ?? null,
                    userId: item.userId ?? "",
                }))
            );

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

    // 🎧 Cleanup
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    // ⏱ Format time
    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // ▶️ Play
    const playAudio = async (url: string, id: string) => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
            });

            if (sound) {
                await sound.unloadAsync();
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true }
            );

            setSound(newSound);
            setPlayingId(id);
            setIsPaused(false);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isLoaded) return;

                setPosition(status.positionMillis);
                setDuration(status.durationMillis ?? 1);

                if (status.didJustFinish) {
                    setIsPlaying(false);
                    setSound(null);
                    setPlayingId(null);
                }
            });


        } catch (e) {
            console.error("Audio error:", e);
        }
    };

    // ⏸ Pause
    const pauseAudio = async () => {
        if (!sound) return;
        await sound.pauseAsync();
        setIsPaused(true);
    };

    // ▶ Resume
    const resumeAudio = async () => {
        if (!sound) return;
        await sound.playAsync();
        setIsPaused(false);
    };

    // ⏹ Stop
    const stopAudio = async () => {
        try {
            if (!sound) return;

            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }
        } catch (e) {
            // ignore safely
        } finally {
            setSound(null);
            setPlayingId(null);
            setIsPaused(false);
            setPosition(0);
            setDuration(0);
        }
    };

    const seekAudio = async (value: number) => {
        if (!sound) return;
        await sound.setPositionAsync(value);
    };



    if (!fontsLoaded) return null;


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
                <View style={{ width, height }} className="bg-[#F7F3EE] px-8 pt-20">
                    <ScrollView>

                        {/* Date */}
                        <Text className="text-xs italic text-gray-500 mb-2">
                            {item.createdAt?.toDate
                                ? item.createdAt.toDate().toDateString()
                                : ""}
                        </Text>

                        {/* Title */}
                        <Text className="text-2xl font-serif text-gray-800 mb-6">
                            {item.title}
                        </Text>

                        {/* Images */}
                        {item.images?.map((img: any, index: number) => (
                            <View
                                key={index}
                                className="bg-white rounded-xl mb-6 overflow-hidden"
                                style={{
                                    transform: [{ rotate: index % 2 === 0 ? "-2deg" : "2deg" }],
                                    shadowColor: "#000",
                                    shadowOpacity: 0.2,
                                    shadowRadius: 8,
                                    shadowOffset: { width: 0, height: 4 },
                                }}
                            >
                                <Image source={{ uri: img }} className="w-full h-60" />
                            </View>
                        ))}

                        {/* 🎧 Voice Memory */}
                        {item.audioURL && (
                            <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">

                                {/* Label */}
                                <Text className="text-gray-700 mb-3">
                                    Voice note
                                </Text>

                                {/* === Audio Control Row === */}
                                <View className="flex-row items-center">

                                    {/* ▶️ Play / Pause */}
                                    <Pressable
                                        onPress={() =>
                                            isPlaying
                                                ? sound?.pauseAsync().then(() => setIsPlaying(false))
                                                : sound
                                                    ? sound.playAsync().then(() => setIsPlaying(true))
                                                    : playAudio(item.audioURL, item.id)
                                        }
                                        style={{ marginRight: 12 }}
                                    >
                                        <MaterialIcons
                                            name={
                                                playingId !== item.id || isPaused
                                                    ? "play-arrow"
                                                    : "pause"
                                            }
                                            size={30}
                                            color="#7C3AED"
                                        />
                                    </Pressable>

                                    {/* === Progress Bar === */}
                                    <Pressable
                                        onLayout={(e) => {
                                            setBarWidth(e.nativeEvent.layout.width);
                                        }}
                                        onPress={(e) => {
                                            const x = e.nativeEvent.locationX;
                                            const seekTo = (x / barWidth) * duration;
                                            seekAudio(seekTo);
                                        }}
                                        style={{
                                            flex: 1,
                                            height: 6,
                                            backgroundColor: "#E5E7EB",
                                            borderRadius: 3,
                                            overflow: "hidden",
                                            marginRight: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: `${duration ? (position / duration) * 100 : 0}%`,
                                                height: "100%",
                                                backgroundColor: "#7C3AED",
                                            }}
                                        />
                                    </Pressable>

                                    {/* ⏱ Time */}
                                    <Text className="text-xs text-gray-500 w-16 text-right">
                                        {formatTime(position)}
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* Text */}
                        <GestureDetector gesture={pinchGesture}>
                            <Animated.Text
                                style={{
                                    fontSize,
                                    lineHeight: fontSize * 1.5,
                                    color: "#1F2937",
                                    fontFamily:
                                        diaryFont === "default" ? undefined : diaryFont,
                                }}
                            >
                                {item.text}
                            </Animated.Text>
                        </GestureDetector>

                    </ScrollView>
                </View>
            )}
        />
    );
}
