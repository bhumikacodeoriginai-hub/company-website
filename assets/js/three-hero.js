/**
 * Code Origin.AI — Premium 3D Hero Animation
 * Three.js Particle System + Floating Geometry
 */
(function() {
  'use strict';
  
  // Check reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const canvas = document.getElementById('hero-3d');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.position.z = 30;
  camera.position.y = 2;

  // === PARTICLE SYSTEM ===
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    
    // Blue to cyan gradient
    const t = Math.random();
    colors[i * 3] = 0.15 + t * 0.1;     // R
    colors[i * 3 + 1] = 0.4 + t * 0.4;  // G
    colors[i * 3 + 2] = 0.9 + t * 0.1;  // B
    
    sizes[i] = Math.random() * 2 + 0.5;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particleMat = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // === FLOATING GEOMETRIC SHAPES ===
  const shapes = [];
  
  // Central icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(3, 1);
  const icoMat = new THREE.MeshBasicMaterial({ 
    color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.3 
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(8, 0, -5);
  scene.add(ico);
  shapes.push({ mesh: ico, rotSpeed: { x: 0.002, y: 0.003, z: 0.001 }, floatSpeed: 0.5, floatAmp: 1 });

  // Torus
  const torusGeo = new THREE.TorusGeometry(2, 0.3, 16, 50);
  const torusMat = new THREE.MeshBasicMaterial({ 
    color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.25 
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(-6, 4, -10);
  scene.add(torus);
  shapes.push({ mesh: torus, rotSpeed: { x: 0.003, y: 0.001, z: 0.002 }, floatSpeed: 0.3, floatAmp: 1.5 });

  // Octahedron
  const octGeo = new THREE.OctahedronGeometry(1.5, 0);
  const octMat = new THREE.MeshBasicMaterial({ 
    color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.3 
  });
  const oct = new THREE.Mesh(octGeo, octMat);
  oct.position.set(12, -3, -8);
  scene.add(oct);
  shapes.push({ mesh: oct, rotSpeed: { x: 0.004, y: 0.002, z: 0.003 }, floatSpeed: 0.7, floatAmp: 0.8 });

  // Ring
  const ringGeo = new THREE.TorusGeometry(4, 0.05, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(8, 0, -5);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);
  shapes.push({ mesh: ring, rotSpeed: { x: 0, y: 0, z: 0.005 }, floatSpeed: 0, floatAmp: 0 });

  // Second ring
  const ring2Geo = new THREE.TorusGeometry(5.5, 0.03, 16, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.1 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.position.set(8, 0, -5);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);
  shapes.push({ mesh: ring2, rotSpeed: { x: 0, y: 0, z: -0.003 }, floatSpeed: 0, floatAmp: 0 });

  // === CONNECTION LINES ===
  const lineGeo = new THREE.BufferGeometry();
  const linePositions = new Float32Array(200 * 6); // 200 lines, 2 points each
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.08 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // === MOUSE INTERACTION ===
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // === ANIMATION LOOP ===
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Rotate particles
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    // Animate shapes
    shapes.forEach((s) => {
      s.mesh.rotation.x += s.rotSpeed.x;
      s.mesh.rotation.y += s.rotSpeed.y;
      s.mesh.rotation.z += s.rotSpeed.z;
      if (s.floatAmp > 0) {
        s.mesh.position.y += Math.sin(time * s.floatSpeed) * 0.01 * s.floatAmp;
      }
    });

    // Mouse parallax
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.5 + 2 - camera.position.y) * 0.02;
    camera.lookAt(5, 0, -5);

    // Update connections (find nearby particles)
    const pos = particleGeo.attributes.position.array;
    let lineIndex = 0;
    const maxLines = 200;
    const threshold = 8;
    
    for (let i = 0; i < particleCount && lineIndex < maxLines; i += 20) {
      for (let j = i + 20; j < particleCount && lineIndex < maxLines; j += 20) {
        const dx = pos[i*3] - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < threshold) {
          linePositions[lineIndex * 6] = pos[i*3];
          linePositions[lineIndex * 6 + 1] = pos[i*3+1];
          linePositions[lineIndex * 6 + 2] = pos[i*3+2];
          linePositions[lineIndex * 6 + 3] = pos[j*3];
          linePositions[lineIndex * 6 + 4] = pos[j*3+1];
          linePositions[lineIndex * 6 + 5] = pos[j*3+2];
          lineIndex++;
        }
      }
    }
    lineGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
