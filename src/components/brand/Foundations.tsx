'use client'

import { useState } from 'react'

/* ── design tokens (from app/src/app/v6/styles.css :root) ── */

interface ColorToken {
  name: string
  varName: string
  hex: string
}

const COLOR_GROUPS: { title: string; tokens: ColorToken[] }[] = [
  {
    title: 'ראשי',
    tokens: [
      { name: 'Purple', varName: '--v6-purple', hex: '#5C3EEF' },
      { name: 'Purple mid', varName: '--v6-purple-mid', hex: '#7C5CED' },
      { name: 'Purple soft', varName: '--v6-purple-soft', hex: '#EDE9FE' },
      { name: 'Purple line', varName: '--v6-purple-line', hex: '#C4B5FD' },
    ],
  },
  {
    title: 'כרטיסים',
    tokens: [
      { name: 'Blue', varName: '--v6-card-blue', hex: '#A8B5FD' },
      { name: 'Yellow', varName: '--v6-card-yellow', hex: '#FFD166' },
      { name: 'Green', varName: '--v6-card-green', hex: '#3ECF7E' },
      { name: 'Purple', varName: '--v6-card-purple', hex: '#7C5CED' },
      { name: 'Coral', varName: '--v6-coral', hex: '#F4736E' },
    ],
  },
  {
    title: 'נייטרלים',
    tokens: [
      { name: 'Background', varName: '--v6-bg', hex: '#F8F7FF' },
      { name: 'Background alt', varName: '--v6-bg-alt', hex: '#F3F4F6' },
      { name: 'White', varName: '--v6-white', hex: '#FFFFFF' },
      { name: 'Black', varName: '--v6-black', hex: '#0A0A0A' },
      { name: 'Text', varName: '--v6-text', hex: '#1E1B4B' },
      { name: 'Text mid', varName: '--v6-text-mid', hex: '#4B5280' },
      { name: 'Text muted', varName: '--v6-text-muted', hex: '#6B7280' },
      { name: 'Border', varName: '--v6-border', hex: '#E5E7EB' },
    ],
  },
]

const TYPE_SPECIMENS = [
  { label: 'Display', size: '3rem', weight: 800, sample: 'מרעיון למוצר' },
  { label: 'כותרת H1', size: '2.25rem', weight: 800, sample: 'הדרך הכי קצרה' },
  { label: 'כותרת H2', size: '1.6rem', weight: 700, sample: 'שיטת הספירלה' },
  { label: 'טקסט', size: '1.05rem', weight: 400, sample: 'מתחילים מפרוטוטייפ שאפשר ללחוץ עליו, להרגיש אותו ולשנות.' },
  { label: 'קטן', size: '0.85rem', weight: 500, sample: 'תווית קטנה' },
]

const WEIGHTS = [
  { n: 'Regular', w: 400 },
  { n: 'Medium', w: 500 },
  { n: 'Bold', w: 700 },
  { n: 'Extrabold', w: 800 },
  { n: 'Black', w: 900 },
]

const RADII = [
  { name: 'sm', varName: '--v6-r-sm', value: '10px' },
  { name: 'md', varName: '--v6-r-md', value: '20px' },
  { name: 'lg', varName: '--v6-r-lg', value: '28px' },
  { name: 'full', varName: '--v6-r-full', value: '9999px' },
]

const COMPONENTS = [
  { name: 'ניווט', code: 'Navbar', desc: 'סרגל הניווט העליון — לוגו, קישורים וכפתור פעולה.', kind: 'navbar' },
  { name: 'כפתור ראשי', code: 'Primary Button', desc: 'כפתור הפעולה המרכזי — סגול, פינות מלאות.', kind: 'btn' },
  { name: 'מתג שפה', code: 'Language Toggle', desc: 'מעבר בין עברית לאנגלית.', kind: 'lang' },
  { name: 'תגית', code: 'Tag / Chip', desc: 'תגיות קטנות לתחומים ולמטא-דאטה.', kind: 'chip' },
  { name: 'תג צף', code: 'Floating Tag', desc: 'תגי אמיר וקרן שצפים מעל האיורים.', kind: 'floating-tag' },
  { name: 'באדג׳ מספר', code: 'Step Number', desc: 'מספר שלב גדול בכרטיסי התהליך.', kind: 'step' },
  { name: 'קו הדגשה', code: 'Underline Swoosh', desc: 'הקו הסגול שמדגיש מילה בכותרת.', kind: 'swoosh' },
  { name: 'כותרת סקשן', code: 'Section Heading', desc: 'כותרת עם מילה מודגשת וקו תחתון.', kind: 'heading' },
  { name: 'שדה קלט', code: 'Input', desc: 'שדה טופס עם פינות מלאות.', kind: 'input' },
  { name: 'כרטיס', code: 'Card', desc: 'כרטיס תוכן בסיסי עם מסגרת ופינות מעוגלות.', kind: 'card' },
  { name: 'כרטיס שירות', code: 'Offer Card', desc: 'הכרטיס הרחב של "מה אנחנו מציעים" עם תגית זמן.', kind: 'offer-card' },
  { name: 'כרטיס פיצ׳ר', code: 'Feature Card', desc: 'כרטיסי הפיצ׳רים הצבעוניים.', kind: 'feature-card' },
  { name: 'כרטיס שלב', code: 'Spiral Phase Card', desc: 'כרטיסי השלבים בשיטת הספירלה.', kind: 'spiral-card' },
  { name: 'כרטיס פרסונה', code: 'Persona Card', desc: 'כרטיסי "אם זה אתם" עם אייקון.', kind: 'persona-card' },
  { name: 'כרטיס התאמה', code: 'Match Card', desc: 'כרטיסי ה‑✓/✗ הירוק והאדום.', kind: 'match-card' },
  { name: 'כרטיס המלצה', code: 'Testimonial', desc: 'כרטיס ציטוט מלקוח.', kind: 'testimonial' },
  { name: 'בועת דיבור', code: 'Speech Bubble', desc: 'בועות של אמיר וקרן.', kind: 'bubble' },
  { name: 'אקורדיון', code: 'Accordion (FAQ)', desc: 'שאלות נפוצות שנפתחות בלחיצה.', kind: 'accordion' },
  { name: 'רצועת CTA', code: 'CTA Banner', desc: 'הרצועה הכהה "יש לכם פרויקט?".', kind: 'cta' },
  { name: 'מרקיזה', code: 'Marquee', desc: 'רצועת טקסט נעה לאורך הרוחב.', kind: 'marquee' },
  { name: 'פוטר', code: 'Footer', desc: 'תחתית האתר עם ניווט וקישורים.', kind: 'footer' },
]

export const FOUNDATIONS = [
  { key: '_colors', title: 'צבעים', summary: 'פלטת הצבעים והטוקנים של המותג.' },
  { key: '_type', title: 'טיפוגרפיה', summary: 'הפונט, המשקלים והגדלים.' },
  { key: '_radii', title: 'פינות וצורה', summary: 'סקאלת ה‑radius של הממשק.' },
  { key: '_components', title: 'קומפוננטות', summary: 'הרכיבים שאנחנו משתמשים בהם — לפי שם.' },
]

function luminance(hex: string): number {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

function Swatch({ token }: { token: ColorToken }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(token.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  const lum = luminance(token.hex)
  return (
    <button className="bk-swatch" onClick={copy} title="לחצו להעתקה">
      <span
        className="bk-swatch-block"
        style={{
          background: token.hex,
          color: lum > 0.62 ? '#1E1B4B' : '#fff',
          boxShadow: lum > 0.8 ? 'inset 0 0 0 1px var(--v6-border)' : 'none',
        }}
      >
        {token.name}
      </span>
      <span className="bk-swatch-meta">
        <span className="bk-swatch-hex">{copied ? 'הועתק ✓' : token.hex}</span>
        <span className="bk-swatch-var">{token.varName}</span>
      </span>
    </button>
  )
}

function Colors() {
  return (
    <>
      <h1 className="bk-h1">צבעים</h1>
      <p className="bk-intro">הפלטה של Two Otters. לחצו על צבע כדי להעתיק את ה‑HEX.</p>
      {COLOR_GROUPS.map((g) => (
        <div key={g.title} className="bk-tok-group">
          <h2 className="bk-tok-title">{g.title}</h2>
          <div className="bk-swatches">
            {g.tokens.map((t) => (
              <Swatch key={t.varName} token={t} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function Typography() {
  return (
    <>
      <h1 className="bk-h1">טיפוגרפיה</h1>
      <p className="bk-intro">
        הפונט של המותג הוא <strong>Google Sans</strong>. להלן המשקלים והגדלים שאנחנו משתמשים בהם.
      </p>
      <a
        className="bk-link bk-link--lg"
        href="https://fonts.google.com/specimen/Google+Sans"
        target="_blank"
        rel="noopener noreferrer"
      >
        פתיחה ב‑Google Fonts ↗
      </a>

      <div className="bk-tok-group">
        <h2 className="bk-tok-title">משקלים</h2>
        <div className="bk-weights">
          {WEIGHTS.map((w) => (
            <div key={w.w} className="bk-weight" style={{ fontWeight: w.w }}>
              <span className="bk-weight-sample">Aa אבג</span>
              <span className="bk-weight-name">
                {w.n} · {w.w}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bk-tok-group">
        <h2 className="bk-tok-title">גדלים</h2>
        <div className="bk-type-list">
          {TYPE_SPECIMENS.map((s) => (
            <div key={s.label} className="bk-type-row">
              <span className="bk-type-label">
                {s.label} · {s.size}
              </span>
              <span className="bk-type-sample" style={{ fontSize: s.size, fontWeight: s.weight }}>
                {s.sample}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Radii() {
  return (
    <>
      <h1 className="bk-h1">פינות וצורה</h1>
      <p className="bk-intro">סקאלת ה‑radius שמשמשת לכפתורים, כרטיסים ואלמנטים.</p>
      <div className="bk-radii">
        {RADII.map((r) => (
          <div key={r.name} className="bk-radius">
            <span className="bk-radius-box" style={{ borderRadius: r.value }} />
            <span className="bk-radius-name">{r.name}</span>
            <span className="bk-radius-val">{r.value}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function ComponentPreview({ kind }: { kind: string }) {
  switch (kind) {
    case 'navbar':
      return (
        <span className="bk-cmp-nav">
          <span className="bk-cmp-nav-logo" />
          <span className="bk-cmp-nav-pill" />
          <span className="bk-cmp-nav-cta" />
        </span>
      )
    case 'btn':
      return <span className="bk-cmp-btn">בואו נדבר</span>
    case 'lang':
      return <span className="bk-cmp-lang">עב</span>
    case 'chip':
      return (
        <span className="bk-cmp-chips">
          <span className="bk-cmp-chip">אסטרטגיה</span>
          <span className="bk-cmp-chip">UX</span>
        </span>
      )
    case 'floating-tag':
      return (
        <span className="bk-cmp-ftag">
          <span className="bk-cmp-ftag-dot" />
          אמיר
        </span>
      )
    case 'step':
      return <span className="bk-cmp-step">4</span>
    case 'swoosh':
      return <span className="bk-cmp-swoosh">NO TIME</span>
    case 'heading':
      return (
        <span className="bk-cmp-heading">
          מ<strong>רעיון</strong> למוצר
        </span>
      )
    case 'input':
      return <span className="bk-cmp-input">שם מלא</span>
    case 'card':
      return <span className="bk-cmp-card-mini" />
    case 'offer-card':
      return (
        <span className="bk-cmp-offer">
          <span className="bk-cmp-pill-green">עד 6 שבועות</span>
        </span>
      )
    case 'feature-card':
      return <span className="bk-cmp-feat" />
    case 'spiral-card':
      return (
        <span className="bk-cmp-scard">
          <span className="bk-cmp-scard-num">1</span>
        </span>
      )
    case 'persona-card':
      return (
        <span className="bk-cmp-pcard">
          <span className="bk-cmp-pcard-icon" />
        </span>
      )
    case 'match-card':
      return (
        <span className="bk-cmp-match">
          <span className="bk-cmp-match-yes">✓</span>
          <span className="bk-cmp-match-no">✕</span>
        </span>
      )
    case 'testimonial':
      return <span className="bk-cmp-tcard">”</span>
    case 'bubble':
      return <span className="bk-cmp-bubble">It’s a match!</span>
    case 'accordion':
      return (
        <span className="bk-cmp-acc">
          <span>שאלה נפוצה</span>
          <span className="bk-cmp-acc-plus">+</span>
        </span>
      )
    case 'cta':
      return (
        <span className="bk-cmp-cta">
          <span className="bk-cmp-cta-btn">בואו נדבר</span>
        </span>
      )
    case 'marquee':
      return <span className="bk-cmp-marquee">איזה אוטר אתם? • איזה אוטר אתם?</span>
    case 'footer':
      return (
        <span className="bk-cmp-footer">
          <span />
          <span />
          <span />
        </span>
      )
    default:
      return null
  }
}

function Components() {
  return (
    <>
      <h1 className="bk-h1">קומפוננטות</h1>
      <p className="bk-intro">הרכיבים שחוזרים לאורך הממשק — לפי שם, כדי שנדבר באותה שפה (עיצוב ופיתוח).</p>
      <div className="bk-cmp-grid">
        {COMPONENTS.map((c) => (
          <div key={c.code} className="bk-cmp-card">
            <div className="bk-cmp-preview">
              <ComponentPreview kind={c.kind} />
            </div>
            <div className="bk-cmp-meta">
              <span className="bk-cmp-name">{c.name}</span>
              <span className="bk-cmp-code">{c.code}</span>
              <span className="bk-cmp-desc">{c.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function FoundationView({ pathKey }: { pathKey: string }) {
  if (pathKey === '_colors') return <Colors />
  if (pathKey === '_type') return <Typography />
  if (pathKey === '_radii') return <Radii />
  if (pathKey === '_components') return <Components />
  return null
}

function FoundationThumb({ k }: { k: string }) {
  if (k === '_colors') {
    return (
      <span className="bk-fthumb-colors">
        {['#5C3EEF', '#FFD166', '#3ECF7E', '#F4736E', '#A8B5FD'].map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </span>
    )
  }
  if (k === '_type') return <span className="bk-fthumb-type">Aa</span>
  if (k === '_components')
    return (
      <span className="bk-fthumb-cmp">
        <span className="bk-cmp-btn" style={{ pointerEvents: 'none' }}>
          בואו נדבר
        </span>
      </span>
    )
  return (
    <span className="bk-fthumb-radii">
      <span style={{ borderRadius: '6px' }} />
      <span style={{ borderRadius: '14px' }} />
      <span style={{ borderRadius: '999px' }} />
    </span>
  )
}

export function FoundationCard({ f, onSelect }: { f: (typeof FOUNDATIONS)[0]; onSelect: (k: string) => void }) {
  return (
    <button className="bk-folder-card" onClick={() => onSelect(f.key)}>
      <span className="bk-folder-thumb">
        <FoundationThumb k={f.key} />
      </span>
      <span className="bk-folder-text">
        <span className="bk-folder-name">{f.title}</span>
        <span className="bk-folder-summary">{f.summary}</span>
      </span>
    </button>
  )
}
