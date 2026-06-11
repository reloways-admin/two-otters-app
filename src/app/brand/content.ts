/**
 * Brand Kit — written content (Hebrew).
 *
 * This is the editorial layer that sits next to the Drive files: section intros,
 * per-item titles/descriptions, and optional Figma links/embeds. Keyed by Drive
 * folder path ("Logos", "Logos/Primary") and item path ("Logos/logo.svg").
 *
 * Authored here for now (easy to start). The page reads it through
 * getBrandContent(); later this can fetch a Google Sheet of the same shape
 * without changing the page. Missing keys fall back to the raw Drive name.
 */

export interface SectionContent {
  title?: string
  summary?: string // short — for the overview cards on the first page
  intro?: string
  figmaUrl?: string
  figmaEmbed?: string // Figma node URL → rendered as a live embed
}

export interface ItemContent {
  title?: string
  desc?: string
  figmaUrl?: string
  figmaEmbed?: string
}

export interface BrandContent {
  pageTitle: string
  intro: string
  ui: {
    download: string
    openDrive: string
    openFigma: string
    downloadAll: string
    openFolder: string
    loading: string
    empty: string
    error: string
    notConfigured: string
    updatedNote: string
    browseHint: string
  }
  sections: Record<string, SectionContent>
  items: Record<string, ItemContent>
}

const BRAND_CONTENT: BrandContent = {
  pageTitle: 'ערכת מותג',
  intro: 'ערכת המותג של Two Otters Studio — הסטודיו של אמיר וקרן, שלוקח רעיונות והופך אותם למוצר מהר ובדיוק. כל הלוגואים, האיורים, האייקונים והיסודות של המותג במקום אחד. בחרו תחום, צפו, והורידו בקליק.',
  ui: {
    download: 'הורדה',
    openDrive: 'פתיחה ב‑Drive',
    openFigma: 'פתיחה ב‑Figma',
    downloadAll: 'הורדת הכול',
    openFolder: 'פתיחת תיקיית Drive',
    loading: 'טוען נכסים…',
    empty: 'אין כאן נכסים עדיין.',
    error: 'לא הצלחנו לטעון את הנכסים. נסו שוב.',
    notConfigured:
      'הדף מוכן — צריך רק לחבר תיקיית Google Drive. הוסיפו GOOGLE_DRIVE_API_KEY ו‑BRAND_DRIVE_FOLDER_ID להגדרות. בינתיים מוצגת תצוגה לדוגמה מהנכסים של האתר.',
    updatedNote: 'מסונכרן מ‑Drive — קבצים חדשים מופיעים תוך כמה דקות.',
    browseHint: 'בחרו תיקייה כדי לראות את הנכסים שבה',
  },
  sections: {
    Logos: {
      title: 'לוגואים',
      summary: 'הלוגו הרשמי וכל הווריאציות — שחור, לבן ואנכי.',
      intro: 'הלוגו הרשמי של Two Otters על כל הווריאציות. השתמשו בגרסה השחורה על רקע בהיר ובלבנה על רקע כהה, ושמרו מרחב נשימה סביב הלוגו.',
      figmaUrl: 'https://www.figma.com/design/KqistPA9ENBH2YQtXqagMO/2-otters-%F0%9F%A6%A6-%F0%9F%A6%A6?node-id=1232-720',
      figmaEmbed: 'https://www.figma.com/design/KqistPA9ENBH2YQtXqagMO/2-otters-%F0%9F%A6%A6-%F0%9F%A6%A6?node-id=1232-720',
    },
    Illustrations: {
      title: 'איורים',
      summary: 'הלוטרות, הספירלה והסצנות שמספרות את הסיפור.',
      intro: 'דמויות הלוטרות, הספירלה והסצנות שמספרות את הסיפור של המותג.',
    },
    Icons: {
      title: 'אייקונים',
      summary: 'סט אייקונים אחיד — אותו קו, אותה שפה.',
      intro: 'סט האייקונים של המותג — קו אחיד, פינות מעוגלות, אותה שפה ויזואלית.',
    },
    'Brand elements': {
      title: 'אלמנטים מותגיים',
      summary: 'סווש, עיניים וסימוני ✓/✗.',
      intro: 'אלמנטים קטנים שחוזרים לאורך המותג — הסווש, העיניים, סימוני ה‑✓/✗.',
    },
    Images: {
      title: 'תמונות',
      summary: 'תמונות צוות וסצנות למצגות ולרשתות.',
      intro: 'תמונות צוות וסצנות לשימוש במצגות, ברשתות ובאתר.',
    },
    Documents: {
      title: 'מסמכים',
      summary: 'היסודות — סטודיו, ערכים, סיפור ופרסונה.',
      intro: 'היסודות של המותג — הסטודיו, הערכים, הסיפור והפרסונה.',
    },
  },
  items: {
    'Logos/logo-2otters-black-vertical.svg': {
      title: 'לוגו ראשי — שחור (אנכי)',
      desc: 'הלוקאפ הראשי לשימוש על רקע בהיר.',
    },
    'Logos/logo-2otters-white-vertical.svg': {
      title: 'לוגו ראשי — לבן (אנכי)',
      desc: 'אותו לוקאפ, לרקע כהה.',
    },
    'Illustrations/spiral.svg': {
      title: 'הספירלה',
      desc: 'סמל שיטת העבודה — אסטרטגיה ועיצוב שזזים במקביל.',
    },
    'Illustrations/amir-tag-english.svg': { title: 'תג אמיר' },
    'Illustrations/keren-tag-english.svg': { title: 'תג קרן' },
  },
}

export function getBrandContent(): BrandContent {
  return BRAND_CONTENT
}
