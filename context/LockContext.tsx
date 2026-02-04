import { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

const LOCK_AFTER = 60 * 1000; // 1 minute

type LockContextType = {
  locked: boolean;
  unlockNow: () => void;
};

const LockContext = createContext<LockContextType | null>(null);

export const LockProvider = ({ children }: { children: React.ReactNode }) => {
  const [locked, setLocked] = useState(false);
  const [backgroundTime, setBackgroundTime] = useState<number | null>(null);

  // 🔓 Unlock manually
  const unlockNow = () => {
    setLocked(false);
  };

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      // 📱 User leaves app
      if (state === "background") {
        setBackgroundTime(Date.now());
      }

      // 📱 User comes back
      if (state === "active" && backgroundTime) {
        const awayTime = Date.now() - backgroundTime;

        if (awayTime >= LOCK_AFTER) {
          setLocked(true); // 🔒 lock if away too long
        }

        setBackgroundTime(null);
      }
    });

    return () => sub.remove();
  }, [backgroundTime]);

  return (
    <LockContext.Provider value={{ locked, unlockNow }}>
      {children}
    </LockContext.Provider>
  );
};

export const useLock = () => {
  const ctx = useContext(LockContext);
  if (!ctx) throw new Error("useLock must be used inside LockProvider");
  return ctx;
};
