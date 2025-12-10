import axios from "axios";
import type { GiphyCategory, GiphyGif } from "../types/giphy";
const apiKey = import.meta.env.VITE_GIPHY_API_KEY as string;

if (!apiKey) {
  console.warn("VITE_GIPHY_API_KEY não definida no .env");
}

export const giphyApi = axios.create({
  baseURL: "https://api.giphy.com/v1",
  params: {
    api_key: apiKey,
    limit: 24,
  },
});

export const getTrendingGifs = async (
  offset = 0,
  limit = 24,
): Promise<GiphyGif[]> => {
  const { data } = await giphyApi.get("/gifs/trending", {
    params: { offset, limit },
  });
  return data.data;
};

export const searchGifs = async (
  query: string,
  offset = 0,
  limit = 24,
): Promise<GiphyGif[]> => {
  const { data } = await giphyApi.get("/gifs/search", {
    params: { q: query, offset, limit },
  });
  return data.data;
};

export const getCategories = async (): Promise<GiphyCategory[]> => {
  const { data } = await giphyApi.get("/gifs/categories");
  return data.data;
};

export const getGifsByCategory = async (
  category: string,
  offset = 0,
  limit = 24,
): Promise<GiphyGif[]> => {
  const { data } = await giphyApi.get("/gifs/search", {
    params: { q: category, offset, limit },
  });
  return data.data;
};
