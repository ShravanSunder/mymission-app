export interface IDisplayText {
   /**
    * primary: primary display text
    */
   primary: string;
   /**
    * secondary: explains the primary text, shown as a discriptive text
    */
   description?: string;

   /**
    * alternate way of describing the text
    */
   alternate?: string;
}
