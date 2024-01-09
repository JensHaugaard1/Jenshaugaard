



import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { DeviceOrientationControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/DeviceOrientationControls.js';


const startButton = document.getElementById( 'startButton' );
    var fadingText = document.getElementById('thing').style;
    fadingText.opacity = 1;
    function fade()
    {
        (fadingText.opacity-=.01)<0?fadingText.display="none":setTimeout(fade,100)
    }

startButton.addEventListener( 'click', function () {

    const overlay = document.getElementById( 'overlay' );
    overlay.remove();
    
    init();
    animate();
    fade();
} );


//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
//const camera = new THREE.OrthographicCamera( 1080 / - 6, 1080 / 6, 1080 / 6, 1080 / - 6, 1, 1000 );
const camera = new THREE.PerspectiveCamera(40, 1 / 1, 0.1, 1000);



//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'eye';


const progressBar = document.getElementById( 'progressBar' );


const loader = new GLTFLoader();



function init() {

//Load the file
loader.load(
  `models/DL2.gltf`,
 
  function (gltf) {
    progressBar.style.display = 'none'
    object = gltf.scene;
    scene.add(gltf.scene)
},
(xhr) => {
    const percentComplete = (xhr.loaded / xhr.total) * 100
    progressBar.value = percentComplete === Infinity ? 100 : percentComplete
}
);




//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); //Alpha: true allows for the transparent background
renderer.setSize(1280, 1280);



//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.set(0,0,20); // Set position like this
camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff , 2); // (color, intensity)
topLight.position.set(1000, 1000, 2000) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const topLight2 = new THREE.DirectionalLight(0x404040, 7); // (color, intensity)
topLight2.position.set(-1000, -200, 500) //top-left-ish
topLight2.castShadow = true;
scene.add(topLight2);



const light = new THREE.AmbientLight( 0x404040, 8 ); // soft white light
light.castShadow = true;
scene.add( light );


//This adds controls to the camera, so we can rotate / zoom it with the mouse


 
 controls = new DeviceOrientationControls(camera, renderer.domElement);
//controls = new OrbitControls(camera, renderer.domElement);
 




//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
 
 // object.rotation.x = 1.55;
 renderer.setPixelRatio(window.devicePixelRatio);
 
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=0.6;
 //controls.update();


  renderer.render(scene, camera);
}



//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = 1080 / 1080;
  camera.updateProjectionMatrix();
  
  renderer.setSize(1080, 1080);
});

window.addEventListener('deviceorientation', function(e) {
  var gammaRotation = e.gamma ? e.gamma * (Math.PI / 180) : 0;
  object.rotation.y = gammaRotation / 1.5;

  var betaRotation = e.beta ? e.beta * (Math.PI / 180) : 0;
  object.rotation.x = (betaRotation / 1.5) - 0.5;
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  var mouseX = e.clientX;
  var mouseY = e.clientY;

  object.rotation.y = (-0.5 + mouseX / window.innerWidth) / 1.5;
  object.rotation.x = (-0.5 + mouseY / window.innerHeight) / 1.5;

}


//Start the 3D rendering
animate();

}



//---------------------------------------------------






