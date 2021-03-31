import { useMemo } from 'react';
import emojiRegexRGI from 'emoji-regex';

/**
 * Get the first emoji taking into account emoji colors and complex characters
 * Used by @see TwemojiImage
 * note: is expensive (large) and should be bundle split.
 *
 * @param emoji
 */
export const useFirstEmoji = (emoji: string): string => {
   return useMemo((): string => {
      if (emoji?.length > 0) {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
         const regex: RegExp = emojiRegexRGI();
         const [result] = emoji.matchAll(regex);
         return result?.[0] ?? '';
      }
      return '';
   }, [emoji]);
};
