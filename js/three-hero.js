/**
 * Code Origin.AI — 3D Hero Scene
 * Three.js particle field + floating geometry + mouse parallax
 */
(function(){
'use strict';
if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const canvas=document.getElementById('hero-3d');
if(!canvas)return;

const W=window.innerWidth,H=window.innerHeight;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setSize(W,H);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
camera.position.z=30;camera.position.y=2;

// Particles
const N=2500;
const pos=new Float32Array(N*3),col=new Float32Array(N*3);
for(let i=0;i<N;i++){
  pos[i*3]=(Math.random()-.5)*100;
  pos[i*3+1]=(Math.random()-.5)*100;
  pos[i*3+2]=(Math.random()-.5)*100;
  const t=Math.random();
  col[i*3]=.15+t*.1;col[i*3+1]=.4+t*.4;col[i*3+2]=.85+t*.15;
}
const pGeo=new THREE.BufferGeometry();
pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
pGeo.setAttribute('color',new THREE.BufferAttribute(col,3));
const pMat=new THREE.PointsMaterial({size:.12,vertexColors:true,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,sizeAttenuation:true});
const particles=new THREE.Points(pGeo,pMat);
scene.add(particles);

// Shapes
const shapes=[];
function addShape(geo,color,pos3,scale){
  const mat=new THREE.MeshBasicMaterial({color,wireframe:true,transparent:true,opacity:.25});
  const mesh=new THREE.Mesh(geo,mat);
  mesh.position.set(...pos3);
  if(scale)mesh.scale.setScalar(scale);
  scene.add(mesh);
  shapes.push(mesh);
  return mesh;
}
addShape(new THREE.IcosahedronGeometry(3.5,1),0x3b82f6,[10,0,-8]);
addShape(new THREE.TorusGeometry(2.5,.25,16,60),0x06b6d4,[-8,5,-12]);
addShape(new THREE.OctahedronGeometry(2,0),0x8b5cf6,[14,-4,-10]);
addShape(new THREE.TorusKnotGeometry(1.5,.4,64,16),0x3b82f6,[-12,-3,-6],.7);
// Orbital rings
const ring1=addShape(new THREE.TorusGeometry(5,.04,16,100),0x3b82f6,[10,0,-8]);
ring1.material.opacity=.12;ring1.rotation.x=Math.PI/3;
const ring2=addShape(new THREE.TorusGeometry(7,.03,16,100),0x06b6d4,[10,0,-8]);
ring2.material.opacity=.08;ring2.rotation.x=-Math.PI/4;ring2.rotation.y=Math.PI/6;

// Lines
const linePos=new Float32Array(300*6);
const lineGeo=new THREE.BufferGeometry();
lineGeo.setAttribute('position',new THREE.BufferAttribute(linePos,3));
const lineMat=new THREE.LineBasicMaterial({color:0x3b82f6,transparent:true,opacity:.06});
scene.add(new THREE.LineSegments(lineGeo,lineMat));

let mx=0,my=0;
document.addEventListener('mousemove',e=>{mx=(e.clientX/W-.5)*2;my=(e.clientY/H-.5)*2});

let t=0;
function animate(){
  requestAnimationFrame(animate);
  t+=.003;
  particles.rotation.y+=.0002;particles.rotation.x+=.0001;
  shapes.forEach((s,i)=>{
    s.rotation.x+=.002+i*.0005;
    s.rotation.y+=.001+i*.0003;
    s.rotation.z+=.0005;
  });
  camera.position.x+=(mx*3-camera.position.x)*.015;
  camera.position.y+=(-my*2+2-camera.position.y)*.015;
  camera.lookAt(5,0,-5);
  // Update lines
  let li=0;const p=pGeo.attributes.position.array;
  for(let i=0;i<N&&li<300;i+=25){
    for(let j=i+25;j<N&&li<300;j+=25){
      const dx=p[i*3]-p[j*3],dy=p[i*3+1]-p[j*3+1],dz=p[i*3+2]-p[j*3+2];
      if(dx*dx+dy*dy+dz*dz<64){
        linePos[li*6]=p[i*3];linePos[li*6+1]=p[i*3+1];linePos[li*6+2]=p[i*3+2];
        linePos[li*6+3]=p[j*3];linePos[li*6+4]=p[j*3+1];linePos[li*6+5]=p[j*3+2];
        li++;
      }
    }
  }
  lineGeo.attributes.position.needsUpdate=true;
  renderer.render(scene,camera);
}
animate();

window.addEventListener('resize',()=>{
  const w=window.innerWidth,h=window.innerHeight;
  camera.aspect=w/h;camera.updateProjectionMatrix();
  renderer.setSize(w,h);
});
})();
