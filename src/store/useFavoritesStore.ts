import { create } from "zustand";
import type { GiphyGif } from "../types/giphy";

const STORAGE_KEY = "favorites_gifs";

interface FavoritesStoreState {
  favorites: GiphyGif[];
  toggleFavorite: (gif: GiphyGif) => void;
  isFavorite: (id: string) => boolean;
}

const loadFromStorage = (): GiphyGif[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (favorites: GiphyGif[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const useFavoritesStore = create<FavoritesStoreState>((set, get) => ({
  favorites: loadFromStorage(),

  toggleFavorite: (gif) => {
    const { favorites } = get();
    const exists = favorites.some((f) => f.id === gif.id);

    const updated = exists
      ? favorites.filter((f) => f.id !== gif.id)
      : [...favorites, gif];

    saveToStorage(updated);
    set({ favorites: updated });
  },

  isFavorite: (id) => {
    return get().favorites.some((f) => f.id === id);
  },
}));
