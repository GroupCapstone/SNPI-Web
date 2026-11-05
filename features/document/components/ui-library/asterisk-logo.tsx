'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Download, Archive, Check } from '@/components/icons';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  /**
   * Visual variant:
   * - standard: Light mode: Pure White tile with Royal Blue (#0056FF) Sora asterisk; Dark mode: Obsidian Slate (#020617) tile with White Sora asterisk
   * - brand / solid: Royal Blue (#0056FF) gradient squircle tile with crisp White Sora asterisk
   * - tint: Ice Tint (#EFF5FF) tile with Royal Blue (#0056FF) Sora asterisk
   * - outline: 2px border with Royal Blue (#0056FF) Sora asterisk
   * - bare: Transparent background, pure Sora bold asterisk vector mark in Royal Blue (#0056FF)
   */
  variant?: 'standard' | 'brand' | 'solid' | 'tint' | 'outline' | 'bare' | 'success';
  mode?: 'light' | 'dark';
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient';
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
 */
export const SORA_BOLD_ASTERISK_PATH =
  'M 77.75 75.73 L 55.16 58.98 L 55.16 41.02 L 77.75 24.27 L 87.48 41.62 L 69.67 48.65 L 69.67 51.35 L 87.48 58.38 Z M 56.96 12.00 L 53.81 39.98 L 38.26 48.95 L 12.52 37.73 L 22.55 20.68 L 37.66 32.50 L 39.90 31.15 L 37.06 12.30 Z M 12.52 62.27 L 38.26 51.05 L 53.81 60.02 L 56.96 88.00 L 37.21 87.70 L 39.90 68.85 L 37.66 67.50 L 22.70 79.32 Z';

/**
 * Pure Vector Glyph for the Sora Bold Asterisk Brand Mark
 * Solid vector rendering with zero baseline shift, zero text selection artifacts, and zero font metric wobble.
 */
export function AsteriskVectorGlyph({
  color = '#0056FF',
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: {
  color?: string;
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
        strokeWidth="1.5"
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
 * Rendered using the original bold Sora typeface geometric asterisk as a pure, mathematically centered vector logo.
 * STRICT POLICY: Motionless and stable. Zero hover scaling, zero jumping, zero animation events.
 * Brand Color Standard: Pure Brand Blue (#0056FF / #2277FF) on light canvas; Crisp White (#FFFFFF) on dark/royal surfaces.
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'standard',
  mode = 'light',
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: AsteriskLogoProps) {
  // Determine glyph color: only blue (#0056FF) on light canvas; pure white (#FFFFFF) on dark surfaces
  const isDarkSurface = mode === 'dark' || variant === 'solid' || variant === 'brand';
  const glyphColor = isDarkSurface ? '#FFFFFF' : '#0056FF';

  // 'bare' variant: Transparent background, pure vector emblem without container
  if (variant === 'bare') {
    return (
      <div
        className={cn(
          'inline-flex shrink-0 items-center justify-center border-0 bg-transparent p-0 ring-0 select-none',
          BOX_SIZE_CLASSES[size],
          className,
        )}
      >
        <AsteriskVectorGlyph color={glyphColor} ariaLabel={ariaLabel} />
      </div>
    );
  }

  // Squircle Container Styles mapped to brand tokens (Only Blue)
  // Strictly stationary: NO hover:scale, NO transitions, NO transform wobbles
  // Dark mode background strictly uses Obsidian Slate (#020617) as mandated
  const containerClassesByVariant = {
    standard:
      mode === 'dark'
        ? 'bg-[#020617] border border-white/20 ring-4 ring-white/10 shadow-md shadow-black/40'
        : 'bg-white border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10',
    brand:
      'bg-gradient-to-b from-[#0056FF] to-[#0048D9] border border-[#0056FF]/40 ring-4 ring-[#0056FF]/20 shadow-md shadow-[#0056FF]/25',
    solid: 'bg-[#0056FF] border border-white/20 ring-4 ring-white/10 shadow-md shadow-[#0056FF]/20',
    tint:
      mode === 'dark'
        ? 'bg-white/10 border border-white/15'
        : 'bg-[#EFF5FF] border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-2xs',
    outline:
      mode === 'dark'
        ? 'bg-transparent border-2 border-white'
        : 'bg-white border-2 border-[#0056FF] shadow-xs',
    success:
      'bg-white border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10',
  };

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center select-none',
        BOX_SIZE_CLASSES[size],
        containerClassesByVariant[variant],
        className,
      )}
      aria-label={ariaLabel}
      role="img"
    >
      <AsteriskVectorGlyph color={glyphColor} ariaLabel={ariaLabel} />
    </div>
  );
}

/**
 * Backward-compatible AsteriskEmblem export referencing the official bold Sora asterisk vector mark
 */
export interface AsteriskEmblemProps {
  className?: string;
  size?: number | string;
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient';
  ariaLabel?: string;
}

export function AsteriskEmblem({
  className,
  colorVariant = 'brand',
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: AsteriskEmblemProps) {
  const glyphColor =
    colorVariant === 'white' || colorVariant === 'white-accent'
      ? '#FFFFFF'
      : colorVariant === 'current'
        ? 'currentColor'
        : '#0056FF';

  return <AsteriskVectorGlyph color={glyphColor} className={className} ariaLabel={ariaLabel} />;
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
  variant?: 'light' | 'dark' | 'royal' | 'transparent';
  shape?: 'squircle' | 'circle' | 'square' | 'transparent';
  dimension?: number;
}

/**
 * Pure client-side Canvas rasterizer.
 * Renders the Sora Bold Asterisk vector mark cleanly to a lossless PNG Blob.
 * Always well below 20MB (output size typically 50KB to 250KB).
 */
export function renderLogoToCanvas(options: RenderLogoOptions = {}): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Canvas rendering is only available in browser'));
      return;
    }
    const { variant = 'light', shape = 'squircle', dimension = 1024 } = options;

    const canvas = document.createElement('canvas');
    canvas.width = dimension;
    canvas.height = dimension;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas 2D context unavailable'));
      return;
    }

    // Color Mapping - Dark mode strictly uses Obsidian Slate #020617 as requested
    const isDarkSurface = variant === 'dark' || variant === 'royal';
    const bgColor =
      variant === 'dark'
        ? '#020617' // Obsidian Slate default for dark mode
        : variant === 'royal'
          ? '#0056FF' // Royal Blue base
          : variant === 'light'
            ? '#FFFFFF' // Pure Light Canvas
            : null;
    const glyphColor = isDarkSurface ? '#FFFFFF' : '#0056FF';

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

        // Subtle keyline border
        ctx.strokeStyle =
          variant === 'dark'
            ? 'rgba(255, 255, 255, 0.14)'
            : variant === 'royal'
              ? 'rgba(255, 255, 255, 0.25)'
              : '#CAD3F5';
        ctx.lineWidth = Math.max(1, dimension * 0.015);
        ctx.stroke();
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

    // Scale and render Sora Bold Asterisk Vector
    // Mathematical center is exactly at (50, 50) in 100x100 space
    const glyphScale = (dimension * 0.58) / 76;
    ctx.save();
    ctx.translate(dimension / 2, dimension / 2);
    ctx.scale(glyphScale, glyphScale);
    ctx.translate(-50, -50);

    const path = new Path2D(SORA_BOLD_ASTERISK_PATH);
    ctx.fillStyle = glyphColor;
    ctx.fill(path);
    ctx.strokeStyle = glyphColor;
    ctx.lineWidth = 1.5;
    ctx.stroke(path);

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
    variant?: 'light' | 'dark' | 'royal' | 'transparent';
    filename?: string;
    dimension?: number;
    shape?: 'squircle' | 'circle' | 'square';
  } = {},
) {
  const {
    variant = 'light',
    filename = `snpi-brand-logo-${variant}.png`,
    dimension = 1024,
    shape = 'squircle',
  } = options;
  const blob = await renderLogoToCanvas({ variant, shape, dimension });
  downloadBlob(blob, filename);
}

/**
 * Downloads clean SVG vector graphic.
 */
export function downloadOriginalLogo(filename = 'snpi-brand-logo.svg') {
  if (typeof window === 'undefined') return;
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512" fill="none">
  <path d="${SORA_BOLD_ASTERISK_PATH}" fill="#0056FF" stroke="#0056FF" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill-rule="nonzero"/>
</svg>`;
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  downloadBlob(blob, filename);
}

/**
 * Downloads comprehensive Brand Media Kit ZIP containing all logo and profile formats.
 * All files packaged in one click, well below 20MB (total zip ~600KB).
 */
export async function downloadBrandMediaKitZip() {
  if (typeof window === 'undefined') return;

  const [
    lightBlob,
    darkBlob,
    royalBlob,
    transparentBlob,
    avatarCircleBlob,
    avatarDarkCircleBlob,
    avatarSquircleBlob,
    favicon192Blob,
    favicon512Blob,
  ] = await Promise.all([
    renderLogoToCanvas({ variant: 'light', shape: 'squircle', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'dark', shape: 'squircle', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'royal', shape: 'squircle', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'transparent', shape: 'transparent', dimension: 1024 }),
    renderLogoToCanvas({ variant: 'royal', shape: 'circle', dimension: 512 }),
    renderLogoToCanvas({ variant: 'dark', shape: 'circle', dimension: 512 }),
    renderLogoToCanvas({ variant: 'royal', shape: 'squircle', dimension: 512 }),
    renderLogoToCanvas({ variant: 'light', shape: 'squircle', dimension: 192 }),
    renderLogoToCanvas({ variant: 'light', shape: 'squircle', dimension: 512 }),
  ]);

  const toUint8 = async (b: Blob) => new Uint8Array(await b.arrayBuffer());

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1024" height="1024" fill="none">
  <rect width="100" height="100" rx="22" fill="#FFFFFF" stroke="#CAD3F5" stroke-width="1.5"/>
  <path d="${SORA_BOLD_ASTERISK_PATH}" fill="#0056FF" stroke="#0056FF" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill-rule="nonzero"/>
</svg>`;

  const readmeContent = `================================================================================
 SNPI OFFICIAL BRAND MEDIA KIT & ASSET SPECIFICATIONS
================================================================================

Brand Identity: SNPI School Management System (SNP-SMS)
Geometric Foundation: Sora Bold (weight 800) Asterisk Mark (*)

COLOR PALETTE SPECIFICATIONS:
  01. Royal Blue:    #0056FF (RGB 0, 86, 255)   - Primary Base & Light Asterisk Glyph
  02. Azure Blue:    #2277FF (RGB 34, 119, 255) - Interactive Illuminations & Accents
  03. Soft Lavender: #E3E7FC (RGB 227, 231, 252)- Surface Tints & Subtle Borders
  04. White:         #FFFFFF (RGB 255, 255, 255)- Canvas Base & Dark Mode Asterisk Glyph
  05. Ice Tint:      #EFF5FF (RGB 239, 245, 255)- Subsurface Card Fills & Tracks
  Dark Background:   #020617 (RGB 2, 6, 23)     - Obsidian Slate Default for Dark Mode

INCLUDED ASSETS IN THIS PACKAGE:
  01. 01-snpi-logo-light-1024.png          - 1024x1024 High-Res Logo (White Canvas, Royal Blue Asterisk)
  02. 02-snpi-logo-dark-1024.png           - 1024x1024 High-Res Logo (Obsidian Slate #020617, White Asterisk)
  03. 03-snpi-logo-royal-1024.png          - 1024x1024 High-Res Logo (Royal Blue #0056FF, White Asterisk)
  04. 04-snpi-logo-transparent-1024.png    - 1024x1024 Pure Vector Raster on Transparent Background
  05. 05-snpi-avatar-circle-512.png        - 512x512 Standard Circular Profile Avatar (Royal Blue)
  06. 06-snpi-avatar-dark-circle-512.png   - 512x512 Standard Circular Profile Avatar (Obsidian Slate #020617)
  07. 07-snpi-avatar-squircle-512.png      - 512x512 Standard Squircle Profile Avatar (512px)
  08. 08-snpi-web-favicon-192.png          - 192x192 Favicon Standard for Web Applications
  09. 09-snpi-web-app-icon-512.png         - 512x512 PWA Web App Manifest Standard Icon
  10. 10-snpi-brand-logo.svg               - Scalable Vector Graphic (Lossless 100% Vector)
  11. README-BRAND-STANDARDS.txt           - This specification manual

FILE SIZE CONSTRAINTS:
  All PNG files in this kit are compressed lossless PNGs well below 20MB
  (typically 50KB to 250KB each).

CLEARSPACE RULES:
  Maintain a minimum clearspace equal to 25% of the asterisk height on all sides.
  Never distort, rotate, stretch, or apply shadows/blur effects to the asterisk mark.
================================================================================`;

  const files: ZipEntry[] = [
    { name: '01-snpi-logo-light-1024.png', data: await toUint8(lightBlob) },
    { name: '02-snpi-logo-dark-1024.png', data: await toUint8(darkBlob) },
    { name: '03-snpi-logo-royal-1024.png', data: await toUint8(royalBlob) },
    { name: '04-snpi-logo-transparent-1024.png', data: await toUint8(transparentBlob) },
    { name: '05-snpi-avatar-circle-512.png', data: await toUint8(avatarCircleBlob) },
    { name: '06-snpi-avatar-dark-circle-512.png', data: await toUint8(avatarDarkCircleBlob) },
    { name: '07-snpi-avatar-squircle-512.png', data: await toUint8(avatarSquircleBlob) },
    { name: '08-snpi-web-favicon-192.png', data: await toUint8(favicon192Blob) },
    { name: '09-snpi-web-app-icon-512.png', data: await toUint8(favicon512Blob) },
    { name: '10-snpi-brand-logo.svg', data: svgContent },
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
  variant = 'light',
}: {
  className?: string;
  label?: string;
  variant?: 'light' | 'dark' | 'royal' | 'transparent';
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
