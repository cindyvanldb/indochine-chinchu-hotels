import { Language, LocalizedString, LocalizedList } from '../types';

/**
 * Safely resolves a localized string, prioritizing the chosen language,
 * with fallbacks to English, Vietnamese, or empty string.
 */
export function getLocalizedText(
  item?: LocalizedString | null,
  lang: Language = 'vi'
): string {
  if (!item) return '';
  if (item[lang]) return item[lang] as string;
  if (item.en) return item.en;
  if (item.vi) return item.vi;
  return '';
}

/**
 * Safely resolves a localized list of strings with language fallback.
 */
export function getLocalizedList(
  item?: LocalizedList | null,
  lang: Language = 'vi'
): string[] {
  if (!item) return [];
  if (item[lang] && Array.isArray(item[lang]) && item[lang]!.length > 0) {
    return item[lang] as string[];
  }
  if (item.en && Array.isArray(item.en) && item.en.length > 0) {
    return item.en;
  }
  if (item.vi && Array.isArray(item.vi) && item.vi.length > 0) {
    return item.vi;
  }
  return [];
}
