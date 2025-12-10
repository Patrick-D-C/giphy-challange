import GifGrid from "../components/GifGrid";
import { useFavoritesStore } from "../store/useFavoritesStore";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);

  const hasFavorites = favorites.length > 0;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        Favoritos
      </h2>
      <p className="text-md text-slate-500 mb-4">
        Aqui você encontra os GIFs que marcou como favoritos.
      </p>

      {!hasFavorites && (
        <p className="text-slate-700 text-xl">
          Você ainda não tem GIFs favoritos. Vá até a Home ou Categorias e
          clique na estrela em um GIF para favoritar.
        </p>
      )}

      {hasFavorites && <GifGrid gifs={favorites} />}
    </div>
  );
}
