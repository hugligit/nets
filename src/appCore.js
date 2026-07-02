import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

export function createAppCore(container = document.body) {

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  const clock = new THREE.Clock();
  const stats = new Stats();

  container.appendChild(renderer.domElement);
  container.appendChild(stats.dom);

  camera.position.set(1, 3, -6);
  camera.lookAt(0, 0, 0);

  return {
    scene,
    camera,
    renderer,
    controls,
    clock,
    stats
  };
}
