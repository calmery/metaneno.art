import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import GLTFLoader from "three-gltf-loader";
import { WorksCollection } from "~/types/contentful";
import { Box3, Vector3, sRGBEncoding, AnimationMixer } from "three";

// Shader

const fragmentShader = `
uniform sampler2D tBackground;

varying vec2 vUv;

void main() {
  vec4 backgroundColor = texture2D(tBackground, vUv);
  gl_FragColor = backgroundColor;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 newPosition = position;
  newPosition.z = 1.0;
  gl_Position = vec4(newPosition, 1.0);
}
`;

// Three

const WIDTH = 1000;
const HEIGHT = 1000;

const animation = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  requestAnimationFrame(() => animation(renderer, scene, camera));
  renderer.outputEncoding = THREE.GammaEncoding;
  renderer.render(scene, camera);
};

const getAxes = () => {
  return new THREE.AxesHelper(25);
};

const getCamera = (element: HTMLDivElement) => {
  const camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 0.1, 200);
  camera.position.copy(new THREE.Vector3(1, 1, 1));

  const orbitControls = new OrbitControls(camera, element);
  orbitControls.enabled = true;
  orbitControls.minDistance = 2;
  orbitControls.maxDistance = 8;
  orbitControls.minPolarAngle = 0.75;
  orbitControls.maxPolarAngle = 1.5;

  return camera;
};

const getCube = () => {
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 0.05;

  return mesh;
};

const getFloor = () => {
  const floor = new THREE.Object3D();
  floor.matrixAutoUpdate = false;

  const topLeft = new THREE.Color("#f5883c");
  const topRight = new THREE.Color("#ff9043");
  const bottomRight = new THREE.Color("#fccf92");
  const bottomLeft = new THREE.Color("#f5aa58");

  const data = new Uint8Array([
    Math.round(bottomLeft.r * 255),
    Math.round(bottomLeft.g * 255),
    Math.round(bottomLeft.b * 255),
    Math.round(bottomRight.r * 255),
    Math.round(bottomRight.g * 255),
    Math.round(bottomRight.b * 255),
    Math.round(topLeft.r * 255),
    Math.round(topLeft.g * 255),
    Math.round(topLeft.b * 255),
    Math.round(topRight.r * 255),
    Math.round(topRight.g * 255),
    Math.round(topRight.b * 255),
  ]);

  const backgroundTexture = new THREE.DataTexture(data, 2, 2, THREE.RGBFormat);
  backgroundTexture.magFilter = THREE.LinearFilter;
  backgroundTexture.needsUpdate = true;

  const floorGeometry = new THREE.PlaneBufferGeometry(2, 2, 10, 10);
  const floorMaterial = new THREE.ShaderMaterial({
    wireframe: false,
    transparent: false,
    uniforms: {
      tBackground: { value: null },
    },
    vertexShader,
    fragmentShader,
  });

  floorMaterial.uniforms.tBackground.value = backgroundTexture;

  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.frustumCulled = false;
  floorMesh.matrixAutoUpdate = false;

  floor.add(floorMesh);

  return floor;
};

const getGridHelper = () => {
  return new THREE.GridHelper(10, 100);
};

const getRenderer = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);

  return renderer;
};

export const application = async (
  element: HTMLDivElement,
  works: WorksCollection
) => {
  const renderer = getRenderer();

  // Scene

  const scene = new THREE.Scene();

  scene.add(getAxes());
  scene.add(getCube());
  scene.add(getFloor());
  scene.add(getGridHelper());

  // const light = new THREE.AmbientLight(0xFFFFFF, 0.3);
  // scene.add(light);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(10, 0, 10);
  light.castShadow = true;

  scene.add(light);

  animation(renderer, scene, getCamera(element));
  element.appendChild(renderer.domElement);

  return await Promise.all<{
    title: string;
    model: {
      position: {
        x: number;
        y: number;
        z: number;
      };
      rotate: {
        x: number;
        y: number;
        z: number;
      };
      scale: {
        x: number;
        y: number;
        z: number;
      };
      size: {
        x: number;
        y: number;
        z: number;
      };
    };
  }>(
    works.data.worksCollection.items.map(({ title, model }) => {
      return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.setCrossOrigin("anonymous");

        loader.load(model.file.url, (gltf) => {
          const s = gltf.scene || gltf.scenes[0];
          const clips = gltf.animations || [];

          s.rotateX(model.rotateX);
          s.rotateY(model.rotateY);
          s.rotateZ(model.rotateZ);
          s.scale.x = model.scaleX;
          s.scale.y = model.scaleY;
          s.scale.z = model.scaleZ;

          const box = new Box3().setFromObject(s);
          const size = box.getSize(new Vector3());
          const center = box.getCenter(new Vector3());

          s.position.x = model.positionX;
          s.position.y = model.positionY;
          s.position.z = model.positionZ;

          s.position.x -= center.x;
          s.position.y -= center.y;
          s.position.z -= center.z;

          // オブジェクトは中心が 0 に合うので半分上にズラす
          s.position.y += size.y / 2;

          // Animation

          const animationMixer = new AnimationMixer(s);

          clips.forEach((clip) => {
            animationMixer.clipAction(clip).reset().play();
          });

          scene.add(s);

          resolve({
            title,
            model: {
              position: s.position,
              rotate: {
                x: model.rotateX,
                y: model.rotateY,
                z: model.rotateZ,
              },
              scale: s.scale,
              size,
            },
          });
        });
      });
    })
  );
};