
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
		const background = this.add.image(563, 959, "background");
		resultContainer.add(background);

		// HaderContainer
		const haderContainer = this.add.container(70, 897);
		resultContainer.add(haderContainer);

		// transparent_layer
		const transparent_layer = this.add.image(479, 3, "transparent-layer");
		transparent_layer.scaleY = 0.06;
		haderContainer.add(transparent_layer);

		// noHader
		const noHader = this.add.text(0, 0, "", {});
		noHader.setOrigin(0.5, 0.5);
		noHader.text = "No.";
		noHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(noHader);

		// nameHader
		const nameHader = this.add.text(179, 0, "", {});
		nameHader.setOrigin(0.5, 0.5);
		nameHader.text = "Name";
		nameHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(nameHader);

		// scoreHader
		const scoreHader = this.add.text(588, 0, "", {});
		scoreHader.setOrigin(0.5, 0.5);
		scoreHader.text = "Score";
		scoreHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(scoreHader);

		// prizeHader
		const prizeHader = this.add.text(883, 0, "", {});
		prizeHader.setOrigin(0.5, 0.5);
		prizeHader.text = "Prize";
		prizeHader.setStyle({ "fontSize": "50px" });
		haderContainer.add(prizeHader);

		// resultPrefab
		const resultPrefab = new ResultPrefab(this, 519, 1008);
		resultContainer.add(resultPrefab);

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

	create() {

		this.editorCreate();
		this.instantiateSocketManager();
	}
	instantiateSocketManager() {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const eGameType = urlParams.get('eGameType');
		const authToken = urlParams.get('sAuthToken');
		const iTableId = urlParams.get('iTableId');
		const sRootURL = urlParams.get('sRootUrl');
		const nPracticeChips = urlParams.get('nPracticeChips');
		this.oSocketManager = new SocketManager(this, eGameType, authToken, iTableId, sRootURL, nPracticeChips);
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
