import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { needsAnswer, onConsentChange, readChoice, saveChoices } from "@/lib/consent";

const PURPOSES = ["analytics"] as const;

function gpcActive(): boolean {
  return (
    typeof navigator !== "undefined" &&
    (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void needsAnswer([...PURPOSES]).then((need) => {
      if (need) setVisible(true);
    });
    const openSettings = () => {
      setAnalyticsOn(readChoice("analytics") === "granted");
      setSettingsOpen(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    const unsubscribe = onConsentChange(() => {
      setAnalyticsOn(readChoice("analytics") === "granted");
    });
    return () => {
      window.removeEventListener("open-cookie-settings", openSettings);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (visible) panelRef.current?.focus();
  }, [visible]);

  if (!visible) return null;

  const close = () => {
    setVisible(false);
    setSettingsOpen(false);
  };

  // «Понятно» подтверждает только необходимые куки — аналитику можно включить в настройках.
  const acknowledge = () => {
    saveChoices({ analytics: "denied" });
    close();
  };

  const acceptAll = () => {
    saveChoices({ analytics: "granted" });
    close();
  };

  const rejectAll = () => {
    saveChoices({ analytics: "denied" });
    close();
  };

  const saveSettings = () => {
    saveChoices({ analytics: analyticsOn ? "granted" : "denied" });
    close();
  };

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="region"
      aria-label="Уведомление о куки"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl outline-none sm:bottom-5"
    >
      {!settingsOpen ? (
        <div className="cookie-card flex flex-col items-stretch gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:p-5">
          <p className="flex-1 text-[15px] leading-relaxed text-foreground sm:text-base">
            Используем cookies для работы сайта.{" "}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
              Подробнее
            </Link>
          </p>
          <Button
            onClick={acknowledge}
            className="shrink-0 rounded-xl px-7 text-base sm:self-center"
          >
            Понятно
          </Button>
        </div>
      ) : (
        <div
          className="cookie-card rounded-2xl border border-border bg-card p-4 shadow-lg sm:p-5"
          role="region"
          aria-label="Настройки куки"
        >
          <div className="text-sm font-semibold text-foreground">Настройки куки</div>
          {gpcActive() && (
            <p className="mt-2 text-xs text-muted-foreground">
              Ваш браузер просит сайты не отслеживать вас — этот сигнал применяется, и настройки
              недоступны.
            </p>
          )}
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-foreground">Необходимые</div>
              <span className="text-xs text-muted-foreground">Всегда включены</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-foreground">
                Аналитика <span className="text-muted-foreground">— предоставляет Lovable</span>
              </div>
              <Switch
                checked={analyticsOn && !gpcActive()}
                disabled={gpcActive()}
                onCheckedChange={setAnalyticsOn}
                aria-label="Аналитика"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" className="flex-1" onClick={saveSettings} disabled={gpcActive()}>
              Сохранить
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={close}>
              Закрыть
            </Button>
          </div>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="ghost" className="flex-1" onClick={acceptAll}>
              Принять все
            </Button>
            <Button size="sm" variant="ghost" className="flex-1" onClick={rejectAll}>
              Отклонить все
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
