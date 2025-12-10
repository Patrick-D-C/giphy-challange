import type { GiphyGif } from "../types/giphy";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface GifCardProps {
  gif: GiphyGif;
  onOpen?: (gif: GiphyGif) => void;
}

export default function GifCard({ gif, onOpen }: GifCardProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(gif.id));

  const image = gif.images.fixed_height;

  return (
    <div
      className="group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col transition-all duration-150 hover:-translate-y-1 hover:shadow-md cursor-pointer"
      onClick={() => onOpen?.(gif)}
      role="button"
      tabIndex={0}
      aria-label={`Abrir ${gif.title || "GIF"} em tela cheia`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(gif);
        }
      }}
    >
      <div className="relative">
        <img
          src={image.url}
          alt={gif.title}
          className="w-full h-40 object-cover"
          loading="lazy"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(gif);
          }}
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold shadow-sm transition-all duration-150 ${
            isFavorite
              ? "bg-yellow-500 text-white"
              : "bg-white/90 text-slate-700 hover:bg-white"
          }`}
        >
          {isFavorite ? "★ Favorito" : "☆ Favoritar"}
        </button>
      </div>

      <div className="p-2 flex-1 flex items-center">
        <span className="text-xs font-medium text-slate-800 line-clamp-2 group-hover:text-slate-900">
          {gif.title || "Sem título"}
        </span>
      </div>
    </div>
  );
}
