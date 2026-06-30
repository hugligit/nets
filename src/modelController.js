import * as THREE from 'three';
import { loadModel } from './loader.js';
import { materials } from './materials.js';

let model = null;
let targetMesh = null;
let mixer = null;
let action = null;
let clip = null;
let scrubMode = false;
let importedMaterial = null;
let currentModelName = null;
let currentMaterialName = null;

export async function setModel(url, scene) { // {{{
  // remove old model
  if (model) {
    scene.remove(model);
  }

  if(!currentMaterialName){
    currentMaterialName = 'Imported';
  }


  const gltf = await loadModel(url);

  model = gltf.scene;

  currentModelName = url; // or better: catalog key later
  targetMesh = null;

  model.traverse(child => {
    if (!targetMesh && child.isMesh) {
      targetMesh = child;
    }
  });



  importedMaterial = targetMesh.material;
  setMaterial(currentMaterialName);
  scene.add(model);

  clip = gltf.animations[0];

  mixer = new THREE.AnimationMixer(model);
  action = mixer.clipAction(clip);

  action.play();
  action.paused = true;

  return model;
} // }}}

export function update(delta) { // {{{
  if (!mixer) return;

  if (!scrubMode) {
    mixer.update(delta);
  }

} // }}}

export function setScrub(t) { // {{{
  if (!action || !clip) return;
  scrubMode = true;
  action.time = t * clip.duration;
  mixer.update(0); // force pose update
} // }}}

export function setMaterial(name) { // {{{
  if (!targetMesh) return;

  if (name === 'Imported') {
    targetMesh.material = importedMaterial;
    currentMaterialName = name;
    return;
  }

  const mat = materials[name];

  if (!mat) return;

  targetMesh.material = mat;



  currentMaterialName = name;

} // }}}

export function getState() { // {{{
  return {
    model: currentModelName,
    mesh: targetMesh ? targetMesh.name : null,
    scrub: scrubMode,
    material: currentMaterialName,
    clip: clip ? clip.name : null,
    time: action ? action.time : 0,
  };
} // }}}

// !!! Temporary: doesn't really belong here
export function getRendererState(renderer) { // {{{
  return {
    drawCalls: renderer.info.render.calls,
    triangles: renderer.info.render.triangles,
    lines: renderer.info.render.lines,
    points: renderer.info.render.triangles,
    frame: renderer.info.render.frame,
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures,
  };
} // }}}
