import { NextResponse } from 'next/server'
import { getBrandTree, getMockTree, NotConfiguredError } from '@/lib/brand-drive'

// Throttling is handled by the in-lib 5-min TTL cache; run per-request so ?fresh works.
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const fresh = new URL(req.url).searchParams.get('fresh') === '1'
  try {
    const root = await getBrandTree({ fresh })
    const folderId = process.env.BRAND_DRIVE_FOLDER_ID
    return NextResponse.json({
      configured: true,
      root,
      folderUrl: folderId ? `https://drive.google.com/drive/folders/${folderId}` : null,
    })
  } catch (err) {
    if (err instanceof NotConfiguredError) {
      // Not wired to Drive yet — serve a local mock so the page is previewable.
      return NextResponse.json({ configured: false, root: getMockTree(), folderUrl: null })
    }
    console.error('[brand/tree]', err)
    return NextResponse.json({ error: 'Failed to load brand assets' }, { status: 500 })
  }
}
