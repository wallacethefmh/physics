cyclone.particle = function(mesh) {

	this.mesh = {};

	this.init = function(mesh) 
	{
		this.mesh = mesh;
		this.mesh.velocity = new THREE.Vector3(0,0,0);
		this.mesh.acceleration = cyclone.helpers.getGravity();
		this.mesh.damping = .99;
		this.mesh.forceAccum = new THREE.Vector3(0,0,0);
		this.mesh.mass = 1;
		this.stillExists = true;
		this.emitter = false;
	}
	this.init(mesh);

	// t should be the time since the last frame.
	this.update = function(duration) {
		if (!(duration > 0)) return false;

		var position = cyclone.helpers.addScaledVector(this.mesh.position, this.mesh.velocity, duration);
		this.mesh.position.set(position.x, position.y, position.z);

		var velocity = cyclone.helpers.addScaledVector(this.mesh.velocity, this.mesh.acceleration, duration);
		velocity = cyclone.helpers.addScaledVector(velocity, this.mesh.forceAccum, this.mesh.inverseMass);
		this.mesh.velocity.set(velocity.x, velocity.y, velocity.z);

		if (this.mesh.position.y < -33) {
			scene.remove(this.mesh);
			this.stillExists = false;
			if (this.emitter) {
				this.emitter.sourceFinished = true;
			}
		}

		if (this.emitter) {
			this.emitter.emit(duration, this.mesh.velocity, this.mesh.position);
		}

		this.clearAccumulator();
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
	    return this.mesh.velocity;
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
	    this.mesh.forceAccum.set(0,0,0);
	}

	this.addForce = function(force)
	{
	    this.mesh.forceAccum.add(force);
	    console.log(this.mesh.forceAccum);
	}

	this.setEmitter = function(n, duration)
	{
		this.emitter = new emitter(n, duration);
	}

	this.canRemove = function() {
		if (this.emitter !== false) {
			if (!this.emitter.finished) return false; 
		}
		if (this.stillExists) return false;
		return true;
	}
}