import * as THREE from "three";

//table
THREE.table = function (SCALE, HEIGHT, PositionX, PositionZ) {
  var tableBoardGeometry = new THREE.BoxBufferGeometry(SCALE, SCALE / 10, SCALE);
  var tableBoardMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/woodtable1.jpg") });
  var tableBoard = new THREE.Mesh(tableBoardGeometry, tableBoardMaterial);
  tableBoard.position.x = PositionX;
  tableBoard.position.y = HEIGHT;
  tableBoard.position.z = PositionZ;

  const tableLegsGeometry = new THREE.BoxBufferGeometry(SCALE / 10, tableBoard.position.y, SCALE / 10);
  const tableLegsMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/woodtable1.jpg") });
  const tableLeg1 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  const tableLeg2 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  const tableLeg3 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  const tableLeg4 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  tableLeg1.position.set(SCALE / 2.5, -(tableBoard.position.y / 2), SCALE / 3);
  tableLeg2.position.set(- SCALE / 2.5, - (tableBoard.position.y / 2), SCALE / 3);
  tableLeg3.position.set(SCALE / 2.5, - (tableBoard.position.y / 2), -SCALE / 3);
  tableLeg4.position.set(-SCALE / 2.5, - (tableBoard.position.y / 2), -SCALE / 3);

  tableBoard.add(tableLeg1);
  tableBoard.add(tableLeg2);
  tableBoard.add(tableLeg3);
  tableBoard.add(tableLeg4);

  return tableBoard;
};

//wheelchair
THREE.wheelChair = function (PositionX, PositionY, PositionZ, Orientation) {
  let wheelGeo = new THREE.CylinderBufferGeometry(50 * 1.8, 50 * 1.8, 4 * 1.8, 24);
  let wheelMesh = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/wheel.png") });
  let wheel1 = new THREE.Mesh(wheelGeo, wheelMesh);
  wheel1.rotateZ(Math.PI / 2);
  wheel1.position.set(42 * 1.8, -25 * 1.8, -10 * 1.8);
  let wheel2 = new THREE.Mesh(wheelGeo, wheelMesh);
  wheel2.rotateZ(Math.PI / 2);
  wheel2.position.set(-42 * 1.8, -25 * 1.8, -10 * 1.8);

  let tireGeo = new THREE.TorusBufferGeometry(50 * 1.8, 4 * 1.8, 24, 24);
  let tireMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/tire.png") });
  let tire1 = new THREE.Mesh(tireGeo, tireMesh);
  tire1.rotateY(Math.PI / 2);
  tire1.position.set(-42 * 1.8, -25 * 1.8, -10 * 1.8);
  let tire2 = new THREE.Mesh(tireGeo, tireMesh);
  tire2.rotateY(Math.PI / 2);
  tire2.position.set(42 * 1.8, -25 * 1.8, -10 * 1.8);

  let chairSeatGeo = new THREE.BoxBufferGeometry(75 * 1.8, 8 * 1.8, 75 * 1.8);
  let chairSeatMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/leather.jpg') });
  let chairSeat = new THREE.Mesh(chairSeatGeo, chairSeatMesh);
  chairSeat.position.set(PositionX, PositionY, PositionZ);
  chairSeat.rotateY(Math.PI / Orientation);

  let backGeo = new THREE.BoxBufferGeometry(75 * 1.8, 6 * 1.8, 90 * 1.8);
  let backMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/back.jpeg') });
  let back = new THREE.Mesh(backGeo, backMesh);
  back.rotateX(Math.PI / 2.8);
  back.position.set(0, 30 * 1.8, -40 * 1.8);

  let handleGeo = new THREE.CylinderBufferGeometry(4 * 1.8, 4 * 1.8, 20 * 1.8, 16);
  let handleMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/tire.png") });
  let handleRight = new THREE.Mesh(handleGeo, handleMesh);
  handleRight.rotateX(Math.PI / 2);
  handleRight.position.set(-35 * 1.8, 60 * 1.8, -65 * 1.8);

  let handleLeft = new THREE.Mesh(handleGeo, handleMesh);
  handleLeft.rotateX(Math.PI / 2);
  handleLeft.position.set(35 * 1.8, 60 * 1.8, -65 * 1.8);

  let axleGeo = new THREE.BoxBufferGeometry(80 * 1.8, 2 * 1.8, 2 * 1.8);
  let axleMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  let axle = new THREE.Mesh(axleGeo, axleMesh);
  axle.position.set(0, -30 * 1.8, -10 * 1.8);

  chairSeat.add(tire2);
  chairSeat.add(tire1);
  chairSeat.add(axle);
  chairSeat.add(handleRight);
  chairSeat.add(handleLeft);
  chairSeat.add(back);
  chairSeat.add(wheel1);
  chairSeat.add(wheel2);
  return chairSeat;
};

// surgery table
THREE.surgeryTable = function (PositionX, PositionY, PositionZ, Orientation) {


  var baseGeo = new THREE.CylinderBufferGeometry(80 * 1.5, 100 * 1.5, 40 * 1.5, 12);
  var baseMat = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  var base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(PositionX, PositionY, PositionZ);
  base.rotateY(Math.PI / Orientation);

  var connector1Geo = new THREE.CylinderBufferGeometry(5 * 1.5, 5 * 1.5, 140 * 1.5, 240);
  var connector1Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') }
  );
  var connector1 = new THREE.Mesh(connector1Geo, connector1Mesh);
  var connector2 = new THREE.Mesh(connector1Geo, connector1Mesh);
  connector1.rotateX(Math.PI / 4);
  connector1.position.set(-50 * 1.5, 60 * 1.5, 20 * 1.5);
  connector2.rotateX(Math.PI / 4);
  connector2.position.set(50 * 1.5, 60 * 1.5, 20 * 1.5);

  var connector3Geo = new THREE.CylinderBufferGeometry(5 * 1.5, 5 * 1.5, 200 * 1.5, 240);
  var connector3Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') }
  );

  var connector3 = new THREE.Mesh(connector3Geo, connector3Mesh);
  var connector4 = new THREE.Mesh(connector3Geo, connector3Mesh);
  connector3.rotateX(-(Math.PI / 4));
  connector3.position.set(50 * 1.5, 80 * 1.5, -30 * 1.5);
  connector4.rotateX(-(Math.PI / 4));
  connector4.position.set(-50 * 1.5, 80 * 1.5, -30 * 1.5);

  var slabGeo = new THREE.BoxBufferGeometry(150 * 1.5, 8 * 1.5, 300 * 1.5);
  var slabMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') });
  var slab = new THREE.Mesh(slabGeo, slabMesh);
  slab.position.set(0, 130 * 1.5, 0);
  slab.rotateX(Math.PI / 13);

  var headRestGeo = new THREE.BoxBufferGeometry(150 * 1.5, 8 * 1.5, 75 * 1.5);
  var headRestMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab3.jpg') });
  var headRest = new THREE.Mesh(headRestGeo, headRestMesh);
  headRest.position.set(0, 180 * 1.5, -170 * 1.5);
  headRest.rotateX(Math.PI / 7);

  var shackleLegsGeo = new THREE.CylinderBufferGeometry(12 * 1.5, 12 * 1.5, 12 * 1.5, 12, 3, false, 1.4, 3.5);
  var shackleArmsGeo = new THREE.CylinderBufferGeometry(10 * 1.5, 10 * 1.5, 10 * 1.5, 10, 3, false, 1.4, 3.5);
  var shackleMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  var shackleLeftLeg = new THREE.Mesh(shackleLegsGeo, shackleMesh);
  shackleLeftLeg.position.set(30 * 1.5, 115 * 1.5, 80 * 1.5);
  shackleLeftLeg.rotateX(Math.PI / 1.5);

  var shackleRightLeg = new THREE.Mesh(shackleLegsGeo, shackleMesh);
  shackleRightLeg.position.set(-30 * 1.5, 115 * 1.5, 80 * 1.5);
  shackleRightLeg.rotateX(Math.PI / 1.5);

  var shackleRightArm = new THREE.Mesh(shackleArmsGeo, shackleMesh);
  shackleRightArm.position.set(-55 * 1.5, 142 * 1.5, -30 * 1.5);
  shackleRightArm.rotateX(Math.PI / 1.5);

  var shackleLeftArm = new THREE.Mesh(shackleArmsGeo, shackleMesh);
  shackleLeftArm.position.set(55 * 1.5, 142 * 1.5, -30 * 1.5);
  shackleLeftArm.rotateX(Math.PI / 1.5);

  base.add(connector1);
  base.add(connector2);
  base.add(connector3);
  base.add(connector4);
  base.add(slab);
  base.add(headRest);
  base.add(shackleLeftLeg);
  base.add(shackleRightLeg);
  base.add(shackleRightArm);
  base.add(shackleLeftArm);

  return base;

};
//tools table
THREE.toolsTable = function (PositionX, PositionY, PositionZ, Orientation) {

  let toolsBaseGeo = new THREE.BoxBufferGeometry(50 * 1.5, 8 * 1.5, 70 * 1.5);
  let toolsBaseMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  let toolsBase = new THREE.Mesh(toolsBaseGeo, toolsBaseMesh);
  toolsBase.position.set(PositionX, PositionY, PositionZ);
  toolsBase.rotateY(Orientation);

  let toolsStalkGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 130 * 1.5);
  let toolsStalkMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  let toolsStalk = new THREE.Mesh(toolsStalkGeo, toolsStalkMesh);
  toolsStalk.position.set(0, 65 * 1.5, 25 * 1.5);

  let toolsBinGeo = new THREE.BoxBufferGeometry(60 * 1.5, 4 * 1.5, 45 * 1.5);
  let toolsBinMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/surgerytools.jpg') });
  let toolsBin = new THREE.Mesh(toolsBinGeo, toolsBinMesh);
  toolsBin.position.set(0 * 1.5, 130 * 1.5, 5 * 1.5);

  let toolsLipFrontGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 60 * 1.5, 3, 6, false, 7.8, 3.2);
  let toolsLipMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') });
  let toolsLipFront = new THREE.Mesh(toolsLipFrontGeo, toolsLipMesh);
  toolsLipFront.rotateZ(Math.PI / 2);
  toolsLipFront.position.set(0, 0, -22.5 * 1.5);

  let toolsLipBackGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 60 * 1.5, 3, 6, false, 4.6, 3.2);
  let toolsLipBack = new THREE.Mesh(toolsLipBackGeo, toolsLipMesh);
  toolsLipBack.rotateZ(Math.PI / 2);
  toolsLipBack.position.set(0, 0, 22.5 * 1.5);

  let toolsLipRightGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 45 * 1.5, 3, 6, false, 4.6, 3.2);
  let toolsLipRight = new THREE.Mesh(toolsLipRightGeo, toolsLipMesh);
  toolsLipRight.rotateZ(Math.PI / 2);
  toolsLipRight.rotateX(Math.PI / 2);
  toolsLipRight.position.set(30 * 1.5, 0, 0);

  let toolsLipLeftGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 45 * 1.5, 3, 6, false, 3, 3.2);
  let toolsLipLeft = new THREE.Mesh(toolsLipLeftGeo, toolsLipMesh);

  toolsLipLeft.rotateX(Math.PI / 2);
  toolsLipLeft.position.set(-30 * 1.5, 0, 0);

  toolsBin.add(toolsLipLeft);
  toolsBin.add(toolsLipRight);
  toolsBin.add(toolsLipBack);
  toolsBin.add(toolsLipFront);
  toolsBase.add(toolsBin);
  toolsBase.add(toolsStalk);

  return toolsBase;

};
// door frame

THREE.doorSimple = function (PositionX, PositionY, PositionZ, Orientation) {
  

  let pivot = new THREE.BoxBufferGeometry(1, 1, 1);
  let pivotMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/door931-fixed.jpg') });
  let pivotPoint = new THREE.Mesh(pivot, pivotMesh);
  if (Orientation === 2) {
    pivotPoint.position.set(PositionX, PositionY, PositionZ + 100);
    pivotPoint.rotateY(Math.PI / Orientation);
  }
  else if (Orientation === 1) {
    pivotPoint.position.set(PositionX-100, PositionY, PositionZ);
  }


  let doorGeo = new THREE.BoxBufferGeometry(100 * 2, 250 * 2, 20 * 2);
  let doorMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/door931-fixed.jpg') });
  let door = new THREE.Mesh(doorGeo, doorMesh);
  door.position.set(100, 0, 0);
  //door.rotateY(Math.PI / Orientation);
  pivotPoint.add(door);

  let zero = new THREE.BoxBufferGeometry(1, 1, 1);
  let zeroMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/door931-fixed.jpg') });
  let zeroPoint = new THREE.Mesh(zero, zeroMesh);
  zeroPoint.position.set(PositionX, PositionY, PositionZ);
  zeroPoint.rotateY(Math.PI / Orientation);

  let doorFrameTopGeo = new THREE.BoxBufferGeometry(100 * 2, 20 * 2, 30 * 2);
  let doorFrameTopMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  let doorFrameTop = new THREE.Mesh(doorFrameTopGeo, doorFrameTopMesh);
  zeroPoint.add(doorFrameTop);
  doorFrameTop.position.set(0, 125 * 2, 0);

  let doorFrameSidesGeo = new THREE.BoxBufferGeometry(20 * 2, 270 * 2, 30 * 2);
  let doorFrameSidesMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  let doorFrameLeft = new THREE.Mesh(doorFrameSidesGeo, doorFrameSidesMesh);
  let doorFrameRight = new THREE.Mesh(doorFrameSidesGeo, doorFrameSidesMesh);
  zeroPoint.add(doorFrameLeft);
  zeroPoint.add(doorFrameRight);
  doorFrameRight.position.set(-60 * 2, 0, 0);
  doorFrameLeft.position.set(60 * 2, 0, 0);
  return [pivotPoint, zeroPoint];
};

// key
THREE.key = function (PositionX, PositionY, PositionZ, Orientation) {

  let keyRingGeo = new THREE.TorusBufferGeometry(10, 3, 3, 100);
  let keyRingMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') });
  let keyRing = new THREE.Mesh(keyRingGeo, keyRingMaterial);
  keyRing.position.set(PositionX, PositionY, PositionZ);
  keyRing.rotateY(Math.PI / Orientation);

  let keyStalkGeo = new THREE.CylinderBufferGeometry(3, 3, 50, 14);
  let keyStalkMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') });
  let keyStalk = new THREE.Mesh(keyStalkGeo, keyStalkMaterial);
  keyStalk.rotateX(Math.PI / 2);
  keyStalk.rotateZ(Math.PI / 2);
  keyStalk.position.set(35, 0, 0);
  keyRing.add(keyStalk);

  let keyTooth1Geo = new THREE.BoxBufferGeometry(5, 5, 3);
  let keyTooth1Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') });
  let keyTooth1 = new THREE.Mesh(keyTooth1Geo, keyTooth1Mesh);
  keyTooth1.position.set(40, -5, 0);

  let keyTooth2Geo = new THREE.BoxBufferGeometry(5, 9, 3);
  let keyTooth2 = new THREE.Mesh(keyTooth2Geo, keyTooth1Mesh);
  keyTooth2.position.set(50, -5, 0);

  keyRing.add(keyTooth1);
  keyRing.add(keyTooth2);

  return keyRing;
};

// chair

THREE.chair = function (PositionX, PositionY, PositionZ, Orientation) {
  let chairGeo = new THREE.BoxBufferGeometry(76 * 1.9, 12 * 1.9, 76 * 1.9);
  let chairMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/chairwood.jpg') });
  let chair = new THREE.Mesh(chairGeo, chairMesh)
  chair.position.set(PositionX, PositionY, PositionZ);
  chair.rotateY(Math.PI / Orientation)

  let chairLegGeo = new THREE.BoxBufferGeometry(12 * 1.9, 70 * 1.9, 12 * 1.9);
  let chairLeg1 = new THREE.Mesh(chairLegGeo, chairMesh);
  let chairLeg2 = new THREE.Mesh(chairLegGeo, chairMesh);
  let chairLeg3 = new THREE.Mesh(chairLegGeo, chairMesh);
  let chairLeg4 = new THREE.Mesh(chairLegGeo, chairMesh);
  chair.add(chairLeg4);
  chair.add(chairLeg3);
  chair.add(chairLeg2);
  chair.add(chairLeg1);
  chairLeg2.position.set(-28 * 1.9, -35 * 1.9, 30 * 1.9);
  chairLeg1.position.set(28 * 1.9, -35 * 1.9, 30 * 1.9);
  chairLeg3.position.set(-30 * 1.9, -35 * 1.9, -28 * 1.9);
  chairLeg4.position.set(30 * 1.9, -35 * 1.9, -28 * 1.9);

  let chairBack1Geo = new THREE.BoxBufferGeometry(20 * 1.9, 80 * 1.9, 8 * 1.9);
  let chairBack1 = new THREE.Mesh(chairBack1Geo, chairMesh);
  chair.add(chairBack1);
  chairBack1.position.set(0, 45 * 1.9, 33 * 1.9)
  let chairBack2Geo = new THREE.BoxBufferGeometry(12 * 1.9, 80 * 1.9, 8 * 1.9);
  let chairBack2 = new THREE.Mesh(chairBack2Geo, chairMesh);
  chair.add(chairBack2);
  chairBack2.position.set(34 * 1.9, 45 * 1.8, 33 * 1.9)
  chairBack2.rotateZ(Math.PI / 1.02)
  let chairBack3 = new THREE.Mesh(chairBack2Geo, chairMesh)
  chair.add(chairBack3)
  chairBack3.position.set(-34 * 1.9, 45 * 1.9, 33 * 1.9)
  chairBack3.rotateZ(Math.PI / -1.02)

  let chairBackTopGeo = new THREE.BoxBufferGeometry(84 * 1.9, 30 * 1.9, 14 * 1.9)
  let chairBackTop = new THREE.Mesh(chairBackTopGeo, chairMesh)
  chair.add(chairBackTop);
  chairBackTop.position.set(0, 80 * 1.9, 33 * 1.9)

  return chair
}

// bed

THREE.bed = function (PositionX, PositionY, PositionZ, Orientation) {


  let mattressGeo = new THREE.BoxBufferGeometry(240 * 2.5, 36 * 2.5, 120 * 2.5);
  let mattressMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/dirty-cloth.jpg') });
  let mattress = new THREE.Mesh(mattressGeo, mattressMaterial);
  mattress.position.set(PositionX, PositionY, PositionZ);
  mattress.rotateY(Orientation);

  let bedframeGeo = new THREE.BoxBufferGeometry(252 * 2.5, 9 * 2.5, 132 * 2.5);
  let bedframeMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/woodtable1.jpg') });
  let bedframe = new THREE.Mesh(bedframeGeo, bedframeMesh);
  mattress.add(bedframe);
  bedframe.position.set(0, -20 * 2.5, 0)

  let bedLegGeo = new THREE.CylinderGeometry(9 * 2.5, 9 * 2.5, 30 * 2.5);
  let bedLegMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/woodtable1.jpg') });
  let bedLeg1 = new THREE.Mesh(bedLegGeo, bedLegMesh);
  let bedLeg2 = new THREE.Mesh(bedLegGeo, bedLegMesh);
  let bedLeg3 = new THREE.Mesh(bedLegGeo, bedLegMesh);
  let bedLeg4 = new THREE.Mesh(bedLegGeo, bedLegMesh);
  mattress.add(bedLeg1);
  mattress.add(bedLeg2);
  mattress.add(bedLeg3);
  mattress.add(bedLeg4);
  bedLeg1.position.set(120 * 2.5, -30 * 2.5, 60 * 2.5);
  bedLeg2.position.set(120 * 2.5, -30 * 2.5, -60 * 2.5);
  bedLeg3.position.set(-120 * 2.5, -30 * 2.5, 60 * 2.5);
  bedLeg4.position.set(-120 * 2.5, -30 * 2.5, -60 * 2.5);

  let headboardGeo = new THREE.BoxGeometry(15 * 2.5, 90 * 2.5, 132 * 2.5);
  let headboardMesh = new THREE.MeshLambertMaterial({ color: 0xfa35cd });
  let headboard = new THREE.Mesh(headboardGeo, headboardMesh);
  mattress.add(headboard);
  headboard.position.set(-122 * 2.5, 30 * 2.5, 0)

  return mattress

}

THREE.wall = function (Xcoord1, Xcoord2, HEIGHT, Zcoord1, Zcoord2) {
  let xLength, zLength, xPosition, zPosition;
  xLength = Math.abs(Xcoord1 - Xcoord2);
  zLength = Math.abs(Zcoord1 - Zcoord2);
  xPosition = (Xcoord1 + Xcoord2) / 2;
  zPosition = (Zcoord1 + Zcoord2) / 2;

  let wallsizing = new THREE.BoxGeometry(xLength, HEIGHT, zLength);
  let wallskin = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/wallb.jpg") });
  let wallpiece = new THREE.Mesh(wallsizing, wallskin);

  wallpiece.position.set(xPosition, HEIGHT/2, zPosition);
  return wallpiece;
};

