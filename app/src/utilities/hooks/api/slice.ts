import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface EncryptedApiResponse {
  version: number;
  nonce: string;
  tag: string;
  ciphertext: string;
}

interface EncryptedResponseWrapper {
  response: string;
}

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const API_ENCRYPTION_KEY = import.meta.env.VITE_API_ENCRYPTION_KEY as string | undefined;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  timeout: 20000,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');

    return headers;
  },
});

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const base64ToBytes = (value: unknown, field: string): Uint8Array => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing or invalid encrypted ${field}.`);
  }

  try {
    const binary = atob(value.trim());

    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    throw new Error(`Invalid Base64 encoding for ${field}.`);
  }
};

const toArrayBuffer = (bytes: Uint8Array): ArrayBuffer => {
  const buffer = new ArrayBuffer(bytes.length);

  new Uint8Array(buffer).set(bytes);

  return buffer;
};

// -----------------------------------------------------------------------------
// Decryption
// -----------------------------------------------------------------------------

const decryptResponse = async (encryptedResponse: string): Promise<unknown> => {
  if (!API_ENCRYPTION_KEY) {
    throw new Error('VITE_API_ENCRYPTION_KEY is not configured.');
  }

  // Decode outer Base64 envelope.
  const envelopeBytes = base64ToBytes(encryptedResponse, 'response envelope');

  let envelope: EncryptedApiResponse;

  try {
    envelope = JSON.parse(new TextDecoder().decode(envelopeBytes)) as EncryptedApiResponse;
  } catch {
    throw new Error('Unable to parse AES-GCM envelope.');
  }

  if (envelope.version !== 1 || !envelope.nonce || !envelope.tag || !envelope.ciphertext) {
    throw new Error('Invalid AES-GCM response envelope.');
  }

  // Decode encryption components.
  const nonce = base64ToBytes(envelope.nonce, 'nonce');
  const tag = base64ToBytes(envelope.tag, 'tag');
  const ciphertext = base64ToBytes(envelope.ciphertext, 'ciphertext');

  const key = base64ToBytes(API_ENCRYPTION_KEY, 'encryption key');

  // Validate AES-256-GCM lengths.
  if (key.length !== 32) {
    throw new Error('AES-256 key must contain exactly 32 bytes.');
  }

  if (nonce.length !== 12) {
    throw new Error('AES-GCM nonce must contain exactly 12 bytes.');
  }

  if (tag.length !== 16) {
    throw new Error('AES-GCM tag must contain exactly 16 bytes.');
  }

  // Import key.
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    toArrayBuffer(key),
    { name: 'AES-GCM' },
    false,
    ['decrypt'],
  );

  // Web Crypto expects ciphertext followed by the authentication tag.
  const encryptedBytes = new Uint8Array(ciphertext.length + tag.length);

  encryptedBytes.set(ciphertext);
  encryptedBytes.set(tag, ciphertext.length);

  // Decrypt.
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: toArrayBuffer(nonce),
      tagLength: 128,
    },
    cryptoKey,
    toArrayBuffer(encryptedBytes),
  );

  const decryptedText = new TextDecoder().decode(decryptedBuffer);

  return JSON.parse(decryptedText);
};

// -----------------------------------------------------------------------------
// Base Query With Decryption
// -----------------------------------------------------------------------------

const baseQueryWithDecryption: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error || result.data == null) {
    return result;
  }

  if (typeof result.data !== 'object' || !('response' in result.data)) {
    return result;
  }

  try {
    const encryptedResponse = (result.data as EncryptedResponseWrapper).response;

    result.data = await decryptResponse(encryptedResponse);

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown API decryption error.';

    console.error('API response decryption failed:', error);

    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: message,
      },
    };
  }
};

// -----------------------------------------------------------------------------
// API Slice
// -----------------------------------------------------------------------------

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithDecryption,
  tagTypes: [
    'CaseStudies',
    'NewsBlogs',
    'Faqs',
    'AboutUs',
    'Cookies',
  ],
  endpoints: () => ({}),
});
