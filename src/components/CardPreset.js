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

		// opponentGrp1PhaseCardContainer
		this.opponentGrp1PhaseCardIds = [];
		this.opponentGrp2PhaseCardIds = [];



		this.gameObjectPreset = this.gameObject.setInteractive(
			new Phaser.Geom.Rectangle(-137 / 2, -207 / 2, 137, 207),
			Phaser.Geom.Rectangle.Contains
		);
		this.gameObjectPreset.input.cursor = "pointer";
		this.gameObjectPreset.on("pointerdown", (pointer) => {
			this.lastPosX = this.x;
			this.lastPosY = this.y;
			this.currentOwnCardLabel = this.cardNumber;
			this.currentOwnCardColor = this.cardColor;
			this.currentOwnCardId = this.cardId;
			this.currentCardScore = this.cardScore;
			// grab open deck card..
			console.log(this.gameObject.scene.oGameManager.isOwnTurn);
			if (this.gameObject.scene.oGameManager.isOwnTurn == true) {
				if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
					if (this.gameObject.scene.oGameManager.isGrabCard == false) {
						this.gameObject.scene.grabOpenDeckCard();
						this.gameObject.scene.oGameManager.isGrabCard = true;
						for (let i = 0; i < this.gameObject.scene.discardDeckContainer.list.length; i++) {
							console.log("run");
							this.gameObject.scene.discardDeckContainer.list[i].disableInteractive();
						}
					}
				}
			}
			//check declare phase card of both group
			if (this.gameObject.scene.isDeclarePhase == true) {
				this.checkOwnMatchContainer(this.gameObject.scene.doublePhaseOneCardContainer.list, this.gameObject.scene.doublePhaseTwoCardContainer.list);
				this.checkOpponentMatchContainer(this.gameObjectPreset.scene.opponentGrp1PhaseCardContainer.list, this.gameObjectPreset.scene.opponentGrp2PhaseCardContainer.list)
			}
			let parentContainerName = this.gameObjectPreset.parentContainer.name;
			this.handleParentContainerOperations(parentContainerName, this.gameObjectPreset);
			this.gameObjectPreset.x = pointer.x;
			this.gameObjectPreset.y = pointer.y;
		});
		this.gameObjectPreset.on("pointerup", () => {
			if (this.gameObject.scene.isDeclarePhase == true) {
				this.gameObject.scene.dp_yellow_ring_1.setVisible(false);
				this.gameObject.scene.dp_yellow_ring_2.setVisible(false);
				this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(false);
				this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(false);
			}
		}, this);

		this.gameObjectPreset.on("drag", (pointer, dragX, dragY) => {
			this.gameObjectPreset.x = pointer.x;
			this.gameObjectPreset.y = pointer.y;
			// console.log("hhh",this.gameObjectPreset.x, this.gameObjectPreset.y)
		});

		this.gameObjectPreset.on("dragend", (pointer, dragX, dragY) => {
			this.gameObjectPreset.x = pointer.x - dragX;
			this.gameObjectPreset.y = pointer.y - dragY;
			this.ownPly = false;
			this.opponetPly = false;
			if (this.gameObject.scene.oGameManager.phaseRules == 2) {
				if (this.gameObject.scene.nMaxPlayer == 3 || this.gameObject.scene.nMaxPlayer == 2) {
					//Opened Card Deck
					// Put card in openDeck
					if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
						this.putOpenDeckPosition();
					}
					//Group One
					else if ((this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) || (this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 350 && this.gameObjectPreset.y <= 470)) {
						this.groupOnePosition()
					}
					//Group Two
					else if ((this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) || (this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 485 && this.gameObjectPreset.y <= 605)) {
						this.groupTwoPosition()
					}
					// skip player
					else if (this.gameObjectPreset.x >= 346 && this.gameObjectPreset.x <= 734 && this.gameObjectPreset.y >= 74 && this.gameObjectPreset.y <= 697) {
						this.skipPlayerPosition()
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

			}
			else if (this.oScene.oGameManager.phaseRules == 1) {
				if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
					this.putOpenDeckPosition();
				} else if ((this.gameObjectPreset.x >= 80 && this.gameObjectPreset.x <= 960 && this.gameObjectPreset.y >= 1100 && this.gameObjectPreset.y <= 1100) || (this.gameObjectPreset.x >= 80 && this.gameObjectPreset.x <= 1300 && this.gameObjectPreset.y >= 950 && this.gameObjectPreset.y <= 1300)) {
					this.ruleOneGroupPosition()
				} else if (this.gameObjectPreset.x >= 346 && this.gameObjectPreset.x <= 734 && this.gameObjectPreset.y >= 74 && this.gameObjectPreset.y <= 697) {
					this.skipPlayerPosition()
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
				console.log("hand card container");
				this.gameObject.scene.playerHandContainer.remove(gameObjectPreset);
				break;
			case "doublePhaseOneCardContainer":
				console.log("group one container");
				this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
				break;
			case "doublePhaseTwoCardContainer":
				console.log("group two container");
				this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
				break;
			case "opponentGrp1PhaseCardContainer":
				console.log("group two container");
				this.gameObject.scene.opponentGrp1PhaseCardContainer.remove(gameObjectPreset);
				break;
			case "opponentGrp2PhaseCardContainer":
				console.log("group two container");
				this.gameObject.scene.opponentGrp2PhaseCardContainer.remove(gameObjectPreset);
				break;
			default:
				console.log("defauly add container");
				this.gameObject.scene.playerHandContainer.add(gameObjectPreset);
				break;
		}
	}
	putOpenDeckPosition() {
		if (this.gameObject.scene.oGameManager.isOwnTurn == true && this.gameObject.scene.oGameManager.isGrabCard == true) {
			this.gameObjectPreset.setPosition(this.gameObject.scene.openedCardDeck.x, this.gameObject.scene.openedCardDeck.y);
			this.gameObjectPreset.setVisible(false);
			this.sendDiscardCard(this.cardId);
		} else {
			this.gameObjectPreset.setPosition(parseFloat(this.gameObjectPreset.x), parseFloat(this.gameObjectPreset.y));
			this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(1);
		}
	}
	groupOnePosition() {
		if (this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
			this.ownPly = true;
			this.gameObjectPreset.scene.oGameManager.ownPly = true;

			this.gameObject.scene.doublePhaseOneCardContainer.add(this.gameObjectPreset);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseOneCardContainer);
			this.gameObjectPreset.setScale(0.6);
			this.gameObjectPreset.setPosition(0, 0);
			for (let i = 0; i < this.gameObject.scene.doublePhaseOneCardContainer.list.length; i++) {
				this.phaseOneHitCardIds.push(this.gameObject.scene.doublePhaseOneCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards = this.phaseOneHitCardIds[this.phaseOneHitCardIds.length - 1];
		}
		else if (this.gameObject.scene.isDeclarePhase == true && this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 350 && this.gameObjectPreset.y <= 470) {
			this.opponetPly = true;
			this.gameObjectPreset.scene.oGameManager.opponetPly = true;
			this.gameObject.scene.opponentGrp1PhaseCardContainer.add(this.gameObjectPreset);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.opponentGrp1PhaseCardContainer);
			this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			for (let i = 0; i < this.gameObject.scene.opponentGrp1PhaseCardContainer.list.length; i++) {
				this.opponentGrp1PhaseCardIds.push(this.gameObject.scene.opponentGrp1PhaseCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards = this.opponentGrp1PhaseCardIds[this.opponentGrp1PhaseCardIds.length - 1];
		}
		if (this.gameObject.scene.isDeclarePhase == true) {
			if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
				this.setContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : this.opponentGrp1PhaseCardIds, this.lastHitcards, "aGroup-1");
			} else if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
				this.runContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : this.opponentGrp1PhaseCardIds, this.lastHitcards, "aGroup-1");
			} else if (this.gameObject.scene.oGameManager.phaseOneType == "color") {
				this.colorContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer,);
			}
		}
		console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly);
	}
	groupTwoPosition() {
		if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
			this.ownPly = true;
			this.gameObject.scene.doublePhaseTwoCardContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(0.6);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
			for (let i = 0; i < this.gameObject.scene.doublePhaseTwoCardContainer.list.length; i++) {
				this.phaseTwoHitCardIds.push(this.gameObject.scene.doublePhaseTwoCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards1 = this.phaseTwoHitCardIds[this.phaseTwoHitCardIds.length - 1];

		} else if (this.gameObject.scene.isDeclarePhase == true && this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 485 && this.gameObjectPreset.y <= 605) {
			this.opponetPly = true;
			this.gameObject.scene.opponentGrp2PhaseCardContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.oRuleset.validateRuleset(
				this.gameObject.scene.opponentGrp2PhaseCardContainer
			);
			for (let i = 0; i < this.gameObject.scene.opponentGrp2PhaseCardContainer.list.length; i++) {
				this.opponentGrp2PhaseCardIds.push(this.gameObject.scene.opponentGrp2PhaseCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards1 = this.opponentGrp2PhaseCardIds[this.opponentGrp2PhaseCardIds.length - 1];
		}
		if (this.gameObject.scene.isDeclarePhase == true) {
			if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
				this.setContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : this.opponentGrp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
			} else if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
				this.runContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : this.opponentGrp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
			} else if (this.gameObject.scene.oGameManager.phaseTwoType == "color") {
				this.colorContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer,);
			}
		}
		console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly);
	}
	ruleOneGroupPosition() {
		if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
			this.ownPly = true;
			this.gameObject.scene.doublePhaseTwoCardContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(0.6);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
			for (let i = 0; i < this.gameObject.scene.doublePhaseTwoCardContainer.list.length; i++) {
				this.phaseTwoHitCardIds.push(this.gameObject.scene.doublePhaseTwoCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards1 = this.phaseTwoHitCardIds[this.phaseTwoHitCardIds.length - 1];

		} else if (this.gameObject.scene.isDeclarePhase == true && this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 485 && this.gameObjectPreset.y <= 605) {
			this.opponetPly = true;
			this.gameObject.scene.opponentGrp2PhaseCardContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.oRuleset.validateRuleset(
				this.gameObject.scene.opponentGrp2PhaseCardContainer
			);
			for (let i = 0; i < this.gameObject.scene.opponentGrp2PhaseCardContainer.list.length; i++) {
				this.opponentGrp2PhaseCardIds.push(this.gameObject.scene.opponentGrp2PhaseCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards1 = this.opponentGrp2PhaseCardIds[this.opponentGrp2PhaseCardIds.length - 1];
		}
		if (this.gameObject.scene.isDeclarePhase == true) {
			if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
				this.setContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : this.opponentGrp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
			} else if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
				this.runContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : this.opponentGrp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
			} else if (this.gameObject.scene.oGameManager.phaseTwoType == "color") {
				this.colorContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer,);
			}
		}
		console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly);

	}
	skipPlayerPosition() {
		if (this.gameObject.__CardPreset.cardNumber === "s") {
			this.gameObject.scene.oRuleset.validateSkipCard(this.gameObject);
		} else {
			this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
			this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(1);
		}
	}

	checkOwnMatchContainer(containerOne, containerTwo) {
		this.posX = this.gameObject.x;
		this.posY = this.gameObject.y;
		if (this.gameObject.scene.doublePhaseOneCardContainer.name == "doublePhaseOneCardContainer") {
			let cardContOneArray = []
			if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
				for (let i = 0; i < containerOne.length; i++) {
					if (this.currentOwnCardLabel === containerOne[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
						this.gameObject.scene.dp_yellow_ring_1.setVisible(true);
						//Handle the Ring Visibility and allow the card to be dragged their
					} else {
						this.gameObject.x = this.posX;
						this.gameObject.y = this.posY;
					}
				}
			}
			if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
				for (let i = 0; i < containerOne.length; i++) {
					console.log(containerOne[i].__CardPreset.cardNumber)
					cardContOneArray.push(containerOne[i].__CardPreset.cardNumber);
				}
				console.log("containerCardData  ===> ", cardContOneArray);
				cardContOneArray = cardContOneArray.filter((value) => {
					if (value != "w") {
						return value
					}
				})
				let maxNo = Math.max(...cardContOneArray);
				let minNo = Math.min(...cardContOneArray);
				console.log("min :", minNo, "max :", maxNo);
				if (minNo - 1 == this.currentOwnCardLabel || maxNo + 1 == this.currentOwnCardLabel || this.currentOwnCardLabel == 'w') {
					this.gameObject.scene.dp_yellow_ring_1.setVisible(true);
				}
			}
		}
		if (this.gameObject.scene.doublePhaseTwoCardContainer.name == "doublePhaseTwoCardContainer") {
			let cardContTwoArray = []
			if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
				for (let i = 0; i < containerTwo.length; i++) {
					if (
						this.currentOwnCardLabel === containerTwo[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
						this.gameObject.scene.dp_yellow_ring_2.setVisible(true);
						//Handle the Ring Visibility and allow the card to be dragged their
					} else {
						this.gameObject.x = this.posX;
						this.gameObject.y = this.posY;
					}
				}
			}
			if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
				for (let i = 0; i < containerTwo.length; i++) {
					console.log(containerTwo[i].__CardPreset.cardNumber)
					cardContTwoArray.push(containerTwo[i].__CardPreset.cardNumber);
				}
				console.log("containerCardData  ===> ", cardContTwoArray);
				cardContTwoArray = cardContTwoArray.filter((value) => {
					if (value != "w") {
						return value
					}
				})
				let maxNo = Math.max(...cardContTwoArray);
				let minNo = Math.min(...cardContTwoArray);
				console.log("min :", minNo, "max :", maxNo);
				if (minNo - 1 == this.currentOwnCardLabel || maxNo + 1 == this.currentOwnCardLabel || this.currentOwnCardLabel == 'w') {
					this.gameObject.scene.dp_yellow_ring_2.setVisible(true);
				}
			}
		}
	}
	checkOpponentMatchContainer(opponentContainer1, opponentContainer2) {
		if (this.gameObject.scene.opponentGrp1PhaseCardContainer.name == "opponentGrp1PhaseCardContainer") {
			let cardContTwoArray = [];
			if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
				for (let i = 0; i < opponentContainer1.length; i++) {
					if (this.currentOwnCardLabel == opponentContainer1[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
						this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(true);
					}
				}
			}
			if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
				for (let i = 0; i < opponentContainer1.length; i++) {
					console.log(opponentContainer1[i].__CardPreset.cardNumber)
					cardContTwoArray.push(opponentContainer1[i].__CardPreset.cardNumber);
				}
				console.log("containerCardData  ===> ", cardContTwoArray);
				cardContTwoArray = cardContTwoArray.filter((value) => {
					if (value != "w") {
						return value
					}
				})
				let maxNo = Math.max(...cardContTwoArray);
				let minNo = Math.min(...cardContTwoArray);
				console.log("min :", minNo, "max :", maxNo);
				if (minNo - 1 == this.currentOwnCardLabel || maxNo + 1 == this.currentOwnCardLabel || this.currentOwnCardLabel == 'w') {
					this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(true);
				}

			}
		}
		if (this.gameObject.scene.opponentGrp2PhaseCardContainer.name == "opponentGrp2PhaseCardContainer") {
			let cardContTwoArray = [];
			if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
				for (let i = 0; i < opponentContainer2.length; i++) {
					if (this.currentOwnCardLabel == opponentContainer2[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
						this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(true);
					}
				}
			}
			if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
				for (let i = 0; i < opponentContainer2.length; i++) {
					console.log(opponentContainer2[i].__CardPreset.cardNumber)
					cardContTwoArray.push(opponentContainer2[i].__CardPreset.cardNumber);
				}
				console.log("containerCardData  ===> ", cardContTwoArray);
				cardContTwoArray = cardContTwoArray.filter((value) => {
					if (value != "w") {
						return value
					}
				})
				let maxNo = Math.max(...cardContTwoArray);
				let minNo = Math.min(...cardContTwoArray);
				console.log("min :", minNo, "max :", maxNo);
				if (minNo - 1 == this.currentOwnCardLabel || maxNo + 1 == this.currentOwnCardLabel || this.currentOwnCardLabel == 'w') {
					this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(true);
				}
			}
		}
	}
	static clearAllPhaseCards() {
		this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
		this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
	}
	setContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {
		let tempMatch = false;
		for (let i = 0; i < groupContainer.list.length; i++) {
			if (this.currentOwnCardLabel == groupContainer.list[i].__CardPreset.cardNumber) {

				tempMatch = true;
				break;
			}
		}
		// if (this.currentOwnCardLabel === groupContainer.list[0].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
		if (tempMatch || this.currentOwnCardLabel === "w") {
			console.log("all are done to work it");
			groupContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.disableInteractive();
			(this.ownPly == true) ? this.gameObjectPreset.setScale(0.6) : this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			if (this.ownPly == true) {
				this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
			}
			else {
				this.gameObject.scene.sendOpponentHitCards(phaseHitCardIds, lastHitcard, grp);

			}
		} else {
			console.log("all are not done to work it");
			this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(1);
			this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
		}
	}
	runContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {
		let tempFilter = [];
		let tempCard = [];
		for (let i = 0; i < groupContainer.list.length; i++) {
			console.log(groupContainer.list[i].__CardPreset.cardNumber)
			tempCard.push(groupContainer.list[i].__CardPreset.cardNumber);
		}
		tempCard.pop();
		tempFilter = tempCard.filter((value) => {
			if (value != "w") {
				return value;
			}
		})
		let min = Math.min(...tempFilter);
		let max = Math.max(...tempFilter);
		if ((min - 1) == this.currentOwnCardLabel || (max + 1) == this.currentOwnCardLabel || 'w' == this.currentOwnCardLabel) {
			groupContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.disableInteractive();
			this.gameObjectPreset.setScale(0.6);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
		} else {
			this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(1);
			this.gameObjectPreset.setPosition(
				parseFloat(this.lastPosX),
				parseFloat(this.lastPosY)
			);
		}
	}
	colorContition() { }
	sendDiscardCard(cardDiscard) {
		console.log("cardDiscard", cardDiscard);

		this.gameObject.scene.oSocketManager.oRootSocketConn.emit(
			this.gameObject.scene.oSocketManager.iTableId,
			{ sEventName: "reqDiscardCard", oData: { iCardId: cardDiscard } },
			(response, error) => {
				console.log("response", response, "error", error);
				if (response != null && response.message == "grab card first") {
					this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);

					this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
					this.gameObjectPreset.setScale(1);
					this.gameObject.scene.oPlayerHand.arrangePlayerHandCards();
				} else {
					console.log("oplayer manger", error);
				}
			}
		);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
