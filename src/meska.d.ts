declare class meskaDB {
  constructor(options?: {
    name: string,
    seperator: '.' | '-' | ',' | '_',
    language: 'en_US' | 'tr_TR',
    adapter: 'Json' | 'Yaml'
  });

  set(key: string, value: any): any;
  get(key: string): any;
  fetch(key: string): any;
  delete(key: string): any;
  has(key: string): boolean;
  update(key: string, fn: Function): any;
  add(key: string, value: number): any;
  substract(key: string, value: number): void;
  substr(key: string, value: number): void;
  all(): any;
  deleteAll(): boolean;
}

export = meskaDB;
