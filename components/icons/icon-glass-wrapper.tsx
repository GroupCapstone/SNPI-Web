import * as React from 'react';
import { cn } from '@/lib/utils';

export interface IconGlassWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-5',
};

/**
 * IconGlassWrapper
 * 
 * Wraps icons with a glassmorphic rounded container that has:
 * - Subtle glass border with border-radius
 * - No movement or animation on hover/tap (stable)
 * - Consistent styling across all document, API, and blueprint pages
 * 
 * @example
 * ```tsx
 * <IconGlassWrapper size="md">
 *   <Bell className="size-6" />
 * </IconGlassWrapper>
 * ```
 */
export function IconGlassWrapper({ 
  children, 
  className,
  size = 'md' 
}: IconGlassWrapperProps) {
  return (
    <div className={cn('icon-glass-container', sizeClasses[size], className)}>
      {children}
    </div>
  );
}
