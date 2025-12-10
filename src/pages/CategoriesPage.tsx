import { useEffect, useState } from "react";
import { useGifsStore } from "../store/useGifsStore";
import GifGrid from "../components/GifGrid";
import type { GiphyCategory } from "../types/giphy";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CategoriesPage() {
  const {
    categories,
    gifs,
    loading,
    loadingMore,
    error,
    fetchCategories,
    fetchByCategory,
    fetchMore,
    hasMore,
  } = useGifsStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Carrega categorias ao montar a página (se ainda não carregadas)
  useEffect(() => {
    if (!categories.length) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  const handleCategoryClick = (category: GiphyCategory) => {
    setSelectedCategory(category.name);
    fetchByCategory(category.name);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        Categorias
      </h2>
      <p className="text-md text-slate-500 mb-4">
        Escolha uma categoria para ver GIFs relacionados.
      </p>

      {/* Lista de categorias */}
      {!categories.length && !loading && !error && (
        <p className="text-sm text-slate-500">
          Nenhuma categoria encontrada.
        </p>
      )}

      {!!categories.length && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.name_encoded}
              onClick={() => handleCategoryClick(cat)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedCategory === cat.name
                  ? "bg-blue-800 text-white border-blue-900"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-blue-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Estados de carregamento / erro / resultado de GIFs */}
      {loading && !gifs.length && <LoadingSpinner />}

      {error && (
        <p className="text-sm text-red-500 mb-2">{error}</p>
      )}

      {!loading && !error && selectedCategory && (
        <>
          <h3 className="text-md font-semibold text-blue-800 mt-2">
            GIFs da categoria: <span className="italic">{selectedCategory}</span>
          </h3>
          <GifGrid
            gifs={gifs}
            isLoading={loadingMore}
            canLoadMore={hasMore}
            onLoadMore={fetchMore}
          />
        </>
      )}
    </div>
  );
}
