// landing-logos.js — Afterglow brand marks (vanilla DOM)
//
// Single committed direction: the "loud" Afterimage chromatic logo.
//   Violet (back, -9% offset) + rose (mid, -4.5% offset) + amber (front)
//   blended with mix-blend-mode: screen on a dark surface.
//
// Public API:
//   AfterglowLogos.buildMark(size, opts)     — chromatic A on rounded dark tile
//   AfterglowLogos.buildWordmark(size, opts) — chromatic AFTERGLOW wordmark
//   AfterglowLogos.buildLockup(size, opts)   — icon + wordmark side-by-side or stacked
//   AfterglowLogos.COLORS                    — token reference

(function () {
  const C = {
    black:  '#07060d',
    deep:   '#191626',
    amber:  '#f5a623',
    violet: '#7b4fff',
    rose:   '#ff6b9d',
    white:  '#f0eef8',
  };

  if (!document.getElementById('afg-logo-css')) {
    const s = document.createElement('style');
    s.id = 'afg-logo-css';
    s.textContent = `
      .afg-lockup{display:inline-flex;align-items:center;text-decoration:none;color:inherit;line-height:0.85;}
      .afg-lockup--stacked{flex-direction:column;}
      .afg-word{position:relative;display:inline-block;line-height:0.85;white-space:nowrap;}
      .afg-word > span{font-family:"Bebas Neue",sans-serif;font-weight:400;letter-spacing:0.005em;display:inline-block;line-height:0.85;}
    `;
    document.head.appendChild(s);
  }

  // ── Chromatic wordmark ──────────────────────────────────────────
  function buildWordmark(size, opts = {}) {
    const text = opts.text || 'AFTERGLOW';
    const w = document.createElement('span');
    w.className = 'afg-word';
    const fs = size + 'px';

    const back = document.createElement('span');
    back.textContent = text;
    back.style.cssText = `position:absolute;left:${-size * 0.09}px;top:0;color:${C.violet};font-size:${fs};mix-blend-mode:screen;opacity:0.85;`;

    const mid = document.createElement('span');
    mid.textContent = text;
    mid.style.cssText = `position:absolute;left:${-size * 0.045}px;top:0;color:${C.rose};font-size:${fs};mix-blend-mode:screen;`;

    const front = document.createElement('span');
    front.textContent = text;
    front.style.cssText = `color:${C.amber};font-size:${fs};`;

    w.appendChild(back);
    w.appendChild(mid);
    w.appendChild(front);
    return w;
  }

  // ── Chromatic A mark (on optional dark rounded tile) ────────────
  function buildMark(size, opts = {}) {
    const tile = opts.tile !== false;                 // default true
    const radius = opts.radius != null ? opts.radius : 0.222; // iOS-like
    const box = document.createElement('span');
    box.style.cssText = `position:relative;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;`;
    if (tile) {
      box.style.background = C.black;
      box.style.borderRadius = (size * radius) + 'px';
      box.style.overflow = 'hidden';
    }
    const fs = (size * 0.72) + 'px';
    const ff = '"Bebas Neue",sans-serif';

    const back = document.createElement('span');
    back.textContent = 'A';
    back.style.cssText = `position:absolute;transform:translateX(${-size * 0.07}px);color:${C.violet};font-size:${fs};font-family:${ff};line-height:1;mix-blend-mode:screen;opacity:0.85;`;

    const mid = document.createElement('span');
    mid.textContent = 'A';
    mid.style.cssText = `position:absolute;transform:translateX(${-size * 0.035}px);color:${C.rose};font-size:${fs};font-family:${ff};line-height:1;mix-blend-mode:screen;`;

    const front = document.createElement('span');
    front.textContent = 'A';
    front.style.cssText = `position:relative;color:${C.amber};font-size:${fs};font-family:${ff};line-height:1;`;

    box.appendChild(back);
    box.appendChild(mid);
    box.appendChild(front);
    return box;
  }

  // ── Lockup: mark + wordmark together ────────────────────────────
  // opts.layout: 'horizontal' (default) or 'stacked'
  // opts.markRatio: mark size relative to wordmark font-size (default 1.2 horiz, 1.6 stacked)
  function buildLockup(size, opts = {}) {
    const stacked = opts.layout === 'stacked';
    const markRatio = opts.markRatio != null ? opts.markRatio : (stacked ? 1.6 : 1.2);
    const wrap = document.createElement('span');
    wrap.className = 'afg-lockup' + (stacked ? ' afg-lockup--stacked' : '');
    wrap.style.gap = (size * (stacked ? 0.34 : 0.36)) + 'px';
    wrap.appendChild(buildMark(size * markRatio, { tile: opts.tile !== false }));
    wrap.appendChild(buildWordmark(size));
    return wrap;
  }

  window.AfterglowLogos = { buildMark, buildWordmark, buildLockup, COLORS: C };
})();
