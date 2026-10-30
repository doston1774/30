import * as THREE from 'three';

/**
 * Generates an authentic procedural 24K gold damask / filigree canvas texture
 */
export function createGoldFiligreeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Rich royal ivory porcelain base with subtle warm sheen
    ctx.fillStyle = '#faf8f5';
    ctx.fillRect(0, 0, 512, 512);

    // Ornate gold filigree lace patterns
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;

    // Concentric gold borders
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, Math.PI * 2);
    ctx.arc(256, 256, 210, 0, Math.PI * 2);
    ctx.stroke();

    // Persian/Uzbek and European Imperial floral palmettes
    const petals = 16;
    for (let i = 0; i < petals; i++) {
      const angle = (i * Math.PI * 2) / petals;
      const x1 = 256 + Math.cos(angle) * 180;
      const y1 = 256 + Math.sin(angle) * 180;
      const x2 = 256 + Math.cos(angle + 0.15) * 210;
      const y2 = 256 + Math.sin(angle + 0.15) * 210;

      ctx.beginPath();
      ctx.moveTo(256, 256);
      ctx.quadraticCurveTo(x1, y1, x2, y2);
      ctx.strokeStyle = '#e6ca65';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Golden diamond accent dots
      ctx.fillStyle = '#f3e5ab';
      ctx.beginPath();
      ctx.arc(x2, y2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central royal crest rosette
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(256, 256, 60, 0, Math.PI * 2);
    ctx.stroke();

    for (let j = 0; j < 8; j++) {
      const a = (j * Math.PI * 2) / 8;
      ctx.beginPath();
      ctx.arc(256 + Math.cos(a) * 40, 256 + Math.sin(a) * 40, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.fill();
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Creates soft radial contact shadow texture to ground 3D objects
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(15, 10, 5, 0.65)');
    gradient.addColorStop(0.35, 'rgba(25, 18, 10, 0.35)');
    gradient.addColorStop(0.7, 'rgba(40, 30, 20, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
