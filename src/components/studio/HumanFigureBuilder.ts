import * as THREE from 'three';
import {
  MuscleId,
  ExerciseMuscleHeatmap,
  getHeatColorForEMG
} from '../../data/muscleHeatmapData';

export interface HumanFigureNodes {
  root: THREE.Group;
  pelvis: THREE.Group;
  spine: THREE.Group;
  chest: THREE.Group;
  neck: THREE.Group;
  head: THREE.Group;
  leftArm: THREE.Group;
  leftForearm: THREE.Group;
  leftHand: THREE.Group;
  rightArm: THREE.Group;
  rightForearm: THREE.Group;
  rightHand: THREE.Group;
  leftThigh: THREE.Group;
  leftShin: THREE.Group;
  leftFoot: THREE.Group;
  rightThigh: THREE.Group;
  rightShin: THREE.Group;
  rightFoot: THREE.Group;
  barbellGroup: THREE.Group;
  benchGroup: THREE.Group;
  pullUpRig: THREE.Group;
  dumbbellsGroup: THREE.Group;
  primaryMuscleMeshes: THREE.Mesh[];
  secondaryMuscleMeshes: THREE.Mesh[];
  skinMeshes: THREE.Mesh[];
  clothingMeshes: THREE.Mesh[];
  interactiveMuscleMeshes: THREE.Mesh[];
  muscleGroupMap: Record<MuscleId, THREE.Mesh[]>;
  setTheme: (theme: 'athlete' | 'anatomy' | 'cyber') => void;
  updateMuscleActivation: (intensity: number, targetExerciseId: string) => void;
  applyHeatmap: (
    heatmap: ExerciseMuscleHeatmap,
    mode: 'heatmap' | 'standard' | 'isolation',
    isolatedMuscleId?: MuscleId | null,
    dynamicIntensity?: number
  ) => void;
}

/**
 * Creates an anatomically sculpted athletic human figure in Three.js
 * with integrated interactive muscle activation heatmap materials,
 * raycasting tags, compression gear, sneakers, and equipment rigs.
 */
export function buildHumanAthleticFigure(scene: THREE.Scene): HumanFigureNodes {
  // 1. Materials for different body parts and themes
  const athleteSkinMat = new THREE.MeshStandardMaterial({
    color: 0xd49b7a, // warm natural athletic skin tone
    roughness: 0.52,
    metalness: 0.08,
  });

  const shortsMat = new THREE.MeshStandardMaterial({
    color: 0x141a17, // athletic charcoal compression tights
    roughness: 0.75,
    metalness: 0.15,
  });

  const seamGlowMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.65,
    roughness: 0.3,
  });

  const shoeUpperMat = new THREE.MeshStandardMaterial({
    color: 0x1c2420,
    roughness: 0.6,
    metalness: 0.2,
  });

  const shoeSoleMat = new THREE.MeshStandardMaterial({
    color: 0xf3f4f6,
    roughness: 0.4,
    metalness: 0.1,
  });

  const jointSocketMat = new THREE.MeshStandardMaterial({
    color: 0x222e28,
    roughness: 0.5,
    metalness: 0.3,
  });

  // Dedicated Materials for each muscle group allowing individual Heatmap coloring
  const muscleMaterials: Record<MuscleId, THREE.MeshStandardMaterial> = {
    chest: new THREE.MeshStandardMaterial({
      color: 0x00ff87,
      emissive: 0x00ff87,
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    }),
    lats: new THREE.MeshStandardMaterial({
      color: 0x00ff87,
      emissive: 0x00ff87,
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    }),
    traps: new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    }),
    deltoids: new THREE.MeshStandardMaterial({
      color: 0x00ff87,
      emissive: 0x00ff87,
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    }),
    biceps: new THREE.MeshStandardMaterial({
      color: 0x00ff87,
      emissive: 0x00ff87,
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    }),
    triceps: new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    }),
    abs: new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.88
    }),
    obliques: new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.88
    }),
    erectors: new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    }),
    glutes: new THREE.MeshStandardMaterial({
      color: 0x00ff87,
      emissive: 0x00ff87,
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    }),
    quads: new THREE.MeshStandardMaterial({
      color: 0x00ff87,
      emissive: 0x00ff87,
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    }),
    hamstrings: new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    }),
    calves: new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    }),
  };

  const skinMeshes: THREE.Mesh[] = [];
  const clothingMeshes: THREE.Mesh[] = [];
  const primaryMuscleMeshes: THREE.Mesh[] = [];
  const secondaryMuscleMeshes: THREE.Mesh[] = [];
  const interactiveMuscleMeshes: THREE.Mesh[] = [];

  const muscleGroupMap: Record<MuscleId, THREE.Mesh[]> = {
    chest: [],
    lats: [],
    traps: [],
    deltoids: [],
    biceps: [],
    triceps: [],
    abs: [],
    obliques: [],
    erectors: [],
    glutes: [],
    quads: [],
    hamstrings: [],
    calves: [],
  };

  const addSkin = (geo: THREE.BufferGeometry, mat: THREE.Material = athleteSkinMat): THREE.Mesh => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (mat === athleteSkinMat) skinMeshes.push(mesh);
    return mesh;
  };

  const addClothing = (geo: THREE.BufferGeometry, mat: THREE.Material = shortsMat): THREE.Mesh => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    clothingMeshes.push(mesh);
    return mesh;
  };

  const addHeatmapMuscle = (geo: THREE.BufferGeometry, muscleId: MuscleId): THREE.Mesh => {
    const mat = muscleMaterials[muscleId];
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { muscleId };
    muscleGroupMap[muscleId].push(mesh);
    interactiveMuscleMeshes.push(mesh);
    primaryMuscleMeshes.push(mesh);
    return mesh;
  };

  // -------------------------------------------------------------
  // ROOT HIERARCHY
  // -------------------------------------------------------------
  const root = new THREE.Group();
  scene.add(root);

  // Pelvis / Hips (athletic waist & gluteus maximus volume)
  const pelvis = new THREE.Group();
  pelvis.position.y = 1.35;
  root.add(pelvis);

  // Anatomical Pelvis Core (with athletic compression shorts)
  const pelvisCore = addClothing(new THREE.CylinderGeometry(0.24, 0.22, 0.28, 20));
  pelvisCore.position.y = 0.02;
  pelvis.add(pelvisCore);

  // Gluteus Maximus Sculpted Curves (Posterior Hip Muscles)
  const leftGlute = addClothing(new THREE.SphereGeometry(0.14, 16, 16));
  leftGlute.scale.set(0.9, 1.1, 1.25);
  leftGlute.position.set(-0.1, -0.02, -0.11);
  pelvis.add(leftGlute);

  const rightGlute = addClothing(new THREE.SphereGeometry(0.14, 16, 16));
  rightGlute.scale.set(0.9, 1.1, 1.25);
  rightGlute.position.set(0.1, -0.02, -0.11);
  pelvis.add(rightGlute);

  // Glute Muscle Heatmap Overlays (Deadlift, Squat & Lunge activation)
  const gluteHighlightLeft = addHeatmapMuscle(new THREE.SphereGeometry(0.142, 16, 16), 'glutes');
  gluteHighlightLeft.scale.set(0.9, 1.1, 1.25);
  gluteHighlightLeft.position.set(-0.1, -0.02, -0.115);
  pelvis.add(gluteHighlightLeft);

  const gluteHighlightRight = addHeatmapMuscle(new THREE.SphereGeometry(0.142, 16, 16), 'glutes');
  gluteHighlightRight.scale.set(0.9, 1.1, 1.25);
  gluteHighlightRight.position.set(0.1, -0.02, -0.115);
  pelvis.add(gluteHighlightRight);

  // Waistband with neon green athletic trim
  const waistband = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.235, 0.04, 24), seamGlowMat);
  waistband.position.y = 0.16;
  pelvis.add(waistband);
  clothingMeshes.push(waistband);

  // -------------------------------------------------------------
  // SPINE & ABDOMINAL WALL / CORE
  // -------------------------------------------------------------
  const spine = new THREE.Group();
  pelvis.add(spine);

  // Lumbar torso core (skin)
  const lumbarCore = addSkin(new THREE.CylinderGeometry(0.22, 0.21, 0.32, 20));
  lumbarCore.position.y = 0.22;
  spine.add(lumbarCore);

  // Sculpted 6-Pack Rectus Abdominis (Upper, Middle, Lower ab pairs)
  const abGeo = new THREE.BoxGeometry(0.085, 0.065, 0.04);
  const abPositions = [
    [-0.05, 0.15, 0.19], [0.05, 0.15, 0.19], // Lower abs
    [-0.05, 0.23, 0.20], [0.05, 0.23, 0.20], // Middle abs
    [-0.05, 0.31, 0.20], [0.05, 0.31, 0.20], // Upper abs
  ];
  abPositions.forEach(([x, y, z]) => {
    const abPack = addHeatmapMuscle(abGeo, 'abs');
    abPack.position.set(x, y, z);
    abPack.rotation.x = -0.05;
    spine.add(abPack);
  });

  // External Obliques (Athletic V-taper flank contours)
  const leftOblique = addHeatmapMuscle(new THREE.CylinderGeometry(0.06, 0.05, 0.24, 12), 'obliques');
  leftOblique.position.set(-0.19, 0.21, 0.02);
  leftOblique.rotation.z = -0.12;
  spine.add(leftOblique);

  const rightOblique = addHeatmapMuscle(new THREE.CylinderGeometry(0.06, 0.05, 0.24, 12), 'obliques');
  rightOblique.position.set(0.19, 0.21, 0.02);
  rightOblique.rotation.z = 0.12;
  spine.add(rightOblique);

  // Erector Spinae (Lower back columns)
  const leftSpineCol = addHeatmapMuscle(new THREE.CylinderGeometry(0.04, 0.04, 0.26, 12), 'erectors');
  leftSpineCol.position.set(-0.06, 0.22, -0.17);
  spine.add(leftSpineCol);

  const rightSpineCol = addHeatmapMuscle(new THREE.CylinderGeometry(0.04, 0.04, 0.26, 12), 'erectors');
  rightSpineCol.position.set(0.06, 0.22, -0.17);
  spine.add(rightSpineCol);

  // -------------------------------------------------------------
  // THORACIC CHEST, RIBCAGE & BACK (LATS / TRAPS)
  // -------------------------------------------------------------
  const chest = new THREE.Group();
  chest.position.y = 0.38;
  spine.add(chest);

  // Thoracic ribcage core (V-taper athletic frame)
  const ribcage = addSkin(new THREE.CylinderGeometry(0.27, 0.23, 0.35, 20));
  ribcage.position.y = 0.16;
  chest.add(ribcage);

  // Clavicles (Collarbones)
  const leftClavicle = addSkin(new THREE.CylinderGeometry(0.02, 0.02, 0.22, 12));
  leftClavicle.rotation.z = Math.PI / 2.3;
  leftClavicle.position.set(-0.12, 0.32, 0.14);
  chest.add(leftClavicle);

  const rightClavicle = addSkin(new THREE.CylinderGeometry(0.02, 0.02, 0.22, 12));
  rightClavicle.rotation.z = -Math.PI / 2.3;
  rightClavicle.position.set(0.12, 0.32, 0.14);
  chest.add(rightClavicle);

  // Sculpted Pectoralis Major Plates
  const leftPecHighlight = addHeatmapMuscle(new THREE.BoxGeometry(0.192, 0.172, 0.082), 'chest');
  leftPecHighlight.position.set(-0.11, 0.20, 0.185);
  leftPecHighlight.rotation.set(-0.08, -0.1, 0.05);
  chest.add(leftPecHighlight);

  const rightPecHighlight = addHeatmapMuscle(new THREE.BoxGeometry(0.192, 0.172, 0.082), 'chest');
  rightPecHighlight.position.set(0.11, 0.20, 0.185);
  rightPecHighlight.rotation.set(-0.08, 0.1, -0.05);
  chest.add(rightPecHighlight);

  // Latissimus Dorsi (Athletic V-taper wings)
  const leftLatHighlight = addHeatmapMuscle(new THREE.CylinderGeometry(0.072, 0.112, 0.32, 12), 'lats');
  leftLatHighlight.position.set(-0.215, 0.14, -0.08);
  leftLatHighlight.rotation.set(0.1, 0, -0.25);
  chest.add(leftLatHighlight);

  const rightLatHighlight = addHeatmapMuscle(new THREE.CylinderGeometry(0.072, 0.112, 0.32, 12), 'lats');
  rightLatHighlight.position.set(0.215, 0.14, -0.08);
  rightLatHighlight.rotation.set(0.1, 0, 0.25);
  chest.add(rightLatHighlight);

  // Trapezius Muscle (Upper back diamond mass)
  const trapGeo = new THREE.ConeGeometry(0.26, 0.24, 16);
  const trapMesh = addHeatmapMuscle(trapGeo, 'traps');
  trapMesh.position.set(0, 0.24, -0.12);
  trapMesh.rotation.x = Math.PI * 0.92;
  chest.add(trapMesh);

  // -------------------------------------------------------------
  // NECK & HEAD (ANATOMICALLY SCULPTED HUMAN HEAD)
  // -------------------------------------------------------------
  const neck = new THREE.Group();
  neck.position.y = 0.36;
  chest.add(neck);

  const neckCylinder = addSkin(new THREE.CylinderGeometry(0.08, 0.10, 0.16, 16));
  neckCylinder.position.y = 0.08;
  neck.add(neckCylinder);

  const head = new THREE.Group();
  head.position.y = 0.20;
  neck.add(head);

  // Cranium
  const cranium = addSkin(new THREE.SphereGeometry(0.145, 24, 24));
  cranium.scale.set(0.95, 1.12, 1.05);
  cranium.position.set(0, 0.11, 0);
  head.add(cranium);

  // Athletic Chin & Jawline
  const jaw = addSkin(new THREE.ConeGeometry(0.11, 0.15, 16));
  jaw.scale.set(1.0, 1.0, 0.8);
  jaw.position.set(0, 0.04, 0.05);
  jaw.rotation.x = -Math.PI / 3.8;
  head.add(jaw);

  // Brow Ridge & Nose Bridge
  const browRidge = addSkin(new THREE.BoxGeometry(0.14, 0.03, 0.06));
  browRidge.position.set(0, 0.13, 0.13);
  head.add(browRidge);

  const noseBridge = addSkin(new THREE.ConeGeometry(0.025, 0.06, 8));
  noseBridge.position.set(0, 0.09, 0.15);
  noseBridge.rotation.x = Math.PI / 4;
  head.add(noseBridge);

  // Hair Cap / Athletic Contour
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.148, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.6),
    new THREE.MeshStandardMaterial({ color: 0x18201c, roughness: 0.9 })
  );
  hairCap.position.set(0, 0.12, -0.01);
  head.add(hairCap);
  clothingMeshes.push(hairCap);

  // -------------------------------------------------------------
  // LEFT ARM HIERARCHY (SHOULDER, BICEPS, TRICEPS, FOREARM, HAND)
  // -------------------------------------------------------------
  const leftShoulderSocket = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), jointSocketMat);
  leftShoulderSocket.position.set(-0.31, 0.28, 0.02);
  chest.add(leftShoulderSocket);

  const leftArm = new THREE.Group();
  leftShoulderSocket.add(leftArm);

  // Deltoid Cap
  const leftDeltHighlight = addHeatmapMuscle(new THREE.SphereGeometry(0.113, 16, 16), 'deltoids');
  leftDeltHighlight.scale.set(0.9, 1.25, 1.05);
  leftDeltHighlight.position.set(-0.02, -0.04, 0);
  leftArm.add(leftDeltHighlight);

  // Upper arm core
  const leftUpperArmCore = addSkin(new THREE.CylinderGeometry(0.075, 0.068, 0.28, 16));
  leftUpperArmCore.position.y = -0.19;
  leftArm.add(leftUpperArmCore);

  // Biceps Brachii
  const leftBicepHighlight = addHeatmapMuscle(new THREE.SphereGeometry(0.075, 16, 16), 'biceps');
  leftBicepHighlight.scale.set(0.85, 1.4, 0.95);
  leftBicepHighlight.position.set(0.01, -0.18, 0.055);
  leftArm.add(leftBicepHighlight);

  // Triceps Brachii
  const leftTricep = addHeatmapMuscle(new THREE.SphereGeometry(0.075, 16, 16), 'triceps');
  leftTricep.scale.set(0.9, 1.35, 1.05);
  leftTricep.position.set(0, -0.18, -0.05);
  leftArm.add(leftTricep);

  // Elbow Joint
  const leftElbow = new THREE.Mesh(new THREE.SphereGeometry(0.062, 14, 14), jointSocketMat);
  leftElbow.position.y = -0.34;
  leftArm.add(leftElbow);

  const leftForearm = new THREE.Group();
  leftElbow.add(leftForearm);

  // Forearm
  const leftForearmMesh = addSkin(new THREE.CylinderGeometry(0.065, 0.048, 0.27, 16));
  leftForearmMesh.position.y = -0.14;
  leftForearm.add(leftForearmMesh);

  // Wrist band
  const leftWristBand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16), seamGlowMat);
  leftWristBand.position.y = -0.27;
  leftForearm.add(leftWristBand);
  clothingMeshes.push(leftWristBand);

  // Hand
  const leftHand = new THREE.Group();
  leftHand.position.y = -0.30;
  leftForearm.add(leftHand);

  const leftPalm = addSkin(new THREE.BoxGeometry(0.065, 0.075, 0.035));
  leftPalm.position.set(0, -0.03, 0.01);
  leftHand.add(leftPalm);

  const leftThumb = addSkin(new THREE.CylinderGeometry(0.014, 0.012, 0.045, 8));
  leftThumb.position.set(0.035, -0.02, 0.03);
  leftThumb.rotation.set(0.3, 0.4, -0.5);
  leftHand.add(leftThumb);

  const fingerGeo = new THREE.CylinderGeometry(0.012, 0.011, 0.055, 8);
  for (let i = 0; i < 4; i++) {
    const finger = addSkin(fingerGeo);
    finger.position.set(-0.025 + i * 0.016, -0.06, 0.02);
    finger.rotation.x = Math.PI / 2.3;
    leftHand.add(finger);
  }

  // -------------------------------------------------------------
  // RIGHT ARM HIERARCHY (SHOULDER, BICEPS, TRICEPS, FOREARM, HAND)
  // -------------------------------------------------------------
  const rightShoulderSocket = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), jointSocketMat);
  rightShoulderSocket.position.set(0.31, 0.28, 0.02);
  chest.add(rightShoulderSocket);

  const rightArm = new THREE.Group();
  rightShoulderSocket.add(rightArm);

  // Deltoid Cap
  const rightDeltHighlight = addHeatmapMuscle(new THREE.SphereGeometry(0.113, 16, 16), 'deltoids');
  rightDeltHighlight.scale.set(0.9, 1.25, 1.05);
  rightDeltHighlight.position.set(0.02, -0.04, 0);
  rightArm.add(rightDeltHighlight);

  // Upper arm core
  const rightUpperArmCore = addSkin(new THREE.CylinderGeometry(0.075, 0.068, 0.28, 16));
  rightUpperArmCore.position.y = -0.19;
  rightArm.add(rightUpperArmCore);

  // Biceps Brachii
  const rightBicepHighlight = addHeatmapMuscle(new THREE.SphereGeometry(0.075, 16, 16), 'biceps');
  rightBicepHighlight.scale.set(0.85, 1.4, 0.95);
  rightBicepHighlight.position.set(-0.01, -0.18, 0.055);
  rightArm.add(rightBicepHighlight);

  // Triceps Brachii
  const rightTricep = addHeatmapMuscle(new THREE.SphereGeometry(0.075, 16, 16), 'triceps');
  rightTricep.scale.set(0.9, 1.35, 1.05);
  rightTricep.position.set(0, -0.18, -0.05);
  rightArm.add(rightTricep);

  // Elbow Joint
  const rightElbow = new THREE.Mesh(new THREE.SphereGeometry(0.062, 14, 14), jointSocketMat);
  rightElbow.position.y = -0.34;
  rightArm.add(rightElbow);

  const rightForearm = new THREE.Group();
  rightElbow.add(rightForearm);

  // Forearm
  const rightForearmMesh = addSkin(new THREE.CylinderGeometry(0.065, 0.048, 0.27, 16));
  rightForearmMesh.position.y = -0.14;
  rightForearm.add(rightForearmMesh);

  // Wrist band
  const rightWristBand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16), seamGlowMat);
  rightWristBand.position.y = -0.27;
  rightForearm.add(rightWristBand);
  clothingMeshes.push(rightWristBand);

  // Hand
  const rightHand = new THREE.Group();
  rightHand.position.y = -0.30;
  rightForearm.add(rightHand);

  const rightPalm = addSkin(new THREE.BoxGeometry(0.065, 0.075, 0.035));
  rightPalm.position.set(0, -0.03, 0.01);
  rightHand.add(rightPalm);

  const rightThumb = addSkin(new THREE.CylinderGeometry(0.014, 0.012, 0.045, 8));
  rightThumb.position.set(-0.035, -0.02, 0.03);
  rightThumb.rotation.set(0.3, -0.4, 0.5);
  rightHand.add(rightThumb);

  for (let i = 0; i < 4; i++) {
    const finger = addSkin(fingerGeo);
    finger.position.set(-0.025 + i * 0.016, -0.06, 0.02);
    finger.rotation.x = Math.PI / 2.3;
    rightHand.add(finger);
  }

  // -------------------------------------------------------------
  // LEFT LEG HIERARCHY (THIGH, QUADS, HAMSTRINGS, KNEE, CALF, SHOE)
  // -------------------------------------------------------------
  const leftHipJoint = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), jointSocketMat);
  leftHipJoint.position.set(-0.16, -0.09, 0);
  pelvis.add(leftHipJoint);

  const leftThigh = new THREE.Group();
  leftHipJoint.add(leftThigh);

  const leftThighSleeve = addClothing(new THREE.CylinderGeometry(0.125, 0.11, 0.22, 20));
  leftThighSleeve.position.y = -0.11;
  leftThigh.add(leftThighSleeve);

  const leftThighCore = addSkin(new THREE.CylinderGeometry(0.115, 0.09, 0.46, 20));
  leftThighCore.position.y = -0.23;
  leftThigh.add(leftThighCore);

  // Vastus Lateralis & Medialis
  const leftVastusLat = addSkin(new THREE.SphereGeometry(0.095, 16, 16));
  leftVastusLat.scale.set(0.85, 1.6, 0.95);
  leftVastusLat.position.set(-0.05, -0.22, 0.02);
  leftThigh.add(leftVastusLat);

  const leftVastusMed = addSkin(new THREE.SphereGeometry(0.075, 16, 16));
  leftVastusMed.scale.set(0.9, 1.2, 0.95);
  leftVastusMed.position.set(0.045, -0.34, 0.05);
  leftThigh.add(leftVastusMed);

  // Glowing Quad Highlights
  const leftQuadHighlight = addHeatmapMuscle(new THREE.CylinderGeometry(0.12, 0.095, 0.44, 18), 'quads');
  leftQuadHighlight.position.y = -0.23;
  leftThigh.add(leftQuadHighlight);

  // Hamstring muscle (posterior)
  const leftHamstring = addHeatmapMuscle(new THREE.SphereGeometry(0.095, 16, 16), 'hamstrings');
  leftHamstring.scale.set(0.85, 1.6, 0.95);
  leftHamstring.position.set(0, -0.24, -0.06);
  leftThigh.add(leftHamstring);

  // Knee Joint
  const leftKnee = new THREE.Mesh(new THREE.SphereGeometry(0.078, 16, 16), jointSocketMat);
  leftKnee.position.y = -0.46;
  leftThigh.add(leftKnee);

  const leftPatella = addSkin(new THREE.SphereGeometry(0.042, 12, 12));
  leftPatella.position.set(0, 0, 0.06);
  leftKnee.add(leftPatella);

  const leftShin = new THREE.Group();
  leftKnee.add(leftShin);

  // Lower leg core
  const leftCalfCore = addSkin(new THREE.CylinderGeometry(0.082, 0.058, 0.44, 18));
  leftCalfCore.position.y = -0.22;
  leftShin.add(leftCalfCore);

  // Gastrocnemius (Calf)
  const leftCalfMedial = addHeatmapMuscle(new THREE.SphereGeometry(0.07, 16, 16), 'calves');
  leftCalfMedial.scale.set(0.85, 1.5, 1.1);
  leftCalfMedial.position.set(-0.02, -0.16, -0.05);
  leftShin.add(leftCalfMedial);

  const leftCalfLateral = addHeatmapMuscle(new THREE.SphereGeometry(0.065, 16, 16), 'calves');
  leftCalfLateral.scale.set(0.85, 1.4, 1.05);
  leftCalfLateral.position.set(0.03, -0.16, -0.05);
  leftShin.add(leftCalfLateral);

  // Sneaker
  const leftFoot = new THREE.Group();
  leftFoot.position.set(0, -0.46, 0.06);
  leftShin.add(leftFoot);

  const leftShoeUpper = new THREE.Mesh(new THREE.BoxGeometry(0.125, 0.095, 0.25), shoeUpperMat);
  leftShoeUpper.position.y = 0.04;
  leftFoot.add(leftShoeUpper);
  clothingMeshes.push(leftShoeUpper);

  const leftShoeSole = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.035, 0.26), shoeSoleMat);
  leftShoeSole.position.y = -0.015;
  leftFoot.add(leftShoeSole);
  clothingMeshes.push(leftShoeSole);

  const leftShoeAccent = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.04), seamGlowMat);
  leftShoeAccent.position.set(0, 0.04, -0.11);
  leftFoot.add(leftShoeAccent);
  clothingMeshes.push(leftShoeAccent);

  // -------------------------------------------------------------
  // RIGHT LEG HIERARCHY (THIGH, QUADS, HAMSTRINGS, KNEE, CALF, SHOE)
  // -------------------------------------------------------------
  const rightHipJoint = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), jointSocketMat);
  rightHipJoint.position.set(0.16, -0.09, 0);
  pelvis.add(rightHipJoint);

  const rightThigh = new THREE.Group();
  rightHipJoint.add(rightThigh);

  const rightThighSleeve = addClothing(new THREE.CylinderGeometry(0.125, 0.11, 0.22, 20));
  rightThighSleeve.position.y = -0.11;
  rightThigh.add(rightThighSleeve);

  const rightThighCore = addSkin(new THREE.CylinderGeometry(0.115, 0.09, 0.46, 20));
  rightThighCore.position.y = -0.23;
  rightThigh.add(rightThighCore);

  const rightVastusLat = addSkin(new THREE.SphereGeometry(0.095, 16, 16));
  rightVastusLat.scale.set(0.85, 1.6, 0.95);
  rightVastusLat.position.set(0.05, -0.22, 0.02);
  rightThigh.add(rightVastusLat);

  const rightVastusMed = addSkin(new THREE.SphereGeometry(0.075, 16, 16));
  rightVastusMed.scale.set(0.9, 1.2, 0.95);
  rightVastusMed.position.set(-0.045, -0.34, 0.05);
  rightThigh.add(rightVastusMed);

  const rightQuadHighlight = addHeatmapMuscle(new THREE.CylinderGeometry(0.12, 0.095, 0.44, 18), 'quads');
  rightQuadHighlight.position.y = -0.23;
  rightThigh.add(rightQuadHighlight);

  const rightHamstring = addHeatmapMuscle(new THREE.SphereGeometry(0.095, 16, 16), 'hamstrings');
  rightHamstring.scale.set(0.85, 1.6, 0.95);
  rightHamstring.position.set(0, -0.24, -0.06);
  rightThigh.add(rightHamstring);

  const rightKnee = new THREE.Mesh(new THREE.SphereGeometry(0.078, 16, 16), jointSocketMat);
  rightKnee.position.y = -0.46;
  rightThigh.add(rightKnee);

  const rightPatella = addSkin(new THREE.SphereGeometry(0.042, 12, 12));
  rightPatella.position.set(0, 0, 0.06);
  rightKnee.add(rightPatella);

  const rightShin = new THREE.Group();
  rightKnee.add(rightShin);

  const rightCalfCore = addSkin(new THREE.CylinderGeometry(0.082, 0.058, 0.44, 18));
  rightCalfCore.position.y = -0.22;
  rightShin.add(rightCalfCore);

  const rightCalfMedial = addHeatmapMuscle(new THREE.SphereGeometry(0.07, 16, 16), 'calves');
  rightCalfMedial.scale.set(0.85, 1.5, 1.1);
  rightCalfMedial.position.set(0.02, -0.16, -0.05);
  rightShin.add(rightCalfMedial);

  const rightCalfLateral = addHeatmapMuscle(new THREE.SphereGeometry(0.065, 16, 16), 'calves');
  rightCalfLateral.scale.set(0.85, 1.4, 1.05);
  rightCalfLateral.position.set(-0.03, -0.16, -0.05);
  rightShin.add(rightCalfLateral);

  const rightFoot = new THREE.Group();
  rightFoot.position.set(0, -0.46, 0.06);
  rightShin.add(rightFoot);

  const rightShoeUpper = new THREE.Mesh(new THREE.BoxGeometry(0.125, 0.095, 0.25), shoeUpperMat);
  rightShoeUpper.position.y = 0.04;
  rightFoot.add(rightShoeUpper);
  clothingMeshes.push(rightShoeUpper);

  const rightShoeSole = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.035, 0.26), shoeSoleMat);
  rightShoeSole.position.y = -0.015;
  rightFoot.add(rightShoeSole);
  clothingMeshes.push(rightShoeSole);

  const rightShoeAccent = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.04), seamGlowMat);
  rightShoeAccent.position.set(0, 0.04, -0.11);
  rightFoot.add(rightShoeAccent);
  clothingMeshes.push(rightShoeAccent);

  // -------------------------------------------------------------
  // CALIBRATED OLYMPIC BARBELL & BUMPER PLATES
  // -------------------------------------------------------------
  const barbellGroup = new THREE.Group();
  scene.add(barbellGroup);

  const barShaftMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.92,
    roughness: 0.18,
  });
  const barShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.2, 24), barShaftMat);
  barShaft.rotation.z = Math.PI / 2;
  barShaft.castShadow = true;
  barbellGroup.add(barShaft);

  const knurlMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.85, roughness: 0.45 });
  const leftKnurl = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.42, 16), knurlMat);
  leftKnurl.rotation.z = Math.PI / 2;
  leftKnurl.position.x = -0.45;
  barbellGroup.add(leftKnurl);

  const rightKnurl = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.42, 16), knurlMat);
  rightKnurl.rotation.z = Math.PI / 2;
  rightKnurl.position.x = 0.45;
  barbellGroup.add(rightKnurl);

  const sleeveMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.95, roughness: 0.1 });
  const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.44, 20), sleeveMat);
  leftSleeve.rotation.z = Math.PI / 2;
  leftSleeve.position.x = -0.92;
  barbellGroup.add(leftSleeve);

  const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.44, 20), sleeveMat);
  rightSleeve.rotation.z = Math.PI / 2;
  rightSleeve.position.x = 0.92;
  barbellGroup.add(rightSleeve);

  const redPlateMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4, metalness: 0.2 });
  const bluePlateMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4, metalness: 0.2 });
  const hubMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.2 });

  const leftPlate1 = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.05, 32), redPlateMat);
  leftPlate1.rotation.z = Math.PI / 2;
  leftPlate1.position.x = -0.82;
  leftPlate1.castShadow = true;
  barbellGroup.add(leftPlate1);

  const leftHub1 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.052, 24), hubMat);
  leftHub1.rotation.z = Math.PI / 2;
  leftHub1.position.x = -0.82;
  barbellGroup.add(leftHub1);

  const leftPlate2 = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.045, 32), bluePlateMat);
  leftPlate2.rotation.z = Math.PI / 2;
  leftPlate2.position.x = -0.89;
  leftPlate2.castShadow = true;
  barbellGroup.add(leftPlate2);

  const rightPlate1 = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.05, 32), redPlateMat);
  rightPlate1.rotation.z = Math.PI / 2;
  rightPlate1.position.x = 0.82;
  rightPlate1.castShadow = true;
  barbellGroup.add(rightPlate1);

  const rightHub1 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.052, 24), hubMat);
  rightHub1.rotation.z = Math.PI / 2;
  rightHub1.position.x = 0.82;
  barbellGroup.add(rightHub1);

  const rightPlate2 = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.045, 32), bluePlateMat);
  rightPlate2.rotation.z = Math.PI / 2;
  rightPlate2.position.x = 0.89;
  rightPlate2.castShadow = true;
  barbellGroup.add(rightPlate2);

  const collarMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.7, roughness: 0.3 });
  const leftCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.025, 20), collarMat);
  leftCollar.rotation.z = Math.PI / 2;
  leftCollar.position.x = -0.93;
  barbellGroup.add(leftCollar);

  const rightCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.025, 20), collarMat);
  rightCollar.rotation.z = Math.PI / 2;
  rightCollar.position.x = 0.93;
  barbellGroup.add(rightCollar);

  // -------------------------------------------------------------
  // BENCH PRESS APPARATUS
  // -------------------------------------------------------------
  const benchGroup = new THREE.Group();
  scene.add(benchGroup);
  benchGroup.visible = false;

  const benchPadMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85, metalness: 0.1 });
  const benchFrameMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.6, roughness: 0.4 });

  const benchPad = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 1.25), benchPadMat);
  benchPad.position.set(0, 0.45, -0.15);
  benchPad.receiveShadow = true;
  benchPad.castShadow = true;
  benchGroup.add(benchPad);

  const benchLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), benchFrameMat);
  benchLeg1.position.set(0, 0.22, 0.35);
  benchGroup.add(benchLeg1);

  const benchLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), benchFrameMat);
  benchLeg2.position.set(0, 0.22, -0.65);
  benchGroup.add(benchLeg2);

  const leftStanchion = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 0.06), benchFrameMat);
  leftStanchion.position.set(-0.48, 0.55, 0.25);
  benchGroup.add(leftStanchion);

  const rightStanchion = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 0.06), benchFrameMat);
  rightStanchion.position.set(0.48, 0.55, 0.25);
  benchGroup.add(rightStanchion);

  // -------------------------------------------------------------
  // PULL-UP RIG
  // -------------------------------------------------------------
  const pullUpRig = new THREE.Group();
  scene.add(pullUpRig);
  pullUpRig.visible = false;

  const rigMat = new THREE.MeshStandardMaterial({ color: 0x242e28, metalness: 0.7, roughness: 0.3 });
  const leftPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.7, 16), rigMat);
  leftPost.position.set(-0.85, 1.35, 0);
  pullUpRig.add(leftPost);

  const rightPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.7, 16), rigMat);
  rightPost.position.set(0.85, 1.35, 0);
  pullUpRig.add(rightPost);

  const pullBar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 16), barShaftMat);
  pullBar.rotation.z = Math.PI / 2;
  pullBar.position.set(0, 2.45, 0);
  pullUpRig.add(pullBar);

  // -------------------------------------------------------------
  // THEME SWITCHER
  // -------------------------------------------------------------
  const setTheme = (theme: 'athlete' | 'anatomy' | 'cyber') => {
    if (theme === 'athlete') {
      athleteSkinMat.color.setHex(0xd49b7a);
      athleteSkinMat.roughness = 0.52;
      athleteSkinMat.metalness = 0.08;

      shortsMat.color.setHex(0x141a17);
      shortsMat.roughness = 0.75;
      shortsMat.metalness = 0.15;

      seamGlowMat.color.setHex(0x00ff87);
      seamGlowMat.emissive.setHex(0x00ff87);
      seamGlowMat.emissiveIntensity = 0.6;
    } else if (theme === 'anatomy') {
      athleteSkinMat.color.setHex(0x27312b);
      athleteSkinMat.roughness = 0.65;
      athleteSkinMat.metalness = 0.2;

      shortsMat.color.setHex(0x111613);
      shortsMat.roughness = 0.85;
      shortsMat.metalness = 0.1;

      seamGlowMat.color.setHex(0x38bdf8);
      seamGlowMat.emissive.setHex(0x38bdf8);
      seamGlowMat.emissiveIntensity = 0.9;
    } else if (theme === 'cyber') {
      athleteSkinMat.color.setHex(0x1f2937);
      athleteSkinMat.roughness = 0.35;
      athleteSkinMat.metalness = 0.65;

      shortsMat.color.setHex(0x0f172a);
      shortsMat.roughness = 0.5;
      shortsMat.metalness = 0.8;

      seamGlowMat.color.setHex(0x38bdf8);
      seamGlowMat.emissive.setHex(0x38bdf8);
      seamGlowMat.emissiveIntensity = 1.0;
    }
  };

  const updateMuscleActivation = (intensity: number, targetExerciseId: string) => {
    // Dynamic contraction intensity pulse
    const baseEmissive = 0.5 + intensity * 0.5;
    Object.values(muscleMaterials).forEach((mat) => {
      mat.emissiveIntensity = baseEmissive;
    });
  };

  // -------------------------------------------------------------
  // DYNAMIC INTERACTIVE MUSCLE ACTIVATION HEATMAP CONTROLLER
  // -------------------------------------------------------------
  const applyHeatmap = (
    heatmap: ExerciseMuscleHeatmap,
    mode: 'heatmap' | 'standard' | 'isolation',
    isolatedMuscleId?: MuscleId | null,
    dynamicIntensity: number = 0.5
  ) => {
    const muscleIds = Object.keys(muscleGroupMap) as MuscleId[];

    muscleIds.forEach((muscleId) => {
      const meshes = muscleGroupMap[muscleId];
      const info = heatmap.muscles[muscleId];
      const mat = muscleMaterials[muscleId];
      if (!info || !mat) return;

      if (mode === 'heatmap') {
        // Full scientific EMG thermodynamic spectrum
        const heat = getHeatColorForEMG(info.emgPercent);
        mat.color.setHex(heat.num);
        mat.emissive.setHex(heat.num);

        // Dynamic concentric contraction pulse (stronger pulse on high EMG muscles)
        const pulseFactor = (info.emgPercent / 100) * dynamicIntensity * 0.5;
        mat.emissiveIntensity = Math.min(1.4, 0.4 + (info.emgPercent / 100) * 0.5 + pulseFactor);
        mat.opacity = info.emgPercent >= 35 ? 0.92 : 0.35;

        meshes.forEach((m) => {
          m.visible = true;
        });
      } else if (mode === 'isolation') {
        if (isolatedMuscleId === muscleId) {
          // Radiant glowing focal muscle
          mat.color.setHex(0xffea00); // radiant glowing gold
          mat.emissive.setHex(0xffea00);
          mat.emissiveIntensity = 1.1 + dynamicIntensity * 0.4;
          mat.opacity = 1.0;
          meshes.forEach((m) => (m.visible = true));
        } else {
          // Dim all other non-isolated muscles
          mat.color.setHex(0x18241e);
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0.05;
          mat.opacity = 0.15;
          meshes.forEach((m) => (m.visible = isolatedMuscleId ? false : info.role === 'primary'));
        }
      } else {
        // Standard bio highlight mode
        const isPrimary = info.role === 'primary';
        const isSecondary = info.role === 'secondary';
        mat.color.setHex(isPrimary ? 0x00ff87 : 0x06b6d4);
        mat.emissive.setHex(isPrimary ? 0x00ff87 : 0x06b6d4);
        mat.emissiveIntensity = isPrimary ? 0.75 + dynamicIntensity * 0.3 : 0.45;
        mat.opacity = isPrimary ? 0.92 : 0.75;
        meshes.forEach((m) => {
          m.visible = isPrimary || isSecondary;
        });
      }
    });
  };

  return {
    root,
    pelvis,
    spine,
    chest,
    neck,
    head,
    leftArm,
    leftForearm,
    leftHand,
    rightArm,
    rightForearm,
    rightHand,
    leftThigh,
    leftShin,
    leftFoot,
    rightThigh,
    rightShin,
    rightFoot,
    barbellGroup,
    benchGroup,
    pullUpRig,
    dumbbellsGroup: new THREE.Group(),
    primaryMuscleMeshes,
    secondaryMuscleMeshes,
    skinMeshes,
    clothingMeshes,
    interactiveMuscleMeshes,
    muscleGroupMap,
    setTheme,
    updateMuscleActivation,
    applyHeatmap
  };
}
