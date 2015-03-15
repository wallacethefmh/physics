var particlePoolClass = function(n) {
	this.pool = [];
	//var texture = THREE.ImageUtils.loadTexture( "assets/images/fireSpark.png" );
	var material = new THREE.MeshBasicMaterial({ 
		color : 0xFFFFFF,
		//map : texture,
		//transparent: true
	});

	for (var i = 1000 - 1; i >= 0; i--) {
		var geometry = new THREE.SphereGeometry( 5, 5, 5 );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.castShadow = true;
		this.pool.push(mesh);
	};

	this.pop = function() {
		return this.pool.pop();
	};
	this.push = function(particle) {
		this.pool.push(particle);
	}

}