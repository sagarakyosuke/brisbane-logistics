import { useState, useMemo, createElement, type ElementType } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  MenuItem,
  type SxProps,
  type Theme,
} from '@mui/material';
import {
  ArrowForward,
  ArrowBack,
  Close,
  Check,
  MenuBook,
  Warehouse,
  Inventory,
  SyncAlt,
  Laptop,
  LocalShipping,
  Outbox,
  ChatBubbleOutlined,
} from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { AppButton } from '@/components/buttons';
import { Modal } from '@/components/dialogs/modals';
import { palette, shadows } from '@/utilities/themes';
import {
  useGetFeaturedGuideQuery,
  type ApiQuoteServiceOption,
} from '@/pages/news-and-blogs/guides-and-tips/sections/api-hook';
import type { FeaturedGuideData } from '@/utilities/data/news-and-blogs/guides-and-tips/featured-guide';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  menu_book: MenuBook,
  warehouse: Warehouse,
  inventory: Inventory,
  sync_alt: SyncAlt,
  laptop: Laptop,
  local_shipping: LocalShipping,
  outbox: Outbox,
  chat_bubble_outline: ChatBubbleOutlined,
};

const getIcon = (key: string) => ICONS[key] || MenuBook;

const DynamicIcon = ({ iconKey, sx }: { iconKey: string; sx?: SxProps<Theme> }) => {
  return createElement(getIcon(iconKey), { sx });
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Main Layout ──────────────────────────────────────────────────── */

const LAYOUT_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
  gap: { xs: 6, md: 10 },
  alignItems: 'start',
};

const LEFT_COLUMN_SX: SxProps<Theme> = {
  position: { md: 'sticky' },
  top: { md: 120 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const ICON_BOX_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 900,
  color: palette.navy,
  lineHeight: 1.1,
  mb: 2,
  letterSpacing: '-0.02em',
};

const DESC_SX: SxProps<Theme> = {
  fontSize: '1.05rem',
  color: palette.muted,
  lineHeight: 1.6,
  mb: 4,
};

const PROGRESS_TEXT_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.95rem',
  color: palette.navy,
  mb: 2,
};

const METER_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  width: '100%',
};

const meterBarSx = (isOn: boolean): SxProps<Theme> => ({
  flex: 1,
  height: 6,
  borderRadius: 3,
  bgcolor: isOn ? palette.orange : palette.line,
  transition: 'background-color 0.3s ease',
});

const CHECKLIST_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const CHECK_ITEM_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  p: 2.5,
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: palette.navy,
  },
};

const CHECK_ITEM_ACTIVE_SX: SxProps<Theme> = {
  ...CHECK_ITEM_SX,
  borderColor: palette.orange,
  bgcolor: palette.peach,
  '&:hover': {
    borderColor: palette.orange,
  },
};

const CHECKBOX_SX: SxProps<Theme> = {
  color: palette.line,
  padding: 0,
  marginRight: 1,
  '&.Mui-checked': {
    color: palette.orange,
  },
};

const CHECK_TEXT_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 600,
  color: palette.navy,
  lineHeight: 1.5,
};

/* ── Modal Styles ─────────────────────────────────────────────────── */

const MODAL_PAPER_SX: SxProps<Theme> = {
  borderRadius: '24px',
  bgcolor: palette.white,
  overflow: 'hidden',
  p: { xs: 3, md: 5 },
  position: 'relative',
};

const CLOSE_BTN_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 16,
  right: 16,
  bgcolor: palette.mist,
  color: palette.navy,
  '&:hover': { bgcolor: palette.line },
};

const MODAL_METER_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  mb: 4,
  mr: 6,
};

const MODAL_TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  fontWeight: 800,
  color: palette.navy,
  mb: 1,
  lineHeight: 1.2,
};

const MODAL_SUBTITLE_SX: SxProps<Theme> = {
  fontSize: '1rem',
  color: palette.muted,
  mb: 4,
};

const SERVICES_GRID_SX: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1.5,
  mb: 6,
};

const serviceChipSx = (isSelected: boolean): SxProps<Theme> => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  px: 2.5,
  py: 1.5,
  borderRadius: '12px',
  border: `1.5px solid ${isSelected ? palette.navy : palette.line}`,
  bgcolor: isSelected ? palette.navy : palette.white,
  color: isSelected ? palette.white : palette.navy,
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: palette.navy,
  },
  '& svg': {
    fontSize: 18,
    color: isSelected ? palette.orange : palette.navy,
  },
});

const FIELD_SX: SxProps<Theme> = {
  display: 'grid',
  gap: 0.5,
  mb: 3,
};

const LABEL_SX: SxProps<Theme> = {
  fontSize: '0.85rem',
  fontWeight: 700,
  color: palette.navy,
};

const INPUT_SX: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    bgcolor: palette.white,
    '& fieldset': { borderColor: palette.line },
    '&:hover fieldset': { borderColor: palette.navy },
    '&.Mui-focused fieldset': { borderColor: palette.navy },
  },
};

const DONE_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 2,
  py: 4,
};

const DONE_ICON_SX: SxProps<Theme> = {
  width: 72,
  height: 72,
  borderRadius: '50%',
  bgcolor: palette.orange,
  color: palette.white,
  display: 'grid',
  placeItems: 'center',
  mb: 2,
  boxShadow: shadows.base,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const FeaturedGuideSection = () => {
  const { data } = useGetFeaturedGuideQuery();

  const guideData = useMemo(() => {
    if (!data?.guide) return null;
    return data.guide as unknown as FeaturedGuideData & {
      iconKey: string;
      modal: { services: ApiQuoteServiceOption[] };
    };
  }, [data?.guide]);

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [businessType, setBusinessType] = useState('Online store or dropshipper');
  const [stockSize, setStockSize] = useState('Under 10 pallets');
  const [startTime, setStartTime] = useState('As soon as possible');
  const [notes, setNotes] = useState('');

  useMemo(() => {
    if (guideData?.checklist) {
      setCheckedItems(new Array(guideData.checklist.length).fill(false));
    }
  }, [guideData?.checklist]);

  if (!guideData) return null;

  const { modal } = guideData;

  const total = guideData.checklist.length;
  const readyCount = checkedItems.filter(Boolean).length;

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleNext = () => setModalStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setModalStep((prev) => Math.max(prev - 1, 0));

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalStep(0);
      setSelectedServices([]);
      setBusinessType('Online store or dropshipper');
      setStockSize('Under 10 pallets');
      setStartTime('As soon as possible');
      setNotes('');
    }, 300);
  };

  /* ── Modal Views ──────────────────────────────────────────────────── */

  const renderStepOne = () => (
    <>
      <Typography component="h2" sx={MODAL_TITLE_SX}>
        {modal.title}
      </Typography>
      <Typography sx={MODAL_SUBTITLE_SX}>{modal.subtitle}</Typography>

      <Box sx={SERVICES_GRID_SX}>
        {modal.services.map((service: ApiQuoteServiceOption) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <Box
              key={service.id}
              component="button"
              type="button"
              onClick={() => toggleService(service.id)}
              sx={serviceChipSx(isSelected)}
            >
              <DynamicIcon iconKey={service.iconKey} />
              {service.label}
            </Box>
          );
        })}
      </Box>
    </>
  );

  const renderStepTwo = () => (
    <>
      <Typography component="h2" sx={MODAL_TITLE_SX}>
        Tell us about your business.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Box sx={FIELD_SX}>
          <Typography sx={LABEL_SX}>Business type</Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            sx={INPUT_SX}
          >
            <MenuItem value="Online store or dropshipper">Online store or dropshipper</MenuItem>
            <MenuItem value="Importer or wholesaler">Importer or wholesaler</MenuItem>
            <MenuItem value="Retailer">Retailer</MenuItem>
            <MenuItem value="Manufacturer">Manufacturer</MenuItem>
            <MenuItem value="Small business or sole trader">Small business or sole trader</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Box sx={FIELD_SX}>
            <Typography sx={LABEL_SX}>Approximate stock</Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={stockSize}
              onChange={(e) => setStockSize(e.target.value)}
              sx={INPUT_SX}
            >
              <MenuItem value="Under 10 pallets">Under 10 pallets</MenuItem>
              <MenuItem value="10 to 50 pallets">10 to 50 pallets</MenuItem>
              <MenuItem value="50 to 200 pallets">50 to 200 pallets</MenuItem>
              <MenuItem value="200+ pallets">200+ pallets</MenuItem>
              <MenuItem value="Not sure">Not sure</MenuItem>
            </TextField>
          </Box>

          <Box sx={FIELD_SX}>
            <Typography sx={LABEL_SX}>When do you need to start?</Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              sx={INPUT_SX}
            >
              <MenuItem value="As soon as possible">As soon as possible</MenuItem>
              <MenuItem value="Within 1 to 3 months">Within 1 to 3 months</MenuItem>
              <MenuItem value="3 months or later">3 months or later</MenuItem>
              <MenuItem value="Just exploring">Just exploring</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Box sx={FIELD_SX}>
          <Typography sx={LABEL_SX}>Anything else we should know?</Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            size="small"
            placeholder="Products, order volumes, platforms, delivery areas…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={INPUT_SX}
          />
        </Box>
      </Box>
    </>
  );

  const renderStepThree = () => (
    <>
      <Typography component="h2" sx={MODAL_TITLE_SX}>
        Where should we send your quote?
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Box sx={FIELD_SX}>
            <Typography sx={LABEL_SX}>Your name</Typography>
            <TextField fullWidth size="small" sx={INPUT_SX} />
          </Box>
          <Box sx={FIELD_SX}>
            <Typography sx={LABEL_SX}>Company</Typography>
            <TextField fullWidth size="small" sx={INPUT_SX} />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Box sx={FIELD_SX}>
            <Typography sx={LABEL_SX}>Email</Typography>
            <TextField fullWidth size="small" type="email" sx={INPUT_SX} />
          </Box>
          <Box sx={FIELD_SX}>
            <Typography sx={LABEL_SX}>Phone</Typography>
            <TextField fullWidth size="small" type="tel" sx={INPUT_SX} />
          </Box>
        </Box>
      </Box>
    </>
  );

  const renderSuccess = () => (
    <Box sx={DONE_WRAP_SX}>
      <Box sx={DONE_ICON_SX}>
        <Check fontSize="large" />
      </Box>
      <Typography component="h2" sx={MODAL_TITLE_SX}>
        Thanks, your enquiry is ready.
      </Typography>
      <Typography sx={{ color: palette.muted, maxWidth: '44ch', mb: 3 }}>
        On the live website this goes straight to sales@brisbanelogistics.com.au and our team will
        be in touch. This prototype doesn't send anything.
      </Typography>
      <AppButton color="primary" size="large" onClick={resetModal}>
        Back to the website
      </AppButton>
    </Box>
  );

  return (
    <>
      <Section tone="default" skipAlternate>
        <SectionWrap>
          <Box sx={LAYOUT_SX}>
            {/* Left Column */}
            <Box sx={LEFT_COLUMN_SX}>
              <Box sx={ICON_BOX_SX}>
                <DynamicIcon iconKey={guideData.iconKey} sx={{ fontSize: 'large' }} />
              </Box>

              <SectionEyebrow>{guideData.eyebrow}</SectionEyebrow>

              <Typography component="h2" sx={{ ...TITLE_SX, mt: 2 }}>
                {guideData.title}
              </Typography>

              <Typography sx={DESC_SX}>{guideData.desc}</Typography>

              <Typography sx={PROGRESS_TEXT_SX}>
                {readyCount} of {total} ready
              </Typography>

              <Box sx={METER_WRAP_SX}>
                {checkedItems.map((isChecked, i) => (
                  <Box key={i} sx={meterBarSx(isChecked)} />
                ))}
              </Box>
            </Box>

            {/* Right Column */}
            <Box sx={CHECKLIST_SX}>
              {guideData.checklist.map((question, index) => {
                const isChecked = checkedItems[index];
                return (
                  <Box
                    key={index}
                    onClick={() => toggleCheck(index)}
                    sx={isChecked ? CHECK_ITEM_ACTIVE_SX : CHECK_ITEM_SX}
                  >
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggleCheck(index)}
                      sx={CHECKBOX_SX}
                      disableRipple
                    />
                    <Typography sx={CHECK_TEXT_SX}>{question}</Typography>
                  </Box>
                );
              })}

              <Box sx={{ mt: 2 }}>
                <AppButton
                  color="primary"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Send these details for a quote
                </AppButton>
              </Box>
            </Box>
          </Box>
        </SectionWrap>
      </Section>

      {/* Integrated Multi-Step Modal */}
      <Modal open={isModalOpen} onClose={resetModal} size="md" hideHeader paperSx={MODAL_PAPER_SX}>
        {modalStep < 3 && (
          <IconButton onClick={resetModal} sx={CLOSE_BTN_SX}>
            <Close fontSize="small" />
          </IconButton>
        )}

        {/* Progress Meter (Hidden on success step) */}
        {modalStep < 3 && (
          <Box sx={MODAL_METER_WRAP_SX}>
            <Box sx={meterBarSx(modalStep >= 0)} />
            <Box sx={meterBarSx(modalStep >= 1)} />
            <Box sx={meterBarSx(modalStep >= 2)} />
          </Box>
        )}

        {modalStep < 3 && <SectionEyebrow>Step {modalStep + 1} of 3</SectionEyebrow>}

        <Box sx={{ mt: 2 }}>
          {modalStep === 0 && renderStepOne()}
          {modalStep === 1 && renderStepTwo()}
          {modalStep === 2 && renderStepThree()}
          {modalStep === 3 && renderSuccess()}
        </Box>

        {/* Actions (Hidden on success step) */}
        {modalStep < 3 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            {modalStep > 0 ? (
              <AppButton
                color="outline"
                size="large"
                startIcon={<ArrowBack />}
                onClick={handleBack}
              >
                Back
              </AppButton>
            ) : (
              <Box />
            )}

            <AppButton
              color="primary"
              size="large"
              endIcon={modalStep === 2 ? <Check /> : <ArrowForward />}
              onClick={handleNext}
              disabled={modalStep === 0 && selectedServices.length === 0}
            >
              {modalStep === 2 ? 'Request my quote' : 'Continue'}
            </AppButton>
          </Box>
        )}
      </Modal>
    </>
  );
};
