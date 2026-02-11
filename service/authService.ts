import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const  login = async (
    email: string, 
    password: string
) => {
   return await signInWithEmailAndPassword(auth, email, password);
};


export const registation  = async (
    fullName: string, 
    email: string, 
    password: string
) => {
    console.log("Registering user:", fullName, email);

    const userCredential = await createUserWithEmailAndPassword( 
        auth ,
        email, 
        password
    )


    await updateProfile(await userCredential.user, {
        displayName: fullName
    })

    await userCredential.user.reload();

    setDoc(doc(db, "users", userCredential.user.uid), {
        name : fullName,
        role : "",  
        email,
        creatAt : new Date()
    });
    return userCredential;

};


export const logout = async () => {
    await auth.signOut();
    AsyncStorage.clear();
    return;
}