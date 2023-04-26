
// You can write more code here

/* START OF COMPILED CODE */

class PlayerPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// player_profile_box
		const player_profile_box = scene.add.image(0, 0, "player-profile-box");
		this.add(player_profile_box);

		// timer_ring
		const timer_ring = scene.add.image(0, 0, "timer-ring");
		this.add(timer_ring);

		// player_one
		const player_one = scene.add.image(0, 0, "player-one");
		this.add(player_one);

		this.player_profile_box = player_profile_box;
		this.timer_ring = timer_ring;
		this.player_one = player_one;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.oScene = scene;
		this.shape = this.oScene.add.graphics();
		this.shape.visible = false;

		const maskShape = this.shape.createGeometryMask();
		this.timer_ring.setMask(maskShape);
		this.shape.x = this.timer_ring.x;
		this.shape.y = this.timer_ring.y;
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	player_profile_box;
	/** @type {Phaser.GameObjects.Image} */
	timer_ring;
	/** @type {Phaser.GameObjects.Image} */
	player_one;

	/* START-USER-CODE */

	// Write your code here.
	startTimerInit(x, y, data) {

		this.intervalTimeReset();

		this.timer_ring.visible = true

		let nTime = data.nTotalTurnTime / 1000;
		let ttl = data.ttl / 1000;

		let start = 0;
		let end = 360 / nTime;
		let temp = end;

		let self = this;

		if (ttl != nTime) {
			ttl = (data.nTotalTurnTime - data.ttl) / 1000;
			end = ttl * 18;
		}

		console.log(data);
		if(data.eTurnType === "grace"){
			this.timer_ring.tintFill = true;
			this.timer_ring.setTintFill(0xfcba03)
		}

		this.intervalTimer = setInterval(() => {
			this.shape.slice(x, y, 128, Phaser.Math.DegToRad(start), Phaser.Math.DegToRad(end)).fill();
			if(end>=270 && data.eTurnType === "general"){
				this.timer_ring.tintFill = true;
				this.timer_ring.setTintFill(0xaa0000);
			}
			if (end >= 360) {
				self.intervalTimeReset();
			}
			end += (temp/10);
		}, 100)
	}

	intervalTimeReset() {
		this.shape.clear();
		this.timer_ring.clearTint();
		this.timer_ring.tintFill = false;
		this.timer_ring.visible = false
		clearInterval(this.intervalTimer);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
