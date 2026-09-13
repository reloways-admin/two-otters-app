import raw from '@/config/integrations.json'

/**
 * Non-secret integration config: which list, which board, which template.
 *
 * It lives in a committed JSON file rather than the environment because it is
 * configuration, not credentials — a list id belongs in a diff a teammate can
 * check, not in a dashboard field nobody can see. On Vercel an env change needs
 * a redeploy anyway, so the file costs no flexibility.
 *
 * Keys beginning with `_` are documentation for whoever opens the file and are
 * stripped before an adapter ever sees them.
 */
export type AdapterConfig = Record<string, string | Record<string, string>>

const stripComments = (value: unknown): Record<string, string> =>
  Object.fromEntries(
    Object.entries((value ?? {}) as Record<string, string>).filter(
      ([key, entry]) => !key.startsWith('_') && typeof entry === 'string'
    )
  )

/** One adapter's section, comments removed and empty values dropped. */
export function adapterConfig(name: string, source: Record<string, unknown> = raw): AdapterConfig {
  const section = (source[name] ?? {}) as Record<string, unknown>
  const config: AdapterConfig = {}

  for (const [key, value] of Object.entries(section)) {
    if (key.startsWith('_')) continue
    if (typeof value === 'string') {
      if (value) config[key] = value
    } else if (value && typeof value === 'object') {
      const nested = Object.fromEntries(
        Object.entries(stripComments(value)).filter(([, entry]) => entry !== '')
      )
      config[key] = nested
    }
  }
  return config
}

/** A value from the config, unless the environment overrides it for this deploy. */
export function setting(
  config: AdapterConfig,
  key: string,
  envValue: string | undefined
): string | undefined {
  const value = config[key]
  return envValue || (typeof value === 'string' ? value : undefined)
}

/** A value from a named map in the config, with the same env override rule. */
export function mapping(
  config: AdapterConfig,
  key: string,
  entry: string,
  envValue: string | undefined
): string | undefined {
  const map = config[key]
  return envValue || (typeof map === 'object' ? map[entry] : undefined)
}
