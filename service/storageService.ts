import { getStorage, ref, uploadBytes, getDownloadURL ,listAll} from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);


// Upload image OR audio and return URL
export const uploadFile = async (
  uri: string,
  folder: "images" | "audio"
): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const fileName = `${folder}/${Date.now()}`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};


export const getAllStorageImages = async () => {
  try {
    const listRef = ref(storage, "memories"); 
    const res = await listAll(listRef);

    const urls = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    );

    return urls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};