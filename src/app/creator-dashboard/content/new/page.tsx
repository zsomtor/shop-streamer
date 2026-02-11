"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { createContent } from "@/lib/actions";

export default function NewContentPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("type", type);
    formData.set("price", price || "0");
    formData.set("videoUrl", videoUrl);
    formData.set("thumbnailUrl", thumbnailUrl);

    startTransition(async () => {
      const result = await createContent(formData);
      if (result?.error) {
        setError(result.error);
      }
      // On success, the server action redirects to /creator-dashboard/content
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/creator-dashboard/content"
          className="text-sm text-dark-400 hover:text-dark-200 transition-colors"
        >
          &larr; Vissza a tartalmakhoz
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-dark-50 mb-6">
        Új tartalom feltöltése
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            Cím
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add meg a tartalom címét"
            className="input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            Leírás
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Írd le a tartalmat részletesen"
            rows={4}
            className="input resize-y"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            Tartalom típusa
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
            required
          >
            <option value="" disabled>
              Válassz típust
            </option>
            <option value="VIDEO">Videó</option>
            <option value="PODCAST">Podcast</option>
            <option value="EXCLUSIVE">Exkluzív</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            Ár (HUF)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0 = ingyenes"
            min="0"
            step="1"
            className="input"
          />
          <p className="mt-1.5 text-xs text-dark-400">
            Hagyd üresen vagy 0-t a ingyenes tartalomhoz
          </p>
        </div>

        <div>
          <label
            htmlFor="videoUrl"
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            Videó URL
          </label>
          <input
            id="videoUrl"
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://..."
            className="input"
          />
          <p className="mt-1.5 text-xs text-dark-400">
            Illeszd be a Vimeo vagy YouTube linket
          </p>
        </div>

        <div>
          <label
            htmlFor="thumbnailUrl"
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            Borítókép URL
          </label>
          <input
            id="thumbnailUrl"
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="https://..."
            className="input"
          />
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? "Közzététel..." : "Tartalom közzététele"}
          </button>
          <Link
            href="/creator-dashboard/content"
            className="btn-secondary"
          >
            Mégse
          </Link>
        </div>
      </form>
    </div>
  );
}
