export interface IDisplayText {
   /**
    * primary: primary display text
    */
   primary: string;
   /**
    * summary: short of primary
    */
   summary?: string;
   /**
    * description: explains the primary text, shown as a discriptive text
    */
   description?: string;
   /**
    * alternate way of describing the text
    */
   alternate?: string;
   /**
    * emoji to describe
    */
   emoji?: string;
}

export const defaultIDisplayText = (): IDisplayText => {
   return { primary: '' } as IDisplayText;
};
