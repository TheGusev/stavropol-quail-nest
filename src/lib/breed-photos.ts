import f1 from "@/assets/breeds/feniks-1.jpg";
import f2 from "@/assets/breeds/feniks-2.jpg";
import f3 from "@/assets/breeds/feniks-3.jpg";
import p1 from "@/assets/breeds/faraon-1.jpg";
import p2 from "@/assets/breeds/faraon-2.jpg";
import p3 from "@/assets/breeds/faraon-3.jpg";
import t1 from "@/assets/breeds/tehas-1.jpg";
import t2 from "@/assets/breeds/tehas-2.jpg";
import t3 from "@/assets/breeds/tehas-3.jpg";
import d1 from "@/assets/breeds/dmitrovskaya-1.jpg";

export const BREED_PHOTOS: Record<string, string[]> = {
  "Феникс золотистый": [f1, f2, f3],
  "Фараон": [p1, p2, p3],
  "Техас утяжелённый (белый)": [t1, t2, t3],
  "Дмитровская": [d1],
};

export const HERO_FENIKS = f2;
export const HERO_FARAON = p1;
export const HERO_TEHAS = t2;
