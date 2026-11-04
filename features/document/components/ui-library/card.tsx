'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LibraryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function LibraryCard({
  interactive = false,
  className,
  children,
  ...props
}: LibraryCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-[4px] border border-[#CAD3F5] bg-white p-5 text-[#0A1A4A] shadow-none transition-all duration-200',
        interactive && 'cursor-pointer hover:border-[#0056FF]/40 hover:bg-white',
        className,
      )}
      style={{ borderRadius: '4px' }}
      {...props}
    >
      {children}
    </div>
  );
}

export function LibraryCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-3 flex items-start justify-between gap-3', className)} {...props}>
      {children}
    </div>
  );
}

export function LibraryCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base font-bold tracking-tight text-slate-900', className)} {...props}>
      {children}
    </h3>
  );
}

export function LibraryCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs leading-relaxed text-slate-600', className)} {...props}>
      {children}
    </p>
  );
}

export function LibraryCardMedia({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mb-4 overflow-hidden rounded-[4px]', className)}
      style={{ borderRadius: '4px' }}
      {...props}
    >
      {children}
    </div>
  );
}

export function LibraryCardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex items-center justify-between gap-3', className)} {...props}>
      {children}
    </div>
  );
}
