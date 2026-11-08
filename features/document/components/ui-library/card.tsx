'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { WHILE_TAP_SCALE } from '@/lib/motion';

export interface LibraryCardProps extends HTMLMotionProps<'div'> {
  interactive?: boolean;
}

export function LibraryCard({
  interactive = false,
  className,
  children,
  ...props
}: LibraryCardProps) {
  return (
    <motion.div
      whileTap={interactive ? { scale: WHILE_TAP_SCALE } : undefined}
      transition={{ type: 'spring', damping: 25, stiffness: 450 }}
      className={cn(
        'w-full rounded-[4px] bg-white p-5 text-[#020617] shadow-none transition-colors duration-150',
        interactive && 'cursor-pointer hover:bg-slate-50/50',
        className,
      )}
      style={{ borderRadius: '4px' }}
      {...props}
    >
      {children}
    </motion.div>
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
    <p className={cn('text-xs text-slate-500', className)} {...props}>
      {children}
    </p>
  );
}

export function LibraryCardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pt-0', className)} {...props}>
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
    <div className={cn('mt-4 flex items-center justify-between pt-3', className)} {...props}>
      {children}
    </div>
  );
}
