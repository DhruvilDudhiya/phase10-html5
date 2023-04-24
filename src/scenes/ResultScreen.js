
// You can write more code here

/* START OF COMPILED CODE */

class ResultScreen extends Phaser.Scene {

	constructor() {
		super("ResultScreen");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// resultContainer
		const resultContainer = this.add.container(0, 0);

		// background
		const background = this.add.image(540, 959, "background");
		resultContainer.add(background);

		// HaderContainer
		const haderContainer = this.add.container(540, 897);
		resultContainer.add(haderContainer);

		// transparent_layer
		const transparent_layer = this.add.image(0, 1, "transparent-layer");
		transparent_layer.scaleY = 0.06;
		haderContainer.add(transparent_layer);

		// noHader
		const noHader = this.add.text(-483, 0, "", {});
		noHader.setOrigin(0.5, 0.5);
		noHader.text = "No.";
		noHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(noHader);

		// nameHader
		const nameHader = this.add.text(-304, 0, "", {});
		nameHader.setOrigin(0.5, 0.5);
		nameHader.text = "Name";
		nameHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(nameHader);

		// scoreHader
		const scoreHader = this.add.text(105, 0, "", {});
		scoreHader.setOrigin(0.5, 0.5);
		scoreHader.text = "Score";
		scoreHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(scoreHader);

		// prizeHader
		const prizeHader = this.add.text(400, 0, "", {});
		prizeHader.setOrigin(0.5, 0.5);
		prizeHader.text = "Prize";
		prizeHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(prizeHader);

		// text_2
		const text_2 = this.add.text(540, 524, "", {});
		text_2.setOrigin(0.5, 0.5);
		text_2.text = "Rank";
		text_2.setStyle({ "fontSize": "70px" });

		this.resultContainer = resultContainer;
		this.haderContainer = haderContainer;
		this.transparent_layer = transparent_layer;
		this.noHader = noHader;
		this.nameHader = nameHader;
		this.scoreHader = scoreHader;
		this.prizeHader = prizeHader;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	resultContainer;
	/** @type {Phaser.GameObjects.Container} */
	haderContainer;
	/** @type {Phaser.GameObjects.Image} */
	transparent_layer;
	/** @type {Phaser.GameObjects.Text} */
	noHader;
	/** @type {Phaser.GameObjects.Text} */
	nameHader;
	/** @type {Phaser.GameObjects.Text} */
	scoreHader;
	/** @type {Phaser.GameObjects.Text} */
	prizeHader;

	/* START-USER-CODE */

	// Write your code here
	init(oData) {
		this.winnerScene(oData.data);
	}
	create() {
		this.editorCreate();
	}

	winnerScene(oData) {
		var resultPrefabX = 517
		var resultPrefabY = 1004

		const txt_rank = this.add.text(540, 422, "", {});
		txt_rank.setOrigin(0.5, 0.5);
		txt_rank.text = "";
		txt_rank.setStyle({ "fontSize": "130px" });

		for (let i = 0; i < oData.length; i++) {
			var resultPrefab = new ResultPrefab(this, resultPrefabX, resultPrefabY);
			this.add.existing(resultPrefab);
			resultPrefab.setDepth(10)
			resultPrefab.playerRank.text = i + 1
			resultPrefab.setUserData(oData[i])
			if (oData[i].nRank != undefined) {
				txt_rank.text = oData[i].nRank
				console.log(oData[i].sUserName)
			}
			resultPrefabY += 93
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
