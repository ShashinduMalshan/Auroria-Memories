import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useLoader } from "@/hooks/useLoder";
import { auth } from "@/service/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
  const { showLoader, hideLoader, isLoading } = useLoader();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    showLoader();

    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      setUser(user);
      hideLoader();
    })
    // Cleanup subscription on unmount ( cleanup function )
    return () => {
      console.log('unmount')
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};