
// this should be treated like an interface
var forceGenerator = function() {
	// Overload this in implementations of the interface to calculate
 	// and update the force applied to the given particle.
	this.updateForce = function(particle, t) {}
}


var forceGenerator_particleDrag = function(k1) {
	this.k1 = k1;
	this.k2 = Math.pow(k1, 2);

	// duration is not used for this force generator type
	this.updateForce = function(particle, duration) {
		var force = new THREE.Vector3().copy(particle.getVelocity()),
			dragCoeff = force.length();

		dragCoeff = dragCoeff * this.k1 + dragCoeff * dragCoeff * this.k2
		force.normalize();

		console.log(dragCoeff);

		force.multiplyScalar((-1 * dragCoeff));
		particle.addForce(force);
	}
}

var forceRegistry = function() {
	this.registry = [];

	// expects variable that references an object that looks like {particle: particle, fg : forceGenerator}
	this.add = function(obj) {
		if (typeof obj.particle !== 'undefined' && typeof obj.fg !== 'undefined') {
			this.registry.push(obj);
		} else {
			console.error('incorrect variable type passed into the force registry');
			console.log('the variable:');
			console.log(obj);
		}
	}

	this.updateForces = function(duration) {
		for (var i = this.registry.length - 1; i >= 0; i--) {
			this.registry[i].fg.updateForce(this.registry[i].particle, duration);
		};
	}
}