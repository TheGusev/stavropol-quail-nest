// Контакты фермы. Замените значения на реальные при запуске.
export const SITE_URL = "https://stavropolskiy-perepel.ru";
export const SITE_NAME = "Ставропольский Перепел";
export const PHONE_DISPLAY = "+7 (988) 756-79-61";
export const PHONE_TEL = "+79887567961";
export const WHATSAPP_NUMBER = "79887567961"; // без + и пробелов
export const AVITO_URL =
  "https://www.avito.ru/budennovsk/ptitsy/yaytsa_perepelinye_inkubatsionnye_s_fermy_8177951194";
export const MAX_URL = "https://max.ru/u/f9LHodD0cOInz-kWvugspBCJdxjpSR3brjZ8TCKyzm56KnWlw3qsyqbt5hA";
export const EMAIL = "info@stavropolskiy-perepel.ru";
export const ADDRESS = {
  region: "Ставропольский край",
  locality: "Ставрополь",
  street: "ул. Фермерская, 1",
  postalCode: "355000",
  country: "RU",
};

export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function telUrl(): string {
  return `tel:${PHONE_TEL}`;
}
