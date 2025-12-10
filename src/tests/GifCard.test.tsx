import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GifCard from "../components/GifCard";
import type { GiphyGif } from "../types/giphy";

const toggleFavoriteMock = vi.fn();
const isFavoriteMock = vi.fn();

vi.mock("../store/useFavoritesStore", () => ({
  useFavoritesStore: (selector: any) =>
    selector({
      toggleFavorite: toggleFavoriteMock,
      isFavorite: isFavoriteMock,
    }),
}));

const mockGif: GiphyGif = {
  id: "gif_1",
  title: "Dancing Cat",
  images: {
    fixed_height: {
      url: "https://example.com/dancing-cat.gif",
      width: "200",
      height: "200",
    },
  },
};

describe("GifCard", () => {
  beforeEach(() => {
    toggleFavoriteMock.mockClear();
    isFavoriteMock.mockReset();
    isFavoriteMock.mockReturnValue(false);
  });

  it("renderiza o título do GIF", () => {
    render(<GifCard gif={mockGif} />);

    expect(screen.getByText("Dancing Cat")).toBeInTheDocument();
  });

  it("chama toggleFavorite ao clicar no botão", () => {
    render(<GifCard gif={mockGif} />);

    fireEvent.click(screen.getByRole("button", { name: /favorit/i }));

    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockGif);
  });
});
