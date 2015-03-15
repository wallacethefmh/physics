var emitter = function(n, duration) {
	
	this.particles = [];
	this.count = n;
	this.started = false;
	this.finished = false;
	this.sourceFinished = false;

	// this.duration = duration;

	this.emit = function(msElapsed, velocity, position) {

		var indexesToRemove = [];
		for (var i = this.particles.length - 1; i >= 0; i--) {
			if (!this.started) this.started = true;
			if (this.particles[i].canRemove()) indexesToRemove.push(i);
			this.particles[i].update(msElapsed);
		};

		for (var i = 0; i < indexesToRemove.length; i++) {
			// return the particle to the available pool
			if (typeof this.particles[indexesToRemove[i]] !== 'undefined') {
				particlePool.push(this.particles[indexesToRemove[i]].mesh);
				this.particles.splice(indexesToRemove[i], 1);
			} else {
				console.error('index wasnt found in array, this should never happen');
				// console.log('indexs to remove:');
				// console.log(JSON.stringify(indexesToRemove));
				// console.log('particle string length');
				// console.log(this.particles.length);
			}
		};

		// check if the emitter is finished
		if (this.started) {
			if (this.particles.length === 0) this.finished = true;
		}

		if (!this.sourceFinished) {
			for (var i = this.count - 1; i >= 0; i--) {
				var newSpark = particlePool.pop();
				if (typeof newSpark !== 'undefined') {
					var sparkVelocity = {
							x : velocity.x - (velocity.x * .5 + (Math.floor(Math.random() * 4) - 2)),
							y : velocity.y - velocity.y + (Math.floor(Math.random() * 400) - 200),
							z : velocity.z - (velocity.z * .5 + (Math.floor(Math.random() * 4) - 2)),
						}, 
						spark = new cyclone.particle(newSpark);
					spark.setMass(.01); // 1.0kg - mostly blast damage
					spark.setVelocity(new THREE.Vector3(sparkVelocity.x, sparkVelocity.y, sparkVelocity.z)); //
					spark.setAcceleration(new THREE.Vector3(
						Math.floor(Math.random() * 200) - 100, 
						-300, 
						Math.floor(Math.random() * 200) - 100)
					);
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

}