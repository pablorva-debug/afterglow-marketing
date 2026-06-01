// Afterglow logo directions — each export is a family:
//   <Logo />        full lockup / wordmark
//   <Mark />        square mark for app icons
//   <Top />         used in the in-app top-right strip
//
// Design tokens (locked):
const C = {
  black:  '#07060d',
  deep:   '#191626',
  amber:  '#f5a623',
  violet: '#7b4fff',
  rose:   '#ff6b9d',
  white:  '#f0eef8',
};

// Reusable: wristband stripe gradient string
const WRISTBAND = `linear-gradient(90deg, ${C.violet}, ${C.rose}, ${C.amber}, ${C.rose}, ${C.violet})`;

// ── shared little bits ──────────────────────────────────────────────

const Word = ({ size = 56, color = C.white, letterSpacing = '0.01em', children = 'AFTERGLOW' }) => (
  <span style={{
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: size,
    lineHeight: 0.85,
    letterSpacing,
    color,
    fontWeight: 400,
    display: 'inline-block',
  }}>{children}</span>
);

const Tag = ({ children, color = 'rgba(240,238,248,0.45)', size = 9 }) => (
  <span style={{
    fontFamily: '"DM Mono", monospace',
    fontSize: size,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color,
    fontWeight: 500,
  }}>{children}</span>
);

// Rounded-square icon container
const Icon = ({ size = 200, bg = C.black, radius = 0.222, children, style }) => (
  <div style={{
    width: size, height: size,
    borderRadius: size * radius,
    background: bg,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  }}>{children}</div>
);

// Fixed-noise overlay (matches the system motif)
const Noise = ({ opacity = 0.18 }) => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none' }}>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /></filter>
    <rect width="100%" height="100%" filter="url(#n)" />
  </svg>
);

// ── 01 · Accent Bar ─────────────────────────────────────────────────
// The 3px amber accent bar (mandatory on every card) becomes the logo's
// signature device.  Most restrained, most "from the system".
window.D1_Logo = ({ size = 56 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.28 }}>
    <div style={{ width: Math.max(3, size * 0.06), height: size * 1.0, background: C.amber, borderRadius: 2 }} />
    <Word size={size} />
  </div>
);
window.D1_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    <div style={{ position: 'absolute', left: size * 0.18, top: size * 0.18, bottom: size * 0.18,
                  width: Math.max(4, size * 0.05), background: C.amber, borderRadius: 3 }} />
    <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.white, fontSize: size * 0.62,
                   marginLeft: size * 0.14, lineHeight: 1, letterSpacing: '-0.01em' }}>A</span>
  </Icon>
);

// ── 02 · Wristband Stripe ──────────────────────────────────────────
// The wristband motif as identity.  Stripe under the wordmark; for the
// icon, the stripe wraps the A.
window.D2_Logo = ({ size = 56 }) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: size * 0.16 }}>
    <Word size={size} />
    <div style={{ width: '100%', height: Math.max(3, size * 0.06), background: WRISTBAND, borderRadius: 2 }} />
  </div>
);
window.D2_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.white, fontSize: size * 0.7,
                   lineHeight: 1, letterSpacing: '-0.02em' }}>A</span>
    <div style={{ position: 'absolute', left: size * 0.16, right: size * 0.16, bottom: size * 0.18,
                  height: Math.max(4, size * 0.05), background: WRISTBAND, borderRadius: 2 }} />
  </Icon>
);

// ── 03 · Afterimage ────────────────────────────────────────────────
// The literal afterglow: the wordmark trailed by violet + rose ghosts,
// like a long-exposure photo of a stage light moving across the frame.
window.D3_Logo = ({ size = 56 }) => (
  <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0.85 }}>
    <span style={{ position: 'absolute', left: -size * 0.09, top: 0, mixBlendMode: 'screen' }}>
      <Word size={size} color={C.violet} />
    </span>
    <span style={{ position: 'absolute', left: -size * 0.045, top: 0, mixBlendMode: 'screen' }}>
      <Word size={size} color={C.rose} />
    </span>
    <Word size={size} color={C.amber} />
  </div>
);
window.D3_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    <div style={{ position: 'relative', lineHeight: 1 }}>
      <span style={{ position: 'absolute', inset: 0, transform: `translateX(${-size * 0.07}px)`, mixBlendMode: 'screen' }}>
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.violet, fontSize: size * 0.72 }}>A</span>
      </span>
      <span style={{ position: 'absolute', inset: 0, transform: `translateX(${-size * 0.035}px)`, mixBlendMode: 'screen' }}>
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.rose, fontSize: size * 0.72 }}>A</span>
      </span>
      <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.amber, fontSize: size * 0.72 }}>A</span>
    </div>
  </Icon>
);

// ── 04 · Glow Disc ─────────────────────────────────────────────────
// Literal afterglow: a soft amber sun.  Pairs with wordmark; alone it
// reads as a warm circular icon.
const GlowDisc = ({ d = 100 }) => (
  <div style={{
    width: d, height: d, borderRadius: '50%',
    background: `radial-gradient(circle at 50% 55%, ${C.amber} 0%, ${C.amber} 14%, rgba(245,166,35,0.55) 42%, rgba(245,166,35,0.0) 78%)`,
    filter: 'blur(0.4px)',
  }} />
);
window.D4_Logo = ({ size = 56 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.34 }}>
    <GlowDisc d={size * 1.05} />
    <Word size={size} />
  </div>
);
window.D4_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    {/* outer glow halo */}
    <div style={{ position: 'absolute', width: size * 1.3, height: size * 1.3,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(245,166,35,0.55) 0%, rgba(245,166,35,0.0) 55%)`,
                  filter: 'blur(2px)' }} />
    {/* solid amber disc */}
    <div style={{ position: 'absolute', width: size * 0.66, height: size * 0.66,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 38% 32%, #FFD18A 0%, ${C.amber} 55%, #d4861a 100%)`,
                  boxShadow: `0 0 ${size * 0.12}px ${size * 0.02}px rgba(245,166,35,0.5)` }} />
    {/* A on the disc */}
    <span style={{ position: 'relative', fontFamily: '"Bebas Neue", sans-serif',
                   color: C.black, fontSize: size * 0.42, lineHeight: 1,
                   letterSpacing: '-0.01em' }}>A</span>
  </Icon>
);

// ── 05 · Stamp ─────────────────────────────────────────────────────
// Concert passport → passport stamp.  Circular ring with the wordmark
// curved around the top and a single letter at centre.
window.D5_Logo = ({ size = 56 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.34 }}>
    <D5_Mark size={size * 1.2} />
    <Word size={size} />
  </div>
);
function D5_Mark({ size = 200 }) {
  const r = size * 0.5;
  return (
    <Icon size={size}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <path id={`stamp-top-${size}`} d={`M ${size * 0.18} ${r} A ${r - size * 0.18} ${r - size * 0.18} 0 0 1 ${size - size * 0.18} ${r}`} />
          <path id={`stamp-bot-${size}`} d={`M ${size * 0.18} ${r} A ${r - size * 0.18} ${r - size * 0.18} 0 0 0 ${size - size * 0.18} ${r}`} />
        </defs>
        <circle cx={r} cy={r} r={r - size * 0.07} fill="none" stroke={C.amber} strokeWidth={Math.max(1.5, size * 0.012)} />
        <circle cx={r} cy={r} r={r - size * 0.12} fill="none" stroke={C.amber} strokeWidth={Math.max(1, size * 0.006)} opacity="0.5" />
        <text fill={C.amber} style={{ fontFamily: '"DM Mono", monospace', fontSize: size * 0.075, letterSpacing: '0.34em', fontWeight: 500 }}>
          <textPath href={`#stamp-top-${size}`} startOffset="50%" textAnchor="middle">AFTERGLOW · CONCERT PASSPORT</textPath>
        </text>
        <text fill={C.amber} opacity="0.55" style={{ fontFamily: '"DM Mono", monospace', fontSize: size * 0.062, letterSpacing: '0.4em', fontWeight: 500 }}>
          <textPath href={`#stamp-bot-${size}`} startOffset="50%" textAnchor="middle">★ EST · MMXXVI ★</textPath>
        </text>
      </svg>
      <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.amber, fontSize: size * 0.42, lineHeight: 1 }}>A</span>
    </Icon>
  );
}
window.D5_Mark = D5_Mark;

// ── 06 · Horizon ───────────────────────────────────────────────────
// Half-disc cresting a horizon — the literal afterglow of dusk.  Sun
// in amber, sky gradient violet → rose → amber.
window.D6_Logo = ({ size = 56 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3 }}>
    <D6_Mark size={size * 1.15} radius={0.2} />
    <Word size={size} />
  </div>
);
function D6_Mark({ size = 200, radius }) {
  return (
    <Icon size={size} bg={C.black} radius={radius}>
      {/* sky */}
      <div style={{ position: 'absolute', inset: 0,
                    background: `linear-gradient(180deg, ${C.violet} 0%, ${C.rose} 38%, ${C.amber} 72%, ${C.black} 100%)`,
                    opacity: 0.92 }} />
      {/* sun */}
      <div style={{ position: 'absolute', left: '50%', bottom: '32%', transform: 'translateX(-50%)',
                    width: size * 0.46, height: size * 0.46, borderRadius: '50%',
                    background: `radial-gradient(circle, #FFE0A0 0%, ${C.amber} 38%, rgba(245,166,35,0.9) 100%)`,
                    boxShadow: `0 0 ${size * 0.18}px ${size * 0.04}px rgba(245,166,35,0.55)` }} />
      {/* horizon line */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: '30%', height: 1, background: 'rgba(7,6,13,0.45)' }} />
      {/* foreground darkness */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%',
                    background: `linear-gradient(180deg, rgba(7,6,13,0.6) 0%, ${C.black} 90%)` }} />
    </Icon>
  );
}
window.D6_Mark = D6_Mark;

// ── 07 · Pulse ─────────────────────────────────────────────────────
// The Live-badge pulsing dot, integrated as a punctuation glyph after
// the wordmark.  Subtlest, most product-aware.
window.D7_Logo = ({ size = 56, pulse = true }) => (
  <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: size * 0.18 }}>
    <Word size={size} />
    <div style={{ width: size * 0.18, height: size * 0.18, borderRadius: '50%', background: C.amber,
                  animation: pulse ? 'afg-pulse 1.6s ease-in-out infinite' : 'none',
                  alignSelf: 'center', marginBottom: size * 0.04,
                  boxShadow: `0 0 ${size * 0.18}px ${C.amber}` }} />
  </div>
);
window.D7_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    <div style={{ display: 'inline-flex', alignItems: 'flex-end', gap: size * 0.08 }}>
      <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.white, fontSize: size * 0.7,
                     lineHeight: 0.85, letterSpacing: '-0.02em' }}>A</span>
      <span style={{ width: size * 0.13, height: size * 0.13, borderRadius: '50%', background: C.amber,
                     marginBottom: size * 0.04, boxShadow: `0 0 ${size * 0.16}px ${C.amber}`,
                     animation: 'afg-pulse 1.6s ease-in-out infinite' }} />
    </div>
  </Icon>
);

// ════════════════════════════════════════════════════════════════════
// VARIATIONS (round 2 — 3 concepts, 3 takes each)
// ════════════════════════════════════════════════════════════════════

// ── 03b · Afterimage · Warm (sunset hues, no purple) ───────────────
//   Trail in deep amber/rust → amber → pale gold/white at the front.
//   Reads as heat-haze instead of chromatic aberration.
const WARM = { back: '#b8410c', mid: C.amber, front: '#FFE7B0' };

window.D3b_Logo = ({ size = 56 }) => (
  <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0.85 }}>
    <span style={{ position: 'absolute', left: -size * 0.09, top: 0, mixBlendMode: 'screen', opacity: 0.85 }}>
      <Word size={size} color={WARM.back} />
    </span>
    <span style={{ position: 'absolute', left: -size * 0.045, top: 0, mixBlendMode: 'screen' }}>
      <Word size={size} color={WARM.mid} />
    </span>
    <Word size={size} color={WARM.front} />
  </div>
);
window.D3b_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    <div style={{ position: 'relative', lineHeight: 1 }}>
      <span style={{ position: 'absolute', inset: 0, transform: `translateX(${-size * 0.07}px)`, mixBlendMode: 'screen', opacity: 0.85 }}>
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: WARM.back, fontSize: size * 0.72 }}>A</span>
      </span>
      <span style={{ position: 'absolute', inset: 0, transform: `translateX(${-size * 0.035}px)`, mixBlendMode: 'screen' }}>
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: WARM.mid, fontSize: size * 0.72 }}>A</span>
      </span>
      <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: WARM.front, fontSize: size * 0.72 }}>A</span>
    </div>
  </Icon>
);

// ── 03c · Afterimage · Mono-amber trail ────────────────────────────
//   Same letter repeated 3× in amber at decreasing opacity — a literal
//   light-trail / decaying afterimage in one hue.  Brightest at front.
window.D3c_Logo = ({ size = 56 }) => (
  <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0.85 }}>
    <span style={{ position: 'absolute', left: -size * 0.11, top: 0, opacity: 0.22 }}>
      <Word size={size} color={C.amber} />
    </span>
    <span style={{ position: 'absolute', left: -size * 0.055, top: 0, opacity: 0.5 }}>
      <Word size={size} color={C.amber} />
    </span>
    <Word size={size} color={C.amber} />
  </div>
);
window.D3c_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    <div style={{ position: 'relative', lineHeight: 1 }}>
      <span style={{ position: 'absolute', inset: 0, transform: `translateX(${-size * 0.09}px)`, opacity: 0.22 }}>
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.amber, fontSize: size * 0.72 }}>A</span>
      </span>
      <span style={{ position: 'absolute', inset: 0, transform: `translateX(${-size * 0.045}px)`, opacity: 0.5 }}>
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.amber, fontSize: size * 0.72 }}>A</span>
      </span>
      <span style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.amber, fontSize: size * 0.72 }}>A</span>
    </div>
  </Icon>
);

// ── 04b · Glow Disc · Eclipse ──────────────────────────────────────
//   White A in front, amber glow disc behind — light bleeds around the
//   silhouette.  More mysterious; reads strongly even at tiny sizes.
window.D4b_Logo = ({ size = 56 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32 }}>
    <D4b_Mark size={size * 1.15} radius={0.2} />
    <Word size={size} />
  </div>
);
function D4b_Mark({ size = 200, radius }) {
  return (
    <Icon size={size} radius={radius}>
      <div style={{ position: 'absolute', width: size * 0.62, height: size * 0.62, borderRadius: '50%',
                    background: `radial-gradient(circle, ${C.amber} 0%, ${C.amber} 30%, rgba(245,166,35,0.45) 60%, rgba(245,166,35,0) 100%)`,
                    filter: `blur(${size * 0.012}px)`,
                    boxShadow: `0 0 ${size * 0.22}px ${size * 0.06}px rgba(245,166,35,0.45)` }} />
      <span style={{ position: 'relative', fontFamily: '"Bebas Neue", sans-serif',
                     color: C.white, fontSize: size * 0.58, lineHeight: 1,
                     textShadow: `0 0 ${size * 0.04}px rgba(245,166,35,0.6)` }}>A</span>
    </Icon>
  );
}
window.D4b_Mark = D4b_Mark;

// ── 04c · Glow Disc · Halo (no hard edge) ──────────────────────────
//   Pure radial bloom, no defined disc — closest to a true "afterglow"
//   of a light source.  Soft, atmospheric.
window.D4c_Logo = ({ size = 56 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32 }}>
    <D4c_Mark size={size * 1.15} radius={0.2} />
    <Word size={size} />
  </div>
);
function D4c_Mark({ size = 200, radius }) {
  return (
    <Icon size={size} radius={radius}>
      <div style={{ position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at 50% 52%, #FFE7B0 0%, ${C.amber} 14%, rgba(245,166,35,0.55) 32%, rgba(245,166,35,0.12) 58%, rgba(245,166,35,0) 80%)` }} />
      <span style={{ position: 'relative', fontFamily: '"Bebas Neue", sans-serif',
                     color: C.black, fontSize: size * 0.42, lineHeight: 1,
                     letterSpacing: '-0.01em', opacity: 0.92 }}>A</span>
    </Icon>
  );
}
window.D4c_Mark = D4c_Mark;

// ── 07b · Pulse · Counter-O (the O becomes the glow) ───────────────
//   The O in AFTERGLOW is replaced with a solid amber pulsing disc.
//   Uses inline flow + em units so the disc aligns to the cap height.
window.D7b_Logo = ({ size = 56, pulse = true }) => (
  <span style={{
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: size,
    lineHeight: 0.85,
    color: C.white,
    letterSpacing: '0.01em',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  }}>
    AFTERGL<span style={{
      display: 'inline-block',
      width: '0.55em', height: '0.72em',
      borderRadius: '50%',
      background: C.amber,
      verticalAlign: '-0.04em',
      margin: '0 0.02em',
      boxShadow: `0 0 ${size * 0.12}px rgba(245,166,35,0.55)`,
      animation: pulse ? 'afg-pulse 1.6s ease-in-out infinite' : 'none',
    }} />W
  </span>
);
// Icon: a glowing amber O on its own — the "punctuation that became the brand".
//   Big counter-O disc, with a tiny A·W flank if room.  But keeping it pure
//   reads stronger at 28px:  just the disc.
window.D7b_Mark = ({ size = 200 }) => (
  <Icon size={size}>
    <span style={{
      width: size * 0.5, height: size * 0.5, borderRadius: '50%',
      background: C.amber,
      boxShadow: `0 0 ${size * 0.18}px ${size * 0.02}px rgba(245,166,35,0.55)`,
      animation: 'afg-pulse 1.6s ease-in-out infinite',
    }} />
  </Icon>
);

// ── 07c · Pulse · Ripple (sonar rings) ─────────────────────────────
//   Dot with two concentric outline rings — outward sound/light wave.
//   Most "live music"-coded.
window.D7c_Logo = ({ size = 56 }) => {
  const dot = size * 0.22;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.24 }}>
      <Word size={size} />
      <span style={{ position: 'relative', width: dot * 2.4, height: dot * 2.4,
                     display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%',
                       border: `1.5px solid rgba(245,166,35,0.35)`,
                       animation: 'afg-ripple 2.4s ease-out infinite' }} />
        <span style={{ position: 'absolute', inset: '20%', borderRadius: '50%',
                       border: `1.5px solid rgba(245,166,35,0.6)`,
                       animation: 'afg-ripple 2.4s ease-out 0.6s infinite' }} />
        <span style={{ width: dot, height: dot, borderRadius: '50%', background: C.amber,
                       boxShadow: `0 0 ${size * 0.14}px ${C.amber}` }} />
      </span>
    </div>
  );
};
window.D7c_Mark = ({ size = 200 }) => {
  const dot = size * 0.18;
  return (
    <Icon size={size}>
      <span style={{ position: 'absolute', width: size * 0.78, height: size * 0.78, borderRadius: '50%',
                     border: `1.5px solid rgba(245,166,35,0.22)` }} />
      <span style={{ position: 'absolute', width: size * 0.5, height: size * 0.5, borderRadius: '50%',
                     border: `1.5px solid rgba(245,166,35,0.45)` }} />
      <span style={{ width: dot, height: dot, borderRadius: '50%', background: C.amber,
                     boxShadow: `0 0 ${size * 0.12}px ${C.amber}` }} />
    </Icon>
  );
};

// Pulse keyframes (single inject)
if (typeof document !== 'undefined' && !document.getElementById('afg-pulse-css')) {
  const s = document.createElement('style');
  s.id = 'afg-pulse-css';
  s.textContent = `
    @keyframes afg-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
    @keyframes afg-ripple{0%{transform:scale(0.5);opacity:.8}100%{transform:scale(1.4);opacity:0}}
  `;
  document.head.appendChild(s);
}

// Tag exported for reuse in the demo screens
window.AfgTokens = C;
window.AfgWord = Word;
window.AfgTag = Tag;
window.AfgIcon = Icon;
window.AfgNoise = Noise;
window.AfgWristband = WRISTBAND;
