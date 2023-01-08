export * from './nextauth';

export interface Obj {
  [p: string]: {
    [p: string]: string;
  };
}

export type Maybe = {
  string: string | null | undefined,
  number: number | null | undefined,
  object: Record<string, any> | null | undefined,
}
