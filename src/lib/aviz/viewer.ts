import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createCadModel } from "./cad-model.js";

export async function mountViewer(host: HTMLElement) {
  const response = await fetch("/models/aviz-mk1/prototype.json");
  if (!response.ok) throw new Error("Model could not be loaded");
  const { meshes, vehicle } = await response.json();
  const { body, tiltGroups } = createCadModel(meshes, vehicle);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e9eddf");
  scene.add(body);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x68736b, 3));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(1, -2, 3);
  scene.add(key);
  const bounds = new THREE.Box3().setFromObject(body);
  const center = bounds.getCenter(new THREE.Vector3());
  const radius = bounds.getSize(new THREE.Vector3()).length() / 2;
  const camera = new THREE.PerspectiveCamera(35, 1, radius / 100, radius * 30);
  camera.up.set(0, 0, 1);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute(
    "aria-label",
    "Aviz Mk1 CAD model. Drag to rotate; use the controls below to zoom and tilt.",
  );
  host.append(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false; // Keep wheel scrolling available for the page.
  controls.minDistance = radius * 1.5;
  controls.maxDistance = radius * 8;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.onkeydown = (event) => {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    const offset = camera.position.clone().sub(controls.target);
    const horizontal = event.key === "ArrowLeft" || event.key === "ArrowRight";
    const axis = horizontal
      ? new THREE.Vector3(0, 0, 1)
      : new THREE.Vector3().crossVectors(offset, camera.up).normalize();
    offset.applyAxisAngle(
      axis,
      (event.key === "ArrowLeft" || event.key === "ArrowUp" ? 1 : -1) * 0.15,
    );
    camera.position.copy(controls.target).add(offset);
    controls.update();
  };
  const render = () => renderer.render(scene, camera);
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  const reset = () => {
    camera.position
      .copy(center)
      .add(
        new THREE.Vector3(1.1, -1.4, 1)
          .normalize()
          .multiplyScalar(radius * 3.1),
      );
    controls.target.copy(center);
    controls.update();
    render();
  };
  controls.addEventListener("change", render);
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  reset();
  resize();
  return {
    reset,
    tilt(degrees: number) {
      tiltGroups.forEach((group: THREE.Group, i: number) =>
        group.quaternion.setFromAxisAngle(
          new THREE.Vector3(...vehicle.tilt_axes[i]).normalize(),
          THREE.MathUtils.degToRad(degrees),
        ),
      );
      render();
    },
    zoom(factor: number) {
      const offset = camera.position.clone().sub(controls.target);
      offset.setLength(
        THREE.MathUtils.clamp(
          offset.length() * factor,
          controls.minDistance,
          controls.maxDistance,
        ),
      );
      camera.position.copy(controls.target).add(offset);
      controls.update();
      render();
    },
    dispose() {
      observer.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
