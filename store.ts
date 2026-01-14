import { create } from 'zustand';
import { User, RoomType } from './types';

interface AppState {
  currentUser: User | null;
  currentRoom: RoomType;
  isTransitioning: boolean;
  
  // Actions
  login: (name: string, role: 'teacher' | 'student') => void;
  logout: () => void;
  setRoom: (room: RoomType) => void;
  setTransitioning: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  currentRoom: 'login',
  isTransitioning: false,

  login: (name, role) => set({
    currentUser: {
      id: crypto.randomUUID(),
      name,
      role,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
    },
    currentRoom: 'warmup', // Default redirection after login
    isTransitioning: true, // Trigger transition
  }),

  logout: () => set({ currentUser: null, currentRoom: 'login' }),

  setRoom: (room) => {
    set({ isTransitioning: true });
    // Simulate delay for animation to start before switching content
    setTimeout(() => {
        set({ currentRoom: room });
    }, 1000);
  },

  setTransitioning: (status) => set({ isTransitioning: status }),
}));