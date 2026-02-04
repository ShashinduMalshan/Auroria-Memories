import { View, Text, Pressable } from "react-native";
import { useLock } from "@/context/LockContext";
import { useRouter } from "expo-router";

export default function LockScreen() {
  const { unlockNow } = useLock();
  const router = useRouter();

  const onUnlock = async () => {
    const ok = await unlockNow();
    if (ok) router.replace("/home");
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      <Text className="text-white text-3xl font-bold mb-2">Locked</Text>
      <Text className="text-white/60 text-center mb-6">
        Unlock to access your diary
      </Text>

      <Pressable onPress={onUnlock} className="bg-violet-600 px-6 py-3 rounded-2xl">
        <Text className="text-white font-semibold">Unlock</Text>
      </Pressable>
    </View>
  );
}
