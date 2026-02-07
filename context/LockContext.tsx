import { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

const LOCK_AFTER = 60 * 1000; // 1 minute
const MIN_BACKGROUND_TIME = 2000; // 2 seconds


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

      if (state === "active" && backgroundTime) {
        const awayTime = Date.now() - backgroundTime;

        // ✅ Ignore short transitions (navigation, picker, permissions)
        if (awayTime < MIN_BACKGROUND_TIME) {
          setBackgroundTime(null);
          return;
        }

        // 🔒 Lock only if away long enough
        if (awayTime >= LOCK_AFTER) {
          setLocked(true);
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
