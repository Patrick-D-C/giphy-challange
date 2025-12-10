import { useEffect, useRef, useState } from "react";
import type { GiphyGif } from "../types/giphy";
import GifCard from "./GifCard";
import GifModal from "./GifModal";
import LoadingSpinner from "./LoadingSpinner";

interface GifGridProps {
  gifs: GiphyGif[];
  canLoadMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  autoLoadMore?: boolean;
}

export default function GifGrid({
  gifs,
  canLoadMore = false,
  isLoading = false,
  onLoadMore,
  autoLoadMore = true,
}: GifGridProps) {
  const [selectedGif, setSelectedGif] = useState<GiphyGif | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isRequestingMore = useRef(false);

  const openGif = (gif: GiphyGif) => setSelectedGif(gif);
  const closeGif = () => setSelectedGif(null);

  useEffect(() => {
    if (!autoLoadMore || !onLoadMore || !canLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (isLoading || isRequestingMore.current) return;
          isRequestingMore.current = true;
          Promise.resolve(onLoadMore())
            .catch(() => {
              // errors already handled upstream
            })
            .finally(() => {
              isRequestingMore.current = false;
            });
        });
      },
      { rootMargin: "200px", threshold: 0.1 },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [autoLoadMore, onLoadMore, canLoadMore, isLoading]);

  if (!gifs.length) {
    return (
      <div className="mt-10 flex flex-col items-center text-slate-500 text-sm">
        <span className="text-5xl mb-2">😕</span>
        <p className="text-xl">Nenhum GIF encontrado.</p>
        <p className="text-md mt-1">
          Tente outro termo de busca ou escolha outra categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
        {gifs.map((gif) => (
          <GifCard key={gif.id} gif={gif} onOpen={openGif} />
        ))}
      </div>

      {canLoadMore && (
        <div ref={sentinelRef} aria-hidden className="h-1 w-full" />
      )}

      {onLoadMore && canLoadMore && isLoading && (
        <div className="flex justify-center mt-6">
          <LoadingSpinner />
        </div>
      )}

      {selectedGif && (
        <GifModal gif={selectedGif} onClose={closeGif} />
      )}
    </div>
  );
}
