import { View, Text, TextInput, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';


const moods = [
    { label: "Happy", icon: "sentiment-satisfied", color: "#F59E0B" },
    { label: "Calm", icon: "sentiment-calm", color: "#10B981" },
    { label: "Sad", icon: "sentiment-dissatisfied", color: "#3B82F6" },
];

const Save = () => {
    const [text, setText] = useState("");
    const [mood, setMood] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const recordAudio = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
        }
        catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    const stopRecording = async () => {
        if (!recording) return;
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioURL(uri);
        setRecording(null);
    }

    const handleSave = () => {
        console.log({
            text,
            image,
            audioURL,
            mood,
        });

        // later → saveMemoryToFirebase()
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
                    placeholder="Write your thoughts here..."
                    multiline
                    value={text}
                    onChangeText={setText}
                    className="text-base text-gray-800"
                />
            </View>
            {image && (
                <Image
                    source={{ uri: image }}
                    className="w-full h-40 rounded-xl mb-4"
                />
            )}
            {/* Action Buttons */}
            <View className="flex-row justify-around mb-6">
                <Pressable onPress={pickImage} className="items-center">
                    <MaterialIcons name="photo" size={28} color="#2563EB" />
                    <Text className="text-xs mt-1 text-gray-600">Image</Text>
                </Pressable>

                <Pressable onPress={recording ? stopRecording : recordAudio}
                    className="items-center">
                    <MaterialIcons name="mic" size={28} color="#8B5CF6" />
                    <Text className="text-xs mt-1 text-gray-600">Voice</Text>
                </Pressable>
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
