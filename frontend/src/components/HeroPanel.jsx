import Logo from './Logo'

// Animated node in the neural network illustration
function Node({ cx, cy, r = 5, color = '#5DF8D8', delay = 0 }) {
  return (
    <circle
      cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.85}
      style={{ animation: `pulse-node 3s ease-in-out ${delay}s infinite` }}
    />
  )
}

export default function HeroPanel() {
  return (
    <div
      className="hidden lg:flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #051e30 0%, #093C5D 40%, #3B7597 80%, #6FD1D7 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '-10%', right: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(93,248,216,0.12) 0%, transparent 70%)',
        }}/>
        <div style={{
          position: 'absolute', bottom: '5%', left: '-5%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111,209,215,0.10) 0%, transparent 70%)',
        }}/>
        <div style={{
          position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,117,151,0.08) 0%, transparent 70%)',
        }}/>
      </div>

      {/* Hex grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" style={{ pointerEvents: 'none' }}>
        <defs>
          <pattern id="hex-grid" x="0" y="0" width="56" height="64" patternUnits="userSpaceOnUse">
            <polygon points="28,2 54,16 54,48 28,62 2,48 2,16"
              stroke="#6FD1D7" strokeWidth="0.8" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)"/>
      </svg>

      {/* Top logo */}
      <div className="relative z-10 p-10">
        <Logo size="md" white />
      </div>

      {/* Central neural illustration */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-10">
        <div className="relative w-72 h-72 mb-8 animate-float">
          <svg viewBox="0 0 280 280" className="w-full h-full">
            {/* Connection lines */}
            {[
              [140,140,60,60],  [140,140,220,60],  [140,140,60,220],
              [140,140,220,220],[140,140,40,140],   [140,140,240,140],
              [140,140,140,40], [140,140,140,240],
              [60,60,40,140],   [220,60,240,140],   [60,220,40,140],
              [220,220,240,140],[60,60,140,40],      [220,60,140,40],
            ].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#6FD1D7" strokeWidth="0.8" strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
            ))}

            {/* Outer nodes */}
            {[
              [60,60,'#5DF8D8',0],   [220,60,'#6FD1D7',0.3],
              [60,220,'#6FD1D7',0.6],[220,220,'#5DF8D8',0.9],
              [40,140,'#6FD1D7',0.2],[240,140,'#5DF8D8',0.5],
              [140,40,'#5DF8D8',0.7],[140,240,'#6FD1D7',1.0],
            ].map(([cx,cy,col,dl],i) => (
              <circle key={i} cx={cx} cy={cy} r="6" fill={col} fillOpacity={0.7}/>
            ))}

            {/* Pulsing rings around center */}
            <circle cx="140" cy="140" r="35" fill="none"
              stroke="#6FD1D7" strokeWidth="1" strokeOpacity="0.2"/>
            <circle cx="140" cy="140" r="50" fill="none"
              stroke="#6FD1D7" strokeWidth="0.5" strokeOpacity="0.12"/>

            {/* Center node glassmorphism */}
            <circle cx="140" cy="140" r="28" fill="rgba(9,60,93,0.6)" stroke="#5DF8D8" strokeWidth="1.5" strokeOpacity="0.6"/>
            <circle cx="140" cy="140" r="18" fill="rgba(93,248,216,0.12)" stroke="#5DF8D8" strokeWidth="1" strokeOpacity="0.4"/>

            {/* Center AI symbol */}
            <text x="140" y="146" textAnchor="middle" fontSize="18" fontWeight="700"
              fill="#5DF8D8" fontFamily="Inter, sans-serif">AI</text>
          </svg>

          {/* Floating stat cards */}
          <div className="absolute top-2 -right-4 glass-panel px-3 py-2 rounded-xl animate-float" style={{ animationDelay: '1s', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="text-[10px] font-semibold text-white/50 uppercase tracking-wide">Active Sessions</div>
            <div className="text-xl font-bold text-white">3,841</div>
          </div>
          <div className="absolute -bottom-2 -left-4 rounded-xl animate-float px-3 py-2" style={{ animationDelay: '2s', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="text-[10px] font-semibold text-white/50 uppercase tracking-wide">AI Accuracy</div>
            <div className="text-xl font-bold" style={{ color: '#5DF8D8' }}>98.7%</div>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center max-w-xs">
          <h2 className="text-3xl font-bold text-white leading-snug tracking-tight mb-3">
            Intelligence built for campus life
          </h2>
          <p className="text-white/55 text-sm leading-relaxed">
            Ask questions, get instant answers, and unlock AI-assisted learning — all tied to your matric number.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {['24/7 AI Tutor','Assignment Help','Past Questions','Research Aid'].map(f => (
            <span key={f} className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="relative z-10 p-10 grid grid-cols-3 gap-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {[
          { n: '12K+', l: 'Students' },
          { n: '47',   l: 'Departments' },
          { n: '99.9%',l: 'Uptime' },
        ].map(({ n, l }) => (
          <div key={l} className="text-center">
            <div className="text-xl font-bold text-white">{n}</div>
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wide mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
