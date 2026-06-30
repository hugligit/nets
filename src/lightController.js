export function createLightController(lights) {

  function setIntensity(name, value) {
    lights[name].light.intensity = value;
  }

  function setAngle(name, degrees) {
    lights[name].light.angle = Math.PI * degrees / 180;
    lights[name].helper.update();
  }

  function setPenumbra(name, value) {
    lights[name].light.penumbra = value;
  }

  function setHelperVisible(name, visible) {
    lights[name].helper.visible = visible;
  }

  function updateHelpers() {
    for (const rig of Object.values(lights)) {
      rig.helper.update();
    }
  }

  return {
    setIntensity,
    setAngle,
    setPenumbra,
    setHelperVisible,
    updateHelpers,
  };
}
