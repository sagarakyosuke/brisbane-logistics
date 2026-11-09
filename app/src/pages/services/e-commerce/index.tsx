// src/pages/services/e-commerce/index.tsx

import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, LaptopMac, Inventory2, BarChart } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { eCommerceHeroData } from '@/utilities/_mock/services/e-commerce/hero';
import { ECommerceHeroSection } from '@/pages/services/e-commerce/sections/hero';
import { ReceiveStoreSection } from '@/pages/services/e-commerce/sections/received-store';
import { IntegrationsSection } from '@/pages/services/e-commerce/sections/integrations';

/* =====================================================================
 * Constants
 * ===================================================================== */

const CTA_CARDS = [
  {
    id: 'platform',
    title: 'Your platform',
    desc: 'E.g. Shopify, WooCommerce or Maropost Commerce Cloud',
    icon: LaptopMac,
  },
  {
    id: 'products',
    title: 'Product types',
    desc: 'Size, weight or special handling needs',
    icon: Inventory2,
  },
  {
    id: 'volumes',
    title: 'Order volumes',
    desc: 'Average orders per day or peak periods',
    icon: BarChart,
  },
];

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── CTA Section ──────────────────────────────────────────────────── */

// The card itself is white, so it pops against the alternating Section background
const CTA_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '16px',
  p: { xs: 4, md: 6 },
  maxWidth: 1000,
  mx: 'auto',
};

const CTA_TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mb: 2,
};

const CTA_DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.05rem',
  color: palette.muted,
  lineHeight: 1.6,
  mb: 4,
  maxWidth: '60ch',
};

const CTA_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: 3,
  mb: 5,
};

const CTA_ITEM_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  p: 3,
  border: `1px solid ${palette.line}`,
  borderRadius: '12px',
  bgcolor: palette.white,
};

const CTA_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 48,
  height: 48,
  borderRadius: '12px',
  bgcolor: palette.peach,
  color: palette.orange,
  flexShrink: 0,
};

const CTA_ACTIONS_SX: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 2,
  alignItems: 'center',
};

/* =====================================================================
 * Page
 * ===================================================================== */

const ECommercePage = () => (
  <Box component="main">
    {/* 1. Hero */}
    <ECommerceHeroSection data={eCommerceHeroData} />

    {/* 2. Receive & Store */}
    <ReceiveStoreSection />

    {/* 3. Integrations */}
    <IntegrationsSection />

    {/* 4. CTA Section */}
    <Section delay={100}>
      <SectionWrap>
        <Box sx={CTA_CARD_SX}>
          <Box sx={{ mb: 1 }}>
            <SectionEyebrow>Get a Quote</SectionEyebrow>
          </Box>

          <Typography component="h2" sx={CTA_TITLE_SX}>
            Tell us about your online orders.
          </Typography>

          <Typography sx={CTA_DESCRIPTION_SX}>
            Share a few details so we can recommend the right fulfilment arrangement for your
            business.
          </Typography>

          <Box sx={CTA_GRID_SX}>
            {CTA_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Box key={card.id} sx={CTA_ITEM_SX}>
                  <Box sx={CTA_ICON_BOX_SX}>
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontWeight: 700, fontSize: '1rem', color: palette.navy, mb: 0.5 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: palette.muted, lineHeight: 1.4 }}>
                      {card.desc}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={CTA_ACTIONS_SX}>
            <AppButton color="primary" size="large" endIcon={<ArrowForward />}>
              Get an E-Commerce Quote
            </AppButton>
            <AppButton color="outline" size="large">
              Book a Call
            </AppButton>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  </Box>
);

export default ECommercePage;
