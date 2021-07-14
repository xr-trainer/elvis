/* Import libraries */
import * as THREE from './build/THREE/three.module.js';
// import WebGLCheck from './build/THREE/jsm/WebGL.js';
import { OrbitControls } from './build/THREE/jsm/controls/OrbitControls.js';
import {VRButton} from './build/THREE/jsm/webxr/VRButton.js';
import {GLTFLoader} from './build/THREE/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './build/THREE/jsm/loaders/DRACOLoader.js';
import {EffectComposer} from './build/THREE/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from './build/THREE/jsm/postprocessing/RenderPass.js';
import {GlitchPass} from './build/THREE/jsm/postprocessing/GlitchPass.js';
import {ShaderPass} from './build/THREE/jsm/postprocessing/ShaderPass.js';
import {LuminosityShader} from './build/THREE/jsm/shaders/LuminosityShader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.y = 1.6;
controls.update();

function render(time){
    time *= 0.001;

    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(render);