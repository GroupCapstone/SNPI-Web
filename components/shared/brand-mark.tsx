import Image from 'next/image';

import { cn } from '@/lib/utils';

interface BrandMarkProps {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
  size?: number;
}

export const BrandMark = ({
  compact = false,
  inverse = false,
  className,
  size = 38,
}: BrandMarkProps) => (
  <div className={cn('flex items-center gap-3', className)}>
    <div
      className="relative shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white"
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logo.png"
        alt="SNPI International School Logo"
        width={size}
        height={size}
        className="size-full object-contain p-0.5"
        priority
      />
    </div>
    {!compact && (
      <div className="min-w-0">
        <p
          className={cn(
            'truncate text-sm font-bold tracking-tight',
            inverse ? 'text-white' : 'text-slate-950',
          )}
        >
          SNPI-SMS
        </p>
        <p
          className={cn(
            'truncate text-xs font-medium',
            inverse ? 'text-slate-400' : 'text-slate-500',
          )}
        >
          SNPI International School
        </p>
      </div>
    )}
  </div>
);
