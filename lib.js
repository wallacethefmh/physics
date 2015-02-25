
var cyclone = {};

var count = 0;

cyclone.helpers = {
	getGravity: function() {
		return new THREE.Vector3(0,-10,0);
	},
	addScaledVector: function(vector1,vector2,s) {
		return new THREE.Vector3(
				vector1.x + vector2.x*s,
				vector1.y + vector2.y*s,
				vector1.z + vector2.z*s
			);
	}
}

cyclone.particle = function(mesh) {

	this.mesh = {};

	this.init = function(mesh) {
		this.mesh = mesh;
		this.mesh.velocity = new THREE.Vector3(0,0,0);
		this.mesh.acceleration = cyclone.helpers.getGravity();
	}
	this.init(mesh);

	// t should be the time since the last frame.
	this.update = function(t) {

		if (!(t > 0)) return false;

		var position = cyclone.helpers.addScaledVector(this.mesh.position, this.mesh.velocity, t);
		this.mesh.position.set(position.x, position.y, position.z);
		
		var velocity = cyclone.helpers.addScaledVector(this.mesh.velocity, this.mesh.acceleration, t);;
		this.mesh.velocity.set(velocity.x, velocity.y, velocity.z);
		
		count += 1;
		
	}

	this.print = function() {
		
	}

}