import * as LocalAuthentication from "expo-local-authentication";

export const isBiometricAvailable = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && isEnrolled;
};

export const authenticateBiometric = async () => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock Auroria Memories",
    fallbackLabel: "Use device password",
    cancelLabel: "Cancel",
  });

  return result.success;
};
