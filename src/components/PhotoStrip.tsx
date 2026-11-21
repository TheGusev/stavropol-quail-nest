import { useState } from "react";
import { Lightbox } from "@/components/BreedGallery";

export function PhotoStrip({ title, photos, alt }: { title: string; photos: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="not-prose my-6">
      <h2 className="font-serif text-xl font-semibold">{title}</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photos.map((src, i) => (
          <button key={src} onClick={() => setOpen(i)}>
            <img src={src} alt={`${alt}, фото ${i + 1}`} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
          </button>
        ))}
      </div>
      {open !== null && <Lightbox photos={photos} title={title} start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
