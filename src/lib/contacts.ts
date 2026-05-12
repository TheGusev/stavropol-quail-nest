// Контакты фермы. Замените значения на реальные при запуске.
export const SITE_URL = "https://stavropolskiy-perepel.ru";
export const SITE_NAME = "Ставропольский Перепел";
export const PHONE_DISPLAY = "+7 (977) 559-72-15";
export const PHONE_TEL = "+79775597215";
export const WHATSAPP_NUMBER = "79775597215"; // без + и пробелов
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
