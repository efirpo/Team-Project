import * as THREE from "three";

//table
THREE.table = function (SCALE, HEIGHT, PositionX, PositionZ) {
  var tableBoardGeometry = new THREE.CubeGeometry(SCALE, SCALE / 10, SCALE);
  var tableBoardMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/wood1.jpg") });
  var tableBoard = new THREE.Mesh(tableBoardGeometry, tableBoardMaterial);
  tableBoard.position.x = PositionX;
  tableBoard.position.y = HEIGHT;
  tableBoard.position.z = PositionZ;

  const tableLegsGeometry = new THREE.CubeGeometry(SCALE / 10, tableBoard.position.y, SCALE / 10);
  const tableLegsMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/wood1.jpg") });
  const tableLeg1 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  const tableLeg2 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  const tableLeg3 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  const tableLeg4 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial);
  tableLeg1.position.set(SCALE / 4, -(tableBoard.position.y / 2), SCALE / 4);
  tableLeg2.position.set(- SCALE / 4, - (tableBoard.position.y / 2), SCALE / 4);
  tableLeg3.position.set(SCALE / 4, - (tableBoard.position.y / 2), -SCALE / 4);
  tableLeg4.position.set(-SCALE / 4, - (tableBoard.position.y / 2), -SCALE / 4);

  tableBoard.add(tableLeg1);
  tableBoard.add(tableLeg2);
  tableBoard.add(tableLeg3);
  tableBoard.add(tableLeg4);

  return tableBoard;
}

//wheelchair
THREE.wheelchair = function (PositionX, PositionY, PositionZ, Orientation) {
  let wheelGeo = new THREE.CylinderGeometry(50 * 1.8, 50 * 1.8, 4 * 1.8, 24);
  let wheelMesh = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/wheel.png") });
  let wheel1 = new THREE.Mesh(wheelGeo, wheelMesh);
  wheel1.rotateZ(Math.PI / 2);
  wheel1.position.set(42 * 1.8, -25 * 1.8, -10 * 1.8);
  let wheel2 = new THREE.Mesh(wheelGeo, wheelMesh);
  wheel2.rotateZ(Math.PI / 2);
  wheel2.position.set(-42 * 1.8, -25 * 1.8, -10 * 1.8);

  let tireGeo = new THREE.TorusGeometry(50 * 1.8, 4 * 1.8, 12, 12);
  let tireMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/tire.png") });
  let tire1 = new THREE.Mesh(tireGeo, tireMesh);
  tire1.rotateY(Math.PI / 2);
  tire1.position.set(-42 * 1.8, -25 * 1.8, -10 * 1.8);
  let tire2 = new THREE.Mesh(tireGeo, tireMesh);
  tire2.rotateY(Math.PI / 2);
  tire2.position.set(42 * 1.8, -25 * 1.8, -10 * 1.8);

  let chairSeatGeo = new THREE.BoxGeometry(75 * 1.8, 8 * 1.8, 75 * 1.8);
  let chairSeatMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/leather.jpg') });
  let chairSeat = new THREE.Mesh(chairSeatGeo, chairSeatMesh);
  chairSeat.position.set(PositionX, PositionY, PositionZ);
  chairSeat.rotateY(Math.PI / Orientation);

  let backGeo = new THREE.BoxGeometry(75 * 1.8, 6 * 1.8, 90 * 1.8);
  let backMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/back.jpeg') });
  let back = new THREE.Mesh(backGeo, backMesh);
  back.rotateX(Math.PI / 2.8);
  back.position.set(0, 30 * 1.8, -40 * 1.8);

  let handleGeo = new THREE.CylinderGeometry(4 * 1.8, 4 * 1.8, 20 * 1.8, 16);
  let handleMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/tire.png") });
  let handleRight = new THREE.Mesh(handleGeo, handleMesh);
  handleRight.rotateX(Math.PI / 2);
  handleRight.position.set(-35 * 1.8, 60 * 1.8, -65 * 1.8);

  let handleLeft = new THREE.Mesh(handleGeo, handleMesh);
  handleLeft.rotateX(Math.PI / 2);
  handleLeft.position.set(35 * 1.8, 60 * 1.8, -65 * 1.8);

  let axleGeo = new THREE.BoxGeometry(80 * 1.8, 2 * 1.8, 2 * 1.8);
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
  let wallpiece = new THREE.BoxGeometry((Math.abs(Xcoord2) - Math.abs(Xcoord1)), HEIGHT, (Math.abs(Zcoord2) - Math.abs(Zcoord1)));
  wallpiece.position.set((Xcoord2 - Xcoord1) / 2, HEIGHT / 2, (Zcoord2 - Zcoord1) / 2);
  return wallpiece;
}

THREE.surgeryTable = function (PositionX, PositionY, PositionZ, Orientation) {


  var baseGeo = new THREE.CylinderGeometry(80 * 1.5, 100 * 1.5, 40 * 1.5, 12);
  var baseMat = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') });
  var base = new THREE.Mesh(baseGeo, baseMat)
  base.position.set(PositionX, PositionY, PositionZ);
  base.rotateY(Math.PI / Orientation)

  var connector1Geo = new THREE.CylinderGeometry(5 * 1.5, 5 * 1.5, 140 * 1.5, 240);
  var connector1Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') }
  );
  var connector1 = new THREE.Mesh(connector1Geo, connector1Mesh);
  var connector2 = new THREE.Mesh(connector1Geo, connector1Mesh);
  connector1.rotateX(Math.PI / 4)
  connector1.position.set(-50 * 1.5, 60 * 1.5, 20 * 1.5)
  connector2.rotateX(Math.PI / 4)
  connector2.position.set(50 * 1.5, 60 * 1.5, 20 * 1.5)

  var connector3Geo = new THREE.CylinderGeometry(5 * 1.5, 5 * 1.5, 200 * 1.5, 240);
  var connector3Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/steel1.jpeg') }
  );

  var connector3 = new THREE.Mesh(connector3Geo, connector3Mesh);
  var connector4 = new THREE.Mesh(connector3Geo, connector3Mesh)
  connector3.rotateX(-(Math.PI / 4))
  connector3.position.set(50 * 1.5, 80 * 1.5, -30 * 1.5)
  connector4.rotateX(-(Math.PI / 4))
  connector4.position.set(-50 * 1.5, 80 * 1.5, -30 * 1.5)

  var slabGeo = new THREE.BoxGeometry(150 * 1.5, 8 * 1.5, 300 * 1.5)
  var slabMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab2.jpg') })
  var slab = new THREE.Mesh(slabGeo, slabMesh)
  slab.position.set(0, 130 * 1.5, 0)
  slab.rotateX(Math.PI / 13)

  var headRestGeo = new THREE.BoxGeometry(150 * 1.5, 8 * 1.5, 75 * 1.5)
  var headRestMesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/slab3.jpg') })
  var headRest = new THREE.Mesh(headRestGeo, headRestMesh)
  headRest.position.set(0, 180 * 1.5, -170 * 1.5)
  headRest.rotateX(Math.PI / 7)

  var shackleLegsGeo = new THREE.CylinderGeometry(12 * 1.5, 12 * 1.5, 12 * 1.5, 12, 3, false, 1.4, 3.5)
  var shackleArmsGeo = new THREE.CylinderGeometry(10 * 1.5, 10 * 1.5, 10 * 1.5, 10, 3, false, 1.4, 3.5)
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

THREE.key = function (PositionX, PositionY, PositionZ, Orientation) {

  let keyRingGeo = new THREE.TorusGeometry(10, 3, 3, 100);
  let keyRingMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') })
  let keyRing = new THREE.Mesh(keyRingGeo, keyRingMaterial);
  keyRing.position.set(PositionX, PositionY, PositionZ)
  keyRing.rotateY(Math.PI / Orientation)

  let keyStalkGeo = new THREE.CylinderGeometry(3, 3, 50, 14)
  let keyStalkMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') })
  let keyStalk = new THREE.Mesh(keyStalkGeo, keyStalkMaterial)
  keyStalk.rotateX(Math.PI / 2)
  keyStalk.rotateZ(Math.PI / 2)
  keyStalk.position.set(35, 0, 0)
  keyRing.add(keyStalk)

  let keyTooth1Geo = new THREE.BoxGeometry(5, 5, 3)
  let keyTooth1Mesh = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('./assets/images/gold.jpg') })
  let keyTooth1 = new THREE.Mesh(keyTooth1Geo, keyTooth1Mesh)
  keyTooth1.position.set(40, -5, 0)

  let keyTooth2Geo = new THREE.BoxGeometry(5, 9, 3)
  let keyTooth2 = new THREE.Mesh(keyTooth2Geo, keyTooth1Mesh)
  keyTooth2.position.set(50, -5, 0)

  keyRing.add(keyTooth1);
  keyRing.add(keyTooth2);

  return keyRing
}
