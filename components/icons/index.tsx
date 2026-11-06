import * as React from 'react';
import * as RawIcons from '@keyline-icons/react/two-tone';
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number | string;
};

export type IconComponent = React.ComponentType<IconProps>;
export type LucideIcon = IconComponent;
export type LucideProps = IconProps;

/**
 * Keyline Two-Tone Standardized Icon Component Wrapper
 * Follows the official Keyline Two-Tone Icon Style Specification:
 * - Color: text-[#020617] default black on light surfaces, text-white on dark/blue surfaces
 * - Stroke: stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
 * - Two-Tone Accent: fill="currentColor" fill-opacity="0.4" stroke="none" (preserved across all icons)
 * - Outline: stroke defines visible lines (stroke-width: 2)
 * - Size: default size-6 (width=24, height=24) across all pages
 * - Background: 100% transparent surface (zero canvas blocks, zero box-shadow, zero backdrop-filter)
 * - Accessibility: aria-hidden="true" focusable="false"
 * - Motionless Integrity: strictly motionless, zero animations, zero hover movement, perfectly stable
 * - Container Border Radius: 4px strictly enforced on icon containers (rounded-[4px])
 */
function wrapIcon(Component: React.ComponentType<IconProps>, name: string): IconComponent {
  const IconWrapper = React.forwardRef<SVGSVGElement, IconProps>(function KeylineTwoToneIcon(
    { className, style, size, ...props },
    ref,
  ) {
    const combinedClassName = cn(
      'keyline-two-tone-icon inline-block shrink-0 bg-transparent size-4.5 text-[#020617]',
      className,
    );

    return (
      <Component
        ref={ref}
        aria-hidden="true"
        focusable="false"
        width={size ?? 18}
        height={size ?? 18}
        className={combinedClassName}
        style={{ backgroundColor: 'transparent', ...style }}
        {...props}
      />
    );
  });
  IconWrapper.displayName = name;
  return IconWrapper;
}

// Raw icon registry
const rawMap = RawIcons as Record<string, React.ComponentType<IconProps>>;

// Export wrapped two-tone rounded icons
export const Accessibility: IconComponent = wrapIcon(rawMap.Accessibility, 'Accessibility');
export const Activity: IconComponent = wrapIcon(rawMap.Activity, 'Activity');
export const ActivitySparkles: IconComponent = wrapIcon(
  rawMap.ActivitySparkles,
  'ActivitySparkles',
);
export const Airplay: IconComponent = wrapIcon(rawMap.Airplay, 'Airplay');
export const Airpods: IconComponent = wrapIcon(rawMap.Airpods, 'Airpods');
export const AirpodsOpen: IconComponent = wrapIcon(rawMap.AirpodsOpen, 'AirpodsOpen');
export const AlarmClock: IconComponent = wrapIcon(rawMap.AlarmClock, 'AlarmClock');
export const AlarmClockCheck: IconComponent = wrapIcon(rawMap.AlarmClockCheck, 'AlarmClockCheck');
export const AlarmClockMinus: IconComponent = wrapIcon(rawMap.AlarmClockMinus, 'AlarmClockMinus');
export const AlarmClockPlus: IconComponent = wrapIcon(rawMap.AlarmClockPlus, 'AlarmClockPlus');
export const Alert: IconComponent = wrapIcon(rawMap.Alert, 'Alert');
export const Alien: IconComponent = wrapIcon(rawMap.Alien, 'Alien');
export const AlignCenter: IconComponent = wrapIcon(rawMap.AlignCenter, 'AlignCenter');
export const AlignJustify: IconComponent = wrapIcon(rawMap.AlignJustify, 'AlignJustify');
export const AlignLeft: IconComponent = wrapIcon(rawMap.AlignLeft, 'AlignLeft');
export const AlignOffsetBottom: IconComponent = wrapIcon(
  rawMap.AlignOffsetBottom,
  'AlignOffsetBottom',
);
export const AlignOffsetLeft: IconComponent = wrapIcon(rawMap.AlignOffsetLeft, 'AlignOffsetLeft');
export const AlignOffsetRight: IconComponent = wrapIcon(
  rawMap.AlignOffsetRight,
  'AlignOffsetRight',
);
export const AlignOffsetTop: IconComponent = wrapIcon(rawMap.AlignOffsetTop, 'AlignOffsetTop');
export const AlignRight: IconComponent = wrapIcon(rawMap.AlignRight, 'AlignRight');
export const AmericanFootball: IconComponent = wrapIcon(
  rawMap.AmericanFootball,
  'AmericanFootball',
);
export const Anchor: IconComponent = wrapIcon(rawMap.Anchor, 'Anchor');
export const Anchor2: IconComponent = wrapIcon(rawMap.Anchor2, 'Anchor2');
export const AppCheck: IconComponent = wrapIcon(rawMap.AppCheck, 'AppCheck');
export const AppDot: IconComponent = wrapIcon(rawMap.AppDot, 'AppDot');
export const AppMinus: IconComponent = wrapIcon(rawMap.AppMinus, 'AppMinus');
export const AppPlus: IconComponent = wrapIcon(rawMap.AppPlus, 'AppPlus');
export const AppWindow: IconComponent = wrapIcon(rawMap.AppWindow, 'AppWindow');
export const AppWindow2: IconComponent = wrapIcon(rawMap.AppWindow2, 'AppWindow2');
export const AppWindowCursor: IconComponent = wrapIcon(rawMap.AppWindowCursor, 'AppWindowCursor');
export const AppWindowMinus: IconComponent = wrapIcon(rawMap.AppWindowMinus, 'AppWindowMinus');
export const AppWindowPlus: IconComponent = wrapIcon(rawMap.AppWindowPlus, 'AppWindowPlus');
export const AppWindowSparkles: IconComponent = wrapIcon(
  rawMap.AppWindowSparkles,
  'AppWindowSparkles',
);
export const AppWindowTerminal: IconComponent = wrapIcon(
  rawMap.AppWindowTerminal,
  'AppWindowTerminal',
);
export const AppWindowX: IconComponent = wrapIcon(rawMap.AppWindowX, 'AppWindowX');
export const AppX: IconComponent = wrapIcon(rawMap.AppX, 'AppX');
export const Archive: IconComponent = wrapIcon(rawMap.Archive, 'Archive');
export const ArchiveX: IconComponent = wrapIcon(rawMap.ArchiveX, 'ArchiveX');
export const ArrowBigDown: IconComponent = wrapIcon(rawMap.ArrowBigDown, 'ArrowBigDown');
export const ArrowBigDownShort: IconComponent = wrapIcon(
  rawMap.ArrowBigDownShort,
  'ArrowBigDownShort',
);
export const ArrowBigLeft: IconComponent = wrapIcon(rawMap.ArrowBigLeft, 'ArrowBigLeft');
export const ArrowBigLeftShort: IconComponent = wrapIcon(
  rawMap.ArrowBigLeftShort,
  'ArrowBigLeftShort',
);
export const ArrowBigRight: IconComponent = wrapIcon(rawMap.ArrowBigRight, 'ArrowBigRight');
export const ArrowBigRightShort: IconComponent = wrapIcon(
  rawMap.ArrowBigRightShort,
  'ArrowBigRightShort',
);
export const ArrowBigUp: IconComponent = wrapIcon(rawMap.ArrowBigUp, 'ArrowBigUp');
export const ArrowBigUpDash: IconComponent = wrapIcon(rawMap.ArrowBigUpDash, 'ArrowBigUpDash');
export const ArrowBigUpShort: IconComponent = wrapIcon(rawMap.ArrowBigUpShort, 'ArrowBigUpShort');
export const ArrowDown: IconComponent = wrapIcon(rawMap.ArrowDown, 'ArrowDown');
export const ArrowDownDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowDownDashedPanel,
  'ArrowDownDashedPanel',
);
export const ArrowDownLeft: IconComponent = wrapIcon(rawMap.ArrowDownLeft, 'ArrowDownLeft');
export const ArrowDownLeftDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowDownLeftDashedPanel,
  'ArrowDownLeftDashedPanel',
);
export const ArrowDownNarrowWide: IconComponent = wrapIcon(
  rawMap.ArrowDownNarrowWide,
  'ArrowDownNarrowWide',
);
export const ArrowDownRight: IconComponent = wrapIcon(rawMap.ArrowDownRight, 'ArrowDownRight');
export const ArrowDownRightDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowDownRightDashedPanel,
  'ArrowDownRightDashedPanel',
);
export const ArrowDownWideNarrow: IconComponent = wrapIcon(
  rawMap.ArrowDownWideNarrow,
  'ArrowDownWideNarrow',
);
export const ArrowInDownDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInDownDashedPanel,
  'ArrowInDownDashedPanel',
);
export const ArrowInDownLeftDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInDownLeftDashedPanel,
  'ArrowInDownLeftDashedPanel',
);
export const ArrowInDownRightDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInDownRightDashedPanel,
  'ArrowInDownRightDashedPanel',
);
export const ArrowInLeftDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInLeftDashedPanel,
  'ArrowInLeftDashedPanel',
);
export const ArrowInRightDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInRightDashedPanel,
  'ArrowInRightDashedPanel',
);
export const ArrowInUpDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInUpDashedPanel,
  'ArrowInUpDashedPanel',
);
export const ArrowInUpLeftDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInUpLeftDashedPanel,
  'ArrowInUpLeftDashedPanel',
);
export const ArrowInUpRightDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowInUpRightDashedPanel,
  'ArrowInUpRightDashedPanel',
);
export const ArrowLeft: IconComponent = wrapIcon(rawMap.ArrowLeft, 'ArrowLeft');
export const ArrowLeftDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowLeftDashedPanel,
  'ArrowLeftDashedPanel',
);
export const ArrowLeftRight: IconComponent = wrapIcon(rawMap.ArrowLeftRight, 'ArrowLeftRight');
export const ArrowRight: IconComponent = wrapIcon(rawMap.ArrowRight, 'ArrowRight');
export const ArrowRightDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowRightDashedPanel,
  'ArrowRightDashedPanel',
);
export const ArrowRightLeft: IconComponent = wrapIcon(rawMap.ArrowRightLeft, 'ArrowRightLeft');
export const ArrowRightToLine: IconComponent = wrapIcon(
  rawMap.ArrowRightToLine,
  'ArrowRightToLine',
);
export const ArrowUTurnLeft: IconComponent = wrapIcon(rawMap.ArrowUTurnLeft, 'ArrowUTurnLeft');
export const ArrowUTurnRight: IconComponent = wrapIcon(rawMap.ArrowUTurnRight, 'ArrowUTurnRight');
export const ArrowUp: IconComponent = wrapIcon(rawMap.ArrowUp, 'ArrowUp');
export const ArrowUpDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowUpDashedPanel,
  'ArrowUpDashedPanel',
);
export const ArrowUpDown: IconComponent = wrapIcon(rawMap.ArrowUpDown, 'ArrowUpDown');
export const ArrowUpLeft: IconComponent = wrapIcon(rawMap.ArrowUpLeft, 'ArrowUpLeft');
export const ArrowUpLeftDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowUpLeftDashedPanel,
  'ArrowUpLeftDashedPanel',
);
export const ArrowUpNarrowWide: IconComponent = wrapIcon(
  rawMap.ArrowUpNarrowWide,
  'ArrowUpNarrowWide',
);
export const ArrowUpRight: IconComponent = wrapIcon(rawMap.ArrowUpRight, 'ArrowUpRight');
export const ArrowUpRightDashedPanel: IconComponent = wrapIcon(
  rawMap.ArrowUpRightDashedPanel,
  'ArrowUpRightDashedPanel',
);
export const ArrowUpWideNarrow: IconComponent = wrapIcon(
  rawMap.ArrowUpWideNarrow,
  'ArrowUpWideNarrow',
);
export const Asterisk: IconComponent = wrapIcon(rawMap.Asterisk, 'Asterisk');
export const At: IconComponent = wrapIcon(rawMap.At, 'At');
export const Atom: IconComponent = wrapIcon(rawMap.Atom, 'Atom');
export const AudioLines: IconComponent = wrapIcon(rawMap.AudioLines, 'AudioLines');
export const AudioLinesSearch: IconComponent = wrapIcon(
  rawMap.AudioLinesSearch,
  'AudioLinesSearch',
);
export const AudioLinesSparkles: IconComponent = wrapIcon(
  rawMap.AudioLinesSparkles,
  'AudioLinesSparkles',
);
export const Award: IconComponent = wrapIcon(rawMap.Award, 'Award');
export const Baby2Boy: IconComponent = wrapIcon(rawMap.Baby2Boy, 'Baby2Boy');
export const Baby2Girl: IconComponent = wrapIcon(rawMap.Baby2Girl, 'Baby2Girl');
export const BabyBoy: IconComponent = wrapIcon(rawMap.BabyBoy, 'BabyBoy');
export const BabyGirl: IconComponent = wrapIcon(rawMap.BabyGirl, 'BabyGirl');
export const Badge: IconComponent = wrapIcon(rawMap.Badge, 'Badge');
export const BadgeAlert: IconComponent = wrapIcon(rawMap.BadgeAlert, 'BadgeAlert');
export const BadgeCheck: IconComponent = wrapIcon(rawMap.BadgeCheck, 'BadgeCheck');
export const BadgeDollarSign: IconComponent = wrapIcon(rawMap.BadgeDollarSign, 'BadgeDollarSign');
export const BadgeInfo: IconComponent = wrapIcon(rawMap.BadgeInfo, 'BadgeInfo');
export const BadgeMinus: IconComponent = wrapIcon(rawMap.BadgeMinus, 'BadgeMinus');
export const BadgePercent: IconComponent = wrapIcon(rawMap.BadgePercent, 'BadgePercent');
export const BadgePlus: IconComponent = wrapIcon(rawMap.BadgePlus, 'BadgePlus');
export const BadgeQuestion: IconComponent = wrapIcon(rawMap.BadgeQuestion, 'BadgeQuestion');
export const BadgeX: IconComponent = wrapIcon(rawMap.BadgeX, 'BadgeX');
export const Ban: IconComponent = wrapIcon(rawMap.Ban, 'Ban');
export const Banknote: IconComponent = wrapIcon(rawMap.Banknote, 'Banknote');
export const Banknote2: IconComponent = wrapIcon(rawMap.Banknote2, 'Banknote2');
export const Banknote2Check: IconComponent = wrapIcon(rawMap.Banknote2Check, 'Banknote2Check');
export const Banknote2Minus: IconComponent = wrapIcon(rawMap.Banknote2Minus, 'Banknote2Minus');
export const Banknote2Plus: IconComponent = wrapIcon(rawMap.Banknote2Plus, 'Banknote2Plus');
export const Banknote2X: IconComponent = wrapIcon(rawMap.Banknote2X, 'Banknote2X');
export const BanknoteCheck: IconComponent = wrapIcon(rawMap.BanknoteCheck, 'BanknoteCheck');
export const BanknoteMinus: IconComponent = wrapIcon(rawMap.BanknoteMinus, 'BanknoteMinus');
export const BanknotePlus: IconComponent = wrapIcon(rawMap.BanknotePlus, 'BanknotePlus');
export const BanknoteX: IconComponent = wrapIcon(rawMap.BanknoteX, 'BanknoteX');
export const BarChart: IconComponent = wrapIcon(rawMap.BarChart, 'BarChart');
export const BarChart2: IconComponent = wrapIcon(rawMap.BarChart2, 'BarChart2');
export const BarChart2Down: IconComponent = wrapIcon(rawMap.BarChart2Down, 'BarChart2Down');
export const BarChart2HorizontalEnd: IconComponent = wrapIcon(
  rawMap.BarChart2HorizontalEnd,
  'BarChart2HorizontalEnd',
);
export const BarChart2HorizontalStart: IconComponent = wrapIcon(
  rawMap.BarChart2HorizontalStart,
  'BarChart2HorizontalStart',
);
export const BarChartDown: IconComponent = wrapIcon(rawMap.BarChartDown, 'BarChartDown');
export const BarChartHorizontalEnd: IconComponent = wrapIcon(
  rawMap.BarChartHorizontalEnd,
  'BarChartHorizontalEnd',
);
export const BarChartHorizontalStart: IconComponent = wrapIcon(
  rawMap.BarChartHorizontalStart,
  'BarChartHorizontalStart',
);
export const BarsProgress: IconComponent = wrapIcon(rawMap.BarsProgress, 'BarsProgress');
export const Baseball: IconComponent = wrapIcon(rawMap.Baseball, 'Baseball');
export const Basketball: IconComponent = wrapIcon(rawMap.Basketball, 'Basketball');
export const Battery: IconComponent = wrapIcon(rawMap.Battery, 'Battery');
export const BatteryFull: IconComponent = wrapIcon(rawMap.BatteryFull, 'BatteryFull');
export const BatteryLow: IconComponent = wrapIcon(rawMap.BatteryLow, 'BatteryLow');
export const BatteryMedium: IconComponent = wrapIcon(rawMap.BatteryMedium, 'BatteryMedium');
export const BatterySparkles: IconComponent = wrapIcon(rawMap.BatterySparkles, 'BatterySparkles');
export const Bed: IconComponent = wrapIcon(rawMap.Bed, 'Bed');
export const BedDouble: IconComponent = wrapIcon(rawMap.BedDouble, 'BedDouble');
export const BedSingle: IconComponent = wrapIcon(rawMap.BedSingle, 'BedSingle');
export const Bell: IconComponent = wrapIcon(rawMap.Bell, 'Bell');
export const BellCheck: IconComponent = wrapIcon(rawMap.BellCheck, 'BellCheck');
export const BellDot: IconComponent = wrapIcon(rawMap.BellDot, 'BellDot');
export const BellMinus: IconComponent = wrapIcon(rawMap.BellMinus, 'BellMinus');
export const BellOff: IconComponent = wrapIcon(rawMap.BellOff, 'BellOff');
export const BellPlus: IconComponent = wrapIcon(rawMap.BellPlus, 'BellPlus');
export const BellRing: IconComponent = wrapIcon(rawMap.BellRing, 'BellRing');
export const BellSparkles: IconComponent = wrapIcon(rawMap.BellSparkles, 'BellSparkles');
export const BellX: IconComponent = wrapIcon(rawMap.BellX, 'BellX');
export const BellZap: IconComponent = wrapIcon(rawMap.BellZap, 'BellZap');
export const Bike: IconComponent = wrapIcon(rawMap.Bike, 'Bike');
export const BikeFast: IconComponent = wrapIcon(rawMap.BikeFast, 'BikeFast');
export const Bin: IconComponent = wrapIcon(rawMap.Bin, 'Bin');
export const Bin2: IconComponent = wrapIcon(rawMap.Bin2, 'Bin2');
export const Bird: IconComponent = wrapIcon(rawMap.Bird, 'Bird');
export const Bitcoin: IconComponent = wrapIcon(rawMap.Bitcoin, 'Bitcoin');
export const Blocks: IconComponent = wrapIcon(rawMap.Blocks, 'Blocks');
export const Blocks2: IconComponent = wrapIcon(rawMap.Blocks2, 'Blocks2');
export const Bluetooth: IconComponent = wrapIcon(rawMap.Bluetooth, 'Bluetooth');
export const Bold: IconComponent = wrapIcon(rawMap.Bold, 'Bold');
export const Book: IconComponent = wrapIcon(rawMap.Book, 'Book');
export const BookCheck: IconComponent = wrapIcon(rawMap.BookCheck, 'BookCheck');
export const BookMinus: IconComponent = wrapIcon(rawMap.BookMinus, 'BookMinus');
export const BookOpen: IconComponent = wrapIcon(rawMap.BookOpen, 'BookOpen');
export const BookPlus: IconComponent = wrapIcon(rawMap.BookPlus, 'BookPlus');
export const BookX: IconComponent = wrapIcon(rawMap.BookX, 'BookX');
export const Bookmark: IconComponent = wrapIcon(rawMap.Bookmark, 'Bookmark');
export const BookmarkPlus: IconComponent = wrapIcon(rawMap.BookmarkPlus, 'BookmarkPlus');
export const Bot: IconComponent = wrapIcon(rawMap.Bot, 'Bot');
export const BotCircle: IconComponent = wrapIcon(rawMap.BotCircle, 'BotCircle');
export const BotCloud: IconComponent = wrapIcon(rawMap.BotCloud, 'BotCloud');
export const BotDroplet: IconComponent = wrapIcon(rawMap.BotDroplet, 'BotDroplet');
export const BotHeart: IconComponent = wrapIcon(rawMap.BotHeart, 'BotHeart');
export const BotMessage: IconComponent = wrapIcon(rawMap.BotMessage, 'BotMessage');
export const BotOff: IconComponent = wrapIcon(rawMap.BotOff, 'BotOff');
export const BotSquare: IconComponent = wrapIcon(rawMap.BotSquare, 'BotSquare');
export const BotStar: IconComponent = wrapIcon(rawMap.BotStar, 'BotStar');
export const Bottle: IconComponent = wrapIcon(rawMap.Bottle, 'Bottle');
export const Boy: IconComponent = wrapIcon(rawMap.Boy, 'Boy');
export const BracketArrowDown: IconComponent = wrapIcon(
  rawMap.BracketArrowDown,
  'BracketArrowDown',
);
export const BracketArrowLeft: IconComponent = wrapIcon(
  rawMap.BracketArrowLeft,
  'BracketArrowLeft',
);
export const BracketArrowRight: IconComponent = wrapIcon(
  rawMap.BracketArrowRight,
  'BracketArrowRight',
);
export const BracketArrowUp: IconComponent = wrapIcon(rawMap.BracketArrowUp, 'BracketArrowUp');
export const Brain: IconComponent = wrapIcon(rawMap.Brain, 'Brain');
export const BrainCircuit: IconComponent = wrapIcon(rawMap.BrainCircuit, 'BrainCircuit');
export const BrainCog: IconComponent = wrapIcon(rawMap.BrainCog, 'BrainCog');
export const BrainSparkles: IconComponent = wrapIcon(rawMap.BrainSparkles, 'BrainSparkles');
export const BrickWall: IconComponent = wrapIcon(rawMap.BrickWall, 'BrickWall');
export const Briefcase: IconComponent = wrapIcon(rawMap.Briefcase, 'Briefcase');
export const Broadcast: IconComponent = wrapIcon(rawMap.Broadcast, 'Broadcast');
export const Broom: IconComponent = wrapIcon(rawMap.Broom, 'Broom');
export const Bug: IconComponent = wrapIcon(rawMap.Bug, 'Bug');
export const Building: IconComponent = wrapIcon(rawMap.Building, 'Building');
export const Buildings: IconComponent = wrapIcon(rawMap.Buildings, 'Buildings');
export const Cable: IconComponent = wrapIcon(rawMap.Cable, 'Cable');
export const Cake: IconComponent = wrapIcon(rawMap.Cake, 'Cake');
export const Calculator: IconComponent = wrapIcon(rawMap.Calculator, 'Calculator');
export const CalculatorSparkles: IconComponent = wrapIcon(
  rawMap.CalculatorSparkles,
  'CalculatorSparkles',
);
export const Calendar: IconComponent = wrapIcon(rawMap.Calendar, 'Calendar');
export const CalendarArrowDown: IconComponent = wrapIcon(
  rawMap.CalendarArrowDown,
  'CalendarArrowDown',
);
export const CalendarArrowLeft: IconComponent = wrapIcon(
  rawMap.CalendarArrowLeft,
  'CalendarArrowLeft',
);
export const CalendarArrowRight: IconComponent = wrapIcon(
  rawMap.CalendarArrowRight,
  'CalendarArrowRight',
);
export const CalendarArrowUp: IconComponent = wrapIcon(rawMap.CalendarArrowUp, 'CalendarArrowUp');
export const CalendarCheck: IconComponent = wrapIcon(rawMap.CalendarCheck, 'CalendarCheck');
export const CalendarDays: IconComponent = wrapIcon(rawMap.CalendarDays, 'CalendarDays');
export const CalendarMinus: IconComponent = wrapIcon(rawMap.CalendarMinus, 'CalendarMinus');
export const CalendarOff: IconComponent = wrapIcon(rawMap.CalendarOff, 'CalendarOff');
export const CalendarPlus: IconComponent = wrapIcon(rawMap.CalendarPlus, 'CalendarPlus');
export const CalendarSparkles: IconComponent = wrapIcon(
  rawMap.CalendarSparkles,
  'CalendarSparkles',
);
export const CalendarX: IconComponent = wrapIcon(rawMap.CalendarX, 'CalendarX');
export const CalendarZap: IconComponent = wrapIcon(rawMap.CalendarZap, 'CalendarZap');
export const Camera: IconComponent = wrapIcon(rawMap.Camera, 'Camera');
export const CameraOff: IconComponent = wrapIcon(rawMap.CameraOff, 'CameraOff');
export const CameraSparkles: IconComponent = wrapIcon(rawMap.CameraSparkles, 'CameraSparkles');
export const Captions: IconComponent = wrapIcon(rawMap.Captions, 'Captions');
export const CaptionsOff: IconComponent = wrapIcon(rawMap.CaptionsOff, 'CaptionsOff');
export const CaptionsSparkles: IconComponent = wrapIcon(
  rawMap.CaptionsSparkles,
  'CaptionsSparkles',
);
export const Car: IconComponent = wrapIcon(rawMap.Car, 'Car');
export const CaretDown: IconComponent = wrapIcon(rawMap.CaretDown, 'CaretDown');
export const CaretLeft: IconComponent = wrapIcon(rawMap.CaretLeft, 'CaretLeft');
export const CaretRight: IconComponent = wrapIcon(rawMap.CaretRight, 'CaretRight');
export const CaretUp: IconComponent = wrapIcon(rawMap.CaretUp, 'CaretUp');
export const CaseSensitive: IconComponent = wrapIcon(rawMap.CaseSensitive, 'CaseSensitive');
export const CaseUpper: IconComponent = wrapIcon(rawMap.CaseUpper, 'CaseUpper');
export const Cast: IconComponent = wrapIcon(rawMap.Cast, 'Cast');
export const Cctv: IconComponent = wrapIcon(rawMap.Cctv, 'Cctv');
export const CctvOff: IconComponent = wrapIcon(rawMap.CctvOff, 'CctvOff');
export const ChartArea: IconComponent = wrapIcon(rawMap.ChartArea, 'ChartArea');
export const ChartAreaSparkles: IconComponent = wrapIcon(
  rawMap.ChartAreaSparkles,
  'ChartAreaSparkles',
);
export const ChartBar: IconComponent = wrapIcon(rawMap.ChartBar, 'ChartBar');
export const ChartBarBig: IconComponent = wrapIcon(rawMap.ChartBarBig, 'ChartBarBig');
export const ChartBarSparkles: IconComponent = wrapIcon(
  rawMap.ChartBarSparkles,
  'ChartBarSparkles',
);
export const ChartBarStacked: IconComponent = wrapIcon(rawMap.ChartBarStacked, 'ChartBarStacked');
export const ChartCandlestick: IconComponent = wrapIcon(
  rawMap.ChartCandlestick,
  'ChartCandlestick',
);
export const ChartColumn: IconComponent = wrapIcon(rawMap.ChartColumn, 'ChartColumn');
export const ChartColumnBig: IconComponent = wrapIcon(rawMap.ChartColumnBig, 'ChartColumnBig');
export const ChartColumnSparkles: IconComponent = wrapIcon(
  rawMap.ChartColumnSparkles,
  'ChartColumnSparkles',
);
export const ChartColumnStacked: IconComponent = wrapIcon(
  rawMap.ChartColumnStacked,
  'ChartColumnStacked',
);
export const ChartDiagram: IconComponent = wrapIcon(rawMap.ChartDiagram, 'ChartDiagram');
export const ChartGantt: IconComponent = wrapIcon(rawMap.ChartGantt, 'ChartGantt');
export const ChartGanttSparkles: IconComponent = wrapIcon(
  rawMap.ChartGanttSparkles,
  'ChartGanttSparkles',
);
export const ChartLine: IconComponent = wrapIcon(rawMap.ChartLine, 'ChartLine');
export const ChartLineDecreasing: IconComponent = wrapIcon(
  rawMap.ChartLineDecreasing,
  'ChartLineDecreasing',
);
export const ChartLineDown: IconComponent = wrapIcon(rawMap.ChartLineDown, 'ChartLineDown');
export const ChartLineIncreasing: IconComponent = wrapIcon(
  rawMap.ChartLineIncreasing,
  'ChartLineIncreasing',
);
export const ChartLineIncreasingSparkles: IconComponent = wrapIcon(
  rawMap.ChartLineIncreasingSparkles,
  'ChartLineIncreasingSparkles',
);
export const ChartLineSparkles: IconComponent = wrapIcon(
  rawMap.ChartLineSparkles,
  'ChartLineSparkles',
);
export const ChartLineUp: IconComponent = wrapIcon(rawMap.ChartLineUp, 'ChartLineUp');
export const ChartNetwork: IconComponent = wrapIcon(rawMap.ChartNetwork, 'ChartNetwork');
export const ChartNoAxesCombined: IconComponent = wrapIcon(
  rawMap.ChartNoAxesCombined,
  'ChartNoAxesCombined',
);
export const ChartNoAxesCombinedSparkles: IconComponent = wrapIcon(
  rawMap.ChartNoAxesCombinedSparkles,
  'ChartNoAxesCombinedSparkles',
);
export const ChartPie: IconComponent = wrapIcon(rawMap.ChartPie, 'ChartPie');
export const ChartPyramid: IconComponent = wrapIcon(rawMap.ChartPyramid, 'ChartPyramid');
export const ChartScatter: IconComponent = wrapIcon(rawMap.ChartScatter, 'ChartScatter');
export const ChartScatter3d: IconComponent = wrapIcon(rawMap.ChartScatter3d, 'ChartScatter3d');
export const ChartScatterBubble: IconComponent = wrapIcon(
  rawMap.ChartScatterBubble,
  'ChartScatterBubble',
);
export const ChartScatterBubbleSparkles: IconComponent = wrapIcon(
  rawMap.ChartScatterBubbleSparkles,
  'ChartScatterBubbleSparkles',
);
export const ChartScatterSparkles: IconComponent = wrapIcon(
  rawMap.ChartScatterSparkles,
  'ChartScatterSparkles',
);
export const ChartSpline: IconComponent = wrapIcon(rawMap.ChartSpline, 'ChartSpline');
export const ChartSplineSparkles: IconComponent = wrapIcon(
  rawMap.ChartSplineSparkles,
  'ChartSplineSparkles',
);
export const ChartStockDown: IconComponent = wrapIcon(rawMap.ChartStockDown, 'ChartStockDown');
export const ChartStockUp: IconComponent = wrapIcon(rawMap.ChartStockUp, 'ChartStockUp');
export const ChartTreeMap: IconComponent = wrapIcon(rawMap.ChartTreeMap, 'ChartTreeMap');
export const ChartWaterfall: IconComponent = wrapIcon(rawMap.ChartWaterfall, 'ChartWaterfall');
export const Check: IconComponent = wrapIcon(rawMap.Check, 'Check');
export const ChevronDown: IconComponent = wrapIcon(rawMap.ChevronDown, 'ChevronDown');
export const ChevronLeft: IconComponent = wrapIcon(rawMap.ChevronLeft, 'ChevronLeft');
export const ChevronRight: IconComponent = wrapIcon(rawMap.ChevronRight, 'ChevronRight');
export const ChevronUp: IconComponent = wrapIcon(rawMap.ChevronUp, 'ChevronUp');
export const ChevronsDown: IconComponent = wrapIcon(rawMap.ChevronsDown, 'ChevronsDown');
export const ChevronsLeft: IconComponent = wrapIcon(rawMap.ChevronsLeft, 'ChevronsLeft');
export const ChevronsLeftRight: IconComponent = wrapIcon(
  rawMap.ChevronsLeftRight,
  'ChevronsLeftRight',
);
export const ChevronsRight: IconComponent = wrapIcon(rawMap.ChevronsRight, 'ChevronsRight');
export const ChevronsUp: IconComponent = wrapIcon(rawMap.ChevronsUp, 'ChevronsUp');
export const ChevronsUpDown: IconComponent = wrapIcon(rawMap.ChevronsUpDown, 'ChevronsUpDown');
export const Circle: IconComponent = wrapIcon(rawMap.Circle, 'Circle');
export const CircleActivity: IconComponent = wrapIcon(rawMap.CircleActivity, 'CircleActivity');
export const CircleAlert: IconComponent = wrapIcon(rawMap.CircleAlert, 'CircleAlert');
export const CircleAlignOffsetBottom: IconComponent = wrapIcon(
  rawMap.CircleAlignOffsetBottom,
  'CircleAlignOffsetBottom',
);
export const CircleAlignOffsetLeft: IconComponent = wrapIcon(
  rawMap.CircleAlignOffsetLeft,
  'CircleAlignOffsetLeft',
);
export const CircleAlignOffsetRight: IconComponent = wrapIcon(
  rawMap.CircleAlignOffsetRight,
  'CircleAlignOffsetRight',
);
export const CircleAlignOffsetTop: IconComponent = wrapIcon(
  rawMap.CircleAlignOffsetTop,
  'CircleAlignOffsetTop',
);
export const CircleArrowDown: IconComponent = wrapIcon(rawMap.CircleArrowDown, 'CircleArrowDown');
export const CircleArrowDownLeft: IconComponent = wrapIcon(
  rawMap.CircleArrowDownLeft,
  'CircleArrowDownLeft',
);
export const CircleArrowDownRight: IconComponent = wrapIcon(
  rawMap.CircleArrowDownRight,
  'CircleArrowDownRight',
);
export const CircleArrowLeft: IconComponent = wrapIcon(rawMap.CircleArrowLeft, 'CircleArrowLeft');
export const CircleArrowRight: IconComponent = wrapIcon(
  rawMap.CircleArrowRight,
  'CircleArrowRight',
);
export const CircleArrowUTurnLeft: IconComponent = wrapIcon(
  rawMap.CircleArrowUTurnLeft,
  'CircleArrowUTurnLeft',
);
export const CircleArrowUTurnRight: IconComponent = wrapIcon(
  rawMap.CircleArrowUTurnRight,
  'CircleArrowUTurnRight',
);
export const CircleArrowUp: IconComponent = wrapIcon(rawMap.CircleArrowUp, 'CircleArrowUp');
export const CircleArrowUpLeft: IconComponent = wrapIcon(
  rawMap.CircleArrowUpLeft,
  'CircleArrowUpLeft',
);
export const CircleArrowUpRight: IconComponent = wrapIcon(
  rawMap.CircleArrowUpRight,
  'CircleArrowUpRight',
);
export const CircleAsterisk: IconComponent = wrapIcon(rawMap.CircleAsterisk, 'CircleAsterisk');
export const CircleBarChart: IconComponent = wrapIcon(rawMap.CircleBarChart, 'CircleBarChart');
export const CircleBarChart2: IconComponent = wrapIcon(rawMap.CircleBarChart2, 'CircleBarChart2');
export const CircleBarChart2Down: IconComponent = wrapIcon(
  rawMap.CircleBarChart2Down,
  'CircleBarChart2Down',
);
export const CircleBarChart2HorizontalEnd: IconComponent = wrapIcon(
  rawMap.CircleBarChart2HorizontalEnd,
  'CircleBarChart2HorizontalEnd',
);
export const CircleBarChart2HorizontalStart: IconComponent = wrapIcon(
  rawMap.CircleBarChart2HorizontalStart,
  'CircleBarChart2HorizontalStart',
);
export const CircleBarChartDown: IconComponent = wrapIcon(
  rawMap.CircleBarChartDown,
  'CircleBarChartDown',
);
export const CircleBarChartHorizontalEnd: IconComponent = wrapIcon(
  rawMap.CircleBarChartHorizontalEnd,
  'CircleBarChartHorizontalEnd',
);
export const CircleBarChartHorizontalStart: IconComponent = wrapIcon(
  rawMap.CircleBarChartHorizontalStart,
  'CircleBarChartHorizontalStart',
);
export const CircleCaretDown: IconComponent = wrapIcon(rawMap.CircleCaretDown, 'CircleCaretDown');
export const CircleCaretLeft: IconComponent = wrapIcon(rawMap.CircleCaretLeft, 'CircleCaretLeft');
export const CircleCaretRight: IconComponent = wrapIcon(
  rawMap.CircleCaretRight,
  'CircleCaretRight',
);
export const CircleCaretUp: IconComponent = wrapIcon(rawMap.CircleCaretUp, 'CircleCaretUp');
export const CircleCheck: IconComponent = wrapIcon(rawMap.CircleCheck, 'CircleCheck');
export const CircleChevronDown: IconComponent = wrapIcon(
  rawMap.CircleChevronDown,
  'CircleChevronDown',
);
export const CircleChevronLeft: IconComponent = wrapIcon(
  rawMap.CircleChevronLeft,
  'CircleChevronLeft',
);
export const CircleChevronRight: IconComponent = wrapIcon(
  rawMap.CircleChevronRight,
  'CircleChevronRight',
);
export const CircleChevronUp: IconComponent = wrapIcon(rawMap.CircleChevronUp, 'CircleChevronUp');
export const CircleChevronsDown: IconComponent = wrapIcon(
  rawMap.CircleChevronsDown,
  'CircleChevronsDown',
);
export const CircleChevronsLeft: IconComponent = wrapIcon(
  rawMap.CircleChevronsLeft,
  'CircleChevronsLeft',
);
export const CircleChevronsRight: IconComponent = wrapIcon(
  rawMap.CircleChevronsRight,
  'CircleChevronsRight',
);
export const CircleChevronsUp: IconComponent = wrapIcon(
  rawMap.CircleChevronsUp,
  'CircleChevronsUp',
);
export const CircleCursor: IconComponent = wrapIcon(rawMap.CircleCursor, 'CircleCursor');
export const CircleDashed: IconComponent = wrapIcon(rawMap.CircleDashed, 'CircleDashed');
export const CircleDashedCheck: IconComponent = wrapIcon(
  rawMap.CircleDashedCheck,
  'CircleDashedCheck',
);
export const CircleDashedFull: IconComponent = wrapIcon(
  rawMap.CircleDashedFull,
  'CircleDashedFull',
);
export const CircleDashedHalf: IconComponent = wrapIcon(
  rawMap.CircleDashedHalf,
  'CircleDashedHalf',
);
export const CircleDashedPlus: IconComponent = wrapIcon(
  rawMap.CircleDashedPlus,
  'CircleDashedPlus',
);
export const CircleDashedQuarter: IconComponent = wrapIcon(
  rawMap.CircleDashedQuarter,
  'CircleDashedQuarter',
);
export const CircleDashedThreeQuarter: IconComponent = wrapIcon(
  rawMap.CircleDashedThreeQuarter,
  'CircleDashedThreeQuarter',
);
export const CircleDivide: IconComponent = wrapIcon(rawMap.CircleDivide, 'CircleDivide');
export const CircleDollarSign: IconComponent = wrapIcon(
  rawMap.CircleDollarSign,
  'CircleDollarSign',
);
export const CircleEqual: IconComponent = wrapIcon(rawMap.CircleEqual, 'CircleEqual');
export const CircleEuro: IconComponent = wrapIcon(rawMap.CircleEuro, 'CircleEuro');
export const CircleFull: IconComponent = wrapIcon(rawMap.CircleFull, 'CircleFull');
export const CircleHalf: IconComponent = wrapIcon(rawMap.CircleHalf, 'CircleHalf');
export const CircleIndianRupee: IconComponent = wrapIcon(
  rawMap.CircleIndianRupee,
  'CircleIndianRupee',
);
export const CircleJapaneseYen: IconComponent = wrapIcon(
  rawMap.CircleJapaneseYen,
  'CircleJapaneseYen',
);
export const CircleMenu: IconComponent = wrapIcon(rawMap.CircleMenu, 'CircleMenu');
export const CircleMinus: IconComponent = wrapIcon(rawMap.CircleMinus, 'CircleMinus');
export const CircleMoreHorizontal: IconComponent = wrapIcon(
  rawMap.CircleMoreHorizontal,
  'CircleMoreHorizontal',
);
export const CircleMoreVertical: IconComponent = wrapIcon(
  rawMap.CircleMoreVertical,
  'CircleMoreVertical',
);
export const CircleNavigation: IconComponent = wrapIcon(
  rawMap.CircleNavigation,
  'CircleNavigation',
);
export const CircleOff: IconComponent = wrapIcon(rawMap.CircleOff, 'CircleOff');
export const CirclePause: IconComponent = wrapIcon(rawMap.CirclePause, 'CirclePause');
export const CirclePen: IconComponent = wrapIcon(rawMap.CirclePen, 'CirclePen');
export const CirclePercent: IconComponent = wrapIcon(rawMap.CirclePercent, 'CirclePercent');
export const CirclePlay: IconComponent = wrapIcon(rawMap.CirclePlay, 'CirclePlay');
export const CirclePlayOff: IconComponent = wrapIcon(rawMap.CirclePlayOff, 'CirclePlayOff');
export const CirclePlus: IconComponent = wrapIcon(rawMap.CirclePlus, 'CirclePlus');
export const CirclePoundSterling: IconComponent = wrapIcon(
  rawMap.CirclePoundSterling,
  'CirclePoundSterling',
);
export const CircleProgressCheck: IconComponent = wrapIcon(
  rawMap.CircleProgressCheck,
  'CircleProgressCheck',
);
export const CircleProgressHalf: IconComponent = wrapIcon(
  rawMap.CircleProgressHalf,
  'CircleProgressHalf',
);
export const CircleProgressPause: IconComponent = wrapIcon(
  rawMap.CircleProgressPause,
  'CircleProgressPause',
);
export const CircleProgressPlay: IconComponent = wrapIcon(
  rawMap.CircleProgressPlay,
  'CircleProgressPlay',
);
export const CircleProgressQuarter: IconComponent = wrapIcon(
  rawMap.CircleProgressQuarter,
  'CircleProgressQuarter',
);
export const CircleProgressStop: IconComponent = wrapIcon(
  rawMap.CircleProgressStop,
  'CircleProgressStop',
);
export const CircleProgressThreeQuarter: IconComponent = wrapIcon(
  rawMap.CircleProgressThreeQuarter,
  'CircleProgressThreeQuarter',
);
export const CircleProgressX: IconComponent = wrapIcon(rawMap.CircleProgressX, 'CircleProgressX');
export const CircleQuarter: IconComponent = wrapIcon(rawMap.CircleQuarter, 'CircleQuarter');
export const CircleQuestion: IconComponent = wrapIcon(rawMap.CircleQuestion, 'CircleQuestion');
export const CircleRadical: IconComponent = wrapIcon(rawMap.CircleRadical, 'CircleRadical');
export const CircleRecord: IconComponent = wrapIcon(rawMap.CircleRecord, 'CircleRecord');
export const CircleSlash: IconComponent = wrapIcon(rawMap.CircleSlash, 'CircleSlash');
export const CircleSquare: IconComponent = wrapIcon(rawMap.CircleSquare, 'CircleSquare');
export const CircleSquareDashed: IconComponent = wrapIcon(
  rawMap.CircleSquareDashed,
  'CircleSquareDashed',
);
export const CircleStop: IconComponent = wrapIcon(rawMap.CircleStop, 'CircleStop');
export const CircleSwissFranc: IconComponent = wrapIcon(
  rawMap.CircleSwissFranc,
  'CircleSwissFranc',
);
export const CircleThreeQuarter: IconComponent = wrapIcon(
  rawMap.CircleThreeQuarter,
  'CircleThreeQuarter',
);
export const CircleTrendingDown: IconComponent = wrapIcon(
  rawMap.CircleTrendingDown,
  'CircleTrendingDown',
);
export const CircleTrendingUp: IconComponent = wrapIcon(
  rawMap.CircleTrendingUp,
  'CircleTrendingUp',
);
export const CircleTrendingUpSparkles: IconComponent = wrapIcon(
  rawMap.CircleTrendingUpSparkles,
  'CircleTrendingUpSparkles',
);
export const CircleUser: IconComponent = wrapIcon(rawMap.CircleUser, 'CircleUser');
export const CircleX: IconComponent = wrapIcon(rawMap.CircleX, 'CircleX');
export const Circles: IconComponent = wrapIcon(rawMap.Circles, 'Circles');
export const CirclesDashed: IconComponent = wrapIcon(rawMap.CirclesDashed, 'CirclesDashed');
export const Clipboard: IconComponent = wrapIcon(rawMap.Clipboard, 'Clipboard');
export const ClipboardAlert: IconComponent = wrapIcon(rawMap.ClipboardAlert, 'ClipboardAlert');
export const ClipboardCheck: IconComponent = wrapIcon(rawMap.ClipboardCheck, 'ClipboardCheck');
export const ClipboardCode: IconComponent = wrapIcon(rawMap.ClipboardCode, 'ClipboardCode');
export const ClipboardCopy: IconComponent = wrapIcon(rawMap.ClipboardCopy, 'ClipboardCopy');
export const ClipboardList: IconComponent = wrapIcon(rawMap.ClipboardList, 'ClipboardList');
export const ClipboardMinus: IconComponent = wrapIcon(rawMap.ClipboardMinus, 'ClipboardMinus');
export const ClipboardPaste: IconComponent = wrapIcon(rawMap.ClipboardPaste, 'ClipboardPaste');
export const ClipboardPlus: IconComponent = wrapIcon(rawMap.ClipboardPlus, 'ClipboardPlus');
export const ClipboardTerminal: IconComponent = wrapIcon(
  rawMap.ClipboardTerminal,
  'ClipboardTerminal',
);
export const ClipboardType: IconComponent = wrapIcon(rawMap.ClipboardType, 'ClipboardType');
export const ClipboardX: IconComponent = wrapIcon(rawMap.ClipboardX, 'ClipboardX');
export const Clock: IconComponent = wrapIcon(rawMap.Clock, 'Clock');
export const Clock1: IconComponent = wrapIcon(rawMap.Clock1, 'Clock1');
export const Clock10: IconComponent = wrapIcon(rawMap.Clock10, 'Clock10');
export const Clock11: IconComponent = wrapIcon(rawMap.Clock11, 'Clock11');
export const Clock12: IconComponent = wrapIcon(rawMap.Clock12, 'Clock12');
export const Clock2: IconComponent = wrapIcon(rawMap.Clock2, 'Clock2');
export const Clock3: IconComponent = wrapIcon(rawMap.Clock3, 'Clock3');
export const Clock4: IconComponent = wrapIcon(rawMap.Clock4, 'Clock4');
export const Clock5: IconComponent = wrapIcon(rawMap.Clock5, 'Clock5');
export const Clock6: IconComponent = wrapIcon(rawMap.Clock6, 'Clock6');
export const Clock7: IconComponent = wrapIcon(rawMap.Clock7, 'Clock7');
export const Clock8: IconComponent = wrapIcon(rawMap.Clock8, 'Clock8');
export const Clock9: IconComponent = wrapIcon(rawMap.Clock9, 'Clock9');
export const ClockArrowDown: IconComponent = wrapIcon(rawMap.ClockArrowDown, 'ClockArrowDown');
export const ClockArrowLeft: IconComponent = wrapIcon(rawMap.ClockArrowLeft, 'ClockArrowLeft');
export const ClockArrowRight: IconComponent = wrapIcon(rawMap.ClockArrowRight, 'ClockArrowRight');
export const ClockArrowUp: IconComponent = wrapIcon(rawMap.ClockArrowUp, 'ClockArrowUp');
export const ClockCheck: IconComponent = wrapIcon(rawMap.ClockCheck, 'ClockCheck');
export const ClockMinus: IconComponent = wrapIcon(rawMap.ClockMinus, 'ClockMinus');
export const ClockPlus: IconComponent = wrapIcon(rawMap.ClockPlus, 'ClockPlus');
export const ClockSparkles: IconComponent = wrapIcon(rawMap.ClockSparkles, 'ClockSparkles');
export const ClockX: IconComponent = wrapIcon(rawMap.ClockX, 'ClockX');
export const ClockZap: IconComponent = wrapIcon(rawMap.ClockZap, 'ClockZap');
export const Cloud: IconComponent = wrapIcon(rawMap.Cloud, 'Cloud');
export const CloudAlert: IconComponent = wrapIcon(rawMap.CloudAlert, 'CloudAlert');
export const CloudCheck: IconComponent = wrapIcon(rawMap.CloudCheck, 'CloudCheck');
export const CloudDownload: IconComponent = wrapIcon(rawMap.CloudDownload, 'CloudDownload');
export const CloudMoon: IconComponent = wrapIcon(rawMap.CloudMoon, 'CloudMoon');
export const CloudOff: IconComponent = wrapIcon(rawMap.CloudOff, 'CloudOff');
export const CloudPlus: IconComponent = wrapIcon(rawMap.CloudPlus, 'CloudPlus');
export const CloudRain: IconComponent = wrapIcon(rawMap.CloudRain, 'CloudRain');
export const CloudSparkles: IconComponent = wrapIcon(rawMap.CloudSparkles, 'CloudSparkles');
export const CloudSun: IconComponent = wrapIcon(rawMap.CloudSun, 'CloudSun');
export const CloudTerminal: IconComponent = wrapIcon(rawMap.CloudTerminal, 'CloudTerminal');
export const CloudUpload: IconComponent = wrapIcon(rawMap.CloudUpload, 'CloudUpload');
export const CloudX: IconComponent = wrapIcon(rawMap.CloudX, 'CloudX');
export const Clouds: IconComponent = wrapIcon(rawMap.Clouds, 'Clouds');
export const Code: IconComponent = wrapIcon(rawMap.Code, 'Code');
export const CodeXml: IconComponent = wrapIcon(rawMap.CodeXml, 'CodeXml');
export const Coffee: IconComponent = wrapIcon(rawMap.Coffee, 'Coffee');
export const Coins: IconComponent = wrapIcon(rawMap.Coins, 'Coins');
export const Columns3: IconComponent = wrapIcon(rawMap.Columns3, 'Columns3');
export const Command: IconComponent = wrapIcon(rawMap.Command, 'Command');
export const Compass: IconComponent = wrapIcon(rawMap.Compass, 'Compass');
export const Contacts: IconComponent = wrapIcon(rawMap.Contacts, 'Contacts');
export const Container: IconComponent = wrapIcon(rawMap.Container, 'Container');
export const Copy: IconComponent = wrapIcon(rawMap.Copy, 'Copy');
export const CopyCheck: IconComponent = wrapIcon(rawMap.CopyCheck, 'CopyCheck');
export const CopyPlus: IconComponent = wrapIcon(rawMap.CopyPlus, 'CopyPlus');
export const CornerDownLeft: IconComponent = wrapIcon(rawMap.CornerDownLeft, 'CornerDownLeft');
export const CornerDownRight: IconComponent = wrapIcon(rawMap.CornerDownRight, 'CornerDownRight');
export const CornerLeftDown: IconComponent = wrapIcon(rawMap.CornerLeftDown, 'CornerLeftDown');
export const CornerLeftUp: IconComponent = wrapIcon(rawMap.CornerLeftUp, 'CornerLeftUp');
export const CornerRightDown: IconComponent = wrapIcon(rawMap.CornerRightDown, 'CornerRightDown');
export const CornerRightUp: IconComponent = wrapIcon(rawMap.CornerRightUp, 'CornerRightUp');
export const Coupon: IconComponent = wrapIcon(rawMap.Coupon, 'Coupon');
export const Cpu: IconComponent = wrapIcon(rawMap.Cpu, 'Cpu');
export const CpuSparkles: IconComponent = wrapIcon(rawMap.CpuSparkles, 'CpuSparkles');
export const CreditCard: IconComponent = wrapIcon(rawMap.CreditCard, 'CreditCard');
export const CreditCard2: IconComponent = wrapIcon(rawMap.CreditCard2, 'CreditCard2');
export const CreditCard2Sparkles: IconComponent = wrapIcon(
  rawMap.CreditCard2Sparkles,
  'CreditCard2Sparkles',
);
export const CreditCardCheck: IconComponent = wrapIcon(rawMap.CreditCardCheck, 'CreditCardCheck');
export const CreditCardMinus: IconComponent = wrapIcon(rawMap.CreditCardMinus, 'CreditCardMinus');
export const CreditCardPlus: IconComponent = wrapIcon(rawMap.CreditCardPlus, 'CreditCardPlus');
export const CreditCardSparkles: IconComponent = wrapIcon(
  rawMap.CreditCardSparkles,
  'CreditCardSparkles',
);
export const CreditCardX: IconComponent = wrapIcon(rawMap.CreditCardX, 'CreditCardX');
export const CricketBat: IconComponent = wrapIcon(rawMap.CricketBat, 'CricketBat');
export const Crown: IconComponent = wrapIcon(rawMap.Crown, 'Crown');
export const Cursor: IconComponent = wrapIcon(rawMap.Cursor, 'Cursor');
export const CursorClick: IconComponent = wrapIcon(rawMap.CursorClick, 'CursorClick');
export const CursorDashedPanel: IconComponent = wrapIcon(
  rawMap.CursorDashedPanel,
  'CursorDashedPanel',
);
export const CursorOff: IconComponent = wrapIcon(rawMap.CursorOff, 'CursorOff');
export const CursorPanel: IconComponent = wrapIcon(rawMap.CursorPanel, 'CursorPanel');
export const CursorSignal: IconComponent = wrapIcon(rawMap.CursorSignal, 'CursorSignal');
export const CursorSparkles: IconComponent = wrapIcon(rawMap.CursorSparkles, 'CursorSparkles');
export const CursorText: IconComponent = wrapIcon(rawMap.CursorText, 'CursorText');
export const CursorWindow: IconComponent = wrapIcon(rawMap.CursorWindow, 'CursorWindow');
export const Database: IconComponent = wrapIcon(rawMap.Database, 'Database');
export const DatabaseArrowDown: IconComponent = wrapIcon(
  rawMap.DatabaseArrowDown,
  'DatabaseArrowDown',
);
export const DatabaseArrowLeft: IconComponent = wrapIcon(
  rawMap.DatabaseArrowLeft,
  'DatabaseArrowLeft',
);
export const DatabaseArrowRight: IconComponent = wrapIcon(
  rawMap.DatabaseArrowRight,
  'DatabaseArrowRight',
);
export const DatabaseArrowUp: IconComponent = wrapIcon(rawMap.DatabaseArrowUp, 'DatabaseArrowUp');
export const DatabaseCheck: IconComponent = wrapIcon(rawMap.DatabaseCheck, 'DatabaseCheck');
export const DatabaseMinus: IconComponent = wrapIcon(rawMap.DatabaseMinus, 'DatabaseMinus');
export const DatabasePlus: IconComponent = wrapIcon(rawMap.DatabasePlus, 'DatabasePlus');
export const DatabaseSparkles: IconComponent = wrapIcon(
  rawMap.DatabaseSparkles,
  'DatabaseSparkles',
);
export const DatabaseX: IconComponent = wrapIcon(rawMap.DatabaseX, 'DatabaseX');
export const DatabaseZap: IconComponent = wrapIcon(rawMap.DatabaseZap, 'DatabaseZap');
export const Delete: IconComponent = wrapIcon(rawMap.Delete, 'Delete');
export const DiagramPredecessor: IconComponent = wrapIcon(
  rawMap.DiagramPredecessor,
  'DiagramPredecessor',
);
export const DiagramProject: IconComponent = wrapIcon(rawMap.DiagramProject, 'DiagramProject');
export const DiagramSubtask: IconComponent = wrapIcon(rawMap.DiagramSubtask, 'DiagramSubtask');
export const DiagramSuccessor: IconComponent = wrapIcon(
  rawMap.DiagramSuccessor,
  'DiagramSuccessor',
);
export const Dice1: IconComponent = wrapIcon(rawMap.Dice1, 'Dice1');
export const Dice2: IconComponent = wrapIcon(rawMap.Dice2, 'Dice2');
export const Dice3: IconComponent = wrapIcon(rawMap.Dice3, 'Dice3');
export const Dice4: IconComponent = wrapIcon(rawMap.Dice4, 'Dice4');
export const Dice5: IconComponent = wrapIcon(rawMap.Dice5, 'Dice5');
export const Dice6: IconComponent = wrapIcon(rawMap.Dice6, 'Dice6');
export const Dice6Horizontal: IconComponent = wrapIcon(rawMap.Dice6Horizontal, 'Dice6Horizontal');
export const Divide: IconComponent = wrapIcon(rawMap.Divide, 'Divide');
export const DollarSign: IconComponent = wrapIcon(rawMap.DollarSign, 'DollarSign');
export const DollarSignSparkles: IconComponent = wrapIcon(
  rawMap.DollarSignSparkles,
  'DollarSignSparkles',
);
export const Door: IconComponent = wrapIcon(rawMap.Door, 'Door');
export const DoorOpen: IconComponent = wrapIcon(rawMap.DoorOpen, 'DoorOpen');
export const DoubleCheck: IconComponent = wrapIcon(rawMap.DoubleCheck, 'DoubleCheck');
export const Download: IconComponent = wrapIcon(rawMap.Download, 'Download');
export const Droplet: IconComponent = wrapIcon(rawMap.Droplet, 'Droplet');
export const DropletOff: IconComponent = wrapIcon(rawMap.DropletOff, 'DropletOff');
export const Droplets: IconComponent = wrapIcon(rawMap.Droplets, 'Droplets');
export const Ear: IconComponent = wrapIcon(rawMap.Ear, 'Ear');
export const EarListen: IconComponent = wrapIcon(rawMap.EarListen, 'EarListen');
export const EarWaveform: IconComponent = wrapIcon(rawMap.EarWaveform, 'EarWaveform');
export const Earbuds: IconComponent = wrapIcon(rawMap.Earbuds, 'Earbuds');
export const Earth: IconComponent = wrapIcon(rawMap.Earth, 'Earth');
export const Easel: IconComponent = wrapIcon(rawMap.Easel, 'Easel');
export const Eject: IconComponent = wrapIcon(rawMap.Eject, 'Eject');
export const Equal: IconComponent = wrapIcon(rawMap.Equal, 'Equal');
export const EqualApproximately: IconComponent = wrapIcon(
  rawMap.EqualApproximately,
  'EqualApproximately',
);
export const EqualApproximatelyNot: IconComponent = wrapIcon(
  rawMap.EqualApproximatelyNot,
  'EqualApproximatelyNot',
);
export const EqualNot: IconComponent = wrapIcon(rawMap.EqualNot, 'EqualNot');
export const Eraser: IconComponent = wrapIcon(rawMap.Eraser, 'Eraser');
export const EraserSparkles: IconComponent = wrapIcon(rawMap.EraserSparkles, 'EraserSparkles');
export const Escape: IconComponent = wrapIcon(rawMap.Escape, 'Escape');
export const Euro: IconComponent = wrapIcon(rawMap.Euro, 'Euro');
export const ExpandDashedDownLeft: IconComponent = wrapIcon(
  rawMap.ExpandDashedDownLeft,
  'ExpandDashedDownLeft',
);
export const ExpandDashedDownLeftBox: IconComponent = wrapIcon(
  rawMap.ExpandDashedDownLeftBox,
  'ExpandDashedDownLeftBox',
);
export const ExpandDashedDownRight: IconComponent = wrapIcon(
  rawMap.ExpandDashedDownRight,
  'ExpandDashedDownRight',
);
export const ExpandDashedDownRightBox: IconComponent = wrapIcon(
  rawMap.ExpandDashedDownRightBox,
  'ExpandDashedDownRightBox',
);
export const ExpandDashedUpLeft: IconComponent = wrapIcon(
  rawMap.ExpandDashedUpLeft,
  'ExpandDashedUpLeft',
);
export const ExpandDashedUpLeftBox: IconComponent = wrapIcon(
  rawMap.ExpandDashedUpLeftBox,
  'ExpandDashedUpLeftBox',
);
export const ExpandDashedUpRight: IconComponent = wrapIcon(
  rawMap.ExpandDashedUpRight,
  'ExpandDashedUpRight',
);
export const ExpandDashedUpRightBox: IconComponent = wrapIcon(
  rawMap.ExpandDashedUpRightBox,
  'ExpandDashedUpRightBox',
);
export const Eye: IconComponent = wrapIcon(rawMap.Eye, 'Eye');
export const EyeOff: IconComponent = wrapIcon(rawMap.EyeOff, 'EyeOff');
export const EyeSparkles: IconComponent = wrapIcon(rawMap.EyeSparkles, 'EyeSparkles');
export const FaceAngry: IconComponent = wrapIcon(rawMap.FaceAngry, 'FaceAngry');
export const FaceExpressionless: IconComponent = wrapIcon(
  rawMap.FaceExpressionless,
  'FaceExpressionless',
);
export const FaceFrown: IconComponent = wrapIcon(rawMap.FaceFrown, 'FaceFrown');
export const FaceLaugh: IconComponent = wrapIcon(rawMap.FaceLaugh, 'FaceLaugh');
export const FaceNeutral: IconComponent = wrapIcon(rawMap.FaceNeutral, 'FaceNeutral');
export const FaceSmile: IconComponent = wrapIcon(rawMap.FaceSmile, 'FaceSmile');
export const FaceSmilePlus: IconComponent = wrapIcon(rawMap.FaceSmilePlus, 'FaceSmilePlus');
export const FastForward: IconComponent = wrapIcon(rawMap.FastForward, 'FastForward');
export const File: IconComponent = wrapIcon(rawMap.File, 'File');
export const FileAlert: IconComponent = wrapIcon(rawMap.FileAlert, 'FileAlert');
export const FileArrowDown: IconComponent = wrapIcon(rawMap.FileArrowDown, 'FileArrowDown');
export const FileArrowLeft: IconComponent = wrapIcon(rawMap.FileArrowLeft, 'FileArrowLeft');
export const FileArrowRight: IconComponent = wrapIcon(rawMap.FileArrowRight, 'FileArrowRight');
export const FileArrowUp: IconComponent = wrapIcon(rawMap.FileArrowUp, 'FileArrowUp');
export const FileAudio: IconComponent = wrapIcon(rawMap.FileAudio, 'FileAudio');
export const FileChartColumn: IconComponent = wrapIcon(rawMap.FileChartColumn, 'FileChartColumn');
export const FileCheck: IconComponent = wrapIcon(rawMap.FileCheck, 'FileCheck');
export const FileCode: IconComponent = wrapIcon(rawMap.FileCode, 'FileCode');
export const FileImage: IconComponent = wrapIcon(rawMap.FileImage, 'FileImage');
export const FileMinus: IconComponent = wrapIcon(rawMap.FileMinus, 'FileMinus');
export const FileOff: IconComponent = wrapIcon(rawMap.FileOff, 'FileOff');
export const FilePlus: IconComponent = wrapIcon(rawMap.FilePlus, 'FilePlus');
export const FileSearch: IconComponent = wrapIcon(rawMap.FileSearch, 'FileSearch');
export const FileSparkles: IconComponent = wrapIcon(rawMap.FileSparkles, 'FileSparkles');
export const FileSpreadsheet: IconComponent = wrapIcon(rawMap.FileSpreadsheet, 'FileSpreadsheet');
export const FileTerminal: IconComponent = wrapIcon(rawMap.FileTerminal, 'FileTerminal');
export const FileText: IconComponent = wrapIcon(rawMap.FileText, 'FileText');
export const FileType: IconComponent = wrapIcon(rawMap.FileType, 'FileType');
export const FileTypeCorner: IconComponent = wrapIcon(rawMap.FileTypeCorner, 'FileTypeCorner');
export const FileVideo: IconComponent = wrapIcon(rawMap.FileVideo, 'FileVideo');
export const FileX: IconComponent = wrapIcon(rawMap.FileX, 'FileX');
export const FileZap: IconComponent = wrapIcon(rawMap.FileZap, 'FileZap');
export const FileZip: IconComponent = wrapIcon(rawMap.FileZip, 'FileZip');
export const Film: IconComponent = wrapIcon(rawMap.Film, 'Film');
export const FilmSparkles: IconComponent = wrapIcon(rawMap.FilmSparkles, 'FilmSparkles');
export const Filter: IconComponent = wrapIcon(rawMap.Filter, 'Filter');
export const FingerprintPattern: IconComponent = wrapIcon(
  rawMap.FingerprintPattern,
  'FingerprintPattern',
);
export const Flag: IconComponent = wrapIcon(rawMap.Flag, 'Flag');
export const FlagChequered: IconComponent = wrapIcon(rawMap.FlagChequered, 'FlagChequered');
export const Flame: IconComponent = wrapIcon(rawMap.Flame, 'Flame');
export const FlaskConical: IconComponent = wrapIcon(rawMap.FlaskConical, 'FlaskConical');
export const FlaskConicalOff: IconComponent = wrapIcon(rawMap.FlaskConicalOff, 'FlaskConicalOff');
export const FlaskRound: IconComponent = wrapIcon(rawMap.FlaskRound, 'FlaskRound');
export const FlipHorizontal: IconComponent = wrapIcon(rawMap.FlipHorizontal, 'FlipHorizontal');
export const FlipVertical: IconComponent = wrapIcon(rawMap.FlipVertical, 'FlipVertical');
export const Flower: IconComponent = wrapIcon(rawMap.Flower, 'Flower');
export const Folder: IconComponent = wrapIcon(rawMap.Folder, 'Folder');
export const FolderArrowDown: IconComponent = wrapIcon(rawMap.FolderArrowDown, 'FolderArrowDown');
export const FolderArrowLeft: IconComponent = wrapIcon(rawMap.FolderArrowLeft, 'FolderArrowLeft');
export const FolderArrowRight: IconComponent = wrapIcon(
  rawMap.FolderArrowRight,
  'FolderArrowRight',
);
export const FolderArrowUp: IconComponent = wrapIcon(rawMap.FolderArrowUp, 'FolderArrowUp');
export const FolderCheck: IconComponent = wrapIcon(rawMap.FolderCheck, 'FolderCheck');
export const FolderMinus: IconComponent = wrapIcon(rawMap.FolderMinus, 'FolderMinus');
export const FolderOpen: IconComponent = wrapIcon(rawMap.FolderOpen, 'FolderOpen');
export const FolderPlus: IconComponent = wrapIcon(rawMap.FolderPlus, 'FolderPlus');
export const FolderSearch: IconComponent = wrapIcon(rawMap.FolderSearch, 'FolderSearch');
export const FolderSparkles: IconComponent = wrapIcon(rawMap.FolderSparkles, 'FolderSparkles');
export const FolderTree: IconComponent = wrapIcon(rawMap.FolderTree, 'FolderTree');
export const FolderX: IconComponent = wrapIcon(rawMap.FolderX, 'FolderX');
export const FolderZap: IconComponent = wrapIcon(rawMap.FolderZap, 'FolderZap');
export const FolderZip: IconComponent = wrapIcon(rawMap.FolderZip, 'FolderZip');
export const Folders: IconComponent = wrapIcon(rawMap.Folders, 'Folders');
export const Forward: IconComponent = wrapIcon(rawMap.Forward, 'Forward');
export const Frame: IconComponent = wrapIcon(rawMap.Frame, 'Frame');
export const Fullscreen: IconComponent = wrapIcon(rawMap.Fullscreen, 'Fullscreen');
export const Fullscreen2: IconComponent = wrapIcon(rawMap.Fullscreen2, 'Fullscreen2');
export const FullscreenExit: IconComponent = wrapIcon(rawMap.FullscreenExit, 'FullscreenExit');
export const FullscreenExit2: IconComponent = wrapIcon(rawMap.FullscreenExit2, 'FullscreenExit2');
export const GalleryHorizontal: IconComponent = wrapIcon(
  rawMap.GalleryHorizontal,
  'GalleryHorizontal',
);
export const GalleryHorizontalEnd: IconComponent = wrapIcon(
  rawMap.GalleryHorizontalEnd,
  'GalleryHorizontalEnd',
);
export const GalleryHorizontalStart: IconComponent = wrapIcon(
  rawMap.GalleryHorizontalStart,
  'GalleryHorizontalStart',
);
export const GalleryVertical: IconComponent = wrapIcon(rawMap.GalleryVertical, 'GalleryVertical');
export const GalleryVerticalEnd: IconComponent = wrapIcon(
  rawMap.GalleryVerticalEnd,
  'GalleryVerticalEnd',
);
export const GalleryVerticalStart: IconComponent = wrapIcon(
  rawMap.GalleryVerticalStart,
  'GalleryVerticalStart',
);
export const Gamepad: IconComponent = wrapIcon(rawMap.Gamepad, 'Gamepad');
export const Gauge: IconComponent = wrapIcon(rawMap.Gauge, 'Gauge');
export const GaugeHigh: IconComponent = wrapIcon(rawMap.GaugeHigh, 'GaugeHigh');
export const GaugeLow: IconComponent = wrapIcon(rawMap.GaugeLow, 'GaugeLow');
export const Gift: IconComponent = wrapIcon(rawMap.Gift, 'Gift');
export const GiftSparkles: IconComponent = wrapIcon(rawMap.GiftSparkles, 'GiftSparkles');
export const Girl: IconComponent = wrapIcon(rawMap.Girl, 'Girl');
export const GitArrowRight: IconComponent = wrapIcon(rawMap.GitArrowRight, 'GitArrowRight');
export const GitBranch: IconComponent = wrapIcon(rawMap.GitBranch, 'GitBranch');
export const GitBranchMinus: IconComponent = wrapIcon(rawMap.GitBranchMinus, 'GitBranchMinus');
export const GitBranchPlus: IconComponent = wrapIcon(rawMap.GitBranchPlus, 'GitBranchPlus');
export const GitCheck: IconComponent = wrapIcon(rawMap.GitCheck, 'GitCheck');
export const GitCommitHorizontal: IconComponent = wrapIcon(
  rawMap.GitCommitHorizontal,
  'GitCommitHorizontal',
);
export const GitCommitVertical: IconComponent = wrapIcon(
  rawMap.GitCommitVertical,
  'GitCommitVertical',
);
export const GitCompare: IconComponent = wrapIcon(rawMap.GitCompare, 'GitCompare');
export const GitCompareArrows: IconComponent = wrapIcon(
  rawMap.GitCompareArrows,
  'GitCompareArrows',
);
export const GitConnection: IconComponent = wrapIcon(rawMap.GitConnection, 'GitConnection');
export const GitFork: IconComponent = wrapIcon(rawMap.GitFork, 'GitFork');
export const GitGraph: IconComponent = wrapIcon(rawMap.GitGraph, 'GitGraph');
export const GitJoin: IconComponent = wrapIcon(rawMap.GitJoin, 'GitJoin');
export const GitMerge: IconComponent = wrapIcon(rawMap.GitMerge, 'GitMerge');
export const GitMergeConflict: IconComponent = wrapIcon(
  rawMap.GitMergeConflict,
  'GitMergeConflict',
);
export const GitPullRequest: IconComponent = wrapIcon(rawMap.GitPullRequest, 'GitPullRequest');
export const GitPullRequestArrow: IconComponent = wrapIcon(
  rawMap.GitPullRequestArrow,
  'GitPullRequestArrow',
);
export const GitPullRequestClosed: IconComponent = wrapIcon(
  rawMap.GitPullRequestClosed,
  'GitPullRequestClosed',
);
export const GitPullRequestCreate: IconComponent = wrapIcon(
  rawMap.GitPullRequestCreate,
  'GitPullRequestCreate',
);
export const GitPullRequestCreateArrow: IconComponent = wrapIcon(
  rawMap.GitPullRequestCreateArrow,
  'GitPullRequestCreateArrow',
);
export const GitPullRequestDraft: IconComponent = wrapIcon(
  rawMap.GitPullRequestDraft,
  'GitPullRequestDraft',
);
export const GitPullRequestPlus: IconComponent = wrapIcon(
  rawMap.GitPullRequestPlus,
  'GitPullRequestPlus',
);
export const GitRefresh: IconComponent = wrapIcon(rawMap.GitRefresh, 'GitRefresh');
export const GitReturn: IconComponent = wrapIcon(rawMap.GitReturn, 'GitReturn');
export const GitX: IconComponent = wrapIcon(rawMap.GitX, 'GitX');
export const Globe: IconComponent = wrapIcon(rawMap.Globe, 'Globe');
export const GlobeCheck: IconComponent = wrapIcon(rawMap.GlobeCheck, 'GlobeCheck');
export const GlobeCursor: IconComponent = wrapIcon(rawMap.GlobeCursor, 'GlobeCursor');
export const GlobeOff: IconComponent = wrapIcon(rawMap.GlobeOff, 'GlobeOff');
export const GlobePlus: IconComponent = wrapIcon(rawMap.GlobePlus, 'GlobePlus');
export const GlobeSearch: IconComponent = wrapIcon(rawMap.GlobeSearch, 'GlobeSearch');
export const GlobeX: IconComponent = wrapIcon(rawMap.GlobeX, 'GlobeX');
export const GoldBars: IconComponent = wrapIcon(rawMap.GoldBars, 'GoldBars');
export const GolfHole: IconComponent = wrapIcon(rawMap.GolfHole, 'GolfHole');
export const GraduationCap: IconComponent = wrapIcon(rawMap.GraduationCap, 'GraduationCap');
export const Grid2x2: IconComponent = wrapIcon(rawMap.Grid2x2, 'Grid2x2');
export const Grid2x2Plus: IconComponent = wrapIcon(rawMap.Grid2x2Plus, 'Grid2x2Plus');
export const Grid2x3: IconComponent = wrapIcon(rawMap.Grid2x3, 'Grid2x3');
export const Grid3x2: IconComponent = wrapIcon(rawMap.Grid3x2, 'Grid3x2');
export const Grid3x3: IconComponent = wrapIcon(rawMap.Grid3x3, 'Grid3x3');
export const GridCircles: IconComponent = wrapIcon(rawMap.GridCircles, 'GridCircles');
export const GridCirclesCheck: IconComponent = wrapIcon(
  rawMap.GridCirclesCheck,
  'GridCirclesCheck',
);
export const GridCirclesPlus: IconComponent = wrapIcon(rawMap.GridCirclesPlus, 'GridCirclesPlus');
export const GridCirclesX: IconComponent = wrapIcon(rawMap.GridCirclesX, 'GridCirclesX');
export const GridSquares: IconComponent = wrapIcon(rawMap.GridSquares, 'GridSquares');
export const GridSquaresCheck: IconComponent = wrapIcon(
  rawMap.GridSquaresCheck,
  'GridSquaresCheck',
);
export const GridSquaresPlus: IconComponent = wrapIcon(rawMap.GridSquaresPlus, 'GridSquaresPlus');
export const GridSquaresX: IconComponent = wrapIcon(rawMap.GridSquaresX, 'GridSquaresX');
export const GripHorizontal: IconComponent = wrapIcon(rawMap.GripHorizontal, 'GripHorizontal');
export const GripVertical: IconComponent = wrapIcon(rawMap.GripVertical, 'GripVertical');
export const Hammer: IconComponent = wrapIcon(rawMap.Hammer, 'Hammer');
export const HandClosed: IconComponent = wrapIcon(rawMap.HandClosed, 'HandClosed');
export const HandHeart: IconComponent = wrapIcon(rawMap.HandHeart, 'HandHeart');
export const HandOpen: IconComponent = wrapIcon(rawMap.HandOpen, 'HandOpen');
export const HandPointer: IconComponent = wrapIcon(rawMap.HandPointer, 'HandPointer');
export const HandPointerDown: IconComponent = wrapIcon(rawMap.HandPointerDown, 'HandPointerDown');
export const HandPointerLeft: IconComponent = wrapIcon(rawMap.HandPointerLeft, 'HandPointerLeft');
export const HandPointerRight: IconComponent = wrapIcon(
  rawMap.HandPointerRight,
  'HandPointerRight',
);
export const HandPointerSparkles: IconComponent = wrapIcon(
  rawMap.HandPointerSparkles,
  'HandPointerSparkles',
);
export const Handbag: IconComponent = wrapIcon(rawMap.Handbag, 'Handbag');
export const HandbagSparkles: IconComponent = wrapIcon(rawMap.HandbagSparkles, 'HandbagSparkles');
export const HardDrive: IconComponent = wrapIcon(rawMap.HardDrive, 'HardDrive');
export const Hash: IconComponent = wrapIcon(rawMap.Hash, 'Hash');
export const HatGlasses: IconComponent = wrapIcon(rawMap.HatGlasses, 'HatGlasses');
export const Heading: IconComponent = wrapIcon(rawMap.Heading, 'Heading');
export const Heading1: IconComponent = wrapIcon(rawMap.Heading1, 'Heading1');
export const Heading2: IconComponent = wrapIcon(rawMap.Heading2, 'Heading2');
export const Heading3: IconComponent = wrapIcon(rawMap.Heading3, 'Heading3');
export const Heading4: IconComponent = wrapIcon(rawMap.Heading4, 'Heading4');
export const Heading5: IconComponent = wrapIcon(rawMap.Heading5, 'Heading5');
export const Heading6: IconComponent = wrapIcon(rawMap.Heading6, 'Heading6');
export const Headphones: IconComponent = wrapIcon(rawMap.Headphones, 'Headphones');
export const HeadphonesOff: IconComponent = wrapIcon(rawMap.HeadphonesOff, 'HeadphonesOff');
export const Headset: IconComponent = wrapIcon(rawMap.Headset, 'Headset');
export const Headset2: IconComponent = wrapIcon(rawMap.Headset2, 'Headset2');
export const HeadsetOff: IconComponent = wrapIcon(rawMap.HeadsetOff, 'HeadsetOff');
export const Heart: IconComponent = wrapIcon(rawMap.Heart, 'Heart');
export const HeartOff: IconComponent = wrapIcon(rawMap.HeartOff, 'HeartOff');
export const HeartPlus: IconComponent = wrapIcon(rawMap.HeartPlus, 'HeartPlus');
export const HeartSparkles: IconComponent = wrapIcon(rawMap.HeartSparkles, 'HeartSparkles');
export const Hearts: IconComponent = wrapIcon(rawMap.Hearts, 'Hearts');
export const Hexagons: IconComponent = wrapIcon(rawMap.Hexagons, 'Hexagons');
export const History: IconComponent = wrapIcon(rawMap.History, 'History');
export const HockeySticks: IconComponent = wrapIcon(rawMap.HockeySticks, 'HockeySticks');
export const Home: IconComponent = wrapIcon(rawMap.Home, 'Home');
export const HomePlus: IconComponent = wrapIcon(rawMap.HomePlus, 'HomePlus');
export const HomeZap: IconComponent = wrapIcon(rawMap.HomeZap, 'HomeZap');
export const Hourglass: IconComponent = wrapIcon(rawMap.Hourglass, 'Hourglass');
export const HourglassEnd: IconComponent = wrapIcon(rawMap.HourglassEnd, 'HourglassEnd');
export const HourglassHalf: IconComponent = wrapIcon(rawMap.HourglassHalf, 'HourglassHalf');
export const HourglassStart: IconComponent = wrapIcon(rawMap.HourglassStart, 'HourglassStart');
export const Humidity: IconComponent = wrapIcon(rawMap.Humidity, 'Humidity');
export const IdCard: IconComponent = wrapIcon(rawMap.IdCard, 'IdCard');
export const Image: IconComponent = wrapIcon(rawMap.Image, 'Image');
export const ImageArrowDown: IconComponent = wrapIcon(rawMap.ImageArrowDown, 'ImageArrowDown');
export const ImageArrowLeft: IconComponent = wrapIcon(rawMap.ImageArrowLeft, 'ImageArrowLeft');
export const ImageArrowRight: IconComponent = wrapIcon(rawMap.ImageArrowRight, 'ImageArrowRight');
export const ImageArrowUp: IconComponent = wrapIcon(rawMap.ImageArrowUp, 'ImageArrowUp');
export const ImageCheck: IconComponent = wrapIcon(rawMap.ImageCheck, 'ImageCheck');
export const ImageMinus: IconComponent = wrapIcon(rawMap.ImageMinus, 'ImageMinus');
export const ImagePlus: IconComponent = wrapIcon(rawMap.ImagePlus, 'ImagePlus');
export const ImageSparkles: IconComponent = wrapIcon(rawMap.ImageSparkles, 'ImageSparkles');
export const ImageX: IconComponent = wrapIcon(rawMap.ImageX, 'ImageX');
export const Images: IconComponent = wrapIcon(rawMap.Images, 'Images');
export const Inbox: IconComponent = wrapIcon(rawMap.Inbox, 'Inbox');
export const InboxSparkles: IconComponent = wrapIcon(rawMap.InboxSparkles, 'InboxSparkles');
export const IndianRupee: IconComponent = wrapIcon(rawMap.IndianRupee, 'IndianRupee');
export const Infinity: IconComponent = wrapIcon(rawMap.Infinity, 'Infinity');
export const Info: IconComponent = wrapIcon(rawMap.Info, 'Info');
export const Italic: IconComponent = wrapIcon(rawMap.Italic, 'Italic');
export const JapaneseYen: IconComponent = wrapIcon(rawMap.JapaneseYen, 'JapaneseYen');
export const Key: IconComponent = wrapIcon(rawMap.Key, 'Key');
export const KeyRound: IconComponent = wrapIcon(rawMap.KeyRound, 'KeyRound');
export const KeySquare: IconComponent = wrapIcon(rawMap.KeySquare, 'KeySquare');
export const Keyboard: IconComponent = wrapIcon(rawMap.Keyboard, 'Keyboard');
export const Landmark: IconComponent = wrapIcon(rawMap.Landmark, 'Landmark');
export const Language: IconComponent = wrapIcon(rawMap.Language, 'Language');
export const LanguageSparkles: IconComponent = wrapIcon(
  rawMap.LanguageSparkles,
  'LanguageSparkles',
);
export const Laptop: IconComponent = wrapIcon(rawMap.Laptop, 'Laptop');
export const LaptopSmartphone: IconComponent = wrapIcon(
  rawMap.LaptopSmartphone,
  'LaptopSmartphone',
);
export const LaptopSparkles: IconComponent = wrapIcon(rawMap.LaptopSparkles, 'LaptopSparkles');
export const Layers: IconComponent = wrapIcon(rawMap.Layers, 'Layers');
export const LayoutDashboard: IconComponent = wrapIcon(rawMap.LayoutDashboard, 'LayoutDashboard');
export const Leaf: IconComponent = wrapIcon(rawMap.Leaf, 'Leaf');
export const Lifebuoy: IconComponent = wrapIcon(rawMap.Lifebuoy, 'Lifebuoy');
export const Lightbulb: IconComponent = wrapIcon(rawMap.Lightbulb, 'Lightbulb');
export const LightbulbOn: IconComponent = wrapIcon(rawMap.LightbulbOn, 'LightbulbOn');
export const LightbulbSparkles: IconComponent = wrapIcon(
  rawMap.LightbulbSparkles,
  'LightbulbSparkles',
);
export const Link: IconComponent = wrapIcon(rawMap.Link, 'Link');
export const Link2: IconComponent = wrapIcon(rawMap.Link2, 'Link2');
export const Link2Off: IconComponent = wrapIcon(rawMap.Link2Off, 'Link2Off');
export const LinkPlus: IconComponent = wrapIcon(rawMap.LinkPlus, 'LinkPlus');
export const List: IconComponent = wrapIcon(rawMap.List, 'List');
export const ListCheck: IconComponent = wrapIcon(rawMap.ListCheck, 'ListCheck');
export const ListCollapse: IconComponent = wrapIcon(rawMap.ListCollapse, 'ListCollapse');
export const ListCollapseHorizontal: IconComponent = wrapIcon(
  rawMap.ListCollapseHorizontal,
  'ListCollapseHorizontal',
);
export const ListMinus: IconComponent = wrapIcon(rawMap.ListMinus, 'ListMinus');
export const ListMusic: IconComponent = wrapIcon(rawMap.ListMusic, 'ListMusic');
export const ListOrdered: IconComponent = wrapIcon(rawMap.ListOrdered, 'ListOrdered');
export const ListPlus: IconComponent = wrapIcon(rawMap.ListPlus, 'ListPlus');
export const ListSort: IconComponent = wrapIcon(rawMap.ListSort, 'ListSort');
export const ListSortHorizontal: IconComponent = wrapIcon(
  rawMap.ListSortHorizontal,
  'ListSortHorizontal',
);
export const ListSparkles: IconComponent = wrapIcon(rawMap.ListSparkles, 'ListSparkles');
export const ListVideo: IconComponent = wrapIcon(rawMap.ListVideo, 'ListVideo');
export const ListX: IconComponent = wrapIcon(rawMap.ListX, 'ListX');
export const Loader: IconComponent = wrapIcon(rawMap.Loader, 'Loader');
export const LoaderCircle: IconComponent = wrapIcon(rawMap.LoaderCircle, 'LoaderCircle');
export const Lock: IconComponent = wrapIcon(rawMap.Lock, 'Lock');
export const Lungs: IconComponent = wrapIcon(rawMap.Lungs, 'Lungs');
export const Mail: IconComponent = wrapIcon(rawMap.Mail, 'Mail');
export const MailCheck: IconComponent = wrapIcon(rawMap.MailCheck, 'MailCheck');
export const MailDot: IconComponent = wrapIcon(rawMap.MailDot, 'MailDot');
export const MailMinus: IconComponent = wrapIcon(rawMap.MailMinus, 'MailMinus');
export const MailOpen: IconComponent = wrapIcon(rawMap.MailOpen, 'MailOpen');
export const MailPlus: IconComponent = wrapIcon(rawMap.MailPlus, 'MailPlus');
export const MailSparkles: IconComponent = wrapIcon(rawMap.MailSparkles, 'MailSparkles');
export const MailX: IconComponent = wrapIcon(rawMap.MailX, 'MailX');
export const MailZap: IconComponent = wrapIcon(rawMap.MailZap, 'MailZap');
export const Map: IconComponent = wrapIcon(rawMap.Map, 'Map');
export const MapPin: IconComponent = wrapIcon(rawMap.MapPin, 'MapPin');
export const MapPinCheck: IconComponent = wrapIcon(rawMap.MapPinCheck, 'MapPinCheck');
export const MapPinHeart: IconComponent = wrapIcon(rawMap.MapPinHeart, 'MapPinHeart');
export const MapPinMinus: IconComponent = wrapIcon(rawMap.MapPinMinus, 'MapPinMinus');
export const MapPinOff: IconComponent = wrapIcon(rawMap.MapPinOff, 'MapPinOff');
export const MapPinPlus: IconComponent = wrapIcon(rawMap.MapPinPlus, 'MapPinPlus');
export const MapPinSearch: IconComponent = wrapIcon(rawMap.MapPinSearch, 'MapPinSearch');
export const MapPinX: IconComponent = wrapIcon(rawMap.MapPinX, 'MapPinX');
export const Mars: IconComponent = wrapIcon(rawMap.Mars, 'Mars');
export const Maximize: IconComponent = wrapIcon(rawMap.Maximize, 'Maximize');
export const Maximize2: IconComponent = wrapIcon(rawMap.Maximize2, 'Maximize2');
export const Megaphone: IconComponent = wrapIcon(rawMap.Megaphone, 'Megaphone');
export const Menu: IconComponent = wrapIcon(rawMap.Menu, 'Menu');
export const MenuSparkles: IconComponent = wrapIcon(rawMap.MenuSparkles, 'MenuSparkles');
export const Message: IconComponent = wrapIcon(rawMap.Message, 'Message');
export const MessageCheck: IconComponent = wrapIcon(rawMap.MessageCheck, 'MessageCheck');
export const MessageDot: IconComponent = wrapIcon(rawMap.MessageDot, 'MessageDot');
export const MessageLines: IconComponent = wrapIcon(rawMap.MessageLines, 'MessageLines');
export const MessageMinus: IconComponent = wrapIcon(rawMap.MessageMinus, 'MessageMinus');
export const MessageOff: IconComponent = wrapIcon(rawMap.MessageOff, 'MessageOff');
export const MessagePlus: IconComponent = wrapIcon(rawMap.MessagePlus, 'MessagePlus');
export const MessageQuestion: IconComponent = wrapIcon(rawMap.MessageQuestion, 'MessageQuestion');
export const MessageSparkle: IconComponent = wrapIcon(rawMap.MessageSparkle, 'MessageSparkle');
export const MessageSparkles: IconComponent = wrapIcon(rawMap.MessageSparkles, 'MessageSparkles');
export const MessageSquare: IconComponent = wrapIcon(rawMap.MessageSquare, 'MessageSquare');
export const MessageSquareCheck: IconComponent = wrapIcon(
  rawMap.MessageSquareCheck,
  'MessageSquareCheck',
);
export const MessageSquareDot: IconComponent = wrapIcon(
  rawMap.MessageSquareDot,
  'MessageSquareDot',
);
export const MessageSquareLines: IconComponent = wrapIcon(
  rawMap.MessageSquareLines,
  'MessageSquareLines',
);
export const MessageSquareMinus: IconComponent = wrapIcon(
  rawMap.MessageSquareMinus,
  'MessageSquareMinus',
);
export const MessageSquareOff: IconComponent = wrapIcon(
  rawMap.MessageSquareOff,
  'MessageSquareOff',
);
export const MessageSquarePlus: IconComponent = wrapIcon(
  rawMap.MessageSquarePlus,
  'MessageSquarePlus',
);
export const MessageSquareSparkle: IconComponent = wrapIcon(
  rawMap.MessageSquareSparkle,
  'MessageSquareSparkle',
);
export const MessageSquareSparkles: IconComponent = wrapIcon(
  rawMap.MessageSquareSparkles,
  'MessageSquareSparkles',
);
export const MessageSquareX: IconComponent = wrapIcon(rawMap.MessageSquareX, 'MessageSquareX');
export const MessageX: IconComponent = wrapIcon(rawMap.MessageX, 'MessageX');
export const Messages: IconComponent = wrapIcon(rawMap.Messages, 'Messages');
export const MessagesSquare: IconComponent = wrapIcon(rawMap.MessagesSquare, 'MessagesSquare');
export const Mic: IconComponent = wrapIcon(rawMap.Mic, 'Mic');
export const MicOff: IconComponent = wrapIcon(rawMap.MicOff, 'MicOff');
export const MicSparkles: IconComponent = wrapIcon(rawMap.MicSparkles, 'MicSparkles');
export const Milestone: IconComponent = wrapIcon(rawMap.Milestone, 'Milestone');
export const Minimize: IconComponent = wrapIcon(rawMap.Minimize, 'Minimize');
export const Minus: IconComponent = wrapIcon(rawMap.Minus, 'Minus');
export const MoneyBag: IconComponent = wrapIcon(rawMap.MoneyBag, 'MoneyBag');
export const MoneyBagCheck: IconComponent = wrapIcon(rawMap.MoneyBagCheck, 'MoneyBagCheck');
export const MoneyBagDollarSign: IconComponent = wrapIcon(
  rawMap.MoneyBagDollarSign,
  'MoneyBagDollarSign',
);
export const MoneyBagMinus: IconComponent = wrapIcon(rawMap.MoneyBagMinus, 'MoneyBagMinus');
export const MoneyBagPlus: IconComponent = wrapIcon(rawMap.MoneyBagPlus, 'MoneyBagPlus');
export const MoneyBagX: IconComponent = wrapIcon(rawMap.MoneyBagX, 'MoneyBagX');
export const Monitor: IconComponent = wrapIcon(rawMap.Monitor, 'Monitor');
export const MonitorOff: IconComponent = wrapIcon(rawMap.MonitorOff, 'MonitorOff');
export const MonitorSparkles: IconComponent = wrapIcon(rawMap.MonitorSparkles, 'MonitorSparkles');
export const Moon: IconComponent = wrapIcon(rawMap.Moon, 'Moon');
export const MoonStar: IconComponent = wrapIcon(rawMap.MoonStar, 'MoonStar');
export const MoreHorizontal: IconComponent = wrapIcon(rawMap.MoreHorizontal, 'MoreHorizontal');
export const MoreVertical: IconComponent = wrapIcon(rawMap.MoreVertical, 'MoreVertical');
export const Mouse: IconComponent = wrapIcon(rawMap.Mouse, 'Mouse');
export const Move: IconComponent = wrapIcon(rawMap.Move, 'Move');
export const MusicNote: IconComponent = wrapIcon(rawMap.MusicNote, 'MusicNote');
export const MusicNoteOff: IconComponent = wrapIcon(rawMap.MusicNoteOff, 'MusicNoteOff');
export const Navigation: IconComponent = wrapIcon(rawMap.Navigation, 'Navigation');
export const Newspaper: IconComponent = wrapIcon(rawMap.Newspaper, 'Newspaper');
export const OctagonAlert: IconComponent = wrapIcon(rawMap.OctagonAlert, 'OctagonAlert');
export const OctagonX: IconComponent = wrapIcon(rawMap.OctagonX, 'OctagonX');
export const Option: IconComponent = wrapIcon(rawMap.Option, 'Option');
export const Package: IconComponent = wrapIcon(rawMap.Package, 'Package');
export const PackageAlert: IconComponent = wrapIcon(rawMap.PackageAlert, 'PackageAlert');
export const PackageArrowDown: IconComponent = wrapIcon(
  rawMap.PackageArrowDown,
  'PackageArrowDown',
);
export const PackageArrowLeft: IconComponent = wrapIcon(
  rawMap.PackageArrowLeft,
  'PackageArrowLeft',
);
export const PackageArrowRight: IconComponent = wrapIcon(
  rawMap.PackageArrowRight,
  'PackageArrowRight',
);
export const PackageArrowUp: IconComponent = wrapIcon(rawMap.PackageArrowUp, 'PackageArrowUp');
export const PackageCheck: IconComponent = wrapIcon(rawMap.PackageCheck, 'PackageCheck');
export const PackageMinus: IconComponent = wrapIcon(rawMap.PackageMinus, 'PackageMinus');
export const PackagePlus: IconComponent = wrapIcon(rawMap.PackagePlus, 'PackagePlus');
export const PackageX: IconComponent = wrapIcon(rawMap.PackageX, 'PackageX');
export const PackageZap: IconComponent = wrapIcon(rawMap.PackageZap, 'PackageZap');
export const PaintRoller: IconComponent = wrapIcon(rawMap.PaintRoller, 'PaintRoller');
export const Paintbrush: IconComponent = wrapIcon(rawMap.Paintbrush, 'Paintbrush');
export const Palette: IconComponent = wrapIcon(rawMap.Palette, 'Palette');
export const PaletteSparkles: IconComponent = wrapIcon(rawMap.PaletteSparkles, 'PaletteSparkles');
export const PanelBottom: IconComponent = wrapIcon(rawMap.PanelBottom, 'PanelBottom');
export const PanelBottomClose: IconComponent = wrapIcon(
  rawMap.PanelBottomClose,
  'PanelBottomClose',
);
export const PanelBottomCloseDashed: IconComponent = wrapIcon(
  rawMap.PanelBottomCloseDashed,
  'PanelBottomCloseDashed',
);
export const PanelBottomDashed: IconComponent = wrapIcon(
  rawMap.PanelBottomDashed,
  'PanelBottomDashed',
);
export const PanelBottomOpen: IconComponent = wrapIcon(rawMap.PanelBottomOpen, 'PanelBottomOpen');
export const PanelBottomOpenDashed: IconComponent = wrapIcon(
  rawMap.PanelBottomOpenDashed,
  'PanelBottomOpenDashed',
);
export const PanelLeft: IconComponent = wrapIcon(rawMap.PanelLeft, 'PanelLeft');
export const PanelLeftClose: IconComponent = wrapIcon(rawMap.PanelLeftClose, 'PanelLeftClose');
export const PanelLeftCloseDashed: IconComponent = wrapIcon(
  rawMap.PanelLeftCloseDashed,
  'PanelLeftCloseDashed',
);
export const PanelLeftDashed: IconComponent = wrapIcon(rawMap.PanelLeftDashed, 'PanelLeftDashed');
export const PanelLeftOpen: IconComponent = wrapIcon(rawMap.PanelLeftOpen, 'PanelLeftOpen');
export const PanelLeftOpenDashed: IconComponent = wrapIcon(
  rawMap.PanelLeftOpenDashed,
  'PanelLeftOpenDashed',
);
export const PanelRight: IconComponent = wrapIcon(rawMap.PanelRight, 'PanelRight');
export const PanelRightClose: IconComponent = wrapIcon(rawMap.PanelRightClose, 'PanelRightClose');
export const PanelRightCloseDashed: IconComponent = wrapIcon(
  rawMap.PanelRightCloseDashed,
  'PanelRightCloseDashed',
);
export const PanelRightDashed: IconComponent = wrapIcon(
  rawMap.PanelRightDashed,
  'PanelRightDashed',
);
export const PanelRightOpen: IconComponent = wrapIcon(rawMap.PanelRightOpen, 'PanelRightOpen');
export const PanelRightOpenDashed: IconComponent = wrapIcon(
  rawMap.PanelRightOpenDashed,
  'PanelRightOpenDashed',
);
export const PanelTop: IconComponent = wrapIcon(rawMap.PanelTop, 'PanelTop');
export const PanelTopClose: IconComponent = wrapIcon(rawMap.PanelTopClose, 'PanelTopClose');
export const PanelTopCloseDashed: IconComponent = wrapIcon(
  rawMap.PanelTopCloseDashed,
  'PanelTopCloseDashed',
);
export const PanelTopDashed: IconComponent = wrapIcon(rawMap.PanelTopDashed, 'PanelTopDashed');
export const PanelTopOpen: IconComponent = wrapIcon(rawMap.PanelTopOpen, 'PanelTopOpen');
export const PanelTopOpenDashed: IconComponent = wrapIcon(
  rawMap.PanelTopOpenDashed,
  'PanelTopOpenDashed',
);
export const PanelsLeftBottom: IconComponent = wrapIcon(
  rawMap.PanelsLeftBottom,
  'PanelsLeftBottom',
);
export const PanelsRightBottom: IconComponent = wrapIcon(
  rawMap.PanelsRightBottom,
  'PanelsRightBottom',
);
export const PanelsTopLeft: IconComponent = wrapIcon(rawMap.PanelsTopLeft, 'PanelsTopLeft');
export const PaperBag: IconComponent = wrapIcon(rawMap.PaperBag, 'PaperBag');
export const PaperBagSparkles: IconComponent = wrapIcon(
  rawMap.PaperBagSparkles,
  'PaperBagSparkles',
);
export const Paperclip: IconComponent = wrapIcon(rawMap.Paperclip, 'Paperclip');
export const Parasol: IconComponent = wrapIcon(rawMap.Parasol, 'Parasol');
export const Parentheses: IconComponent = wrapIcon(rawMap.Parentheses, 'Parentheses');
export const Paste: IconComponent = wrapIcon(rawMap.Paste, 'Paste');
export const Pause: IconComponent = wrapIcon(rawMap.Pause, 'Pause');
export const PawPrint: IconComponent = wrapIcon(rawMap.PawPrint, 'PawPrint');
export const Pen: IconComponent = wrapIcon(rawMap.Pen, 'Pen');
export const PenLine: IconComponent = wrapIcon(rawMap.PenLine, 'PenLine');
export const PenOff: IconComponent = wrapIcon(rawMap.PenOff, 'PenOff');
export const PenSparkles: IconComponent = wrapIcon(rawMap.PenSparkles, 'PenSparkles');
export const PencilRuler: IconComponent = wrapIcon(rawMap.PencilRuler, 'PencilRuler');
export const Percent: IconComponent = wrapIcon(rawMap.Percent, 'Percent');
export const Phone: IconComponent = wrapIcon(rawMap.Phone, 'Phone');
export const PhoneCall: IconComponent = wrapIcon(rawMap.PhoneCall, 'PhoneCall');
export const PhoneForwarded: IconComponent = wrapIcon(rawMap.PhoneForwarded, 'PhoneForwarded');
export const PhoneIncoming: IconComponent = wrapIcon(rawMap.PhoneIncoming, 'PhoneIncoming');
export const PhoneMissed: IconComponent = wrapIcon(rawMap.PhoneMissed, 'PhoneMissed');
export const PhoneOff: IconComponent = wrapIcon(rawMap.PhoneOff, 'PhoneOff');
export const PhoneOutgoing: IconComponent = wrapIcon(rawMap.PhoneOutgoing, 'PhoneOutgoing');
export const PhoneSparkles: IconComponent = wrapIcon(rawMap.PhoneSparkles, 'PhoneSparkles');
export const PictureInPicture: IconComponent = wrapIcon(
  rawMap.PictureInPicture,
  'PictureInPicture',
);
export const Pig: IconComponent = wrapIcon(rawMap.Pig, 'Pig');
export const PiggyBank: IconComponent = wrapIcon(rawMap.PiggyBank, 'PiggyBank');
export const Pin: IconComponent = wrapIcon(rawMap.Pin, 'Pin');
export const PinOff: IconComponent = wrapIcon(rawMap.PinOff, 'PinOff');
export const Plane: IconComponent = wrapIcon(rawMap.Plane, 'Plane');
export const PlaneLanding: IconComponent = wrapIcon(rawMap.PlaneLanding, 'PlaneLanding');
export const PlaneTakeoff: IconComponent = wrapIcon(rawMap.PlaneTakeoff, 'PlaneTakeoff');
export const Play: IconComponent = wrapIcon(rawMap.Play, 'Play');
export const PlayOff: IconComponent = wrapIcon(rawMap.PlayOff, 'PlayOff');
export const Plug: IconComponent = wrapIcon(rawMap.Plug, 'Plug');
export const Plus: IconComponent = wrapIcon(rawMap.Plus, 'Plus');
export const Podcast: IconComponent = wrapIcon(rawMap.Podcast, 'Podcast');
export const Podium: IconComponent = wrapIcon(rawMap.Podium, 'Podium');
export const Podium1: IconComponent = wrapIcon(rawMap.Podium1, 'Podium1');
export const Podium2: IconComponent = wrapIcon(rawMap.Podium2, 'Podium2');
export const Podium3: IconComponent = wrapIcon(rawMap.Podium3, 'Podium3');
export const PoundSterling: IconComponent = wrapIcon(rawMap.PoundSterling, 'PoundSterling');
export const Power: IconComponent = wrapIcon(rawMap.Power, 'Power');
export const PowerOff: IconComponent = wrapIcon(rawMap.PowerOff, 'PowerOff');
export const Printer: IconComponent = wrapIcon(rawMap.Printer, 'Printer');
export const QrCode: IconComponent = wrapIcon(rawMap.QrCode, 'QrCode');
export const Question: IconComponent = wrapIcon(rawMap.Question, 'Question');
export const Queue: IconComponent = wrapIcon(rawMap.Queue, 'Queue');
export const Quote: IconComponent = wrapIcon(rawMap.Quote, 'Quote');
export const QuoteEnd: IconComponent = wrapIcon(rawMap.QuoteEnd, 'QuoteEnd');
export const QuoteSingle: IconComponent = wrapIcon(rawMap.QuoteSingle, 'QuoteSingle');
export const QuoteSingleEnd: IconComponent = wrapIcon(rawMap.QuoteSingleEnd, 'QuoteSingleEnd');
export const Radar: IconComponent = wrapIcon(rawMap.Radar, 'Radar');
export const Radical: IconComponent = wrapIcon(rawMap.Radical, 'Radical');
export const Radio: IconComponent = wrapIcon(rawMap.Radio, 'Radio');
export const Receipt: IconComponent = wrapIcon(rawMap.Receipt, 'Receipt');
export const Record: IconComponent = wrapIcon(rawMap.Record, 'Record');
export const Recycle: IconComponent = wrapIcon(rawMap.Recycle, 'Recycle');
export const RefreshCcw: IconComponent = wrapIcon(rawMap.RefreshCcw, 'RefreshCcw');
export const RefreshCcwSparkles: IconComponent = wrapIcon(
  rawMap.RefreshCcwSparkles,
  'RefreshCcwSparkles',
);
export const RefreshCw: IconComponent = wrapIcon(rawMap.RefreshCw, 'RefreshCw');
export const RefreshCwSparkles: IconComponent = wrapIcon(
  rawMap.RefreshCwSparkles,
  'RefreshCwSparkles',
);
export const Repeat: IconComponent = wrapIcon(rawMap.Repeat, 'Repeat');
export const Repeat1: IconComponent = wrapIcon(rawMap.Repeat1, 'Repeat1');
export const Replay: IconComponent = wrapIcon(rawMap.Replay, 'Replay');
export const Reply: IconComponent = wrapIcon(rawMap.Reply, 'Reply');
export const ReplyAll: IconComponent = wrapIcon(rawMap.ReplyAll, 'ReplyAll');
export const Rewind: IconComponent = wrapIcon(rawMap.Rewind, 'Rewind');
export const Rocket: IconComponent = wrapIcon(rawMap.Rocket, 'Rocket');
export const RocketFast: IconComponent = wrapIcon(rawMap.RocketFast, 'RocketFast');
export const RocketVertical: IconComponent = wrapIcon(rawMap.RocketVertical, 'RocketVertical');
export const RotateCcw: IconComponent = wrapIcon(rawMap.RotateCcw, 'RotateCcw');
export const RotateCw: IconComponent = wrapIcon(rawMap.RotateCw, 'RotateCw');
export const RotateCwPlus: IconComponent = wrapIcon(rawMap.RotateCwPlus, 'RotateCwPlus');
export const Route: IconComponent = wrapIcon(rawMap.Route, 'Route');
export const RouteOff: IconComponent = wrapIcon(rawMap.RouteOff, 'RouteOff');
export const Save: IconComponent = wrapIcon(rawMap.Save, 'Save');
export const SaveCheck: IconComponent = wrapIcon(rawMap.SaveCheck, 'SaveCheck');
export const SaveMinus: IconComponent = wrapIcon(rawMap.SaveMinus, 'SaveMinus');
export const SaveOff: IconComponent = wrapIcon(rawMap.SaveOff, 'SaveOff');
export const SavePlus: IconComponent = wrapIcon(rawMap.SavePlus, 'SavePlus');
export const SaveX: IconComponent = wrapIcon(rawMap.SaveX, 'SaveX');
export const Scan: IconComponent = wrapIcon(rawMap.Scan, 'Scan');
export const ScanBarcode: IconComponent = wrapIcon(rawMap.ScanBarcode, 'ScanBarcode');
export const ScanEye: IconComponent = wrapIcon(rawMap.ScanEye, 'ScanEye');
export const ScanFace: IconComponent = wrapIcon(rawMap.ScanFace, 'ScanFace');
export const ScanLine: IconComponent = wrapIcon(rawMap.ScanLine, 'ScanLine');
export const ScanQrCode: IconComponent = wrapIcon(rawMap.ScanQrCode, 'ScanQrCode');
export const ScanSearch: IconComponent = wrapIcon(rawMap.ScanSearch, 'ScanSearch');
export const ScanText: IconComponent = wrapIcon(rawMap.ScanText, 'ScanText');
export const ScanTextSparkles: IconComponent = wrapIcon(
  rawMap.ScanTextSparkles,
  'ScanTextSparkles',
);
export const Scissors: IconComponent = wrapIcon(rawMap.Scissors, 'Scissors');
export const ScissorsHorizontal: IconComponent = wrapIcon(
  rawMap.ScissorsHorizontal,
  'ScissorsHorizontal',
);
export const Search: IconComponent = wrapIcon(rawMap.Search, 'Search');
export const Search2: IconComponent = wrapIcon(rawMap.Search2, 'Search2');
export const Search2Check: IconComponent = wrapIcon(rawMap.Search2Check, 'Search2Check');
export const Search2List: IconComponent = wrapIcon(rawMap.Search2List, 'Search2List');
export const Search2Minus: IconComponent = wrapIcon(rawMap.Search2Minus, 'Search2Minus');
export const Search2Plus: IconComponent = wrapIcon(rawMap.Search2Plus, 'Search2Plus');
export const Search2Sparkles: IconComponent = wrapIcon(rawMap.Search2Sparkles, 'Search2Sparkles');
export const Search2X: IconComponent = wrapIcon(rawMap.Search2X, 'Search2X');
export const SearchCheck: IconComponent = wrapIcon(rawMap.SearchCheck, 'SearchCheck');
export const SearchList: IconComponent = wrapIcon(rawMap.SearchList, 'SearchList');
export const SearchMinus: IconComponent = wrapIcon(rawMap.SearchMinus, 'SearchMinus');
export const SearchPlus: IconComponent = wrapIcon(rawMap.SearchPlus, 'SearchPlus');
export const SearchSlash: IconComponent = wrapIcon(rawMap.SearchSlash, 'SearchSlash');
export const SearchSparkles: IconComponent = wrapIcon(rawMap.SearchSparkles, 'SearchSparkles');
export const SearchX: IconComponent = wrapIcon(rawMap.SearchX, 'SearchX');
export const Send: IconComponent = wrapIcon(rawMap.Send, 'Send');
export const SendClock: IconComponent = wrapIcon(rawMap.SendClock, 'SendClock');
export const SendFast: IconComponent = wrapIcon(rawMap.SendFast, 'SendFast');
export const SendHorizontal: IconComponent = wrapIcon(rawMap.SendHorizontal, 'SendHorizontal');
export const SendHorizontalSparkles: IconComponent = wrapIcon(
  rawMap.SendHorizontalSparkles,
  'SendHorizontalSparkles',
);
export const SendSparkles: IconComponent = wrapIcon(rawMap.SendSparkles, 'SendSparkles');
export const Server: IconComponent = wrapIcon(rawMap.Server, 'Server');
export const ServerMinus: IconComponent = wrapIcon(rawMap.ServerMinus, 'ServerMinus');
export const ServerPlus: IconComponent = wrapIcon(rawMap.ServerPlus, 'ServerPlus');
export const ServerZap: IconComponent = wrapIcon(rawMap.ServerZap, 'ServerZap');
export const Settings: IconComponent = wrapIcon(rawMap.Settings, 'Settings');
export const SettingsDot: IconComponent = wrapIcon(rawMap.SettingsDot, 'SettingsDot');
export const Shapes: IconComponent = wrapIcon(rawMap.Shapes, 'Shapes');
export const Shapes2: IconComponent = wrapIcon(rawMap.Shapes2, 'Shapes2');
export const Share: IconComponent = wrapIcon(rawMap.Share, 'Share');
export const Share2: IconComponent = wrapIcon(rawMap.Share2, 'Share2');
export const Shield: IconComponent = wrapIcon(rawMap.Shield, 'Shield');
export const ShieldAlert: IconComponent = wrapIcon(rawMap.ShieldAlert, 'ShieldAlert');
export const ShieldCheck: IconComponent = wrapIcon(rawMap.ShieldCheck, 'ShieldCheck');
export const ShieldHeart: IconComponent = wrapIcon(rawMap.ShieldHeart, 'ShieldHeart');
export const ShieldKey: IconComponent = wrapIcon(rawMap.ShieldKey, 'ShieldKey');
export const ShieldLock: IconComponent = wrapIcon(rawMap.ShieldLock, 'ShieldLock');
export const ShieldMinus: IconComponent = wrapIcon(rawMap.ShieldMinus, 'ShieldMinus');
export const ShieldOff: IconComponent = wrapIcon(rawMap.ShieldOff, 'ShieldOff');
export const ShieldPlus: IconComponent = wrapIcon(rawMap.ShieldPlus, 'ShieldPlus');
export const ShieldQuestion: IconComponent = wrapIcon(rawMap.ShieldQuestion, 'ShieldQuestion');
export const ShieldSparkles: IconComponent = wrapIcon(rawMap.ShieldSparkles, 'ShieldSparkles');
export const ShieldTerminal: IconComponent = wrapIcon(rawMap.ShieldTerminal, 'ShieldTerminal');
export const ShieldUser: IconComponent = wrapIcon(rawMap.ShieldUser, 'ShieldUser');
export const ShieldX: IconComponent = wrapIcon(rawMap.ShieldX, 'ShieldX');
export const Ship: IconComponent = wrapIcon(rawMap.Ship, 'Ship');
export const Shirt: IconComponent = wrapIcon(rawMap.Shirt, 'Shirt');
export const ShirtSparkles: IconComponent = wrapIcon(rawMap.ShirtSparkles, 'ShirtSparkles');
export const ShoppingBag: IconComponent = wrapIcon(rawMap.ShoppingBag, 'ShoppingBag');
export const ShoppingBasket: IconComponent = wrapIcon(rawMap.ShoppingBasket, 'ShoppingBasket');
export const ShoppingBasketPlus: IconComponent = wrapIcon(
  rawMap.ShoppingBasketPlus,
  'ShoppingBasketPlus',
);
export const ShoppingCart: IconComponent = wrapIcon(rawMap.ShoppingCart, 'ShoppingCart');
export const ShoppingCartPlus: IconComponent = wrapIcon(
  rawMap.ShoppingCartPlus,
  'ShoppingCartPlus',
);
export const ShoppingCartSparkles: IconComponent = wrapIcon(
  rawMap.ShoppingCartSparkles,
  'ShoppingCartSparkles',
);
export const Shredder: IconComponent = wrapIcon(rawMap.Shredder, 'Shredder');
export const Shuffle: IconComponent = wrapIcon(rawMap.Shuffle, 'Shuffle');
export const Signal: IconComponent = wrapIcon(rawMap.Signal, 'Signal');
export const SignalHigh: IconComponent = wrapIcon(rawMap.SignalHigh, 'SignalHigh');
export const SignalLow: IconComponent = wrapIcon(rawMap.SignalLow, 'SignalLow');
export const SignalMedium: IconComponent = wrapIcon(rawMap.SignalMedium, 'SignalMedium');
export const SignalSparkles: IconComponent = wrapIcon(rawMap.SignalSparkles, 'SignalSparkles');
export const Siren: IconComponent = wrapIcon(rawMap.Siren, 'Siren');
export const SkipBack: IconComponent = wrapIcon(rawMap.SkipBack, 'SkipBack');
export const SkipForward: IconComponent = wrapIcon(rawMap.SkipForward, 'SkipForward');
export const Slash: IconComponent = wrapIcon(rawMap.Slash, 'Slash');
export const Sliders2Horizontal: IconComponent = wrapIcon(
  rawMap.Sliders2Horizontal,
  'Sliders2Horizontal',
);
export const Sliders2Vertical: IconComponent = wrapIcon(
  rawMap.Sliders2Vertical,
  'Sliders2Vertical',
);
export const SlidersHorizontal: IconComponent = wrapIcon(
  rawMap.SlidersHorizontal,
  'SlidersHorizontal',
);
export const SlidersHorizontalSparkles: IconComponent = wrapIcon(
  rawMap.SlidersHorizontalSparkles,
  'SlidersHorizontalSparkles',
);
export const SlidersVertical: IconComponent = wrapIcon(rawMap.SlidersVertical, 'SlidersVertical');
export const Smartphone: IconComponent = wrapIcon(rawMap.Smartphone, 'Smartphone');
export const SmartphoneArrowDown: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowDown,
  'SmartphoneArrowDown',
);
export const SmartphoneArrowDownLeft: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowDownLeft,
  'SmartphoneArrowDownLeft',
);
export const SmartphoneArrowInDownRight: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowInDownRight,
  'SmartphoneArrowInDownRight',
);
export const SmartphoneArrowInRight: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowInRight,
  'SmartphoneArrowInRight',
);
export const SmartphoneArrowInUp: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowInUp,
  'SmartphoneArrowInUp',
);
export const SmartphoneArrowInUpRight: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowInUpRight,
  'SmartphoneArrowInUpRight',
);
export const SmartphoneArrowLeft: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowLeft,
  'SmartphoneArrowLeft',
);
export const SmartphoneArrowUpLeft: IconComponent = wrapIcon(
  rawMap.SmartphoneArrowUpLeft,
  'SmartphoneArrowUpLeft',
);
export const SmartphoneCast: IconComponent = wrapIcon(rawMap.SmartphoneCast, 'SmartphoneCast');
export const SmartphoneCheck: IconComponent = wrapIcon(rawMap.SmartphoneCheck, 'SmartphoneCheck');
export const SmartphoneHorizontal: IconComponent = wrapIcon(
  rawMap.SmartphoneHorizontal,
  'SmartphoneHorizontal',
);
export const SmartphoneMinus: IconComponent = wrapIcon(rawMap.SmartphoneMinus, 'SmartphoneMinus');
export const SmartphonePlus: IconComponent = wrapIcon(rawMap.SmartphonePlus, 'SmartphonePlus');
export const SmartphoneSparkles: IconComponent = wrapIcon(
  rawMap.SmartphoneSparkles,
  'SmartphoneSparkles',
);
export const SmartphoneX: IconComponent = wrapIcon(rawMap.SmartphoneX, 'SmartphoneX');
export const SmartphoneZap: IconComponent = wrapIcon(rawMap.SmartphoneZap, 'SmartphoneZap');
export const Snowflake: IconComponent = wrapIcon(rawMap.Snowflake, 'Snowflake');
export const SoccerBall: IconComponent = wrapIcon(rawMap.SoccerBall, 'SoccerBall');
export const Sofa: IconComponent = wrapIcon(rawMap.Sofa, 'Sofa');
export const Soup: IconComponent = wrapIcon(rawMap.Soup, 'Soup');
export const Space: IconComponent = wrapIcon(rawMap.Space, 'Space');
export const Sparkle: IconComponent = wrapIcon(rawMap.Sparkle, 'Sparkle');
export const Sparkles: IconComponent = wrapIcon(rawMap.Sparkles, 'Sparkles');
export const Square: IconComponent = wrapIcon(rawMap.Square, 'Square');
export const SquareActivity: IconComponent = wrapIcon(rawMap.SquareActivity, 'SquareActivity');
export const SquareAlert: IconComponent = wrapIcon(rawMap.SquareAlert, 'SquareAlert');
export const SquareAlignOffsetBottom: IconComponent = wrapIcon(
  rawMap.SquareAlignOffsetBottom,
  'SquareAlignOffsetBottom',
);
export const SquareAlignOffsetLeft: IconComponent = wrapIcon(
  rawMap.SquareAlignOffsetLeft,
  'SquareAlignOffsetLeft',
);
export const SquareAlignOffsetRight: IconComponent = wrapIcon(
  rawMap.SquareAlignOffsetRight,
  'SquareAlignOffsetRight',
);
export const SquareAlignOffsetTop: IconComponent = wrapIcon(
  rawMap.SquareAlignOffsetTop,
  'SquareAlignOffsetTop',
);
export const SquareArrowDown: IconComponent = wrapIcon(rawMap.SquareArrowDown, 'SquareArrowDown');
export const SquareArrowDownLeft: IconComponent = wrapIcon(
  rawMap.SquareArrowDownLeft,
  'SquareArrowDownLeft',
);
export const SquareArrowDownRight: IconComponent = wrapIcon(
  rawMap.SquareArrowDownRight,
  'SquareArrowDownRight',
);
export const SquareArrowInDownLeft: IconComponent = wrapIcon(
  rawMap.SquareArrowInDownLeft,
  'SquareArrowInDownLeft',
);
export const SquareArrowInDownRight: IconComponent = wrapIcon(
  rawMap.SquareArrowInDownRight,
  'SquareArrowInDownRight',
);
export const SquareArrowInUpLeft: IconComponent = wrapIcon(
  rawMap.SquareArrowInUpLeft,
  'SquareArrowInUpLeft',
);
export const SquareArrowInUpRight: IconComponent = wrapIcon(
  rawMap.SquareArrowInUpRight,
  'SquareArrowInUpRight',
);
export const SquareArrowLeft: IconComponent = wrapIcon(rawMap.SquareArrowLeft, 'SquareArrowLeft');
export const SquareArrowOutDownLeft: IconComponent = wrapIcon(
  rawMap.SquareArrowOutDownLeft,
  'SquareArrowOutDownLeft',
);
export const SquareArrowOutDownRight: IconComponent = wrapIcon(
  rawMap.SquareArrowOutDownRight,
  'SquareArrowOutDownRight',
);
export const SquareArrowOutUpLeft: IconComponent = wrapIcon(
  rawMap.SquareArrowOutUpLeft,
  'SquareArrowOutUpLeft',
);
export const SquareArrowOutUpRight: IconComponent = wrapIcon(
  rawMap.SquareArrowOutUpRight,
  'SquareArrowOutUpRight',
);
export const SquareArrowRight: IconComponent = wrapIcon(
  rawMap.SquareArrowRight,
  'SquareArrowRight',
);
export const SquareArrowUTurnLeft: IconComponent = wrapIcon(
  rawMap.SquareArrowUTurnLeft,
  'SquareArrowUTurnLeft',
);
export const SquareArrowUTurnRight: IconComponent = wrapIcon(
  rawMap.SquareArrowUTurnRight,
  'SquareArrowUTurnRight',
);
export const SquareArrowUp: IconComponent = wrapIcon(rawMap.SquareArrowUp, 'SquareArrowUp');
export const SquareArrowUpLeft: IconComponent = wrapIcon(
  rawMap.SquareArrowUpLeft,
  'SquareArrowUpLeft',
);
export const SquareArrowUpRight: IconComponent = wrapIcon(
  rawMap.SquareArrowUpRight,
  'SquareArrowUpRight',
);
export const SquareAsterisk: IconComponent = wrapIcon(rawMap.SquareAsterisk, 'SquareAsterisk');
export const SquareBarChart: IconComponent = wrapIcon(rawMap.SquareBarChart, 'SquareBarChart');
export const SquareBarChart2: IconComponent = wrapIcon(rawMap.SquareBarChart2, 'SquareBarChart2');
export const SquareBarChart2Down: IconComponent = wrapIcon(
  rawMap.SquareBarChart2Down,
  'SquareBarChart2Down',
);
export const SquareBarChart2HorizontalEnd: IconComponent = wrapIcon(
  rawMap.SquareBarChart2HorizontalEnd,
  'SquareBarChart2HorizontalEnd',
);
export const SquareBarChart2HorizontalStart: IconComponent = wrapIcon(
  rawMap.SquareBarChart2HorizontalStart,
  'SquareBarChart2HorizontalStart',
);
export const SquareBarChartDown: IconComponent = wrapIcon(
  rawMap.SquareBarChartDown,
  'SquareBarChartDown',
);
export const SquareBarChartHorizontalEnd: IconComponent = wrapIcon(
  rawMap.SquareBarChartHorizontalEnd,
  'SquareBarChartHorizontalEnd',
);
export const SquareBarChartHorizontalStart: IconComponent = wrapIcon(
  rawMap.SquareBarChartHorizontalStart,
  'SquareBarChartHorizontalStart',
);
export const SquareCaretDown: IconComponent = wrapIcon(rawMap.SquareCaretDown, 'SquareCaretDown');
export const SquareCaretLeft: IconComponent = wrapIcon(rawMap.SquareCaretLeft, 'SquareCaretLeft');
export const SquareCaretRight: IconComponent = wrapIcon(
  rawMap.SquareCaretRight,
  'SquareCaretRight',
);
export const SquareCaretUp: IconComponent = wrapIcon(rawMap.SquareCaretUp, 'SquareCaretUp');
export const SquareCheck: IconComponent = wrapIcon(rawMap.SquareCheck, 'SquareCheck');
export const SquareChevronDown: IconComponent = wrapIcon(
  rawMap.SquareChevronDown,
  'SquareChevronDown',
);
export const SquareChevronLeft: IconComponent = wrapIcon(
  rawMap.SquareChevronLeft,
  'SquareChevronLeft',
);
export const SquareChevronRight: IconComponent = wrapIcon(
  rawMap.SquareChevronRight,
  'SquareChevronRight',
);
export const SquareChevronUp: IconComponent = wrapIcon(rawMap.SquareChevronUp, 'SquareChevronUp');
export const SquareChevronsDown: IconComponent = wrapIcon(
  rawMap.SquareChevronsDown,
  'SquareChevronsDown',
);
export const SquareChevronsLeft: IconComponent = wrapIcon(
  rawMap.SquareChevronsLeft,
  'SquareChevronsLeft',
);
export const SquareChevronsRight: IconComponent = wrapIcon(
  rawMap.SquareChevronsRight,
  'SquareChevronsRight',
);
export const SquareChevronsUp: IconComponent = wrapIcon(
  rawMap.SquareChevronsUp,
  'SquareChevronsUp',
);
export const SquareCursor: IconComponent = wrapIcon(rawMap.SquareCursor, 'SquareCursor');
export const SquareDashed: IconComponent = wrapIcon(rawMap.SquareDashed, 'SquareDashed');
export const SquareDashedFull: IconComponent = wrapIcon(
  rawMap.SquareDashedFull,
  'SquareDashedFull',
);
export const SquareDashedHalf: IconComponent = wrapIcon(
  rawMap.SquareDashedHalf,
  'SquareDashedHalf',
);
export const SquareDashedQuarter: IconComponent = wrapIcon(
  rawMap.SquareDashedQuarter,
  'SquareDashedQuarter',
);
export const SquareDashedThreeQuarter: IconComponent = wrapIcon(
  rawMap.SquareDashedThreeQuarter,
  'SquareDashedThreeQuarter',
);
export const SquareDivide: IconComponent = wrapIcon(rawMap.SquareDivide, 'SquareDivide');
export const SquareEqual: IconComponent = wrapIcon(rawMap.SquareEqual, 'SquareEqual');
export const SquareFull: IconComponent = wrapIcon(rawMap.SquareFull, 'SquareFull');
export const SquareHalf: IconComponent = wrapIcon(rawMap.SquareHalf, 'SquareHalf');
export const SquareMenu: IconComponent = wrapIcon(rawMap.SquareMenu, 'SquareMenu');
export const SquareMinus: IconComponent = wrapIcon(rawMap.SquareMinus, 'SquareMinus');
export const SquareMoreHorizontal: IconComponent = wrapIcon(
  rawMap.SquareMoreHorizontal,
  'SquareMoreHorizontal',
);
export const SquareMoreVertical: IconComponent = wrapIcon(
  rawMap.SquareMoreVertical,
  'SquareMoreVertical',
);
export const SquareNavigation: IconComponent = wrapIcon(
  rawMap.SquareNavigation,
  'SquareNavigation',
);
export const SquarePause: IconComponent = wrapIcon(rawMap.SquarePause, 'SquarePause');
export const SquarePen: IconComponent = wrapIcon(rawMap.SquarePen, 'SquarePen');
export const SquarePercent: IconComponent = wrapIcon(rawMap.SquarePercent, 'SquarePercent');
export const SquarePlay: IconComponent = wrapIcon(rawMap.SquarePlay, 'SquarePlay');
export const SquarePlayOff: IconComponent = wrapIcon(rawMap.SquarePlayOff, 'SquarePlayOff');
export const SquarePlus: IconComponent = wrapIcon(rawMap.SquarePlus, 'SquarePlus');
export const SquareQuarter: IconComponent = wrapIcon(rawMap.SquareQuarter, 'SquareQuarter');
export const SquareQuestion: IconComponent = wrapIcon(rawMap.SquareQuestion, 'SquareQuestion');
export const SquareRadical: IconComponent = wrapIcon(rawMap.SquareRadical, 'SquareRadical');
export const SquareRecord: IconComponent = wrapIcon(rawMap.SquareRecord, 'SquareRecord');
export const SquareSlash: IconComponent = wrapIcon(rawMap.SquareSlash, 'SquareSlash');
export const SquareStop: IconComponent = wrapIcon(rawMap.SquareStop, 'SquareStop');
export const SquareTerminal: IconComponent = wrapIcon(rawMap.SquareTerminal, 'SquareTerminal');
export const SquareTerminalAsterisk: IconComponent = wrapIcon(
  rawMap.SquareTerminalAsterisk,
  'SquareTerminalAsterisk',
);
export const SquareThreeQuarter: IconComponent = wrapIcon(
  rawMap.SquareThreeQuarter,
  'SquareThreeQuarter',
);
export const SquareTrendingDown: IconComponent = wrapIcon(
  rawMap.SquareTrendingDown,
  'SquareTrendingDown',
);
export const SquareTrendingUp: IconComponent = wrapIcon(
  rawMap.SquareTrendingUp,
  'SquareTrendingUp',
);
export const SquareX: IconComponent = wrapIcon(rawMap.SquareX, 'SquareX');
export const Stamp: IconComponent = wrapIcon(rawMap.Stamp, 'Stamp');
export const Star: IconComponent = wrapIcon(rawMap.Star, 'Star');
export const StarOff: IconComponent = wrapIcon(rawMap.StarOff, 'StarOff');
export const StarShooting: IconComponent = wrapIcon(rawMap.StarShooting, 'StarShooting');
export const StickyNote: IconComponent = wrapIcon(rawMap.StickyNote, 'StickyNote');
export const StickyNoteCheck: IconComponent = wrapIcon(rawMap.StickyNoteCheck, 'StickyNoteCheck');
export const StickyNoteMinus: IconComponent = wrapIcon(rawMap.StickyNoteMinus, 'StickyNoteMinus');
export const StickyNoteOff: IconComponent = wrapIcon(rawMap.StickyNoteOff, 'StickyNoteOff');
export const StickyNotePlus: IconComponent = wrapIcon(rawMap.StickyNotePlus, 'StickyNotePlus');
export const StickyNoteSparkles: IconComponent = wrapIcon(
  rawMap.StickyNoteSparkles,
  'StickyNoteSparkles',
);
export const StickyNoteX: IconComponent = wrapIcon(rawMap.StickyNoteX, 'StickyNoteX');
export const StickyNotes: IconComponent = wrapIcon(rawMap.StickyNotes, 'StickyNotes');
export const Stop: IconComponent = wrapIcon(rawMap.Stop, 'Stop');
export const Store: IconComponent = wrapIcon(rawMap.Store, 'Store');
export const Strikethrough: IconComponent = wrapIcon(rawMap.Strikethrough, 'Strikethrough');
export const Subtitles: IconComponent = wrapIcon(rawMap.Subtitles, 'Subtitles');
export const SubtitlesOff: IconComponent = wrapIcon(rawMap.SubtitlesOff, 'SubtitlesOff');
export const SubtitlesSparkles: IconComponent = wrapIcon(
  rawMap.SubtitlesSparkles,
  'SubtitlesSparkles',
);
export const Sun: IconComponent = wrapIcon(rawMap.Sun, 'Sun');
export const SunDim: IconComponent = wrapIcon(rawMap.SunDim, 'SunDim');
export const SunMedium: IconComponent = wrapIcon(rawMap.SunMedium, 'SunMedium');
export const Sunrise: IconComponent = wrapIcon(rawMap.Sunrise, 'Sunrise');
export const Sunset: IconComponent = wrapIcon(rawMap.Sunset, 'Sunset');
export const SwatchBook: IconComponent = wrapIcon(rawMap.SwatchBook, 'SwatchBook');
export const SwissFranc: IconComponent = wrapIcon(rawMap.SwissFranc, 'SwissFranc');
export const Table: IconComponent = wrapIcon(rawMap.Table, 'Table');
export const TableCellsMerge: IconComponent = wrapIcon(rawMap.TableCellsMerge, 'TableCellsMerge');
export const TableCellsRows: IconComponent = wrapIcon(rawMap.TableCellsRows, 'TableCellsRows');
export const TableCellsSplit: IconComponent = wrapIcon(rawMap.TableCellsSplit, 'TableCellsSplit');
export const TableColumnsAddAfter: IconComponent = wrapIcon(
  rawMap.TableColumnsAddAfter,
  'TableColumnsAddAfter',
);
export const TableColumnsAddBefore: IconComponent = wrapIcon(
  rawMap.TableColumnsAddBefore,
  'TableColumnsAddBefore',
);
export const TableColumnsMergeNext: IconComponent = wrapIcon(
  rawMap.TableColumnsMergeNext,
  'TableColumnsMergeNext',
);
export const TableColumnsMergePrevious: IconComponent = wrapIcon(
  rawMap.TableColumnsMergePrevious,
  'TableColumnsMergePrevious',
);
export const TableColumnsRemoveAfter: IconComponent = wrapIcon(
  rawMap.TableColumnsRemoveAfter,
  'TableColumnsRemoveAfter',
);
export const TableColumnsRemoveBefore: IconComponent = wrapIcon(
  rawMap.TableColumnsRemoveBefore,
  'TableColumnsRemoveBefore',
);
export const TableOff: IconComponent = wrapIcon(rawMap.TableOff, 'TableOff');
export const TablePivot: IconComponent = wrapIcon(rawMap.TablePivot, 'TablePivot');
export const TableRows: IconComponent = wrapIcon(rawMap.TableRows, 'TableRows');
export const TableRowsAddAbove: IconComponent = wrapIcon(
  rawMap.TableRowsAddAbove,
  'TableRowsAddAbove',
);
export const TableRowsAddBelow: IconComponent = wrapIcon(
  rawMap.TableRowsAddBelow,
  'TableRowsAddBelow',
);
export const TableRowsMergeNext: IconComponent = wrapIcon(
  rawMap.TableRowsMergeNext,
  'TableRowsMergeNext',
);
export const TableRowsMergePrevious: IconComponent = wrapIcon(
  rawMap.TableRowsMergePrevious,
  'TableRowsMergePrevious',
);
export const TableRowsRemoveAbove: IconComponent = wrapIcon(
  rawMap.TableRowsRemoveAbove,
  'TableRowsRemoveAbove',
);
export const TableRowsRemoveBelow: IconComponent = wrapIcon(
  rawMap.TableRowsRemoveBelow,
  'TableRowsRemoveBelow',
);
export const TableTree: IconComponent = wrapIcon(rawMap.TableTree, 'TableTree');
export const Tablet: IconComponent = wrapIcon(rawMap.Tablet, 'Tablet');
export const TabletArrowDown: IconComponent = wrapIcon(rawMap.TabletArrowDown, 'TabletArrowDown');
export const TabletArrowInRight: IconComponent = wrapIcon(
  rawMap.TabletArrowInRight,
  'TabletArrowInRight',
);
export const TabletArrowInUp: IconComponent = wrapIcon(rawMap.TabletArrowInUp, 'TabletArrowInUp');
export const TabletArrowLeft: IconComponent = wrapIcon(rawMap.TabletArrowLeft, 'TabletArrowLeft');
export const TabletCheck: IconComponent = wrapIcon(rawMap.TabletCheck, 'TabletCheck');
export const TabletMinus: IconComponent = wrapIcon(rawMap.TabletMinus, 'TabletMinus');
export const TabletPlus: IconComponent = wrapIcon(rawMap.TabletPlus, 'TabletPlus');
export const TabletVertical: IconComponent = wrapIcon(rawMap.TabletVertical, 'TabletVertical');
export const TabletX: IconComponent = wrapIcon(rawMap.TabletX, 'TabletX');
export const TabletZap: IconComponent = wrapIcon(rawMap.TabletZap, 'TabletZap');
export const Tag: IconComponent = wrapIcon(rawMap.Tag, 'Tag');
export const TagHorizontalEnd: IconComponent = wrapIcon(
  rawMap.TagHorizontalEnd,
  'TagHorizontalEnd',
);
export const TagHorizontalEndPercent: IconComponent = wrapIcon(
  rawMap.TagHorizontalEndPercent,
  'TagHorizontalEndPercent',
);
export const TagHorizontalStart: IconComponent = wrapIcon(
  rawMap.TagHorizontalStart,
  'TagHorizontalStart',
);
export const TagHorizontalStartPercent: IconComponent = wrapIcon(
  rawMap.TagHorizontalStartPercent,
  'TagHorizontalStartPercent',
);
export const TagHorizontalStartSparkles: IconComponent = wrapIcon(
  rawMap.TagHorizontalStartSparkles,
  'TagHorizontalStartSparkles',
);
export const TagSparkles: IconComponent = wrapIcon(rawMap.TagSparkles, 'TagSparkles');
export const Tape: IconComponent = wrapIcon(rawMap.Tape, 'Tape');
export const Target: IconComponent = wrapIcon(rawMap.Target, 'Target');
export const TemperatureEmpty: IconComponent = wrapIcon(
  rawMap.TemperatureEmpty,
  'TemperatureEmpty',
);
export const TemperatureFull: IconComponent = wrapIcon(rawMap.TemperatureFull, 'TemperatureFull');
export const TemperatureHalf: IconComponent = wrapIcon(rawMap.TemperatureHalf, 'TemperatureHalf');
export const TemperatureHigh: IconComponent = wrapIcon(rawMap.TemperatureHigh, 'TemperatureHigh');
export const TemperatureQuarter: IconComponent = wrapIcon(
  rawMap.TemperatureQuarter,
  'TemperatureQuarter',
);
export const TennisBall: IconComponent = wrapIcon(rawMap.TennisBall, 'TennisBall');
export const Terminal: IconComponent = wrapIcon(rawMap.Terminal, 'Terminal');
export const TerminalAsterisk: IconComponent = wrapIcon(
  rawMap.TerminalAsterisk,
  'TerminalAsterisk',
);
export const TerminalCursor: IconComponent = wrapIcon(rawMap.TerminalCursor, 'TerminalCursor');
export const TerminalPlus: IconComponent = wrapIcon(rawMap.TerminalPlus, 'TerminalPlus');
export const TerminalSparkles: IconComponent = wrapIcon(
  rawMap.TerminalSparkles,
  'TerminalSparkles',
);
export const TestTube: IconComponent = wrapIcon(rawMap.TestTube, 'TestTube');
export const TestTubeDiagonal: IconComponent = wrapIcon(
  rawMap.TestTubeDiagonal,
  'TestTubeDiagonal',
);
export const TestTubes: IconComponent = wrapIcon(rawMap.TestTubes, 'TestTubes');
export const TextQuote: IconComponent = wrapIcon(rawMap.TextQuote, 'TextQuote');
export const Thermometer: IconComponent = wrapIcon(rawMap.Thermometer, 'Thermometer');
export const ThermometerSnowflake: IconComponent = wrapIcon(
  rawMap.ThermometerSnowflake,
  'ThermometerSnowflake',
);
export const ThermometerSun: IconComponent = wrapIcon(rawMap.ThermometerSun, 'ThermometerSun');
export const ThumbsDown: IconComponent = wrapIcon(rawMap.ThumbsDown, 'ThumbsDown');
export const ThumbsUp: IconComponent = wrapIcon(rawMap.ThumbsUp, 'ThumbsUp');
export const Timer: IconComponent = wrapIcon(rawMap.Timer, 'Timer');
export const TimerFast: IconComponent = wrapIcon(rawMap.TimerFast, 'TimerFast');
export const TimerReset: IconComponent = wrapIcon(rawMap.TimerReset, 'TimerReset');
export const ToggleOff: IconComponent = wrapIcon(rawMap.ToggleOff, 'ToggleOff');
export const ToggleOn: IconComponent = wrapIcon(rawMap.ToggleOn, 'ToggleOn');
export const Toggles: IconComponent = wrapIcon(rawMap.Toggles, 'Toggles');
export const Toolbox: IconComponent = wrapIcon(rawMap.Toolbox, 'Toolbox');
export const TrafficLight: IconComponent = wrapIcon(rawMap.TrafficLight, 'TrafficLight');
export const TreeDeciduous: IconComponent = wrapIcon(rawMap.TreeDeciduous, 'TreeDeciduous');
export const TreePalm: IconComponent = wrapIcon(rawMap.TreePalm, 'TreePalm');
export const TrendingDown: IconComponent = wrapIcon(rawMap.TrendingDown, 'TrendingDown');
export const TrendingUp: IconComponent = wrapIcon(rawMap.TrendingUp, 'TrendingUp');
export const TrendingUpDown: IconComponent = wrapIcon(rawMap.TrendingUpDown, 'TrendingUpDown');
export const TriangleAlert: IconComponent = wrapIcon(rawMap.TriangleAlert, 'TriangleAlert');
export const Trophy: IconComponent = wrapIcon(rawMap.Trophy, 'Trophy');
export const Truck: IconComponent = wrapIcon(rawMap.Truck, 'Truck');
export const TruckArrowDown: IconComponent = wrapIcon(rawMap.TruckArrowDown, 'TruckArrowDown');
export const TruckArrowLeft: IconComponent = wrapIcon(rawMap.TruckArrowLeft, 'TruckArrowLeft');
export const TruckArrowRight: IconComponent = wrapIcon(rawMap.TruckArrowRight, 'TruckArrowRight');
export const TruckArrowUp: IconComponent = wrapIcon(rawMap.TruckArrowUp, 'TruckArrowUp');
export const TruckCheck: IconComponent = wrapIcon(rawMap.TruckCheck, 'TruckCheck');
export const TruckElectric: IconComponent = wrapIcon(rawMap.TruckElectric, 'TruckElectric');
export const TruckFast: IconComponent = wrapIcon(rawMap.TruckFast, 'TruckFast');
export const TruckMinus: IconComponent = wrapIcon(rawMap.TruckMinus, 'TruckMinus');
export const TruckPlus: IconComponent = wrapIcon(rawMap.TruckPlus, 'TruckPlus');
export const TruckSparkles: IconComponent = wrapIcon(rawMap.TruckSparkles, 'TruckSparkles');
export const TruckX: IconComponent = wrapIcon(rawMap.TruckX, 'TruckX');
export const Tv: IconComponent = wrapIcon(rawMap.Tv, 'Tv');
export const TypeOutline: IconComponent = wrapIcon(rawMap.TypeOutline, 'TypeOutline');
export const Umbrella: IconComponent = wrapIcon(rawMap.Umbrella, 'Umbrella');
export const UmbrellaOff: IconComponent = wrapIcon(rawMap.UmbrellaOff, 'UmbrellaOff');
export const Underline: IconComponent = wrapIcon(rawMap.Underline, 'Underline');
export const Unlink: IconComponent = wrapIcon(rawMap.Unlink, 'Unlink');
export const Unlock: IconComponent = wrapIcon(rawMap.Unlock, 'Unlock');
export const Upload: IconComponent = wrapIcon(rawMap.Upload, 'Upload');
export const Usb: IconComponent = wrapIcon(rawMap.Usb, 'Usb');
export const UsbDrive: IconComponent = wrapIcon(rawMap.UsbDrive, 'UsbDrive');
export const User: IconComponent = wrapIcon(rawMap.User, 'User');
export const UserCheck: IconComponent = wrapIcon(rawMap.UserCheck, 'UserCheck');
export const UserMinus: IconComponent = wrapIcon(rawMap.UserMinus, 'UserMinus');
export const UserPlus: IconComponent = wrapIcon(rawMap.UserPlus, 'UserPlus');
export const UserSparkles: IconComponent = wrapIcon(rawMap.UserSparkles, 'UserSparkles');
export const UserVoice: IconComponent = wrapIcon(rawMap.UserVoice, 'UserVoice');
export const UserX: IconComponent = wrapIcon(rawMap.UserX, 'UserX');
export const UserZap: IconComponent = wrapIcon(rawMap.UserZap, 'UserZap');
export const Users: IconComponent = wrapIcon(rawMap.Users, 'Users');
export const Variable: IconComponent = wrapIcon(rawMap.Variable, 'Variable');
export const Venus: IconComponent = wrapIcon(rawMap.Venus, 'Venus');
export const Video: IconComponent = wrapIcon(rawMap.Video, 'Video');
export const VideoSparkles: IconComponent = wrapIcon(rawMap.VideoSparkles, 'VideoSparkles');
export const VisionPro: IconComponent = wrapIcon(rawMap.VisionPro, 'VisionPro');
export const Volume: IconComponent = wrapIcon(rawMap.Volume, 'Volume');
export const VolumeLow: IconComponent = wrapIcon(rawMap.VolumeLow, 'VolumeLow');
export const VolumeMinus: IconComponent = wrapIcon(rawMap.VolumeMinus, 'VolumeMinus');
export const VolumeOff: IconComponent = wrapIcon(rawMap.VolumeOff, 'VolumeOff');
export const VolumePlus: IconComponent = wrapIcon(rawMap.VolumePlus, 'VolumePlus');
export const VolumeX: IconComponent = wrapIcon(rawMap.VolumeX, 'VolumeX');
export const Wallet: IconComponent = wrapIcon(rawMap.Wallet, 'Wallet');
export const WalletCards: IconComponent = wrapIcon(rawMap.WalletCards, 'WalletCards');
export const WalletSparkles: IconComponent = wrapIcon(rawMap.WalletSparkles, 'WalletSparkles');
export const Wand: IconComponent = wrapIcon(rawMap.Wand, 'Wand');
export const WandSparkles: IconComponent = wrapIcon(rawMap.WandSparkles, 'WandSparkles');
export const Watch: IconComponent = wrapIcon(rawMap.Watch, 'Watch');
export const WholeWord: IconComponent = wrapIcon(rawMap.WholeWord, 'WholeWord');
export const Wifi: IconComponent = wrapIcon(rawMap.Wifi, 'Wifi');
export const WifiExclamation: IconComponent = wrapIcon(rawMap.WifiExclamation, 'WifiExclamation');
export const WifiInfo: IconComponent = wrapIcon(rawMap.WifiInfo, 'WifiInfo');
export const WifiLow: IconComponent = wrapIcon(rawMap.WifiLow, 'WifiLow');
export const WifiMedium: IconComponent = wrapIcon(rawMap.WifiMedium, 'WifiMedium');
export const WifiPlus: IconComponent = wrapIcon(rawMap.WifiPlus, 'WifiPlus');
export const WifiX: IconComponent = wrapIcon(rawMap.WifiX, 'WifiX');
export const Wind: IconComponent = wrapIcon(rawMap.Wind, 'Wind');
export const WindTurbine: IconComponent = wrapIcon(rawMap.WindTurbine, 'WindTurbine');
export const Wrench: IconComponent = wrapIcon(rawMap.Wrench, 'Wrench');
export const X: IconComponent = wrapIcon(rawMap.X, 'X');
export const XLineTop: IconComponent = wrapIcon(rawMap.XLineTop, 'XLineTop');
export const Zap: IconComponent = wrapIcon(rawMap.Zap, 'Zap');
export const ZapOff: IconComponent = wrapIcon(rawMap.ZapOff, 'ZapOff');
export const ZapSparkles: IconComponent = wrapIcon(rawMap.ZapSparkles, 'ZapSparkles');

// Legacy names retained as aliases for icons removed from the current Keyline catalog.
export const Bot2: IconComponent = Bot;
export const CloudMinus: IconComponent = Cloud;
export const Rocket2: IconComponent = Rocket;
export const TrainFront: IconComponent = wrapIcon(rawMap.TrainFront, 'TrainFront');
export const Train: IconComponent = wrapIcon(rawMap.Train ?? rawMap.TrainFront, 'Train');

// Legacy / Canonical Aliases to Keyline Two-Tone Rounded equivalents
export const AlertCircle: IconComponent = CircleAlert;
export const AlertTriangle: IconComponent = Alert;
export const BarChart3: IconComponent = BarChart;
export const BookMarked: IconComponent = Bookmark;
export const BookOpenCheck: IconComponent = BookOpen;
export const Building2: IconComponent = Buildings;
export const CalendarClock: IconComponent = Calendar;
export const CalendarRange: IconComponent = Calendar;
export const CheckCircle2: IconComponent = CircleCheck;
export const CheckSquare: IconComponent = SquareCheck;
export const Code2: IconComponent = Code;
export const ContactRound: IconComponent = User;
export const Edit2: IconComponent = SquarePen;
export const ExternalLink: IconComponent = SquareArrowOutUpRight;
export const FileCheck2: IconComponent = FileCheck;
export const FileClock: IconComponent = FileText;
export const FileDown: IconComponent = Download;
export const FilterX: IconComponent = Filter;
export const HelpCircle: IconComponent = CircleQuestion;
export const Languages: IconComponent = Language;
export const Layers3: IconComponent = Layers;
export const LayoutGrid: IconComponent = Grid2x2;
export const Loader2: IconComponent = LoaderCircle;
export const LockKeyhole: IconComponent = Lock;
export const LogOut: IconComponent = DoorOpen;
export const MapPinHouse: IconComponent = MapPin;
export const Medal: IconComponent = Award;
export const Network: IconComponent = ChartNetwork;
export const PieChart: IconComponent = ChartPie;
export const ReceiptText: IconComponent = Receipt;
export const Scale: IconComponent = ShieldCheck;
export const School: IconComponent = GraduationCap;
export const Settings2: IconComponent = Settings;
export const Sliders: IconComponent = SlidersHorizontal;
export const Trash2: IconComponent = Bin;
export const Trash: IconComponent = Bin;
export const Undo2: IconComponent = CircleArrowUTurnLeft;
export const UserCog: IconComponent = User;
export const UsersRound: IconComponent = Users;
export const Waypoints: IconComponent = Route;
export const XCircle: IconComponent = CircleX;

export default RawIcons;
