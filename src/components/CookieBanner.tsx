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
      aria-label="Настройки куки"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-2xl border border-border bg-card p-4 shadow-lg outline-none sm:bottom-5"
    >
      {!settingsOpen ? (
        <>
          <p className="text-sm leading-relaxed text-foreground">
            Мы считаем посещения без куки. Если вы согласны, мы также измеряем нажатия и другие
            действия. Подробнее — в{" "}
            <Link to="/privacy" className="text-primary underline underline-offset-2">
              политике конфиденциальности
            </Link>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="flex-1" onClick={acceptAll}>
              Принять все
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={rejectAll}>
              Отклонить все
            </Button>
          </div>
          <button
            type="button"
            onClick={() => {
              setAnalyticsOn(readChoice("analytics") === "granted");
              setSettingsOpen(true);
            }}
            className="mt-2 w-full text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Настройки куки
          </button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
