import { ValidationError } from 'yup';

/**
 * Validation, to be utilized with Yup schema validation.
 * NOTE: perhaps its unecessary and can only use Yup Validation Error
 */
export type ValidationData = {
   validationType: ValidationTypes;
   error?: ValidationError;
};

/**
 * A enumartion of Application validation.  Preface with a namespace
 * {namespace}_{specificType} The actual validation property errors will be
 * contained in the Yup ValidationError object
 */
export enum ValidationTypes {
   /**
    * replace me!
    */
   General_Unknown = 'Unknown Validation',
}
