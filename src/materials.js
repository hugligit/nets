import * as THREE from 'three';

export const normalMaterial = new THREE.MeshNormalMaterial();

export const phongMaterial = new THREE.MeshPhongMaterial({
    color: 0x44aa88
});


export const materials = {
    normal: normalMaterial,
    phong: phongMaterial,
};
