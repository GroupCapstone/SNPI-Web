import * as React from 'react';
import { ChevronDown } from '@/components/icons';

import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, containerClassName, ...props }, ref) => {
    // Detect layout/width classes on className so the wrapper div wraps tightly
    const hasExplicitWidth =
      Boolean(className) &&
      /(^|\s)(w-|max-w-|min-w-|flex-1|flex-auto|flex-initial|flex-none)/.test(className || '');

    const layoutClasses = className
      ? className
          .split(' ')
          .filter((c) => /(^|\s)(w-|max-w-|min-w-|flex-|shrink-|grow-)/.test(c))
          .join(' ')
      : '';

    return (
      <div
        className={cn(
          'relative',
          hasExplicitWidth ? '' : 'w-full',
          layoutClasses,
          containerClassName,
        )}
      >
        <select
          className={cn(
            'flex h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pr-8 pl-3 text-sm text-slate-900 transition-colors focus:border-[#00509d] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-rose-500 focus:border-rose-500',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-slate-400" />
      </div>
    );
  },
);
Select.displayName = 'Select';
