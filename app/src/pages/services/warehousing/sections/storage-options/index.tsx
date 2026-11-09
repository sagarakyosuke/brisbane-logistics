import { useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, ExpandMore } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import {
  quotePanelItems,
  relatedServices,
  storageOptions,
} from '@/utilities/_mock/services/storage-options/storage-options';
import { palette } from '@/utilities/themes';

//  Import the modals and providers
import { useQuotationModal } from '@/reusables/quotation/use-quotation';
import { useBookACallModal } from '@/reusables/book-a-call/use-book-a-call';
import { QuotationProvider } from '@/reusables/quotation';
import { BookACallProvider } from '@/reusables/book-a-call';

/* =====================================================================
 * Constants
 * ===================================================================== */

const STICKY_TOP = '100px';
const DEFAULT_OPEN_ID = 'long-term';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.6fr 1fr' },
  gap: { xs: 6, lg: 8 },
  alignItems: 'start',
};

const STICKY_COLUMN_SX: SxProps<Theme> = {
  alignSelf: 'start',
  position: 'sticky',
  top: STICKY_TOP,
};

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: 'var(--navy)',
  lineHeight: 1.1,
  mb: 2,
};

const LEAD_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '1.1rem',
  mb: 5,
  maxWidth: '600px',
};

const ACCORDIONS_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const accordionCardSx = (isOpen: boolean): SxProps<Theme> => ({
  border: '1px solid',
  borderColor: isOpen ? 'var(--orange)' : 'var(--line)',
  borderRadius: '16px',
  bgcolor: isOpen ? 'rgba(245, 130, 32, 0.03)' : 'var(--white)',
  p: { xs: 3, md: 4 },
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
  '&:hover': {
    borderColor: 'var(--orange)',
    transform: 'translateY(-3px)',
    boxShadow: 'var(--shadow-sm)',
  },
});

const ACCORDION_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  alignItems: 'flex-start',
};

const accordionIconBoxSx = (isOpen: boolean): SxProps<Theme> => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  bgcolor: isOpen ? 'var(--orange)' : 'var(--peach)',
  color: isOpen ? 'var(--white)' : 'var(--orange)',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  transition: 'all 0.3s ease',
});

const ACCORDION_ICON_SX = { fontSize: 24 } as const;
const ACCORDION_TEXT_SX: SxProps<Theme> = { flexGrow: 1 };

const ACCORDION_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: 'var(--navy)',
  mb: 0.5,
};

const ACCORDION_SHORT_DESC_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '0.95rem',
  lineHeight: 1.5,
};

const accordionChevronSx = (isOpen: boolean): SxProps<Theme> => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  bgcolor: isOpen ? 'var(--orange)' : 'var(--peach)',
  color: isOpen ? 'var(--white)' : 'var(--orange)',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  transition: 'all 0.3s',
  transform: isOpen ? 'rotate(180deg)' : 'none',
});

const CHEVRON_ICON_SX = { fontSize: 20 } as const;

const accordionExpanderSx = (isOpen: boolean): SxProps<Theme> => ({
  display: 'grid',
  gridTemplateRows: isOpen ? '1fr' : '0fr',
  transition: 'grid-template-rows 0.3s ease',
});

const EXPANDER_INNER_SX: SxProps<Theme> = { overflow: 'hidden' };

const accordionFullDescSx = (isOpen: boolean): SxProps<Theme> => ({
  mt: 3,
  pt: 3,
  borderTop: '1px dashed',
  borderColor: isOpen ? 'rgba(245, 130, 32, 0.3)' : 'var(--line)',
  color: 'var(--muted)',
  fontSize: '0.95rem',
  lineHeight: 1.6,
});

const RELATED_BLOCK_SX: SxProps<Theme> = {
  mt: 4,
  bgcolor: 'var(--peach)',
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
};

const RELATED_TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.1rem',
  color: 'var(--navy)',
  mb: 1,
};

const RELATED_DESC_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '0.9rem',
  mb: 3,
};

const RELATED_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 3,
};

const RELATED_ITEM_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: 'var(--navy)',
  cursor: 'pointer',
  transition: 'color 0.2s',
  '&:hover': { color: 'var(--orange)' },
};

const RELATED_ICON_SX: SxProps<Theme> = { fontSize: 18, color: 'var(--orange)' };

const QUOTE_PANEL_SX: SxProps<Theme> = {
  bgcolor: palette.navy,
  color: palette.white,
  borderRadius: '22px',
  p: { xs: 4, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const QUOTE_EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };
const QUOTE_TITLE_SX: SxProps<Theme> = { fontWeight: 800, mb: 1.5, lineHeight: 1.2 };
const QUOTE_LEAD_SX: SxProps<Theme> = { color: '#d4d8f3', fontSize: '0.95rem' };
const QUOTE_ITEMS_LIST_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'column' };

const quoteItemRowSx = (isFirst: boolean): SxProps<Theme> => ({
  display: 'flex',
  gap: 2,
  alignItems: 'center',
  py: 2.5,
  borderTop: isFirst ? '1px solid rgba(255,255,255,0.1)' : 'none',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
});

const QUOTE_ITEM_ICON_BOX_SX: SxProps<Theme> = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  bgcolor: 'rgba(255,255,255,0.1)',
  display: 'grid',
  placeItems: 'center',
  color: palette.orange,
  flexShrink: 0,
};

const QUOTE_ITEM_ICON_SX = { fontSize: 22 } as const;
const QUOTE_ITEM_TITLE_SX: SxProps<Theme> = { fontWeight: 700, fontSize: '0.95rem' };
const QUOTE_ITEM_DESC_SX: SxProps<Theme> = { color: '#c3c8ea', fontSize: '0.85rem' };

const QUOTE_ACTIONS_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  mt: 1,
};

const QUOTE_CTA_SX: SxProps<Theme> = { py: 1.5 };

const QUOTE_SECONDARY_CTA_SX: SxProps<Theme> = {
  py: 1.5,
  border: '1px solid rgba(255,255,255,0.3)',
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const StickyQuotePanel = () => {
  const { openQuotation } = useQuotationModal();
  const { openBookACall } = useBookACallModal();

  return (
    <Box sx={QUOTE_PANEL_SX}>
      <Box>
        <Box sx={QUOTE_EYEBROW_WRAPPER_SX}>
          <SectionEyebrow>Get a Quote</SectionEyebrow>
        </Box>
        <Typography variant="h4" sx={QUOTE_TITLE_SX}>
          Tell us about your storage needs.
        </Typography>
        <Typography sx={QUOTE_LEAD_SX}>
          Share a few details about your products and timeframes so we can recommend the right
          solution.
        </Typography>
      </Box>

      <Box sx={QUOTE_ITEMS_LIST_SX}>
        {quotePanelItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <Box key={item.title} sx={quoteItemRowSx(i === 0)}>
              <Box sx={QUOTE_ITEM_ICON_BOX_SX}>
                <Icon sx={QUOTE_ITEM_ICON_SX} />
              </Box>
              <Box>
                <Typography sx={QUOTE_ITEM_TITLE_SX}>{item.title}</Typography>
                <Typography sx={QUOTE_ITEM_DESC_SX}>{item.desc}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={QUOTE_ACTIONS_SX}>
        <AppButton
          color="primary"
          size="large"
          endIcon={<ArrowForward />}
          fullWidth
          sx={QUOTE_CTA_SX}
          onClick={() => openQuotation('Warehousing')}
        >
          Get a Warehousing Quote
        </AppButton>
        <AppButton
          color="ghostLight"
          size="large"
          fullWidth
          sx={QUOTE_SECONDARY_CTA_SX}
          onClick={openBookACall}
        >
          Book a Call
        </AppButton>
      </Box>
    </Box>
  );
};

const AccordionCard = ({
  option,
  isOpen,
  onToggle,
}: {
  option: (typeof storageOptions)[number];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const Icon = option.icon;

  return (
    <Box onClick={onToggle} sx={accordionCardSx(isOpen)}>
      <Box sx={ACCORDION_ROW_SX}>
        <Box sx={accordionIconBoxSx(isOpen)}>
          <Icon sx={ACCORDION_ICON_SX} />
        </Box>
        <Box sx={ACCORDION_TEXT_SX}>
          <Typography component="h3" sx={ACCORDION_TITLE_SX}>
            {option.title}
          </Typography>
          <Typography sx={ACCORDION_SHORT_DESC_SX}>{option.shortDesc}</Typography>
        </Box>
        <Box sx={accordionChevronSx(isOpen)}>
          <ExpandMore sx={CHEVRON_ICON_SX} />
        </Box>
      </Box>

      <Box sx={accordionExpanderSx(isOpen)}>
        <Box sx={EXPANDER_INNER_SX}>
          <Typography sx={accordionFullDescSx(isOpen)}>{option.fullDesc}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

/* =====================================================================
 * Content
 * ===================================================================== */

const StorageOptionsContent = () => {
  const [openId, setOpenId] = useState<string | null>(DEFAULT_OPEN_ID);

  return (
    <Section delay={100}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          <Box>
            <Box sx={EYEBROW_WRAPPER_SX}>
              <SectionEyebrow>Storage Options</SectionEyebrow>
            </Box>
            <Typography component="h2" sx={TITLE_SX}>
              Flexible warehousing for different business needs.
            </Typography>
            <Typography sx={LEAD_SX}>
              Choose the storage solution that best fits your products, timeframes and distribution
              plans. Tap an option to learn more.
            </Typography>

            <Box sx={ACCORDIONS_COLUMN_SX}>
              {storageOptions.map((option) => {
                const isOpen = openId === option.id;
                return (
                  <AccordionCard
                    key={option.id}
                    option={option}
                    isOpen={isOpen}
                    onToggle={() => setOpenId(isOpen ? null : option.id)}
                  />
                );
              })}
            </Box>

            <Box sx={RELATED_BLOCK_SX}>
              <Typography sx={RELATED_TITLE_SX}>Related support services</Typography>
              <Typography sx={RELATED_DESC_SX}>
                Combine warehousing with other services to create a complete supply chain solution.
              </Typography>
              <Box sx={RELATED_ROW_SX}>
                {relatedServices.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <Box key={svc.title} sx={RELATED_ITEM_SX}>
                      <Icon sx={RELATED_ICON_SX} />
                      {svc.title}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          <Box sx={STICKY_COLUMN_SX}>
            <StickyQuotePanel />
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};

/* =====================================================================
 * StorageOptionsSection (Export)
 * ===================================================================== */

export const StorageOptionsSection = () => (
  <QuotationProvider>
    <BookACallProvider>
      <StorageOptionsContent />
    </BookACallProvider>
  </QuotationProvider>
);