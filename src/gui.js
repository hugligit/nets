import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { setMaterial, setScrub } from './modelController.js';

export function createGUI(params, materials, models) { // {{{

  const materialOptions = Object.fromEntries(
    Object.keys(materials).map(k => [k, k])
  );

  const gui = new GUI();

  // MODEL SWITCH
  gui.add(params, 'model', Object.keys(models))
    .onChange(name => params.onModelChange(name));

  // MATERIAL
  // gui.add(params, 'material', ['Imported', 'Internal', 'Phong'])
  gui.add(params, 'material', { Imported: 'Imported', ...materialOptions })
    .onChange(setMaterial);

  // SCRUB
  gui.add(params, 'unfold', 0, 1, 0.001)
    .onChange(setScrub);

  return gui;
} // }}}
