
// You can write more code here

/* START OF COMPILED CODE */

class ResultPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// transparent_layer
		const transparent_layer = scene.add.image(23, 0, "transparent-layer");
		transparent_layer.scaleY = 0.05;
		this.add(transparent_layer);

		// ownPlayerbackground
		const ownPlayerbackground = scene.add.rectangle(23, 0, 1080, 95);
		ownPlayerbackground.visible = false;
		ownPlayerbackground.isFilled = true;
		ownPlayerbackground.fillColor = 3783167;
		this.add(ownPlayerbackground);

		// playerRank
		const playerRank = scene.add.text(-463, 0, "", {});
		playerRank.setOrigin(0.5, 0.5);
		playerRank.text = "1";
		playerRank.setStyle({ "fontSize": "50px" });
		this.add(playerRank);

		// playerName
		const playerName = scene.add.text(-265, 0, "", {});
		playerName.setOrigin(0, 0.5);
		playerName.text = "PlayerName";
		playerName.setStyle({ "fontSize": "40px" });
		this.add(playerName);

		// playerScore
		const playerScore = scene.add.text(127, 0, "", {});
		playerScore.setOrigin(0.5, 0.5);
		playerScore.text = "0";
		playerScore.setStyle({ "fontSize": "50px" });
		this.add(playerScore);

		// winPrize
		const winPrize = scene.add.text(415, 0, "", {});
		winPrize.setOrigin(0.5, 0.5);
		winPrize.text = "0";
		winPrize.setStyle({ "fontSize": "50px" });
		this.add(winPrize);

		// playerProfile
		const playerProfile = scene.add.image(-322, 0, "player-one");
		playerProfile.scaleX = 0.4;
		playerProfile.scaleY = 0.4;
		this.add(playerProfile);

		this.ownPlayerbackground = ownPlayerbackground;
		this.playerRank = playerRank;
		this.playerName = playerName;
		this.playerScore = playerScore;
		this.winPrize = winPrize;
		this.playerProfile = playerProfile;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.oScene = scene
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	ownPlayerbackground;
	/** @type {Phaser.GameObjects.Text} */
	playerRank;
	/** @type {Phaser.GameObjects.Text} */
	playerName;
	/** @type {Phaser.GameObjects.Text} */
	playerScore;
	/** @type {Phaser.GameObjects.Text} */
	winPrize;
	/** @type {Phaser.GameObjects.Image} */
	playerProfile;

	/* START-USER-CODE */

	// Write your code here.
	setUserData(oData) {
		this.playerName.text = oData.sUserName.length == 0 ? oData.sMobile.substring(0, 4) + "****" : oData.sUserName
		this.playerScore.text = oData.nScore
		this.winPrize.text = oData.nTotalWinningAmount

	}

	setOwnBackground(result){
		this.ownPlayerbackground.visible = result;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
