/**
 * 20 UNIVERSAL LAWS OF INTERFACE MOTION & MICRO-INTERACTION ENGINEERING
 *
 * Authoritative, type-safe animation constants, easing vectors, transition presets,
 * and Framer/Motion variant factories strictly implementing all 20 Motion Laws:
 *
 * 1.  Ease-out for entrances
 * 2.  Dropdowns at 150-250ms
 * 3.  Stagger list rows by 30ms
 * 4.  Scale to 0.97 on press
 * 5.  Stretch moving knobs 12%
 * 6.  Stagger as details settle
 * 7.  Arcs for object movement
 * 8.  Pulse to confirm success
 * 9.  Ease-in-out for moves
 * 10. Start popovers at 0.95
 * 11. Enter from the trigger
 * 12. Exit to the trigger
 * 13. No bounce on everyday UI
 * 14. Don't tween while held
 * 15. Make exits 20% shorter
 * 16. Overlap old & new states
 * 17. Masks for reveals & colour
 * 18. Crossfade icons + blur
 * 19. Rubber band past bounds
 * 20. Reuse the same layoutId
 */

import type { Transition, Variants } from 'motion/react';

// ============================================================================
// LAW 1: EASE-OUT FOR ENTRANCES
// ============================================================================
/**
 * Law 1: All entering elements must use a prompt ease-out deceleration curve.
 * Immediate reaction on trigger, with gentle deceleration upon settling.
 */
export const MOTION_EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const MOTION_EASE_OUT_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';

// ============================================================================
// LAW 2 & LAW 15: DROPDOWN TIMINGS (150-250ms & EXITS 20% SHORTER)
// ============================================================================
/**
 * Law 2: Dropdowns must open between 150ms and 250ms (canonical: 200ms).
 * Law 15: Exits must always be 20% shorter in duration than entrances (160ms).
 */
export const DROPDOWN_ENTRANCE_DURATION = 0.2; // 200ms
export const DROPDOWN_EXIT_DURATION = 0.16; // 160ms (20% shorter)
export const EXIT_DURATION_RATIO = 0.8; // 20% shorter

export const DROPDOWN_TRANSITION_ENTER: Transition = {
  duration: DROPDOWN_ENTRANCE_DURATION,
  ease: MOTION_EASE_OUT,
};

export const DROPDOWN_TRANSITION_EXIT: Transition = {
  duration: DROPDOWN_EXIT_DURATION,
  ease: [0.7, 0, 0.84, 0], // Fast exit ease-in
};

// ============================================================================
// LAW 3: STAGGER LIST ROWS BY 30ms
// ============================================================================
/**
 * Law 3: Sequenced lists, menu items, table rows, and card grids must stagger
 * each sequential row by exactly 30ms (0.03s).
 */
export const STAGGER_LIST_ROW_DELAY = 0.03; // 30ms

export const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_LIST_ROW_DELAY,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: STAGGER_LIST_ROW_DELAY * EXIT_DURATION_RATIO,
      staggerDirection: -1,
    },
  },
};

export const listRowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: MOTION_EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.18 * EXIT_DURATION_RATIO,
    },
  },
};

// ============================================================================
// LAW 4: SCALE TO 0.97 ON PRESS
// ============================================================================
/**
 * Law 4: Interactive buttons, cards, and list triggers scale down to 0.97
 * on active touch or mouse press.
 */
export const WHILE_TAP_SCALE = 0.97;

export const tapScaleProps = {
  whileTap: { scale: WHILE_TAP_SCALE },
  transition: { type: 'spring', damping: 25, stiffness: 450 },
} as const;

export const tapScaleCss = 'active:scale-[0.97] transition-transform duration-100';

// ============================================================================
// LAW 5: STRETCH MOVING KNOBS 12%
// ============================================================================
/**
 * Law 5: Translating knobs (toggle switch thumb, slider handle) must stretch
 * by 12% along the axis of movement (scaleX: 1.12) during translation and
 * recover to 1.0 when settled.
 */
export const KNOB_STRETCH_RATIO = 1.12;

/**
 * Transition configuration for moving knobs adhering to Law 5 and Law 13.
 * Separates spring for positional travel (x) from keyframe easing for stretch (scaleX)
 * to strictly comply with Motion's two-keyframe spring rule.
 */
export const switchKnobTransition = {
  x: {
    type: 'spring' as const,
    damping: 30, // Critically damped >= 25 (zero bounce)
    stiffness: 420,
    restDelta: 0.001,
  },
  scaleX: {
    duration: 0.22,
    ease: MOTION_EASE_OUT,
    times: [0, 0.5, 1],
  },
};

export const switchThumbMotionVariants: Variants = {
  unchecked: {
    x: 0,
    scaleX: 1.0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 420,
      restDelta: 0.001,
    },
  },
  movingRight: {
    scaleX: KNOB_STRETCH_RATIO,
  },
  checked: {
    x: 20, // 20px translation for standard 44px switch track
    scaleX: 1.0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 420,
      restDelta: 0.001,
    },
  },
};

// ============================================================================
// LAW 6: STAGGER AS DETAILS SETTLE
// ============================================================================
/**
 * Law 6: When parent panels, accordions, or drawer cards expand, secondary
 * internal details must settle with staggered micro-delays (40ms).
 */
export const STAGGER_DETAILS_SETTLE_DELAY = 0.04; // 40ms

export const detailsContainerVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.24,
      ease: MOTION_EASE_OUT,
      when: 'beforeChildren',
      staggerChildren: STAGGER_DETAILS_SETTLE_DELAY,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.24 * EXIT_DURATION_RATIO,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

export const detailItemVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: MOTION_EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.18 * EXIT_DURATION_RATIO,
    },
  },
};

// ============================================================================
// LAW 7: ARCS FOR OBJECT MOVEMENT
// ============================================================================
/**
 * Law 7: Objects translating across screen coordinates must follow curved
 * 2D arc paths rather than rigid mechanical diagonals.
 */
export const arcKeyframes = {
  x: [0, 18, 50],
  y: [0, -12, 0], // subtle upward arc peak at midpoint
  transition: {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

// ============================================================================
// LAW 8: PULSE TO CONFIRM SUCCESS
// ============================================================================
/**
 * Law 8: Successful operations (save, copy, submit, checkmark) must trigger
 * a subtle confirmation pulse scaling up to 1.06 and returning to 1.0.
 */
export const SUCCESS_PULSE_SCALE = 1.06;

export const successPulseVariants: Variants = {
  idle: { scale: 1 },
  success: {
    scale: [1, SUCCESS_PULSE_SCALE, 1],
    transition: {
      duration: 0.28,
      times: [0, 0.45, 1],
      ease: MOTION_EASE_OUT,
    },
  },
};

// ============================================================================
// LAW 9: EASE-IN-OUT FOR MOVES
// ============================================================================
/**
 * Law 9: Moving an already-visible element from position A to position B
 * must use ease-in-out curves for smooth acceleration and deceleration.
 */
export const MOTION_EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const MOTION_EASE_IN_OUT_CSS = 'cubic-bezier(0.65, 0, 0.35, 1)';

// ============================================================================
// LAW 10: START POPOVERS AT 0.95
// LAW 11: ENTER FROM THE TRIGGER
// LAW 12: EXIT TO THE TRIGGER
// ============================================================================
/**
 * Law 10: Popovers, tooltips, dialogs, and flyout menus mount at initial scale 0.95.
 * Law 11: Origin is anchored to trigger position (originY: 0, originX: 0.5).
 * Law 12: Collapses back towards trigger position on exit.
 */
export const POPOVER_INITIAL_SCALE = 0.95;

export const popoverMotionVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: POPOVER_INITIAL_SCALE,
    transformOrigin: 'top center',
    transition: {
      duration: DROPDOWN_EXIT_DURATION,
      ease: [0.7, 0, 0.84, 0],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transformOrigin: 'top center',
    transition: {
      duration: DROPDOWN_ENTRANCE_DURATION,
      ease: MOTION_EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    scale: POPOVER_INITIAL_SCALE,
    transformOrigin: 'top center',
    transition: {
      duration: DROPDOWN_EXIT_DURATION,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

// ============================================================================
// LAW 13: NO BOUNCE ON EVERYDAY UI
// ============================================================================
/**
 * Law 13: Daily interface controls (buttons, selects, inputs, forms) must have
 * zero bounce or cartoonish overshoot. Enforce critically damped springs (damping >= 25).
 */
export const EVERYDAY_SPRING_NO_BOUNCE: Transition = {
  type: 'spring',
  damping: 30, // Critically damped (>= 25 guarantees zero bounce)
  stiffness: 400,
  restDelta: 0.001,
};

// ============================================================================
// LAW 14: DON'T TWEEN WHILE HELD
// ============================================================================
/**
 * Law 14: Direct pointer interactions (dragging, active holds) bypass tween
 * interpolation lag for instant 1:1 tactile response.
 */
export const HELD_DIRECT_INTERACTION: Transition = {
  duration: 0,
};

// ============================================================================
// LAW 16: OVERLAP OLD & NEW STATES
// ============================================================================
/**
 * Law 16: View transitions, tab switches, and segment replacements must
 * overlap crossfading (mode="sync" in AnimatePresence) rather than waiting
 * for sequential exit before mount.
 */
export const OVERLAP_PRESENCE_CONFIG = {
  mode: 'sync' as const,
  initial: false,
};

export const crossfadeStateVariants: Variants = {
  initial: { opacity: 0, y: 4 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: MOTION_EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.14, ease: [0.7, 0, 0.84, 0] },
  },
};

// ============================================================================
// LAW 17: MASKS FOR REVEALS & COLOUR
// ============================================================================
/**
 * Law 17: Color sweeps, image wipes, and progress reveals use CSS clip-path
 * masks rather than layout shifts.
 */
export const maskRevealVariants: Variants = {
  hidden: {
    clipPath: 'inset(0% 100% 0% 0%)',
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.32,
      ease: MOTION_EASE_OUT,
    },
  },
  exit: {
    clipPath: 'inset(0% 0% 0% 100%)',
    transition: {
      duration: 0.25,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

// ============================================================================
// LAW 18: CROSSFADE ICONS + BLUR
// ============================================================================
/**
 * Law 18: Morphing or swapping between two icons (e.g. Copy -> Check, Chevron -> Close)
 * executes as an optical crossfade with 4px blur to prevent geometric snapping.
 */
export const iconCrossfadeBlurVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(4px)',
    scale: 0.88,
    transition: {
      duration: 0.12,
    },
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.16,
      ease: MOTION_EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(4px)',
    scale: 0.88,
    transition: {
      duration: 0.12,
    },
  },
};

// ============================================================================
// LAW 19: RUBBER BAND PAST BOUNDS
// ============================================================================
/**
 * Law 19: Draggable surfaces and pull-to-refresh panels pulled past boundary
 * limits must provide increasing logarithmic/spring resistance.
 */
export const RUBBER_BAND_DRAG_CONFIG = {
  dragElastic: 0.15, // High resistance past bounds
  dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
  dragTransition: { bounceStiffness: 400, bounceDamping: 32 },
};

// ============================================================================
// LAW 20: REUSE THE SAME LAYOUTID
// ============================================================================
/**
 * Law 20: Reusable shared layout indicators across tabs, segmented controls,
 * and nav bars must preserve identical layoutId strings to morph smoothly.
 */
export const SHARED_LAYOUT_IDS = {
  ACTIVE_NAV_PILL: 'snp-active-nav-pill',
  TAB_INDICATOR: 'snp-active-tab-indicator',
  SEGMENT_SLIDER: 'snp-segment-slider',
  ACCORDION_FOCUS: 'snp-accordion-focus-ring',
} as const;
