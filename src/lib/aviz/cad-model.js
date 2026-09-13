import * as THREE from 'three';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';

/** Assemble the preserved Fusion meshes using the shared CAD joint positions. */
export function createCadModel(meshes, vehicle, {frontColor = 0xba4835, rearColor = 0x596c80} = {}) {
  const loader = new STLLoader();
  const body = new THREE.Group();
  const tiltGroups = [], rotorGroups = [];
  function mesh(name, color) {
    const bytes = Uint8Array.from(atob(meshes[name]), character => character.charCodeAt(0));
    const geometry = loader.parse(bytes.buffer);
    geometry.computeVertexNormals();
    return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color, metalness: .25, roughness: .62}));
  }
  body.add(mesh('base_link', 0x424e5b));
  for (let i = 0; i < 4; i++) {
    const tilt = new THREE.Group();
    tilt.position.fromArray(vehicle.pivots[i]);
    body.add(tilt);
    tilt.add(mesh(`tilt_${i + 1}_link`, i === 0 || i === 3 ? frontColor : rearColor));
    const rotor = new THREE.Group();
    rotor.position.fromArray(vehicle.rotor_positions[i]).sub(tilt.position);
    tilt.add(rotor);
    rotor.add(mesh(`rotor_${i + 1}_link`, 0x17212b));
    tiltGroups.push(tilt);
    rotorGroups.push(rotor);
  }
  return {body, tiltGroups, rotorGroups};
}
