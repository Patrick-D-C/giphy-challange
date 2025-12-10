import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GifGrid from "../components/GifGrid";

describe("GifGrid", () => {
  it("exibe mensagem de estado vazio quando não há GIFs", () => {
    render(<GifGrid gifs={[]} />);

    expect(screen.getByText("Nenhum GIF encontrado.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Tente outro termo de busca ou escolha outra categoria.",
      ),
    ).toBeInTheDocument();
  });
});
