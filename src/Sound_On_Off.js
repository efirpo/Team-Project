import "./sounds/intro_song.mp3"; import "./sounds/ambient_song.mp3"; import "./sounds/steps_center.mp3"; import "./sounds/panic_heartbeat.mp3"; import "./sounds/slowing_to_slow.mp3";
import "./sounds/metalClick.ogg"; import "./sounds/scary_flashback.mp3"; import "./sounds/add_item.mp3"; import "./sounds/door_attempt.mp3"; import "./sounds/door_open.mp3";

import $ from 'jquery';
import * as THREE from 'three';
import t from './main.js';
import scene from './main.js';
import setupScene from './main.js';
import addObjectDynamically from "./main.js";
import changeMovementSpeed from "./main.js";

let someFlag = false;
let someFlag2 = false;
let someFlag3 = false;
let someFlag4 = false;
let someFlag5 = false;
let keyFlag = false;
let someFlag6 = false;
let someFlag7 = false;

let storyPoints = [0, 0, 0, 0, 0, 0];

export function soundChange(cam) {

  let displayFunction = function (str) {
    setInterval(() => {

      $("#credits p").text(str);

    }, 5000);
  }

  //add audio using the name of file
  var addAudio = function (soundString, vol, loop) {
    let listener = new THREE.AudioListener();
    cam.add(listener);

    let sound = new THREE.Audio(listener);
    let audioLoader = new THREE.AudioLoader();

    audioLoader.load(soundString, function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(loop);
      sound.setVolume(vol);
      sound.play();
    });
  }
  var startTimer = function (duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  if (cam.position.x > 2504 && cam.position.x < 2750 && cam.position.z > -1800 && cam.position.z < -1500) {
    if (keyFlag === false) {

      addAudio('./assets/sounds/metalClick.ogg', .6, false);
      addAudio('./assets/sounds/add_item.mp3', .6, false);
      keyFlag = true;
      storyPoints[2] = 1;

    } else {
      $("#credits p").text("Key Obtained");
    }
  }

  if (cam.position.x > 2250 && cam.position.x < 2750 && cam.position.z > 900 && cam.position.z < 1250) {
    if (keyFlag === true) {
      if (someFlag6 === false) {
        someFlag6 = true;
        addAudio("./assets/sounds/door_open.mp3", .4, false);
        addAudio("./assets/sounds/intro_song.mp3", .5, true);
      } else {
        $("#credits p").text("You Escaped");
      }
    } else {
      if (someFlag7 === false) {
        someFlag7 = true;
        addAudio("./assets/sounds/door_attempt.mp3", .4, false);
        addAudio("./assets/sounds/scary_flashback.mp3", .4, false);
        addAudio("./assets/sounds/panic_heartbeat.mp3", .5, false);
      } else {
        $("#credits p").text("You need a key!");
      }
    }
  }

  if (cam.position.z > 700 && someFlag3 === false) {
    someFlag3 = true;

    addAudio('./assets/sounds/ambient_song.mp3', .2, true);

  } else if (cam.position.z > 700 && cam.position.x > 260) {

    //$("#credits p").text("--i need to get out of here--");

  }

  if (cam.position.x > -740 && cam.position.x < 745 && cam.position.z > -1700 && cam.position.z < -1300 && someFlag5 === false) {
    someFlag5 = true;

    addAudio('./assets/sounds/panic_heartbeat.mp3', .4, false);
    changeMovementSpeed(700);

  } else if (cam.position.x > -740 && cam.position.x < 745 && cam.position.z > -1700 && cam.position.z < -1300) {

    $("#credits p").text("LEAVE NOW!");

  }

  if (cam.position.x > -225 && cam.position.x < 225 && cam.position.z < 1250 && cam.position.z > 750) {
    if (someFlag === false) {
      someFlag = true;

      addAudio('./assets/sounds/scary_flashback.mp3', .4, false);
      addAudio('./assets/sounds/panic_heartbeat.mp3', .5, false);

      $("#credits p").text(`There is a thing here.`);
    }
  }

  if (cam.position.x > -2500 && cam.position.x < -1750 && cam.position.z < 500 && cam.position.z > -250) {
    if (someFlag2 === false) {
      someFlag2 = true;

      addAudio('./assets/sounds/intro_song.mp3', .3, false);

    }
  }

  if (cam.position.x > -1495 && cam.position.x < -1006 && cam.position.z > -648 && cam.position.z < 492) {
    if (someFlag4 === false) {
      someFlag4 = true;
      storyPoints[0] = 1;
      addAudio('./assets/sounds/panic_heartbeat.mp3', .4, false);
    }
  }
  return storyPoints;
}
