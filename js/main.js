// init function 
function init() {
    // create a scene which will hold all our meshes to be rendered
    var scene = new THREE.Scene();

    // add a camera
    // THREE.PerspectiveCamera(fov, aspect, near, far)
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    // reposition the camera
    camera.position.set(400, 300, 400);
    // point the camera at a given coordinate
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // add a renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    // size should be the same as the window
    renderer.setSize(window.innerWidth, window.innerHeight);
    // set a near white clear color (default is black)
    renderer.setClearColor(0xfff6e6);
    // add the renderer element to the DOM so it is in our page
    document.body.appendChild(renderer.domElement);
    // Enable shadow mapping
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // linear colorspace
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    // for accurate lighting
    renderer.physicallyCorrectLights = true;

    // Add an ambient lights
    var ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);

    // Add directionnal light that will cast shadows
    directionalLight = new THREE.DirectionalLight(0xffffff, 20);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // create glTF loader
    var loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load('assets/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        gltf.scene;
    },
        // called while loading is progressing
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened');
        });

    // Render the scene/camera combnation
    renderer.render(scene, camera);

    // Add an orbit control which allows us to move around the scene.
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 15, 0);
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 425;
    controls.maxDistance = 9000;

    requestAnimationFrame(render);

    // render loop
    function render() {
        // Update camera position based on the controls
        controls.update();

        // Re-render the scene
        renderer.render(scene, camera);

        // Loop
        requestAnimationFrame(render);
    }
}

// check if the browser is compatible with WebGL
if (window.WebGLRenderingContext) {
    init();
} else {
    // if the browser isn't compatible with WebGl...
    window.location = "http://get.webgl.org";
}