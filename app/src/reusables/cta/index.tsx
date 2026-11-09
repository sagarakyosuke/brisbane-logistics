import type { ReactNode } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, CalendarMonth, LocationOn, Scale } from '@mui/icons-material';
import { useLocation } from 'react-router';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { AppButton } from '@/components/buttons';

import { useQuotationModal } from '@/reusables/quotation/use-quotation';
import { useBookACallModal } from '@/reusables/book-a-call/use-book-a-call';
import { QuotationProvider } from '@/reusables/quotation';
import { BookACallProvider } from '@/reusables/book-a-call';

import { CtaContext, DEFAULT_CONTEXT, useCtaContext, type CtaContextValue } from './use-cta';

/* =====================================================================
 * Constants
 * ===================================================================== */

const TRANSPORT_FEATURES = [
  { id: 'freight', title: 'Freight size & weight', description: 'Individual items or trailer loads', icon: Scale },
  { id: 'pickup', title: 'Pickup & delivery', description: 'Suburbs, state or international', icon: LocationOn },
  { id: 'timeframe', title: 'Required timeframe', description: 'Standard or urgent delivery', icon: CalendarMonth },
];

/* =====================================================================
 * Helpers
 * ===================================================================== */

interface CtaCopy {
  title: string;
  subtitle: string;
}

const getCtaContent = (pathname: string, defaultTitle: string, defaultSubtitle: string): CtaCopy => {
  if (pathname === '/about/our-story') return { title: "Let's talk about your 3PL needs.", subtitle: "Tell us about your goals and we'll tailor a solution with Brisbane Logistics services." };
  if (pathname === '/about/team') return { title: 'Ready to work together?', subtitle: 'Talk to our team about your warehousing and 3PL requirements.' };
  if (pathname.includes('/about')) return { title: "Let's find the right solution for your business.", subtitle: 'Talk to our team about your warehousing, logistics and delivery requirements.' };
  if (pathname.includes('/faqs')) return { title: 'Still have a question?', subtitle: 'Talk to our Brisbane team about your storage, fulfilment or delivery needs.' };
  if (pathname.includes('how-it-works')) return { title: "Let's plan the support you need.", subtitle: 'Tell us about your goods, current arrangements and the next step in your supply chain.' };
  if (pathname.includes('integration-partners')) return { title: 'Get a 3PL quote.', subtitle: "Tell us about your stock, systems and delivery requirements. We'll work with you to design the right arrangement." };
  if (pathname.includes('/services/cross-docking')) return { title: 'Plan your next freight transfer.', subtitle: 'Talk to our team about your inbound and outbound requirements.' };
  if (pathname.includes('/services/transport')) return { title: 'What are you moving?', subtitle: 'Give us a few details so we can recommend the right freight solution.' };
  if (pathname.includes('/services/warehousing')) return { title: 'Not sure if warehousing is right for you?', subtitle: 'Tell us about your products, stock volumes and distribution plans.' };
  if (pathname.includes('/services/container-handling')) return { title: 'Tell us about your container load.', subtitle: 'Container details, product types and the onward handling you need.' };
  if (pathname.startsWith('/services')) return { title: 'Not sure which service fits?', subtitle: 'Tell us about your products, stock volumes and delivery requirements.' };
  if (pathname.includes('/case-studies/urgent-delivery')) return { title: 'Need a time-critical delivery?', subtitle: 'Tell us about your freight, collection point, destination and required delivery time.' };
  if (pathname.includes('/case-studies/testimonials')) return { title: "Let's talk about your logistics.", subtitle: 'Tell us what you need from your logistics partner.' };
  if (pathname.includes('/case-studies')) return { title: 'Have a logistics challenge?', subtitle: 'Tell us about your freight, handling needs and required timeframe.' };
  if (pathname === '/news/guides') return { title: 'Need advice for your own requirements?', subtitle: 'Talk to us about your stock, systems and delivery requirements.' };
  if (pathname === '/news') return { title: "Let's talk about your logistics.", subtitle: 'Tell us about your products, stock volumes and delivery requirements.' };
  if (pathname.includes('/news/company')) return { title: 'Have a question about your logistics?', subtitle: 'Talk to us about your stock, systems and delivery requirements.' };
  return { title: defaultTitle, subtitle: defaultSubtitle };
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const SECTION_SX: SxProps<Theme> = { position: 'relative', overflow: 'hidden', paddingBlock: { xs: '64px !important', md: '80px !important' } };
const CTA_BAND_OVERRIDE_SX: SxProps<Theme> = { px: 3.5, py: 1.5 };

// ── Transport layout ──
const TRANSPORT_GRID_SX: SxProps<Theme> = { display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' }, gap: { xs: 6, lg: 8 }, alignItems: 'center', position: 'relative', zIndex: 1 };
const TRANSPORT_EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };
const TRANSPORT_TITLE_SX: SxProps<Theme> = { fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, mb: 2, color: 'var(--white)' };
const TRANSPORT_SUBTITLE_SX: SxProps<Theme> = { color: '#d4d8f3', fontSize: '1.15rem', mb: 6, maxWidth: '500px' };
const TRANSPORT_FEATURES_GRID_SX: SxProps<Theme> = { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 4, sm: 3 } };
const TRANSPORT_FEATURE_ICON_BOX_SX: SxProps<Theme> = { width: 48, height: 48, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.08)', color: 'var(--orange)', display: 'grid', placeItems: 'center', mb: 2 };
const TRANSPORT_FEATURE_ICON_SX = { fontSize: 24 } as const;
const TRANSPORT_FEATURE_TITLE_SX: SxProps<Theme> = { fontWeight: 700, fontSize: '1rem', color: 'var(--white)', mb: 0.5 };
const TRANSPORT_FEATURE_DESC_SX: SxProps<Theme> = { color: '#c3c8ea', fontSize: '0.85rem', lineHeight: 1.4 };
const TRANSPORT_ACTIONS_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' };
const TRANSPORT_PRIMARY_CTA_SX: SxProps<Theme> = { px: 4, py: 1.5, width: { xs: '100%', sm: 'auto' } };
const TRANSPORT_SECONDARY_CTA_SX: SxProps<Theme> = { display: 'inline-flex', alignItems: 'center', gap: 1, color: 'var(--white)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', border: 'none', bgcolor: 'transparent', p: 0, cursor: 'pointer', borderBottom: '2px solid var(--orange)', pb: 0.5, transition: 'color 0.2s', '&:hover': { color: 'var(--orange)' }, '&:hover .arrow': { transform: 'translateX(4px)' } };
const TRANSPORT_SECONDARY_ARROW_SX: SxProps<Theme> = { fontSize: 16, transition: 'transform 0.2s' };

// ── Default layout ──
const STRIPES_WRAPPER_SX: SxProps<Theme> = { position: 'absolute', right: '-40px', top: 0, bottom: 0, width: 340, opacity: 0.12, pointerEvents: 'none', '@keyframes drift': { '0%': { transform: 'skewX(-12deg) translateX(0)' }, '100%': { transform: 'skewX(-12deg) translateX(-30px)' } } };
const stripeSx = (left: number, bgcolor: string, delay: string): SxProps<Theme> => ({ position: 'absolute', top: '-20%', bottom: '-20%', left, width: 56, bgcolor, transform: 'skewX(-12deg)', animation: 'drift 9s ease-in-out infinite alternate', animationDelay: delay });
const DEFAULT_ROW_SX: SxProps<Theme> = { display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 4, position: 'relative', zIndex: 1 };
const DEFAULT_TEXT_COLUMN_SX: SxProps<Theme> = { pr: { md: 4 } };
const DEFAULT_TITLE_SX: SxProps<Theme> = { fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, mb: 1, color: 'var(--white)' };
const DEFAULT_SUBTITLE_SX: SxProps<Theme> = { color: '#d4d8f3', fontSize: '1.05rem', maxWidth: '600px' };
const DEFAULT_ACTIONS_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 2, flexShrink: 0 };

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const BackgroundStripes = () => (
  <Box aria-hidden sx={STRIPES_WRAPPER_SX}>
    <Box sx={stripeSx(0, 'var(--white)', '0s')} />
    <Box sx={stripeSx(80, 'var(--white)', '-3s')} />
    <Box sx={stripeSx(160, 'var(--orange)', '-6s')} />
  </Box>
);

interface CtaProviderProps extends Partial<CtaContextValue> {
  children: ReactNode;
}

export const CtaProvider = ({ title = DEFAULT_CONTEXT.title, subtitle = DEFAULT_CONTEXT.subtitle, children }: CtaProviderProps) => (
  <CtaContext.Provider value={{ title, subtitle }}>{children}</CtaContext.Provider>
);

/* =====================================================================
 * Layout Components
 * ===================================================================== */

const TransportCta = ({ title, subtitle }: CtaCopy) => {
  const { openQuotation } = useQuotationModal();
  const { openBookACall } = useBookACallModal();

  return (
    <Section tone="navy" skipAlternate sx={SECTION_SX}>
      <SectionWrap>
        <Box sx={TRANSPORT_GRID_SX}>
          <Box>
            <Box sx={TRANSPORT_EYEBROW_WRAPPER_SX}>
              <SectionEyebrow>Enquire Now</SectionEyebrow>
            </Box>
            <Typography component="h2" sx={TRANSPORT_TITLE_SX}>{title}</Typography>
            <Typography sx={TRANSPORT_SUBTITLE_SX}>{subtitle}</Typography>
            <Box sx={TRANSPORT_FEATURES_GRID_SX}>
              {TRANSPORT_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Box key={feature.id}>
                    <Box sx={TRANSPORT_FEATURE_ICON_BOX_SX}><Icon sx={TRANSPORT_FEATURE_ICON_SX} /></Box>
                    <Typography sx={TRANSPORT_FEATURE_TITLE_SX}>{feature.title}</Typography>
                    <Typography sx={TRANSPORT_FEATURE_DESC_SX}>{feature.description}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box sx={TRANSPORT_ACTIONS_SX}>
            <AppButton
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              sx={TRANSPORT_PRIMARY_CTA_SX}
              onClick={() => openQuotation('Transport & Distribution')}
            >
              Get a Transport Quote
            </AppButton>

            <Box component="button" type="button" onClick={openBookACall} sx={TRANSPORT_SECONDARY_CTA_SX}>
              Or book a call to discuss your requirements
              <ArrowForward className="arrow" sx={TRANSPORT_SECONDARY_ARROW_SX} />
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};

/* =====================================================================
 * CtaBand Content (Inner)
 * ===================================================================== */

const CtaBandContent = () => {
  const { title, subtitle } = useCtaContext();
  const { pathname } = useLocation();
  const { openQuotation } = useQuotationModal();
  const { openBookACall } = useBookACallModal();

  const copy = getCtaContent(pathname, title, subtitle);

  if (pathname.includes('/services/transport')) {
    return <TransportCta {...copy} />;
  }

  return (
    <Section tone="navy" skipAlternate sx={SECTION_SX}>
      <BackgroundStripes />
      <SectionWrap>
        <Box sx={DEFAULT_ROW_SX}>
          <Box sx={DEFAULT_TEXT_COLUMN_SX}>
            <Typography component="h2" sx={DEFAULT_TITLE_SX}>{copy.title}</Typography>
            <Typography sx={DEFAULT_SUBTITLE_SX}>{copy.subtitle}</Typography>
          </Box>
          <Box sx={DEFAULT_ACTIONS_SX}>
            <AppButton
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              sx={CTA_BAND_OVERRIDE_SX}
              onClick={() => openQuotation()}
            >
              Get a 3PL Quote
            </AppButton>
            <AppButton
              color="ghostLight"
              size="large"
              sx={CTA_BAND_OVERRIDE_SX}
              onClick={openBookACall}
            >
              Book a Call
            </AppButton>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};

/* =====================================================================
 * CtaBand Export (Wrapped)
 * ===================================================================== */

export const CtaBand = () => (
  <QuotationProvider>
    <BookACallProvider>
      <CtaBandContent />
    </BookACallProvider>
  </QuotationProvider>
);