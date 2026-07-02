// IMPORTS {{{
import * as THREE from 'three';
import { createAppCore } from './appCore.js';
import { setModel, update, setScrub, setMaterial, getState, getRendererState } from './modelController.js';
import { MODELS } from './modelCatalog.js';
import { createInspector, updateInspector } from './inspector.js';
import { createGUI } from './gui.js';
import { materials } from './materials.js';
import { createLights } from './lights.js';
import { createLightController } from './lightController.js';
import { createViewController } from './viewController.js';

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import Stats from 'three/addons/libs/stats.module.js';
// }}}

// APP {{{
const app = createAppCore();
const {
  scene,
  camera,
  renderer,
  controls,
  clock,
  stats
} = app; // }}}

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


// SCENE {{{
const axesHelper = new THREE.AxesHelper(10);
const floorGrid = new THREE.GridHelper(10, 10);
floorGrid.visible = false;
axesHelper.visible = false;
scene.add(axesHelper);
scene.add(floorGrid);

// }}}

const lights = createLights(scene);
const inspector = createInspector();
const lightController = createLightController(lights);
const view = createViewController(scene, floorGrid, axesHelper);

view.setBackground(0x292929);

const gui = createGUI({ // {{{
  materials, 
  models: MODELS, 
  view,
  inspector,
  stats,
  lightController,

  lightParams,
  setMaterial,
  setScrub,
  params: {
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
  }, 
}); // }}}

init();

async function init() { // {{{
  await setModel(MODELS.unwrap, scene);
  // await setModel(MODELS.monkey, scene);

  renderer.setAnimationLoop(() => {
    controls.update();
    stats.update();
    const delta = clock.getDelta();
    update(delta);
    renderer.render( scene, camera );
    updateInspector({
      ...getState(),
      ...getRendererState(renderer),
    });
  });
} // }}}
