import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import hatchSrc from "@/assets/video/vyvod-ptentsov.mp4";
import hatchPoster from "@/assets/video/vyvod-ptentsov.jpg";
import brooderSrc from "@/assets/video/brooder.mp4";
import brooderPoster from "@/assets/video/brooder.jpg";

const VIDEOS = {
  hatch: { src: hatchSrc, poster: hatchPoster, title: "Вывод птенцов на нашей ферме — около 90%" },
  brooder: { src: brooderSrc, poster: brooderPoster, title: "Перепелята в нашем брудере" },
};

export function FarmVideo({ kind, title }: { kind: keyof typeof VIDEOS; title?: string }) {
  const v = VIDEOS[kind];
  const [muted, setMuted] = useState(true);
  return (
    <figure className="not-prose my-6">
      <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-muted shadow-md">
        <video
          src={v.src}
          poster={v.poster}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="metadata"
          className="aspect-[9/16] w-full object-cover"
          aria-label={title ?? v.title}
        />
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur"
          aria-label={muted ? "Включить звук" : "Выключить звук"}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">{title ?? v.title}</figcaption>
    </figure>
  );
}
