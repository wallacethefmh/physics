
var scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.set( 60, 50, 60 );
camera.lookAt( scene.position );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.PlaneGeometry( 75, 75, 50, 50 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = Math.PI / -2;
scene.add( plane )

var particles = [];

var geometry1 = new THREE.BoxGeometry( 3, 3, 1 );
var material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
var cube1 = new THREE.Mesh( geometry1, material1 );
cube1.position.x = 5;
cube1.position.y = 21;

var geometry2 = new THREE.BoxGeometry( 3, 5, 4 );
var material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
var cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.x = -5;
cube2.position.y = 25;

particles.push(new cyclone.particle(cube1));
particles.push(new cyclone.particle(cube2));

for (var i = particles.length - 1; i >= 0; i--) {
	scene.add( particles[i].mesh );
};

var time = -1;

var render = function () {
	requestAnimationFrame( render );

	if (time === -1) {
		var difference = 0;
	} else {
		var temp = +new Date();
		var difference = temp - time;
	}
	time = new Date();

	for (var i = particles.length - 1; i >= 0; i--) {
		particles[i].update(difference/1000);
	};

	
	renderer.render(scene, camera);
};

render();