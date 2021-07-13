/* Import libraries */
import * as THREE from './build/THREE/three.module.js';
// import WebGLCheck from './build/THREE/jsm/WebGL.js';
import { OrbitControls } from './build/THREE/jsm/controls/OrbitControls.js';
import {VRButton} from './build/THREE/jsm/webxr/VRButton.js';

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

camera.position.z = 5;
controls.update();

document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;

function animate(){
    controls.update();
    renderer.setAnimationLoop(function(){
        renderer.render(scene, camera);
    });
}

// if(WebGLCheck.isWebGLAvailable()){
    animate();
// } else{
//     const warning = WEBGL.getWebGLErrorMessage();
//     document.getElementById('container').appendChild(warning);
// }