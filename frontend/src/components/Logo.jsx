// Matches your exact logo pattern: square icon + "CampusMind AI" wordmark
// Uses lucide-react Sparkles via inline SVG path so no extra dep needed

export default function Logo({ size = 'md' }) {
  const cfg = {
    sm: { box: 26, spark: 12, text: '0.9rem',  gap: '7px' },
    md: { box: 30, spark: 14, text: '1.05rem', gap: '8px' },
    lg: { box: 36, spark: 17, text: '1.25rem', gap: '10px' },
  }
  const { box, spark, text, gap } = cfg[size]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      {/* Icon box — matches your div with backgroundColor: COLORS.primary */}
      <div style={{
        width: box, height: box,
        borderRadius: '8px',
        backgroundColor: '#093C5D',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {/* Sparkles icon (lucide path), color = COLORS.accent */}
        <svg
          width={spark} height={spark}
          viewBox="0 0 24 24" fill="none"
          stroke="#5DF8D8" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
          <path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>
        </svg>
      </div>

      {/* Wordmark — matches your span */}
      <span style={{ fontWeight: 700, fontSize: text, color: '#082235', letterSpacing: '-0.01em' }}>
        CampusMind AI
      </span>
    </div>
  )
}
