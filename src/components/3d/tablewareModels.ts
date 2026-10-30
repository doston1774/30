import * as THREE from 'three';
import { createGoldFiligreeTexture, createContactShadowTexture } from './proceduralTextures';

export interface ModelBuildOptions {
  isSoftwareGl: boolean;
  finishPreset?: 'gold' | 'platinum' | 'cobalt' | 'crystal';
}

/**
 * Creates 24K Gold or Platinum materials with authentic anisotropic luxury PBR
 */
export function getMaterials(options: ModelBuildOptions) {
  const { isSoftwareGl, finishPreset = 'gold' } = options;

  const isPlatinum = finishPreset === 'platinum';
  const isCobalt = finishPreset === 'cobalt';

  // 24K Yellow Gold vs Platinum / White Gold
  const metalColor = isPlatinum ? 0xe5e5ea : isCobalt ? 0x1b2b52 : 0xd4af37;
  const accentColor = isPlatinum ? 0xf0f0f5 : 0xf3e5ab;

  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: metalColor,
    metalness: isCobalt ? 0.4 : 0.95,
    roughness: 0.12,
    reflectivity: 0.95,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  });

  const goldAccentMaterial = new THREE.MeshPhysicalMaterial({
    color: accentColor,
    metalness: 0.98,
    roughness: 0.18,
  });

  // Imperial Porcelain (glazed kaolin with smooth translucency)
  const filigreeTexture = createGoldFiligreeTexture();
  const porcelainMaterial = new THREE.MeshPhysicalMaterial({
    color: isCobalt ? 0x0f1c3f : 0xfcfbf7,
    roughness: 0.15,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    map: filigreeTexture,
  });

  const pureWhitePorcelain = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.02,
    clearcoat: 1.0,
  });

  // Optical Lead Crystal (24% PbO)
  const crystalMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: isSoftwareGl ? 0 : 0.94,
    opacity: isSoftwareGl ? 0.35 : 1,
    transparent: true,
    roughness: 0.03,
    metalness: 0.05,
    ior: 1.58, // Optical crystal index of refraction
    thickness: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    depthWrite: false,
  });

  // Ruby Gemstone Accent Finial
  const rubyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x9e0b2b,
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1.0,
    transparent: true,
    opacity: 0.9,
  });

  return {
    goldMaterial,
    goldAccentMaterial,
    porcelainMaterial,
    pureWhitePorcelain,
    crystalMaterial,
    rubyMaterial,
  };
}

/**
 * 1. Bohemia Optical Crystal Cut Goblet ("Imperator Qadahi")
 * 7 composite parts: Base foot, fluted stem, ornamental knop collar, lower bowl, upper chalice, 24K gold rim, contact shadow.
 */
export function buildCrystalGoblet(options: ModelBuildOptions): THREE.Group {
  const group = new THREE.Group();
  const { goldMaterial, goldAccentMaterial, crystalMaterial } = getMaterials(options);

  // Part 1: Fluted Cut Crystal Foot Base (Diameter 3.6, Height 0.4)
  const footPoints: THREE.Vector2[] = [];
  footPoints.push(new THREE.Vector2(0, 0));
  footPoints.push(new THREE.Vector2(1.8, 0));
  footPoints.push(new THREE.Vector2(1.75, 0.08));
  footPoints.push(new THREE.Vector2(1.5, 0.2));
  footPoints.push(new THREE.Vector2(0.5, 0.4));
  footPoints.push(new THREE.Vector2(0.3, 0.5));
  const footGeom = new THREE.LatheGeometry(footPoints, 24);
  const footMesh = new THREE.Mesh(footGeom, crystalMaterial);
  footMesh.castShadow = true;
  group.add(footMesh);

  // Part 2: Gold Ring on Foot Perimeter
  const footRingGeom = new THREE.TorusGeometry(1.68, 0.04, 16, 48);
  footRingGeom.rotateX(Math.PI / 2);
  const footRing = new THREE.Mesh(footRingGeom, goldMaterial);
  footRing.position.y = 0.08;
  group.add(footRing);

  // Part 3: Faceted Hexagonal Crystal Stem (Height 2.4)
  const stemGeom = new THREE.CylinderGeometry(0.24, 0.28, 2.4, 6);
  const stemMesh = new THREE.Mesh(stemGeom, crystalMaterial);
  stemMesh.position.y = 1.7;
  group.add(stemMesh);

  // Part 4: Central Ornamental 24K Gold Knop Collar
  const knopGeom = new THREE.SphereGeometry(0.42, 24, 16);
  knopGeom.scale(1, 0.65, 1);
  const knopMesh = new THREE.Mesh(knopGeom, goldAccentMaterial);
  knopMesh.position.y = 1.7;
  group.add(knopMesh);

  // Part 5: Lower Faceted Diamond Chalice Base
  const chaliceBaseGeom = new THREE.CylinderGeometry(1.3, 0.35, 0.9, 12);
  const chaliceBaseMesh = new THREE.Mesh(chaliceBaseGeom, crystalMaterial);
  chaliceBaseMesh.position.y = 3.35;
  group.add(chaliceBaseMesh);

  // Part 6: Elegant Tulip-Shaped Optical Bowl Body (Lathe curve)
  const bowlPoints: THREE.Vector2[] = [];
  bowlPoints.push(new THREE.Vector2(1.2, 0));
  bowlPoints.push(new THREE.Vector2(1.6, 0.8));
  bowlPoints.push(new THREE.Vector2(1.7, 1.8));
  bowlPoints.push(new THREE.Vector2(1.5, 2.8));
  bowlPoints.push(new THREE.Vector2(1.42, 3.2));
  const bowlGeom = new THREE.LatheGeometry(bowlPoints, 32);
  const bowlMesh = new THREE.Mesh(bowlGeom, crystalMaterial);
  bowlMesh.position.y = 3.8;
  group.add(bowlMesh);

  // Part 7: 24K Gold Gilded Lip Rim at top
  const lipRimGeom = new THREE.TorusGeometry(1.42, 0.05, 16, 48);
  lipRimGeom.rotateX(Math.PI / 2);
  const lipRim = new THREE.Mesh(lipRimGeom, goldMaterial);
  lipRim.position.y = 7.0;
  group.add(lipRim);

  // Contact Shadow Plane (Grounding)
  const shadowGeom = new THREE.PlaneGeometry(5, 5);
  shadowGeom.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: createContactShadowTexture(),
    transparent: true,
    depthWrite: false,
    opacity: 0.7,
  });
  const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  shadowMesh.position.y = 0.005;
  group.add(shadowMesh);

  group.position.y = 0;
  return group;
}

/**
 * 2. Imperial Porcelain & 24K Gold Teapot ("Shohona Zarhal Choynak")
 * 8 composite parts: Pedestal base, spherical belly, gilded filigree neck, curved spout, gold spout tip, ear handle, lid, crown finial.
 */
export function buildPorcelainTeapot(options: ModelBuildOptions): THREE.Group {
  const group = new THREE.Group();
  const { goldMaterial, goldAccentMaterial, porcelainMaterial, pureWhitePorcelain, rubyMaterial } = getMaterials(options);

  // Part 1: Pedestal Foot Base
  const basePoints: THREE.Vector2[] = [];
  basePoints.push(new THREE.Vector2(0, 0));
  basePoints.push(new THREE.Vector2(1.3, 0));
  basePoints.push(new THREE.Vector2(1.25, 0.15));
  basePoints.push(new THREE.Vector2(0.9, 0.4));
  basePoints.push(new THREE.Vector2(0.85, 0.6));
  const baseGeom = new THREE.LatheGeometry(basePoints, 32);
  const baseMesh = new THREE.Mesh(baseGeom, goldMaterial);
  group.add(baseMesh);

  // Part 2: Spherical Porcelain Belly (Main body)
  const bellyGeom = new THREE.SphereGeometry(2.1, 36, 28);
  bellyGeom.scale(1.15, 0.95, 1.15);
  const bellyMesh = new THREE.Mesh(bellyGeom, porcelainMaterial);
  bellyMesh.position.y = 2.2;
  bellyMesh.castShadow = true;
  group.add(bellyMesh);

  // Part 3: Gilded Filigree Neck Collar
  const neckGeom = new THREE.CylinderGeometry(1.25, 1.35, 0.45, 32);
  const neckMesh = new THREE.Mesh(neckGeom, goldAccentMaterial);
  neckMesh.position.y = 3.8;
  group.add(neckMesh);

  // Part 4: S-Curved Teapot Spout (TubeGeometry on 3D Bezier curve)
  const spoutCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(1.4, 1.8, 0),
    new THREE.Vector3(2.6, 2.0, 0),
    new THREE.Vector3(3.2, 3.4, 0),
    new THREE.Vector3(3.3, 3.8, 0),
  );
  const spoutGeom = new THREE.TubeGeometry(spoutCurve, 32, 0.28, 16, false);
  const spoutMesh = new THREE.Mesh(spoutGeom, pureWhitePorcelain);
  group.add(spoutMesh);

  // Part 5: 24K Gold Pouring Spout Tip
  const tipGeom = new THREE.TorusGeometry(0.24, 0.06, 16, 32);
  tipGeom.rotateY(Math.PI / 2);
  const tipMesh = new THREE.Mesh(tipGeom, goldMaterial);
  tipMesh.position.set(3.3, 3.8, 0);
  group.add(tipMesh);

  // Part 6: Ornate Royal Scroll Ear Handle
  const handleCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1.4, 3.3, 0),
    new THREE.Vector3(-3.2, 3.2, 0),
    new THREE.Vector3(-3.2, 1.4, 0),
    new THREE.Vector3(-1.4, 1.6, 0),
  );
  const handleGeom = new THREE.TubeGeometry(handleCurve, 32, 0.24, 16, false);
  const handleMesh = new THREE.Mesh(handleGeom, goldAccentMaterial);
  group.add(handleMesh);

  // Part 7: Porcelain Lid with Flange
  const lidPoints: THREE.Vector2[] = [];
  lidPoints.push(new THREE.Vector2(0, 0.4));
  lidPoints.push(new THREE.Vector2(0.9, 0.35));
  lidPoints.push(new THREE.Vector2(1.15, 0.15));
  lidPoints.push(new THREE.Vector2(1.2, 0));
  const lidGeom = new THREE.LatheGeometry(lidPoints, 32);
  const lidMesh = new THREE.Mesh(lidGeom, porcelainMaterial);
  lidMesh.position.y = 4.0;
  group.add(lidMesh);

  // Part 8: Imperial Crown Finial with Ruby Accent
  const crownGeom = new THREE.CylinderGeometry(0.2, 0.35, 0.4, 16);
  const crownMesh = new THREE.Mesh(crownGeom, goldMaterial);
  crownMesh.position.y = 4.55;
  group.add(crownMesh);

  const rubyFinialGeom = new THREE.SphereGeometry(0.24, 16, 16);
  const rubyMesh = new THREE.Mesh(rubyFinialGeom, rubyMaterial);
  rubyMesh.position.y = 4.85;
  group.add(rubyMesh);

  // Soft contact shadow
  const shadowGeom = new THREE.PlaneGeometry(6, 6);
  shadowGeom.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: createContactShadowTexture(),
    transparent: true,
    depthWrite: false,
    opacity: 0.75,
  });
  const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  shadowMesh.position.y = 0.005;
  group.add(shadowMesh);

  return group;
}

/**
 * 3. Grand Royal Banquet Platter & Cloche Dome ("Imperator Dasturxon Lagani va Billur Qopqoq")
 * 7 composite parts: Stepped rim foot, wide porcelain platter, 24K gold relief filigree rim, mirror porcelain well, crystal cloche dome, cut crystal handle knob, gold ring seal.
 */
export function buildRoyalPlatter(options: ModelBuildOptions): THREE.Group {
  const group = new THREE.Group();
  const { goldMaterial, goldAccentMaterial, porcelainMaterial, crystalMaterial } = getMaterials(options);

  // Part 1 & 2: Wide Sculpted Porcelain Dish Platter
  const platterPoints: THREE.Vector2[] = [];
  platterPoints.push(new THREE.Vector2(0, 0.05));
  platterPoints.push(new THREE.Vector2(2.5, 0.05));
  platterPoints.push(new THREE.Vector2(3.6, 0.4));
  platterPoints.push(new THREE.Vector2(4.2, 0.7));
  platterPoints.push(new THREE.Vector2(4.35, 0.65));
  platterPoints.push(new THREE.Vector2(3.8, 0.2));
  platterPoints.push(new THREE.Vector2(2.6, 0.0));
  platterPoints.push(new THREE.Vector2(0, 0.0));
  const platterGeom = new THREE.LatheGeometry(platterPoints, 48);
  const platterMesh = new THREE.Mesh(platterGeom, porcelainMaterial);
  platterMesh.castShadow = true;
  group.add(platterMesh);

  // Part 3: 24K Gold Filigree Ring Rim
  const goldRimGeom = new THREE.TorusGeometry(4.28, 0.07, 16, 64);
  goldRimGeom.rotateX(Math.PI / 2);
  const goldRim = new THREE.Mesh(goldRimGeom, goldAccentMaterial);
  goldRim.position.y = 0.68;
  group.add(goldRim);

  // Part 4: Inner Gold Rosette Accent Circle
  const innerRingGeom = new THREE.TorusGeometry(2.4, 0.04, 16, 48);
  innerRingGeom.rotateX(Math.PI / 2);
  const innerRing = new THREE.Mesh(innerRingGeom, goldMaterial);
  innerRing.position.y = 0.12;
  group.add(innerRing);

  // Part 5: Bell-Shaped Crystal Cloche Dome
  const clochePoints: THREE.Vector2[] = [];
  clochePoints.push(new THREE.Vector2(2.35, 0));
  clochePoints.push(new THREE.Vector2(2.3, 0.6));
  clochePoints.push(new THREE.Vector2(2.1, 1.8));
  clochePoints.push(new THREE.Vector2(1.6, 2.7));
  clochePoints.push(new THREE.Vector2(0.8, 3.3));
  clochePoints.push(new THREE.Vector2(0.3, 3.5));
  clochePoints.push(new THREE.Vector2(0, 3.55));
  const clocheGeom = new THREE.LatheGeometry(clochePoints, 36);
  const clocheMesh = new THREE.Mesh(clocheGeom, crystalMaterial);
  clocheMesh.position.y = 0.18;
  group.add(clocheMesh);

  // Part 6: Dome Rim Gold Collar Sealing Ring
  const domeSealGeom = new THREE.TorusGeometry(2.36, 0.05, 16, 48);
  domeSealGeom.rotateX(Math.PI / 2);
  const domeSeal = new THREE.Mesh(domeSealGeom, goldMaterial);
  domeSeal.position.y = 0.2;
  group.add(domeSeal);

  // Part 7: Cut Crystal Faceted Handle Knob
  const knobGeom = new THREE.IcosahedronGeometry(0.38, 2);
  const knobMesh = new THREE.Mesh(knobGeom, crystalMaterial);
  knobMesh.position.y = 4.0;
  group.add(knobMesh);

  const knobCollarGeom = new THREE.CylinderGeometry(0.18, 0.25, 0.25, 16);
  const knobCollar = new THREE.Mesh(knobCollarGeom, goldAccentMaterial);
  knobCollar.position.y = 3.75;
  group.add(knobCollar);

  // Soft contact shadow
  const shadowGeom = new THREE.PlaneGeometry(9, 9);
  shadowGeom.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: createContactShadowTexture(),
    transparent: true,
    depthWrite: false,
    opacity: 0.8,
  });
  const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  shadowMesh.position.y = 0.005;
  group.add(shadowMesh);

  return group;
}
