
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
		this.loadBar = this.oScene.add.graphics();
		const maskShape = new Phaser.Display.Masks.BitmapMask(this.oScene, this.loadBar);
		this.timer_ring.setMask(maskShape);
		this.loadBar.visible = false;
		this.loadBar.x = this.timer_ring.x;
		this.loadBar.y = this.timer_ring.y;
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
	startTimerInit(x, y, ttl) {
		this.intervalTimeReset();
		var totalTimer = 0;
		var goneTimer = Date.now();
		var endTimer = Date.now() + ttl;
		var startTimer = Date.now() - (totalTimer - ttl);

		this.intervalTime = setInterval(() => {
			if(endTimer - goneTimer <= 0) {
				this.loadBar.clear();
				this.intervalTimeReset();
			}
			else {
				this.updateTimeLoadBar(x, y, parseInt(totalTimer / 1000), (goneTimer - startTimer) / 1000);
				goneTimer = Date.now();
			}
		}, 50);
	}

	intervalTimeReset() {
		this.loadBar.clear();
		clearInterval(this.intervalTime);
	}

	updateTimeLoadBar(x, y, totalTimer, goneTime) {
		var startPos = Phaser.Math.DegToRad(280);
		this.loadBar.clear();
		this.loadBar.lineStyle(100, 0, 1);
		this.loadBar.beginPath();
		this.loadBar.arc(x, y, 64, startPos - Phaser.Math.DegToRad(- startPos - goneTime * 12), startPos - Phaser.Math.DegToRad(0), true);
		this.loadBar.strokePath();
		this.loadBar.closePath();
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
