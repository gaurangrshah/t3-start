export * from './nextauth';
export interface Obj {
  [p: string]: {
    [p: string]: string;
  };
}

export interface Maybe {
  string: string | null | undefined;
  number: number | null | undefined;
}
