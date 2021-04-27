// var m = null;
//
// function saveModelMatrix(tile3dset) {
//     if (!m)
//         m = tile3dset.modelMatrix.clone(new Cesium.Matrix4());
// }
let lastX = 0;
let lastY = 0;
let lastZ = 0;

/**
 * 变换控制器
 */
function changeX(tile3dset, step) {
    let delta = step - lastX;
    let m = tile3dset.modelMatrix;
    let t = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(delta, 0, 0));
    tile3dset.modelMatrix = Cesium.Matrix4.multiply(t, m, t);
    lastX = step;
}

function changeY(tile3dset, step) {
    let delta = step - lastY;
    let m = tile3dset.modelMatrix;
    let t = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0, delta, 0));
    tile3dset.modelMatrix = Cesium.Matrix4.multiply(t, m, t);
    lastY = step;
}

function changeZ(tile3dset, step) {
    let delta = step - lastZ;
    let m = tile3dset.modelMatrix;
    let t = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0, 0, delta));
    tile3dset.modelMatrix = Cesium.Matrix4.multiply(t, m, t);
    lastZ = step;
}


/**
 * 计算绕两个矢量的叉积矢量旋转两个矢量的夹角的旋转
 */
function caculateRotationBetweenCartesians(from, to) {
    //旋转轴为两个矢量的叉积
    const axis = Cesium.Cartesian3.cross(from, to, new Cesium.Cartesian3());
    //夹角
    const angle = Cesium.Cartesian3.angleBetween(from, to);
    const quaternion = Cesium.Quaternion.fromAxisAngle(axis, angle);
    return Cesium.Matrix4.fromTranslationQuaternionRotationScale(Cesium.Cartesian3.ZERO, quaternion,
        new Cesium.Cartesian3(1, 1, 1));
}
