import * as THREE from 'three';
import { checkStoryTriggers } from "./Story.js";
import { soundChange } from "./Sound_On_Off.js";
import { soundOn } from "./Sound_On_Off.js";
import "./Models.js";
import "./Three.FirstPersonControls";
import $ from "jquery";
import "./images/tiledfloor.jpg"; import "./images/wood1.jpg"; import "./images/wallb.jpg";
import "./sounds/intro_song.mp3"; import "./sounds/ambient_song.mp3"; import "./sounds/steps_center.mp3"; import "./sounds/panic_heartbeat.mp3"; import "./sounds/slowing_to_slow.mp3";
import { CameraHelper } from 'three';
// new table texture, new wall texture
import './images/woodtable1.jpg'; import './images/bricksseamless.jpg'
//wheelchair textures 
import "./images/wheelchair/wheel.png"; import './images/wheelchair/tire.png'; import './images/wheelchair/leather.jpg'; import './images/wheelchair/back.jpeg'; import './images/wheelchair/steel1.jpeg';
//surgery table textures
import './images/surgery/slab2.jpg'; import './images/surgery/slab3.jpg'; import './images/surgery/surgerytools.jpg'
// door textures
import './images/doors/brassknob.jpg'; import './images/doors/metaldoor-fixed.jpg'; import './images/doors/door931-fixed.jpg'
// key textures
import './images/gold.jpg'


/**
 * Notes:
 * - Coordinates are specified as (X, Y, Z) where X and Z are horizontal and Y
 *   is vertical
 */


export var map =
	[ // 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 2
		[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 3
		[1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], // 4
		[1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], // 5
		[1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 6
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], // 7
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], // 8
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 9
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], // 10
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], // 11
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1], // 12
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // 13
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1], // 14
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1], // 15
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 16
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1], // 17
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1], // 18
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1], // 19
		[1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1], // 20
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 21
		[1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 22
		[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 23
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 24
	], mapW = map.length;

// Semi-constants
var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	ASPECT = WIDTH / HEIGHT,
	UNITSIZE = 250,
	WALLHEIGHT = UNITSIZE * 3,
	MOVESPEED = 700,
	LOOKSPEED = 0.075


// Global vars
var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin, listener;
var runAnim = true, mouse = { x: 0, y: 0 };

$(document).ready(function() {
	$('body').append('<div id="intro">I remember it like a distant dream.My short term memory serves me well,but my long-term memory is patchily bringing rememberances of a life out there.I was a student of biology. He told a grandiose story of the ultimate experiment. Young and naive I followed him to this place. Where I have been for an untold amount of time.</div>');
	$('#intro').css({width: WIDTH, height: HEIGHT}).one('click', function(e) {
		e.preventDefault();
		$(this).fadeOut();
		init();
		setInterval(drawRadar, 1000);
		animate();
	});

	
});


// Setup
function init() {
	clock = new t.Clock(); // Used in render() for controls.update()
	scene = new t.Scene(); // Holds all objects in the canvas
	scene.fog = new t.FogExp2(0x000000, 0.0005); // color, density

	// Set up camera
	cam = new t.PerspectiveCamera(60, ASPECT, 1, 10000); // FOV, aspect, near, far
	cam.position.y = UNITSIZE * 1.5;
	cam.position.x = UNITSIZE * 6;
	cam.position.z = UNITSIZE * 1;
	scene.add(cam);

	// Camera moves with mouse, flies around with WASD/arrow keys
	controls = new t.FirstPersonControls(cam);
	controls.movementSpeed = MOVESPEED;
	controls.lookSpeed = LOOKSPEED;
	controls.lookVertical = false; // Temporary solution; play on flat surfaces only
	controls.noFly = true;

	// listener = new t.AudioListener();
	// console.log(listener);
	// cam.add(listener);


	// var listener = new THREE.AudioListener();
	// cam.add(listener);

	// var sound = new THREE.Audio(listener);

	// var audioLoader = new THREE.AudioLoader();

	// var loaderLoader = new THREE.AudioLoader();

	// World objects
	setupScene();



	// audioLoader.load('./assets/sounds/ambient_song.mp3', function (buffer) {
	// 	sound.setBuffer(buffer);
	// 	sound.setLoop(true);
	// 	sound.setVolume(0.5);
	// 	sound.play();
	// });





	// Handle drawing as WebGL (faster than Canvas but less supported)
	renderer = new t.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;


	// Add the canvas to the document
	renderer.domElement.style.backgroundColor = '#D6F1FF'; // easier to see
	document.body.appendChild(renderer.domElement);

	// Track mouse position so we know where to shoot
	document.addEventListener('mousemove', onDocumentMouseMove, false);

	// Shoot on click
	$(document).click(function (e) {
		e.preventDefault;
	});

	// Display HUD
	// $('body').append('<canvas id="radar" width="200" height="200"></canvas>');
	// $('body').append('<div id="hud"><p>Health: <span id="health">100</span><br />Score: <span id="score">0</span></p></div>');
	$('body').append('<div id="credits"><p>Created by <a href="http://www.isaacsukin.com/">Isaac Sukin</a> using <a href="http://mrdoob.github.com/three.js/">Three.js</a><br />WASD to move, mouse to look, click to shoot</p></div>');

	// Set up "hurt" flash
	$('body').append('<div id="hurt"></div>');
	$('#hurt').css({ width: WIDTH, height: HEIGHT, });
}

// create an AudioListener and add it to the camera

// // create a global audio source
// console.log(listener);
// var sound = new t.Audio(listener);

// // load a sound and set it as the Audio object's buffer
// var audioLoader = new t.AudioLoader();
// audioLoader.load('./sounds/scary_flashback.mp3', function (buffer) {
// 	sound.setBuffer(buffer);
// 	sound.setLoop(true);
// 	sound.setVolume(0.5);
// 	sound.play();
// });

// Helper function for browser frames
function animate() {
	if (runAnim) {
		requestAnimationFrame(animate);
	}
	render();
}

// Update and display
function render() {
	$("#credits p").text(`${cam.position.x}, ${cam.position.z}`);
	checkStoryTriggers(cam);
	soundChange(cam);
	scene.children[1].position.x = cam.position.x;
	scene.children[1].position.z = cam.position.z;




	// if (cam.position.x > 2000) {
	// 	scene.__lights[0].intensity = 0;
	// 	scene.__lights[1].intensity = 0;
	// }
	// else if (cam.position.x <= 2000) {
	// 	scene.__lights[0].intensity = 0.5;
	// 	scene.__lights[1].intensity = 1;
	// }

	var delta = clock.getDelta();
	controls.update(delta); // Move camera


	renderer.render(scene, cam); // Repaint

	// Death
	// if (health <= 0) {
	// 	runAnim = false;
	// 	$(renderer.domElement).fadeOut();
	// 	$('#radar, #hud, #credits').fadeOut();
	// 	$('#intro').fadeIn();
	// 	$('#intro').html('Ouch! Click to restart...');
	// 	$('#intro').one('click', function () {
	// 		location = location;
	// 	});
	// }
}

// Set up the objects in the world
function setupScene() {
	var UNITSIZE = 250, units = mapW;

	// Lighting
	var flashlight = new THREE.PointLight(0xffffff, 1, 1500, 1);
	flashlight.position.set(1100, 525, 320);
	flashlight.target = cam;
	scene.add(flashlight);


	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.01);
	directionalLight.position.set(0, 1, 0);
	scene.add(directionalLight);



	// Geometry: floor
	var floor = new t.Mesh(
		new t.CubeGeometry(units * UNITSIZE, 10, units * UNITSIZE),
		new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("./assets/images/tiledfloor.jpg") }),
	);
	scene.add(floor);

	// Geometry: ceiling
	var ceiling = new t.Mesh(
		new t.CubeGeometry(units * UNITSIZE, 10, units * UNITSIZE),
		new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("./assets/images/tiledfloor.jpg") }),
	);
	ceiling.position.y = 750;
	scene.add(ceiling);


	//Geometry: walls
	let myWalls = [[2245, 2000, 750, -750, -125], [2245, 2000, 750, 500, 1255], [2245, 2000, 750, -125, 500], [1750, 1000, 750, 750, 500], [1000, 250, 750, 750, 500],
	/*East Wall*/	[2775, 2850, 750, -3005, -2250], [2775, 2850, 750, -2250, -1500],	[2775, 2850, 750, -1500, -750], [2775, 2850, 750, -750, 0], [2775, 2850, 750, 0, 750], [2775, 2850, 750, 750, 1500], [2000, 2775, 750, -3005, -3080],
	/*N Wall */		[1250, 2000, 750, -3005, -3080], [500, 1250, 750, -3005, -3080], [-250, 500, 750, -3005, -3080], [-1000, -250, 750, -3005, -3080], [-1750, -1000, 750, -3005, -3080], [-2500, -1750, 750, -3005, -3080],	[-3250, -2500, 750, -3005, -3080],
	/*W Wall*/		[-3005, -3150, 750, -3005, -2250], [-3005, -3150, 750, -2250, -1500],	[-3005, -3150, 750, -1500, -750], [-3005, -3150, 750, -750, 0], [-3005, -3150, 750, 0, 750], [-3005, -3150, 750, 750, 1500],
	/*S Wall*/		[1250, 2000, 750, 1255, 1330], [500, 1250, 750, 1255, 1330], [-250, 500, 750, 1255, 1330], [-1000, -250, 750, 1255, 1330], [-1750, -1000, 750, 1255, 1330], [-2500, -1750, 750, 1255, 1330],	[-3250, -2500, 750, 1255, 1330], [2775, 2000, 750, 1255, 1330],
								[750, 250, 750, 250, 500], [1000, 750, 750, -250, 500], [1000, 750, 750, -250, -1000], [1000, 750, 750, -1000, -1750], [1000, 750, 750, -1750, -2495], [2255, 2775, 750, -1255, -1495],
								[1000, 500, 750, -250], [2255, 2495, 750, -1495, -2250], [2495, 1875, 750, -2250, -2495], [1255, 1875, 750, -2250, -2495], [1995, 1775, 750, -2000, -1250], [1000, 2000, 750, -250, -745],
								[1775, 1995, 750, -1250, -750],[1255, 1500, 750, -2250, -1675], [1255, 1500, 750, -1675, -1000], [-250, 250, 750, -5, -245], [750, 250, 750, -5, -245],
								[-250, 250, 750, -1755, -1995], [750, 250, 750, -1755, -1995], [750, 250, 750, -2255, -2495], [-2555, -2745, 750, 745, 0], [-2555, -2745, 750, -750, 0],
								[-2555, -2745, 750, -2250, -1750],[-2555, -2745, 750, -1750, -1000], [-5, -500, 750, 255, 745], [-500, -1000, 750, 505, 745], [-1000, -1675, 750, 745, 505],
								[-2245, -1675, 750, 745, 505],[-2555,-1745, 750, -255, -495],[-1745, -1505, 750, 505, -250], [-1745, -1505, 750, -1000, -250], [-1745, -1505, 750, -1000, -1745],
								[-2745, -2000, 750, -2250, -2495],[-2000, -1505, 750, -2250, -2495],[-2245, -1505, 750, -2005, -2250],[-2555, -1745, 750, -1495, -1255],
								[-2245, -1745, 750, -1500, -1745],[-255, -995, 750, -2495, -2255],[-755, -995, 750, 500, -250],[-755, -995, 750, -1000, -250],
								[-755, -995, 750, -1000, -1675],[-755, -995, 750, -2255, -1675]];

	for (let i = 0; i < myWalls.length; i++){
		var aWall = new t.wall(myWalls[i][0], myWalls[i][1], myWalls[i][2], myWalls[i][3], myWalls[i][4]);
		scene.add(aWall);
}
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function getMapSector(v) {
	var x = Math.floor((v.x + UNITSIZE / 2) / UNITSIZE + mapW / 2);
	var z = Math.floor((v.z + UNITSIZE / 2) / UNITSIZE + mapW / 2);
	return { x: x, z: z };
}

/**
 * Check whether a Vector3 overlaps with a wall.
 *
 * @param v
 *   A THREE.Vector3 object representing a point in space.
 *   Passing cam.position is especially useful.
 * @returns {Boolean}
 *   true if the vector is inside a wall; false otherwise.
 */
function checkWallCollision(v) {
	var c = getMapSector(v);
	return map[c.x][c.z] > 0;
}

// Radar
function drawRadar() {
	var c = getMapSector(cam.position), context = document.getElementById('radar').getContext('2d');
	context.font = '10px Helvetica';
	for (var i = 0; i < mapW; i++) {
		for (var j = 0, m = map[i].length; j < m; j++) {

			if (i == c.x && j == c.z) {
				context.fillStyle = '#AA33FF';
				context.fillRect(i * 8, j * 8, (i + 1) * 8, (j + 1) * 8);
			}
			// else if (d > 0 && d < 10) {
			// 	context.fillStyle = '#FF0000';
			// 	context.fillRect(i * 20, j * 20, (i+1)*20, (j+1)*20);
			// 	context.fillStyle = '#000000';
			// 	context.fillText(''+d, i*20+8, j*20+12);
			// }
			else if (map[i][j] > 0) {
				context.fillStyle = '#666666';
				context.fillRect(i * 8, j * 8, (i + 1) * 8, (j + 1) * 8);
			}
			else {
				context.fillStyle = '#CCCCCC';
				context.fillRect(i * 8, j * 8, (i + 1) * 8, (j + 1) * 8);
			}
		}
	}
}

function onDocumentMouseMove(e) {
	e.preventDefault();
	mouse.x = (e.clientX / WIDTH) * 2 - 1;
	mouse.y = - (e.clientY / HEIGHT) * 2 + 1;
}

// Handle window resizing
$(window).resize(function () {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	ASPECT = WIDTH / HEIGHT;
	if (cam) {
		cam.aspect = ASPECT;
		cam.updateProjectionMatrix();
	}
	if (renderer) {
		renderer.setSize(WIDTH, HEIGHT);
	}
	$('#intro, #hurt').css({ width: WIDTH, height: HEIGHT, });
});

// Stop moving around when the window is unfocused (keeps my sanity!)
$(window).focus(function () {
	if (controls) controls.freeze = false;
});
$(window).blur(function () {
	if (controls) controls.freeze = true;
});

//Get a random integer between lo and hi, inclusive.
//Assumes lo and hi are integers and lo is lower than hi.
function getRandBetween(lo, hi) {
	return parseInt(Math.floor(Math.random() * (hi - lo + 1)) + lo, 10);
}

$(document).ready(function () {
	// $('body').append('<div id="intro">Click to start</div>');
	// $('#intro').css({ width: WIDTH, height: HEIGHT }).one('click', function (e) {
	// 	e.preventDefault();
	// 	$(this).fadeOut();
	init();
	setInterval(drawRadar, 1000);
	animate();

});