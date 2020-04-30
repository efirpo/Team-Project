import * as THREE from 'three';
import { checkStoryTriggers } from "./Story.js";
import { soundChange } from "./Story.js";
import "./Models.js";
import "./Three.FirstPersonControls";
import $ from "jquery";
import "./images/tiledfloor.jpg"; import "./images/wood1.jpg"; import "./images/wallb.jpg";
import "./sounds/intro_song.mp3"; import "./sounds/ambient_song.mp3"; import "./sounds/steps_center.mp3"; import "./sounds/panic_heartbeat.mp3"; import "./sounds/slowing_to_slow.mp3";
import { CameraHelper } from 'three';
// new table texture, new wall texture
import './images/woodtable1.jpg'; import './images/bricksseamless.jpg';
//wheelchair textures 
import "./images/wheelchair/wheel.png"; import './images/wheelchair/tire.png'; import './images/wheelchair/leather.jpg'; import './images/wheelchair/back.jpeg'; import './images/wheelchair/steel1.jpeg';
//surgery table textures
import './images/surgery/slab2.jpg'; import './images/surgery/slab3.jpg'; import './images/surgery/surgerytools.jpg';
// door textures
import './images/doors/brassknob.jpg'; import './images/doors/metaldoor-fixed.jpg'; import './images/doors/door931-fixed.jpg';
// key textures
import './images/gold.jpg';
//bed textures
import './images/dirty-cloth.jpg';
//chair textures
import './images/chairwood.jpg';
import './images/escape_texture.jpg';
import './images/doorbricks.jpg';


/**
 * Notes:
 * - Coordinates are specified as (X, Y, Z) where X and Z are horizontal and Y
 *   is vertical
 */


export var map =
	[ // 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 2
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
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1], // 13
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
	MOVESPEED = 1000,
	LOOKSPEED = 0.075;


// Global vars
export var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin, listener;
var runAnim = true, mouse = { x: 0, y: 0 };

$(document).ready(function () {
	var gameStarted = false;

	$('body').append(`<div id="intro">How long has it been?<br> 
<br>
	I haven't had an injection since God knows when. <br>
	<br>
	I long for the purpose that I felt under master's loving care, and now that purpose has given way to a sense of dread.<br>
	<br>
	I am lost. <br>
	<br>
	Doubt crawls through my veins where once was warmth. <br>
	<br>
	How long have I been within these walls...</div>`);

	$("#intro").css("background-image", "linear-gradient( #777d78, #474d48, #000000)");

	$('#intro').css({ height: HEIGHT }).on('click', function (e) {

		e.preventDefault();
		$(this).fadeOut();
		if (!gameStarted) {
			init();
			animate();
			gameStarted = true;
		}

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


	// World objects
	setupScene();


	// Handle drawing as WebGL (faster than Canvas but less supported)
	renderer = new t.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;


	// Add the canvas to the document
	renderer.domElement.style.backgroundColor = '#D6F1FF'; // easier to see
	document.body.appendChild(renderer.domElement);

	// Track mouse position so we know where to shoot
	document.addEventListener('mousemove', onDocumentMouseMove, false);


	// Display HUD
	//$('body').append('<canvas id="radar" width="200" height="200"></canvas>');
	//$('body').append('<div id="hud"><p>Health: <span id="health">100</span><br />Score: <span id="score">0</span></p></div>');
	$('body').append('<div id="credits"><p>Created by <a href="http://www.isaacsukin.com/">Isaac Sukin</a> using <a href="http://mrdoob.github.com/three.js/">Three.js</a><br />WASD to move, mouse to look, click to shoot</p></div>');

	// Set up "hurt" flash
	$('body').append('<div id="hurt"></div>');
	$('#hurt').css({ width: WIDTH, height: HEIGHT, });
}


// Helper function for browser frames
function animate() {
	if (runAnim) {
		requestAnimationFrame(animate);
	}
	render();
}

let wheelChairFlag = false;
let keyFlag = false;

// Update and display
function render() {

	checkStoryTriggers(cam, scene);
	soundChange(cam);
	scene.children[1].position.x = cam.position.x;
	scene.children[1].position.z = cam.position.z;

	let whenChange = soundChange(cam);
	if (whenChange[0] === 1 && !wheelChairFlag) {
		wheelChairFlag = true;
		var wheelChair2 = new t.wheelChair(-1240, 150, 190, 2);
		scene.add(wheelChair2);
	}
	if (whenChange[2] == 1 && !keyFlag) {
		keyFlag = true;
		let key2Remove = scene.getObjectByName('key2');
		scene.remove(key2Remove);
	}

	if (whenChange[3] !== 0) {
		$("#credits p").text(whenChange[3]);
	} else {
		$("#credits p").text(`${cam.position.x}, ${cam.position.z}`);
	}


	var delta = clock.getDelta();
	controls.update(delta); // Move camera


	renderer.render(scene, cam); // Repaint
}


export function changeMovementSpeed(number) {
	MOVESPEED = number;
}

export var addObjectDynamically = function (number) {
	alert(number);
	if (number === 2) {
		var wheelChair2 = new t.wheelChair(-1240, 150, 190, 2);
		scene.add(wheelChair2);
	}
	alert("yeet");
};


export function setupScene() {

	var UNITSIZE = 250, units = mapW;

	// Lighting
	var flashlight = new THREE.PointLight(0xffffff, 1, 1500, 1);
	flashlight.position.set(1100, 525, 320);
	flashlight.target = cam;
	scene.add(flashlight);

	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(0, 1, 2);
	scene.add(directionalLight);


	let ourDoors = [[1875, 250, 550, 1], [125, 250, 710, 1], [-2430, 250, 700, 1], [-2710, 250, -875, 2], [-1575, 250, -1875, 2], [2750, 275, 1125, 2]];

	for (let i = 0; i < ourDoors.length; i++) {
		let door = THREE.doorSimple(ourDoors[i][0], ourDoors[i][1], ourDoors[i][2], ourDoors[i][3]);
		scene.add(door[0]);
		scene.add(door[1]);

	}

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



	var keyTable = new t.table(200, 175, 2625, -1650);
	scene.add(keyTable);

	var key = new t.key(2625, 190, -1650, 1);
	key.name = 'key2';
	key.rotateX(Math.PI / 2);
	scene.add(key);

	//Geometry: walls
	let myWalls = [[2245, 2000, 750, -750, -125], [2245, 2000, 750, 500, 1255], [2245, 2000, 750, -125, 500], [1750, 1000, 750, 750, 500], [1000, 250, 750, 750, 500],
	/*East Wall*/[2775, 2850, 750, -3005, -2250], [2775, 2850, 750, -2250, -1500], [2775, 2850, 750, -1500, -750], [2775, 2850, 750, -750, 0], [2775, 2850, 750, 0, 750], [2775, 2850, 750, 750, 1500], [2000, 2775, 750, -3005, -3080],
	/*N Wall */[1250, 2000, 750, -3005, -3080], [500, 1250, 750, -3005, -3080], [-250, 500, 750, -3005, -3080], [-1000, -250, 750, -3005, -3080], [-1750, -1000, 750, -3005, -3080], [-2500, -1750, 750, -3005, -3080], [-3250, -2500, 750, -3005, -3080],
	/*W Wall*/[-3005, -3150, 750, -3005, -2250], [-3005, -3150, 750, -2250, -1500], [-3005, -3150, 750, -1500, -750], [-3005, -3150, 750, -750, 0], [-3005, -3150, 750, 0, 750], [-3005, -3150, 750, 750, 1500],
	/*S Wall*/[1250, 2000, 750, 1255, 1330], [500, 1250, 750, 1255, 1330], [-250, 500, 750, 1255, 1330], [-1000, -250, 750, 1255, 1330], [-1750, -1000, 750, 1255, 1330], [-2500, -1750, 750, 1255, 1330], [-3250, -2500, 750, 1255, 1330], [2775, 2000, 750, 1255, 1330],
	[750, 250, 750, 250, 500], [1000, 750, 750, -250, 500], [1000, 750, 750, -250, -1000], [1000, 750, 750, -1000, -1750], [1000, 750, 750, -1750, -2495], [2255, 2775, 750, -1255, -1495],
	[1000, 500, 750, -250], [2255, 2495, 750, -1495, -2250], [2495, 1875, 750, -2250, -2495], [1255, 1875, 750, -2250, -2495], [1995, 1775, 750, -2000, -1250], [1000, 2000, 750, -250, -745],
	[1775, 1995, 750, -1250, -750], [1255, 1500, 750, -2250, -1675], [1255, 1500, 750, -1675, -1000], [-250, 250, 750, -5, -245], [750, 250, 750, -5, -245],
	[-250, 250, 750, -1755, -1995], [750, 250, 750, -1755, -1995], [750, 250, 750, -2255, -2495], [-2555, -2745, 750, 745, 0], [-2555, -2745, 750, -750, 0],
	[-2555, -2745, 750, -2250, -1750], [-2555, -2745, 750, -1750, -1000], [-5, -500, 750, 255, 745], [-500, -1000, 750, 505, 745], [-1000, -1675, 750, 745, 505],
	[-2300, -1675, 750, 745, 505], [-2555, -1745, 750, -255, -495], [-1745, -1505, 750, 505, -250], [-1745, -1505, 750, -1000, -250], [-1745, -1505, 750, -1000, -1745],
	[-2745, -2000, 750, -2250, -2495], [-2000, -1505, 750, -2250, -2495], [-2245, -1505, 750, -2005, -2250], [-2555, -1745, 750, -1495, -1255],
	[-2245, -1745, 750, -1500, -1745], [-255, -995, 750, -2495, -2255], [-755, -995, 750, 500, -250], [-755, -995, 750, -1000, -250],
	[-755, -995, 750, -1000, -1675], [-755, -995, 750, -2255, -1675]];

	for (let i = 0; i < myWalls.length; i++) {
		var aWall = new t.wall(myWalls[i][0], myWalls[i][1], myWalls[i][2], myWalls[i][3], myWalls[i][4]);
		scene.add(aWall);
	}
	let mattress = new t.bed(1265, 100, 120, 1.5);
	scene.add(mattress);
	let base = new t.surgeryTable(397, 50, -1100, -7);
	scene.add(base);

	let toolsTable = new t.toolsTable(294, 0, -1446, 2);
	scene.add(toolsTable);

	let table = new t.table(200, 200, -2358, 6);
	scene.add(table);
	//-2085,-68
	var wheelChair = new t.wheelChair(564, 150, -450, -2);
	scene.add(wheelChair);
	let chair = new t.chair(-2402, 145, -1737, -3);
	scene.add(chair);

	let chair2 = new t.chair(-2085, 100, 108, 1);
	chair2.rotateX(Math.PI / 2);
	scene.add(chair2);

	let picture1 = new t.pFrame1(709, 300, -1078, 1);
	scene.add(picture1);



	let finalWallGeo = new THREE.BoxGeometry(250, 540, 250);
	let wallskin = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/escape_texture.jpg") });
	let wallpiece = new THREE.Mesh(finalWallGeo, wallskin);
	wallpiece.position.set(2875, 270, 1125);
	scene.add(wallpiece);


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