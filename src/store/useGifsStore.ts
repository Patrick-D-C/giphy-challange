import { create } from "zustand";
import {
  getTrendingGifs,
  searchGifs,
  getCategories,
  getGifsByCategory,
} from "../services/giphyApi";

import type { GiphyGif, GiphyCategory } from "../types/giphy";

const PAGE_SIZE = 24;

type Mode = "trending" | "search" | "category" | null;

interface GifsStoreState {
  gifs: GiphyGif[];
  categories: GiphyCategory[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  mode: Mode;
  query: string | null;
  offset: number;
  hasMore: boolean;

  fetchTrending: () => Promise<void>;
  search: (query: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchByCategory: (cat: string) => Promise<void>;
  fetchMore: () => Promise<void>;
}

export const useGifsStore = create<GifsStoreState>((set, get) => ({
  gifs: [],
  categories: [],
  loading: false,
  loadingMore: false,
  error: null,
  mode: null,
  query: null,
  offset: 0,
  hasMore: true,

  fetchTrending: async () => {
    set({
      loading: true,
      loadingMore: false,
      error: null,
      mode: "trending",
      query: null,
      offset: 0,
      hasMore: true,
    });
    try {
      const gifs = await getTrendingGifs(0, PAGE_SIZE);
      set({
        gifs,
        offset: gifs.length,
        hasMore: gifs.length === PAGE_SIZE,
      });
    } catch (e) {
      set({ error: "Erro ao carregar trending" });
    } finally {
      set({ loading: false });
    }
  },

  search: async (query) => {
    set({
      loading: true,
      loadingMore: false,
      error: null,
      mode: "search",
      query,
      offset: 0,
      hasMore: true,
    });
    try {
      const gifs = await searchGifs(query, 0, PAGE_SIZE);
      set({
        gifs,
        offset: gifs.length,
        hasMore: gifs.length === PAGE_SIZE,
      });
    } catch {
      set({ error: "Erro ao buscar GIFs" });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await getCategories();
      set({ categories });
    } catch {
      set({ error: "Erro ao carregar categorias" });
    } finally {
      set({ loading: false });
    }
  },

  fetchByCategory: async (cat) => {
    set({
      loading: true,
      loadingMore: false,
      error: null,
      mode: "category",
      query: cat,
      offset: 0,
      hasMore: true,
    });
    try {
      const gifs = await getGifsByCategory(cat, 0, PAGE_SIZE);
      set({
        gifs,
        offset: gifs.length,
        hasMore: gifs.length === PAGE_SIZE,
      });
    } catch {
      set({ error: "Erro ao buscar GIFs por categoria" });
    } finally {
      set({ loading: false });
    }
  },

  fetchMore: async () => {
    const { mode, query, offset, gifs, hasMore, loading, loadingMore } =
      get();
    if (loading || loadingMore || !mode || !hasMore) return;

    set({ loadingMore: true, error: null });

    try {
      let newGifs: GiphyGif[] = [];

      if (mode === "trending") {
        newGifs = await getTrendingGifs(offset, PAGE_SIZE);
      }
      if (mode === "search" && query) {
        newGifs = await searchGifs(query, offset, PAGE_SIZE);
      }
      if (mode === "category" && query) {
        newGifs = await getGifsByCategory(query, offset, PAGE_SIZE);
      }

      set({
        gifs: [...gifs, ...newGifs],
        offset: offset + newGifs.length,
        hasMore: newGifs.length === PAGE_SIZE,
      });
    } catch {
      set({ error: "Erro ao carregar mais GIFs" });
    } finally {
      set({ loadingMore: false });
    }
  },
}));
