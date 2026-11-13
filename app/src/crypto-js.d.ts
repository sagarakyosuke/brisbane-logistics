declare module 'crypto-js' {
  export interface WordArray {
    toString(encoder?: unknown): string;
    concat(wordArray: WordArray): WordArray;
    ciphertext?: WordArray;
    words?: number[];
    sigBytes?: number;
  }

  export interface Config {
    iv?: WordArray;
    mode?: unknown;
    padding?: unknown;
  }

  export const enc: {
    Base64: { parse(str: string): WordArray; stringify(wordArray: WordArray): string };
    Latin1: { parse(str: string): WordArray; stringify(wordArray: WordArray): string };
    Utf8: { parse(str: string): WordArray; stringify(wordArray: WordArray): string };
  };

  export const mode: {
    CBC: unknown;
  };

  export const pad: {
    Pkcs7: unknown;
  };

  export const AES: {
    encrypt: (message: string, key: WordArray | string, cfg?: Config) => { ciphertext: WordArray };
    decrypt: (ciphertext: string | WordArray, key: WordArray | string, cfg?: Config) => WordArray;
  };

  export const lib: {
    WordArray: {
      random: (nBytes: number) => WordArray;
    };
  };
}
