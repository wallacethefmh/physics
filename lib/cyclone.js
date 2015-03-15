var cyclone = {};

var count = 0;

cyclone.helpers = {
	getGravity: function() {
		return new THREE.Vector3(0,-10,0);
	},
	addScaledVector: function(vector1,vector2,s) {
		return {
			x: vector1.x + vector2.x * s,
			y: vector1.y + vector2.y * s,
			z: vector1.z + vector2.z * s
		};
	}
}