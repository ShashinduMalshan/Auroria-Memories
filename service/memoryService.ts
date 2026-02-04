import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { Memory, MemoryStats } from "../types/memory";

/**
 * Get total memory count
 */
export const getTotalMemoryCount = async (): Promise<number> => {
  const snapshot = await getDocs(collection(db, "memories"));
  return snapshot.size;
};

/**
 * Get recent memories (latest 5)
 */
export const getRecentMemories = async (): Promise<Memory[]> => {
  const q = query(
    collection(db, "memories"),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Memory[];
};

/**
 * Get memories that contain images
 */
export const getMemoriesWithImages = async (): Promise<Memory[]> => {
  const q = query(
    collection(db, "memories"),
    where("imageUrl", "!=", null)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Memory[];
};

/**
 * Get memory statistics
 */
export const getMemoryStats = async (): Promise<MemoryStats> => {
  const snapshot = await getDocs(collection(db, "memories"));

  let withImages = 0;

  snapshot.forEach((doc) => {
    if (doc.data().imageUrl) withImages++;
  });

  return {
    total: snapshot.size,
    withImages,
    withoutImages: snapshot.size - withImages,
  };
};
