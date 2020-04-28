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
}

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
}

//wall
THREE.wall = function (Xcoord1, Xcoord2, Zcoord1, Zcoord2, HEIGHT) {
  let wallpiece = new THREE.BoxBufferGeometry((Math.abs(Xcoord2) - Math.abs(Xcoord1)), HEIGHT, (Math.abs(Zcoord2) - Math.abs(Zcoord1)));
  wallpiece.position.set((Xcoord2 - Xcoord1) / 2, HEIGHT / 2, (Zcoord2 - Zcoord1) / 2);
  return wallpiece;
}
// surgery table
THREE.surgeryTable = function (PositionX, PositionY, PositionZ, Orientation) {


  var baseGeo = new THREE.CylinderBufferGeometry(80 * 1.5, 100 * 1.5, 40 * 1.5, 12);
  var baseMat = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  var base = new THREE.Mesh(baseGeo, baseMat)
  base.position.set(PositionX, PositionY, PositionZ);
  base.rotateY(Math.PI / Orientation)

  var connector1Geo = new THREE.CylinderBufferGeometry(5 * 1.5, 5 * 1.5, 140 * 1.5, 240);
  var connector1Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') }
  );
  var connector1 = new THREE.Mesh(connector1Geo, connector1Mesh);
  var connector2 = new THREE.Mesh(connector1Geo, connector1Mesh);
  connector1.rotateX(Math.PI / 4)
  connector1.position.set(-50 * 1.5, 60 * 1.5, 20 * 1.5)
  connector2.rotateX(Math.PI / 4)
  connector2.position.set(50 * 1.5, 60 * 1.5, 20 * 1.5)

  var connector3Geo = new THREE.CylinderBufferGeometry(5 * 1.5, 5 * 1.5, 200 * 1.5, 240);
  var connector3Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') }
  );

  var connector3 = new THREE.Mesh(connector3Geo, connector3Mesh);
  var connector4 = new THREE.Mesh(connector3Geo, connector3Mesh)
  connector3.rotateX(-(Math.PI / 4))
  connector3.position.set(50 * 1.5, 80 * 1.5, -30 * 1.5)
  connector4.rotateX(-(Math.PI / 4))
  connector4.position.set(-50 * 1.5, 80 * 1.5, -30 * 1.5)

  var slabGeo = new THREE.BoxBufferGeometry(150 * 1.5, 8 * 1.5, 300 * 1.5)
  var slabMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') })
  var slab = new THREE.Mesh(slabGeo, slabMesh)
  slab.position.set(0, 130 * 1.5, 0)
  slab.rotateX(Math.PI / 13)

  var headRestGeo = new THREE.BoxBufferGeometry(150 * 1.5, 8 * 1.5, 75 * 1.5)
  var headRestMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab3.jpg') })
  var headRest = new THREE.Mesh(headRestGeo, headRestMesh)
  headRest.position.set(0, 180 * 1.5, -170 * 1.5)
  headRest.rotateX(Math.PI / 7)

  var shackleLegsGeo = new THREE.CylinderBufferGeometry(12 * 1.5, 12 * 1.5, 12 * 1.5, 12, 3, false, 1.4, 3.5)
  var shackleArmsGeo = new THREE.CylinderBufferGeometry(10 * 1.5, 10 * 1.5, 10 * 1.5, 10, 3, false, 1.4, 3.5)
  var shackleMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') })
  var shackleLeftLeg = new THREE.Mesh(shackleLegsGeo, shackleMesh)
  shackleLeftLeg.position.set(30 * 1.5, 115 * 1.5, 80 * 1.5)
  shackleLeftLeg.rotateX(Math.PI / 1.5)

  var shackleRightLeg = new THREE.Mesh(shackleLegsGeo, shackleMesh)
  shackleRightLeg.position.set(-30 * 1.5, 115 * 1.5, 80 * 1.5)
  shackleRightLeg.rotateX(Math.PI / 1.5)

  var shackleRightArm = new THREE.Mesh(shackleArmsGeo, shackleMesh)
  shackleRightArm.position.set(-55 * 1.5, 142 * 1.5, -30 * 1.5)
  shackleRightArm.rotateX(Math.PI / 1.5)

  var shackleLeftArm = new THREE.Mesh(shackleArmsGeo, shackleMesh)
  shackleLeftArm.position.set(55 * 1.5, 142 * 1.5, -30 * 1.5)
  shackleLeftArm.rotateX(Math.PI / 1.5)

  base.add(connector1)
  base.add(connector2)
  base.add(connector3)
  base.add(connector4)
  base.add(slab)
  base.add(headRest)
  base.add(shackleLeftLeg)
  base.add(shackleRightLeg)
  base.add(shackleRightArm)
  base.add(shackleLeftArm)

  return base

}
//tools table
THREE.toolsTable = function (PositionX, PositionY, PositionZ, Orientation) {

  let toolsBaseGeo = new THREE.BoxBufferGeometry(50 * 1.5, 8 * 1.5, 70 * 1.5);
  let toolsBaseMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  let toolsBase = new THREE.Mesh(toolsBaseGeo, toolsBaseMesh)
  toolsBase.position.set(PositionX, PositionY, PositionZ)
  toolsBase.rotateY(Orientation)

  let toolsStalkGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 130 * 1.5)
  let toolsStalkMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') })
  let toolsStalk = new THREE.Mesh(toolsStalkGeo, toolsStalkMesh)
  toolsStalk.position.set(0, 65 * 1.5, 25 * 1.5)

  let toolsBinGeo = new THREE.BoxBufferGeometry(60 * 1.5, 4 * 1.5, 45 * 1.5)
  let toolsBinMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/surgerytools.jpg') })
  let toolsBin = new THREE.Mesh(toolsBinGeo, toolsBinMesh)
  toolsBin.position.set(0 * 1.5, 130 * 1.5, 5 * 1.5)

  let toolsLipFrontGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 60 * 1.5, 3, 6, false, 7.8, 3.2)
  let toolsLipMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') })
  let toolsLipFront = new THREE.Mesh(toolsLipFrontGeo, toolsLipMesh)
  toolsLipFront.rotateZ(Math.PI / 2)
  toolsLipFront.position.set(0, 0, -22.5 * 1.5)

  let toolsLipBackGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 60 * 1.5, 3, 6, false, 4.6, 3.2)
  let toolsLipBack = new THREE.Mesh(toolsLipBackGeo, toolsLipMesh)
  toolsLipBack.rotateZ(Math.PI / 2)
  toolsLipBack.position.set(0, 0, 22.5 * 1.5)

  let toolsLipRightGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 45 * 1.5, 3, 6, false, 4.6, 3.2)
  let toolsLipRight = new THREE.Mesh(toolsLipRightGeo, toolsLipMesh)
  toolsLipRight.rotateZ(Math.PI / 2)
  toolsLipRight.rotateX(Math.PI / 2)
  toolsLipRight.position.set(30 * 1.5, 0, 0)

  let toolsLipLeftGeo = new THREE.CylinderBufferGeometry(4 * 1.5, 4 * 1.5, 45 * 1.5, 3, 6, false, 3, 3.2)
  let toolsLipLeft = new THREE.Mesh(toolsLipLeftGeo, toolsLipMesh)

  toolsLipLeft.rotateX(Math.PI / 2)
  toolsLipLeft.position.set(-30 * 1.5, 0, 0)

  toolsBin.add(toolsLipLeft)
  toolsBin.add(toolsLipRight)
  toolsBin.add(toolsLipBack)
  toolsBin.add(toolsLipFront)
  toolsBase.add(toolsBin)
  toolsBase.add(toolsStalk)

  return toolsBase

}
// door frame

THREE.doorSimple = function (PositionX, PositionY, PositionZ, Orientation) {
  let doorGeo = new THREE.BoxBufferGeometry(100 * 2, 250 * 2, 20 * 2)
  let doorMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/door931-fixed.jpg') })
  let door = new THREE.Mesh(doorGeo, doorMesh)
  door.position.set(PositionX, PositionY, PositionZ)
  door.rotateY(Math.PI / Orientation)

  // let doorHandleGeo = new THREE.SphereGeometry(5 * 2, 20 * 2, 6 * 2)
  // let doorHandleMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/brassknob.jpg') })
  // let doorHandle = new THREE.Mesh(doorHandleGeo, doorHandleMesh)
  // doorHandle.position.set(40 * 2, 0, -14 * 2)
  // door.add(doorHandle)

  let doorFrameTopGeo = new THREE.BoxBufferGeometry(100 * 2, 20 * 2, 30 * 2)
  let doorFrameTopMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') })
  let doorFrameTop = new THREE.Mesh(doorFrameTopGeo, doorFrameTopMesh)
  door.add(doorFrameTop)
  doorFrameTop.position.set(0, 125 * 2, 0)

  let doorFrameSidesGeo = new THREE.BoxBufferGeometry(20 * 2, 270 * 2, 30 * 2)
  let doorFrameSidesMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') })
  let doorFrameLeft = new THREE.Mesh(doorFrameSidesGeo, doorFrameSidesMesh)
  let doorFrameRight = new THREE.Mesh(doorFrameSidesGeo, doorFrameSidesMesh)
  door.add(doorFrameLeft)
  door.add(doorFrameRight)
  doorFrameRight.position.set(-60 * 2, 0, 0)
  doorFrameLeft.position.set(60 * 2, 0, 0)

  return door
}

// key
THREE.key = function (PositionX, PositionY, PositionZ, Orientation) {

  let keyRingGeo = new THREE.TorusBufferGeometry(10, 3, 3, 100);
  let keyRingMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') })
  let keyRing = new THREE.Mesh(keyRingGeo, keyRingMaterial);
  keyRing.position.set(PositionX, PositionY, PositionZ)
  keyRing.rotateY(Math.PI / Orientation)

  let keyStalkGeo = new THREE.CylinderBufferGeometry(3, 3, 50, 14)
  let keyStalkMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') })
  let keyStalk = new THREE.Mesh(keyStalkGeo, keyStalkMaterial)
  keyStalk.rotateX(Math.PI / 2)
  keyStalk.rotateZ(Math.PI / 2)
  keyStalk.position.set(35, 0, 0)
  keyRing.add(keyStalk)

  let keyTooth1Geo = new THREE.BoxBufferGeometry(5, 5, 3)
  let keyTooth1Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') })
  let keyTooth1 = new THREE.Mesh(keyTooth1Geo, keyTooth1Mesh)
  keyTooth1.position.set(40, -5, 0)

  let keyTooth2Geo = new THREE.BoxBufferGeometry(5, 9, 3)
  let keyTooth2 = new THREE.Mesh(keyTooth2Geo, keyTooth1Mesh)
  keyTooth2.position.set(50, -5, 0)

  keyRing.add(keyTooth1);
  keyRing.add(keyTooth2);

  return keyRing
}
