import { useEffect, useState } from "react";
import { Copy, Check, X } from "lucide-react";
import type { GiphyGif } from "../types/giphy";

interface GifModalProps {
  gif: GiphyGif;
  onClose: () => void;
}

export default function GifModal({ gif, onClose }: GifModalProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const image = gif.images.downsized_medium ?? gif.images.fixed_height;

  const handleCopy = async () => {
    const url = image.url;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopyState("copied");
        setTimeout(() => setCopyState("idle"), 2000);
        return;
      }
    } catch {
      // fall through to fallback
    }

    try {
      window.prompt("Copie o link do GIF:", url);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900/40 rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar visualização"
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 bg-black flex items-center justify-center">
            <img
              src={image.url}
              alt={gif.title}
              className="max-h-[70vh] w-full object-contain"
            />
          </div>

          <div className="p-4 sm:w-72 bg-slate-900/80 text-white flex flex-col gap-2">
            <h3 className="text-lg font-semibold">
              {gif.title || "Sem título"}
            </h3>
            <p className="text-xs text-slate-300 break-all">
              ID: {gif.id}
            </p>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-2 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-70"
            >
              {copyState === "copied" ? (
                <>
                  <Check size={16} />
                  Copiado
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copiar link
                </>
              )}
            </button>
            {copyState === "error" && (
              <span className="text-xs text-red-300">
                Não foi possível copiar. Copie manualmente o link acima.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
