function Bird() {
	this.y = height/2; // bird starts of center of the window
	this.x = 64;

	this.gravity = 0.6;
	this.lift = -15;
	this.velocity = 0;

	this.show = function () {
		fill(color('#00FF00'));
		ellipse(this.x, this.y, 32, 32);
	}

	this.up = function () {
		this.velocity += this.lift;
		// print(this.velocity);
	}

	this.update = function () {  // function that is going to push that bird down
		this.velocity += this.gravity;
		this.velocity *= 0.9; // velocity limit
		this.y += this.velocity;

		if (this.y > height) {
			this.y = height; // keep bird on the screen
			this.velocity = 0;
		}

		if (this.y < 0) {
			this.y = 0; 
			this.velocity = 0;
		}

	}

}