'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Edit2,
  User,
  Building,
  Lock,
  FileText,
  ChevronDown,
} from '@/components/icons';

export interface WizardFormData {
  // Step 1: Identity
  fullName: string;
  email: string;
  role: string;
  // Step 2: Campus
  branch: string;
  phone: string;
  idNumber: string;
  // Step 3: Preferences
  notificationChannel: string;
  mfaMethod: string;
  term: string;
  // Step 4: Summary / Confirmation
  termsAccepted: boolean;
}

export const INITIAL_WIZARD_DATA: WizardFormData = {
  fullName: '',
  email: '',
  role: 'Student Applicant',
  branch: 'Main Campus (Phnom Penh)',
  phone: '',
  idNumber: '',
  notificationChannel: 'Email & SMS',
  mfaMethod: 'Time-Based Authenticator (TOTP)',
  term: 'Semester 1 - 2026/2027',
  termsAccepted: false,
};

const STORAGE_KEY = 'snp_multi_step_wizard_form_state_v1';

export interface MultiStepWizardProps {
  theme?: 'light' | 'dark';
  className?: string;
  onComplete?: (data: WizardFormData) => void;
}

export const WIZARD_STEPS = [
  { id: 1, title: 'Identity', icon: User },
  { id: 2, title: 'Campus', icon: Building },
  { id: 3, title: 'Security', icon: Lock },
  { id: 4, title: 'Review', icon: FileText },
];

// Brand Select Option Contract
interface BrandSelectOption {
  value: string;
  label: string;
  description?: string;
}

interface BrandSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: BrandSelectOption[];
  placeholder?: string;
}

/**
 * Standard Brand Select Dropdown Component
 * Follows the 5 primary brand tokens:
 * #0056FF (Royal Blue), #2277FF (Azure Blue), #E3E7FC (Soft Lavender), #FFFFFF, #EFF5FF
 */
function BrandSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}: BrandSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex h-10 w-full cursor-pointer items-center justify-between rounded-[4px] border bg-white px-3 font-sans text-xs text-[#020617] transition-colors focus:outline-none',
          isOpen
            ? 'border-[#0056FF] ring-1 ring-[#0056FF]/20'
            : 'border-[#CAD3F5] hover:border-[#0056FF]',
        )}
      >
        <span
          className={cn(
            'truncate',
            selectedOption ? 'font-medium text-[#020617]' : 'text-slate-400',
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'size-4 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180 text-[#0056FF]',
          )}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[4px] border border-[#CAD3F5] bg-white p-1 shadow-lg focus:outline-none"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-[2px] px-3 py-2 font-sans text-xs transition-colors',
                  isSelected
                    ? 'bg-[#EFF5FF] font-semibold text-[#0056FF]'
                    : 'text-[#020617] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                )}
              >
                <div className="flex flex-col">
                  <span>{opt.label}</span>
                  {opt.description && (
                    <span className="font-mono text-[10px] text-slate-400">{opt.description}</span>
                  )}
                </div>
                {isSelected && <Check className="size-3.5 stroke-[2.5] text-[#0056FF]" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const ROLE_OPTIONS: BrandSelectOption[] = [
  {
    value: 'Student Applicant',
    label: 'Student Applicant',
    description: 'Undergraduate & Graduate candidate',
  },
  {
    value: 'Faculty Staff',
    label: 'Faculty Staff',
    description: 'Academic teaching & research department',
  },
  {
    value: 'Department Admin',
    label: 'Department Admin',
    description: 'Institutional registrar & campus office',
  },
  {
    value: 'Lab Researcher',
    label: 'Lab Researcher',
    description: 'Advanced ICT research laboratory',
  },
];

const BRANCH_OPTIONS: BrandSelectOption[] = [
  {
    value: 'Main Campus (Phnom Penh)',
    label: 'Main Campus (Phnom Penh)',
    description: 'Central Administration & Engineering Wing',
  },
  {
    value: 'Siem Reap Branch',
    label: 'Siem Reap Branch',
    description: 'Provincial Tech & Tourism Innovation Hub',
  },
  {
    value: 'Battambang Campus',
    label: 'Battambang Campus',
    description: 'Agricultural Technology & Science Wing',
  },
  {
    value: 'Kompong Cham Center',
    label: 'Kompong Cham Center',
    description: 'Eastern Campus Training Hub',
  },
];

const MFA_OPTIONS: BrandSelectOption[] = [
  {
    value: 'Time-Based Authenticator (TOTP)',
    label: 'Time-Based Authenticator (TOTP)',
    description: 'Google Authenticator, 1Password, or Authy',
  },
  {
    value: 'Hardware Security Key (FIDO2)',
    label: 'Hardware Security Key (FIDO2)',
    description: 'YubiKey or WebAuthn biometrics',
  },
  {
    value: 'SMS Verification Code',
    label: 'SMS Verification Code',
    description: 'Cellular carrier fallback protocol',
  },
];

const TERM_OPTIONS: BrandSelectOption[] = [
  {
    value: 'Semester 1 - 2026/2027',
    label: 'Semester 1 - 2026/2027',
    description: 'Fall term starting October 2026',
  },
  {
    value: 'Semester 2 - 2026/2027',
    label: 'Semester 2 - 2026/2027',
    description: 'Spring term starting March 2027',
  },
  {
    value: 'Summer Intensive 2026',
    label: 'Summer Intensive 2026',
    description: 'Accelerated 8-week bootcamp',
  },
];

const NOTIFICATION_OPTIONS: BrandSelectOption[] = [
  {
    value: 'Email & SMS',
    label: 'Email & SMS',
    description: 'Dual-channel transactional delivery',
  },
  { value: 'Email Only', label: 'Email Only', description: 'Institutional email inbox delivery' },
  { value: 'SMS Only', label: 'SMS Only', description: 'Cellular SMS notifications' },
];

/**
 * MultiStepWizard
 *
 * Implements the 10-point Multi-Step Form Wizard architecture:
 * 01 Step Indicator: Numbered dots switching between pending, active, complete states.
 * 02 Progress Bar: Fluid water loading animation with dynamic percentage and colors.
 * 03 Step Panel: Scoped fieldsets with headings and aria-labelledby.
 * 04 Validation: Strict per-field validation preventing bypass of required fields.
 * 05 Next / Back: Controls that advance/rewind, with instant field touching.
 * 06 Summary Step: Final read-only review with inline Edit links to jump back.
 * 07 Persistence: Mirrored to sessionStorage so page refresh preserves progress.
 * 08 ARIA Live: Inline error messages & success panel announce without stealing focus.
 * 09 Transitions: Direction-aware slide transitions with spring/cubic-bezier curves.
 * 10 Success State: Clean confirmation card with reference ID and reset button.
 */
export function MultiStepWizard({ theme = 'light', className, onComplete }: MultiStepWizardProps) {
  const [formData, setFormData] = React.useState<WizardFormData>(INITIAL_WIZARD_DATA);
  const [step, setStep] = React.useState<number>(1);
  const [direction, setDirection] = React.useState<'forward' | 'backward'>('forward');
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [submissionId, setSubmissionId] = React.useState<string>('');
  const [touchedFields, setTouchedFields] = React.useState<Record<string, boolean>>({});

  // Reduced Motion Fallback
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener?.('change', listener);
      return () => mq.removeEventListener?.('change', listener);
    }
  }, []);

  // Hydrate from sessionStorage once on mount
  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) setFormData(parsed.data);
        if (parsed.step && parsed.step >= 1 && parsed.step <= 4) setStep(parsed.step);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  // Save changes to sessionStorage
  React.useEffect(() => {
    if (isSubmitted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data: formData, step }));
    } catch {
      // storage quota or private browsing
    }
  }, [formData, step, isSubmitted]);

  // Validation: Real-time per-field rules
  const errors = React.useMemo(() => {
    const errs: Record<string, string> = {};

    // Step 1 rules
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full legal name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Institutional email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Step 2 rules
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid telephone number (8-15 digits).';
    }

    if (!formData.idNumber.trim()) {
      errs.idNumber = 'National ID or passport number is required.';
    } else if (formData.idNumber.trim().length < 6) {
      errs.idNumber = 'Identification must be at least 6 characters.';
    }

    // Step 4 rules
    if (step === 4 && !formData.termsAccepted) {
      errs.termsAccepted = 'You must accept the enrollment terms.';
    }

    return errs;
  }, [formData, step]);

  // Determine if current step is fully valid
  const isStepValid = (stepNumber: number) => {
    if (stepNumber === 1) return !errors.fullName && !errors.email;
    if (stepNumber === 2) return !errors.phone && !errors.idNumber;
    if (stepNumber === 3) return true;
    if (stepNumber === 4) return formData.termsAccepted;
    return true;
  };

  const isCurrentStepValid = isStepValid(step);

  const handleChange = (
    field: keyof WizardFormData,
    value: WizardFormData[keyof WizardFormData],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const touchCurrentStepFields = () => {
    if (step === 1) {
      setTouchedFields((prev) => ({ ...prev, fullName: true, email: true }));
    } else if (step === 2) {
      setTouchedFields((prev) => ({ ...prev, phone: true, idNumber: true }));
    } else if (step === 4) {
      setTouchedFields((prev) => ({ ...prev, termsAccepted: true }));
    }
  };

  const goToStep = (targetStep: number) => {
    if (targetStep < step) {
      setDirection('backward');
      setStep(targetStep);
    } else if (targetStep > step) {
      touchCurrentStepFields();
      if (isCurrentStepValid) {
        setDirection('forward');
        setStep(targetStep);
      }
    }
  };

  const handleNext = () => {
    touchCurrentStepFields();
    if (!isCurrentStepValid) {
      return;
    }
    if (step < 4) {
      setDirection('forward');
      setStep((s) => s + 1);
    } else {
      // Success State
      const txId = `SNPI-APP-${Date.now().toString(36).toUpperCase()}`;
      setSubmissionId(txId);
      setIsSubmitted(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      onComplete?.(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection('backward');
      setStep((s) => s - 1);
    }
  };

  const handleRestart = () => {
    setFormData(INITIAL_WIZARD_DATA);
    setStep(1);
    setDirection('forward');
    setIsSubmitted(false);
    setTouchedFields({});
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Progress Bar Percentage: 25%, 50%, 75%, 100%
  const progressPercent = (step / 4) * 100;

  // Dynamic progress colors based on step
  const progressConfig = React.useMemo(() => {
    switch (step) {
      case 1:
        return {
          barColor: 'bg-[#2277FF]',
          badgeColor: 'border-[#2277FF]/30 bg-[#EFF5FF] text-[#2277FF]',
          ringColor: 'ring-[#2277FF]/20',
        };
      case 2:
        return {
          barColor: 'bg-[#0056FF]',
          badgeColor: 'border-[#0056FF]/30 bg-[#EFF5FF] text-[#0056FF]',
          ringColor: 'ring-[#0056FF]/20',
        };
      case 3:
        return {
          barColor: 'bg-[#1D4ED8]',
          badgeColor: 'border-[#1D4ED8]/30 bg-[#EFF5FF] text-[#1D4ED8]',
          ringColor: 'ring-[#1D4ED8]/20',
        };
      case 4:
      default:
        return {
          barColor: 'bg-[#059669]',
          badgeColor: 'border-emerald-300 bg-emerald-50 text-[#059669]',
          ringColor: 'ring-emerald-500/20',
        };
    }
  }, [step]);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-[4px] border border-[#CAD3F5] bg-white text-[#020617] shadow-2xs',
        className,
      )}
    >
      {/* ======================================================== */}
      {/* 02 FLUID WATER LOADING PROGRESS BAR                      */}
      {/* ======================================================== */}
      <div className="relative h-2 w-full overflow-hidden bg-[#E3E7FC]/80">
        <motion.div
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'relative h-full overflow-hidden transition-colors duration-500',
            progressConfig.barColor,
          )}
        >
          {/* Animated Water Ripple Shimmer Wave */}
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'linear',
            }}
            className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
          {/* Subtle water top surface highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/60" />
        </motion.div>
      </div>

      {/* Dynamic Step Header Status Bar */}
      <div className="flex items-center justify-between border-b border-[#CAD3F5]/60 bg-[#EFF5FF]/40 px-5 py-2.5 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-[#020617]">STEP 0{step} / 04</span>
          <span className="text-[#CAD3F5]">·</span>
          <span className="font-sans text-xs font-semibold text-[#334155]">
            {WIZARD_STEPS[step - 1].title}
          </span>
        </div>
        <span
          className={cn(
            'rounded-[2px] border px-2 py-0.5 font-mono text-[10px] font-bold transition-colors duration-300',
            progressConfig.badgeColor,
          )}
        >
          {progressPercent}% COMPLETE
        </span>
      </div>

      {/* ======================================================== */}
      {/* 01 STEP INDICATOR: Connected Nodes with Single-Word Titles */}
      {/* ======================================================== */}
      <div className="border-b border-[#CAD3F5] bg-white px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between">
          {WIZARD_STEPS.map((s, idx) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;
            const isPending = step < s.id;

            return (
              <React.Fragment key={s.id}>
                <button
                  type="button"
                  onClick={() => goToStep(s.id)}
                  disabled={isPending}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'group flex items-center gap-2 transition-all outline-none',
                    isPending
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer hover:opacity-100',
                  )}
                >
                  {/* Numbered Indicator Node */}
                  <span
                    className={cn(
                      'flex size-7 items-center justify-center rounded-[4px] font-mono text-xs font-bold transition-all duration-200',
                      isCompleted
                        ? 'bg-[#0056FF] text-white shadow-2xs'
                        : isActive
                          ? 'border border-[#0056FF] bg-[#0056FF] text-white shadow-2xs ring-2 ring-[#0056FF]/20'
                          : 'border border-[#CAD3F5] bg-white text-slate-500',
                    )}
                  >
                    {isCompleted ? <Check className="size-3.5 stroke-[2.5]" /> : s.id}
                  </span>

                  {/* Title Only (1 Word) */}
                  <span
                    className={cn(
                      'hidden font-mono text-xs font-bold tracking-tight uppercase sm:inline-block',
                      isActive
                        ? 'text-[#0056FF]'
                        : isCompleted
                          ? 'text-[#020617]'
                          : 'text-slate-400',
                    )}
                  >
                    {s.title}
                  </span>
                </button>

                {/* Step-to-Step Animated Connecting Line */}
                {idx < WIZARD_STEPS.length - 1 && (
                  <div className="relative mx-3 h-[3px] flex-1 overflow-hidden rounded-full bg-[#E3E7FC]">
                    <motion.div
                      initial={false}
                      animate={{
                        width: step > s.id ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-y-0 left-0 bg-[#0056FF]"
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUCCESS STATE                                            */}
      {/* ======================================================== */}
      {isSubmitted ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center space-y-4 p-8 text-center sm:p-12"
        >
          <div className="relative flex size-14 items-center justify-center rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]">
            <Check className="size-8 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h3 className="font-sans text-xl font-bold tracking-tight text-[#020617]">
              Admissions Dossier Registered
            </h3>
            <p className="max-w-sm font-sans text-xs text-[#334155]">
              Your application has been logged into the SNPI multi-branch admissions database.
            </p>
          </div>

          {/* Reference Stamp */}
          <div className="space-y-1 rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] p-3 font-mono text-xs">
            <div className="flex items-center justify-center gap-2">
              <span className="text-slate-400">REF:</span>
              <span className="font-bold text-[#0056FF]">{submissionId}</span>
            </div>
            <div className="text-[10px] text-slate-500">
              CANDIDATE: {formData.fullName} ({formData.role})
            </div>
          </div>

          {/* Restart button */}
          <button
            type="button"
            onClick={handleRestart}
            className="flex cursor-pointer items-center gap-2 rounded-[4px] bg-[#0056FF] px-4 py-2 font-mono text-xs font-bold text-white shadow-2xs transition-colors hover:bg-[#2277FF] active:bg-[#0047D4]"
          >
            <RotateCcw className="size-3.5" />
            <span>START NEW SUBMISSION</span>
          </button>
        </div>
      ) : (
        /* ======================================================== */
        /* STEP PANELS & FORM CONTROLS                              */
        /* ======================================================== */
        <div className="p-6 sm:p-8">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            {/* STEP 1: Identity */}
            {step === 1 && (
              <fieldset
                aria-labelledby="step1-heading"
                className={cn(
                  'space-y-4',
                  prefersReducedMotion
                    ? 'transition-opacity duration-200'
                    : 'animate-in fade-in-50 duration-300',
                  direction === 'forward' ? 'slide-in-from-right-4' : 'slide-in-from-left-4',
                )}
              >
                <legend id="step1-heading" className="space-y-1 pb-2">
                  <h3 className="font-sans text-base font-bold text-[#020617]">
                    Personal & Applicant Details
                  </h3>
                  <p className="font-sans text-xs text-[#334155]">
                    Enter your verified legal credentials for institutional identity matching.
                  </p>
                </legend>

                {/* Full Legal Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Full Legal Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    aria-invalid={touchedFields.fullName && !!errors.fullName}
                    aria-describedby={
                      touchedFields.fullName && errors.fullName ? 'fullName-error' : undefined
                    }
                    placeholder="e.g. Chan Dara"
                    className={cn(
                      'h-10 w-full rounded-[4px] border px-3 font-sans text-xs transition-colors focus:outline-none',
                      touchedFields.fullName && errors.fullName
                        ? 'border-red-500 bg-red-50/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                        : 'border-[#CAD3F5] bg-white text-[#020617] placeholder:text-slate-400 focus:border-[#0056FF] focus:ring-1 focus:ring-[#0056FF]/20',
                    )}
                  />
                  {touchedFields.fullName && errors.fullName && (
                    <p
                      id="fullName-error"
                      role="status"
                      aria-live="polite"
                      className="font-sans text-[11px] font-semibold text-red-600"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Institutional Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Institutional Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={touchedFields.email && !!errors.email}
                    aria-describedby={
                      touchedFields.email && errors.email ? 'email-error' : undefined
                    }
                    placeholder="e.g. applicant@campus.snpi.edu.kh"
                    className={cn(
                      'h-10 w-full rounded-[4px] border px-3 font-sans text-xs transition-colors focus:outline-none',
                      touchedFields.email && errors.email
                        ? 'border-red-500 bg-red-50/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                        : 'border-[#CAD3F5] bg-white text-[#020617] placeholder:text-slate-400 focus:border-[#0056FF] focus:ring-1 focus:ring-[#0056FF]/20',
                    )}
                  />
                  {touchedFields.email && errors.email && (
                    <p
                      id="email-error"
                      role="status"
                      aria-live="polite"
                      className="font-sans text-[11px] font-semibold text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Applicant Affiliation Brand Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="role"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Applicant Affiliation
                  </label>
                  <BrandSelect
                    id="role"
                    value={formData.role}
                    onChange={(val) => handleChange('role', val)}
                    options={ROLE_OPTIONS}
                  />
                </div>
              </fieldset>
            )}

            {/* STEP 2: Campus & Contact Details */}
            {step === 2 && (
              <fieldset
                aria-labelledby="step2-heading"
                className={cn(
                  'space-y-4',
                  prefersReducedMotion
                    ? 'transition-opacity duration-200'
                    : 'animate-in fade-in-50 duration-300',
                  direction === 'forward' ? 'slide-in-from-right-4' : 'slide-in-from-left-4',
                )}
              >
                <legend id="step2-heading" className="space-y-1 pb-2">
                  <h3 className="font-sans text-base font-bold text-[#020617]">
                    Campus Branch & Telephone
                  </h3>
                  <p className="font-sans text-xs text-[#334155]">
                    Select your primary learning facility and verifiable contact numbers.
                  </p>
                </legend>

                {/* Designated Branch Campus Brand Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="branch"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Designated Branch Campus *
                  </label>
                  <BrandSelect
                    id="branch"
                    value={formData.branch}
                    onChange={(val) => handleChange('branch', val)}
                    options={BRANCH_OPTIONS}
                  />
                </div>

                {/* Telephone Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Telephone / Telegram Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    aria-invalid={touchedFields.phone && !!errors.phone}
                    aria-describedby={
                      touchedFields.phone && errors.phone ? 'phone-error' : undefined
                    }
                    placeholder="e.g. +855 12 345 678"
                    className={cn(
                      'h-10 w-full rounded-[4px] border px-3 font-sans text-xs transition-colors focus:outline-none',
                      touchedFields.phone && errors.phone
                        ? 'border-red-500 bg-red-50/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                        : 'border-[#CAD3F5] bg-white text-[#020617] placeholder:text-slate-400 focus:border-[#0056FF] focus:ring-1 focus:ring-[#0056FF]/20',
                    )}
                  />
                  {touchedFields.phone && errors.phone && (
                    <p
                      id="phone-error"
                      role="status"
                      aria-live="polite"
                      className="font-sans text-[11px] font-semibold text-red-600"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* ID Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="idNumber"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    National ID / Passport Number *
                  </label>
                  <input
                    id="idNumber"
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => handleChange('idNumber', e.target.value)}
                    onBlur={() => handleBlur('idNumber')}
                    aria-invalid={touchedFields.idNumber && !!errors.idNumber}
                    aria-describedby={
                      touchedFields.idNumber && errors.idNumber ? 'idNumber-error' : undefined
                    }
                    placeholder="e.g. KH-9842104"
                    className={cn(
                      'h-10 w-full rounded-[4px] border px-3 font-mono text-xs transition-colors focus:outline-none',
                      touchedFields.idNumber && errors.idNumber
                        ? 'border-red-500 bg-red-50/15 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                        : 'border-[#CAD3F5] bg-white text-[#020617] placeholder:text-slate-400 focus:border-[#0056FF] focus:ring-1 focus:ring-[#0056FF]/20',
                    )}
                  />
                  {touchedFields.idNumber && errors.idNumber && (
                    <p
                      id="idNumber-error"
                      role="status"
                      aria-live="polite"
                      className="font-sans text-[11px] font-semibold text-red-600"
                    >
                      {errors.idNumber}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {/* STEP 3: Preferences & MFA Security */}
            {step === 3 && (
              <fieldset
                aria-labelledby="step3-heading"
                className={cn(
                  'space-y-4',
                  prefersReducedMotion
                    ? 'transition-opacity duration-200'
                    : 'animate-in fade-in-50 duration-300',
                  direction === 'forward' ? 'slide-in-from-right-4' : 'slide-in-from-left-4',
                )}
              >
                <legend id="step3-heading" className="space-y-1 pb-2">
                  <h3 className="font-sans text-base font-bold text-[#020617]">
                    Two-Factor Auth & Term
                  </h3>
                  <p className="font-sans text-xs text-[#334155]">
                    Configure authentication credentials and academic intake schedules.
                  </p>
                </legend>

                {/* MFA Method Brand Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mfaMethod"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Authentication Protection Method
                  </label>
                  <BrandSelect
                    id="mfaMethod"
                    value={formData.mfaMethod}
                    onChange={(val) => handleChange('mfaMethod', val)}
                    options={MFA_OPTIONS}
                  />
                </div>

                {/* Academic Term Brand Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="term"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Enrollment Academic Term
                  </label>
                  <BrandSelect
                    id="term"
                    value={formData.term}
                    onChange={(val) => handleChange('term', val)}
                    options={TERM_OPTIONS}
                  />
                </div>

                {/* Notification Channel Brand Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="notificationChannel"
                    className="block font-sans text-xs font-semibold text-[#020617]"
                  >
                    Notification Delivery Preference
                  </label>
                  <BrandSelect
                    id="notificationChannel"
                    value={formData.notificationChannel}
                    onChange={(val) => handleChange('notificationChannel', val)}
                    options={NOTIFICATION_OPTIONS}
                  />
                </div>
              </fieldset>
            )}

            {/* STEP 4: Review Application Details */}
            {step === 4 && (
              <fieldset
                aria-labelledby="step4-heading"
                className={cn(
                  'space-y-4',
                  prefersReducedMotion
                    ? 'transition-opacity duration-200'
                    : 'animate-in fade-in-50 duration-300',
                  direction === 'forward' ? 'slide-in-from-right-4' : 'slide-in-from-left-4',
                )}
              >
                <legend id="step4-heading" className="space-y-1 pb-2">
                  <h3 className="font-sans text-base font-bold text-[#020617]">
                    Review Application Details
                  </h3>
                  <p className="font-sans text-xs text-[#334155]">
                    Please verify all information before finalizing your admissions dossier.
                  </p>
                </legend>

                {/* Group 1 Review Card */}
                <div className="rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4 transition-colors">
                  <div className="mb-2 flex items-center justify-between border-b border-[#CAD3F5]/60 pb-2">
                    <span className="font-mono text-xs font-bold text-[#0056FF]">
                      01. IDENTITY DETAILS
                    </span>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="flex cursor-pointer items-center gap-1 font-mono text-[11px] font-bold text-slate-500 transition-colors hover:text-[#0056FF]"
                    >
                      <Edit2 className="size-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <dl className="grid grid-cols-2 gap-2 font-sans text-xs">
                    <div>
                      <dt className="text-slate-400">Name:</dt>
                      <dd className="font-semibold text-[#020617]">{formData.fullName || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Email:</dt>
                      <dd className="truncate font-semibold text-[#020617]">
                        {formData.email || '—'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Role:</dt>
                      <dd className="font-semibold text-[#020617]">{formData.role}</dd>
                    </div>
                  </dl>
                </div>

                {/* Group 2 Review Card */}
                <div className="rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4 transition-colors">
                  <div className="mb-2 flex items-center justify-between border-b border-[#CAD3F5]/60 pb-2">
                    <span className="font-mono text-xs font-bold text-[#0056FF]">
                      02. CAMPUS ALLOCATION
                    </span>
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="flex cursor-pointer items-center gap-1 font-mono text-[11px] font-bold text-slate-500 transition-colors hover:text-[#0056FF]"
                    >
                      <Edit2 className="size-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <dl className="grid grid-cols-2 gap-2 font-sans text-xs">
                    <div>
                      <dt className="text-slate-400">Branch:</dt>
                      <dd className="font-semibold text-[#020617]">{formData.branch}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Phone:</dt>
                      <dd className="font-semibold text-[#020617]">{formData.phone || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">ID / Passport:</dt>
                      <dd className="font-semibold text-[#020617]">{formData.idNumber || '—'}</dd>
                    </div>
                  </dl>
                </div>

                {/* Group 3 Review Card */}
                <div className="rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4 transition-colors">
                  <div className="mb-2 flex items-center justify-between border-b border-[#CAD3F5]/60 pb-2">
                    <span className="font-mono text-xs font-bold text-[#0056FF]">
                      03. SECURITY & PREFERENCES
                    </span>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="flex cursor-pointer items-center gap-1 font-mono text-[11px] font-bold text-slate-500 transition-colors hover:text-[#0056FF]"
                    >
                      <Edit2 className="size-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <dl className="grid grid-cols-2 gap-2 font-sans text-xs">
                    <div>
                      <dt className="text-slate-400">MFA Method:</dt>
                      <dd className="font-semibold text-[#020617]">{formData.mfaMethod}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Term:</dt>
                      <dd className="font-semibold text-[#020617]">{formData.term}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Notification:</dt>
                      <dd className="font-semibold text-[#020617]">
                        {formData.notificationChannel}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-2">
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                      className="mt-0.5 size-4 rounded-[2px] border border-[#CAD3F5] text-[#0056FF] focus:ring-[#0056FF]"
                    />
                    <span className="font-sans text-xs text-[#334155]">
                      I certify that all provided details are authentic and comply with SNPI-SMS
                      institutional admissions governance.
                    </span>
                  </label>
                  {touchedFields.termsAccepted && errors.termsAccepted && (
                    <p
                      role="status"
                      aria-live="polite"
                      className="mt-1 font-sans text-[11px] font-semibold text-red-600"
                    >
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {/* ======================================================== */}
            {/* FOOTER CONTROLS                                          */}
            {/* ======================================================== */}
            <div className="mt-6 flex items-center justify-between border-t border-[#CAD3F5]/60 pt-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className={cn(
                  'flex items-center gap-1.5 rounded-[4px] border border-[#CAD3F5] bg-white px-3.5 py-2 font-mono text-xs font-bold transition-colors outline-none',
                  step === 1
                    ? 'cursor-not-allowed text-slate-400 opacity-40'
                    : 'cursor-pointer text-[#020617] hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                )}
              >
                <ArrowLeft className="size-3.5" />
                <span>BACK</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="hidden font-mono text-[11px] text-slate-400 sm:inline-block">
                  Step {step} of 4
                </span>

                <button
                  type="submit"
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 rounded-[4px] px-4 py-2 font-mono text-xs font-bold shadow-2xs transition-all outline-none',
                    !isCurrentStepValid
                      ? 'border border-[#CAD3F5] bg-[#EFF5FF] text-slate-400 hover:border-red-400 hover:text-red-600'
                      : 'bg-[#0056FF] text-white hover:bg-[#2277FF] active:scale-[0.98]',
                  )}
                >
                  <span>{step === 4 ? 'CONFIRM & SUBMIT' : 'NEXT STEP'}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/**
 * MultiStepWizardInteractiveDemo
 *
 * Demo wrapper featuring persistence reset and status header.
 */
export function MultiStepWizardInteractiveDemo() {
  const [wizardKey, setWizardKey] = React.useState(0);

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    setWizardKey((k) => k + 1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-[4px] border border-[#CAD3F5] bg-white p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#020617] uppercase">
            Candidate Enrollment Pipeline
          </span>
          <span className="inline-flex items-center rounded-[2px] border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
            Session Storage Synced
          </span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex cursor-pointer items-center gap-1.5 rounded-[4px] border border-[#CAD3F5] bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-[#020617] transition-colors hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF] active:scale-95"
        >
          <RotateCcw className="size-3" />
          <span>Reset Session</span>
        </button>
      </div>

      <MultiStepWizard key={wizardKey} theme="light" />
    </div>
  );
}
