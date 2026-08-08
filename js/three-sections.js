/**
 * Code Origin.AI — 3D Section Scenes
 * Lightweight 3D visualizations for page sections and sub-pages
 * Capabilities Ecosystem, Page Hero backgrounds, CTA horizon
 * Performance-first: only initializes visible canvases, pauses off-screen
 */
(function () {
'use strict';

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

// Check WebGL support
try {
  const tc = document.createElement('canvas');
  const gl = tc.getContext('webgl') || tc.getContext('experimental-webgl');
  if (!gl) return;
} catch (e) { return; }

const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isLowPower = (navigator.deviceMemory || 4) <= 2 || (navigator.hardwareConcurrency || 4) <= 2;
if (isMobile && isLowPower) return;

const scenes = [];


// ═══ ECOSYSTEM VISUALIZATION ═══
function initEcosystem() {
  const container = document.getElementById('ecosystem-3d');
  if (!container) return;

  const w = container.clientWidth;
  const h = container.clientHeight;
  if (w === 0 || h === 0) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;border-radius:inherit';
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
  camera.position.set(0, 0, 25);

  // Central node
  const centerGeo = new THREE.IcosahedronGeometry(2, 1);
  const centerMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.4 });
  const center = new THREE.Mesh(centerGeo, centerMat);
  scene.add(center);

  // Glow for center
  const glowGeo = new THREE.SphereGeometry(2.5, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.05 });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);

  // Capability nodes
  const capNames = ['AI', 'Software', 'Cloud', 'Security', 'Data', 'Automation'];
  const capColors = [0x3b82f6, 0x06b6d4, 0x8b5cf6, 0x22d3ee, 0x60a5fa, 0xa78bfa];
  const capNodes = [];
  const nodeCount = isMobile ? 4 : 6;

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 9;
    const geo = new THREE.OctahedronGeometry(0.7, 0);
    const mat = new THREE.MeshBasicMaterial({ color: capColors[i], wireframe: true, transparent: true, opacity: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, 0);
    scene.add(mesh);
    capNodes.push({ mesh, angle, radius, baseY: mesh.position.y });
  }


  // Connection lines from nodes to center
  const linePositions = new Float32Array(nodeCount * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15 });
  const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(linesMesh);

  // Orbit ring
  const orbitGeo = new THREE.TorusGeometry(9, 0.02, 8, 100);
  const orbitMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.08 });
  const orbit = new THREE.Mesh(orbitGeo, orbitMat);
  orbit.rotation.x = Math.PI / 2.5;
  scene.add(orbit);

  // Particles around ecosystem
  const pCount = isMobile ? 100 : 300;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 40;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 25;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.08, color: 0x60a5fa, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
  scene.add(new THREE.Points(pGeo, pMat));

  let time = 0;
  let visible = false;

  const entry = {
    container, renderer, animate: function () {
      if (!visible) return;
      requestAnimationFrame(entry.animate);
      time += 0.005;

      center.rotation.x = time * 0.3;
      center.rotation.y = time * 0.5;

      for (let i = 0; i < capNodes.length; i++) {
        const n = capNodes[i];
        n.angle += 0.003;
        n.mesh.position.x = Math.cos(n.angle) * n.radius;
        n.mesh.position.y = Math.sin(n.angle) * n.radius * 0.6 + Math.sin(time + i) * 0.3;
        n.mesh.rotation.x += 0.01;
        n.mesh.rotation.y += 0.015;

        linePositions[i * 6] = n.mesh.position.x;
        linePositions[i * 6 + 1] = n.mesh.position.y;
        linePositions[i * 6 + 2] = n.mesh.position.z;
        linePositions[i * 6 + 3] = 0;
        linePositions[i * 6 + 4] = 0;
        linePositions[i * 6 + 5] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;
      orbit.rotation.z = time * 0.1;

      renderer.render(scene, camera);
    },
    resize: function () {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
  };

  // Observe visibility
  const obs = new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible) entry.animate();
  }, { threshold: 0.1 });
  obs.observe(container);
  scenes.push(entry);
}


// ═══ PAGE HERO BACKGROUND (Subtle particles for sub-pages) ═══
function initPageHeroBg() {
  const container = document.querySelector('.page-hero-canvas');
  if (!container) return;

  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || 400;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0';
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(w, h);
  renderer.setPixelRatio(1);
  camera.position.z = 30;

  // Sparse particle field
  const count = isMobile ? 200 : 500;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 80;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ size: 0.1, color: 0x3b82f6, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Subtle wireframe shape
  const shapeGeo = new THREE.IcosahedronGeometry(5, 1);
  const shapeMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.06 });
  const shape = new THREE.Mesh(shapeGeo, shapeMat);
  shape.position.set(15, 0, -10);
  scene.add(shape);

  let time = 0;
  let visible = false;

  const entry = {
    container, renderer, animate: function () {
      if (!visible) return;
      requestAnimationFrame(entry.animate);
      time += 0.003;
      points.rotation.y += 0.0002;
      shape.rotation.x = time * 0.2;
      shape.rotation.y = time * 0.3;
      renderer.render(scene, camera);
    },
    resize: function () {
      const nw = container.clientWidth || window.innerWidth;
      const nh = container.clientHeight || 400;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
  };

  const obs = new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible) entry.animate();
  }, { threshold: 0.1 });
  obs.observe(container);
  scenes.push(entry);
}


// ═══ CTA HORIZON (Minimal forward-moving particle field) ═══
function initCTAHorizon() {
  const container = document.querySelector('.cta-canvas');
  if (!container) return;

  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || 300;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0';
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(w, h);
  renderer.setPixelRatio(1);
  camera.position.set(0, 0, 10);

  const count = isMobile ? 100 : 250;
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = Math.random() * -50;
    vel[i] = 0.02 + Math.random() * 0.05;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ size: 0.12, color: 0x60a5fa, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  let visible = false;
  const entry = {
    container, renderer, animate: function () {
      if (!visible) return;
      requestAnimationFrame(entry.animate);
      const arr = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 2] += vel[i];
        if (arr[i * 3 + 2] > 10) {
          arr[i * 3] = (Math.random() - 0.5) * 40;
          arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
          arr[i * 3 + 2] = -50;
        }
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    },
    resize: function () {
      const nw = container.clientWidth || window.innerWidth;
      const nh = container.clientHeight || 300;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
  };

  const obs = new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible) entry.animate();
  }, { threshold: 0.1 });
  obs.observe(container);
  scenes.push(entry);
}


// ═══ INITIALIZATION ═══
function init() {
  initEcosystem();
  initPageHeroBg();
  initCTAHorizon();
}

// Debounced resize for all scenes
let resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    scenes.forEach(function (s) { if (s.resize) s.resize(); });
  }, 200);
}, { passive: true });

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
