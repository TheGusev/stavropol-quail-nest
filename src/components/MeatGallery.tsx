import { useState } from "react";
import { MEAT_PHOTOS } from "@/lib/breed-photos";
import { Lightbox } from "@/components/BreedGallery";

export function MeatGallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="not-prose my-6">
      <h2 className="font-serif text-xl font-semibold">Наши тушки — в вакуумной упаковке</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MEAT_PHOTOS.map((src, i) => (
          <button key={src} onClick={() => setOpen(i)}>
            <img src={src} alt={`Тушки перепела в вакуумной упаковке, фото ${i + 1}`} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
          </button>
        ))}
      </div>
      {open !== null && <Lightbox photos={MEAT_PHOTOS} title="Тушки перепела" start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
