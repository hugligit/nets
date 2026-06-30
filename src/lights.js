import * as THREE from 'three';

export function createLights(scene) { // {{{

  const lights = {

    key: createSpotLight({
      intensity: 100,
      position: new THREE.Vector3(8, 5, 5),
      angle: Math.PI * 25 / 180,
      distance: 30,
      penumbra: 1,
    }),

    fill: createSpotLight({
      intensity: 100,
      position: new THREE.Vector3(-8, 5, -5),
      angle: Math.PI / 10,
      distance: 30,
      penumbra: 1,
    }),

  };

  for (const rig of Object.values(lights)) {
    scene.add(rig.light);
  }

  return lights;
} // }}}



function createSpotLight(options) { // {{{

  const light = new THREE.SpotLight(0xffffff, options.intensity);

  light.position.copy(options.position);
  light.angle = options.angle;
  light.distance = options.distance;
  light.penumbra = options.penumbra;
  light.target.position.set(0, 0, 0);

  const helper = new THREE.SpotLightHelper(light);
  helper.visible = false;

  light.add(helper);
  helper.update();

  return {
    light,
    helper,
  };
} // }}}




