import { db, auth } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export const updateUserName = async (newName: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  // 🔐 Update Firebase Auth profile
  await updateProfile(user, {
    displayName: newName,
  });

  // 🧠 Create OR update Firestore user doc
  await setDoc(
    doc(db, "users", user.uid),
    {
      name: newName,
      email: user.email,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
