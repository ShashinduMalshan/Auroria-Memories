// types/memory.ts

export interface Memory {
  images: any;
  text: string;
  id: string;
  userId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  location?: string;
}

export interface MemoryStats {
  month: string;
  count: number;
  monthYear: string; // e.g., "Jan 2025"
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
}