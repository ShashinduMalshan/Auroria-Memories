import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

type LockContextType = {
  locked: boolean;
  unlockNow: () => Promise<boolean>;
};

const LockContext = createContext<LockContextType | undefined>(undefined);

export const LockProvider = ({ children }: { children: React.ReactNode }) => {
  const [locked, setLocked] = useState(true);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const isPrompting = useRef(false);

  const unlockNow = async () => {
    if (isPrompting.current) return false; // avoid double prompts
    isPrompting.current = true;

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !enrolled) {
        // If no biometrics set on device, choose what you want:
        // For diary/banking, usually BLOCK or fallback to device passcode screen.
        // We'll allow fallback to device passcode prompt:
      }

      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock Auroria Memories",
        fallbackLabel: "Use device passcode",
        cancelLabel: "Cancel",
      });

      if (res.success) setLocked(false);
      return res.success;
    } finally {
      isPrompting.current = false;
    }
  };

  useEffect(() => {
    const sub = AppState.addEventListener("change", async (nextState) => {
      const prev = appState.current;
      appState.current = nextState;

      // When leaving app => lock
      if (prev === "active" && (nextState === "background" || nextState === "inactive")) {
        setLocked(true);
      }

      // When coming back => prompt unlock (banking style)
      if ((prev === "background" || prev === "inactive") && nextState === "active") {
        // Only prompt if currently locked
        if (locked) {
          await unlockNow();
        }
      }
    });

    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

  return (
    <LockContext.Provider value={{ locked, unlockNow }}>
      {children}
    </LockContext.Provider>
  );
};

export const useLock = () => {
  const ctx = useContext(LockContext);
  if (!ctx) throw new Error("useLock must be used within LockProvider");
  return ctx;
};
