let panel = null;

export function createInspector(container = document.body) {

  panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.left = '10px';
  panel.style.bottom = '10px';
  panel.style.width = '260px';
  panel.style.padding = '10px';
  panel.style.background = 'rgba(0,0,0,0.7)';
  panel.style.color = '#0f0';
  panel.style.font = '12px monospace';
  panel.style.zIndex = 1000;
  panel.style.whiteSpace = 'pre';

  container.appendChild(panel);
}

export function updateInspector(state) {

  if (!panel) return;

  panel.textContent =
    `MODEL: ${state.model}
MESH: ${state.mesh}
SCRUB: ${state.scrub}
MATERIAL: ${state.material}
CLIP: ${state.clip}
TIME: ${state.time?.toFixed?.(2) ?? 0}
`;
}
