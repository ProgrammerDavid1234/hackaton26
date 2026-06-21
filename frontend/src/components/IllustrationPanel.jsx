export default function IllustrationPanel() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #093C5D 0%, #3B7597 55%, #6FD1D7 100%)' }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #5DF8D8, transparent)' }} />
      <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #6FD1D7, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, white, transparent)' }} />

      {/* Top badge */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
          <div className="w-2 h-2 rounded-full bg-[#5DF8D8] animate-pulse" />
          <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">AI-Powered Learning</span>
        </div>
      </div>

      {/* Central illustration */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Abstract AI visualization */}
        <div className="relative w-64 h-64 mb-8">
          {/* Hexagonal grid */}
          <svg viewBox="0 0 280 280" className="w-full h-full opacity-30" fill="none">
            <defs>
              <pattern id="hex" width="28" height="32" patternUnits="userSpaceOnUse">
                <polygon points="14,2 26,9 26,23 14,30 2,23 2,9" stroke="#6FD1D7" strokeWidth="0.5" fill="none"/>
              </pattern>
            </defs>
            <rect width="280" height="280" fill="url(#hex)" />
          </svg>

          {/* Central brain/node */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute inset-[-24px] rounded-full border border-[#5DF8D8]/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-[-12px] rounded-full border border-[#6FD1D7]/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />

              {/* Core node */}
              <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  {/* Neural network lines */}
                  <circle cx="12" cy="12" r="3" fill="#5DF8D8" />
                  <circle cx="36" cy="12" r="3" fill="#5DF8D8" />
                  <circle cx="12" cy="36" r="3" fill="#6FD1D7" />
                  <circle cx="36" cy="36" r="3" fill="#6FD1D7" />
                  <circle cx="24" cy="24" r="5" fill="white" />
                  <line x1="12" y1="12" x2="24" y2="24" stroke="#5DF8D8" strokeWidth="1" opacity="0.6" />
                  <line x1="36" y1="12" x2="24" y2="24" stroke="#5DF8D8" strokeWidth="1" opacity="0.6" />
                  <line x1="12" y1="36" x2="24" y2="24" stroke="#6FD1D7" strokeWidth="1" opacity="0.6" />
                  <line x1="36" y1="36" x2="24" y2="24" stroke="#6FD1D7" strokeWidth="1" opacity="0.6" />
                  {/* Outer connections */}
                  <circle cx="24" cy="6" r="2" fill="white" opacity="0.5" />
                  <circle cx="24" cy="42" r="2" fill="white" opacity="0.5" />
                  <circle cx="6" cy="24" r="2" fill="white" opacity="0.5" />
                  <circle cx="42" cy="24" r="2" fill="white" opacity="0.5" />
                  <line x1="24" y1="6" x2="12" y2="12" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  <line x1="24" y1="6" x2="36" y2="12" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  <line x1="6" y1="24" x2="12" y2="36" stroke="white" strokeWidth="0.5" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating data cards */}
          <div className="absolute top-4 right-0 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-2.5 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="text-[10px] text-white/60 font-medium">Study sessions</div>
            <div className="text-lg font-bold text-white">2,847</div>
          </div>
          <div className="absolute bottom-4 left-0 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-2.5 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <div className="text-[10px] text-white/60 font-medium">AI Answers</div>
            <div className="text-lg font-bold text-[#5DF8D8]">98.2%</div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white leading-tight mb-4">
          Your Campus,<br />Supercharged by AI
        </h2>
        <p className="text-white/65 text-sm leading-relaxed max-w-xs">
          Ask anything, learn faster, and collaborate smarter. CampusMind AI brings academic intelligence to every student and faculty member.
        </p>
      </div>

      {/* Bottom stats row */}
      <div className="relative z-10 grid grid-cols-3 gap-4">
        {[
          { label: 'Active Users', value: '12K+' },
          { label: 'Departments', value: '47' },
          { label: 'Uptime', value: '99.9%' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-white/50 font-medium mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
