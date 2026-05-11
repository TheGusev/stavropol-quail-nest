// Подсказки маскота-перепелёнка по роутам + случайные факты о ферме.

export type Tip = {
  text: string;
  cta?: { label: string; whatsapp: string };
};

const ROUTE_TIPS: Record<string, Tip[]> = {
  "/": [
    { text: "Привет! Я Перепёлкин 🐣 Свежие яйца — пиши в WhatsApp!", cta: { label: "Написать", whatsapp: "Здравствуйте! Хочу заказать перепелиные яйца." } },
    { text: "На главной всё самое вкусное. Листай ниже!" },
  ],
  "/catalog": [
    { text: "Не знаешь что выбрать? Лоток 20 шт — наш бестселлер.", cta: { label: "Заказать лоток", whatsapp: "Здравствуйте! Хочу лоток перепелиных яиц 20 шт." } },
  ],
  "/perepelinye-yaytsa": [
    { text: "Эти яйца я вчера сам высиживал 🥚", cta: { label: "Заказать", whatsapp: "Здравствуйте! Хочу пищевые перепелиные яйца." } },
  ],
  "/inkubatsionnoe-yaytso": [
    { text: "Из таких яиц вылупился я. Оплод 85%+", cta: { label: "Запросить", whatsapp: "Здравствуйте! Интересует инкубационное яйцо." } },
  ],
  "/myaso-perepela": [
    { text: "Тут я лучше промолчу… 😅 Но мясо у нас отличное." },
  ],
  "/molodnyak": [
    { text: "Мои братья и сёстры! Бронируй заранее.", cta: { label: "Забронировать", whatsapp: "Здравствуйте! Хочу забронировать молодняк." } },
  ],
  "/opt": [
    { text: 'HoReCa? Жми "Получить прайс" — скину предложение.', cta: { label: "Получить прайс", whatsapp: "Здравствуйте! Прошу прислать оптовый прайс." } },
  ],
  "/dostavka": [
    { text: "По Ставрополю довезу за пару часов!", cta: { label: "Уточнить", whatsapp: "Здравствуйте! Уточните доставку, пожалуйста." } },
  ],
  "/faq": [
    { text: "Не нашёл ответ? Чирикни мне в WhatsApp.", cta: { label: "Спросить", whatsapp: "Здравствуйте! У меня вопрос." } },
  ],
  "/kontakty": [
    { text: "Звони или пиши — я передам хозяину." },
  ],
  "/o-ferme": [
    { text: "Тут я родился. Приезжай в гости!" },
  ],
  "/sertifikaty": [
    { text: "Всё официально, через «Меркурий»." },
  ],
  "/stavropol": [{ text: "Доставлю свежие яйца в Ставрополь за день!", cta: { label: "Заказать", whatsapp: "Здравствуйте! Доставка в Ставрополь." } }],
  "/mihaylovsk": [{ text: "В Михайловск довезу своим транспортом.", cta: { label: "Заказать", whatsapp: "Здравствуйте! Доставка в Михайловск." } }],
  "/pyatigorsk": [{ text: "В Пятигорск — попутным рейсом, быстро.", cta: { label: "Заказать", whatsapp: "Здравствуйте! Доставка в Пятигорск." } }],
  "/essentuki": [{ text: "В Ессентуки — регулярные поставки.", cta: { label: "Заказать", whatsapp: "Здравствуйте! Доставка в Ессентуки." } }],
  "/nevinnomyssk": [{ text: "В Невинномысск — день в день при заказе с утра.", cta: { label: "Заказать", whatsapp: "Здравствуйте! Доставка в Невинномысск." } }],
};

const FARM_FACTS: Tip[] = [
  { text: "На ферме сейчас ~2000 перепёлок." },
  { text: "Перепёлка несётся каждые 22 часа." },
  { text: "Наши яйца возрастом не старше 7 дней." },
  { text: "За день собираем 1200+ яиц 🥚" },
  { text: "Перепелиное яйцо весит 10–12 г, а витаминов B в нём больше, чем в курином." },
  { text: "Я вылупился ровно через 17 дней инкубации." },
  { text: "Перепелята встают на ноги уже через час после вылупления!" },
];

let lastTipText = "";

export function pickTip(pathname: string): Tip {
  const key = "/" + pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const routeTips = ROUTE_TIPS[key] ?? ROUTE_TIPS["/"];
  const useFact = Math.random() < 0.3;
  const pool = useFact ? FARM_FACTS : routeTips;
  let tip = pool[Math.floor(Math.random() * pool.length)];
  if (tip.text === lastTipText && pool.length > 1) {
    tip = pool[(pool.indexOf(tip) + 1) % pool.length];
  }
  lastTipText = tip.text;
  return tip;
}
