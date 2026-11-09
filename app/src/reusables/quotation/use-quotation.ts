import { createContext, useContext, useState } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface QuoteForm {
  businessType: string;
  stockVolume: string;
  timeframe: string;
  notes: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface UseQuotationReturn {
  step: number;
  services: Set<string>;
  form: QuoteForm;
  toggleService: (service: string) => void;
  updateForm: (field: keyof QuoteForm, value: string) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  reset: (initialService?: string) => void;
}

export interface QuotationContextValue {
  openQuotation: (service?: string) => void;
  closeQuotation: () => void;
}

/* =====================================================================
 * Context
 * ===================================================================== */

export const QuotationContext = createContext<QuotationContextValue | null>(null);

export const useQuotationModal = () => {
  const ctx = useContext(QuotationContext);
  if (!ctx) {
    throw new Error('useQuotationModal must be used within a QuotationProvider');
  }
  return ctx;
};

/* =====================================================================
 * Constants
 * ===================================================================== */

const INITIAL_FORM: QuoteForm = {
  businessType: 'Online store or dropshipper',
  stockVolume: 'Under 10 pallets',
  timeframe: 'As soon as possible',
  notes: '',
  name: '',
  company: '',
  email: '',
  phone: '',
};

/* =====================================================================
 * Form Hook
 * ===================================================================== */

export const useQuotation = (): UseQuotationReturn => {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<QuoteForm>(INITIAL_FORM);

  const toggleService = (service: string) => {
    setServices((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else next.add(service);
      return next;
    });
  };

  const updateForm = (field: keyof QuoteForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = (): boolean => {
    if (step === 0 && services.size === 0) return false;
    if (step === 2) {
      if (!form.name.trim() || !form.email.trim()) return false;
    }
    setStep((prev) => prev + 1);
    return true;
  };

  const prevStep = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  //  Updated to accept the initial service (just like qSel=new Set(...))
  const reset = (initialService?: string) => {
    setStep(0);
    setServices(new Set(initialService ? [initialService] : []));
    setForm(INITIAL_FORM);
  };

  return { step, services, form, toggleService, updateForm, nextStep, prevStep, reset };
};