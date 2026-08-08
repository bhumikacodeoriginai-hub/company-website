/**
 * Code Origin.AI — Premium 3D Hero
 * Refined AI Core: wireframe icosahedron + sparse orbiting nodes +
 * connection lines + ambient particles. Impressive but restrained.
 */
(function () {
'use strict';
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
const canvas = document.getElementById('hero-3d');
if (!canvas) return;

// WebGL check
try { const c = document.createElement('canvas'); if (!c.getContext('webgl') && !c.getContext('experimental-webgl')) return; } catch(e) { return; }

const isMobile = window.innerWidth < 768;
const mem = navigator.deviceMemory || 4;
if (isMobile && mem <= 2) return;

const PARTICLES = isMobile ? 500 : 1200;
const NODES = isMobile ? 4 : 6;
const DPR = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);

let W = canvas.clientWidth || window.innerWidth;
let H = canvas.clientHeight || window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, W/H, 0.1, 800);
const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:!isMobile});
renderer.setSize(W, H); renderer.setPixelRatio(DPR);
camera.position.set(0, 2, 32);

// Mouse
let mx=0, my=0, tmx=0, tmy=0;
document.addEventListener('mousemove', e => {
  tmx = (e.clientX/window.innerWidth - 0.5)*2;
  tmy = (e.clientY/window.innerHeight - 0.5)*2;
}, {passive:true});


// ─── AI CORE ───
const coreGeo = new THREE.IcosahedronGeometry(3, 2);
const coreMat = new THREE.MeshBasicMaterial({color:0x3b82f6, wireframe:true, transparent:true, opacity:0.3});
const core = new THREE.Mesh(coreGeo, coreMat);
core.position.set(8, 0, -5);
scene.add(core);

// Inner
const innerGeo = new THREE.IcosahedronGeometry(1.6, 1);
const innerMat = new THREE.MeshBasicMaterial({color:0x06b6d4, wireframe:true, transparent:true, opacity:0.15});
const inner = new THREE.Mesh(innerGeo, innerMat);
inner.position.copy(core.position);
scene.add(inner);

// Glow
const gc = document.createElement('canvas'); gc.width=gc.height=128;
const gctx = gc.getContext('2d');
const gg = gctx.createRadialGradient(64,64,0,64,64,64);
gg.addColorStop(0,'rgba(59,130,246,0.5)'); gg.addColorStop(0.4,'rgba(6,182,212,0.2)');
gg.addColorStop(1,'rgba(0,0,0,0)');
gctx.fillStyle=gg; gctx.fillRect(0,0,128,128);
const glowTex = new THREE.CanvasTexture(gc);
const glow = new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex, transparent:true, opacity:0.35, blending:THREE.AdditiveBlending}));
glow.position.copy(core.position); glow.scale.set(10,10,1);
scene.add(glow);

// ─── ORBITING NODES ───
const nodes = [];
const colors = [0x3b82f6, 0x06b6d4, 0x8b5cf6, 0x22d3ee, 0x60a5fa, 0xa78bfa];
for (let i=0; i<NODES; i++) {
  const a = (i/NODES)*Math.PI*2;
  const r = 7 + Math.random()*2.5;
  const y = (Math.random()-0.5)*5;
  const geo = new THREE.OctahedronGeometry(0.4+Math.random()*0.25, 0);
  const mat = new THREE.MeshBasicMaterial({color:colors[i%6], wireframe:true, transparent:true, opacity:0.45});
  const m = new THREE.Mesh(geo, mat);
  m.position.set(core.position.x+Math.cos(a)*r, core.position.y+y, core.position.z+Math.sin(a)*r);
  scene.add(m);
  nodes.push({mesh:m, angle:a, radius:r, yOff:y, speed:0.12+Math.random()*0.08});
}

// Node connection lines
const nlPos = new Float32Array(NODES*6);
const nlGeo = new THREE.BufferGeometry();
nlGeo.setAttribute('position', new THREE.BufferAttribute(nlPos, 3));
scene.add(new THREE.LineSegments(nlGeo, new THREE.LineBasicMaterial({color:0x3b82f6, transparent:true, opacity:0.12})));


// ─── PARTICLES ───
const pPos = new Float32Array(PARTICLES*3);
const pCol = new Float32Array(PARTICLES*3);
for (let i=0; i<PARTICLES; i++) {
  pPos[i*3]=(Math.random()-.5)*110;
  pPos[i*3+1]=(Math.random()-.5)*70;
  pPos[i*3+2]=(Math.random()-.5)*90;
  const t=Math.random();
  if(t<0.5){pCol[i*3]=0.23;pCol[i*3+1]=0.51;pCol[i*3+2]=0.96;}
  else if(t<0.8){pCol[i*3]=0.02;pCol[i*3+1]=0.71;pCol[i*3+2]=0.83;}
  else{pCol[i*3]=0.55;pCol[i*3+1]=0.36;pCol[i*3+2]=0.96;}
}
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
  size:0.1, vertexColors:true, transparent:true, opacity:0.45,
  blending:THREE.AdditiveBlending, sizeAttenuation:true
}));
scene.add(particles);

// ─── RING ───
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(5.5, 0.025, 16, 100),
  new THREE.MeshBasicMaterial({color:0x3b82f6, transparent:true, opacity:0.1})
);
ring.position.copy(core.position);
ring.rotation.x = Math.PI/3;
scene.add(ring);

// ─── ANIMATE ───
let time=0, visible=true, raf=null;
const obs = new IntersectionObserver(e => {
  visible = e[0].isIntersecting;
  if (visible && !raf) animate();
}, {threshold:0.05});
obs.observe(canvas);

function animate() {
  if (!visible) { raf=null; return; }
  raf = requestAnimationFrame(animate);
  time += 0.004;

  mx += (tmx-mx)*0.015;
  my += (tmy-my)*0.015;
  camera.position.x = mx*2;
  camera.position.y = 2 - my*1.2;
  camera.lookAt(5, 0, -5);

  core.rotation.x = time*0.3;
  core.rotation.y = time*0.45;
  inner.rotation.x = -time*0.4;
  inner.rotation.y = -time*0.3;
  glow.material.opacity = 0.3 + Math.sin(time*2)*0.08;
  ring.rotation.z += 0.002;

  particles.rotation.y += 0.00012;

  for (let i=0; i<nodes.length; i++) {
    const n = nodes[i];
    n.angle += n.speed*0.007;
    n.mesh.position.x = core.position.x + Math.cos(n.angle)*n.radius;
    n.mesh.position.z = core.position.z + Math.sin(n.angle)*n.radius;
    n.mesh.position.y = core.position.y + n.yOff + Math.sin(time+i)*0.4;
    n.mesh.rotation.x += 0.01; n.mesh.rotation.y += 0.012;
    nlPos[i*6]=n.mesh.position.x; nlPos[i*6+1]=n.mesh.position.y; nlPos[i*6+2]=n.mesh.position.z;
    nlPos[i*6+3]=core.position.x; nlPos[i*6+4]=core.position.y; nlPos[i*6+5]=core.position.z;
  }
  nlGeo.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  W = canvas.clientWidth||window.innerWidth;
  H = canvas.clientHeight||window.innerHeight;
  camera.aspect=W/H; camera.updateProjectionMatrix();
  renderer.setSize(W,H);
}, {passive:true});
})();
