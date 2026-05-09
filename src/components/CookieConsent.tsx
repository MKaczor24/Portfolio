import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const CONSENT_COOKIE = "mk_consent";
const CONSENT_MAX_AGE_DAYS = 180;

type ConsentState = "granted" | "denied";

type WindowWithConsent = typeof window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

const readConsentCookie = () => {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

const writeConsentCookie = (value: ConsentState) => {
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  let cookie = `${CONSENT_COOKIE}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;

  if (window.location.protocol === "https:") {
    cookie += "; Secure";
  }

  document.cookie = cookie;
};

const updateConsent = (value: ConsentState) => {
  const analyticsStorage = value === "granted" ? "granted" : "denied";
  const w = window as WindowWithConsent;

  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: analyticsStorage,
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    });
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: "consent_update",
      analytics_storage: analyticsStorage,
    });
  }
};

export default function CookieConsent() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = readConsentCookie();
    if (stored === "granted" || stored === "denied") {
      updateConsent(stored);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("cmp:open", handleOpen);
    return () => window.removeEventListener("cmp:open", handleOpen);
  }, []);

  const handleAccept = () => {
    writeConsentCookie("granted");
    updateConsent("granted");
    setIsOpen(false);
  };

  const handleDecline = () => {
    writeConsentCookie("denied");
    updateConsent("denied");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:inset-x-auto md:right-6">
      <div className="border-border/60 bg-background/90 w-full max-w-xl rounded-2xl border p-4 shadow-lg shadow-black/10 backdrop-blur-md">
        <p className="text-foreground text-sm font-semibold">
          {t("consent.title")}
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          {t("consent.description")}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            className="rounded-lg"
            onClick={handleDecline}
          >
            {t("consent.decline")}
          </Button>
          <Button type="button" className="rounded-lg" onClick={handleAccept}>
            {t("consent.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
