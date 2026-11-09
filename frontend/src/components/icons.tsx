import type { JSX } from 'react';

/**
 * Hand-drawn 24px line icons (stroke 1.6, currentColor).
 * No emoji anywhere on the page — every pictogram is one of these or a Sober
 * `s-icon` glyph.
 */
export type IconName =
  | 'pin'
  | 'print'
  | 'download'
  | 'external'
  | 'check'
  | 'arrow'
  | 'home'
  | 'school'
  | 'briefcase'
  | 'layers'
  | 'grid'
  | 'user'
  | 'doc'
  | 'agent';

const PATHS: Record<IconName, JSX.Element> = {
  pin: (
    <>
      <path d="M12 21.2s6.6-6.2 6.6-10.8a6.6 6.6 0 1 0-13.2 0C5.4 15 12 21.2 12 21.2Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </>
  ),
  print: (
    <>
      <path d="M7 9V4.4h10V9" />
      <rect x="4.4" y="9" width="15.2" height="7.4" rx="1.6" />
      <path d="M7.6 16.4V20h8.8v-3.6" />
      <path d="M17.2 11.4h.6" />
    </>
  ),
  download: (
    <>
      <path d="M12 4.2v10.2" />
      <path d="m8.1 10.7 3.9 3.9 3.9-3.9" />
      <path d="M5 19.4h14" />
    </>
  ),
  external: (
    <>
      <path d="M14 4.4h5.6V10" />
      <path d="M19.6 4.4 11.2 12.8" />
      <path d="M18 14.2v5a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19.2V8.4a1.6 1.6 0 0 1 1.6-1.6h5" />
    </>
  ),
  check: <path d="m5 12.6 4.6 4.6L19 7.6" />,
  arrow: (
    <>
      <path d="M4.6 12h13.2" />
      <path d="m13 6.6 5.4 5.4-5.4 5.4" />
    </>
  ),
  home: (
    <>
      <path d="M4 11.3 12 4.4l8 6.9V19a1.4 1.4 0 0 1-1.4 1.4h-4.1v-5.5H9.5v5.5H5.4A1.4 1.4 0 0 1 4 19Z" />
    </>
  ),
  school: (
    <>
      <path d="m2.6 9.4 9.4-4.4 9.4 4.4L12 13.8Z" />
      <path d="M6.4 11.4v4.7c0 1.5 2.5 2.7 5.6 2.7s5.6-1.2 5.6-2.7v-4.7" />
      <path d="M21.4 9.4v5.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.2" y="7.6" width="17.6" height="12.2" rx="2.2" />
      <path d="M9 7.6V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.6" />
      <path d="M3.2 13.2h17.6" />
      <path d="M10.4 13.2v1.9h3.2v-1.9" />
    </>
  ),
  layers: (
    <>
      <path d="M3.6 7.8a2 2 0 0 1 2-2h3.1l1.9 2.1h6.8a2 2 0 0 1 2 2v7.3a2 2 0 0 1-2 2H5.6a2 2 0 0 1-2-2Z" />
    </>
  ),
  grid: (
    <>
      <rect x="3.6" y="3.6" width="6.6" height="6.6" rx="1.6" />
      <rect x="13.8" y="3.6" width="6.6" height="6.6" rx="1.6" />
      <rect x="3.6" y="13.8" width="6.6" height="6.6" rx="1.6" />
      <rect x="13.8" y="13.8" width="6.6" height="6.6" rx="1.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.4" r="3.6" />
      <path d="M4.9 20.2c0-3.6 3.2-5.7 7.1-5.7s7.1 2.1 7.1 5.7" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3.6h7.1L18.2 8.8V20a.6.6 0 0 1-.6.6H6a.6.6 0 0 1-.6-.6V4.2A.6.6 0 0 1 6 3.6Z" />
      <path d="M13 3.6v5.4h5.2" />
      <path d="M8.4 13h7.2M8.4 16.4h5.2" />
    </>
  ),
  agent: (
    <>
      <rect x="4.2" y="7.4" width="15.6" height="11.4" rx="3" />
      <path d="M12 3.4v4" />
      <path d="M9 12.4h.01M15 12.4h.01" />
      <path d="M2.8 12.6v3M21.2 12.6v3" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  slot?: string;
  className?: string;
};

export function Icon({ name, size = 24, slot, className }: IconProps) {
  return (
    <svg
      slot={slot}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

/**
 * Wrapper so the icon keeps its own stroke rules inside Sober components:
 * `s-button`/`s-icon-button` force `fill: currentColor` on directly slotted
 * `<svg>` elements, which would fill these outlined paths solid.
 */
export function Glyph({
  name,
  size = 24,
  slot,
}: {
  name: IconName;
  size?: number;
  slot?: string;
}) {
  return (
    <span className="glyph" slot={slot} style={{ width: size, height: size }}>
      <Icon name={name} size={size} />
    </span>
  );
}
