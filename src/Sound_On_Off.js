import "./sounds/intro_song.mp3"; import "./sounds/ambient_song.mp3"; import "./sounds/steps_center.mp3"; import "./sounds/panic_heartbeat.mp3"; import "./sounds/slowing_to_slow.mp3";
import "./sounds/scary_flashback.mp3";
import $ from 'jquery';
import * as THREE from 'three';
import t from './main.js';
import scene from './main.js';
import setupScene from './main.js';
import addObjectDynamically from "./main.js";

let someFlag = false;
let someFlag2 = false;
let someFlag3 = false;
let someFlag4 = false;



export function soundChange(cam) {

  if (cam.position.z > 700 && someFlag3 === false) {


    someFlag3 = true;

    var listener = new THREE.AudioListener();
    var audioLoader = new THREE.AudioLoader();
    cam.add(listener);

    var sound = new THREE.Audio(listener);

    audioLoader.load('./assets/sounds/ambient_song.mp3', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.2);
      sound.play();

    });
  }

  if (cam.position.x > -225 && cam.position.x < 225 && cam.position.z < 1250 && cam.position.z > 750) {
    if (someFlag === false) {

      someFlag = true;

      listener = new THREE.AudioListener();
      audioLoader = new THREE.AudioLoader();
      cam.add(listener);

      sound = new THREE.Audio(listener);

      audioLoader.load('./assets/sounds/scary_flashback.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();

      });

      var loaderLoader = new THREE.AudioLoader();
      loaderLoader.load('./assets/sounds/panic_heartbeat.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.3);
        sound.play();
      });


      $("#credits p").text(`There is a thing here.`);
    }
  }

  if (cam.position.x > -2500 && cam.position.x < -1750 && cam.position.z < 500 && cam.position.z > -250) {
    if (someFlag2 === false) {
      someFlag2 = true;
      listener = new THREE.AudioListener();
      cam.add(listener);

      sound = new THREE.Audio(listener);
      audioLoader = new THREE.AudioLoader();

      audioLoader.load('./assets/sounds/intro_song.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();

      });
    }
  }

  if (cam.position.x > -1495 && cam.position.x < -1006 && cam.position.z > -648 && cam.position.z < 492) {
    if (someFlag4 === false) {
      someFlag4 = true;
      listener = new THREE.AudioListener();
      cam.add(listener);

      sound = new THREE.Audio(listener);
      audioLoader = new THREE.AudioLoader();

      audioLoader.load('./assets/sounds/panic_heartbeat.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();

      });

      // addObjectDynamically(2);


    }
  }


  return someFlag4;
}

// export function soundOn(object, cam) {

//   var listener = new THREE.AudioListener();
//   cam.add(listener);

//   console.log('hey');
//   // create the PositionalAudio object (passing in the listener)
//   var sound = new THREE.PositionalAudio(listener);

//   // load a sound and set it as the PositionalAudio object's buffer
//   var audioLoader = new THREE.AudioLoader();
//   audioLoader.load('./assets/sounds/steps_center.mp3', function (buffer) {
//     sound.setBuffer(buffer);
//     sound.setRefDistance(20);
//     sound.play();
//   });

//   // finally add the sound to the mesh
//   object.add(sound);

// }