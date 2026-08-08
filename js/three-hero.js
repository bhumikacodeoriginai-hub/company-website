/**
 * Code Origin.AI — Ambient Hero Background
 * 
 * A restrained, barely-noticeable particle field that provides
 * subtle depth and movement without competing with content.
 * 
 * This is NOT the focal point of the hero. The content is.
 * The 3D serves only as a premium ambient texture.
 */
(function () {
'use strict';

// Respect user preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

const canvas = document.getElementById('hero-3d');
if (!canvas) return;

// Check WebGL support
try {
  const tc = document.createElement('canvas');
  if (!tc.getContext('webgl') && !tc.getContext('experimental-webgl')) return;
} catch (e) { return; }

// Skip on low-power mobile
const isMobile = window.innerWidth < 768;
const memory = navigator.deviceMemory || 4;
const cores = navigator.hardwareConcurrency || 4;
if (isMobile && (memory <= 2 || cores <= 2)) return;

// ─── Configuration (intentionally minimal) ───
const PARTICLE_COUNT = isMobile ? 300 : 800;
const DPR = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);

// ─── Setup ───
let W = canvas.clientWidth || window.innerWidth;
let H = canvas.clientHeight || window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
renderer.setSize(W, H);
renderer.setPixelRatio(DPR);
camera.position.z = 40;

// ─── Particle field ───
const positions = new Float32Array(PARTICLE_COUNT * 3);
const opacities = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 100;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
  opacities[i] = Math.random() * 0.4 + 0.1;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 1.2,
  color: 0x4a7ccc,
  transparent: true,
  opacity: 0.25,
  sizeAttenuation: true
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// ─── Very subtle mouse parallax ───
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', function (e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
}, { passive: true });

// ─── Animation (very slow drift) ───
let isVisible = true;
let animId = null;

const observer = new IntersectionObserver(function (entries) {
  isVisible = entries[0].isIntersecting;
  if (isVisible && !animId) animate();
}, { threshold: 0.05 });
observer.observe(canvas);

function animate() {
  if (!isVisible) { animId = null; return; }
  animId = requestAnimationFrame(animate);

  // Extremely slow rotation — barely perceptible
  particles.rotation.y += 0.00008;
  particles.rotation.x += 0.00003;

  // Subtle camera shift following mouse
  camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.01;
  camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.01;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

// ─── Resize ───
let resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }, 200);
}, { passive: true });

})();
