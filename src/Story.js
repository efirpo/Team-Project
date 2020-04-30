//variables for story events/flags/etc

import $ from 'jquery';
import "./sounds/intro_song.mp3"; import "./sounds/ambient_song.mp3"; import "./sounds/steps_center.mp3"; import "./sounds/panic_heartbeat.mp3"; import "./sounds/slowing_to_slow.mp3";
import "./sounds/metalClick.ogg"; import "./sounds/scary_flashback.mp3"; import "./sounds/add_item.mp3"; import "./sounds/door_attempt.mp3"; import "./sounds/door_open.mp3";
import "./sounds/team-week-game-metal.mp3";
import "./images/outside.png"; import "./images/trees.jpg";
import "./images/disturbed.jpg"; import "./images/doorbricks.jpg";
import * as THREE from 'three';
import t from './main.js';
import scene from './main.js';
import setupScene from './main.js';
import addObjectDynamically from "./main.js";
import changeMovementSpeed from "./main.js";
import { cam } from './main.js';

var endGameTimerStarted = false;
var escaped = false;
var room = false;
let someFlag = false;
let someFlag2 = false;
let someFlag3 = false;
let someFlag4 = false;
let someFlag5 = false;
let keyFlag = false;
let someFlag6 = false;
let someFlag7 = false;
let someFlag8 = false;
let firstDoorOpened = false;
let secondDoorOpened = false;
let thirdDoorOpened = false;
let soundMetal;


let storyPoints = [0, 0, 0, 0, 0, 0];

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
};

export function checkStoryTriggers(cam, scene) {
  if ((cam.position.x > 1800 && cam.position.x < 2000) && (cam.position.z > 250 && cam.position.z < 500) && (scene.children[3].rotation.y >= -1.8)) {
    scene.children[3].rotation.y -= .03;
    // if (endGameTimerStarted == false) {
    //   gameOver();
    //   endGameTimerStarted = true;
    // }
    if (!firstDoorOpened) {
      addAudio('./assets/sounds/door_open.mp3', .6, false);
      firstDoorOpened = true;
    }
  }

  else if (cam.position.x < -2100 && cam.position.z > 900 && scene.children[7].rotation.y <= 1.8) {
    scene.children[7].rotation.y += .02;
    if (!secondDoorOpened) {
      addAudio('./assets/sounds/door_open.mp3', .6, false);
      secondDoorOpened = true;
    }
  }
  else if (cam.position.x <= -2200 && cam.position.z <= 500) {
    if (room == false) {
      $("#intro").css("background-image", "url(./assets/images/outside.png)");
      $("#intro").css("background-repeat", "no-repeat");
      $("#intro").css("background-size", "cover");
      $("#intro").css("color", "#FFFFFF", "text-shadow", "#000 1px 1px 3px");

      $("#intro").html(`It’s like a distant dream, all my time before this place.<br><br> Remember… why can't I remember?<br><br> My life out there, with the others… I think there were others.<br><br> 
      I was… a student.<br> Of anatomy.<br> Master came.<br> Told us of a grand experiment in flowery words.<br><br> I think I followed him here after that.<br><br> But how long ago was it…?`);
      $("#intro").fadeIn();
      room = true;
    }

  }
  if ((cam.position.x > -1500 && cam.position.x < -1000) && (cam.position.z > -2250 && cam.position.z < -2000)) {
    if (scene.children[11].rotation.y < 3.2) {
      scene.children[11].rotation.y += .04;
    }
    if (!thirdDoorOpened) {
      addAudio('./assets/sounds/door_open.mp3', .6, false);
      thirdDoorOpened = true;
    }

  }
  if (cam.position.x > 2250 && cam.position.x < 2750 && cam.position.z > 900 && cam.position.z < 1250) {
    if (keyFlag === true) {

      if (scene.children[13].rotation.y < 3) {
        scene.children[13].rotation.y += .04;
      }
      else {
        $("#credits p").text("You Escaped");
        escaped = true;
        soundMetal.setVolume();
        addAudio("./assets/sounds/door_open.mp3", .6, false);

        $("#intro").css("background-image", "url(./assets/images/trees.jpg)");
        $("#intro").css("background-repeat", "no-repeat");
        $("#intro").css("background-size", "cover");
        $("#intro").css("color", "#FFFFFF", "text-shadow", "#000 1px 1px 3px");

        $("#intro").html(`Trees...<br><br> Green...<br><br>I'd almost forgotten...`);
        $("#intro").fadeIn();
      }
    }
  }
}

function gameOver() {
  setTimeout(function () {
    if (!escaped) {
      $('#intro').fadeIn();
      $('#intro').html('you died');
    }
  }, 45000);
  //escape timer music
}
function startTimer(duration) {
  var start = Date.now(),
    diff,
    minutes,
    seconds;
  function timer() {
    // get the number of seconds that have elapsed since 
    // startTimer() was called
    diff = duration - (((Date.now() - start) / 1000) | 0);

    // does the same job as parseInt truncates the float
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    storyPoints[3] = (minutes + ":" + seconds);
    console.log(storyPoints[3]);

    if (diff <= 0) {
      // add one second so that the count down starts at the full duration
      // example 05:00 not 04:59
      start = Date.now() + 1000;
    }
  }
  // we don't want to wait a full second before the timer starts
  timer();
  setInterval(timer, 1000);
}

// function gameOver() {
//   setTimeout(function () {
//     if (!escaped) {
//       $('#intro').fadeIn();
//       $('#intro').html('you died');
//     }
//   }, 180000);
//   //escape timer music
// }

export function soundChange(cam) {

  let displayFunction = function (str) {
    setInterval(() => {

      $("#credits p").text(str);

    }, 5000);
  };

  //add audio using the name of file



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
      }
      else {
        soundMetal.setVolume(0);
        $("#credits p").text("You Escaped");
        escaped = true;
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

  }

  if (cam.position.x > -740 && cam.position.x < 745 && cam.position.z > -1700 && cam.position.z < -1300 && someFlag5 === false) {
    someFlag5 = true;

    addAudio('./assets/sounds/panic_heartbeat.mp3', .4, false);
    //changeMovementSpeed(700);

  } else if (cam.position.x > -740 && cam.position.x < 745 && cam.position.z > -1700 && cam.position.z < -1300) {
    if (!someFlag8) {
      $("#intro").css("background-image", "url(./assets/images/disturbed.jpg)");
      $("#intro").css("background-repeat", "no-repeat");
      $("#intro").css("background-size", "cover");
      $("#intro").css("color", "#FFFFFF", "text-shadow", "#000 1px 1px 3px");

      $("#intro").html(`I can hazily recall the last experiment.<br><br> As I mopped up the blood and viscera from the stone floor, 
      the patient woke suddenly.<br><br> In a rage, he knocked my master to the ground with a loud crack as skull met tile, then fainted.<br><br>In a panic I ran to my room.<br><br> 
      I cannot face my master having abandoned him, having seen him weak.`);
      $("#intro").fadeIn();
      someFlag8 = true;
      addAudio('', .5, false);


      let listenerMetal = new THREE.AudioListener();
      cam.add(listenerMetal);

      soundMetal = new THREE.Audio(listenerMetal);
      let audioLoaderMetal = new THREE.AudioLoader();

      audioLoaderMetal.load("./assets/sounds/team-week-game-metal.mp3", function (buffer) {
        soundMetal.setBuffer(buffer);
        soundMetal.setLoop(true);
        soundMetal.setVolume(.5);
        soundMetal.play();
      });



      if (endGameTimerStarted == false) {
        gameOver();
        endGameTimerStarted = true;
        startTimer(45);
        $('body').append('<div id="hurt"></div>');
      }
    }
  }

  if (cam.position.x > -225 && cam.position.x < 225 && cam.position.z < 1250 && cam.position.z > 750) {
    if (someFlag === false) {
      someFlag = true;
      addAudio('./assets/sounds/scary_flashback.mp3', .4, false);
      addAudio('./assets/sounds/panic_heartbeat.mp3', .5, false);
      addAudio('./assets/sounds/door_attempt.mp3', .5, false);
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
