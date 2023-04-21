
// You can write more code here

/* START OF COMPILED CODE */

class ResultPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 524, y ?? 964);

		// transparent_layer
		const transparent_layer = scene.add.image(23, 0, "transparent-layer");
		transparent_layer.scaleY = 0.05;
		this.add(transparent_layer);

		// PlayerRank
		const playerRank = scene.add.text(-463, 2, "", {});
		playerRank.setOrigin(0.5, 0.5);
		playerRank.text = "1";
		playerRank.setStyle({ "fontSize": "50px" });
		this.add(playerRank);

		// PlayerName
		const playerName = scene.add.text(-221, 2, "", {});
		playerName.setOrigin(0.5, 0.5);
		playerName.text = "Dhruvil";
		playerName.setStyle({ "fontSize": "50px" });
		this.add(playerName);

		// PlayerScore
		const playerScore = scene.add.text(161, 2, "", {});
		playerScore.setOrigin(0.5, 0.5);
		playerScore.text = "Dhruvil";
		playerScore.setStyle({ "fontSize": "50px" });
		this.add(playerScore);

		// PlayerPrize
		const playerPrize = scene.add.text(434, 2, "", {});
		playerPrize.setOrigin(0.5, 0.5);
		playerPrize.text = "Dhruvil";
		playerPrize.setStyle({ "fontSize": "50px" });
		this.add(playerPrize);

		this.playerRank = playerRank;
		this.playerName = playerName;
		this.playerScore = playerScore;
		this.playerPrize = playerPrize;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Text} */
	playerRank;
	/** @type {Phaser.GameObjects.Text} */
	playerName;
	/** @type {Phaser.GameObjects.Text} */
	playerScore;
	/** @type {Phaser.GameObjects.Text} */
	playerPrize;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
