/**
 * Code Origin.AI — Enterprise Architecture 3D Hero
 * 
 * Visualizes a structured digital engineering core:
 * Central intelligence node surrounded by layered capability nodes
 * (AI, Applications, APIs, Data, Cloud, Security, Infrastructure)
 * connected by subtle data pathways.
 * 
 * NOT generic particles. NOT a game. An enterprise architecture made visual.
 * 
 * Performance tiers: HIGH (desktop) / MEDIUM (laptop) / LOW (mobile) / NONE (fallback)
 */
(function () {
'use strict';

// Respect user preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

const canvas = document.getElementById('hero-3d');
if (!canvas) return;

// WebGL check
try {
  const tc = document.createElement('canvas');
  if (!tc.getContext('webgl') && !tc.getContext('experimental-webgl')) return;
} catch (e) { return; }

// Performance tier
const w = window.innerWidth;
const mem = navigator.deviceMemory || 4;
const cores = navigator.hardwareConcurrency || 4;
const isMobile = w < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent);

let tier = 'high';
if (isMobile && mem <= 2) return; // no render on very low devices
if (isMobile) tier = 'low';
else if (w < 1024 || mem <= 4 || cores <= 4) tier = 'medium';

const CFG = {
  high:   { dpr: Math.min(devicePixelRatio, 2), particles: 600, nodeCount: 7 },
  medium: { dpr: Math.min(devicePixelRatio, 1.5), particles: 350, nodeCount: 6 },
  low:    { dpr: 1, particles: 150, nodeCount: 5 }
};
const cfg = CFG[tier];

// Setup
let W = canvas.clientWidth || window.innerWidth;
let H = canvas.clientHeight || window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 600);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: tier === 'high' });
renderer.setSize(W, H);
renderer.setPixelRatio(cfg.dpr);
camera.position.set(0, 1, 28);

// Mouse parallax
let mx = 0, my = 0, tmx = 0, tmy = 0;
document.addEventListener('mousemove', function (e) {
  tmx = (e.clientX / window.innerWidth - 0.5) * 2;
  tmy = (e.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });


// ─── CENTRAL INTELLIGENCE CORE ───
const coreGeo = new THREE.IcosahedronGeometry(2.2, 2);
const coreMat = new THREE.MeshBasicMaterial({
  color: 0x2563eb, wireframe: true, transparent: true, opacity: 0.28
});
const core = new THREE.Mesh(coreGeo, coreMat);
core.position.set(6, 0, -4);
scene.add(core);

// Inner structure
const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
const innerMat = new THREE.MeshBasicMaterial({
  color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.15
});
const inner = new THREE.Mesh(innerGeo, innerMat);
inner.position.copy(core.position);
scene.add(inner);

// Core glow (canvas texture)
const glowCanvas = document.createElement('canvas');
glowCanvas.width = glowCanvas.height = 64;
const gCtx = glowCanvas.getContext('2d');
const gGrad = gCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
gGrad.addColorStop(0, 'rgba(37,99,235,0.4)');
gGrad.addColorStop(0.5, 'rgba(6,182,212,0.15)');
gGrad.addColorStop(1, 'rgba(0,0,0,0)');
gCtx.fillStyle = gGrad;
gCtx.fillRect(0, 0, 64, 64);
const glowTex = new THREE.CanvasTexture(glowCanvas);
const glow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTex, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending
}));
glow.position.copy(core.position);
glow.scale.set(8, 8, 1);
scene.add(glow);


// ─── ARCHITECTURE NODES (Layered capabilities) ───
const LABELS = ['AI', 'Apps', 'APIs', 'Data', 'Cloud', 'Security', 'Infra'];
const COLORS = [0x3b82f6, 0x06b6d4, 0x60a5fa, 0x22d3ee, 0x8b5cf6, 0x3b82f6, 0x06b6d4];
const nodes = [];

for (let i = 0; i < cfg.nodeCount; i++) {
  const angle = (i / cfg.nodeCount) * Math.PI * 2;
  const radius = 6 + (i % 2) * 1.5;
  const yOff = (Math.random() - 0.5) * 4;

  const geo = new THREE.OctahedronGeometry(0.35 + Math.random() * 0.2, 0);
  const mat = new THREE.MeshBasicMaterial({
    color: COLORS[i % COLORS.length],
    wireframe: true, transparent: true, opacity: 0.4
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(
    core.position.x + Math.cos(angle) * radius,
    core.position.y + yOff,
    core.position.z + Math.sin(angle) * radius
  );
  scene.add(mesh);
  nodes.push({ mesh, angle, radius, yOff, speed: 0.08 + Math.random() * 0.06 });
}

// Connection lines (node-to-core)
const nlPositions = new Float32Array(cfg.nodeCount * 6);
const nlGeo = new THREE.BufferGeometry();
nlGeo.setAttribute('position', new THREE.BufferAttribute(nlPositions, 3));
const nlMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.1 });
scene.add(new THREE.LineSegments(nlGeo, nlMat));

// Orbital ring
const ringGeo = new THREE.TorusGeometry(6, 0.015, 8, 80);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.07 });
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.position.copy(core.position);
ring.rotation.x = Math.PI / 3;
scene.add(ring);


// ─── AMBIENT PARTICLE FIELD (controlled, not random noise) ───
const pCount = cfg.particles;
const pPositions = new Float32Array(pCount * 3);
const pColors = new Float32Array(pCount * 3);

for (let i = 0; i < pCount; i++) {
  pPositions[i * 3] = (Math.random() - 0.5) * 80;
  pPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
  pPositions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;

  const c = Math.random();
  if (c < 0.5) { pColors[i*3]=0.23; pColors[i*3+1]=0.51; pColors[i*3+2]=0.96; }
  else if (c < 0.8) { pColors[i*3]=0.02; pColors[i*3+1]=0.71; pColors[i*3+2]=0.83; }
  else { pColors[i*3]=0.55; pColors[i*3+1]=0.36; pColors[i*3+2]=0.96; }
}

const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
  size: 0.08, vertexColors: true, transparent: true, opacity: 0.35,
  blending: THREE.AdditiveBlending, sizeAttenuation: true
}));
scene.add(particles);


// ─── ANIMATION ───
let time = 0;
let visible = true;
let raf = null;

const obs = new IntersectionObserver(function (entries) {
  visible = entries[0].isIntersecting;
  if (visible && !raf) animate();
}, { threshold: 0.05 });
obs.observe(canvas);

function animate() {
  if (!visible) { raf = null; return; }
  raf = requestAnimationFrame(animate);
  time += 0.003;

  // Mouse parallax (very subtle)
  mx += (tmx - mx) * 0.012;
  my += (tmy - my) * 0.012;
  camera.position.x = mx * 1.8;
  camera.position.y = 1 - my * 1;
  camera.lookAt(5, 0, -4);

  // Core rotation
  core.rotation.x = time * 0.25;
  core.rotation.y = time * 0.4;
  inner.rotation.x = -time * 0.35;
  inner.rotation.y = -time * 0.25;

  // Glow pulse
  glow.material.opacity = 0.25 + Math.sin(time * 1.5) * 0.06;

  // Ring rotation
  ring.rotation.z += 0.001;

  // Nodes orbit
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    n.angle += n.speed * 0.006;
    n.mesh.position.x = core.position.x + Math.cos(n.angle) * n.radius;
    n.mesh.position.z = core.position.z + Math.sin(n.angle) * n.radius;
    n.mesh.position.y = core.position.y + n.yOff + Math.sin(time + i) * 0.3;
    n.mesh.rotation.x += 0.008;
    n.mesh.rotation.y += 0.01;

    // Update connection lines
    nlPositions[i * 6] = n.mesh.position.x;
    nlPositions[i * 6 + 1] = n.mesh.position.y;
    nlPositions[i * 6 + 2] = n.mesh.position.z;
    nlPositions[i * 6 + 3] = core.position.x;
    nlPositions[i * 6 + 4] = core.position.y;
    nlPositions[i * 6 + 5] = core.position.z;
  }
  nlGeo.attributes.position.needsUpdate = true;

  // Particles slow drift
  particles.rotation.y += 0.0001;

  renderer.render(scene, camera);
}
animate();

// Resize
let rTimer;
window.addEventListener('resize', function () {
  clearTimeout(rTimer);
  rTimer = setTimeout(function () {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }, 200);
}, { passive: true });

})();
