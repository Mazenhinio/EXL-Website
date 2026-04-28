export default function Ticker() {
  const items = [
    'Trusted to run the marketing function for a flagship IHG resort property, and to produce Best in B2B, the only B2B podcast filmed on location across Dallas-Fort Worth.',
  ]

  const displayItems = [...items, ...items, ...items, ...items]

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
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--black)',
              display: 'inline-flex',
              alignItems: 'center',
              paddingRight: '64px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span
              style={{
                marginLeft: '64px',
                color: 'rgba(0,0,0,0.3)',
                fontSize: '18px',
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
