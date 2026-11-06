import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-150 ease-out active:scale-[0.97] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800',
        outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
        ghost: 'text-slate-700 hover:bg-slate-100',
        destructive: 'bg-rose-600 text-white hover:bg-rose-700',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
