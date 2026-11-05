import * as React from 'react';
import { cn } from '@/lib/utils';

export interface IconGlassWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  xs: 'p-1', // 4px - extra small
  sm: 'p-1.5', // 6px - small (default for subtle effect)
  md: 'p-2', // 8px - medium
  lg: 'p-2.5', // 10px - large
};

/**
 * IconGlassWrapper
 * 
 * Wraps icons with a subtle liquid glass container that has:
 * - Very small, barely noticeable glass border
 * - Consistent 20px icon size everywhere
 * - No movement or animation on hover/tap (completely stable)
 * - Applied automatically to all document pages
 * 
 * @example
 * ```tsx
 * <IconGlassWrapper size="sm">
 *   <Bell />
 * </IconGlassWrapper>
 * ```
 */
export function IconGlassWrapper({
  children,
  className,
  size = 'sm' // Default to small for subtle effect
}: IconGlassWrapperProps) {
  return (
    <div className={cn('icon-glass-container', sizeClasses[size], className)}>
      {children}
    </div>
  );
}
