import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const PawIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <circle cx="5.5" cy="11" r="1.8" />
    <circle cx="9.5" cy="7" r="1.8" />
    <circle cx="14.5" cy="7" r="1.8" />
    <circle cx="18.5" cy="11" r="1.8" />
    <path d="M12 13c-2.5 0-4.5 1.8-4.8 4.1C7 18.7 8.3 20 9.9 20c.9 0 1.5-.4 2.1-.4s1.2.4 2.1.4c1.6 0 2.9-1.3 2.7-2.9C16.5 14.8 14.5 13 12 13Z" />
  </svg>
);

export const HeartIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M12 20.5 4.7 13a4.6 4.6 0 0 1 6.5-6.5l.8.8.8-.8A4.6 4.6 0 0 1 19.3 13Z" />
  </svg>
);

export const StethoscopeIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M5 3v5a4 4 0 0 0 8 0V3" />
    <path d="M9 16v1a5 5 0 0 0 10 0v-3" />
    <circle cx="19" cy="11" r="2.2" />
  </svg>
);

export const ShieldIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M12 3 5 6v6c0 4 3 6.8 7 9 4-2.2 7-5 7-9V6Z" />
    <path d="m9.3 12 1.9 1.9 3.5-3.6" />
  </svg>
);

export const ScalpelIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M4 20 14 10l6-6-1 7-9 9Z" />
    <path d="M4 20h4" />
  </svg>
);

export const ToothIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M8 3c-2.3 0-4 1.9-4 4.3 0 2 .6 3 1 5.4.3 1.8.3 5 1.7 6.6.9 1 1.8.2 2-1 .3-1.6.4-3.3 2.3-3.3s2 1.7 2.3 3.3c.2 1.2 1.1 2 2 1 1.4-1.6 1.4-4.8 1.7-6.6.4-2.4 1-3.4 1-5.4C20 4.9 18.3 3 16 3c-1.7 0-2.6 1-4 1S9.7 3 8 3Z" />
  </svg>
);

export const MicroscopeIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M6 18h10" />
    <path d="M8 18a6 6 0 0 0 6-9" />
    <path d="m11 4 3 2-3 4.5L8 8.5Z" />
    <path d="m9.5 6.5-2 3" />
    <path d="M4 21h16" />
  </svg>
);

export const CatIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M5 4 7 9m12-5-2 5" />
    <path d="M5 9c0-1 1-1.5 2-1.5h10c1 0 2 .5 2 1.5 0 5-1.5 11-7 11S5 14 5 9Z" />
    <path d="M9.5 13h.01M14.5 13h.01" />
    <path d="M12 15v1.5" />
  </svg>
);

const registry = {
  paw: PawIcon,
  heart: HeartIcon,
  stethoscope: StethoscopeIcon,
  shield: ShieldIcon,
  scalpel: ScalpelIcon,
  tooth: ToothIcon,
  microscope: MicroscopeIcon,
  cat: CatIcon,
} as const;

export type IconName = keyof typeof registry;

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Cmp = registry[name] ?? PawIcon;
  return <Cmp {...props} />;
}

export const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="m12 2 2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7Z" />
  </svg>
);

export const PhoneIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M6.6 3h2.8l1.4 4-2 1.4a12 12 0 0 0 4.8 4.8l1.4-2 4 1.4v2.8a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="m4 12.5 5 5 11-11" />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const FacebookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

export const PinIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg {...base(props)} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
