
var particles = [],
	stopRender = false,
	scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1,10000 );

camera.position.set( 1500, 2400, 1500 );

camera.lookAt( scene.position );

// Renderer

var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Ground

var groundGeo = new THREE.PlaneBufferGeometry( 5000, 5000 );
var groundMat = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0x89B3E0, specular: 0x05FF1A } );
//groundMat.color.setHSL( 0.095, 1, 0.75 );

var ground = new THREE.Mesh( groundGeo, groundMat );
ground.rotation.x = -Math.PI/2;
ground.position.y = -33;

scene.add(ground);

ground.receiveShadow = true;

// // Lights

// hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
// hemiLight.color.setHSL( 0.6, 1, 0.6 );
// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
// hemiLight.position.set( 0, 500, 0 );
// scene.add( hemiLight );

light = new THREE.DirectionalLight(0xdfebff, .75);
light.position.set(0, 400, 0);
light.position.multiplyScalar(1.3);

light.castShadow = true;
// light.shadowCameraVisible = true;

light.shadowMapWidth = 2048;
light.shadowMapHeight = 2048;

var d = 2500;

light.shadowCameraLeft = -d;
light.shadowCameraRight = d;
light.shadowCameraTop = d;
light.shadowCameraBottom = -d;

light.shadowCameraFar = 1000;
light.shadowDarkness = 0.5;
light.shadowBias = -0.0001;
scene.add(light);

// mouse movement to camera
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var time = -1;
var render = function () {

	if (stopRender) {
		return false;
	}

	camera.lookAt(ground.position);

	requestAnimationFrame( render );

	if (time === -1) {
		var difference = 0;
	} else {
		var temp = +new Date();
		var difference = temp - time;
	}
	time = new Date();

	var indexesToRemove = [];
	for (var i = particles.length - 1; i >= 0; i--) {
		if (!particles[i].stillExists) indexesToRemove.push(i);
		particles[i].update(difference/1000);
	};
	for (var i = indexesToRemove.length - 1; i >= 0; i--) {
		particles.splice(indexesToRemove[i], 1);
	};

	renderer.render(scene, camera);

};

var mouse = {};
var raycaster = new THREE.Raycaster();
var velocityFactor = 650;

// click to create fireball
document.addEventListener('mousedown', shoot, false);
function shoot(event) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObject( ground );
	if (intersects.length) {
		var norm = intersects[0].point.normalize(),
			velocityX = norm.x * velocityFactor,
			velocityZ = norm.z * velocityFactor;

		var geometry = new THREE.SphereGeometry( 22, 12, 12 );
		var material = new THREE.MeshPhongMaterial({
			ambient: 0x030303, 
			color: 0xED6F15, 
			specular: 0xED6F15, 
			shininess: 4, 
			shading: THREE.FlatShading 
		});
		var mesh = new THREE.Mesh( geometry, material );
		
		var fireball = new cyclone.particle(mesh);
		fireball.setMass(1.0); // 1.0kg - mostly blast damage
		fireball.setVelocity(new THREE.Vector3(velocityX,60,velocityZ)); //
		fireball.setAcceleration(new THREE.Vector3(0, -65.0, 0));
		fireball.setDamping(0.9);
		fireball.setPosition(0,80,0);
		fireball.mesh.castShadow = true;
		fireball.setEmitter(20,150);

		particles.push(fireball);
		scene.add(fireball.mesh);
	}
	
}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(event) {
	if (event.keyCode == 81) {
		stopRender = true;
	} else {
		console.log('hit key: ' + event.keyCode);
	}
}

// start the ap
render();