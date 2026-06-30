import * as THREE from 'three';

export function createViewController(scene, grid, axes) {

  function setGridVisible(visible) {
    grid.visible = visible;
  }

  function setAxesVisible(visible) {
    axes.visible = visible;
  }

  function setBackground(colour) {
    scene.background = new THREE.Color(colour);
  }

  return {
    setGridVisible,
    setAxesVisible,
    setBackground,
  };
}
