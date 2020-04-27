

/**
 * @author mrdoob / http://mrdoob.com/
 * @author bhouston / http://clara.io/
 * @author stephomi / http://stephaneginier.com/
 */

function Raycaster(origin, direction, near, far) {

  this.ray = new Ray(origin, direction);
  // direction is assumed to be normalized (for accurate distance calculations)

  this.near = near || 0;
  this.far = far || Infinity;
  this.camera = null;
  this.layers = new Layers();

  this.params = {
    Mesh: {},
    Line: { threshold: 1 },
    LOD: {},
    Points: { threshold: 1 },
    Sprite: {}
  };

  Object.defineProperties(this.params, {
    PointCloud: {
      get: function () {

        console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');
        return this.Points;

      }
    }
  });

}

function ascSort(a, b) {

  return a.distance - b.distance;

}

function intersectObject(object, raycaster, intersects, recursive) {

  if (object.layers.test(raycaster.layers)) {

    object.raycast(raycaster, intersects);

  }

  if (recursive === true) {

    var children = object.children;

    for (var i = 0, l = children.length; i < l; i++) {

      intersectObject(children[i], raycaster, intersects, true);

    }

  }

}

Object.assign(Raycaster.prototype, {

  set: function (origin, direction) {

    // direction is assumed to be normalized (for accurate distance calculations)

    this.ray.set(origin, direction);

  },

  setFromCamera: function (coords, camera) {

    if ((camera && camera.isPerspectiveCamera)) {

      this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
      this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();
      this.camera = camera;

    } else if ((camera && camera.isOrthographicCamera)) {

      this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera); // set origin in plane of camera
      this.ray.direction.set(0, 0, - 1).transformDirection(camera.matrixWorld);
      this.camera = camera;

    } else {

      console.error('THREE.Raycaster: Unsupported camera type.');

    }

  },

  intersectObject: function (object, recursive, optionalTarget) {

    var intersects = optionalTarget || [];

    intersectObject(object, this, intersects, recursive);

    intersects.sort(ascSort);

    return intersects;

  },

  intersectObjects: function (objects, recursive, optionalTarget) {

    var intersects = optionalTarget || [];

    if (Array.isArray(objects) === false) {

      console.warn('THREE.Raycaster.intersectObjects: objects is not an Array.');
      return intersects;

    }

    for (var i = 0, l = objects.length; i < l; i++) {

      intersectObject(objects[i], this, intersects, recursive);

    }

    intersects.sort(ascSort);

    return intersects;

  }

});



var _vector = new Vector3();
var _segCenter = new Vector3();
var _segDir = new Vector3();
var _diff = new Vector3();

var _edge1 = new Vector3();
var _edge2 = new Vector3();
var _normal = new Vector3();

/**
 * @author bhouston / http://clara.io
 */

function Ray(origin, direction) {

  this.origin = (origin !== undefined) ? origin : new Vector3();
  this.direction = (direction !== undefined) ? direction : new Vector3(0, 0, - 1);

}

Object.assign(Ray.prototype, {

  set: function (origin, direction) {

    this.origin.copy(origin);
    this.direction.copy(direction);

    return this;

  },

  clone: function () {

    return new this.constructor().copy(this);

  },

  copy: function (ray) {

    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);

    return this;

  },

  at: function (t, target) {

    if (target === undefined) {

      console.warn('THREE.Ray: .at() target is now required');
      target = new Vector3();

    }

    return target.copy(this.direction).multiplyScalar(t).add(this.origin);

  },

  lookAt: function (v) {

    this.direction.copy(v).sub(this.origin).normalize();

    return this;

  },

  recast: function (t) {

    this.origin.copy(this.at(t, _vector));

    return this;

  },

  closestPointToPoint: function (point, target) {

    if (target === undefined) {

      console.warn('THREE.Ray: .closestPointToPoint() target is now required');
      target = new Vector3();

    }

    target.subVectors(point, this.origin);

    var directionDistance = target.dot(this.direction);

    if (directionDistance < 0) {

      return target.copy(this.origin);

    }

    return target.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);

  },

  distanceToPoint: function (point) {

    return Math.sqrt(this.distanceSqToPoint(point));

  },

  distanceSqToPoint: function (point) {

    var directionDistance = _vector.subVectors(point, this.origin).dot(this.direction);

    // point behind the ray

    if (directionDistance < 0) {

      return this.origin.distanceToSquared(point);

    }

    _vector.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);

    return _vector.distanceToSquared(point);

  },

  distanceSqToSegment: function (v0, v1, optionalPointOnRay, optionalPointOnSegment) {

    // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
    // It returns the min distance between the ray and the segment
    // defined by v0 and v1
    // It can also set two optional targets :
    // - The closest point on the ray
    // - The closest point on the segment

    _segCenter.copy(v0).add(v1).multiplyScalar(0.5);
    _segDir.copy(v1).sub(v0).normalize();
    _diff.copy(this.origin).sub(_segCenter);

    var segExtent = v0.distanceTo(v1) * 0.5;
    var a01 = - this.direction.dot(_segDir);
    var b0 = _diff.dot(this.direction);
    var b1 = - _diff.dot(_segDir);
    var c = _diff.lengthSq();
    var det = Math.abs(1 - a01 * a01);
    var s0, s1, sqrDist, extDet;

    if (det > 0) {

      // The ray and segment are not parallel.

      s0 = a01 * b1 - b0;
      s1 = a01 * b0 - b1;
      extDet = segExtent * det;

      if (s0 >= 0) {

        if (s1 >= - extDet) {

          if (s1 <= extDet) {

            // region 0
            // Minimum at interior points of ray and segment.

            var invDet = 1 / det;
            s0 *= invDet;
            s1 *= invDet;
            sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;

          } else {

            // region 1

            s1 = segExtent;
            s0 = Math.max(0, - (a01 * s1 + b0));
            sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

          }

        } else {

          // region 5

          s1 = - segExtent;
          s0 = Math.max(0, - (a01 * s1 + b0));
          sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

        }

      } else {

        if (s1 <= - extDet) {

          // region 4

          s0 = Math.max(0, - (- a01 * segExtent + b0));
          s1 = (s0 > 0) ? - segExtent : Math.min(Math.max(- segExtent, - b1), segExtent);
          sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

        } else if (s1 <= extDet) {

          // region 3

          s0 = 0;
          s1 = Math.min(Math.max(- segExtent, - b1), segExtent);
          sqrDist = s1 * (s1 + 2 * b1) + c;

        } else {

          // region 2

          s0 = Math.max(0, - (a01 * segExtent + b0));
          s1 = (s0 > 0) ? segExtent : Math.min(Math.max(- segExtent, - b1), segExtent);
          sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

        }

      }

    } else {

      // Ray and segment are parallel.

      s1 = (a01 > 0) ? - segExtent : segExtent;
      s0 = Math.max(0, - (a01 * s1 + b0));
      sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

    }

    if (optionalPointOnRay) {

      optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);

    }

    if (optionalPointOnSegment) {

      optionalPointOnSegment.copy(_segDir).multiplyScalar(s1).add(_segCenter);

    }

    return sqrDist;

  },

  intersectSphere: function (sphere, target) {

    _vector.subVectors(sphere.center, this.origin);
    var tca = _vector.dot(this.direction);
    var d2 = _vector.dot(_vector) - tca * tca;
    var radius2 = sphere.radius * sphere.radius;

    if (d2 > radius2) return null;

    var thc = Math.sqrt(radius2 - d2);

    // t0 = first intersect point - entrance on front of sphere
    var t0 = tca - thc;

    // t1 = second intersect point - exit point on back of sphere
    var t1 = tca + thc;

    // test to see if both t0 and t1 are behind the ray - if so, return null
    if (t0 < 0 && t1 < 0) return null;

    // test to see if t0 is behind the ray:
    // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
    // in order to always return an intersect point that is in front of the ray.
    if (t0 < 0) return this.at(t1, target);

    // else t0 is in front of the ray, so return the first collision point scaled by t0
    return this.at(t0, target);

  },

  intersectsSphere: function (sphere) {

    return this.distanceSqToPoint(sphere.center) <= (sphere.radius * sphere.radius);

  },

  distanceToPlane: function (plane) {

    var denominator = plane.normal.dot(this.direction);

    if (denominator === 0) {

      // line is coplanar, return origin
      if (plane.distanceToPoint(this.origin) === 0) {

        return 0;

      }

      // Null is preferable to undefined since undefined means.... it is undefined

      return null;

    }

    var t = - (this.origin.dot(plane.normal) + plane.constant) / denominator;

    // Return if the ray never intersects the plane

    return t >= 0 ? t : null;

  },

  intersectPlane: function (plane, target) {

    var t = this.distanceToPlane(plane);

    if (t === null) {

      return null;

    }

    return this.at(t, target);

  },

  intersectsPlane: function (plane) {

    // check if the ray lies on the plane first

    var distToPoint = plane.distanceToPoint(this.origin);

    if (distToPoint === 0) {

      return true;

    }

    var denominator = plane.normal.dot(this.direction);

    if (denominator * distToPoint < 0) {

      return true;

    }

    // ray origin is behind the plane (and is pointing behind it)

    return false;

  },

  intersectBox: function (box, target) {

    var tmin, tmax, tymin, tymax, tzmin, tzmax;

    var invdirx = 1 / this.direction.x,
      invdiry = 1 / this.direction.y,
      invdirz = 1 / this.direction.z;

    var origin = this.origin;

    if (invdirx >= 0) {

      tmin = (box.min.x - origin.x) * invdirx;
      tmax = (box.max.x - origin.x) * invdirx;

    } else {

      tmin = (box.max.x - origin.x) * invdirx;
      tmax = (box.min.x - origin.x) * invdirx;

    }

    if (invdiry >= 0) {

      tymin = (box.min.y - origin.y) * invdiry;
      tymax = (box.max.y - origin.y) * invdiry;

    } else {

      tymin = (box.max.y - origin.y) * invdiry;
      tymax = (box.min.y - origin.y) * invdiry;

    }

    if ((tmin > tymax) || (tymin > tmax)) return null;

    // These lines also handle the case where tmin or tmax is NaN
    // (result of 0 * Infinity). x !== x returns true if x is NaN

    if (tymin > tmin || tmin !== tmin) tmin = tymin;

    if (tymax < tmax || tmax !== tmax) tmax = tymax;

    if (invdirz >= 0) {

      tzmin = (box.min.z - origin.z) * invdirz;
      tzmax = (box.max.z - origin.z) * invdirz;

    } else {

      tzmin = (box.max.z - origin.z) * invdirz;
      tzmax = (box.min.z - origin.z) * invdirz;

    }

    if ((tmin > tzmax) || (tzmin > tmax)) return null;

    if (tzmin > tmin || tmin !== tmin) tmin = tzmin;

    if (tzmax < tmax || tmax !== tmax) tmax = tzmax;

    //return point closest to the ray (positive side)

    if (tmax < 0) return null;

    return this.at(tmin >= 0 ? tmin : tmax, target);

  },

  intersectsBox: function (box) {

    return this.intersectBox(box, _vector) !== null;

  },

  intersectTriangle: function (a, b, c, backfaceCulling, target) {

    // Compute the offset origin, edges, and normal.

    // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

    _edge1.subVectors(b, a);
    _edge2.subVectors(c, a);
    _normal.crossVectors(_edge1, _edge2);

    // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
    // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
    //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
    //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
    //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
    var DdN = this.direction.dot(_normal);
    var sign;

    if (DdN > 0) {

      if (backfaceCulling) return null;
      sign = 1;

    } else if (DdN < 0) {

      sign = - 1;
      DdN = - DdN;

    } else {

      return null;

    }

    _diff.subVectors(this.origin, a);
    var DdQxE2 = sign * this.direction.dot(_edge2.crossVectors(_diff, _edge2));

    // b1 < 0, no intersection
    if (DdQxE2 < 0) {

      return null;

    }

    var DdE1xQ = sign * this.direction.dot(_edge1.cross(_diff));

    // b2 < 0, no intersection
    if (DdE1xQ < 0) {

      return null;

    }

    // b1+b2 > 1, no intersection
    if (DdQxE2 + DdE1xQ > DdN) {

      return null;

    }

    // Line intersects triangle, check if ray does.
    var QdN = - sign * _diff.dot(_normal);

    // t < 0, no intersection
    if (QdN < 0) {

      return null;

    }

    // Ray intersects triangle.
    return this.at(QdN / DdN, target);

  },

  applyMatrix4: function (matrix4) {

    this.origin.applyMatrix4(matrix4);
    this.direction.transformDirection(matrix4);

    return this;

  },

  equals: function (ray) {

    return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);

  }

});

/**
 * @author mrdoob / http://mrdoob.com/
 */

function Layers() {

  this.mask = 1 | 0;

}

Object.assign(Layers.prototype, {

  set: function (channel) {

    this.mask = 1 << channel | 0;

  },

  enable: function (channel) {

    this.mask |= 1 << channel | 0;

  },

  enableAll: function () {

    this.mask = 0xffffffff | 0;

  },

  toggle: function (channel) {

    this.mask ^= 1 << channel | 0;

  },

  disable: function (channel) {

    this.mask &= ~(1 << channel | 0);

  },

  disableAll: function () {

    this.mask = 0;

  },

  test: function (layers) {

    return (this.mask & layers.mask) !== 0;

  }

});

// **
//  * @author mrdoob / http://mrdoob.com/
//  * @author kile / http://kile.stravaganza.org/
//  * @author philogb / http://blog.thejit.org/
//  * @author mikael emtinger / http://gomo.se/
//  * @author egraether / http://egraether.com/
//  * @author WestLangley / http://github.com/WestLangley
//  * /

var _vector = new Vector3();
var _quaternion = new Quaternion();

function Vector3(x, y, z) {

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;

}

Object.assign(Vector3.prototype, {

  isVector3: true,

  set: function (x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    return this;

  },

  setScalar: function (scalar) {

    this.x = scalar;
    this.y = scalar;
    this.z = scalar;

    return this;

  },

  setX: function (x) {

    this.x = x;

    return this;

  },

  setY: function (y) {

    this.y = y;

    return this;

  },

  setZ: function (z) {

    this.z = z;

    return this;

  },

  setComponent: function (index, value) {

    switch (index) {

      case 0: this.x = value; break;
      case 1: this.y = value; break;
      case 2: this.z = value; break;
      default: throw new Error('index is out of range: ' + index);

    }

    return this;

  },

  getComponent: function (index) {

    switch (index) {

      case 0: return this.x;
      case 1: return this.y;
      case 2: return this.z;
      default: throw new Error('index is out of range: ' + index);

    }

  },

  clone: function () {

    return new this.constructor(this.x, this.y, this.z);

  },

  copy: function (v) {

    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;

  },

  add: function (v, w) {

    if (w !== undefined) {

      console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);

    }

    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;

  },

  addScalar: function (s) {

    this.x += s;
    this.y += s;
    this.z += s;

    return this;

  },

  addVectors: function (a, b) {

    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;

    return this;

  },

  addScaledVector: function (v, s) {

    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;

    return this;

  },

  sub: function (v, w) {

    if (w !== undefined) {

      console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);

    }

    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;

  },

  subScalar: function (s) {

    this.x -= s;
    this.y -= s;
    this.z -= s;

    return this;

  },

  subVectors: function (a, b) {

    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return this;

  },

  multiply: function (v, w) {

    if (w !== undefined) {

      console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
      return this.multiplyVectors(v, w);

    }

    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;

    return this;

  },

  multiplyScalar: function (scalar) {

    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;

  },

  multiplyVectors: function (a, b) {

    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;

    return this;

  },

  applyEuler: function (euler) {

    if (!(euler && euler.isEuler)) {

      console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');

    }

    return this.applyQuaternion(_quaternion.setFromEuler(euler));

  },

  applyAxisAngle: function (axis, angle) {

    return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle));

  },

  applyMatrix3: function (m) {

    var x = this.x, y = this.y, z = this.z;
    var e = m.elements;

    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;

    return this;

  },

  applyNormalMatrix: function (m) {

    return this.applyMatrix3(m).normalize();

  },

  applyMatrix4: function (m) {

    var x = this.x, y = this.y, z = this.z;
    var e = m.elements;

    var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

    return this;

  },

  applyQuaternion: function (q) {

    var x = this.x, y = this.y, z = this.z;
    var qx = q.x, qy = q.y, qz = q.z, qw = q.w;

    // calculate quat * vector

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = - qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    return this;

  },

  project: function (camera) {

    return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);

  },

  unproject: function (camera) {

    return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);

  },

  transformDirection: function (m) {

    // input: THREE.Matrix4 affine matrix
    // vector interpreted as a direction

    var x = this.x, y = this.y, z = this.z;
    var e = m.elements;

    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;

    return this.normalize();

  },

  divide: function (v) {

    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;

    return this;

  },

  divideScalar: function (scalar) {

    return this.multiplyScalar(1 / scalar);

  },

  min: function (v) {

    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);

    return this;

  },

  max: function (v) {

    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);

    return this;

  },

  clamp: function (min, max) {

    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));

    return this;

  },

  clampScalar: function (minVal, maxVal) {

    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));

    return this;

  },

  clampLength: function (min, max) {

    var length = this.length();

    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

  },

  floor: function () {

    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);

    return this;

  },

  ceil: function () {

    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);

    return this;

  },

  round: function () {

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);

    return this;

  },

  roundToZero: function () {

    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

    return this;

  },

  negate: function () {

    this.x = - this.x;
    this.y = - this.y;
    this.z = - this.z;

    return this;

  },

  dot: function (v) {

    return this.x * v.x + this.y * v.y + this.z * v.z;

  },

  // TODO lengthSquared?

  lengthSq: function () {

    return this.x * this.x + this.y * this.y + this.z * this.z;

  },

  length: function () {

    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

  },

  manhattanLength: function () {

    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);

  },

  normalize: function () {

    return this.divideScalar(this.length() || 1);

  },

  setLength: function (length) {

    return this.normalize().multiplyScalar(length);

  },

  lerp: function (v, alpha) {

    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;

    return this;

  },

  lerpVectors: function (v1, v2, alpha) {

    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

  },

  cross: function (v, w) {

    if (w !== undefined) {

      console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
      return this.crossVectors(v, w);

    }

    return this.crossVectors(this, v);

  },

  crossVectors: function (a, b) {

    var ax = a.x, ay = a.y, az = a.z;
    var bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;

  },

  projectOnVector: function (v) {

    var denominator = v.lengthSq();

    if (denominator === 0) return this.set(0, 0, 0);

    var scalar = v.dot(this) / denominator;

    return this.copy(v).multiplyScalar(scalar);

  },

  projectOnPlane: function (planeNormal) {

    _vector.copy(this).projectOnVector(planeNormal);

    return this.sub(_vector);

  },

  reflect: function (normal) {

    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length

    return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));

  },

  angleTo: function (v) {

    var denominator = Math.sqrt(this.lengthSq() * v.lengthSq());

    if (denominator === 0) return Math.PI / 2;

    var theta = this.dot(v) / denominator;

    // clamp, to handle numerical problems

    return Math.acos(MathUtils.clamp(theta, - 1, 1));

  },

  distanceTo: function (v) {

    return Math.sqrt(this.distanceToSquared(v));

  },

  distanceToSquared: function (v) {

    var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

    return dx * dx + dy * dy + dz * dz;

  },

  manhattanDistanceTo: function (v) {

    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);

  },

  setFromSpherical: function (s) {

    return this.setFromSphericalCoords(s.radius, s.phi, s.theta);

  },

  setFromSphericalCoords: function (radius, phi, theta) {

    var sinPhiRadius = Math.sin(phi) * radius;

    this.x = sinPhiRadius * Math.sin(theta);
    this.y = Math.cos(phi) * radius;
    this.z = sinPhiRadius * Math.cos(theta);

    return this;

  },

  setFromCylindrical: function (c) {

    return this.setFromCylindricalCoords(c.radius, c.theta, c.y);

  },

  setFromCylindricalCoords: function (radius, theta, y) {

    this.x = radius * Math.sin(theta);
    this.y = y;
    this.z = radius * Math.cos(theta);

    return this;

  },

  setFromMatrixPosition: function (m) {

    var e = m.elements;

    this.x = e[12];
    this.y = e[13];
    this.z = e[14];

    return this;

  },

  setFromMatrixScale: function (m) {

    var sx = this.setFromMatrixColumn(m, 0).length();
    var sy = this.setFromMatrixColumn(m, 1).length();
    var sz = this.setFromMatrixColumn(m, 2).length();

    this.x = sx;
    this.y = sy;
    this.z = sz;

    return this;

  },

  setFromMatrixColumn: function (m, index) {

    return this.fromArray(m.elements, index * 4);

  },

  setFromMatrix3Column: function (m, index) {

    return this.fromArray(m.elements, index * 3);

  },

  equals: function (v) {

    return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));

  },

  fromArray: function (array, offset) {

    if (offset === undefined) offset = 0;

    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];

    return this;

  },

  toArray: function (array, offset) {

    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;

    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;

    return array;

  },

  fromBufferAttribute: function (attribute, index, offset) {

    if (offset !== undefined) {

      console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');

    }

    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);

    return this;

  },

  random: function () {

    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();

    return this;

  }

});

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */


function Quaternion(x, y, z, w) {

  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._w = (w !== undefined) ? w : 1;

}

Object.assign(Quaternion, {

  slerp: function (qa, qb, qm, t) {

    return qm.copy(qa).slerp(qb, t);

  },

  slerpFlat: function (dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {

    // fuzz-free, array-based Quaternion SLERP operation

    var x0 = src0[srcOffset0 + 0],
      y0 = src0[srcOffset0 + 1],
      z0 = src0[srcOffset0 + 2],
      w0 = src0[srcOffset0 + 3],

      x1 = src1[srcOffset1 + 0],
      y1 = src1[srcOffset1 + 1],
      z1 = src1[srcOffset1 + 2],
      w1 = src1[srcOffset1 + 3];

    if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {

      var s = 1 - t,

        cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,

        dir = (cos >= 0 ? 1 : - 1),
        sqrSin = 1 - cos * cos;

      // Skip the Slerp for tiny steps to avoid numeric problems:
      if (sqrSin > Number.EPSILON) {

        var sin = Math.sqrt(sqrSin),
          len = Math.atan2(sin, cos * dir);

        s = Math.sin(s * len) / sin;
        t = Math.sin(t * len) / sin;

      }

      var tDir = t * dir;

      x0 = x0 * s + x1 * tDir;
      y0 = y0 * s + y1 * tDir;
      z0 = z0 * s + z1 * tDir;
      w0 = w0 * s + w1 * tDir;

      // Normalize in case we just did a lerp:
      if (s === 1 - t) {

        var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);

        x0 *= f;
        y0 *= f;
        z0 *= f;
        w0 *= f;

      }

    }

    dst[dstOffset] = x0;
    dst[dstOffset + 1] = y0;
    dst[dstOffset + 2] = z0;
    dst[dstOffset + 3] = w0;

  },

  multiplyQuaternionsFlat: function (dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {

    var x0 = src0[srcOffset0];
    var y0 = src0[srcOffset0 + 1];
    var z0 = src0[srcOffset0 + 2];
    var w0 = src0[srcOffset0 + 3];

    var x1 = src1[srcOffset1];
    var y1 = src1[srcOffset1 + 1];
    var z1 = src1[srcOffset1 + 2];
    var w1 = src1[srcOffset1 + 3];

    dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
    dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
    dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
    dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

    return dst;

  }

});

Object.defineProperties(Quaternion.prototype, {

  x: {

    get: function () {

      return this._x;

    },

    set: function (value) {

      this._x = value;
      this._onChangeCallback();

    }

  },

  y: {

    get: function () {

      return this._y;

    },

    set: function (value) {

      this._y = value;
      this._onChangeCallback();

    }

  },

  z: {

    get: function () {

      return this._z;

    },

    set: function (value) {

      this._z = value;
      this._onChangeCallback();

    }

  },

  w: {

    get: function () {

      return this._w;

    },

    set: function (value) {

      this._w = value;
      this._onChangeCallback();

    }

  }

});

Object.assign(Quaternion.prototype, {

  isQuaternion: true,

  set: function (x, y, z, w) {

    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;

    this._onChangeCallback();

    return this;

  },

  clone: function () {

    return new this.constructor(this._x, this._y, this._z, this._w);

  },

  copy: function (quaternion) {

    this._x = quaternion.x;
    this._y = quaternion.y;
    this._z = quaternion.z;
    this._w = quaternion.w;

    this._onChangeCallback();

    return this;

  },

  setFromEuler: function (euler, update) {

    if (!(euler && euler.isEuler)) {

      throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');

    }

    var x = euler._x, y = euler._y, z = euler._z, order = euler.order;

    // http://www.mathworks.com/matlabcentral/fileexchange/
    // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
    //	content/SpinCalc.m

    var cos = Math.cos;
    var sin = Math.sin;

    var c1 = cos(x / 2);
    var c2 = cos(y / 2);
    var c3 = cos(z / 2);

    var s1 = sin(x / 2);
    var s2 = sin(y / 2);
    var s3 = sin(z / 2);

    switch (order) {

      case 'XYZ':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'YXZ':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      case 'ZXY':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'ZYX':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      case 'YZX':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'XZY':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      default:
        console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order);

    }

    if (update !== false) this._onChangeCallback();

    return this;

  },

  setFromAxisAngle: function (axis, angle) {

    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

    // assumes axis is normalized

    var halfAngle = angle / 2, s = Math.sin(halfAngle);

    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);

    this._onChangeCallback();

    return this;

  },

  setFromRotationMatrix: function (m) {

    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements,

      m11 = te[0], m12 = te[4], m13 = te[8],
      m21 = te[1], m22 = te[5], m23 = te[9],
      m31 = te[2], m32 = te[6], m33 = te[10],

      trace = m11 + m22 + m33,
      s;

    if (trace > 0) {

      s = 0.5 / Math.sqrt(trace + 1.0);

      this._w = 0.25 / s;
      this._x = (m32 - m23) * s;
      this._y = (m13 - m31) * s;
      this._z = (m21 - m12) * s;

    } else if (m11 > m22 && m11 > m33) {

      s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

      this._w = (m32 - m23) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21) / s;
      this._z = (m13 + m31) / s;

    } else if (m22 > m33) {

      s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

      this._w = (m13 - m31) / s;
      this._x = (m12 + m21) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32) / s;

    } else {

      s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

      this._w = (m21 - m12) / s;
      this._x = (m13 + m31) / s;
      this._y = (m23 + m32) / s;
      this._z = 0.25 * s;

    }

    this._onChangeCallback();

    return this;

  },

  setFromUnitVectors: function (vFrom, vTo) {

    // assumes direction vectors vFrom and vTo are normalized

    var EPS = 0.000001;

    var r = vFrom.dot(vTo) + 1;

    if (r < EPS) {

      r = 0;

      if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {

        this._x = - vFrom.y;
        this._y = vFrom.x;
        this._z = 0;
        this._w = r;

      } else {

        this._x = 0;
        this._y = - vFrom.z;
        this._z = vFrom.y;
        this._w = r;

      }

    } else {

      // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

      this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
      this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
      this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
      this._w = r;

    }

    return this.normalize();

  },

  angleTo: function (q) {

    return 2 * Math.acos(Math.abs(MathUtils.clamp(this.dot(q), - 1, 1)));

  },

  rotateTowards: function (q, step) {

    var angle = this.angleTo(q);

    if (angle === 0) return this;

    var t = Math.min(1, step / angle);

    this.slerp(q, t);

    return this;

  },

  inverse: function () {

    // quaternion is assumed to have unit length

    return this.conjugate();

  },

  conjugate: function () {

    this._x *= - 1;
    this._y *= - 1;
    this._z *= - 1;

    this._onChangeCallback();

    return this;

  },

  dot: function (v) {

    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

  },

  lengthSq: function () {

    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

  },

  length: function () {

    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);

  },

  normalize: function () {

    var l = this.length();

    if (l === 0) {

      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;

    } else {

      l = 1 / l;

      this._x = this._x * l;
      this._y = this._y * l;
      this._z = this._z * l;
      this._w = this._w * l;

    }

    this._onChangeCallback();

    return this;

  },

  multiply: function (q, p) {

    if (p !== undefined) {

      console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
      return this.multiplyQuaternions(q, p);

    }

    return this.multiplyQuaternions(this, q);

  },

  premultiply: function (q) {

    return this.multiplyQuaternions(q, this);

  },

  multiplyQuaternions: function (a, b) {

    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
    var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    this._onChangeCallback();

    return this;

  },

  slerp: function (qb, t) {

    if (t === 0) return this;
    if (t === 1) return this.copy(qb);

    var x = this._x, y = this._y, z = this._z, w = this._w;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

    if (cosHalfTheta < 0) {

      this._w = - qb._w;
      this._x = - qb._x;
      this._y = - qb._y;
      this._z = - qb._z;

      cosHalfTheta = - cosHalfTheta;

    } else {

      this.copy(qb);

    }

    if (cosHalfTheta >= 1.0) {

      this._w = w;
      this._x = x;
      this._y = y;
      this._z = z;

      return this;

    }

    var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= Number.EPSILON) {

      var s = 1 - t;
      this._w = s * w + t * this._w;
      this._x = s * x + t * this._x;
      this._y = s * y + t * this._y;
      this._z = s * z + t * this._z;

      this.normalize();
      this._onChangeCallback();

      return this;

    }

    var sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
      ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this._w = (w * ratioA + this._w * ratioB);
    this._x = (x * ratioA + this._x * ratioB);
    this._y = (y * ratioA + this._y * ratioB);
    this._z = (z * ratioA + this._z * ratioB);

    this._onChangeCallback();

    return this;

  },

  equals: function (quaternion) {

    return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);

  },

  fromArray: function (array, offset) {

    if (offset === undefined) offset = 0;

    this._x = array[offset];
    this._y = array[offset + 1];
    this._z = array[offset + 2];
    this._w = array[offset + 3];

    this._onChangeCallback();

    return this;

  },

  toArray: function (array, offset) {

    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;

    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._w;

    return array;

  },

  fromBufferAttribute: function (attribute, index) {

    this._x = attribute.getX(index);
    this._y = attribute.getY(index);
    this._z = attribute.getZ(index);
    this._w = attribute.getW(index);

    return this;

  },

  _onChange: function (callback) {

    this._onChangeCallback = callback;

    return this;

  },

  _onChangeCallback: function () { }

});

