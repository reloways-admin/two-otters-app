/**
 * Solar's arrows (the icon set the studio draws its illustrations from), inline
 * so they take the text colour: "arrow-left-linear" by default, and
 * "arrow-down-linear" for the spiral's fold-out button, "arrow-right-linear"
 * for a step back (the previous service). Solar draws them at 1.5
 * on a 24 grid; next to bold 15–17px button text that reads hairline-thin, so
 * the stroke is 2. Left-pointing by default because the site is RTL: it points
 * the way you read on.
 */
const PATHS = {
  left: 'M20 12H4M10 18L4 12L10 6',
  down: 'M12 4L12 20M6 14L12 20L18 14',
  right: 'M4 12H20M14 6L20 12L14 18',
} as const

export default function ArrowLeftV10({ size = 20, dir = 'left', className = '' }: { size?: number; dir?: keyof typeof PATHS; className?: string }) {
  return (
    <svg className={`v10-arrow ${className}`.trim()} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={PATHS[dir]} />
    </svg>
  )
}
