export default function Ticker() {
  const items = [
    'Senior Strategy',
    'IHG Resort Partner',
    'AI-Native Workflows',
    'Best in B2B',
    'Dallas Studio',
    'Cinematic Production',
    'North America · Middle East',
  ]

  const displayItems = [...items, ...items]

  return (
    <section
      id="ticker"
      style={{
        backgroundColor: 'var(--chartreuse)',
        overflow: 'hidden',
        padding: '16px 0',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
      }}
    >
      <div className="ticker-inner">
        {displayItems.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--black)',
              display: 'inline-flex',
              alignItems: 'center',
              paddingRight: '32px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span
              style={{
                marginLeft: '32px',
                color: 'rgba(0,0,0,0.3)',
                fontSize: '16px',
              }}
            >
              ▲
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
