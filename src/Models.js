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
  let wheelGeo = new THREE.CylinderGeometry(50, 50, 4, 24);
  let wheelMesh = new THREE.MeshLambertMaterial({ color: 0x0033aa });
  let wheel1 = new THREE.Mesh(wheelGeo, wheelMesh);
  wheel1.rotateZ(Math.PI / 2);
  wheel1.position.set(42, -25, -10);
  let wheel2 = new THREE.Mesh(wheelGeo, wheelMesh);
  wheel2.rotateZ(Math.PI / 2);
  wheel2.position.set(-42, -25, -10);

  let tireGeo = new THREE.TorusGeometry(50, 4, 12, 12);
  let tireMesh = new THREE.MeshLambertMaterial({ color: 0xaacc22 });
  let tire1 = new THREE.Mesh(tireGeo, tireMesh);
  tire1.rotateY(Math.PI / 2);
  tire1.position.set(-42, -25, -10);
  let tire2 = new THREE.Mesh(tireGeo, tireMesh);
  tire2.rotateY(Math.PI / 2);
  tire2.position.set(42, -25, -10);

  let chairSeatGeo = new THREE.BoxGeometry(75, 8, 75);
  let chairSeatMesh = new THREE.MeshLambertMaterial({ color: 0x00ffdd });
  let chairSeat = new THREE.Mesh(chairSeatGeo, chairSeatMesh);
  chairSeat.position.set(PositionX, PositionY, PositionZ);
  chairSeat.rotateY(Math.PI / Orientation);

  let backGeo = new THREE.BoxGeometry(75, 6, 90);
  let backMesh = new THREE.MeshLambertMaterial({ color: 0xff00aa });
  let back = new THREE.Mesh(backGeo, backMesh);
  back.rotateX(Math.PI / 2.8);
  back.position.set(0, 30, -40);

  let handleGeo = new THREE.CylinderGeometry(4, 4, 20, 16);
  let handleMesh = new THREE.MeshLambertMaterial({ color: 0xaadd33 });
  let handleRight = new THREE.Mesh(handleGeo, handleMesh);
  handleRight.rotateX(Math.PI / 2);
  handleRight.position.set(-35, 60, -65);

  let handleLeft = new THREE.Mesh(handleGeo, handleMesh);
  handleLeft.rotateX(Math.PI / 2);
  handleLeft.position.set(35, 60, -65);

  let axleGeo = new THREE.BoxGeometry(80, 2, 2);
  let axleMesh = new THREE.MeshLambertMaterial({ color: 0x00ff77 });
  let axle = new THREE.Mesh(axleGeo, axleMesh);
  axle.position.set(0, -30, -10);

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
console.log(wallpiece.position)
return wallpiece;
}
