import f1 from "@/assets/breeds/feniks-1.jpg";
import f2 from "@/assets/breeds/feniks-2.jpg";
import f3 from "@/assets/breeds/feniks-3.jpg";
import p1 from "@/assets/breeds/faraon-1.jpg";
import p2 from "@/assets/breeds/faraon-2.jpg";
import p3 from "@/assets/breeds/faraon-3.jpg";
import t1 from "@/assets/breeds/tehas-1.jpg";
import t2 from "@/assets/breeds/tehas-2.jpg";
import t3 from "@/assets/breeds/tehas-3.jpg";
import p4 from "@/assets/breeds/faraon-4.jpg";
import p5 from "@/assets/breeds/faraon-5.jpg";
import p6 from "@/assets/breeds/faraon-6.jpg";
import p7 from "@/assets/breeds/faraon-7.jpg";
import s1 from "@/assets/breeds/saladon-1.jpg";
import m1 from "@/assets/meat/tushki-1.jpg";
import m2 from "@/assets/meat/tushki-2.jpg";
import m3 from "@/assets/meat/tushki-3.jpg";
import m4 from "@/assets/meat/tushki-4.jpg";
import d1 from "@/assets/breeds/dmitrovskaya-1.jpg";

export const BREED_PHOTOS: Record<string, string[]> = {
  "Феникс золотистый": [f1, f2, f3],
  "Фараон": [p1, p2, p3, p4, p5, p6, p7],
  "Саладон": [s1],
  "Техас утяжелённый (белый)": [t1, t2, t3],
  "Дмитровская": [d1],
};

export const HERO_FENIKS = f2;
export const HERO_FARAON = p1;
export const HERO_TEHAS = t2;

export const MEAT_PHOTOS = [m1, m2, m3, m4];
