import { createContext, useContext, useState } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export type CallSlot = 'Morning' | 'Midday' | 'Afternoon';

export interface BookCallForm {
  name: string;
  phone: string;
  slot: CallSlot;
}

export interface UseBookACallReturn {
  form: BookCallForm;
  updateForm: (field: keyof BookCallForm, value: string) => void;
  reset: () => void;
}

/* =====================================================================
 * Context
 * ===================================================================== */

export interface BookACallContextValue {
  openBookACall: () => void;
  closeBookACall: () => void;
}

export const BookACallContext = createContext<BookACallContextValue | null>(null);

export const useBookACallModal = () => {
  const ctx = useContext(BookACallContext);
  if (!ctx) {
    throw new Error('useBookACallModal must be used within a BookACallProvider');
  }
  return ctx;
};

/* =====================================================================
 * Hook
 * ===================================================================== */

const INITIAL_FORM: BookCallForm = {
  name: '',
  phone: '',
  slot: 'Morning',
};

export const useBookACall = (): UseBookACallReturn => {
  const [form, setForm] = useState<BookCallForm>(INITIAL_FORM);

  const updateForm = (field: keyof BookCallForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => setForm(INITIAL_FORM);

  return { form, updateForm, reset };
};
