/**
 * A enumartion of Application error.  Preface with a namespace
 * {namespace}_{specificType}
 */
export enum ExceptionTypes {
   General_Unknown = 'Unknown Error',
   General_External = 'External Library Error',
   Schedule_RecurrenceConfigurationIsInvalid = 'Recurrence configuration is invalid',
   Schedule_RecurrenceAggregationPeriods = 'Invalid aggregation period',
}

/**
 * The general paradigm is that Exceptions are only used for unexpected and uncommon
 * logic and data situations.
 * If the situation is the part of the common data flow we should prefer return codes and validatioreturn types
 * If the situation is based on external library or JS hard errors, use and include the JS Error
 * Exception type to be used with js: throw in application
 */
export class Exception<T extends Record<string, any>> extends Error {
   data?: T;
   exeptionType: ExceptionTypes;

   constructor(exceptionType: ExceptionTypes, data?: T, message?: string) {
      if (message == undefined) {
         super(exceptionType.toString());
      } else {
         super(message);
      }

      this.exeptionType = exceptionType;
      this.data = data;
      if (process.env.NODE_ENV !== 'production') console.error(exceptionType, data);
   }
}
