"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewContentPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement content creation logic
    console.log({ title, description, type, price, videoUrl, thumbnailUrl });
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
            required
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
            <option value="video">Videó</option>
            <option value="podcast">Podcast</option>
            <option value="exclusive">Exkluzív</option>
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
            placeholder="pl. 2990"
            min="0"
            step="1"
            className="input"
            required
          />
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
          <button type="submit" className="btn-primary">
            Tartalom közzététele
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
