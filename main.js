import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GUI } from 'dat.gui'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.getElementById('webgl');

// Scene
export const scene = new THREE.Scene();

//Sphere
const material = new THREE.MeshBasicMaterial();
const geometry = new THREE.SphereGeometry(1, 32, 32);
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 6;
camera.lookAt(sphere.position);
scene.add(camera);

// Texture
const loader = new THREE.TextureLoader();
loader.load('/earth.jpeg', (texture) => {
  sphere.material.map = texture
  sphere.material.needsUpdate = true
});

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new TransformControls(camera, renderer.domElement);
controls.attach(sphere)
controls.mode = 'rotate'
scene.add(controls)

// GUI
const gui = new GUI(); // Move the creation of gui above
const rotation = gui.addFolder('Rotation');
rotation.add(sphere.rotation, 'x', -Math.PI, Math.PI);
rotation.add(sphere.rotation, 'y', -Math.PI, Math.PI);
rotation.add(sphere.rotation, 'z', -Math.PI, Math.PI);
rotation.open();

// Update GUI rotation values when the sphere is rotated
controls.addEventListener('change', () => {
  gui.__folders.Rotation.__controllers.forEach((controller) => controller.updateDisplay())
});


// Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

function animate() {
  requestAnimationFrame(animate);


  // Render the scenes
  renderer.render(scene, camera);
}

animate();
