import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export async function loadModel(url) {

    const gltf = await loader.loadAsync(url);

    return gltf;

}
