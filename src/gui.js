import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import { setMaterial, setScrub } from './modelController.js';

export function createGUI({ // {{{
  params, 
  materials, 
  models,
  view,
  inspector,
  stats,
  lightController,

  lightParams,
  setMaterial,
  setScrub,

}) { 


  const gui = new GUI();
  gui.open();

  // MODEL {{{
  const fModel = gui.addFolder('Model').open();
  fModel.add(params, 'model', Object.keys(models))
    .onChange(name => params.onModelChange(name));

  const materialOptions = Object.fromEntries(
    Object.keys(materials).map(k => [k, k])
  );
  fModel.add(params, 'material', { Imported: 'Imported', ...materialOptions })
    .onChange(setMaterial);

  fModel.add(params, 'unfold', 0, 1, 0.001)
    .onChange(setScrub);
  // }}}

  // VIEW {{{
  const fView = gui.addFolder('View').open();

  fView.add(params, "grid").name("Grid").onChange(view.setGridVisible);
  fView.add(params, "axes").name("Axes").onChange(view.setAxesVisible);
  fView.addColor(params, "backgroundColour").name("Background").onChange(view.setBackground);

  fView.add(params, "inspectorDisplay")
    .name("Inspector")
    .onChange(v => {
      inspector.style.display = v ? "" : "none";
    });


  fView.add(params, "statsDisplay")
    .name("Stats")
    .onChange(v => {
      stats.dom.style.display = v ? "" : "none";
    });
  // END VIEW }}}

  // LIGHTS {{{
  const fLights = gui.addFolder('Lights').open();

  // KEY LIGHT {{{
  const fKey = fLights.addFolder("Key");
  fKey.add(lightParams.key, "intensity", 0, 500)
    .onChange(v => lightController.setIntensity("key", v));

  fKey.add(lightParams.key, "angle", 5, 45)
    .onChange(v => lightController.setAngle("key", v));

  fKey.add(lightParams.key, "penumbra", 0, 1, 0.01)
    .onChange(v => lightController.setPenumbra("key", v));

  fKey.add(lightParams.key, "helper")
    .onChange(v => lightController.setHelperVisible("key", v));
  // END KEY }}}
  // FILL LIGHT {{{
  const fFill = fLights.addFolder("Fill");
  fFill.add(lightParams.fill, "intensity", 0, 500)
    .onChange(v => lightController.setIntensity("fill", v));

  fFill.add(lightParams.fill, "angle", 5, 45)
    .onChange(v => lightController.setAngle("fill", v));

  fFill.add(lightParams.fill, "penumbra", 0, 1, 0.01)
    .onChange(v => lightController.setPenumbra("fill", v));

  fFill.add(lightParams.fill, "helper")
    .onChange(v => lightController.setHelperVisible("fill", v));
  // END FILL }}}
  // END LIGHTS }}}

  const fCamera = gui.addFolder('Camera').close();
  const fMaterial = gui.addFolder("Material").open();




  //
  // fCamera.add(camera.position, "x", -20, 20, 0.1).listen();
  // fCamera.add(camera.position, "y", -20, 20, 0.1).listen();
  // fCamera.add(camera.position, "z", -20, 20, 0.1).listen();
  // fCamera.add(camera.rotation, "x", -20, 20, 0.1).listen();
  // fCamera.add(camera.rotation, "y", -20, 20, 0.1).listen();
  // fCamera.add(camera.rotation, "z", -20, 20, 0.1).listen();
  //
  //
  // gui.add(params, "restore").name("Restore");

  return gui;
} // }}}
