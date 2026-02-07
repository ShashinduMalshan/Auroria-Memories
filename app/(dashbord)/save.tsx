import { View, Text, TextInput, Pressable, Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { saveMemory } from "@/service/memoryService";
import { uploadFile } from "@/service/storageService";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";





const moods = [
    { label: "Happy", icon: "sentiment-satisfied", color: "#F59E0B" },
    { label: "Calm", icon: "sentiment-neutral", color: "#10B981" },
    { label: "Sad", icon: "sentiment-dissatisfied", color: "#3B82F6" },
];


const Save = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [mood, setMood] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const recordingRef = useRef<Audio.Recording | null>(null);
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<number | null>(null);


    const wave = useSharedValue(1);

    useEffect(() => {
        if (isRecording && !isPaused) {
            wave.value = withRepeat(
                withTiming(1.4, { duration: 300 }),
                -1,
                true
            );
        } else {
            wave.value = withTiming(1);
        }
    }, [isRecording, isPaused]);

    const waveStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: wave.value }],
    }));




    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });


        if (!result.canceled) {
            const uris = result.assets.map((asset) => asset.uri);
            setImages((prevImages) => [...prevImages, ...uris]);
        }
    }

    const recordAudio = async () => {

        setSeconds(0);

        timerRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);


        try {
            await Audio.requestPermissionsAsync();

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            recordingRef.current = recording;
            setIsRecording(true);
            setIsPaused(false);
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    };



    const pauseRecording = async () => {

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        if (!recordingRef.current) return;

        await recordingRef.current.pauseAsync();
        setIsPaused(true);
    };


    const stopRecording = async () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setSeconds(0);
        if (!recordingRef.current) return;
        try {
            await recordingRef.current.stopAndUnloadAsync();
            const uri = recordingRef.current.getURI();
            console.log("Saved audio:", uri);

            if (uri) setAudioURL(uri);


            recordingRef.current = null;
            setIsRecording(false);
            setIsPaused(false);
        } catch (err) {
            console.error("Stop error", err);
        }
    };

    const resumeRecording = async () => {
        timerRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);


        if (!recordingRef.current) return;

        await recordingRef.current.startAsync();
        setIsPaused(false);
    };


    const onMainPress = () => {
        if (!isRecording) {
            recordAudio();
        } else if (isPaused) {
            resumeRecording();
        } else {
            pauseRecording();
        }
    };

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };


    const handleSave = async () => {


        if (isRecording) {
            await stopRecording();
        }

        if (!title) {
            alert("Add title to save a memory");
            return;
        }

        if (!text) {
            alert("Add text to save a memory");
            return;
        }
        setLoading(true);

        try {

            const uploadedImages: string[] = [];

            for (const img of images) {
                const imageURL = await uploadFile(img, "images");
                uploadedImages.push(imageURL);
            }

            // ⬆ Upload audio (if exists)
            let uploadedAudioURL: string | null = null;
            if (audioURL) {
                uploadedAudioURL = await uploadFile(audioURL, "audio");
            }

            // 💾 Save to Firestore (ONLY URLs)
            await saveMemory({
                title,
                text,
                images: uploadedImages, // ✅ HTTPS URLs
                audioURL: uploadedAudioURL,
                mood,
            });

            // 🧹 Clear form
            setTitle("");
            setText("");
            setImages([]);
            setAudioURL(null);
            setMood(null);

            alert("Memory saved 💙");
        } catch (error) {
            console.error("Failed to save memory", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <View className="flex-1 bg-gray-50 px-4 pt-6">

            {/* Header */}
            <Text className="text-xl font-semibold mb-4">
                Save a Memory 🌱
            </Text>

            {/* Text Memory */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <TextInput
                    placeholder="A moment worth naming…"
                    multiline
                    value={title}
                    onChangeText={setTitle}
                    className="text-base text-gray-800"
                />
            </View>
            <View className="bg-white rounded-xl p-20 mb-4 shadow-sm">
                <TextInput
                    placeholder="Write your thoughts here..."
                    multiline
                    value={text}
                    onChangeText={setText}
                    className="text-base text-gray-800"
                />
            </View>
            {images.length > 0 && (
                <View className="flex-row flex-wrap gap-2 mb-4">
                    {images.map((uri, index) => (
                        <Pressable
                            key={index}
                            onPress={() =>
                                // 🗑 Remove selected image by filtering it out using its index
                                setImages(images.filter((_, i) => i !== index))
                            }
                        >
                            <Image
                                source={{ uri }}
                                className="w-24 h-24 rounded-lg"
                            />
                        </Pressable>
                    ))}
                </View>
            )}

            {/* Action Buttons */}
            <View className="flex-row justify-around mb-6">
                <Pressable onPress={pickImage} className="items-center">
                    <MaterialIcons name="photo" size={28} color="#2563EB" />
                    <Text className="text-xs mt-1 text-gray-600">Image</Text>
                </Pressable>

                <View className="items-center">
                    {/* ===== ICON ROW ===== */}
                    <View className="flex-row items-center gap-4">
                        {/* Main button */}
                        <Pressable onPress={onMainPress}>
                            <View
                                className={`w-14 h-14 rounded-full items-center justify-center ${isRecording ? "bg-red-100" : "bg-purple-100"
                                    }`}
                            >
                                <MaterialIcons
                                    name={
                                        !isRecording
                                            ? "mic"
                                            : isPaused
                                                ? "play-arrow"
                                                : "pause"
                                    }
                                    size={28}
                                    color={isRecording ? "#EF4444" : "#8B5CF6"}

                                />
                            </View>
                        </Pressable>

                        {/* Stop button */}
                        {isRecording && (
                            <Pressable onPress={stopRecording}>
                                <View className="w-14 h-14 rounded-full items-center justify-center bg-gray-200">
                                    <MaterialIcons name="stop" size={26} color="#EF4444" />
                                </View>
                            </Pressable>
                        )}
                    </View>

                    {/* ===== LABEL (ALWAYS BELOW ICONS) ===== */}
                    <Text className="text-xs mt-2 text-gray-600">
                        {!isRecording
                            ? "Voice"
                            : isPaused
                                ? "Paused"
                                : "Recording…"}

                    </Text>

                    {isRecording && (
                        <Text className="text-xs text-gray-500 mt-1">
                            {formatTime(seconds)}
                        </Text>

                    )}

                            {/* ===== WAVE ANIMATION (BOTTOM) =====  */}
                            {isRecording && !isPaused && (
                                <View className="flex-row mt-3 h-6 items-end">
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <Animated.View
                                            key={i}
                                            style={[
                                                {
                                                    width: 4,
                                                    height: 16,
                                                    backgroundColor: "#8B5CF6",
                                                    marginHorizontal: 3,
                                                    borderRadius: 2,
                                                },
                                                waveStyle,
                                            ]}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
            </View>

                {/* Mood Picker */}
                <Text className="mb-2 text-gray-700 font-medium">
                    How do you feel?
                </Text>

                <View className="flex-row justify-between mb-8">
                    {moods.map((item) => (
                        <Pressable
                            key={item.label}
                            onPress={() => setMood(item.label)}
                            className={`flex-1 mx-1 py-3 rounded-xl items-center ${mood === item.label ? "bg-gray-200" : "bg-white"
                                }`}
                        >
                            <MaterialIcons
                                name={item.icon as any}
                                size={26}
                                color={item.color}
                            />
                            <Text className="text-xs mt-1">{item.label}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Save Button */}
                <Pressable
                    onPress={handleSave}
                    className="bg-blue-600 py-4 rounded-xl items-center"
                >
                    <Text className="text-white font-semibold text-base">
                        Save Memory
                    </Text>
                </Pressable>
            </View>
            );
}

            export default Save;
