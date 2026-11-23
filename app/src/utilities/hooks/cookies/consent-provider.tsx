
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';

import {
  useGetCookieConsentQuery,
  useSaveCookieConsentMutation,
  useUpdateCookieConsentMutation,
  useWithdrawCookieConsentMutation,
} from './api-hook';

import {
  DEFAULT_COOKIE_PREFERENCES,
  type CookiePreferences,
  type SaveCookiePreferencesRequest,
} from './types';

// ============================================================================
// Types
// ============================================================================

interface CookieConsentContextValue {
  preferences: CookiePreferences;
  hasConsent: boolean;
  isReady: boolean;
  isSaving: boolean;
  openPreferences: () => void;
  acceptAll: () => Promise<void>;
  rejectOptional: () => Promise<void>;
  savePreferences: (preferences: CookiePreferences) => Promise<void>;
  revokeConsent: () => Promise<void>;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

interface GoogleAnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: string]: unknown;
}

interface MetaPixelFunction {
  (...args: unknown[]): void;
  queue?: unknown[][];
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
}

interface MetaPixelWindow extends Window {
  fbq?: MetaPixelFunction;
}

// ============================================================================
// Context
// ============================================================================

const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

// ============================================================================
// Helpers
// ============================================================================

const toRequest = (
  preferences: CookiePreferences,
): SaveCookiePreferencesRequest => ({
  analytics: preferences.analytics,
  marketing: preferences.marketing,
  functional: preferences.functional,
});

// ============================================================================
// Provider
// ============================================================================

export const CookieConsentProvider = ({
  children,
}: CookieConsentProviderProps) => {
  const {
    data,
    isSuccess,
    isError,
  } = useGetCookieConsentQuery();

  const [saveConsent, { isLoading: isSavingNew }] =
    useSaveCookieConsentMutation();

  const [updateConsent, { isLoading: isUpdating }] =
    useUpdateCookieConsentMutation();

  const [withdrawConsent, { isLoading: isWithdrawing }] =
    useWithdrawCookieConsentMutation();

  // ========================================================================
  // Local consent state
  // ========================================================================

  // RTK Query provides the initial consent.
  // Local state takes priority after a successful user action.

  const [localPreferences, setLocalPreferences] =
    useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);

  const [localHasConsent, setLocalHasConsent] = useState(false);

  const [hasLocalUpdate, setHasLocalUpdate] = useState(false);

  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const [draftPreferences, setDraftPreferences] =
    useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isReady = isSuccess || isError;

  const isSaving = isSavingNew || isUpdating || isWithdrawing;

  // Derive consent directly from RTK Query instead of synchronizing it
  // through useEffect and triggering additional renders.

  const preferences = hasLocalUpdate
    ? localPreferences
    : data?.consent?.preferences ?? DEFAULT_COOKIE_PREFERENCES;

  const hasConsent = hasLocalUpdate
    ? localHasConsent
    : data?.hasConsent ?? false;

  // ========================================================================
  // Save preferences
  // ========================================================================

  const savePreferences = useCallback(
    async (nextPreferences: CookiePreferences) => {
      setErrorMessage(null);

      const normalizedPreferences: CookiePreferences = {
        ...nextPreferences,
        necessary: true,
      };

      try {
        const request = toRequest(normalizedPreferences);

        const response = hasConsent
          ? await updateConsent(request).unwrap()
          : await saveConsent(request).unwrap();

        setLocalPreferences(response.consent.preferences);
        setLocalHasConsent(response.hasConsent);
        setHasLocalUpdate(true);

        setDraftPreferences(response.consent.preferences);
        setPreferencesOpen(false);
      } catch (error) {
        console.error('Unable to save cookie preferences:', error);

        setErrorMessage(
          'We could not save your cookie preferences. Please try again.',
        );

        throw error;
      }
    },
    [hasConsent, saveConsent, updateConsent],
  );

  // ========================================================================
  // Accept all
  // ========================================================================

  const acceptAll = useCallback(async () => {
    await savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  }, [savePreferences]);

  // ========================================================================
  // Reject optional
  // ========================================================================

  const rejectOptional = useCallback(async () => {
    await savePreferences(DEFAULT_COOKIE_PREFERENCES);
  }, [savePreferences]);

  // ========================================================================
  // Withdraw consent
  // ========================================================================

  const revokeConsent = useCallback(async () => {
    setErrorMessage(null);

    try {
      const response = await withdrawConsent().unwrap();

      setLocalPreferences(response.consent.preferences);
      setLocalHasConsent(response.hasConsent);
      setHasLocalUpdate(true);

      setDraftPreferences(response.consent.preferences);
      setPreferencesOpen(false);
    } catch (error) {
      console.error('Unable to withdraw cookie consent:', error);

      setErrorMessage(
        'We could not withdraw your consent. Please try again.',
      );

      throw error;
    }
  }, [withdrawConsent]);

  // ========================================================================
  // Open preferences
  // ========================================================================

  const openPreferences = useCallback(() => {
    setDraftPreferences(preferences);
    setErrorMessage(null);
    setPreferencesOpen(true);
  }, [preferences]);

  const closePreferences = () => {
    setDraftPreferences(preferences);
    setErrorMessage(null);
    setPreferencesOpen(false);
  };

  // ========================================================================
  // Optional tracking scripts
  // ========================================================================

  useEffect(() => {
    // Do not initialize optional tracking until consent has been retrieved.
    if (!isSuccess) return;

    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as
      | string
      | undefined;

    const metaPixelId = import.meta.env.VITE_META_PIXEL_ID as
      | string
      | undefined;

    const analyticsAllowed = preferences.analytics;
    const marketingAllowed = preferences.marketing;

    // ----------------------------------------------------------------------
    // Google Analytics
    // ----------------------------------------------------------------------

    if (gaId) {
      const gaWindow = window as unknown as GoogleAnalyticsWindow;

      gaWindow[`ga-disable-${gaId}`] = !analyticsAllowed;

      if (analyticsAllowed) {
        if (!document.getElementById('brisbane-google-analytics')) {
          const script = document.createElement('script');

          script.id = 'brisbane-google-analytics';
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;

          document.head.appendChild(script);
        }

        gaWindow.dataLayer = gaWindow.dataLayer || [];

        gaWindow.gtag =
          gaWindow.gtag ||
          function (...args: unknown[]) {
            gaWindow.dataLayer?.push(args);
          };

        gaWindow.gtag('js', new Date());

        gaWindow.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });

        gaWindow.gtag('config', gaId);
      } else if (gaWindow.gtag) {
        gaWindow.gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    }

    // ----------------------------------------------------------------------
    // Meta Pixel
    // ----------------------------------------------------------------------

    if (metaPixelId) {
      const metaWindow = window as MetaPixelWindow;

      if (marketingAllowed) {
        if (!metaWindow.fbq) {
          const fbq: MetaPixelFunction = (...args: unknown[]) => {
            if (fbq.callMethod) {
              fbq.callMethod(...args);
            } else {
              fbq.queue?.push(args);
            }
          };

          fbq.queue = [];
          fbq.loaded = true;
          fbq.version = '2.0';

          metaWindow.fbq = fbq;

          if (!document.getElementById('brisbane-meta-pixel')) {
            const script = document.createElement('script');

            script.id = 'brisbane-meta-pixel';
            script.async = true;
            script.src = 'https://connect.facebook.net/en_US/fbevents.js';

            document.head.appendChild(script);
          }
        }

        metaWindow.fbq('consent', 'grant');
        metaWindow.fbq('init', metaPixelId);
        metaWindow.fbq('track', 'PageView');
      } else if (metaWindow.fbq) {
        metaWindow.fbq('consent', 'revoke');
      }
    }

    // ----------------------------------------------------------------------
    // Notify other application features
    // ----------------------------------------------------------------------

    window.dispatchEvent(
      new CustomEvent('brisbane:cookie-consent-change', {
        detail: preferences,
      }),
    );
  }, [isSuccess, preferences]);

  // ========================================================================
  // Context value
  // ========================================================================

  const contextValue = useMemo<CookieConsentContextValue>(
    () => ({
      preferences,
      hasConsent,
      isReady,
      isSaving,
      openPreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      revokeConsent,
    }),
    [
      preferences,
      hasConsent,
      isReady,
      isSaving,
      openPreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      revokeConsent,
    ],
  );

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}

      {/* Cookie consent banner */}

      {isReady && !hasConsent && (
        <Box
          role="dialog"
          aria-label="Cookie consent"
          sx={{
            position: 'fixed',
            zIndex: 1400,
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 2, md: 3 },
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.10)',
          }}
        >
          <Box
            sx={{
              maxWidth: 1180,
              mx: 'auto',
              display: 'flex',
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
              gap: 3,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Your privacy matters
              </Typography>

              <Typography variant="body2" color="text.secondary">
                We use necessary cookies to make this website work.
                With your permission, we also use optional cookies to
                improve your experience, understand website usage, and
                support our marketing activities.
              </Typography>

              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                onClick={openPreferences}
                disabled={isSaving}
              >
                Customize
              </Button>

              <Button
                variant="outlined"
                onClick={() =>
                  void rejectOptional().catch(() => undefined)
                }
                disabled={isSaving}
              >
                Reject optional
              </Button>

              <Button
                variant="contained"
                onClick={() =>
                  void acceptAll().catch(() => undefined)
                }
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Accept all'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Cookie preferences dialog */}

      <Dialog
        open={preferencesOpen}
        onClose={closePreferences}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Cookie preferences</DialogTitle>

        <DialogContent dividers>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Choose which optional cookies you allow. Necessary cookies
            are always enabled because they are required for the website
            to function.
          </Typography>

          {/* Necessary */}

          <Box sx={{ py: 1 }}>
            <FormControlLabel
              control={<Switch checked disabled />}
              label={
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>
                    Necessary cookies
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Required for essential website functionality.
                  </Typography>
                </Box>
              }
            />
          </Box>

          {/* Functional */}

          <Box sx={{ py: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={draftPreferences.functional}
                  onChange={(event) =>
                    setDraftPreferences((current) => ({
                      ...current,
                      functional: event.target.checked,
                    }))
                  }
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>
                    Functional cookies
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Enable optional features and personalization.
                  </Typography>
                </Box>
              }
            />
          </Box>

          {/* Analytics */}

          <Box sx={{ py: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={draftPreferences.analytics}
                  onChange={(event) =>
                    setDraftPreferences((current) => ({
                      ...current,
                      analytics: event.target.checked,
                    }))
                  }
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>
                    Analytics cookies
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Help us understand how visitors use our website.
                  </Typography>
                </Box>
              }
            />
          </Box>

          {/* Marketing */}

          <Box sx={{ py: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={draftPreferences.marketing}
                  onChange={(event) =>
                    setDraftPreferences((current) => ({
                      ...current,
                      marketing: event.target.checked,
                    }))
                  }
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>
                    Marketing cookies
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Support relevant advertising and campaign measurement.
                  </Typography>
                </Box>
              }
            />
          </Box>

          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, flexWrap: 'wrap' }}>
          {hasConsent && (
            <Button
              color="error"
              disabled={isSaving}
              onClick={() =>
                void revokeConsent().catch(() => undefined)
              }
            >
              Withdraw consent
            </Button>
          )}

          <Box sx={{ flex: 1 }} />

          <Button onClick={closePreferences} disabled={isSaving}>
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={isSaving}
            onClick={() =>
              void savePreferences(draftPreferences).catch(
                () => undefined,
              )
            }
          >
            {isSaving ? 'Saving...' : 'Save preferences'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Persistent cookie settings */}

      {isReady && hasConsent && (
        <Button
          size="small"
          variant="outlined"
          onClick={openPreferences}
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: 1300,
            bgcolor: 'background.paper',
          }}
        >
          Cookie settings
        </Button>
      )}
    </CookieConsentContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

// The provider and hook intentionally remain in the same file.
// eslint-disable-next-line react-refresh/only-export-components
export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      'useCookieConsent must be used inside CookieConsentProvider.',
    );
  }

  return context;
};
