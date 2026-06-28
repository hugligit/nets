import * as THREE from 'three';
import { loadModel } from './loader.js';

let model = null;
let mixer = null;
let action = null;
let clip = null;
let scrubMode = false;


export async function setModel(url, scene) { // {{{
    // remove old model
    if (model) {
        scene.remove(model);
    }

    const gltf = await loadModel(url);

    model = gltf.scene;
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
