import * as THREE from "three";

THREE.table = function (SCALE, HEIGHT, PositionX, PositionZ) {
  var tableBoardGeometry = new THREE.CubeGeometry(SCALE, SCALE / 10, SCALE);
  var tableBoardMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/wood1.jpg") })
  var tableBoard = new THREE.Mesh(tableBoardGeometry, tableBoardMaterial)
  tableBoard.position.x = PositionX;
  tableBoard.position.y = HEIGHT;
  tableBoard.position.z = PositionZ;

  const tableLegsGeometry = new THREE.CubeGeometry(SCALE / 10, tableBoard.position.y, SCALE / 10);
  const tableLegsMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("./assets/images/wood1.jpg") })
  const tableLeg1 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial)
  const tableLeg2 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial)
  const tableLeg3 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial)
  const tableLeg4 = new THREE.Mesh(tableLegsGeometry, tableLegsMaterial)
  tableLeg1.position.set(SCALE / 4, -(tableBoard.position.y / 2), SCALE / 4)
  tableLeg2.position.set(- SCALE / 4, - (tableBoard.position.y / 2), SCALE / 4)
  tableLeg3.position.set(SCALE / 4, - (tableBoard.position.y / 2), -SCALE / 4)
  tableLeg4.position.set(-SCALE / 4, - (tableBoard.position.y / 2), -SCALE / 4)

  tableBoard.add(tableLeg1);
  tableBoard.add(tableLeg2);
  tableBoard.add(tableLeg3);
  tableBoard.add(tableLeg4);

  return tableBoard;
}