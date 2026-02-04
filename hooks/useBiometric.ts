import { authenticateBiometric, isBiometricAvailable } from "@/service/biometricService";

export const useBiometric = () => {
  return {
    authenticateBiometric,
    isBiometricAvailable,
  };
};
