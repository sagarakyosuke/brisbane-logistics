export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface CookieConsent {
  preferences: CookiePreferences;
  consentedAt: string | null;
  expiresAt: string | null;
}

export interface CookieConsentResponse {
  hasConsent: boolean;
  consent: CookieConsent | null;
}

export interface SaveCookiePreferencesRequest {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface SaveCookiePreferencesResponse {
  message?: string;
  hasConsent: boolean;
  consent: CookieConsent;
}

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};