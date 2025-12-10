import { useGifsStore } from "../store/useGifsStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

export default function StatusBar() {
  const gifsCount = useGifsStore((s) => s.gifs.length);
  const loading = useGifsStore((s) => s.loading || s.loadingMore);
  const error = useGifsStore((s) => s.error);
  const favoritesCount = useFavoritesStore((s) => s.favorites.length);

  return (
    <div className="min-h-[40px] px-3 sm:px-4 flex items-center justify-start sm:justify-between text-[11px] sm:text-xs bg-slate-50 border-b border-slate-200">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-600">
        <span className="font-medium text-slate-700">Status</span>

        {loading && (
          <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white">
            Carregando...
          </span>
        )}

        {!loading && !error && (
          <span className="text-slate-500">
            GIFs carregados:{" "}
            <span className="font-semibold text-slate-800">
              {gifsCount}
            </span>
          </span>
        )}
        Favoritos:{" "}
        <span className="font-semibold text-slate-800">
          {favoritesCount}
        </span>

        {error && (
          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700">
            Erro ao carregar dados
          </span>
        )}
      </div>
    </div>
  );
}
