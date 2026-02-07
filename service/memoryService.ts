import { addDoc, collection, getDocs, query, serverTimestamp, orderBy, where } from "firebase/firestore";
import { db, auth } from "./firebase";
import { getAuth } from "firebase/auth";


export const saveMemory = async (memory: {
  title: string;
  text: string;
  images: string[];
  audioURL: string | null;
  mood: string | null;
}) => {

  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  return await addDoc(collection(db, "memories"), {
    ...memory,
    userId: user.uid,            // 🔑 REQUIRED
    createdAt: serverTimestamp(),
  });
};


export const getUserMemories = async () => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      return [];
    }

    const q = query(
      collection(db, "memories"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting user memories:", error);
    throw error;
  }
};
