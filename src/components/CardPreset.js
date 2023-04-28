
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
		this.lastPosX = this.x;
		this.lastPosY = this.y;
		this.gameObjectPreset.on('pointerdown', (pointer) => {
			this.currentOwnCardLabel = this.cardNumber;
			this.currentOwnCardColor = this.cardColor;
			this.currentOwnCardId = this.cardId;
			this.currentCardScore = this.cardScore;
			if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
				this.gameObject.scene.isGrabCard = true;
				console.log("=========> is grabcard",this.gameObject.scene.isGrabCard);
				this.gameObject.scene.grabOpenDeckCard();
				this.gameObjectPreset.setVisible(false);
			}
			if (this.gameObject.scene.isDeclarePhase == true) {
				this.checkMatchContainer(this.gameObject.scene.doublePhaseOneCardContainer.list, this.gameObject.scene.doublePhaseTwoCardContainer.list);
			}
			let parentContainerName = this.gameObjectPreset.parentContainer.name;
			this.handleParentContainerOperations(parentContainerName, this.gameObjectPreset);
			this.gameObjectPreset.x = pointer.x;
			this.gameObjectPreset.y = pointer.y;
		});
		this.gameObjectPreset.on("pointerup", (pointer) => {
			if (this.gameObject.scene.isDeclarePhase == true) {
				this.gameObject.scene.dp_yellow_ring_1.setVisible(false);
				this.gameObject.scene.dp_yellow_ring_2.setVisible(false);
			}
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
					console.log("=======> isGrabCard1 ",this.gameObject.scene.isGrabCard);
					if (this.gameObject.scene.isGrabCard == false) {
						this.gameObjectPreset.setPosition(this.gameObject.scene.openedCardDeck.x, this.gameObject.scene.openedCardDeck.y);
						this.gameObject.scene.openedCardDeck.setVisible(false);
						this.gameObjectPreset.setVisible(false);
						this.gameObject.scene.sendDiscardCard(this.cardId);
					}else{
						this.gameObjectPreset.setPosition(this.gameObject.scene.openedCardDeck.x, this.gameObject.scene.openedCardDeck.y);
						this.gameObject.scene.isGrabCard = false;
						console.log(" ======> isGrabcard2 ", this.gameObject.scene.isGrabCard);

					}
				}
				//Group One
				else if (this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
					this.gameObject.scene.doublePhaseOneCardContainer.add(this.gameObjectPreset);
					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseOneCardContainer);
					this.gameObjectPreset.setScale(0.6);
					this.gameObjectPreset.setPosition(0, 0);
					for (var i = 0; i < this.gameObject.scene.doublePhaseOneCardContainer.list.length; i++) {
						this.phaseOneHitCardIds.push(this.gameObject.scene.doublePhaseOneCardContainer.list[i].__CardPreset.cardId)
					}
					this.lastHitcards = this.phaseOneHitCardIds[this.phaseOneHitCardIds.length - 1];
					if (this.gameObject.scene.isDeclarePhase == true) {
						if (this.currentOwnCardLabel === this.gameObject.scene.doublePhaseOneCardContainer.list[0].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
							console.log("match");
							this.gameObject.scene.doublePhaseOneCardContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.setScale(0.6);
							this.gameObjectPreset.setPosition(0, 0);
							this.gameObject.scene.sendHitCards(this.phaseOneHitCardIds, this.lastHitcards, 'aGroup-1');
						} else {
							this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.setScale(1);
							this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
						}
					}
				}
				//Group Two
				else if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
					this.gameObject.scene.doublePhaseTwoCardContainer.add(this.gameObjectPreset);
					this.gameObjectPreset.setScale(0.6);
					this.gameObjectPreset.setPosition(0, 0);
					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
					for (var i = 0; i < this.gameObject.scene.doublePhaseTwoCardContainer.list.length; i++) {
						this.phaseTwoHitCardIds.push(this.gameObject.scene.doublePhaseTwoCardContainer.list[i].__CardPreset.cardId);
					}
					this.lastHitcards1 = this.phaseTwoHitCardIds[this.phaseTwoHitCardIds.length - 1];
					if (this.gameObject.scene.isDeclarePhase == true) {
						if (this.currentOwnCardLabel === this.gameObject.scene.doublePhaseTwoCardContainer.list[0].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
							console.log("Match");
							this.gameObject.scene.doublePhaseTwoCardContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.setScale(0.6);
							this.gameObjectPreset.setPosition(0, 0);
							this.gameObject.scene.sendHitCards(this.phaseTwoHitCardIds, this.lastHitcards1, 'aGroup-2');
						} else {
							this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.setScale(1);
							this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
						}
					}
				}
				// }
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
	/** @type {string} */
	cardGroupNo = "";
	/** @type {string} */
	cardScore = "";

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

	checkMatchContainer(containerOne, containerTwo) {
		console.log("1", containerOne);
		this.posX = this.gameObject.x;
		this.posY = this.gameObject.y;
		for (let i = 0; i < containerOne.length; i++) {
			console.log("cardLabel", this.currentOwnCardLabel, containerOne[i].__CardPreset.cardNumber);
			if (this.currentOwnCardLabel === containerOne[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
				this.gameObject.scene.dp_yellow_ring_1.setVisible(true);
				//Handle the Ring Visibility and allow the card to be dragged their
			} else {
				this.gameObject.x = this.posX;
				this.gameObject.y = this.posY;
			}
		}

		for (let i = 0; i < containerTwo.length; i++) {
			console.log("cardLabel", this.currentOwnCardLabel, containerTwo[i].__CardPreset.cardNumber);
			if (this.currentOwnCardLabel === containerTwo[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
				this.gameObject.scene.dp_yellow_ring_2.setVisible(true);
				//Handle the Ring Visibility and allow the card to be dragged their
			} else {
				this.gameObject.x = this.posX;
				this.gameObject.y = this.posY;
			}
		}
	}
	static clearAllPhaseCards() {
		console.log("Hell0");
		this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
		this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
