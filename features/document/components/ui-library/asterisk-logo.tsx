'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Download, Archive, Check } from '@/components/icons';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  /**
   * Official Logo Edition (Strictly 3 Canonical Versions):
   * - blue: Royal Blue (#0056FF) Bold Glyph on Pure White / Light Canvas
   * - white: Pure White (#FFFFFF) Bold Glyph on Royal Blue (#0056FF) or Dark Obsidian (#020617) Canvas
   * - dark: Obsidian Black (#020617) Bold Glyph on Pure White / Light Canvas
   *
   * Also supports legacy aliases: standard, brand, solid, tint, outline, bare
   */
  variant?: 'blue' | 'white' | 'dark' | 'standard' | 'brand' | 'solid' | 'tint' | 'outline' | 'bare' | 'tricolor';
  mode?: 'light' | 'dark';
  colorVariant?: 'brand' | 'white' | 'dark' | 'blue' | 'current' | 'monochrome';
  color?: string;
  colorTop?: string;
  colorRight?: string;
  colorBottom?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Official Sora Bold (wght=800) Asterisk Vector Path
 * Mathematically normalized to a 100x100 coordinate space:
 * - Center X: exactly 50.00
 * - Center Y: exactly 50.00
 * - Horizontal Margins: exactly 12.52 on both Left and Right
 * - Vertical Margins: exactly 12.00 on both Top and Bottom
 * - Dead-center, completely stable across all viewports and devices
 *
 * All three wings share a unified style and geometry, framing the central equilateral negative space.
 */
export const SORA_BOLD_ASTERISK_PATH =
  'M 77.75 75.73 L 55.16 58.98 L 55.16 41.02 L 77.75 24.27 L 87.48 41.62 L 69.67 48.65 L 69.67 51.35 L 87.48 58.38 Z M 56.96 12.00 L 53.81 39.98 L 38.26 48.95 L 12.52 37.73 L 22.55 20.68 L 37.66 32.50 L 39.90 31.15 L 37.06 12.30 Z M 12.52 62.27 L 38.26 51.05 L 53.81 60.02 L 56.96 88.00 L 37.21 87.70 L 39.90 68.85 L 37.66 67.50 L 22.70 79.32 Z';

/** Individual wing paths preserved for technical dissection */
export const ASTERISK_ARM_RIGHT =
  'M 77.75 75.73 L 55.16 58.98 L 55.16 41.02 L 77.75 24.27 L 87.48 41.62 L 69.67 48.65 L 69.67 51.35 L 87.48 58.38 Z';
export const ASTERISK_ARM_TOP =
  'M 56.96 12.00 L 53.81 39.98 L 38.26 48.95 L 12.52 37.73 L 22.55 20.68 L 37.66 32.50 L 39.90 31.15 L 37.06 12.30 Z';
export const ASTERISK_ARM_BOTTOM =
  'M 12.52 62.27 L 38.26 51.05 L 53.81 60.02 L 56.96 88.00 L 37.21 87.70 L 39.90 68.85 L 37.66 67.50 L 22.70 79.32 Z';

/**
 * Pure Vector Glyph for the Sora Bold Asterisk Brand Mark
 * Unified all-wing design with 2.5px vector stroke expansion making the glyph bold and heavy,
 * commanding maximum optical prominence over the background canvas.
 */
export function AsteriskVectorGlyph({
  color = '#0056FF',
  strokeWidth = 2.5,
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: {
  color?: string;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-full shrink-0 overflow-visible select-none', className)}
      role="img"
      aria-label={ariaLabel}
    >
      <path
        d={SORA_BOLD_ASTERISK_PATH}
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        fillRule="nonzero"
      />
    </svg>
  );
}

/**
 * Backward-compatible Tricolor Asterisk Glyph export.
 * When per-wing colors match, renders clean unified Sora bold path.
 */
export function AsteriskTricolorGlyph({
  colorTop = '#0056FF',
  colorRight = '#0056FF',
  colorBottom = '#0056FF',
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: {
  colorTop?: string;
  colorRight?: string;
  colorBottom?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const isUnified = colorTop === colorRight && colorRight === colorBottom;

  if (isUnified) {
    return (
      <AsteriskVectorGlyph
        color={colorTop}
        className={className}
        ariaLabel={ariaLabel}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-full shrink-0 overflow-visible select-none', className)}
      role="img"
      aria-label={ariaLabel}
    >
      <path
        d={ASTERISK_ARM_TOP}
        fill={colorTop}
        stroke={colorTop}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fillRule="nonzero"
      />
      <path
        d={ASTERISK_ARM_RIGHT}
        fill={colorRight}
        stroke={colorRight}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fillRule="nonzero"
      />
      <path
        d={ASTERISK_ARM_BOTTOM}
        fill={colorBottom}
        stroke={colorBottom}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fillRule="nonzero"
      />
    </svg>
  );
}

/**
 * Standardized Squircle Sizing Classes
 * Enlarged for bold, prominent brand visibility and perfectly balanced internal padding.
 */
const BOX_SIZE_CLASSES: Record<NonNullable<AsteriskLogoProps['size']>, string> = {
  xs: 'size-6 rounded-md p-0.5',
  sm: 'size-8 rounded-lg p-1',
  md: 'size-10 sm:size-11 rounded-xl p-1.5',
  lg: 'size-16 rounded-2xl p-2.5',
  xl: 'size-24 rounded-3xl p-3.5',
  '2xl': 'size-32 rounded-3xl p-4.5',
  '3xl': 'size-40 rounded-[2rem] p-5.5',
  hero: 'size-36 sm:size-44 md:size-52 lg:size-60 rounded-[2.25rem] sm:rounded-[2.75rem] p-6 sm:p-8 md:p-10 shadow-2xl',
};

/**
 * Official SNPI Star / Asterisk Brand Logo
 * Rendered using the iconic Sora Bold geometric asterisk mark with all wings styled uniformly.
 * STRICT POLICY: Motionless and stable. Zero hover scaling, zero jumping, zero animation events.
 * 
 * Strictly 3 Canonical Versions:
 *   1. Blue Brand: Royal Blue (#0056FF) on Pure White / Light Canvas
 *   2. White: Pure White (#FFFFFF) on Royal Blue (#0056FF) or Dark Obsidian (#020617) Canvas
 *   3. Dark: Obsidian Black (#020617) on Pure White / Light Canvas
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'blue',
  mode = 'light',
  colorVariant,
  color,
  colorTop,
  colorRight,
  colorBottom,
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: AsteriskLogoProps) {
  // Determine glyph color: strictly Blue (#0056FF), White (#FFFFFF), or Dark (#020617)
  let glyphColor = color ?? '#0056FF';

  if (colorVariant === 'white') {
    glyphColor = '#FFFFFF';
  } else if (colorVariant === 'dark') {
    glyphColor = '#020617';
  } else if (colorVariant === 'blue' || colorVariant === 'brand') {
    glyphColor = '#0056FF';
  } else if (colorVariant === 'current') {
    glyphColor = 'currentColor';
  } else if (variant === 'white' || variant === 'brand' || variant === 'solid') {
    glyphColor = '#FFFFFF';
  } else if (variant === 'dark') {
    glyphColor = mode === 'dark' ? '#FFFFFF' : '#020617';
  } else if (variant === 'blue' || variant === 'standard') {
    glyphColor = mode === 'dark' ? '#FFFFFF' : '#0056FF';
  } else if (colorTop && colorRight && colorBottom) {
    // If explicit tricolor overrides were passed
    return (
      <div
        className={cn(
          'inline-flex shrink-0 items-center justify-center select-none',
          BOX_SIZE_CLASSES[size],
          className,
        )}
        aria-label={ariaLabel}
        role="img"
      >
        <AsteriskTricolorGlyph
          colorTop={colorTop}
          colorRight={colorRight}
          colorBottom={colorBottom}
          ariaLabel={ariaLabel}
        />
      </div>
    );
  }

  // 'bare' variant: Transparent background, pure bold vector emblem without container
  if (variant === 'bare') {
    return (
      <div
        className={cn(
          'inline-flex shrink-0 items-center justify-center border-0 bg-transparent p-0 ring-0 select-none',
          BOX_SIZE_CLASSES[size],
          className,
        )}
      >
        <AsteriskVectorGlyph
          color={glyphColor}
          strokeWidth={2.5}
          ariaLabel={ariaLabel}
        />
      </div>
    );
  }

  // Squircle Container Styles mapped to brand tokens
  // Distinct background colors framing the bold glyph:
  // - Blue Version: Pure White container with subtle #CAD3F5 border
  // - White Version: Solid Royal Blue (#0056FF) or Obsidian Slate (#020617) container
  // - Dark Version: Pure White container with crisp slate border
  let containerStyle = 'bg-white border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10';

  if (variant === 'white' || variant === 'brand' || variant === 'solid') {
    containerStyle = 'bg-[#0056FF] border border-white/20 ring-4 ring-[#0056FF]/20 shadow-md shadow-[#0056FF]/25';
  } else if (variant === 'dark' && mode === 'dark') {
    containerStyle = 'bg-[#020617] border border-white/20 ring-4 ring-white/10 shadow-md shadow-black/40';
  } else if (variant === 'dark') {
    containerStyle = 'bg-white border border-slate-300 ring-4 ring-slate-900/10 shadow-sm';
  } else if (variant === 'tint') {
    containerStyle = 'bg-[#EFF5FF] border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-2xs';
  } else if (variant === 'outline') {
    containerStyle = 'bg-white border-2 border-[#0056FF] shadow-xs';
  }

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center select-none',
        BOX_SIZE_CLASSES[size],
        containerStyle,
        className,
      )}
      aria-label={ariaLabel}
      role="img"
    >
      <AsteriskVectorGlyph
        color={glyphColor}
        strokeWidth={2.5}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

/**
 * Backward-compatible AsteriskEmblem export referencing the official 3-shape asterisk vector mark
 */
export interface AsteriskEmblemProps {
  className?: string;
  size?: number | string;
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient' | 'blue' | 'dark' | 'tricolor';
  color?: string;
  colorTop?: string;
  colorRight?: string;
  colorBottom?: string;
  ariaLabel?: string;
}

export function AsteriskEmblem({
  className,
  colorVariant = 'brand',
  color,
  colorTop,
  colorRight,
  colorBottom,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: AsteriskEmblemProps) {
  if (colorVariant === 'white' || colorVariant === 'white-accent') {
    return (
      <AsteriskVectorGlyph
        color="#FFFFFF"
        strokeWidth={2.5}
        className={className}
        ariaLabel={ariaLabel}
      />
    );
  }

  if (colorVariant === 'dark') {
    return (
      <AsteriskVectorGlyph
        color="#020617"
        strokeWidth={2.5}
        className={className}
        ariaLabel={ariaLabel}
      />
    );
  }

  if (colorVariant === 'current') {
    return (
      <AsteriskVectorGlyph
        color="currentColor"
        strokeWidth={2.5}
        className={className}
        ariaLabel={ariaLabel}
      />
    );
  }

  if (colorTop && colorRight && colorBottom) {
    return (
      <AsteriskTricolorGlyph
        colorTop={colorTop}
        colorRight={colorRight}
        colorBottom={colorBottom}
        className={className}
        ariaLabel={ariaLabel}
      />
    );
  }

  return (
    <AsteriskVectorGlyph
      color={color ?? '#0056FF'}
      strokeWidth={2.5}
      className={className}
      ariaLabel={ariaLabel}
    />
  );
}

/* ============================================================================
 * PURE CLIENT-SIDE HIGH-RESOLUTION PNG RASTERIZER & ZIP BUNDLER
 * Generates PNG images strictly below 20MB (lossless ~60-250KB each).
 * PKZIP 2.0 binary generation in pure TypeScript using Uint8Array & DataView.
 * Zero external npm dependencies.
 * ============================================================================ */

function makeCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
}

const CRC_TABLE = makeCrcTable();

function computeCrc32(data: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

export interface ZipEntry {
  name: string;
  data: Uint8Array | string;
}

/**
 * Creates an uncompressed standard PKZIP 2.0 binary array.
 * Compatible with macOS Archive Utility, Windows Explorer, unzip, 7-zip.
 */
export function createZipUint8Array(files: ZipEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  let totalLength = 0;

  const prepared = files.map((f) => {
    const data = typeof f.data === 'string' ? encoder.encode(f.data) : f.data;
    const nameBytes = encoder.encode(f.name);
    const crc = computeCrc32(data);
    totalLength += 30 + nameBytes.length + data.length;
    return { nameBytes, data, crc, size: data.length };
  });

  for (const f of prepared) {
    totalLength += 46 + f.nameBytes.length;
  }
  totalLength += 22; // End of Central Directory record

  const output = new Uint8Array(totalLength);
  const view = new DataView(output.buffer);
  let offset = 0;
  const fileEntries: {
    nameBytes: Uint8Array;
    crc: number;
    size: number;
    offset: number;
  }[] = [];

  for (const f of prepared) {
    const localOffset = offset;
    view.setUint32(offset, 0x04034b50, true); // Local header signature
    view.setUint16(offset + 4, 20, true); // Version needed
    view.setUint16(offset + 6, 0x0800, true); // UTF-8 filename flag
    view.setUint16(offset + 8, 0, true); // Store (uncompressed)
    view.setUint16(offset + 10, 0, true); // Time
    view.setUint16(offset + 12, 0, true); // Date
    view.setUint32(offset + 14, f.crc, true);
    view.setUint32(offset + 18, f.size, true); // Compressed size
    view.setUint32(offset + 22, f.size, true); // Uncompressed size
    view.setUint16(offset + 26, f.nameBytes.length, true);
    view.setUint16(offset + 28, 0, true); // Extra field length
    offset += 30;

    output.set(f.nameBytes, offset);
    offset += f.nameBytes.length;

    output.set(f.data, offset);
    offset += f.data.length;

    fileEntries.push({
      nameBytes: f.nameBytes,
      crc: f.crc,
      size: f.size,
      offset: localOffset,
    });
  }

  const centralDirStart = offset;

  for (const entry of fileEntries) {
    view.setUint32(offset, 0x02014b50, true); // Central directory signature
    view.setUint16(offset + 4, 20, true); // Version made by
    view.setUint16(offset + 6, 20, true); // Version needed
    view.setUint16(offset + 8, 0x0800, true); // Flags (UTF-8)
    view.setUint16(offset + 10, 0, true); // Compression
    view.setUint16(offset + 12, 0, true); // Time
    view.setUint16(offset + 14, 0, true); // Date
    view.setUint32(offset + 16, entry.crc, true);
    view.setUint32(offset + 20, entry.size, true);
    view.setUint32(offset + 24, entry.size, true);
    view.setUint16(offset + 28, entry.nameBytes.length, true);
    view.setUint16(offset + 30, 0, true); // Extra length
    view.setUint16(offset + 32, 0, true); // Comment length
    view.setUint16(offset + 34, 0, true); // Disk start
    view.setUint16(offset + 36, 0, true); // Internal attributes
    view.setUint32(offset + 38, 0, true); // External attributes
    view.setUint32(offset + 42, entry.offset, true); // Offset of local header
    offset += 46;

    output.set(entry.nameBytes, offset);
    offset += entry.nameBytes.length;
  }

  const centralDirSize = offset - centralDirStart;

  // End of Central Directory Record
  view.setUint32(offset, 0x06054b50, true); // EOCD signature
  view.setUint16(offset + 4, 0, true); // Disk number
  view.setUint16(offset + 6, 0, true); // Central dir disk
  view.setUint16(offset + 8, prepared.length, true); // Number of records this disk
  view.setUint16(offset + 10, prepared.length, true); // Total records
  view.setUint32(offset + 12, centralDirSize, true); // Central dir size
  view.setUint32(offset + 16, centralDirStart, true); // Central dir offset
  view.setUint16(offset + 20, 0, true); // Comment length

  return output;
}

export interface RenderLogoOptions {
  variant?: 'blue' | 'white' | 'dark' | 'light' | 'royal' | 'dark-on-light' | 'transparent';
  shape?: 'squircle' | 'circle' | 'square' | 'transparent';
  dimension?: number;
}

/**
 * Pure client-side Canvas rasterizer.
 * Renders the Sora Bold Asterisk vector mark cleanly to a lossless PNG Blob.
 * Strictly enforces unified all-wing geometry with bold stroke expansion,
 * commanding high-contrast prominence over the background canvas.
 * Always well below 20MB (output size typically 50KB to 250KB).
 */
export function renderLogoToCanvas(options: RenderLogoOptions = {}): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Canvas rendering is only available in browser'));
      return;
    }
    const { variant = 'blue', shape = 'squircle', dimension = 1024 } = options;

    const canvas = document.createElement('canvas');
    canvas.width = dimension;
    canvas.height = dimension;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas 2D context unavailable'));
      return;
    }

    // Strictly 3 Canonical Versions:
    // 1. Blue Brand ('blue' | 'light'): Royal Blue (#0056FF) on Pure White (#FFFFFF)
    // 2. White Reversed ('white' | 'royal'): Pure White (#FFFFFF) on Royal Blue (#0056FF)
    // 3. Dark Monochromatic ('dark' on Obsidian #020617, or 'dark-on-light' on Pure White #FFFFFF)
    let glyphColor = '#0056FF';
    let bgColor: string | null = '#FFFFFF';
    let borderColor = '#CAD3F5';

    if (variant === 'white' || variant === 'royal') {
      glyphColor = '#FFFFFF';
      bgColor = '#0056FF';
      borderColor = 'rgba(255, 255, 255, 0.25)';
    } else if (variant === 'dark') {
      glyphColor = '#FFFFFF';
      bgColor = '#020617';
      borderColor = 'rgba(255, 255, 255, 0.14)';
    } else if (variant === 'dark-on-light') {
      glyphColor = '#020617';
      bgColor = '#FFFFFF';
      borderColor = '#94A3B8';
    } else if (variant === 'transparent') {
      glyphColor = '#0056FF';
      bgColor = null;
      borderColor = 'transparent';
    } else {
      // 'blue' | 'light' default
      glyphColor = '#0056FF';
      bgColor = '#FFFFFF';
      borderColor = '#CAD3F5';
    }

    // Draw container background if not transparent
    if (bgColor) {
      ctx.fillStyle = bgColor;
      if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(dimension / 2, dimension / 2, dimension / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      } else if (shape === 'squircle') {
        const radius = dimension * 0.22;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(0, 0, dimension, dimension, radius);
        } else {
          ctx.moveTo(radius, 0);
          ctx.lineTo(dimension - radius, 0);
          ctx.quadraticCurveTo(dimension, 0, dimension, radius);
          ctx.lineTo(dimension, dimension - radius);
          ctx.quadraticCurveTo(dimension, dimension, dimension - radius, dimension);
          ctx.lineTo(radius, dimension);
          ctx.quadraticCurveTo(0, dimension, 0, dimension - radius);
          ctx.lineTo(0, radius);
          ctx.quadraticCurveTo(0, 0, radius, 0);
        }
        ctx.closePath();
        ctx.fill();

        // Keyline border
        if (borderColor !== 'transparent') {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = Math.max(1, dimension * 0.015);
          ctx.stroke();
        }
      } else if (shape === 'square') {
        ctx.fillRect(0, 0, dimension, dimension);
      }
    }

    // If circle shape, clip content inside circle for avatars
    if (shape === 'circle') {
      ctx.save();
      ctx.beginPath();
      ctx.arc(dimension / 2, dimension / 2, dimension / 2, 0, Math.PI * 2);
      ctx.clip();
    }

    // Scale and render the unified Sora Bold Asterisk Vector Mark (All wings identical bold style)
    // Sized to 62% of container dimension to ensure it is bold, authoritative, and dominant
    const glyphScale = (dimension * 0.62) / 76;
    ctx.save();
    ctx.translate(dimension / 2, dimension / 2);
    ctx.scale(glyphScale, glyphScale);
    ctx.translate(-50, -50);

    const fullGlyph = new Path2D(SORA_BOLD_ASTERISK_PATH);
    ctx.fillStyle = glyphColor;
    ctx.strokeStyle = glyphColor;
    ctx.lineWidth = 2.5; // Bold stroke expansion to make the mark visually dominant over background
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.fill(fullGlyph);
    ctx.stroke(fullGlyph);

    ctx.restore();
    if (shape === 'circle') {
      ctx.restore();
    }

    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to generate PNG blob'));
      },
      'image/png',
      1.0,
    );
  });
}

/**
 * Triggers a browser download of any Blob.
 */
export function downloadBlob(blob: Blob, filename: string) {
  if (typeof window === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Downloads high-resolution brand logo PNG (strictly <20MB).
 */
export async function downloadLogoPng(
  options: {
    variant?: 'blue' | 'white' | 'dark' | 'light' | 'royal' | 'dark-on-light' | 'transparent';
    filename?: string;
    dimension?: number;
    shape?: 'squircle' | 'circle' | 'square';
  } = {},
) {
  const {
    variant = 'blue',
    filename = `snpi-brand-logo-${variant}.png`,
    dimension = 1024,
    shape = 'squircle',
  } = options;
  const blob = await renderLogoToCanvas({ variant, shape, dimension });
  downloadBlob(blob, filename);
}

/**
 * Downloads clean SVG vector graphic with the unified Sora Bold Asterisk Mark in brand colors.
 */
export function downloadOriginalLogo(filename = 'snpi-brand-logo.svg', color = '#0056FF') {
  if (typeof window === 'undefined') return;
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512" fill="none">
  <!-- Official Sora Bold Asterisk Brand Mark (All Wings Unified Bold Style) -->
  <path d="${SORA_BOLD_ASTERISK_PATH}" fill="${color}" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" fill-rule="nonzero"/>
</svg>`;
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  downloadBlob(blob, filename);
}

/**
 * Downloads comprehensive Brand Media Kit ZIP containing all 3 canonical logo editions and formats.
 * All files packaged in one click, well below 20MB (total zip ~600KB).
 */
export async function downloadBrandMediaKitZip() {
  if (typeof window === 'undefined') return;

  const [
    blueOnWhiteBlob,
    whiteOnRoyalBlob,
    whiteOnDarkBlob,
    darkOnWhiteBlob,
    transparentBlob,
    avatarCircleBlueBlob,
    avatarCircleDarkBlob,
    avatarSquircleBlob,
    favicon192Blob,
    favicon512Blob,
  ] = await Promise.all([
    renderLogoToCanvas({ variant: 'blue', shape: 'squircle', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'white', shape: 'squircle', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'dark', shape: 'squircle', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'dark-on-light', shape: 'squircle', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'transparent', shape: 'transparent', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'white', shape: 'circle', dimension: 512 }),
    renderLogoToCanvas({ variant: 'dark', shape: 'circle', dimension: 512 }),
    renderLogoToCanvas({ variant: 'blue', shape: 'squircle', dimension: 512 }),
    renderLogoToCanvas({ variant: 'blue', shape: 'squircle', dimension: 192 }),
    renderLogoToCanvas({ variant: 'blue', shape: 'squircle', dimension: 512 }),
  ]);

  const toUint8 = async (b: Blob) => new Uint8Array(await b.arrayBuffer());

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1024" height="1024" fill="none">
  <rect width="100" height="100" rx="22" fill="#FFFFFF" stroke="#CAD3F5" stroke-width="1.5"/>
  <!-- Official Sora Bold Asterisk Brand Mark (All Wings Unified Bold Style) -->
  <path d="${SORA_BOLD_ASTERISK_PATH}" fill="#0056FF" stroke="#0056FF" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" fill-rule="nonzero"/>
</svg>`;

  const readmeContent = `================================================================================
 SNPI OFFICIAL BRAND MEDIA KIT & ASSET SPECIFICATIONS
================================================================================

Brand Identity: SNPI School Management System (SNP-SMS)
Geometric Foundation: Sora Bold Convergent Asterisk Mark (*)

3 CANONICAL LOGO EDITIONS:
  01. Blue Brand Edition:     #0056FF (Royal Blue)     - Displayed on Pure White (#FFFFFF) / Ice Tint (#EFF5FF)
  02. White Reversed Edition: #FFFFFF (Pure White)     - Displayed on Royal Blue (#0056FF) or Obsidian Dark (#020617)
  03. Dark Edition:           #020617 (Obsidian Black) - Displayed on Pure White (#FFFFFF)

ALL WINGS UNIFIED DESIGN:
  All wings share the unified bold geometric style framing the central equilateral negative space.
  Optical prominence is enforced via 2.5px vector stroke expansion making the glyph bolder than the background.

INCLUDED ASSETS IN THIS PACKAGE:
  01. 01-snpi-logo-blue-on-white-1024.png   - 1024x1024 Blue Brand Logo on White Canvas
  02. 02-snpi-logo-white-on-royal-1024.png  - 1024x1024 White Logo on Royal Blue Canvas
  03. 03-snpi-logo-white-on-dark-1024.png   - 1024x1024 White Logo on Obsidian Slate Canvas (#020617)
  04. 04-snpi-logo-dark-on-white-1024.png   - 1024x1024 Obsidian Black Logo on White Canvas
  05. 05-snpi-logo-transparent-1024.png     - 1024x1024 Pure Bold Vector on Transparent Background
  06. 06-snpi-avatar-circle-blue-512.png    - 512x512 Circular Profile Avatar (Royal Blue)
  07. 07-snpi-avatar-circle-dark-512.png    - 512x512 Circular Profile Avatar (Obsidian Slate)
  08. 08-snpi-avatar-squircle-512.png       - 512x512 Standard Squircle Profile Avatar
  09. 09-snpi-web-favicon-192.png           - 192x192 Favicon Standard for Web Applications
  10. 10-snpi-web-app-icon-512.png          - 512x512 PWA Web App Manifest Standard Icon
  11. 11-snpi-brand-logo.svg                - Scalable Vector Graphic (Lossless Bold Vector)
  12. README-BRAND-STANDARDS.txt            - This specification manual

CLEARSPACE & USAGE:
  Maintain a minimum clearspace equal to 25% of the asterisk height on all sides.
  Never distort, rotate, stretch, or apply shadows/blur effects to the asterisk mark.
================================================================================`;

  const files: ZipEntry[] = [
    { name: '01-snpi-logo-blue-on-white-1024.png', data: await toUint8(blueOnWhiteBlob) },
    { name: '02-snpi-logo-white-on-royal-1024.png', data: await toUint8(whiteOnRoyalBlob) },
    { name: '03-snpi-logo-white-on-dark-1024.png', data: await toUint8(whiteOnDarkBlob) },
    { name: '04-snpi-logo-dark-on-white-1024.png', data: await toUint8(darkOnWhiteBlob) },
    { name: '05-snpi-logo-transparent-1024.png', data: await toUint8(transparentBlob) },
    { name: '06-snpi-avatar-circle-blue-512.png', data: await toUint8(avatarCircleBlueBlob) },
    { name: '07-snpi-avatar-circle-dark-512.png', data: await toUint8(avatarCircleDarkBlob) },
    { name: '08-snpi-avatar-squircle-512.png', data: await toUint8(avatarSquircleBlob) },
    { name: '09-snpi-web-favicon-192.png', data: await toUint8(favicon192Blob) },
    { name: '10-snpi-web-app-icon-512.png', data: await toUint8(favicon512Blob) },
    { name: '11-snpi-brand-logo.svg', data: svgContent },
    { name: 'README-BRAND-STANDARDS.txt', data: readmeContent },
  ];

  const zipUint8 = createZipUint8Array(files);
  const zipBlob = new Blob([zipUint8.buffer as ArrayBuffer], { type: 'application/zip' });
  downloadBlob(zipBlob, 'snpi-brand-media-kit.zip');
}

/**
 * Interactive Save Logo Button with quick download actions.
 */
export function SaveLogoButton({
  className,
  label = 'Save PNG (1024px)',
  variant = 'blue',
}: {
  className?: string;
  label?: string;
  variant?: 'blue' | 'white' | 'dark' | 'light' | 'royal' | 'dark-on-light' | 'transparent';
}) {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setDownloading(true);
      await downloadLogoPng({
        variant,
        filename: `snpi-brand-logo-${variant}-1024.png`,
        dimension: 1024,
      });
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1.5 font-mono text-xs font-bold text-[#0056FF] shadow-2xs transition-colors select-none hover:border-[#0056FF] hover:bg-[#E3E7FC] active:bg-[#CAD3F5] disabled:opacity-60',
        className,
      )}
      title="Save high-resolution logo as PNG (<20MB, lossless)"
      aria-label={label}
    >
      {downloading ? (
        <Check className="size-3.5 shrink-0 text-[#0056FF]" />
      ) : (
        <Download className="size-3.5 shrink-0" />
      )}
      <span>{downloading ? 'Downloaded!' : label}</span>
    </button>
  );
}

/**
 * Unified Brand Media Kit Download Suite:
 * Provides single-click access to:
 * - Media Kit (.ZIP): All 11 brand, profile avatar, and favicon assets in one package (<20MB)
 * - Save PNG: 1024x1024 High-Res Logo PNG
 * - Save SVG: Scalable Vector Graphic
 */
export function BrandMediaKitDownloadSuite({ className }: { className?: string }) {
  const [isZipping, setIsZipping] = React.useState(false);
  const [isPnging, setIsPnging] = React.useState(false);

  const handleZipDownload = async () => {
    try {
      setIsZipping(true);
      await downloadBrandMediaKitZip();
    } finally {
      setTimeout(() => setIsZipping(false), 1000);
    }
  };

  const handlePngDownload = async () => {
    try {
      setIsPnging(true);
      await downloadLogoPng({
        variant: 'light',
        filename: 'snpi-brand-logo-1024.png',
        dimension: 1024,
      });
    } finally {
      setTimeout(() => setIsPnging(false), 800);
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2.5 pt-2', className)}>
      {/* Primary: Media Kit (.ZIP) with All Assets in One Place */}
      <button
        type="button"
        onClick={handleZipDownload}
        disabled={isZipping}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#0048D9] bg-[#0056FF] px-4 py-2 font-mono text-xs font-bold text-white shadow-xs transition-colors select-none hover:bg-[#0048D9] active:bg-[#003bb3] disabled:opacity-70"
        title="Download complete brand media kit with all logo variants, profile avatars, and favicons (.ZIP <20MB)"
      >
        <Archive className="size-4 shrink-0 text-white" />
        <span>{isZipping ? 'Bundling ZIP...' : 'Download Media Kit (.ZIP)'}</span>
      </button>

      {/* Save High-Res PNG (<20MB) */}
      <button
        type="button"
        onClick={handlePngDownload}
        disabled={isPnging}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] px-3.5 py-2 font-mono text-xs font-bold text-[#0056FF] shadow-2xs transition-colors select-none hover:border-[#0056FF] hover:bg-[#E3E7FC] active:bg-[#CAD3F5] disabled:opacity-60"
        title="Download 1024x1024 High-Resolution Logo PNG (<20MB)"
      >
        {isPnging ? (
          <Check className="size-3.5 shrink-0 text-[#0056FF]" />
        ) : (
          <Download className="size-3.5 shrink-0" />
        )}
        <span>{isPnging ? 'Downloaded!' : 'Save PNG (1024px)'}</span>
      </button>

      {/* Save SVG Vector */}
      <button
        type="button"
        onClick={() => downloadOriginalLogo('snpi-brand-logo.svg')}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-mono text-xs font-bold text-slate-700 shadow-2xs transition-colors select-none hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100"
        title="Download Scalable Vector Graphic (SVG, pure vector)"
      >
        <Download className="size-3.5 shrink-0 text-slate-500" />
        <span>Save SVG</span>
      </button>
    </div>
  );
}
