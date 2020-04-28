import * as THREE from 'three';
import "./Story.js";
import "./Models.js";
import "./Three.FirstPersonControls";
import $ from "jquery";
import "./images/tiledfloor.jpg"; import "./images/wood1.jpg"; import "./images/wallb.jpg";

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
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 7
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 9
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], // 10
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], // 11
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // 12
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // 13
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1], // 14
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1], // 15
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 16
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 17
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 18
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 19
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 20
		[1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1], // 21
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 22
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 23
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 24
	], mapW = map.length;

// Semi-constants
var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	ASPECT = WIDTH / HEIGHT,
	UNITSIZE = 250,
	WALLHEIGHT = UNITSIZE * 3,
	MOVESPEED = 1000,
	LOOKSPEED = 0.075


// Global vars
var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = { x: 0, y: 0 };

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

	// Shoot on click
	$(document).click(function (e) {
		e.preventDefault;
	});

	// Display HUD
	$('body').append('<canvas id="radar" width="200" height="200"></canvas>');
	$('body').append('<div id="hud"><p>Health: <span id="health">100</span><br />Score: <span id="score">0</span></p></div>');
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

// Update and display
function render() {
	$("#credits p").text(`${cam.position.x}, ${cam.position.z}`);
	checkStoryTriggers();
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
	var cube = new t.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE);
	var materials = [
			new t.MeshLambertMaterial({/*color: 0x00CCAA,*/map: t.ImageUtils.loadTexture("./assets/images/wallb.jpg") }),
			new t.MeshBasicMaterial({/*color: 0xC5EDA0,*/map: t.ImageUtils.loadTexture('./assets/images/wallb.jpg') }),
			new t.MeshLambertMaterial({ color: 0xFBEBCD }),

	];
	for (var i = 0; i < mapW; i++) {
		for (var j = 0, m = map[i].length; j < m; j++) {
			if (map[i][j]) {
				var wall = new t.Mesh(cube, materials[map[i][j] - 1]);
				wall.position.x = (i - units / 2) * UNITSIZE;
				wall.position.y = WALLHEIGHT / 2;
				wall.position.z = (j - units / 2) * UNITSIZE;
				scene.add(wall);
			}
		}
	}

	
	var table = new t.table(400, 200, 1875, 250);
	scene.add(table);

	table = new t.table(250, 150, 625, -2125);
	scene.add(table);
	table = new t.table(500, 250, 125, -1000);
	scene.add(table);


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

function checkStoryTriggers() {
	if (cam.position.x < -2900 && cam.position.z > 1000) {
		const key = "<span id='key'>Key</span>";
		$("#credits p").text(`There is a ${key} here.`);
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
	else if (cam.position.x > 3000) {
		console.log("X > 3000");
	}
}