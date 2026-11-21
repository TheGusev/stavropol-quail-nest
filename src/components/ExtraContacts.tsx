import { useState } from "react";
import { AVITO_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contacts";

/** Макс (копирует номер) и Авито — используются рядом с WhatsApp. */
export function MaxButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(PHONE_TEL).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
      }}
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary ${className}`}
      aria-label={`Макс: ${PHONE_DISPLAY}, скопировать номер`}
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">M</span>
      {copied ? "Номер скопирован" : `Макс: ${PHONE_DISPLAY}`}
    </button>
  );
}

export function AvitoLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={AVITO_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary ${className}`}
    >
      <span className="grid h-5 w-5 grid-cols-2 gap-[2px] p-[2px]" aria-hidden>
        <span className="rounded-full bg-primary" /><span className="rounded-full bg-accent" />
        <span className="rounded-full bg-accent" /><span className="rounded-full bg-primary" />
      </span>
      Мы на Авито
    </a>
  );
}

export function ExtraContacts({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <MaxButton />
      <AvitoLink />
    </div>
  );
}
