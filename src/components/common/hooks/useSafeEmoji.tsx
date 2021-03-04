import { useMemo } from 'react';
import emojiRegexRGI from 'emoji-regex';

export const useSafeEmoji = (emoji: string): string => {
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
