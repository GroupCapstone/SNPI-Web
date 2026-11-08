'use client';

import DOMPurify from 'dompurify';
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  RotateCcw,
  RotateCw,
  Minus,
  ShieldCheck,
  Check,
  FileText,
  Terminal,
  CircleAlert,
  Bin,
  SquarePen,
} from '@/components/icons';

// ============================================================================
// 04 ALLOWLIST SANITIZER & 05 URL SCHEME GUARD
// ============================================================================

const ALLOWED_TAGS_LIST = [
  'B',
  'STRONG',
  'I',
  'EM',
  'U',
  'S',
  'STRIKE',
  'H1',
  'H2',
  'H3',
  'H4',
  'P',
  'BR',
  'UL',
  'OL',
  'LI',
  'BLOCKQUOTE',
  'CODE',
  'PRE',
  'HR',
  'A',
];

/**
 * Sanitizes rich-text HTML with DOMPurify using the project's tag/attribute
 * allowlist. DOMPurify also enforces the URL-scheme guard (javascript:,
 * data:, vbscript: and other dangerous schemes are stripped from href).
 */
let linkHookInstalled = false;
function installLinkHook(): void {
  if (linkHookInstalled || typeof window === 'undefined') return;
  linkHookInstalled = true;
  // Match the previous sanitizer: external links always open safely.
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.hasAttribute('href')) {
      node.setAttribute('rel', 'noopener nofollow');
      node.setAttribute('target', '_blank');
    }
  });
}

export function sanitizeHtmlAllowlist(rawHtml: string): string {
  installLinkHook();
  if (typeof window === 'undefined') return rawHtml;
  if (!rawHtml || !rawHtml.trim()) return '';
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ALLOWED_TAGS_LIST.map((tag) => tag.toLowerCase()),
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
}

// ============================================================================
// RICH TEXT EDITOR COMPONENT
// ============================================================================

export interface RichTextEditorProps {
  initialContent?: string;
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
}

export function RichTextEditor({
  initialContent,
  value,
  onChange,
  placeholder = 'Type institutional document content here...',
  className,
  minHeight = 220,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);

  // 06 HTML Source View state
  const [isHtmlView, setIsHtmlView] = React.useState<boolean>(false);
  const [rawHtml, setRawHtml] = React.useState<string>(initialContent || value || '');
  const [sanitizedNotice, setSanitizedNotice] = React.useState<string | null>(null);

  // Live telemetry metrics
  const [metrics, setMetrics] = React.useState({ words: 0, chars: 0, readTime: 1 });

  // 03 Live State Sync for active formatting buttons
  const [activeStates, setActiveStates] = React.useState<{ [key: string]: boolean }>({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    h1: false,
    h2: false,
    h3: false,
    blockquote: false,
  });

  // Calculate live telemetry
  const updateMetrics = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const text = editorRef.current?.innerText || '';
    const cleanText = text.trim();
    const words = cleanText ? cleanText.split(/\s+/).length : 0;
    const chars = text.length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    setMetrics({ words, chars, readTime });
  }, []);

  // Sync content when value or initialContent changes externally
  React.useEffect(() => {
    const targetContent = value !== undefined ? value : initialContent;
    if (targetContent !== undefined && editorRef.current) {
      const sanitized = sanitizeHtmlAllowlist(targetContent);
      if (editorRef.current.innerHTML !== sanitized) {
        editorRef.current.innerHTML = sanitized;
        setRawHtml(sanitized);
        updateMetrics();
      }
    }
  }, [value, initialContent, updateMetrics]);

  // 03 Live State Sync: queries active document command state under current caret
  const updateActiveStates = React.useCallback(() => {
    if (isHtmlView || typeof document === 'undefined') return;

    try {
      const block = (document.queryCommandValue('formatBlock') || '').toLowerCase();

      setActiveStates({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        h1: block === 'h1',
        h2: block === 'h2',
        h3: block === 'h3',
        blockquote: block === 'blockquote',
      });
    } catch {
      // Ignored if queryCommandState is unavailable
    }
    updateMetrics();
  }, [isHtmlView, updateMetrics]);

  // 02 Command Toolbar execution seam
  const exec = (command: string, cmdValue: string | undefined = undefined) => {
    if (isHtmlView) return;
    document.execCommand(command, false, cmdValue);
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setRawHtml(html);
      onChange?.(html);
    }
    updateActiveStates();
  };

  // URL Scheme Guard when adding hyperlinks
  const handleInsertLink = () => {
    if (isHtmlView) return;
    const url = window.prompt('Enter link URL (e.g. https://snpi.edu.kh):', 'https://');
    if (!url) return;

    const trimmed = url.trim();
    const lower = trimmed.toLowerCase();

    // URL Scheme Guard: reject javascript:, data:, vbscript:
    if (
      lower.startsWith('javascript:') ||
      lower.startsWith('data:') ||
      lower.startsWith('vbscript:')
    ) {
      setSanitizedNotice('Blocked unsafe URL scheme (javascript: / data:). Link was rejected.');
      setTimeout(() => setSanitizedNotice(null), 3500);
      return;
    }

    const safeUrl =
      lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('mailto:')
        ? trimmed
        : `https://${trimmed}`;

    document.execCommand('createLink', false, safeUrl);

    // Apply rel="noopener nofollow" and target="_blank"
    if (editorRef.current) {
      const links = editorRef.current.querySelectorAll('a');
      links.forEach((a) => {
        a.setAttribute('rel', 'noopener nofollow');
        a.setAttribute('target', '_blank');
      });
      const html = editorRef.current.innerHTML;
      setRawHtml(html);
      onChange?.(html);
    }
    updateActiveStates();
  };

  // 04 Allowlist Sanitizer: Intercept onPaste
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const htmlData = e.clipboardData.getData('text/html');
    const textData = e.clipboardData.getData('text/plain');

    const cleanHtml = htmlData ? sanitizeHtmlAllowlist(htmlData) : textData;
    document.execCommand('insertHTML', false, cleanHtml);

    setSanitizedNotice('Pasted HTML stripped to safe allowlist (scripts & foreign tags removed).');
    setTimeout(() => setSanitizedNotice(null), 3500);

    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setRawHtml(html);
      onChange?.(html);
    }
    updateActiveStates();
  };

  // Keyboard Shortcuts: Ctrl/Cmd + B, I, U, K, Z
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (key === 'b') {
        e.preventDefault();
        exec('bold');
      } else if (key === 'i') {
        e.preventDefault();
        exec('italic');
      } else if (key === 'u') {
        e.preventDefault();
        exec('underline');
      } else if (key === 'k') {
        e.preventDefault();
        handleInsertLink();
      }
    }
  };

  // 06 HTML Source View Toggle
  const toggleHtmlView = () => {
    if (isHtmlView) {
      // Switching from HTML source view back to visual WYSIWYG
      const clean = sanitizeHtmlAllowlist(rawHtml);
      setRawHtml(clean);
      if (editorRef.current) {
        editorRef.current.innerHTML = clean;
      }
      setIsHtmlView(false);
      onChange?.(clean);
      setTimeout(updateMetrics, 50);
    } else {
      // Switching from WYSIWYG to raw HTML textarea
      if (editorRef.current) {
        setRawHtml(editorRef.current.innerHTML);
      }
      setIsHtmlView(true);
    }
  };

  // Content change handler
  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setRawHtml(html);
      onChange?.(html);
    }
    updateActiveStates();
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white text-slate-900 shadow-xs transition-all',
        className,
      )}
    >
      {/* ======================================================== */}
      {/* 02 HIGH-TECH COMMAND TOOLBAR (role="toolbar")            */}
      {/* 07 Selection-Safe Buttons (onMouseDown preventDefault)   */}
      {/* ======================================================== */}
      <div
        role="toolbar"
        aria-label="Formatting controls"
        className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#CAD3F5] bg-[#EFF5FF]/80 px-3 py-2 font-mono text-xs backdrop-blur-xs select-none"
      >
        <div className="flex flex-wrap items-center gap-1">
          {/* History Group: Undo & Redo */}
          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('undo')}
            title="Undo (Ctrl+Z / ⌘Z)"
            aria-label="Undo"
            className="flex size-7 items-center justify-center rounded-[5px] border border-transparent text-slate-700 transition-all hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF] active:scale-95 disabled:opacity-40"
          >
            <RotateCcw className="size-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('redo')}
            title="Redo (Ctrl+Y / ⌘⇧Z)"
            aria-label="Redo"
            className="flex size-7 items-center justify-center rounded-[5px] border border-transparent text-slate-700 transition-all hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF] active:scale-95 disabled:opacity-40"
          >
            <RotateCw className="size-3.5" />
          </button>

          <span className="mx-1 h-4 w-[1px] bg-[#CAD3F5]" />

          {/* Inline Text Styles: Bold, Italic, Underline, Strikethrough */}
          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('bold')}
            title="Bold (⌘B)"
            aria-label="Bold (Ctrl+B)"
            aria-pressed={activeStates.bold}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.bold
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Bold className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('italic')}
            title="Italic (⌘I)"
            aria-label="Italic (Ctrl+I)"
            aria-pressed={activeStates.italic}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.italic
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Italic className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('underline')}
            title="Underline (⌘U)"
            aria-label="Underline (Ctrl+U)"
            aria-pressed={activeStates.underline}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.underline
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Underline className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('strikeThrough')}
            title="Strikethrough"
            aria-label="Strikethrough"
            aria-pressed={activeStates.strikeThrough}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.strikeThrough
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Strikethrough className="size-3.5" />
          </button>

          <span className="mx-1 h-4 w-[1px] bg-[#CAD3F5]" />

          {/* Heading Levels: H1, H2, H3 */}
          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('formatBlock', activeStates.h1 ? '<p>' : '<h1>')}
            title="Heading 1"
            aria-label="Heading 1"
            aria-pressed={activeStates.h1}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.h1
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Heading1 className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('formatBlock', activeStates.h2 ? '<p>' : '<h2>')}
            title="Heading 2"
            aria-label="Heading 2"
            aria-pressed={activeStates.h2}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.h2
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Heading2 className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('formatBlock', activeStates.h3 ? '<p>' : '<h3>')}
            title="Heading 3"
            aria-label="Heading 3"
            aria-pressed={activeStates.h3}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.h3
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Heading3 className="size-3.5" />
          </button>

          <span className="mx-1 h-4 w-[1px] bg-[#CAD3F5]" />

          {/* Structure: Bullet List, Numbered List, Quote, Code Block, Divider */}
          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('insertUnorderedList')}
            title="Bullet list"
            aria-label="Bullet list"
            aria-pressed={activeStates.insertUnorderedList}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.insertUnorderedList
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <List className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('insertOrderedList')}
            title="Numbered list"
            aria-label="Numbered list"
            aria-pressed={activeStates.insertOrderedList}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.insertOrderedList
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <ListOrdered className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('formatBlock', activeStates.blockquote ? '<p>' : '<blockquote>')}
            title="Quote block"
            aria-label="Quote block"
            aria-pressed={activeStates.blockquote}
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px] border transition-all active:scale-95',
              activeStates.blockquote
                ? 'border-[#0056FF] bg-[#E3E7FC] font-black text-[#0056FF] shadow-2xs'
                : 'border-transparent text-slate-700 hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF]',
            )}
          >
            <Quote className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('formatBlock', '<pre>')}
            title="Code block"
            aria-label="Code block"
            className="flex size-7 items-center justify-center rounded-[5px] border border-transparent text-slate-700 transition-all hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF] active:scale-95"
          >
            <Terminal className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('insertHorizontalRule')}
            title="Horizontal Divider Line"
            aria-label="Insert Divider Line"
            className="flex size-7 items-center justify-center rounded-[5px] border border-transparent text-slate-700 transition-all hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF] active:scale-95"
          >
            <Minus className="size-3.5" />
          </button>

          <span className="mx-1 h-4 w-[1px] bg-[#CAD3F5]" />

          {/* Link & Clear Format */}
          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleInsertLink}
            title="Insert Safe Hyperlink (⌘K)"
            aria-label="Insert Link (Ctrl+K)"
            className="flex size-7 items-center justify-center rounded-[5px] border border-transparent text-slate-700 transition-all hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF] active:scale-95"
          >
            <LinkIcon className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlView}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('removeFormat')}
            title="Clear Formatting"
            aria-label="Clear formatting"
            className="flex size-7 items-center justify-center rounded-[5px] border border-transparent font-mono text-[11px] font-bold text-slate-500 transition-all hover:border-[#CAD3F5] hover:bg-white hover:text-[#0056FF] active:scale-95"
          >
            T<span className="text-[9px] line-through">x</span>
          </button>
        </div>

        {/* 06 Modern Visual / HTML Source Segmented Mode Switch */}
        <div className="flex items-center rounded-lg border border-[#CAD3F5] bg-[#E3E7FC]/60 p-0.5">
          <button
            type="button"
            onClick={() => {
              if (isHtmlView) toggleHtmlView();
            }}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-bold transition-all',
              !isHtmlView
                ? 'border border-[#CAD3F5] bg-white text-[#0056FF] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900',
            )}
          >
            <SquarePen className="size-3 text-[#0056FF]" />
            <span>Visual</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isHtmlView) toggleHtmlView();
            }}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-bold transition-all',
              isHtmlView
                ? 'border border-[#CAD3F5] bg-white text-[#0056FF] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900',
            )}
          >
            <Code className="size-3 text-[#0056FF]" />
            <span>&lt;/&gt; HTML</span>
          </button>
        </div>
      </div>

      {/* Sanitized notice banner */}
      {sanitizedNotice && (
        <div className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-4 py-2 font-mono text-xs font-semibold text-emerald-800">
          <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
          <span>{sanitizedNotice}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 01 CONTENTEDITABLE SURFACE vs 06 HTML SOURCE VIEW        */}
      {/* ======================================================== */}
      {isHtmlView ? (
        <textarea
          value={rawHtml}
          onChange={(e) => {
            setRawHtml(e.target.value);
            const text = e.target.value;
            const cleanText = text.trim();
            const words = cleanText ? cleanText.split(/\s+/).length : 0;
            setMetrics({
              words,
              chars: text.length,
              readTime: Math.max(1, Math.ceil(words / 200)),
            });
          }}
          style={{ minHeight: `${minHeight}px` }}
          aria-label="Raw HTML Source"
          className="w-full resize-y border-none bg-[#0A1A4A] p-5 font-mono text-xs leading-relaxed text-cyan-200 outline-none selection:bg-[#0056FF] selection:text-white"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          role="textbox"
          aria-multiline="true"
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onKeyUp={updateActiveStates}
          onMouseUp={updateActiveStates}
          data-placeholder={placeholder}
          style={{ minHeight: `${minHeight}px` }}
          className={cn(
            'p-5 font-sans text-sm leading-relaxed text-[#0A1A4A] transition-colors outline-none selection:bg-[#E3E7FC] selection:text-[#0056FF] focus:outline-none sm:p-6',
            '[&_h1]:mt-2 [&_h1]:mb-3 [&_h1]:border-b [&_h1]:border-slate-100 [&_h1]:pb-2 [&_h1]:text-xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-[#0A1A4A]',
            '[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#0A1A4A]',
            '[&_h3]:mt-3 [&_h3]:mb-1.5 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-800',
            '[&_p]:mb-3 [&_p]:text-[13.5px] [&_p]:leading-relaxed [&_p]:text-slate-700',
            '[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-slate-700',
            '[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_ol]:text-slate-700',
            '[&_blockquote]:my-3.5 [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-[3.5px] [&_blockquote]:border-[#0056FF] [&_blockquote]:bg-[#EFF5FF] [&_blockquote]:p-3.5 [&_blockquote]:text-[#0A1A4A] [&_blockquote]:italic [&_blockquote]:shadow-2xs',
            '[&_pre]:my-3.5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-slate-800 [&_pre]:bg-[#0A1A4A] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:text-cyan-200',
            '[&_code]:rounded-md [&_code]:border [&_code]:border-[#CAD3F5]/80 [&_code]:bg-[#E3E7FC] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:font-bold [&_code]:text-[#0056FF]',
            '[&_a]:font-medium [&_a]:text-[#0056FF] [&_a]:underline [&_a]:decoration-[#0056FF]/40 [&_a]:underline-offset-2 [&_a]:hover:text-[#2277FF]',
            '[&_hr]:my-4 [&_hr]:border-t [&_hr]:border-[#CAD3F5]',
          )}
        />
      )}

      {/* Editor Telemetry & Status Bar */}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#CAD3F5] bg-[#EFF5FF]/80 px-4 py-2.5 font-mono text-[11px] text-slate-600">
        <div className="flex flex-wrap items-center gap-3.5">
          <span className="font-semibold text-slate-600">
            Words: <strong className="font-bold text-slate-900">{metrics.words}</strong>
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-semibold text-slate-600">
            Characters: <strong className="font-bold text-slate-900">{metrics.chars}</strong>
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500">
            Shortcuts:{' '}
            <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5">⌘B</kbd>{' '}
            <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5">⌘I</kbd>{' '}
            <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5">⌘U</kbd>{' '}
            <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5">⌘K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE DOCUMENTATION DEMO: RichTextEditorDemo
// ============================================================================

const SAMPLE_DOCUMENT = `<h1>SNPI-SMS Autonomous Academic Charter</h1>
<p>The <strong>State Network Polytechnic Institute (SNPI)</strong> enforces strict data sovereignty, academic credential integrity, and multi-tenant isolation across all distributed campus nodes.</p>`;

const SAMPLE_POLICY = `<h2>Institutional Cloud Data Governance</h2>
<p>Under the <em>SNPI Technical Security Standard</em>, all student transcript requests require dual-officer biometric or MFA authentication.</p>
<ul>
  <li>Multi-Campus Replication across Phnom Penh, Siem Reap, and Battambang</li>
  <li>Automated 24-hour snapshot recovery gates</li>
  <li>Immutable audit trails recording all grade modifications</li>
</ul>`;

export function RichTextEditorDemo() {
  const [editorContent, setEditorContent] = React.useState<string>(SAMPLE_DOCUMENT);
  const [testFeedback, setTestFeedback] = React.useState<string | null>(null);

  const simulateXssPaste = () => {
    const dirtyHtml = `
      <div style="background: red; font-size: 32px; color: yellow;">
        <h3>Suspicious Exploit Vector Test</h3>
        <script>alert('MALICIOUS SCRIPT EXECUTED - SHOULD BE STRIPPED');</script>
        <p style="color: blue;">Legitimate content preserved without dangerous markup.</p>
        <a href="javascript:alert('XSS_ATTACK')">Dangerous Injected Link</a>
        <a href="https://snpi.edu.kh">Legitimate Educational Link</a>
        <iframe src="https://untrusted-external-site.com" width="400" height="200"></iframe>
      </div>
    `;
    const clean = sanitizeHtmlAllowlist(dirtyHtml);
    setEditorContent((prev) => `${prev}<hr/>${clean}`);
    setTestFeedback(
      'Simulated Dirty Paste: <script>, <iframe>, inline styling, and javascript: links were intercepted and cleanly stripped by the allowlist sanitizer.',
    );
    setTimeout(() => setTestFeedback(null), 5000);
  };

  const handleResetDocument = () => {
    setEditorContent(SAMPLE_DOCUMENT);
    setTestFeedback('Restored default SNPI-SMS Academic Charter template.');
    setTimeout(() => setTestFeedback(null), 3000);
  };

  const handleLoadPolicy = () => {
    setEditorContent(SAMPLE_POLICY);
    setTestFeedback('Loaded Institutional Cloud Data Governance template.');
    setTimeout(() => setTestFeedback(null), 3000);
  };

  const handleClear = () => {
    setEditorContent('<p></p>');
    setTestFeedback('Canvas cleared.');
    setTimeout(() => setTestFeedback(null), 2500);
  };

  return (
    <div
      className="w-full space-y-4"
      onClickCapture={(e) => {
        // Demo guard: links inside sample content never navigate away.
        if ((e.target as HTMLElement).closest('a')) e.preventDefault();
      }}
    >
      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-[#CAD3F5] bg-white p-2.5 shadow-2xs sm:px-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="pr-1 font-mono text-[10px] font-bold text-slate-400 uppercase">
            Templates:
          </span>
          <button
            type="button"
            onClick={handleResetDocument}
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700 transition-all hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF] active:scale-95"
          >
            Academic Charter
          </button>
          <button
            type="button"
            onClick={handleLoadPolicy}
            className="cursor-pointer rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700 transition-all hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF] active:scale-95"
          >
            Data Policy
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={simulateXssPaste}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700 transition-all hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF] active:scale-95"
          >
            <ShieldCheck className="size-3 text-[#0056FF]" />
            <span>Test Sanitizer Paste</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            title="Clear canvas"
            className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
          >
            <Bin className="size-3" />
          </button>
        </div>
      </div>

      {/* Real-time Test Feedback Banner */}
      {testFeedback && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 font-mono text-xs font-semibold text-emerald-900 shadow-2xs">
          <Check className="size-4 shrink-0 text-emerald-600" />
          <span>{testFeedback}</span>
        </div>
      )}

      {/* The Redesigned Rich Text Editor Instance */}
      <RichTextEditor
        value={editorContent}
        onChange={setEditorContent}
        placeholder="Draft your institutional report or policy document..."
        minHeight={260}
      />
    </div>
  );
}
