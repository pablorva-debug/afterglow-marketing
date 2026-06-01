(function () {
  'use strict';

  // ─── Afterglow Landing Logos ───────────────────────────────────────────────
  // Vanilla JS port of components/Logo.tsx
  // Exports window.AfterglowLogos with:
  //   buildMark(size)            → SVG icon tile
  //   buildWordmark(fontSize)    → chromatic AFTERGLOW wordmark span
  //   buildLockup(size, opts)    → icon + wordmark combined

  var CSS_VARS = {
    amber:  '#f5a623',
    violet: '#7b4fff',
    rose:   '#ff6b9d',
    black:  '#07060d',
    white:  '#f0eef8',
  };

  // ─── buildMark ─────────────────────────────────────────────────────────────
  // Returns a dark-tile SVG icon mark at the given pixel size.
  function buildMark(size) {
    size = size || 32;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 32 32');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.style.display = 'block';
    svg.style.flexShrink = '0';

    // Dark tile background
    var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '32');
    bg.setAttribute('height', '32');
    bg.setAttribute('rx', '5');
    bg.setAttribute('fill', CSS_VARS.black);
    svg.appendChild(bg);

    // Glow blob behind the mark
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var radial = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    radial.setAttribute('id', 'ag-mark-glow-' + size);
    radial.setAttribute('cx', '50%');
    radial.setAttribute('cy', '40%');
    radial.setAttribute('r', '50%');
    var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', CSS_VARS.violet);
    stop1.setAttribute('stop-opacity', '0.45');
    var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', CSS_VARS.violet);
    stop2.setAttribute('stop-opacity', '0');
    radial.appendChild(stop1);
    radial.appendChild(stop2);
    defs.appendChild(radial);
    svg.appendChild(defs);

    var glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    glowCircle.setAttribute('cx', '16');
    glowCircle.setAttribute('cy', '13');
    glowCircle.setAttribute('rx', '14');
    glowCircle.setAttribute('ry', '12');
    glowCircle.setAttribute('fill', 'url(#ag-mark-glow-' + size + ')');
    svg.appendChild(glowCircle);

    // Chromatic afterglow rays — three layered arcs (violet, rose, amber)
    var layers = [
      { color: CSS_VARS.violet, dx: -0.7, opacity: 0.85 },
      { color: CSS_VARS.rose,   dx: -0.35, opacity: 1 },
      { color: CSS_VARS.amber,  dx: 0,    opacity: 1 },
    ];

    layers.forEach(function (layer) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('style', 'mix-blend-mode: screen');
      g.setAttribute('opacity', layer.opacity);

      // Bottom semicircle (the "glow" arc)
      var arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var cx = 16 + layer.dx;
      var cy = 17;
      var r = 7;
      // Arc path: move to left edge, arc across bottom
      arc.setAttribute('d',
        'M ' + (cx - r) + ' ' + cy + ' ' +
        'A ' + r + ' ' + r + ' 0 0 0 ' + (cx + r) + ' ' + cy
      );
      arc.setAttribute('stroke', layer.color);
      arc.setAttribute('stroke-width', '2');
      arc.setAttribute('fill', 'none');
      arc.setAttribute('stroke-linecap', 'round');
      g.appendChild(arc);

      // Centre dot
      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', String(cx));
      dot.setAttribute('cy', String(cy - r - 1.5));
      dot.setAttribute('r', '1.8');
      dot.setAttribute('fill', layer.color);
      g.appendChild(dot);

      // Vertical stem
      var stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      stem.setAttribute('x1', String(cx));
      stem.setAttribute('y1', String(cy - r + 0.5));
      stem.setAttribute('x2', String(cx));
      stem.setAttribute('y2', String(cy));
      stem.setAttribute('stroke', layer.color);
      stem.setAttribute('stroke-width', '2');
      stem.setAttribute('stroke-linecap', 'round');
      g.appendChild(stem);

      svg.appendChild(g);
    });

    return svg;
  }

  // ─── buildWordmark ──────────────────────────────────────────────────────────
  // Returns the chromatic layered AFTERGLOW wordmark as a span element.
  function buildWordmark(fontSize) {
    fontSize = fontSize || 20;

    var wrap = document.createElement('span');
    wrap.style.cssText = [
      'position: relative',
      'display: inline-block',
      'font-family: "Bebas Neue", sans-serif',
      'font-size: ' + fontSize + 'px',
      'letter-spacing: 0.03em',
      'line-height: 0.85',
      'user-select: none',
      '-webkit-user-select: none',
    ].join(';');

    var layers = [
      { color: CSS_VARS.violet, left: '-0.09em', opacity: '0.85', pos: 'absolute' },
      { color: CSS_VARS.rose,   left: '-0.045em', opacity: '1',   pos: 'absolute' },
      { color: CSS_VARS.amber,  left: '0',        opacity: '1',   pos: 'relative' },
    ];

    layers.forEach(function (layer) {
      var span = document.createElement('span');
      span.textContent = 'AFTERGLOW';
      span.style.cssText = [
        'position: ' + layer.pos,
        'top: 0',
        'left: ' + layer.left,
        'color: ' + layer.color,
        'mix-blend-mode: screen',
        'opacity: ' + layer.opacity,
        'font-family: "Bebas Neue", sans-serif',
        'line-height: 0.85',
        'white-space: nowrap',
      ].join(';');
      wrap.appendChild(span);
    });

    return wrap;
  }

  // ─── buildLockup ───────────────────────────────────────────────────────────
  // Returns icon + wordmark combined.
  // opts.layout: 'inline' (default) | 'stacked'
  function buildLockup(size, opts) {
    size = size || 32;
    opts = opts || {};
    var stacked = opts.layout === 'stacked';

    var wrap = document.createElement('span');
    wrap.style.cssText = [
      'display: inline-flex',
      'flex-direction: ' + (stacked ? 'column' : 'row'),
      'align-items: center',
      'gap: ' + (stacked ? '0.4em' : '0.5em'),
      'line-height: 1',
    ].join(';');

    wrap.appendChild(buildMark(size));
    wrap.appendChild(buildWordmark(stacked ? size * 0.7 : size * 0.55));

    return wrap;
  }

  // ─── Export ─────────────────────────────────────────────────────────────────
  window.AfterglowLogos = {
    buildMark:     buildMark,
    buildWordmark: buildWordmark,
    buildLockup:   buildLockup,
  };

})();
