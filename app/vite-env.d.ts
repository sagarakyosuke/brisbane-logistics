/// <reference types="vite/client" />

// CSS and Fonts
declare module '*.css';
declare module '@fontsource/*' {}

// Vite Environment Variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
