import { useState, useEffect, type ReactNode, type FormEvent } from 'react';
import { Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { ExpandMore, Close } from '@mui/icons-material';
import { palette } from '@/utilities/themes';
import { useQuotation, QuotationContext } from '@/reusables/quotation/use-quotation';
import { AppButton } from '@/components/buttons';
import { Modal } from '@/components/dialogs/modals';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const CONTAINER_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'column', minHeight: 400, position: 'relative' };
const CLOSE_BTN_SX: SxProps<Theme> = { position: 'absolute', top: -10, right: -10, color: palette.navy, bgcolor: palette.mist, transition: 'all 0.2s', zIndex: 10, '&:hover': { bgcolor: palette.line, transform: 'rotate(90deg)' } };
const METER_SX: SxProps<Theme> = { display: 'flex', gap: 1, mb: 4, mt: 1, width: '60%', maxWidth: 280 };
const METER_BAR_SX: SxProps<Theme> = { flex: 1, height: 4, borderRadius: 2, bgcolor: palette.line, transition: 'background-color 0.4s ease', '&.on': { bgcolor: palette.orange } };
const EYEBROW_SX: SxProps<Theme> = { display: 'flex', alignItems: 'center', gap: '10px', color: palette.orange, fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2, '&::before': { content: '""', width: 22, height: 12, flex: 'none', background: `linear-gradient(${palette.orange}, ${palette.orange}) 0 0 / 5px 100% no-repeat, linear-gradient(${palette.orange}, ${palette.orange}) 8px 0 / 5px 100% no-repeat, linear-gradient(${palette.orange}, ${palette.orange}) 16px 0 / 5px 100% no-repeat`, transform: 'skewX(-14deg)', opacity: 0.95 } };
const TITLE_SX: SxProps<Theme> = { fontSize: '1.8rem', fontWeight: 800, color: palette.navy, mb: 1, letterSpacing: '-0.02em' };
const SUBTITLE_SX: SxProps<Theme> = { color: palette.muted, fontSize: '0.95rem', mb: 4 };
const CHOICE_GRID_SX: SxProps<Theme> = { display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 5 };
const CHOICE_BTN_SX: SxProps<Theme> = { display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: '10px', border: `1.5px solid ${palette.line}`, bgcolor: palette.white, color: palette.navy, fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)', '&:hover': { borderColor: palette.navy, transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(18,26,87,0.08)' }, '&.on': { bgcolor: palette.navy, borderColor: palette.navy, color: palette.white, boxShadow: '0 4px 12px rgba(18,26,87,0.2)', '& svg': { color: palette.orange } } };
const FOOTER_SX: SxProps<Theme> = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 3, borderTop: `1px solid ${palette.line}` };
const FIELD_WRAPPER_SX: SxProps<Theme> = { display: 'grid', gap: 0.5, mb: 2.5 };
const LABEL_SX: SxProps<Theme> = { fontSize: '0.85rem', fontWeight: 700, color: palette.navy, mb: 0.5 };
const INPUT_SX: SxProps<Theme> = { width: '100%', p: '12px 14px', borderRadius: '10px', border: `1.5px solid ${palette.line}`, fontFamily: 'inherit', fontSize: '0.92rem', color: palette.navy, bgcolor: palette.mist, outline: 'none', transition: 'all 0.2s', '&:focus': { bgcolor: palette.white, borderColor: palette.orange, boxShadow: `0 0 0 3px ${palette.peach}` } };
const SELECT_INPUT_SX: SxProps<Theme> = { ...INPUT_SX, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', cursor: 'pointer', pr: 5 };
const SELECT_WRAPPER_SX: SxProps<Theme> = { position: 'relative', width: '100%' };
const SELECT_ICON_SX: SxProps<Theme> = { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: palette.muted, fontSize: 20 };
const FROW_SX: SxProps<Theme> = { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 };
const DONE_SX: SxProps<Theme> = { display: 'grid', justifyItems: 'center', textAlign: 'center', gap: 2, py: 4 };

/* =====================================================================
 * Component
 * ===================================================================== */

const QSVC = [
  { label: 'Warehousing', icon: 'warehouse' },
  { label: 'Pick & Pack', icon: 'box' },
  { label: 'Cross Docking', icon: 'shuffle' },
  { label: 'E-Commerce Fulfilment', icon: 'laptop' },
  { label: 'Transport & Distribution', icon: 'truck' },
  { label: 'Container Handling', icon: 'container' },
  { label: 'Not sure yet', icon: 'chat' },
];

const SvgIcon = ({ name }: { name: string }) => (
  <Box component="span" sx={{ display: 'flex', '& svg': { width: 16, height: 16 } }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {name === 'warehouse' && <path d="M3 21V9l9-5 9 5v12M7 21v-8h10v8M7 17h10" />}
      {name === 'box' && <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />}
      {name === 'shuffle' && <path d="M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3" />}
      {name === 'laptop' && <><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></>}
      {name === 'truck' && <><path d="M2 6h11v10H2zM13 10h5l3 3v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>}
      {name === 'container' && <><rect x="3" y="6" width="18" height="13" rx="1" /><path d="M7 9v7M11 9v7M15 9v7M19 9v7M9 3h6v3" /></>}
      {name === 'chat' && <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8" /></>}
      {name === 'left' && <path d="M15 18l-6-6 6-6" />}
      {name === 'right' && <path d="M9 6l6 6-6 6" />}
      {name === 'check' && <path d="M5 12l5 5 9-10" />}
    </svg>
  </Box>
);

interface QuotationProps {
  open: boolean;
  onClose: () => void;
  initialService?: string;
}

export const Quotation = ({ open, onClose, initialService }: QuotationProps) => {
  const { step, services, form, toggleService, updateForm, nextStep, prevStep, reset } = useQuotation();

  useEffect(() => {
    if (open) reset(initialService);
  }, [open, initialService, reset]);

  const handleNext = (e?: FormEvent) => {
    e?.preventDefault();
    nextStep();
  };

  const renderMeter = () => (
    <Box sx={METER_SX}>
      {[0, 1, 2].map((i) => (
        <Box key={i} sx={METER_BAR_SX} className={i <= step ? 'on' : ''} />
      ))}
    </Box>
  );

  const renderStep1 = () => (
    <>
      <Box sx={EYEBROW_SX}>Step 1 of 3</Box>
      <Typography sx={TITLE_SX}>What do you need help with?</Typography>
      <Typography sx={SUBTITLE_SX}>Choose as many as you like.</Typography>
      <Box sx={CHOICE_GRID_SX}>
        {QSVC.map((s) => (
          <Box
            key={s.label}
            component="button"
            type="button"
            sx={CHOICE_BTN_SX}
            className={services.has(s.label) ? 'on' : ''}
            onClick={() => toggleService(s.label)}
          >
            <SvgIcon name={s.icon} />
            {s.label}
          </Box>
        ))}
      </Box>
    </>
  );

  const renderStep2 = () => (
    <>
      <Box sx={EYEBROW_SX}>Step 2 of 3</Box>
      <Typography sx={TITLE_SX}>Tell us about your business.</Typography>

      <Box sx={FIELD_WRAPPER_SX}>
        <Typography component="label" sx={LABEL_SX}>Business type</Typography>
        <Box sx={SELECT_WRAPPER_SX}>
          <Box component="select" sx={SELECT_INPUT_SX} value={form.businessType} onChange={(e) => updateForm('businessType', e.target.value)}>
            <option>Online store or dropshipper</option>
            <option>Importer or wholesaler</option>
            <option>Retailer</option>
            <option>Manufacturer</option>
            <option>Small business or sole trader</option>
            <option>Other</option>
          </Box>
          <ExpandMore sx={SELECT_ICON_SX} />
        </Box>
      </Box>

      <Box sx={FROW_SX}>
        <Box sx={FIELD_WRAPPER_SX}>
          <Typography component="label" sx={LABEL_SX}>Approximate stock</Typography>
          <Box sx={SELECT_WRAPPER_SX}>
            <Box component="select" sx={SELECT_INPUT_SX} value={form.stockVolume} onChange={(e) => updateForm('stockVolume', e.target.value)}>
              <option>Under 10 pallets</option>
              <option>10 to 50 pallets</option>
              <option>50 to 200 pallets</option>
              <option>200+ pallets</option>
              <option>Not sure</option>
            </Box>
            <ExpandMore sx={SELECT_ICON_SX} />
          </Box>
        </Box>
        <Box sx={FIELD_WRAPPER_SX}>
          <Typography component="label" sx={LABEL_SX}>When do you need to start?</Typography>
          <Box sx={SELECT_WRAPPER_SX}>
            <Box component="select" sx={SELECT_INPUT_SX} value={form.timeframe} onChange={(e) => updateForm('timeframe', e.target.value)}>
              <option>As soon as possible</option>
              <option>Within 1 to 3 months</option>
              <option>3 months or later</option>
              <option>Just exploring</option>
            </Box>
            <ExpandMore sx={SELECT_ICON_SX} />
          </Box>
        </Box>
      </Box>

      <Box sx={FIELD_WRAPPER_SX}>
        <Typography component="label" sx={LABEL_SX}>Anything else we should know?</Typography>
        <Box component="textarea" rows={3} placeholder="Products, order volumes, platforms, delivery areas…" sx={INPUT_SX} value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} />
      </Box>
    </>
  );

  const renderStep3 = () => (
    <>
      <Box sx={EYEBROW_SX}>Step 3 of 3</Box>
      <Typography sx={TITLE_SX}>Where should we send your quote?</Typography>

      <Box sx={FROW_SX}>
        <Box sx={FIELD_WRAPPER_SX}>
          <Typography component="label" sx={LABEL_SX}>Your name</Typography>
          <Box component="input" required autoComplete="name" sx={INPUT_SX} value={form.name} onChange={(e) => updateForm('name', e.target.value)} />
        </Box>
        <Box sx={FIELD_WRAPPER_SX}>
          <Typography component="label" sx={LABEL_SX}>Company</Typography>
          <Box component="input" autoComplete="organization" sx={INPUT_SX} value={form.company} onChange={(e) => updateForm('company', e.target.value)} />
        </Box>
      </Box>

      <Box sx={FROW_SX}>
        <Box sx={FIELD_WRAPPER_SX}>
          <Typography component="label" sx={LABEL_SX}>Email</Typography>
          <Box component="input" type="email" required autoComplete="email" sx={INPUT_SX} value={form.email} onChange={(e) => updateForm('email', e.target.value)} />
        </Box>
        <Box sx={FIELD_WRAPPER_SX}>
          <Typography component="label" sx={LABEL_SX}>Phone</Typography>
          <Box component="input" type="tel" autoComplete="tel" sx={INPUT_SX} value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} />
        </Box>
      </Box>
    </>
  );

  const renderDone = () => (
    <Box sx={DONE_SX}>
      <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: palette.peach, color: palette.orange, display: 'grid', placeItems: 'center', mb: 2 }}>
        <SvgIcon name="check" />
      </Box>
      <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: palette.navy }}>
        Thanks, your enquiry is ready.
      </Typography>
      <Typography sx={{ color: palette.muted, maxWidth: '44ch', mb: 2 }}>
        On the live website this goes straight to sales@brisbanelogistics.com.au and our team will be in touch. This prototype doesn't send anything.
      </Typography>
      <AppButton color="primary" onClick={onClose}>
        Back to the website
      </AppButton>
    </Box>
  );

  return (
    <Modal open={open} onClose={onClose} size="md" hideHeader>
      <Box sx={CONTAINER_SX}>
        <IconButton onClick={onClose} sx={CLOSE_BTN_SX} aria-label="Close">
          <Close fontSize="small" />
        </IconButton>

        {step === 3 ? (
          renderDone()
        ) : (
          <Box component="form" onSubmit={handleNext} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {renderMeter()}
            {step === 0 && renderStep1()}
            {step === 1 && renderStep2()}
            {step === 2 && renderStep3()}

            <Box sx={FOOTER_SX}>
              {step > 0 ? (
                <AppButton color="outline" size="medium" onClick={prevStep} startIcon={<SvgIcon name="left" />}>
                  Back
                </AppButton>
              ) : (
                <Box />
              )}
              <AppButton
                type="submit"
                color="primary"
                size="medium"
                endIcon={<SvgIcon name="right" />}
                disabled={step === 0 && services.size === 0}
              >
                {step === 2 ? 'Request my quote' : 'Continue'}
              </AppButton>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

/* =====================================================================
 * Wrapper: Provides the Context
 * ===================================================================== */

export const QuotationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | undefined>(undefined);

  const openQuotation = (service?: string) => {
    setActiveService(service);
    setIsOpen(true);
  };

  const closeQuotation = () => {
    setIsOpen(false);
    setTimeout(() => setActiveService(undefined), 300);
  };

  return (
    <QuotationContext.Provider value={{ openQuotation, closeQuotation }}>
      {children}
      <Quotation open={isOpen} onClose={closeQuotation} initialService={activeService} />
    </QuotationContext.Provider>
  );
};