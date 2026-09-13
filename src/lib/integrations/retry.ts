import { DeliveryError } from './ports'

/**
 * Two attempts, short backoff, transient failures only.
 *
 * A 4xx means the provider understood us and said no — retrying just says the
 * same wrong thing again. A 5xx, a 429 or a dead socket might work a moment
 * later. The whole budget stays under a couple of seconds because a visitor is
 * watching a spinner while this runs.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  { attempts = 2, baseDelayMs = 300 }: { attempts?: number; baseDelayMs?: number } = {}
): Promise<T> {
  let lastError: unknown
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation()
    } catch (err) {
      lastError = err
      if (!isTransient(err) || attempt === attempts) throw err
      await new Promise(resolve => setTimeout(resolve, baseDelayMs * attempt))
    }
  }
  throw lastError
}

function isTransient(err: unknown): boolean {
  if (err instanceof DeliveryError) {
    // No status at all means we never got an answer — a network fault.
    return err.status === null || err.status === 429 || err.status >= 500
  }
  // A thrown TypeError from fetch is the usual shape of "the network is down".
  return err instanceof TypeError
}
