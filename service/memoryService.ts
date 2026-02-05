import { addDoc, collection, getDocs, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const saveMemory = async (memory: {
  text: string;
  images: string[];
  audioURL: string | null;
  mood: string | null;
}) => {
  return await addDoc(collection(db, "memories"), {
    ...memory,
    createdAt: serverTimestamp(),
  });
};


export const getAllMemories = async () => {
  try {
    const querySnapshot = query(collection(db, "memories"));

    const snapshot = await getDocs(querySnapshot);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  }catch (error) {
    console.error("Error getting memories: ", error);
    throw error;
  }

  }