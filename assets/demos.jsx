// In-context strip: shows the logo in three real placements
//   1. App top-right (390-wide app header with a Home toggle + first card)
//   2. App Store card (rounded icon + name + tagline + "Get" button)
//   3. Marketing hero — large lockup on dark with a tagline
//
// Pass a `direction` prop indicating which family to render, e.g. "D1".

const C = window.AfgTokens;
const WRISTBAND = window.AfgWristband;

function pick(direction, kind) {
  return window[`${direction}_${kind}`];
}

// ── 1. App top-right ───────────────────────────────────────────────
function AppTopRight({ direction }) {
  const Logo = pick(direction, 'Logo');
  return (
    <div style={{
      width: 390, height: 220,
      background: C.black, position: 'relative', overflow: 'hidden',
      fontFamily: '"DM Sans", sans-serif',
    }}>
      {/* status bar */}
      <div style={{
        height: 38, padding: '0 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: '"DM Mono", monospace', fontSize: 12, color: C.white, letterSpacing: '0.05em',
      }}>
        <span style={{ fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11 }}>•••</span>
          <span style={{ fontSize: 11 }}>◐</span>
          <span style={{ width: 22, height: 11, border: '1.2px solid '+C.white, borderRadius: 3,
                         position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'absolute', inset: 1.5, background: C.white, borderRadius: 1.5, width: '80%' }} />
          </span>
        </div>
      </div>

      {/* app header — logo top-right */}
      <div style={{
        padding: '6px 16px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: '"Bebas Neue", sans-serif', color: C.white, fontSize: 26, letterSpacing: '0.01em',
        }}>HOME</span>
        <div style={{ transform: 'scale(0.55)', transformOrigin: 'right center' }}>
          <Logo size={36} />
        </div>
      </div>

      {/* a show card peek */}
      <div style={{
        margin: '0 16px', background: C.deep, border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 6, padding: '14px 14px 14px 18px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: C.amber,
                      borderRadius: '6px 0 0 6px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(245,166,35,0.14)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: '"Bebas Neue", sans-serif', color: C.amber, fontSize: 18 }}>F</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', color: C.white, fontSize: 17,
                          letterSpacing: '0.01em', lineHeight: 1 }}>FONTAINES D.C.</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 8.5, letterSpacing: '0.12em',
                          color: 'rgba(240,238,248,0.4)', textTransform: 'uppercase', marginTop: 4 }}>
              Brixton Academy
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Pill color="rgba(255,107,157,0.0)" text="rgba(240,238,248,0.4)" border="rgba(255,255,255,0.1)">WISHLIST</Pill>
            <Pill color="rgba(123,79,255,0.18)" text={C.violet} border="rgba(123,79,255,0.35)">GOING</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ color, text, border, children }) {
  return (
    <span style={{
      fontFamily: '"DM Mono", monospace', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: text, background: color, border: `1px solid ${border}`,
      padding: '4px 8px', borderRadius: 6, whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// ── 2. App Store row ───────────────────────────────────────────────
function AppStoreCard({ direction }) {
  const Mark = pick(direction, 'Mark');
  return (
    <div style={{
      width: 460, padding: 28, background: '#fafafa', borderRadius: 18,
      fontFamily: '-apple-system, "SF Pro Text", sans-serif',
      display: 'flex', alignItems: 'center', gap: 18,
    }}>
      <div style={{ flex: '0 0 auto', boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)',
                    borderRadius: 26, overflow: 'hidden' }}>
        <Mark size={116} />
      </div>
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.01em' }}>Afterglow</div>
        <div style={{ fontSize: 13, color: '#6e6e73', marginTop: 2 }}>Live music, remembered.</div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            background: '#0071e3', color: 'white', border: 'none', borderRadius: 999,
            padding: '6px 22px', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
            textTransform: 'uppercase', cursor: 'pointer',
          }}>Get</button>
          <span style={{ fontSize: 11, color: '#6e6e73' }}>In-App Purchases</span>
        </div>
      </div>
    </div>
  );
}

// ── 3. Marketing hero ──────────────────────────────────────────────
function MarketingHero({ direction }) {
  const Logo = pick(direction, 'Logo');
  return (
    <div style={{
      width: 600, height: 320, background: C.black, borderRadius: 8,
      position: 'relative', overflow: 'hidden', padding: 36,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <window.AfgNoise opacity={0.22} />
      {/* corner stripe */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 4, background: WRISTBAND }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Logo size={48} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif', color: C.white,
          fontSize: 44, lineHeight: 0.95, letterSpacing: '0.005em', maxWidth: 480,
        }}>
          THE SHOWS YOU LIVE<br/>SHOULD LAST LONGER<br/>THAN THE NIGHT.
        </div>
        <div style={{
          fontFamily: '"DM Mono", monospace', color: 'rgba(240,238,248,0.55)',
          fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 16,
        }}>
          weareafterglow.app
        </div>
      </div>
    </div>
  );
}

window.AppTopRight = AppTopRight;
window.AppStoreCard = AppStoreCard;
window.MarketingHero = MarketingHero;
