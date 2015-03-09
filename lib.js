
var cyclone = {};

var count = 0;

cyclone.helpers = {
	getGravity: function() {
		return new THREE.Vector3(0,-10,0);
	},
	addScaledVector: function(vector1,vector2,s) {
		// console.log(vector1);
		// console.log('plus');
		// console.log(vector2);
		// console.log('scaled by');
		// console.log(s);
		// console.log('equals');
		// console.log(vector1.x + vector2.x * s);
		// console.log(vector1.y + vector2.y * s);
		// console.log(vector1.z + vector2.z * s);
		return new THREE.Vector3(
				vector1.x + vector2.x * s,
				vector1.y + vector2.y * s,
				vector1.z + vector2.z * s
			);
	}
}

cyclone.particle = function(mesh) {

	this.mesh = {};

	this.init = function(mesh) 
	{
		this.mesh = mesh;
		this.mesh.velocity = new THREE.Vector3(0,0,0);
		this.mesh.acceleration = cyclone.helpers.getGravity();
		this.mesh.damping = .99;
		this.stillExists = true;
		this.emitter = false;
	}
	this.init(mesh);

	// t should be the time since the last frame.
	this.update = function(t)  
	{
		if (!(t > 0)) return false;

		var position = cyclone.helpers.addScaledVector(this.mesh.position, this.mesh.velocity, t);
		this.mesh.position.set(position.x, position.y, position.z);

		var velocity = cyclone.helpers.addScaledVector(this.mesh.velocity, this.mesh.acceleration, t);;
		this.mesh.velocity.set(velocity.x, velocity.y, velocity.z);
		
		count += 1;		

		if (this.mesh.position.y < 0) {
			scene.remove(this.mesh);
			this.stillExists = false;
		}

		if (this.emitter) {
			this.emitter.emit(t, this.mesh.velocity, this.mesh.position);
		}
	}

	this.setPosition = function(x,y,z) {
		this.mesh.position.set(x,y,z);
	}

	this.setMass = function(mass) 
	{
	    if (mass == 0) return false;
	    this.mesh.inverseMass = (1.0)/mass;
	}

	this.getMass = function() 
	{
	    if (this.mesh.inverseMass == 0) {
	        return Number.POSITIVE_INFINITY;
	    } else {
	        return (1.0)/this.mesh.inverseMass;
	    }
	}

	this.setInverseMass = function(inverseMass)
	{
	   this.mesh.inverseMass = inverseMass;
	}

	this.getInverseMass = function()
	{
	    return this.mesh.inverseMass;
	}

	this.hasFiniteMass = function()
	{
	    return this.mesh.inverseMass >= 0.0;
	}

	this.setDamping = function(damping)
	{
	    this.mesh.damping = damping;
	}

	this.getDamping = function()
	{
	    return this.mesh.damping;
	}

	this.setVelocity = function(velocity)
	{
	    this.mesh.velocity = velocity;
	}

	this.getVelocity = function()
	{
	    this.mesh.velocity;
	}

	this.setAcceleration = function(acceleration)
	{
	    this.mesh.acceleration = acceleration;
	}

	this.getAcceleration = function()
	{
	    return this.mesh.acceleration;
	}

	this.clearAccumulator = function()
	{
	    this.mesh.forceAccum.clear();
	}

	this.addForce = function(force)
	{
	    this.mesh.forceAccum += force;
	}

	this.setEmitter = function(n, duration)
	{
		this.emitter = new emitter(n, duration);
	}
}

var emitter = function(n, duration) {
	
	this.particles = [];
	this.count = n;
	this.started = false;
	this.finished = false;
	this.pool = [];

	for (var i = 1000 - 1; i >= 0; i--) {
		var geometry = new THREE.BoxGeometry( 2, 2, 2 );
		var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
		var mesh = new THREE.Mesh( geometry, material );

		//spark.mesh.castShadow = true;
		this.pool.push(mesh);
	};

	console.log(this.pool);

	// this.duration = duration;

	this.emit = function(msElapsed, velocity, position) {

		var indexesToRemove = [];
		for (var i = this.particles.length - 1; i >= 0; i--) {
			if (!this.started) this.started = true;
			if (!this.particles[i].stillExists) indexesToRemove.push(i);
			this.particles[i].update(msElapsed);
		};
		for (var i = indexesToRemove.length - 1; i >= 0; i--) {
			// return the particle to the available pool
			this.pool.push(this.particles[indexesToRemove[i]].mesh);
			this.particles.splice(indexesToRemove[i], 1);
		};

		for (var i = this.count - 1; i >= 0; i--) {
			
			var newSpark = this.pool.pop();

			if (newSpark !== 'undefined') {

				var sparkVelocity = {
					x : velocity.x + (Math.floor(Math.random() * 400) - 200),
					y : velocity.y + (Math.floor(Math.random() * 400) - 200),
					z : velocity.z + (Math.floor(Math.random() * 400) - 200),
				}

				var spark = new cyclone.particle(newSpark);
				//spark.setMass(.01); // 1.0kg - mostly blast damage
				spark.setVelocity(new THREE.Vector3(sparkVelocity.x, sparkVelocity.y, sparkVelocity.z)); //
				spark.setAcceleration(new THREE.Vector3(0, -250.0, 0));
				spark.setDamping(0.9);
				spark.setPosition(position.x, position.y, position.z);

				this.particles.push(spark);
				scene.add(spark.mesh);
			} else {
				console.log('spark array is empty');
			}

			
		};
		
	}

}