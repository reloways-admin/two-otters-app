/**
 * Solar's "arrow-left-linear" (the icon set the studio draws its illustrations
 * from), inline so it takes the text colour. Solar draws it at 1.5 on a 24 grid;
 * next to bold 15–17px button text that reads hairline-thin, so the stroke is 2.
 * Left-pointing because the site is RTL: it points the way you read on.
 */
export default function ArrowLeftV10({ size = 20 }: { size?: number }) {
  return (
    <svg className="v10-arrow" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M10 18L4 12L10 6" />
    </svg>
  )
}
