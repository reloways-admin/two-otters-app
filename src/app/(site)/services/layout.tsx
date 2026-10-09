import './services.css'

/**
 * Wraps the services page and the four service pages, so the artifact rules
 * in services.css (scoped under .v10-services) apply here and nowhere else.
 * No metadata here: a title set on a layout would drop the site's title
 * template for the four service pages under it.
 */
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <div className="v10-services">{children}</div>
}
