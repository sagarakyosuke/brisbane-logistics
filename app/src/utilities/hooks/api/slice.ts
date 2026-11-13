import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import CryptoJS from 'crypto-js';

const API_ENCRYPTION_KEY = 'k8J2mN9pL4xQ7vB1cR5tW3yH6zA0sDfG';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  timeout: 20000,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithDecryption: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // ✅ Check for the 'response' key (matching your middleware)
  if (result.data && typeof result.data === 'object' && 'response' in result.data) {
    try {
      const encrypted = (result.data as { response: string }).response;

      // 1. Decode the Base64 string
      const rawData = CryptoJS.enc.Base64.parse(encrypted);
      
      // 2. Convert to a raw binary string to slice the IV
      const rawStr = rawData.toString(CryptoJS.enc.Latin1);

      // 3. Extract IV (first 16 bytes) and Ciphertext (the rest)
      const iv = CryptoJS.enc.Latin1.parse(rawStr.substring(0, 16));
      const ciphertext = rawStr.substring(16);

      // 4. Parse the Key to a WordArray
      const key = CryptoJS.enc.Utf8.parse(API_ENCRYPTION_KEY);

      // 5. Decrypt
      const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // 6. Convert back to JSON
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedString) {
        console.error('Decryption returned empty string. Check your key.');
        return result;
      }

      result.data = JSON.parse(decryptedString);
    } catch (e) {
      console.error('Decryption failed:', e);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithDecryption,
  tagTypes: ['CaseStudies', 'NewsBlogs', 'Faqs', 'AboutUs'],
  endpoints: () => ({}),
});