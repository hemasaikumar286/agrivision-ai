import { translations } from "./translations";

export function useTranslate(language) {
  return (key) =>
    translations[language]?.[key] || translations.english[key];
}