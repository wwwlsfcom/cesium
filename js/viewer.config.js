//使用自定义配置初始化Cesium.viewer
(function () {
    window.CESIUM_BASE_URL = '/davalve3D/Cesium/';
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ODhiZTg3Yi02ODZhLTRkZjctOGQyOC05ODk3OGI3NTY4OWUiLCJpZCI6NTI4NjYsImlhdCI6MTYxODg4ODUzOX0.QXg-C0OzeP-_d5feoeeNkx_5NYQBYKywQN8PKEnSjWY';
    /********start*********/
    const imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    });
    const terrainProvider = Cesium.createWorldTerrain();
    window.viewer = new Cesium.Viewer('cesiumContainer', {
        imageryProvider,
        terrainProvider,
        // sceneMode: Cesium.SceneMode.COLUMBUS_VIEW,
        infoBox: false,
        // geocoder: false,
        timeline: false,
        animation: false,
        fullscreenButton: true,
        // homeButton: false,
        // navigationHelpButton: false,
        // sceneModePicker: false,
        // baseLayerPicker: false,
        selectionIndicator: false,
        creditContainer: 'creditContainer',
        creditViewport: 'creditViewport'
    });
    // viewer.imageryLayers.removeAll();
})();


