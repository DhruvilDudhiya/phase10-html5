
// You can write more code here

/* START OF COMPILED CODE */

class CardPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? -1);

		// cardBackground
		const cardBackground = scene.add.container(0, 1);
		this.add(cardBackground);

		// card_shadow
		const card_shadow = scene.add.image(-5, 1, "card-shadow");
		card_shadow.scaleX = 1.3;
		card_shadow.scaleY = 1.3;
		cardBackground.add(card_shadow);

		// card
		const card = scene.add.image(0, 0, "cardSlicing");
		cardBackground.add(card);

		// normalCardsContainer
		const normalCardsContainer = scene.add.container(0, 0);
		this.add(normalCardsContainer);

		// cardUIContainer
		const cardUIContainer = scene.add.container(-37, -64);
		normalCardsContainer.add(cardUIContainer);

		// whiteCornerLower
		const whiteCornerLower = scene.add.sprite(74, 137, "cardCorner-whiteLower");
		whiteCornerLower.scaleY = 1.2;
		whiteCornerLower.tintFill = true;
		cardUIContainer.add(whiteCornerLower);

		// whiteCornerUpper
		const whiteCornerUpper = scene.add.sprite(0, -6, "cardCorner-whiteUpper");
		whiteCornerUpper.scaleY = 1.2;
		whiteCornerUpper.tintFill = true;
		cardUIContainer.add(whiteCornerUpper);

		// cardTextContainer
		const cardTextContainer = scene.add.container(0, -1);
		normalCardsContainer.add(cardTextContainer);

		// textBottomNumber
		const textBottomNumber = scene.add.text(43, 80, "", {});
		textBottomNumber.setOrigin(0.5, 0.5);
		textBottomNumber.text = "12";
		textBottomNumber.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Comica BD Bold", "fontSize": "24px", "fontStyle": "bold" });
		cardTextContainer.add(textBottomNumber);

		// textMiddleNumber
		const textMiddleNumber = scene.add.text(0, 0, "", {});
		textMiddleNumber.setOrigin(0.5, 0.5);
		textMiddleNumber.text = "12";
		textMiddleNumber.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "Comica BD Bold", "fontSize": "80px", "fontStyle": "bold" });
		cardTextContainer.add(textMiddleNumber);

		// textTopNumber
		const textTopNumber = scene.add.text(-43, -80, "", {});
		textTopNumber.setOrigin(0.5, 0.5);
		textTopNumber.text = "12";
		textTopNumber.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "Comica BD Bold", "fontSize": "24px", "fontStyle": "bold" });
		cardTextContainer.add(textTopNumber);

		// specialCardsContainer
		const specialCardsContainer = scene.add.container(0, 0);
		specialCardsContainer.visible = false;
		this.add(specialCardsContainer);

		// wildCard
		const wildCard = scene.add.image(0, -2, "wildCard");
		wildCard.visible = false;
		specialCardsContainer.add(wildCard);

		// skipCard
		const skipCard = scene.add.image(0, 0, "skipCard");
		skipCard.visible = false;
		specialCardsContainer.add(skipCard);

		// cardHighlightContainer
		const cardHighlightContainer = scene.add.container(0, -1);
		cardHighlightContainer.visible = false;
		this.add(cardHighlightContainer);

		// cardHighlight
		const cardHighlight = scene.add.image(0, 0, "cardHighlight");
		cardHighlightContainer.add(cardHighlight);

		// this (components)
		new CardPreset(this);

		this.cardBackground = cardBackground;
		this.card = card;
		this.normalCardsContainer = normalCardsContainer;
		this.whiteCornerLower = whiteCornerLower;
		this.whiteCornerUpper = whiteCornerUpper;
		this.textBottomNumber = textBottomNumber;
		this.textMiddleNumber = textMiddleNumber;
		this.textTopNumber = textTopNumber;
		this.specialCardsContainer = specialCardsContainer;
		this.wildCard = wildCard;
		this.skipCard = skipCard;
		this.cardHighlightContainer = cardHighlightContainer;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.oScene = scene;
		this.oGameManager = new GameManager(this.oScene);
		this.oScene.input.setDraggable(this);

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Container} */
	cardBackground;
	/** @type {Phaser.GameObjects.Image} */
	card;
	/** @type {Phaser.GameObjects.Container} */
	normalCardsContainer;
	/** @type {Phaser.GameObjects.Sprite} */
	whiteCornerLower;
	/** @type {Phaser.GameObjects.Sprite} */
	whiteCornerUpper;
	/** @type {Phaser.GameObjects.Text} */
	textBottomNumber;
	/** @type {Phaser.GameObjects.Text} */
	textMiddleNumber;
	/** @type {Phaser.GameObjects.Text} */
	textTopNumber;
	/** @type {Phaser.GameObjects.Container} */
	specialCardsContainer;
	/** @type {Phaser.GameObjects.Image} */
	wildCard;
	/** @type {Phaser.GameObjects.Image} */
	skipCard;
	/** @type {Phaser.GameObjects.Container} */
	cardHighlightContainer;
	/** @type {string} */
	iCardId = "";

	/* START-USER-CODE */

	// Write your code here.

	checkHighCard(isHighCard) {
		if(isHighCard) {
			this.cardHighlightContainer.setVisible(true);
		}
		else {
			this.cardHighlightContainer.setVisible(false);
		}
	}

	checkCardInformation(...args) {
		if(arguments.length == 2) {
			this.setSpecialCard(args[0], args[1]);
		}
		else {
			this.setNormalCardInformation(args[0], args[1]);
		}
	}

	setSpecialCard(specialCardName, specialCardId) {
		this.normalCardsContainer.setVisible(false);
		this.specialCardsContainer.setVisible(true);
		switch(specialCardName) {
			case this.oGameManager.wildCard:
				this.wildCard.setVisible(true);
				break;
			case this.oGameManager.skipCard:
				this.skipCard.setVisible(true);
				break;
			default:
				console.log("Special Card Unavailable!");
				break;
		}
	}

	setNormalCardInformation(cardNumber, cardColor) {
		this.setCardText(cardNumber);
		this.setCardColor(cardColor);
	}

	setCardText(cardNumber) {

		this.textTopNumber.setText(cardNumber);
		this.textMiddleNumber.setText(cardNumber);
		this.textBottomNumber.setText(cardNumber);
	}

	setCardColor(cardColor) {
		const color = eval("this.oGameManager."+cardColor+"Card");
		this.textMiddleNumber.setTintFill(color);
		this.whiteCornerLower.setTintFill(color);
		this.whiteCornerUpper.setTintFill(color);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
