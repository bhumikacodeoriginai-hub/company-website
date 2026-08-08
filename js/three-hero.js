/**
 * Code Origin.AI — Premium 3D Hero Scene
 * AI Core Ecosystem: Central core + orbiting nodes + data pathways + security rings
 * Performance-first: adaptive quality, lazy rendering, respects reduced-motion
 */
(function () {
'use strict';

// Bail on reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

const canvas = document.getElementById('hero-3d');
if (!canvas) return;

// Performance tier detection
const tier = detectPerformanceTier();
if (tier === 'none') return;

const CONFIG = {
  high: { particles: 3000, nodes: 8, rings: 3, lines: 400, dpr: Math.min(window.devicePixelRatio, 2) },
  medium: { particles: 1500, nodes: 6, rings: 2, lines: 200, dpr: Math.min(window.devicePixelRatio, 1.5) },
  low: { particles: 600, nodes: 4, rings: 1, lines: 80, dpr: 1 }
};
const cfg = CONFIG[tier];


// Scene setup
let W = canvas.clientWidth || window.innerWidth;
let H = canvas.clientHeight || window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: tier === 'high', alpha: true });
renderer.setSize(W, H);
renderer.setPixelRatio(cfg.dpr);
camera.position.set(0, 2, 35);

// Mouse tracking (normalized -1 to 1)
let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
document.addEventListener('mousemove', function(e) {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });

// Touch support
document.addEventListener('touchmove', function(e) {
  if (e.touches.length > 0) {
    targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
  }
}, { passive: true });


// ─── AI CORE (Central Icosahedron) ───
const coreGeo = new THREE.IcosahedronGeometry(3, 2);
const coreMat = new THREE.MeshBasicMaterial({
  color: 0x3b82f6,
  wireframe: true,
  transparent: true,
  opacity: 0.35
});
const core = new THREE.Mesh(coreGeo, coreMat);
core.position.set(8, 0, -5);
scene.add(core);

// Inner core glow
const innerGeo = new THREE.IcosahedronGeometry(1.8, 1);
const innerMat = new THREE.MeshBasicMaterial({
  color: 0x06b6d4,
  wireframe: true,
  transparent: true,
  opacity: 0.2
});
const innerCore = new THREE.Mesh(innerGeo, innerMat);
innerCore.position.copy(core.position);
scene.add(innerCore);

// Core point light effect (simple sprite)
const glowTex = createGlowTexture();
const glowMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
const glowSprite = new THREE.Sprite(glowMat);
glowSprite.position.copy(core.position);
glowSprite.scale.set(12, 12, 1);
scene.add(glowSprite);


// ─── ORBITING NODES (Capabilities) ───
const nodeLabels = ['AI', 'Cloud', 'Security', 'Data', 'Software', 'DevOps', 'ML', 'Automation'];
const nodeColors = [0x3b82f6, 0x06b6d4, 0x8b5cf6, 0x22d3ee, 0x60a5fa, 0x06b6d4, 0x8b5cf6, 0x3b82f6];
const nodes = [];
const nodeCount = cfg.nodes;

for (let i = 0; i < nodeCount; i++) {
  const angle = (i / nodeCount) * Math.PI * 2;
  const radius = 8 + Math.random() * 3;
  const yOffset = (Math.random() - 0.5) * 6;

  const nodeGeo = new THREE.OctahedronGeometry(0.5 + Math.random() * 0.3, 0);
  const nodeMat = new THREE.MeshBasicMaterial({
    color: nodeColors[i % nodeColors.length],
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
  nodeMesh.position.set(
    core.position.x + Math.cos(angle) * radius,
    core.position.y + yOffset,
    core.position.z + Math.sin(angle) * radius
  );
  scene.add(nodeMesh);
  nodes.push({ mesh: nodeMesh, angle, radius, yOffset, speed: 0.15 + Math.random() * 0.1 });
}


// ─── SECURITY RINGS ───
const rings = [];
for (let i = 0; i < cfg.rings; i++) {
  const ringGeo = new THREE.TorusGeometry(5 + i * 2.5, 0.03, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({
    color: i === 0 ? 0x3b82f6 : i === 1 ? 0x06b6d4 : 0x8b5cf6,
    transparent: true,
    opacity: 0.12 - i * 0.03
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.copy(core.position);
  ring.rotation.x = Math.PI / (2.5 + i * 0.5);
  ring.rotation.y = i * 0.4;
  scene.add(ring);
  rings.push(ring);
}

// ─── PARTICLE FIELD (Background Data Flow) ───
const particleCount = cfg.particles;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 120;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  
  const colorChoice = Math.random();
  if (colorChoice < 0.4) { colors[i*3]=0.23; colors[i*3+1]=0.51; colors[i*3+2]=0.96; }
  else if (colorChoice < 0.7) { colors[i*3]=0.02; colors[i*3+1]=0.71; colors[i*3+2]=0.83; }
  else { colors[i*3]=0.55; colors[i*3+1]=0.36; colors[i*3+2]=0.96; }
  
  sizes[i] = Math.random() * 1.5 + 0.5;
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
const particleMat = new THREE.PointsMaterial({
  size: 0.1,
  vertexColors: true,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);


// ─── CONNECTION LINES (Data Pathways) ───
const maxLines = cfg.lines;
const linePositions = new Float32Array(maxLines * 6);
const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
lineGeo.setDrawRange(0, 0);
const lineMat = new THREE.LineBasicMaterial({
  color: 0x3b82f6,
  transparent: true,
  opacity: 0.06
});
const lines = new THREE.LineSegments(lineGeo, lineMat);
scene.add(lines);

// Node-to-core connection lines
const nodeLinePositions = new Float32Array(nodeCount * 6);
const nodeLineGeo = new THREE.BufferGeometry();
nodeLineGeo.setAttribute('position', new THREE.BufferAttribute(nodeLinePositions, 3));
const nodeLineMat = new THREE.LineBasicMaterial({
  color: 0x06b6d4,
  transparent: true,
  opacity: 0.15
});
const nodeLines = new THREE.LineSegments(nodeLineGeo, nodeLineMat);
scene.add(nodeLines);


// ─── DATA STREAM PARTICLES (flowing toward core) ───
const streamCount = tier === 'high' ? 200 : tier === 'medium' ? 100 : 40;
const streamPositions = new Float32Array(streamCount * 3);
const streamVelocities = [];
for (let i = 0; i < streamCount; i++) {
  resetStreamParticle(i);
}
const streamGeo = new THREE.BufferGeometry();
streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
const streamMat = new THREE.PointsMaterial({
  size: 0.15,
  color: 0x22d3ee,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true
});
const streamParticles = new THREE.Points(streamGeo, streamMat);
scene.add(streamParticles);

function resetStreamParticle(i) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 15 + Math.random() * 20;
  streamPositions[i * 3] = core.position.x + Math.cos(angle) * dist;
  streamPositions[i * 3 + 1] = core.position.y + (Math.random() - 0.5) * 20;
  streamPositions[i * 3 + 2] = core.position.z + Math.sin(angle) * dist;
  streamVelocities[i] = { speed: 0.03 + Math.random() * 0.05 };
}


// ─── ANIMATION LOOP ───
let time = 0;
let isVisible = true;
let animId = null;

// Visibility observer - pause when off screen
const observer = new IntersectionObserver(function(entries) {
  isVisible = entries[0].isIntersecting;
  if (isVisible && !animId) animate();
}, { threshold: 0.1 });
observer.observe(canvas);

function animate() {
  if (!isVisible) { animId = null; return; }
  animId = requestAnimationFrame(animate);
  time += 0.004;

  // Smooth mouse interpolation
  mouseX += (targetMouseX - mouseX) * 0.02;
  mouseY += (targetMouseY - mouseY) * 0.02;

  // Camera subtle parallax
  camera.position.x = mouseX * 2.5;
  camera.position.y = 2 - mouseY * 1.5;
  camera.lookAt(6, 0, -5);

  // AI Core rotation
  core.rotation.x = time * 0.3;
  core.rotation.y = time * 0.5;
  innerCore.rotation.x = -time * 0.5;
  innerCore.rotation.y = -time * 0.3;

  // Core glow pulsing
  const pulse = 0.35 + Math.sin(time * 2) * 0.1;
  glowSprite.material.opacity = pulse;
  coreMat.opacity = 0.3 + Math.sin(time * 1.5) * 0.08;

  // Orbiting nodes
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    n.angle += n.speed * 0.008;
    n.mesh.position.x = core.position.x + Math.cos(n.angle) * n.radius;
    n.mesh.position.z = core.position.z + Math.sin(n.angle) * n.radius;
    n.mesh.position.y = core.position.y + n.yOffset + Math.sin(time + i) * 0.5;
    n.mesh.rotation.x += 0.01;
    n.mesh.rotation.y += 0.015;

    // Update node-to-core lines
    nodeLinePositions[i * 6] = n.mesh.position.x;
    nodeLinePositions[i * 6 + 1] = n.mesh.position.y;
    nodeLinePositions[i * 6 + 2] = n.mesh.position.z;
    nodeLinePositions[i * 6 + 3] = core.position.x;
    nodeLinePositions[i * 6 + 4] = core.position.y;
    nodeLinePositions[i * 6 + 5] = core.position.z;
  }
  nodeLineGeo.attributes.position.needsUpdate = true;


  // Security rings rotation
  for (let i = 0; i < rings.length; i++) {
    rings[i].rotation.z += 0.002 + i * 0.001;
    rings[i].rotation.x += 0.001;
  }

  // Background particles drift
  particles.rotation.y += 0.00015;
  particles.rotation.x += 0.00005;

  // Data stream particles flowing toward core
  const sp = streamGeo.attributes.position.array;
  for (let i = 0; i < streamCount; i++) {
    const dx = core.position.x - sp[i * 3];
    const dy = core.position.y - sp[i * 3 + 1];
    const dz = core.position.z - sp[i * 3 + 2];
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
    if (dist < 2) {
      resetStreamParticle(i);
    } else {
      const v = streamVelocities[i].speed;
      sp[i * 3] += (dx / dist) * v;
      sp[i * 3 + 1] += (dy / dist) * v;
      sp[i * 3 + 2] += (dz / dist) * v;
    }
  }
  streamGeo.attributes.position.needsUpdate = true;

  // Connection lines between nearby particles (sampled)
  let lineIdx = 0;
  const pArr = particleGeo.attributes.position.array;
  const step = tier === 'high' ? 20 : tier === 'medium' ? 35 : 50;
  for (let i = 0; i < particleCount && lineIdx < maxLines; i += step) {
    for (let j = i + step; j < particleCount && lineIdx < maxLines; j += step) {
      const dx = pArr[i*3] - pArr[j*3];
      const dy = pArr[i*3+1] - pArr[j*3+1];
      const dz = pArr[i*3+2] - pArr[j*3+2];
      if (dx*dx + dy*dy + dz*dz < 80) {
        linePositions[lineIdx*6] = pArr[i*3];
        linePositions[lineIdx*6+1] = pArr[i*3+1];
        linePositions[lineIdx*6+2] = pArr[i*3+2];
        linePositions[lineIdx*6+3] = pArr[j*3];
        linePositions[lineIdx*6+4] = pArr[j*3+1];
        linePositions[lineIdx*6+5] = pArr[j*3+2];
        lineIdx++;
      }
    }
  }
  lineGeo.setDrawRange(0, lineIdx * 2);
  lineGeo.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();


// ─── RESIZE HANDLER ───
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }, 150);
}, { passive: true });

// ─── HELPER: Performance Tier Detection ───
function detectPerformanceTier() {
  // Check WebGL support
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) return 'none';
  } catch (e) { return 'none'; }

  const w = window.innerWidth;
  const isMobile = w < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isTablet = w >= 768 && w < 1024;
  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;

  if (isMobile || memory <= 2 || cores <= 2) return 'low';
  if (isTablet || memory <= 4 || cores <= 4) return 'medium';
  return 'high';
}

// ─── HELPER: Create Glow Texture ───
function createGlowTexture() {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
  gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.3)');
  gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.05)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(c);
  return texture;
}

})();
