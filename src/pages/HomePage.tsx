import { useEffect } from "react";
import { useGifsStore } from "../store/useGifsStore";
import SearchBar from "../components/SearchBar";
import GifGrid from "../components/GifGrid";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const {
    gifs,
    loading,
    loadingMore,
    error,
    fetchTrending,
    search,
    fetchMore,
    hasMore,
  } = useGifsStore();

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  const handleSearch = (term: string) => {
    if (!term) {
      fetchTrending();
      return;
    }

    search(term);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-slate-800 mb-2">
        Home
      </h1>
      <p className="text-md text-slate-500 mb-4">
        Veja os GIFs em alta ou pesquise por um termo.
      </p>

      <SearchBar onSearch={handleSearch} />

      {loading && !gifs.length && <LoadingSpinner />}

      {error && (
        <p className="text-sm text-red-500 mb-2">
          {error}
        </p>
      )}

      {!error && (
        <GifGrid
          gifs={gifs}
          isLoading={loadingMore}
          canLoadMore={hasMore}
          onLoadMore={fetchMore}
        />
      )}
    </div>
  );
}
