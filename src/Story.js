//variables for story events/flags/etc

import $ from 'jquery';

export function checkStoryTriggers(cam) {
  if (cam.position.x > -225 && cam.position.x < 225 && cam.position.z < 1250 && cam.position.z > 750) {
    //const key = "<span id='key'>Key</span>";
    $("#credits p").text(`There is a thing here.`);
  }
  else if ((cam.position.x > 1800 && cam.position.x < 2000) && (cam.position.z > 250 && cam.position.z < 500)) {
    console.log();
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