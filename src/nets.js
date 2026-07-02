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
import { createViewSystem } from './viewSystem.js';
// }}}

// APP {{{
const app = createAppCore();

// const {
//   scene,
//   camera,
//   renderer,
//   controls,
//   clock,
//   stats
// } = app; 

// }}}

const lights = createLights(app.scene);
const inspector = createInspector();
const lightController = createLightController(lights);
const view = createViewSystem(app.scene);
const gui = createGUI({ // {{{
  materials, 
  models: MODELS, 
  view,
  inspector,
  stats: app.stats,
  lightController,

  setMaterial,
  setScrub,
  lightParams: { // {{{
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
  }, // }}}
  params: { // {{{
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
  }, // }}}
}); // }}}

init();

async function init() { // {{{
  await setModel(MODELS.unwrap, app.scene);
  // await setModel(MODELS.monkey, scene);

  app.renderer.setAnimationLoop(() => {
    app.controls.update();
    app.stats.update();
    const delta = app.clock.getDelta();
    update(delta);
    app.renderer.render( app.scene, app.camera );
    updateInspector({
      ...getState(),
      ...getRendererState(app.renderer),
    });
  });
} // }}}
