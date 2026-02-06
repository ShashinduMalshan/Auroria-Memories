import { addDoc, collection, getDocs, query, serverTimestamp ,orderBy} from "firebase/firestore";
import { db } from "./firebase";

export const saveMemory = async (memory: {
  title: string;
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
    const querySnapshot = query(collection(db, "memories"), orderBy("createdAt", "desc") // latest first
);
    

    const snapshot = await getDocs(querySnapshot);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  }catch (error) {
    console.error("Error getting memories: ", error);
    throw error;
  }

  }