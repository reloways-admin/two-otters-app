import he from '@/locales/v10-he.json'

type GasT = typeof he.gas

// Same cards and illustrations as the live site's GasInNeutralV8, in the same
// order; v10 rewrites the heading and the first card.
const CARDS = [
  { color: 'yellow', image: '/v8-gas-yellow.svg' },
  { color: 'blue',   image: '/v8-gas-blue.svg' },
  { color: 'purple', image: '/v8-gas-purple.svg' },
  { color: 'green',  image: '/v8-gas-green.svg' },
]

/** "Full gas in neutral — that's not you anymore." Brought back from the live
 *  site to open the homepage, right after the client logos. */
export default function GasV10({ t }: { t: GasT }) {
  return (
    <section className="v8-gas v10-gas" id="process">
      <div className="v8-container">
        <h2 className="v8-section-heading">
          <span>{t.title}</span><br />
          <span className="bold v10-gas-accent">{t.titleAccent}</span>
        </h2>
        <p className="v10-sub">{t.sub}<br className="v10-br-desktop" /> {t.subLine2}</p>
        <div className="v8-gas-grid">
          {t.cards.map((card, i) => (
            <div key={card.title} className={`v8-gas-card ${CARDS[i].color}`}>
              <p className="v8-gas-card-title">{card.title}</p>
              <p className="v8-gas-card-body">{card.body}</p>
              <div className="v8-gas-illus">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="v8-gas-illus-img" src={CARDS[i].image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
