import "./sounds/intro_song.mp3"; import "./sounds/ambient_song.mp3"; import "./sounds/steps_center.mp3"; import "./sounds/panic_heartbeat.mp3"; import "./sounds/slowing_to_slow.mp3";
import $ from 'jquery';
import * as THREE from 'three';

export function soundChange(cam) {



  if (cam.position.x > -225 && cam.position.x < 225 && cam.position.z < 1250 && cam.position.z > 750) {
    var listener = new THREE.AudioListener();
    cam.add(listener);

    var sound = new THREE.Audio(listener);

    var audioLoader = new THREE.AudioLoader();

    var loaderLoader = new THREE.AudioLoader();
    audioLoader.load('./assets/sounds/panic_heartbeat.mp3', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.2);
      sound.play();
    });
    $("#credits p").text(`There is a thing here.`);
  }
}