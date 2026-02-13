import { addDoc, collection, getDocs, query, serverTimestamp, orderBy, where } from "firebase/firestore";
import { db, auth, storage } from "./firebase";
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
    userId: user.uid,            
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


export const getAllMemoryImages = async () => {
  try {
    const user = getAuth().currentUser;

    if (!user) return [];

    const q = query(
      collection(db, "memories"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    const allImages: string[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (data.images && Array.isArray(data.images)) {
        allImages.push(...data.images);
      }
    });

    return allImages;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};