export type UserRole = 'teacher' | 'student';

export type RoomType = 'login' | 'warmup' | 'content' | 'practice' | 'application';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Artwork {
  id: string;
  roomId: RoomType;
  imageUrl: string;
  fullImageUrl: string;
  title: string;
  description?: string;
  ownerId?: string;
  isMystery?: boolean;
  isLocked?: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}