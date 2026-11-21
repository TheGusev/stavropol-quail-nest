import { useState } from "react";
import { Egg, Thermometer, Warehouse, Phone, MessageCircle } from "lucide-react";
import { Lightbox } from "@/components/BreedGallery";
import { telUrl, whatsappUrl } from "@/lib/contacts";
import q1 from "@/assets/farm/owner-quail-1.jpg";
import q2 from "@/assets/farm/owner-quail-2.jpg";
import thumb from "@/assets/farm/owner-thumb.jpg";
import incubator from "@/assets/farm/owner-incubator.jpg";
import brooder from "@/assets/farm/brooder.jpg";

export const FARM_INCUBATOR = incubator;
export const FARM_BROODER = brooder;
const PHOTOS = [q1, incubator, thumb, brooder, q2];
const ALTS = ["Хозяин фермы с перепелом", "У инкубатора с лотками яиц", "Среди клеток с птицей", "Брудер с перепелятами", "Перепел в руках на ферме"];

export function FarmTeam() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold md:text-3xl">Кто стоит за фермой</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Мы сами выращиваем перепелов — от инкубации до доставки. Инкубаторы свои, стабильный вывод около 90%. Можно приехать и посмотреть ферму.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {PHOTOS.slice(0, 4).map((src, i) => (
          <button key={src} onClick={() => setOpen(i)} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <img src={src} alt={ALTS[i]} loading="lazy" className="h-full w-full rounded-xl object-cover" style={{ aspectRatio: i === 0 ? "1/1" : "3/4" }} />
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[{ i: Warehouse, t: "Свои инкубаторы" }, { i: Egg, t: "Стабильный вывод ~90%" }, { i: Thermometer, t: "Брудер для перепелят" }].map((f) => (
          <div key={f.t} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-medium">
            <f.i className="h-5 w-5 text-primary" /> {f.t}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={telUrl()} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"><Phone className="h-4 w-4" /> Позвонить</a>
        <a href={whatsappUrl("Здравствуйте! Хочу приехать посмотреть ферму.")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
      </div>
      {open !== null && <Lightbox photos={PHOTOS} title="Наша ферма" start={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

export function FarmStrip() {
  return (
    <div className="not-prose">
      <div className="text-sm font-medium text-muted-foreground">Это мы</div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[q1, incubator, brooder].map((s, i) => <img key={s} src={s} alt={ALTS[[0, 1, 3][i]!]} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />)}
      </div>
    </div>
  );
}

export function FarmPhoto({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="not-prose my-4">
      <img src={src} alt={alt} loading="lazy" className="max-h-96 w-full rounded-xl object-cover" />
      <figcaption className="mt-1.5 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
