import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';


// MATERIALS  {{{
const normalMaterial = new THREE.MeshNormalMaterial();
// const normalMaterial = new THREE.MeshPhongMaterial({
//     color: 0x8844aa
// });
const phongMaterial = new THREE.MeshPhongMaterial({
    color: 0x44aa88
});

let importedMaterial;

// }}}

const params = {
  debug: false, 
  range: 0.0, 
  colour: 0xa7abb9,
  unfold: 0,
  light1Angle: 25,
  restore: () => { camera.position.set(1, 3, -6); },
  material: "Imported",
}
const scene = new THREE.Scene();
scene.background = new THREE.Color(params.colour);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const stats = new Stats();
const renderer = new THREE.WebGLRenderer({  antialias: true });
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
document.body.appendChild(stats.dom);


let mixer;
let action;
let clip;
let model;
// let mesh //= model //.children[0] //.children[0];



loader.load(
    'unwrap2.glb',
    (gltf) => {
        model = gltf.scene;
        // mesh = 2
        scene.add(model);
        importedMaterial = model.children[0].children[0].material;
        
        clip = gltf.animations[0];
        mixer = new THREE.AnimationMixer(model);
        action = mixer.clipAction(clip);
        action.play();
        action.paused = true;

    }
);


const light = new THREE.SpotLight(0xffffff, 100);
const light2 = new THREE.SpotLight(0xffffff, 100);
const axesHelper = new THREE.AxesHelper(10);
const floorGrid = new THREE.GridHelper(10, 10);
const lightHelper = new THREE.SpotLightHelper(light);
const lightHelper2 = new THREE.SpotLightHelper(light2, 0xffaaaa);
light.position.set(8, 5, 5);
light.angle = params.light1Angle / 180 * Math.PI;
light.distance = 30;
light.penumbra = 1;
light.target.position.set(0, 0, 0);
light2.position.set(-8, 5, -5);
light2.angle = Math.PI/10;
light2.distance = 30;
light2.penumbra = 1;
light2.target.position.set(0, 0, 0);
floorGrid.visible = false;
axesHelper.visible = false;
lightHelper.visible = false;
lightHelper2.visible = false;
lightHelper.update();
lightHelper2.update();
camera.position.set(1, 3, -6);
camera.lookAt(0, 0, 0);

scene.add(light);
scene.add(light2);
light.add(lightHelper);
light2.add(lightHelper2);
scene.add(axesHelper);
scene.add(floorGrid);

const gui = new GUI();

gui.add(params, 'unfold', 0, 1, 0.001)
  .onChange((val) => {
    action.time = val * clip.duration;
    mixer.update(0);
  });
const fView = gui.addFolder('View').close();
const fLights = gui.addFolder('Lights').close();
const fLight1 = fLights.addFolder('Light 1').close();
const fLight2 = fLights.addFolder('Light 2').close();
const fCamera = gui.addFolder('Camera').close();
const fMaterial = gui.addFolder("Material").open();


fView.add(floorGrid, "visible").name("Grid");
fView.add(axesHelper, "visible").name("Axes");
fView.addColor(params, "colour").name("background").onChange(value => {scene.background.set(value);});

fLight1.add(lightHelper, "visible").name("Display");
fLight1.add(light, 'intensity', 0, 500);
fLight1.add(light, 'penumbra', 0, 1, 0.01);
fLight1.add(params, "light1Angle", 5, 45, 1).name("Angle")
  .onChange(v => {
    light.angle = Math.PI * v / 180;
    lightHelper.update();
  });

fLight2.add(lightHelper2, "visible").name("Display");
fLight2.add(light2, 'intensity', 0, 500);
fLight2.add(light2, 'penumbra', 0, 1, 0.01);
fLight2.add(params, "light1Angle", 5, 45, 1).name("Angle")
  .onChange(v => {
    light2.angle = Math.PI * v / 180;
    lightHelper2.update();
  });

fCamera.add(camera.position, "x", -20, 20, 0.1).listen();
fCamera.add(camera.position, "y", -20, 20, 0.1).listen();
fCamera.add(camera.position, "z", -20, 20, 0.1).listen();
fCamera.add(camera.rotation, "x", -20, 20, 0.1).listen();
fCamera.add(camera.rotation, "y", -20, 20, 0.1).listen();
fCamera.add(camera.rotation, "z", -20, 20, 0.1).listen();

fMaterial.add(params, "material", ["Imported", "Internal", "Phong"]).onChange(updateMaterial);

// const fTests = gui.addFolder( 'Tests' );
// fTests.close();
// fTests.add(params, "debug");
// fTests.add(params, "range");
// fTests.addColor(params, "colour");
// fTests.add(light, 'intensity', 0, 500);


gui.add(params, "restore").name("Restore");
gui.open();
// gui.close();

function animate( time ) {
  controls.update();
  stats.update();
  renderer.render( scene, camera );
}


function updateMaterial(name) {
  // m = model.children[0].children[0] //.material
  let m = model.children[0].children[0] //.material
  console.log(m);
  switch (name) {

    case 'Imported':
      m.material = importedMaterial;
      break;

    case 'Internal':
      m.material = normalMaterial;
      break;

    case 'Phong':
      m.material = phongMaterial;
      break;

  }
}
