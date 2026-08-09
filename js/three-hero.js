/**
 * Code Origin.AI — 2026 Digital Engineering Core
 * Advanced 3D visualization with morphing geometry, bloom-like glow,
 * DNA helix data streams, floating holographic panels, and dynamic particles
 */
(function() {
'use strict';

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

const canvas = document.getElementById('hero-3d');
if (!canvas) return;

const isMobile = window.innerWidth < 768;
const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

let W = window.innerWidth;
let H = window.innerHeight;

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0e1a, 0.008);

const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !isMobile,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(W, H);
renderer.setPixelRatio(pixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
camera.position.set(0, 0, isMobile ? 40 : 30);

// Color palette — 2026 neon-dark theme
const colors = {
  primary: 0x2563eb,
  secondary: 0x7c3aed,
  accent: 0x06b6d4,
  neon: 0x00f5ff,
  pink: 0xec4899,
  green: 0x10b981,
  orange: 0xf59e0b,
  white: 0xffffff,
  softBlue: 0x3b82f6,
  deepPurple: 0x6366f1
};

// ═══ CENTRAL CORE — Morphing Icosahedron ═══
const coreGeometry = new THREE.IcosahedronGeometry(2.8, 3);
const corePositions = coreGeometry.attributes.position.array.slice();
const coreMaterial = new THREE.MeshBasicMaterial({
  color: colors.primary,
  wireframe: true,
  transparent: true,
  opacity: 0.25
});
const core = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(core);

// Inner pulsing sphere
const innerGlow = new THREE.Mesh(
  new THREE.SphereGeometry(2.0, 32, 32),
  new THREE.MeshBasicMaterial({
    color: colors.neon,
    transparent: true,
    opacity: 0.06
  })
);
scene.add(innerGlow);

// Second inner layer
const innerGlow2 = new THREE.Mesh(
  new THREE.SphereGeometry(1.4, 24, 24),
  new THREE.MeshBasicMaterial({
    color: colors.primary,
    transparent: true,
    opacity: 0.1
  })
);
scene.add(innerGlow2);

// ═══ ORBITAL RINGS — Multiple animated rings ═══
const rings = [];
const ringConfigs = [
  { radius: 4.0, tube: 0.02, color: colors.primary, opacity: 0.2, rotX: Math.PI / 2.5, rotY: 0 },
  { radius: 5.0, tube: 0.015, color: colors.accent, opacity: 0.15, rotX: -Math.PI / 3, rotY: Math.PI / 4 },
  { radius: 6.0, tube: 0.01, color: colors.secondary, opacity: 0.12, rotX: Math.PI / 4, rotY: -Math.PI / 3 },
  { radius: 7.5, tube: 0.008, color: colors.neon, opacity: 0.08, rotX: -Math.PI / 5, rotY: Math.PI / 6 },
];

ringConfigs.forEach(cfg => {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100),
    new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity })
  );
  ring.rotation.x = cfg.rotX;
  ring.rotation.y = cfg.rotY;
  scene.add(ring);
  rings.push(ring);
});

// ═══ DNA HELIX DATA STREAMS ═══
const helixGroup = new THREE.Group();
const helixPoints1 = [];
const helixPoints2 = [];
const helixConnectors = [];
const helixLength = 80;
const helixRadius = 1.8;

for (let i = 0; i < helixLength; i++) {
  const t = i / helixLength * Math.PI * 4;
  const y = (i - helixLength / 2) * 0.4;
  
  const x1 = Math.cos(t) * helixRadius;
  const z1 = Math.sin(t) * helixRadius;
  const x2 = Math.cos(t + Math.PI) * helixRadius;
  const z2 = Math.sin(t + Math.PI) * helixRadius;
  
  helixPoints1.push(new THREE.Vector3(x1, y, z1));
  helixPoints2.push(new THREE.Vector3(x2, y, z2));
  
  // Connector bars every few segments
  if (i % 4 === 0) {
    const connGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x1, y, z1),
      new THREE.Vector3(x2, y, z2)
    ]);
    const connLine = new THREE.Line(connGeo, new THREE.LineBasicMaterial({
      color: colors.accent, transparent: true, opacity: 0.2
    }));
    helixGroup.add(connLine);
    helixConnectors.push(connLine);
  }
}

const helixCurve1 = new THREE.CatmullRomCurve3(helixPoints1);
const helixCurve2 = new THREE.CatmullRomCurve3(helixPoints2);
const helixGeo1 = new THREE.TubeGeometry(helixCurve1, 100, 0.04, 8, false);
const helixGeo2 = new THREE.TubeGeometry(helixCurve2, 100, 0.04, 8, false);

helixGroup.add(new THREE.Mesh(helixGeo1, new THREE.MeshBasicMaterial({
  color: colors.primary, transparent: true, opacity: 0.3
})));
helixGroup.add(new THREE.Mesh(helixGeo2, new THREE.MeshBasicMaterial({
  color: colors.secondary, transparent: true, opacity: 0.3
})));

helixGroup.position.set(isMobile ? -12 : -16, 0, -5);
helixGroup.rotation.z = 0.3;
scene.add(helixGroup);

// ═══ FLOATING HOLOGRAPHIC NODES ═══
const nodeData = [
  { label: 'AI', color: colors.primary, pos: [8, 5, -3] },
  { label: 'Cloud', color: colors.accent, pos: [-9, -4, -2] },
  { label: 'Security', color: colors.green, pos: [10, -6, -4] },
  { label: 'Data', color: colors.secondary, pos: [-7, 6, -3] },
  { label: 'DevOps', color: colors.orange, pos: [12, 0, -6] },
  { label: 'ML', color: colors.pink, pos: [-11, -1, -5] },
];

const holoNodes = [];
nodeData.forEach(nd => {
  const group = new THREE.Group();
  
  // Outer ring
  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.9, 0.025, 16, 32),
    new THREE.MeshBasicMaterial({ color: nd.color, transparent: true, opacity: 0.4 })
  );
  group.add(outerRing);
  
  // Inner dot
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    new THREE.MeshBasicMaterial({ color: nd.color, transparent: true, opacity: 0.7 })
  );
  group.add(dot);
  
  // Glow sphere
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: nd.color, transparent: true, opacity: 0.08 })
  );
  group.add(glow);
  
  group.position.set(...nd.pos);
  scene.add(group);
  holoNodes.push({ group, color: nd.color, basePos: nd.pos });
  
  // Connection line to core
  const linePoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(nd.pos[0] * 0.3, nd.pos[1] * 0.3, nd.pos[2] * 0.3),
    new THREE.Vector3(...nd.pos)
  ];
  const lineCurve = new THREE.CatmullRomCurve3(linePoints);
  const lineGeo = new THREE.TubeGeometry(lineCurve, 30, 0.01, 4, false);
  const line = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({
    color: nd.color, transparent: true, opacity: 0.12
  }));
  scene.add(line);
});

// ═══ PARTICLE SYSTEM — Volumetric data flow ═══
const particleCount = isMobile ? 300 : 800;
const particlePositions = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);
const particleSizes = new Float32Array(particleCount);
const particleVelocities = [];

const colorOptions = [colors.primary, colors.accent, colors.neon, colors.secondary, colors.softBlue];

for (let i = 0; i < particleCount; i++) {
  // Distribute in a sphere with bias toward the ring areas
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = 5 + Math.random() * 20;
  
  particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  particlePositions[i * 3 + 2] = r * Math.cos(phi) - 5;
  
  const col = new THREE.Color(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
  particleColors[i * 3] = col.r;
  particleColors[i * 3 + 1] = col.g;
  particleColors[i * 3 + 2] = col.b;
  
  particleSizes[i] = 0.03 + Math.random() * 0.08;
  
  particleVelocities.push({
    x: (Math.random() - 0.5) * 0.01,
    y: (Math.random() - 0.5) * 0.01,
    z: (Math.random() - 0.5) * 0.005,
    orbit: Math.random() * 0.002
  });
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMat = new THREE.PointsMaterial({
  size: isMobile ? 0.12 : 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ═══ BACKGROUND NEBULA — Deep space star field ═══
const starCount = isMobile ? 400 : 1200;
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  starPositions[i * 3] = (Math.random() - 0.5) * 200;
  starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
  starPositions[i * 3 + 2] = -20 - Math.random() * 80;
  
  const brightness = 0.3 + Math.random() * 0.7;
  const tint = Math.random();
  if (tint < 0.3) {
    starColors[i * 3] = brightness * 0.6;
    starColors[i * 3 + 1] = brightness * 0.8;
    starColors[i * 3 + 2] = brightness;
  } else if (tint < 0.6) {
    starColors[i * 3] = brightness * 0.8;
    starColors[i * 3 + 1] = brightness * 0.6;
    starColors[i * 3 + 2] = brightness;
  } else {
    starColors[i * 3] = brightness * 0.7;
    starColors[i * 3 + 1] = brightness * 0.9;
    starColors[i * 3 + 2] = brightness;
  }
}

const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
const starMat = new THREE.PointsMaterial({
  size: 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending
});
scene.add(new THREE.Points(starGeo, starMat));

// ═══ GEOMETRIC GRID FLOOR ═══
const gridHelper = new THREE.GridHelper(80, 40, colors.primary, colors.deepPurple);
gridHelper.position.y = -12;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.04;
scene.add(gridHelper);

// ═══ INTERACTION ═══
let mouseX = 0, mouseY = 0;
let targetRotX = 0, targetRotY = 0;
let scrollProgress = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / W - 0.5) * 2;
  mouseY = (e.clientY / H - 0.5) * 2;
  targetRotX = mouseY * 0.3;
  targetRotY = mouseX * 0.5;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    mouseX = (e.touches[0].clientX / W - 0.5) * 2;
    mouseY = (e.touches[0].clientY / H - 0.5) * 2;
    targetRotX = mouseY * 0.2;
    targetRotY = mouseX * 0.3;
  }
}, { passive: true });

window.addEventListener('scroll', () => {
  scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
}, { passive: true });

// ═══ ANIMATION LOOP ═══
let time = 0;
let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);
  time += 0.008;

  // Core morphing — breathe effect
  const positions = coreGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    const ox = corePositions[i];
    const oy = corePositions[i + 1];
    const oz = corePositions[i + 2];
    const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
    const morph = 1 + Math.sin(time * 2 + dist * 1.5) * 0.08;
    positions[i] = ox * morph;
    positions[i + 1] = oy * morph;
    positions[i + 2] = oz * morph;
  }
  coreGeometry.attributes.position.needsUpdate = true;

  // Core rotation
  core.rotation.y += 0.003;
  core.rotation.x = Math.sin(time * 0.5) * 0.1;
  
  // Inner glow pulse
  const pulse = 0.06 + Math.sin(time * 3) * 0.03;
  innerGlow.material.opacity = pulse;
  innerGlow.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
  innerGlow2.rotation.y -= 0.005;

  // Rings animation
  rings.forEach((ring, i) => {
    ring.rotation.z += 0.001 * (i % 2 === 0 ? 1 : -1);
    ring.rotation.x += 0.0005 * (i % 2 === 0 ? -1 : 1);
    ring.material.opacity = ringConfigs[i].opacity + Math.sin(time * 2 + i) * 0.03;
  });

  // DNA Helix rotation
  helixGroup.rotation.y += 0.003;
  helixGroup.position.y = Math.sin(time * 0.5) * 1;

  // Holographic nodes float
  holoNodes.forEach((node, i) => {
    node.group.position.y = node.basePos[1] + Math.sin(time * 1.5 + i * 1.2) * 0.8;
    node.group.position.x = node.basePos[0] + Math.cos(time + i * 0.9) * 0.3;
    node.group.children[0].rotation.z += 0.02;
    node.group.children[0].rotation.x = Math.sin(time + i) * 0.3;
    
    // Pulse glow
    const glowPulse = 0.08 + Math.sin(time * 3 + i * 2) * 0.04;
    node.group.children[2].material.opacity = glowPulse;
  });

  // Particles orbital motion
  const pos = particleGeo.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const vel = particleVelocities[i];
    const idx = i * 3;
    
    // Orbital movement
    const x = pos[idx];
    const z = pos[idx + 2];
    const angle = Math.atan2(z, x) + vel.orbit;
    const radius = Math.sqrt(x * x + z * z);
    
    pos[idx] = Math.cos(angle) * radius + vel.x;
    pos[idx + 1] += vel.y + Math.sin(time + i * 0.1) * 0.002;
    pos[idx + 2] = Math.sin(angle) * radius + vel.z;
    
    // Reset particles that drift too far
    const dist = Math.sqrt(pos[idx] * pos[idx] + pos[idx + 1] * pos[idx + 1] + pos[idx + 2] * pos[idx + 2]);
    if (dist > 35) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 15;
      pos[idx] = r * Math.sin(phi) * Math.cos(theta);
      pos[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[idx + 2] = r * Math.cos(phi) - 5;
    }
  }
  particleGeo.attributes.position.needsUpdate = true;

  // Camera smooth follow + scroll zoom
  const camZ = (isMobile ? 40 : 30) + scrollProgress * 10;
  camera.position.x += (targetRotY * 4 - camera.position.x) * 0.02;
  camera.position.y += (-targetRotX * 3 - camera.position.y) * 0.02;
  camera.position.z += (camZ - camera.position.z) * 0.02;
  camera.lookAt(0, 0, 0);

  // Grid subtle movement
  gridHelper.position.z = Math.sin(time * 0.3) * 2;

  renderer.render(scene, camera);
}

// Start only when hero visible
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
  }, { threshold: 0.05 });
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
