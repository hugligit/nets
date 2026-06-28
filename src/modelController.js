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


export async function setModel(url, scene) { // {{{
  // remove old model
  if (model) {
    scene.remove(model);
  }

  const gltf = await loadModel(url);

  model = gltf.scene;

  model.traverse(child => {
    if (!targetMesh && child.isMesh) {
      targetMesh = child;
    }
  });



  // importedMaterial = model.children[0].children[0].material;
  importedMaterial = targetMesh.material;
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

    if (!model) return;


    switch (name) {

        case 'Imported':
            targetMesh.material = importedMaterial;
            break;

        case 'Internal':
            targetMesh.material = materials.normal;
            break;

        case 'Phong':
            targetMesh.material = materials.phong;
            break;
    }
} // }}}
