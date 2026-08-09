/**
 * Code Origin.AI — Digital Engineering Core
 * Interactive 3D architecture visualization
 * Central node with connected technology domains
 */
(function() {
'use strict';

// Respect reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

const canvas = document.getElementById('hero-3d');
if (!canvas) return;

// Detect mobile for performance optimization
const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth < 1024;
const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

let W = window.innerWidth;
let H = window.innerHeight;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !isMobile,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(W, H);
renderer.setPixelRatio(pixelRatio);
camera.position.set(0, 2, isMobile ? 35 : 28);


// Color palette
const colors = {
  core: 0x2563eb,
  ai: 0x3b82f6,
  software: 0x06b6d4,
  data: 0x8b5cf6,
  cloud: 0x60a5fa,
  security: 0x10b981,
  automation: 0x22d3ee,
  apps: 0xa78bfa,
  infra: 0x6366f1,
  line: 0x1e40af,
  particle: 0x3b82f6
};

// ═══ CENTRAL CORE ═══
const coreGeometry = new THREE.IcosahedronGeometry(2.2, 2);
const coreMaterial = new THREE.MeshBasicMaterial({
  color: colors.core,
  wireframe: true,
  transparent: true,
  opacity: 0.35
});
const core = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(core);

// Core inner glow
const coreInner = new THREE.Mesh(
  new THREE.SphereGeometry(1.6, 16, 16),
  new THREE.MeshBasicMaterial({
    color: colors.core,
    transparent: true,
    opacity: 0.08
  })
);
scene.add(coreInner);

// Core rings
const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 80);
const ring1 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
  color: colors.core, transparent: true, opacity: 0.15
}));
ring1.rotation.x = Math.PI / 3;
scene.add(ring1);

const ring2 = new THREE.Mesh(
  new THREE.TorusGeometry(3.8, 0.015, 16, 80),
  new THREE.MeshBasicMaterial({ color: colors.cloud, transparent: true, opacity: 0.1 })
);
ring2.rotation.x = -Math.PI / 4;
ring2.rotation.y = Math.PI / 6;
scene.add(ring2);


// ═══ DOMAIN NODES ═══
const domains = [
  { name: 'AI', color: colors.ai, angle: 0 },
  { name: 'Software', color: colors.software, angle: Math.PI * 0.25 },
  { name: 'Data', color: colors.data, angle: Math.PI * 0.5 },
  { name: 'Cloud', color: colors.cloud, angle: Math.PI * 0.75 },
  { name: 'Security', color: colors.security, angle: Math.PI },
  { name: 'Automation', color: colors.automation, angle: Math.PI * 1.25 },
  { name: 'Apps', color: colors.apps, angle: Math.PI * 1.5 },
  { name: 'Infra', color: colors.infra, angle: Math.PI * 1.75 }
];

const nodeRadius = isMobile ? 8 : 10;
const nodes = [];
const connections = [];

domains.forEach((domain, i) => {
  const x = Math.cos(domain.angle) * nodeRadius;
  const y = Math.sin(domain.angle) * nodeRadius * 0.6;
  const z = Math.sin(domain.angle + i * 0.3) * 3;

  // Node sphere
  const nodeGeo = new THREE.SphereGeometry(0.6, 12, 12);
  const nodeMat = new THREE.MeshBasicMaterial({
    color: domain.color,
    transparent: true,
    opacity: 0.6
  });
  const node = new THREE.Mesh(nodeGeo, nodeMat);
  node.position.set(x, y, z);
  node.userData = { name: domain.name, baseOpacity: 0.6 };
  scene.add(node);
  nodes.push(node);

  // Node glow ring
  const glowGeo = new THREE.RingGeometry(0.8, 1.0, 20);
  const glowMat = new THREE.MeshBasicMaterial({
    color: domain.color,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.copy(node.position);
  glow.lookAt(camera.position);
  scene.add(glow);

  // Connection line from core to node
  const points = [];
  const segments = 20;
  for (let s = 0; s <= segments; s++) {
    const t = s / segments;
    const px = x * t;
    const py = y * t;
    const pz = z * t;
    // Add subtle curve
    const offset = Math.sin(t * Math.PI) * 1.5;
    points.push(new THREE.Vector3(
      px + offset * Math.sin(domain.angle + Math.PI / 2) * 0.3,
      py + offset * 0.5,
      pz
    ));
  }

  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  const lineMat = new THREE.LineBasicMaterial({
    color: domain.color,
    transparent: true,
    opacity: 0.15
  });
  const line = new THREE.Line(lineGeo, lineMat);
  scene.add(line);
  connections.push({ line, node, domain });
});


// ═══ DATA FLOW PARTICLES ═══
const particleCount = isMobile ? 60 : 150;
const particlePositions = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);
const particleSpeeds = [];
const particlePaths = [];

for (let i = 0; i < particleCount; i++) {
  // Assign each particle to a random connection path
  const pathIndex = Math.floor(Math.random() * domains.length);
  const domain = domains[pathIndex];
  const progress = Math.random();

  const x = Math.cos(domain.angle) * nodeRadius * progress;
  const y = Math.sin(domain.angle) * nodeRadius * 0.6 * progress;
  const z = Math.sin(domain.angle + pathIndex * 0.3) * 3 * progress;

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;

  const color = new THREE.Color(domain.color);
  particleColors[i * 3] = color.r;
  particleColors[i * 3 + 1] = color.g;
  particleColors[i * 3 + 2] = color.b;

  particleSpeeds.push(0.002 + Math.random() * 0.004);
  particlePaths.push({ pathIndex, progress, direction: Math.random() > 0.5 ? 1 : -1 });
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
const particleMat = new THREE.PointsMaterial({
  size: isMobile ? 0.12 : 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ═══ BACKGROUND STAR FIELD ═══
const starCount = isMobile ? 200 : 500;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  starPos[i * 3] = (Math.random() - 0.5) * 120;
  starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
  starPos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const starMat = new THREE.PointsMaterial({
  size: 0.06,
  color: 0x4488cc,
  transparent: true,
  opacity: 0.3,
  blending: THREE.AdditiveBlending
});
scene.add(new THREE.Points(starGeo, starMat));


// ═══ INTERACTION ═══
let mouseX = 0, mouseY = 0;
let targetCamX = 0, targetCamY = 2;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / W - 0.5) * 2;
  mouseY = (e.clientY / H - 0.5) * 2;
  targetCamX = mouseX * 3;
  targetCamY = -mouseY * 2 + 2;
}, { passive: true });

// Touch support for mobile
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    mouseX = (e.touches[0].clientX / W - 0.5) * 2;
    mouseY = (e.touches[0].clientY / H - 0.5) * 2;
    targetCamX = mouseX * 2;
    targetCamY = -mouseY * 1.5 + 2;
  }
}, { passive: true });

// ═══ ANIMATION LOOP ═══
let time = 0;
let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);
  time += 0.005;

  // Core rotation
  core.rotation.y += 0.002;
  core.rotation.x += 0.001;
  coreInner.rotation.y -= 0.001;

  // Ring rotation
  ring1.rotation.z += 0.001;
  ring2.rotation.z -= 0.0008;

  // Node subtle floating
  nodes.forEach((node, i) => {
    const domain = domains[i];
    node.position.y = Math.sin(domain.angle) * nodeRadius * 0.6 +
                      Math.sin(time * 2 + i) * 0.3;
    node.rotation.y += 0.01;
  });

  // Data flow particles
  const pos = particleGeo.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const path = particlePaths[i];
    path.progress += particleSpeeds[i] * path.direction;

    // Loop particles
    if (path.progress > 1) { path.progress = 0; path.direction = 1; }
    if (path.progress < 0) { path.progress = 1; path.direction = -1; }

    const domain = domains[path.pathIndex];
    const t = path.progress;
    pos[i * 3] = Math.cos(domain.angle) * nodeRadius * t;
    pos[i * 3 + 1] = Math.sin(domain.angle) * nodeRadius * 0.6 * t +
                      Math.sin(t * Math.PI) * 1.2;
    pos[i * 3 + 2] = Math.sin(domain.angle + path.pathIndex * 0.3) * 3 * t;
  }
  particleGeo.attributes.position.needsUpdate = true;

  // Camera follow mouse
  camera.position.x += (targetCamX - camera.position.x) * 0.02;
  camera.position.y += (targetCamY - camera.position.y) * 0.02;
  camera.lookAt(0, 0, 0);

  // Connection line pulse
  connections.forEach((conn, i) => {
    const pulse = (Math.sin(time * 3 + i * 0.8) + 1) * 0.5;
    conn.line.material.opacity = 0.08 + pulse * 0.12;
  });

  renderer.render(scene, camera);
}

// Start animation only when visible
const heroSection = document.querySelector('.hero');
let isVisible = true;

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !animationId) animate();
    if (!isVisible && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }, { threshold: 0.1 });
  if (heroSection) observer.observe(heroSection);
}

animate();

// ═══ RESIZE ═══
window.addEventListener('resize', () => {
  W = window.innerWidth;
  H = window.innerHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  renderer.setSize(W, H);
}, { passive: true });

})();
