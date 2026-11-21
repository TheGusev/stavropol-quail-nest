import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BREED_PHOTOS } from "@/lib/breed-photos";

export function Lightbox({ photos, title, start = 0, onClose }: { photos: string[]; title: string; start?: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const n = photos.length;
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % n);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + n) % n);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [n, onClose]);
  return (
    <div role="dialog" aria-label={title} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground/90 p-4" onClick={onClose}>
      <button aria-label="Закрыть" className="absolute right-4 top-4 rounded-full bg-background p-2"><X className="h-5 w-5" /></button>
      <img src={photos[i]} alt={`${title}, фото ${i + 1}`} className="max-h-[80vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
      <div className="mt-3 flex items-center gap-4 text-background" onClick={(e) => e.stopPropagation()}>
        {n > 1 && <button aria-label="Назад" onClick={() => setI((i - 1 + n) % n)} className="rounded-full bg-background p-2 text-foreground"><ChevronLeft className="h-5 w-5" /></button>}
        <span className="text-sm">{title} · {i + 1}/{n}</span>
        {n > 1 && <button aria-label="Вперёд" onClick={() => setI((i + 1) % n)} className="rounded-full bg-background p-2 text-foreground"><ChevronRight className="h-5 w-5" /></button>}
      </div>
    </div>
  );
}

/** Лента всех фото пород фермы. */
export function OurBirds() {
  const items = Object.entries(BREED_PHOTOS).flatMap(([breed, ps]) => ps.map((src, idx) => ({ breed, src, idx })));
  const [open, setOpen] = useState<{ breed: string; idx: number } | null>(null);
  return (
    <div className="not-prose">
      <h2 className="font-serif text-2xl font-semibold md:text-3xl">Наши птицы</h2>
      <p className="mt-2 text-muted-foreground">Реальные фото птицы с нашей фермы.</p>
      <div className="mt-5 flex snap-x gap-3 overflow-x-auto pb-2">
        {items.map((it) => (
          <button key={it.src} onClick={() => setOpen(it)} className="w-44 shrink-0 snap-start text-left sm:w-56">
            <img src={it.src} alt={`Перепел породы ${it.breed}`} loading="lazy" className="aspect-[3/4] w-full rounded-xl object-cover" />
            <span className="mt-1.5 block text-sm font-medium">{it.breed}</span>
          </button>
        ))}
      </div>
      {open && <Lightbox photos={BREED_PHOTOS[open.breed] ?? []} title={open.breed} start={open.idx} onClose={() => setOpen(null)} />}
    </div>
  );
}
