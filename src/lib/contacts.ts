// Контакты фермы. Замените значения на реальные при запуске.
export const SITE_URL = "https://stavropolskiy-perepel.ru";
export const SITE_NAME = "Ставропольский Перепел";
export const PHONE_DISPLAY = "+7 (000) 000-00-00";
export const PHONE_TEL = "+70000000000";
export const WHATSAPP_NUMBER = "79000000000"; // без + и пробелов
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
