import { PhotoStrip } from "@/components/PhotoStrip";
import { PACK_PHOTOS } from "@/lib/pack-photos";

export function PackingBlock() {
  return (
    <div className="not-prose">
      <PhotoStrip title="Как мы упаковываем" photos={PACK_PHOTOS} alt="Упаковка перепелиных яиц для отправки" />
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        <li>• Яйца в отдельных лотках, каждая порода подписана</li>
        <li>• Пенопласт между лотками — ничего не болтается</li>
        <li>• Коробка с лентой «Осторожно, хрупкое» и пометкой «не переворачивать»</li>
      </ul>
    </div>
  );
}
