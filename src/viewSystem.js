import * as THREE from 'three';



export function createViewSystem(scene) {

  scene.background = new THREE.Color(0x292929);
  const axesHelper = new THREE.AxesHelper(10);
  const floorGrid = new THREE.GridHelper(10, 10);
  floorGrid.visible = false;
  axesHelper.visible = false;
  scene.add(axesHelper);
  scene.add(floorGrid);

  function setGridVisible(visible) {
    floorGrid.visible = visible;
  }

  function setAxesVisible(visible) {
    axesHelper.visible = visible;
  }

  function setBackground(colour) {
    // scene.background = new THREE.Color(colour);
    scene.background.set(colour);
  }

  return {
    setGridVisible,
    setAxesVisible,
    setBackground,
  };
}
