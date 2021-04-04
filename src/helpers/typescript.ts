/**
 * https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 */
export type UnionToArray<Type> = Type extends any ? Type[] : never;
