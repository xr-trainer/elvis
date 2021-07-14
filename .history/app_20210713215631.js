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
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const glitchPass = new GlitchPass();


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

const loader = new GLTFLoader();
loader.load(
    './models/gltf/next_prev_btn.glb',
    function (gltf){
        scene.add(gltf.scene);
    },
    undefined,
    function (error){
        console.error(error);
    }
);

camera.position.z = 5;
controls.update();

function animate(){
    controls.update();
    renderer.setAnimationLoop(function(){
        composer.render();
    });
}

// if(WebGLCheck.isWebGLAvailable()){
    animate();
// } else{
//     const warning = WEBGL.getWebGLErrorMessage();
//     document.getElementById('container').appendChild(warning);
// }