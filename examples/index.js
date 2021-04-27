function transform(tileset, {height, lng, lat}) {
    height = Number(height), lng = Number(lng), lat = Number(lat);
    if (isNaN(height) || isNaN(lng) || isNaN(lat)) {
        return;
    }
    var origin = tileset.boundingSphere.center;
    var center = new Cesium.Cartesian3(0, 0, 0);
    var target = Cesium.Cartesian3.fromDegrees(
        lng, lat, 1000
    );

    var translationValue = Cesium.Cartesian3.subtract(
        target,
        origin,
        new Cesium.Cartesian3()
    );
    let m = tileset.modelMatrix;
    let translation1 = Cesium.Matrix4.fromTranslation(translationValue);
    m = translation1;

    // let rotationValue = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(rotationZ), new Cesium.Matrix3());
    // let rotation = Cesium.Matrix4.fromRotationTranslation(rotationValue);
    // Cesium.Matrix4.multiply(rotation, m, m);
    // rotationValue = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(rotationY), new Cesium.Matrix3());
    // rotation = Cesium.Matrix4.fromRotationTranslation(rotationValue);
    // Cesium.Matrix4.multiply(rotation, m, m);
    // rotationValue = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(rotationX), new Cesium.Matrix3());
    // rotation = Cesium.Matrix4.fromRotationTranslation(rotationValue);
    // Cesium.Matrix4.multiply(rotation, m, m);

    translationValue = Cesium.Cartesian3.subtract(
        target,
        center,
        new Cesium.Cartesian3()
    );
    let translation2 = Cesium.Matrix4.fromTranslation(translationValue);

    let r = rotation();
    // Cesium.Matrix4.multiply(r, m, m);


    tileset.modelMatrix = m;
}

function rotation({head = 0, pitch = 0, roll = 0}) {
    const headingPitchRoll = Cesium.HeadingPitchRoll.fromDegrees(head, pitch, roll, new Cesium.HeadingPitchRoll());
    const matrix3 = Cesium.Matrix3.fromHeadingPitchRoll(headingPitchRoll, new Cesium.Matrix3());
    // const quaternion = Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll, new Cesium.Quaternion());
    const matrix4 = Cesium.Matrix4.fromRotationTranslation(matrix3);
    return matrix4;
}

function adjustHeight(tileset, height) {
    var cartographic = Cesium.Cartographic.fromCartesian(
        tileset.boundingSphere.center
    );
    var surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        0.0
    );
    var offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        height
    );
    var translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
    );
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}

function moveToCenter(tileset) {
    var translation = Cesium.Cartesian3.subtract(
        new Cesium.Cartesian3(0, 0, 0),
        tileset.boundingSphere.center,
        new Cesium.Cartesian3()
    );
    return Cesium.Matrix4.fromTranslation(translation);
}

function moveTilesetTo(tileset, cartesian3) {
    var translation = Cesium.Cartesian3.subtract(
        cartesian3,
        tileset.boundingSphere.center,
        new Cesium.Cartesian3()
    );
    return Cesium.Matrix4.fromTranslation(translation);
}

function moveFromCenter(cartesian3) {
    var translation = Cesium.Cartesian3.subtract(
        cartesian3,
        new Cesium.Cartesian3(0, 0, 0),
        new Cesium.Cartesian3()
    );
    return Cesium.Matrix4.fromTranslation(translation);
}
