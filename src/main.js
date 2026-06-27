import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';  // not used
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


const stats = new Stats();
document.body.appendChild(stats.dom);


const params = {
  debug: false, 
  range: 0.0, 
  colour: 0x00ffaa,
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const loader = new GLTFLoader();

loader.load(
    'monkey.glb',
    (gltf) => {
        let model = gltf.scene;
        scene.add(model);
const monkey = model.getObjectByName('Monkey');

monkey.material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
    }
);




const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const controls = new OrbitControls( camera, renderer.domElement );

const colorCube = new THREE.Color(params.colour);


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: colorCube, wireframe: false } );
// const material = new THREE.MeshStandardMaterial( { color: 0x00ffaa } );
const cube = new THREE.Mesh( geometry, material );
const light_a = new THREE.AmbientLight(0xffffff, 0.05);
const light_p = new THREE.SpotLight(0xffffff, 100);
light_p.position.x = 8;
light_p.position.y = 5;
light_p.position.z = 5;
light_p.target.position.set(0, 0, 0);
cube.position.set(1, 1, 1);
// light_p.rotation.x = 0.8*Math.PI/2;
const axesHelper = new THREE.AxesHelper(5);
const axesHelper_c = new THREE.AxesHelper(2);
const axesHelper_s = new THREE.AxesHelper(10);
const floorGrid = new THREE.GridHelper(10, 10);

scene.add( cube );
scene.add( light_a );
scene.add( light_p );
light_p.add(axesHelper);
cube.add(axesHelper_c);
scene.add(axesHelper_s);
scene.add(floorGrid);

camera.position.z = 5;
camera.position.y = 2;
camera.position.x = -2;
camera.lookAt(0, 0, 0);

// Create the CSS2D renderer, sized to match your WebGL renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// Create an HTML label
const div = document.createElement('div');
div.textContent = 'Cube vertex';
div.style.color = 'white';
div.style.fontSize = '14px';
div.style.padding = '4px 8px';
div.style.background = 'rgba(0, 0, 0, 0.6)';
div.style.borderRadius = '4px';

// Wrap it in a CSS2DObject and attach to a mesh
const label = new CSS2DObject(div);
label.position.set(0.5, 0.5, 0.5); // offset above the mesh
cube.add(label);

const materialLine = new LineMaterial({
  color: 0xffffff,
  linewidth: 5,
});

const points = [];

points.push(new THREE.Vector3(0.5, 0.5, 0.5));
points.push(new THREE.Vector3(-0.5, 0.5, 0.5));
points.push(new THREE.Vector3(-0.5, -0.5, 0.5));
points.push(new THREE.Vector3(0.5, -0.5, 0.5));
points.push(new THREE.Vector3(0.5, -0.5, -0.5));

const geometryLine = new LineGeometry().setFromPoints(points);
const line = new Line2(geometryLine, materialLine);
cube.add(line);



const gui = new GUI();


gui.add(params, "debug");
const folder = gui.addFolder( 'Position' );
folder.add(params, "range");
folder.addColor(params, "colour");
gui.add(light_p, 'intensity', 0, 500);
gui.open();


console.log(light_p);

function animate( time ) {

  material.color = new THREE.Color(params.colour);
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
  controls.update();
  stats.update();

  renderer.render( scene, camera );
  labelRenderer.render(scene, camera);

}
