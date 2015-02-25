var cyclone = {};

cyclone.vector3 = function(x,y,z) {
	
	this.init = function(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	this.init(x,y,z);

	this.invert = function() {
		this.x = -x;
		this.y = -y;
		this.z = -z;
	}

	this.magnitude = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	}

	this.magnitudeSquared = function() {
		return this.x*this.x + this.y*this.y + this.z*this.z;
	}

	this.scalar = function(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
		this.z = this.z * scalar;
	}

	this.scalarCopy = function(scalar) {
		return new cyclone.vector3(this.x * scalar, this.y * scalar, this.z * scalar);
	}

	this.add = function(vector3) {
		this.x = this.x + vector3.x;
		this.y = this.y + vector3.y;
		this.z = this.z + vector3.z;
	}

	this.addCopy = function(vector3) {
		return new cyclone.vector3(this.x + vector3.x, this.y + vector3.y, this.z + vector3.z);
	}

	this.sub = function(vector3) {
		this.x = this.x - vector3.x;
		this.y = this.y - vector3.y;
		this.z = this.z - vector3.z;
	}

	this.subCopy = function(vector3) {
		return new cyclone.vector3(this.x - vector3.x, this.y - vector3.y, this.z - vector3.z);
	}

	this.componentProductUpdate = function(vector3) {
		this.x = this.x * vector3.x;
		this.y = this.y * vector3.y;
		this.z = this.z * vector3.z;
	}

	this.componentProduct = function(vector3) {
		return new cyclone.vector3(this.x * vector3.x, this.y * vector3.y, this.z * vector3.z);
	}

	this.scalarProduct = function(vector3) {
		return this.x*vector3.x + this.y*vector3.y + this.z*vector3.z;
	}

	this.vectorProduct = function(vector3) {
		return new cyclone.vector3(
				this.y*vector3.z - this.z*vector3.y,
				this.z*vector3.x - this.x*vector3.z,
				this.x*vector3.y - this.y*vector3.x
			);
	}

	this.addScaledVector = function(scalar, vector3) {
		this.x = scalar * vector3.x;
		this.y = scalar * vector3.y;
		this.z = scalar * vector3.z;
	}

	this.normalize = function() {
		var d = this.magnitude();
		if (d > 0) {
			this.scalar(1/d);
		}
	}

	this.print = function() {
		console.log('x: ' + this.x + ', y: ' + this.y + ', z: ' + this.z);
	}

}

cyclone.particle = function(pos, vel, acc) {
	this.position = pos;	//vector3
	this.velocity = vel;	//vector3
	this.acceleration = acc;	//vector3
	this.damping = .99;
	this.inverseMass = 1/1;
}
