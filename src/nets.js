// IMPORTS {{{
import * as THREE from 'three';
import { setModel, update, setScrub, setMaterial, getState, getRendererState } from './modelController.js';
import { MODELS } from './modelCatalog.js';
import { createInspector, updateInspector } from './inspector.js';
import { createGUI } from './gui.js';
import { materials } from './materials.js';
import { createLights } from './lights.js';
import { createLightController } from './lightController.js';
import { createViewController } from './viewController.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
// }}}

const params = { // {{{
    model: 'unwrap',
    material: 'Imported',
    unfold: 0,

    onModelChange: (name) => {
        setModel(MODELS[name], scene);
    },
  backgroundColour: 0x292929,
  grid: false,
  axes: false,
  inspectorDisplay: true,
  statsDisplay: true,
}; // }}}
const lightParams = { // {{{

  key: {
    intensity: 100,
    angle: 25,
    penumbra: 1,
    helper: false,
  },

  fill: {
    intensity: 100,
    angle: 18,
    penumbra: 1,
    helper: false,
  },

}; // }}}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const stats = new Stats();
const renderer = new THREE.WebGLRenderer({  antialias: true });
const controls = new OrbitControls( camera, renderer.domElement );
const clock = new THREE.Clock();


const axesHelper = new THREE.AxesHelper(10);
const floorGrid = new THREE.GridHelper(10, 10);
floorGrid.visible = false;
axesHelper.visible = false;
scene.add(axesHelper);
scene.add(floorGrid);
// SCENE {{{

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
document.body.appendChild(stats.dom);



camera.position.set(1, 3, -6);
camera.lookAt(0, 0, 0);


// }}}


const view = createViewController(
    scene,
    floorGrid,
    axesHelper
);


view.setBackground(params.backgroundColour);

const lights = createLights(scene);
const lightController = createLightController(lights);
const inspector = createInspector();




init();

const gui = createGUI({ // {{{
  params, 
  materials, 
  models: MODELS, 
  view,
  inspector,
  stats,
  lightController,

  lightParams,
  setMaterial,
  setScrub,
}); // }}}

function animate( time ) { // {{{
  controls.update();
  stats.update();
  renderer.render( scene, camera );
  const delta = clock.getDelta();
  update(delta);
  updateInspector({
    ...getState(),
    ...getRendererState(renderer),
  });
} // }}}
async function init() { // {{{
  await setModel(MODELS.unwrap, scene);
  // await setModel(MODELS.monkey, scene);
} // }}}
