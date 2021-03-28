export const logError = <T>(e: T): void => {
   console.error('Subscription Error: ', e);
};

export const logDebug = <T>(e: T): void => {
   console.log('Subscription Log: ', e);
};

export const logWarning = <T>(e: T): void => {
   console.warn('Subscription Log: ', e);
};
