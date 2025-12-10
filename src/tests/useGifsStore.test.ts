import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGifsStore } from "./useGifsStore";
import type { GiphyGif } from "../types/giphy";
import { getTrendingGifs } from "../services/giphyApi";

vi.mock("../services/giphyApi", () => ({
  getTrendingGifs: vi.fn(),
  searchGifs: vi.fn(),
  getCategories: vi.fn(),
  getGifsByCategory: vi.fn(),
}));

const mockedGetTrendingGifs = vi.mocked(getTrendingGifs);

const resetStoreState = () =>
  useGifsStore.setState({
    gifs: [],
    categories: [],
    loading: false,
    loadingMore: false,
    error: null,
    mode: null,
    query: null,
    offset: 0,
    hasMore: true,
  });

describe("useGifsStore.fetchTrending", () => {
  beforeEach(() => {
    resetStoreState();
    vi.clearAllMocks();
  });

  it("marca loading como true e preenche gifs no sucesso", async () => {
    const mockGifs: GiphyGif[] = [
      {
        id: "1",
        title: "Dancing Cat",
        images: {
          fixed_height: {
            url: "https://example.com/cat.gif",
            height: "200",
            width: "200",
          },
        },
      },
    ];

    mockedGetTrendingGifs.mockResolvedValue(mockGifs);

    const fetchPromise = useGifsStore.getState().fetchTrending();

    expect(useGifsStore.getState().loading).toBe(true);

    await fetchPromise;

    const state = useGifsStore.getState();
    expect(mockedGetTrendingGifs).toHaveBeenCalledTimes(1);
    expect(state.loading).toBe(false);
    expect(state.gifs).toEqual(mockGifs);
    expect(state.error).toBeNull();
  });

  it("seta error quando a API falha e encerra loading", async () => {
    mockedGetTrendingGifs.mockRejectedValue(new Error("Network down"));

    const fetchPromise = useGifsStore.getState().fetchTrending();

    expect(useGifsStore.getState().loading).toBe(true);

    await fetchPromise;

    const state = useGifsStore.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Erro ao carregar trending");
  });
});
