import "./sounds/intro_song.mp3"; import "./sounds/ambient_song.mp3"; import "./sounds/steps_center.mp3"; import "./sounds/panic_heartbeat.mp3"; import "./sounds/slowing_to_slow.mp3";
import "./sounds/scary_flashback.mp3";
import $ from 'jquery';
import * as THREE from 'three';

let someFlag = false;
let someFlag2 = false;

export function soundChange(cam) {

  let count;
  if (cam.position.x > -225 && cam.position.x < 225 && cam.position.z < 1250 && cam.position.z > 750) {
    if (someFlag === false) {

      someFlag = true;

      var listener = new THREE.AudioListener();
      var audioLoader = new THREE.AudioLoader();
      cam.add(listener);

      var sound = new THREE.Audio(listener);


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
  } else if (cam.position.x > -2500 && cam.position.x < -1750 && cam.position.z < 500 && cam.position.z > -250) {
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