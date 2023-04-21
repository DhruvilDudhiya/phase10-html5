
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class CardPreset {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__CardPreset"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.phaseOneHitCardIds = [];
		this.phaseTwoHitCardIds = [];
		this.gameObjectPreset = this.gameObject.setInteractive(new Phaser.Geom.Rectangle(-137 / 2, -207 / 2, 137, 207), Phaser.Geom.Rectangle.Contains);
		this.gameObjectPreset.input.cursor = 'pointer';

		this.lastPosX = this.gameObject.x;
		this.lastPosY = this.gameObject.y;

		this.gameObjectPreset.on('pointerdown', (pointer) => {
			this.currentOwnCardLabel = this.cardNumber;
			this.currentOwnCardColor = this.cardColor;
			this.currentOwnCardId = this.cardId;
			console.log("Container - 1: ", this.gameObject.scene.isDeclarePhase);
			if (this.gameObject.scene.isDeclarePhase == true) {
				// this.GameObjects.postValidateOfSet();
				this.checkMatchContainer(this.currentOwnCardLabel, this.gameObject.scene.doublePhaseOneCardContainer.list, this.gameObject.scene.doublePhaseTwoCardContainer.list);
			}
			console.log("cardLabel :: " + this.currentOwnCardLable + " card color:: " + this.currentOwnCardColor);
			let parentContainerName = this.gameObjectPreset.parentContainer.name;
			this.handleParentContainerOperations(parentContainerName, this.gameObjectPreset);
			this.gameObjectPreset.x = pointer.x;
			this.gameObjectPreset.y = pointer.y;
		});

		this.gameObjectPreset.on('drag', (pointer, dragX, dragY) => {
			this.gameObjectPreset.x = pointer.x;
			this.gameObjectPreset.y = pointer.y;
		});

		this.gameObjectPreset.on('dragend', (pointer, dragX, dragY) => {
			this.gameObjectPreset.x = pointer.x - dragX;
			this.gameObjectPreset.y = pointer.y - dragY;
			if (this.gameObject.scene.nMaxPlayer == 2) {
				//Opened Card Deck
				if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
					this.gameObjectPreset.setPosition(this.gameObject.scene.openedCardDeck.x, this.gameObject.scene.openedCardDeck.y);
					this.gameObject.scene.openedCardDeck.setVisible(false);
					this.gameObjectPreset.setVisible(false);
					console.log(this.cardId);
					this.gameObject.scene.sendDiscardCard(this.cardId);
					// this.gameObject.disableInteractive();
				}
				//Group One
				else if (this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
					this.gameObject.scene.doublePhaseOneCardContainer.add(this.gameObjectPreset);
					this.gameObjectPreset.setScale(0.6);
					this.gameObjectPreset.setPosition(0, 0);
					for (var i = 0; i < this.gameObject.scene.doublePhaseOneCardContainer.list.length; i++) {
						this.phaseOneHitCardIds.push(this.gameObject.scene.doublePhaseOneCardContainer.list[i].__CardPreset.cardId)
					}
					this.lastHitcards = this.phaseOneHitCardIds[this.phaseOneHitCardIds.length - 1];
					if(this.gameObject.scene.isDeclarePhase == true){
					this.gameObject.scene.sendHitCards(this.phaseOneHitCardIds, this.lastHitcards,'aGroup-1');
					}
					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseOneCardContainer);
				}
				//Group Two
				else if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
					this.gameObject.scene.doublePhaseTwoCardContainer.add(this.gameObjectPreset);
					this.gameObjectPreset.setScale(0.6);
					this.gameObjectPreset.setPosition(0, 0);
					for (var i = 0; i < this.gameObject.scene.doublePhaseTwoCardContainer.list.length; i++) {
						this.phaseTwoHitCardIds.push(this.gameObject.scene.doublePhaseTwoCardContainer.list[i].__CardPreset.cardId);
					}
					this.lastHitcards1 = this.phaseTwoHitCardIds[this.phaseTwoHitCardIds.length - 1];
					if(this.gameObject.scene.isDeclarePhase == true){
					this.gameObject.scene.sendHitCards(this.phaseTwoHitCardIds, this.lastHitcards1,'aGroup-2');
					}
					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
				}
				//Player Hand Container
				else {
					this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
					this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
					this.gameObjectPreset.setScale(1);
					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseOneCardContainer);
					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
					// this.gameObject.scene.oPlayerHand.sendChangeGroupDefault(this.cardId);
				}
			}
			this.gameObject.scene.oPlayerHand.arrangePlayerHandCards();
		});
		/* END-USER-CTR-CODE */
	}

	/** @returns {CardPreset} */
	static getComponent(gameObject) {
		return gameObject["__CardPreset"];
	}

	/** @type {Phaser.GameObjects.Container} */
	gameObject;
	/** @type {string} */
	cardId = "";
	/** @type {string} */
	cardNumber = "";
	/** @type {string} */
	cardColor = "";
	/** @type {string} */
	lastPosX = "";
	/** @type {string} */
	lastPosY = "";

	/* START-USER-CODE */

	// Write your code here.
	handleParentContainerOperations(parentContainerName, gameObjectPreset) {
		switch (parentContainerName) {
			case "playerHandContainer":
				this.gameObject.scene.playerHandContainer.remove(gameObjectPreset);
				break;

			case "doublePhaseOneCardContainer":
				this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
				break;

			case "doublePhaseTwoCardContainer":
				this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
				break;

			default:
				this.gameObject.scene.playerHandContainer.add(gameObjectPreset);
				break;
		}
	}

	checkMatchContainer(currentCardLabel, containerOne, containerTwo) {
		for (let i = 0; i < containerOne.length; i++) {
			if (currentCardLabel === containerOne[i].cardNumber || currentCardLabel === "w") {
				this.gameObject.scene.dp_yellow_ring_1.setVisible(true);
				//Handle the Ring Visibility and allow the card to be dragged their
				break;
			}
		}

		for (let i = 0; i < containerTwo.length; i++) {
			if (currentCardLabel === containerTwo[i].cardNumber || currentCardLabel === "w") {
				this.gameObject.scene.dp_yellow_ring_2.setVisible(true);
				//Handle the Ring Visibility and allow the card to be dragged their
				break;
			}
		}
	}
	static clearAllPhaseCards(){
		console.log("Hell0");
	this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
	this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
