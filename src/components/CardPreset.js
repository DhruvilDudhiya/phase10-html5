
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
			console.log(" :::::::::::::::::: pointerDown")
			this.currentOwnCardLabel = this.cardNumber;
			this.currentOwnCardColor = this.cardColor;
			this.currentOwnCardId = this.cardId;
			this.currentCardScore = this.cardScore;
			// grab open deck card..
			if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
				if (this.gameObject.scene.oGameManager.isOwnTurn == true) {
					if(this.gameObject.scene.oGameManager.isGrabCard == false){
						this.gameObject.scene.grabOpenDeckCard();
					}
					this.gameObject.scene.oGameManager.isGrabCard = true;
				}
			}
			//check declare phase card of both group
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
			if (this.gameObject.scene.nMaxPlayer == 3 || this.gameObject.scene.nMaxPlayer == 2) {
				//Opened Card Deck
				// Put card in openDeck
				if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
					if (this.gameObject.scene.oGameManager.isOwnTurn == true) {
						this.gameObjectPreset.setPosition(this.gameObject.scene.openedCardDeck.x, this.gameObject.scene.openedCardDeck.y);
						this.gameObjectPreset.setVisible(false);
						this.sendDiscardCard(this.cardId);
					} else {
						this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
						this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
						this.gameObjectPreset.setScale(1);
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
						console.log("Phase Type :::=>>", this.gameObject.scene.oGameManager.phaseOneType)
						if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
							this.setContition(this.gameObject.scene.doublePhaseOneCardContainer, this.phaseOneHitCardIds, this.lastHitcards, 'aGroup-1');
						} else if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
							this.runContition(this.gameObject.scene.doublePhaseOneCardContainer);
						} else if (this.gameObject.scene.oGameManager.phaseOneType == "color") {
							this.colorContition(this.gameObject.scene.doublePhaseOneCardContainer);
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
					console.log("Phase Type :::=>>", this.gameObject.scene.oGameManager.phaseTwoType)
					if (this.gameObject.scene.isDeclarePhase == true) {
						if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
							this.setContition(this.gameObject.scene.doublePhaseTwoCardContainer, this.phaseTwoHitCardIds, this.lastHitcards1, 'aGroup-2');
						}
						else if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
							this.runContition(this.gameObject.scene.doublePhaseTwoCardContainer);
						} else if (this.gameObject.scene.oGameManager.phaseTwoType == "color") {
							this.colorContition(this.gameObject.scene.doublePhaseTwoCardContainer);
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
					setContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {
						if (this.currentOwnCardLabel === groupContainer.list[0].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
							console.log("Match");
							groupContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.disableInteractive();
							this.gameObjectPreset.setScale(0.6);
							this.gameObjectPreset.setPosition(0, 0);
							this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
						} else {
							this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.setScale(1);
							this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
						}
					}
					runContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {
						let tempFilter = [];
						tempFilter = groupContainer.list.forEach(element => {
							if (element.__CardPreset.cardNumber != 'w') {
								console.log(element.__CardPreset.cardNumber)
								return element.__CardPreset.cardNumber;
							}
						});
						console.log(tempFilter);
						
						let min = Math.min(...tempFilter);
						let max = Math.max(...tempFilter);
						if (min - 1 == this.currentOwnCardLabel || max + 1 == this.currentOwnCardLabel) {
							groupContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.disableInteractive();
							this.gameObjectPreset.setScale(0.6);
							this.gameObjectPreset.setPosition(0, 0);
							this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
						} else {
							this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
							this.gameObjectPreset.setScale(1);
							this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
						}
						
					}
					colorContition() {
						
					}
					sendDiscardCard(cardDiscard) {
						this.gameObject.scene.oSocketManager.oRootSocketConn.emit(this.gameObject.scene.oSocketManager.iTableId, { sEventName: 'reqDiscardCard', oData: { iCardId: cardDiscard } }, (response, error) => {
							console.log("reqDiscardCard :: ", response, error);
							if (response != null && response.message == "grab card first") {
								this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
								this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
								this.gameObjectPreset.setScale(1);
								this.gameObject.scene.oPlayerHand.arrangePlayerHandCards();
							}
							else{
								console.log(error);
							}
						});
					}
					/* END-USER-CODE */
				}
				
				/* END OF COMPILED CODE */
				
// You can write more code here








// // You can write more code here

// /* START OF COMPILED CODE */

// /* START-USER-IMPORTS */
// /* END-USER-IMPORTS */

// class CardPreset {

// 	constructor(gameObject) {
// 		this.gameObject = gameObject;
// 		gameObject["__CardPreset"] = this;

// 		/* START-USER-CTR-CODE */
// 		// Write your code here.
// 		this.phaseOneHitCardIds = [];
// 		this.phaseTwoHitCardIds = [];
// 		this.gameObjectPreset = this.gameObject.setInteractive(new Phaser.Geom.Rectangle(-137 / 2, -207 / 2, 137, 207), Phaser.Geom.Rectangle.Contains);
// 		this.gameObjectPreset.input.cursor = 'pointer';
// 		this.lastPosX = this.x;
// 		this.lastPosY = this.y;
// 		this.gameObjectPreset.on('pointerdown', (pointer) => {
// 			console.log(" :::::::::::::::::: pointerDown")
// 			this.currentOwnCardLabel = this.cardNumber;
// 			this.currentOwnCardColor = this.cardColor;
// 			this.currentOwnCardId = this.cardId;
// 			this.currentCardScore = this.cardScore;
// 			if(this.gameObject.scene.oGameManager.isOnclickCloseDeck == true){
// 				if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
// 					this.gameObject.scene.oGameManager.isGrabCard = true;
// 					console.log("=========> is grabcard",this.gameObject.scene.oGameManager.isGrabCard);
// 					this.gameObject.scene.grabOpenDeckCard();
// 					this.gameObjectPreset.setVisible(false);
// 				}
// 			}
// 			if (this.gameObject.scene.isDeclarePhase == true) {
// 				this.checkMatchContainer(this.gameObject.scene.doublePhaseOneCardContainer.list, this.gameObject.scene.doublePhaseTwoCardContainer.list);
// 			}
// 			let parentContainerName = this.gameObjectPreset.parentContainer.name;
// 			this.handleParentContainerOperations(parentContainerName, this.gameObjectPreset);
// 			this.gameObjectPreset.x = pointer.x;
// 			this.gameObjectPreset.y = pointer.y;
// 		});
// 		this.gameObjectPreset.on("pointerup", (pointer) => {
// 			if (this.gameObject.scene.isDeclarePhase == true) {
// 				this.gameObject.scene.dp_yellow_ring_1.setVisible(false);
// 				this.gameObject.scene.dp_yellow_ring_2.setVisible(false);
// 			}
// 		});

// 		this.gameObjectPreset.on('drag', (pointer, dragX, dragY) => {
// 			this.gameObjectPreset.x = pointer.x;
// 			this.gameObjectPreset.y = pointer.y;

// 		});

// 		this.gameObjectPreset.on('dragend', (pointer, dragX, dragY) => {
// 			this.gameObjectPreset.x = pointer.x - dragX;
// 			this.gameObjectPreset.y = pointer.y - dragY;
// 			if (this.gameObject.scene.nMaxPlayer == 2) {
// 				//Opened Card Deck
// 				if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
// 					console.log("=======> isGrabCard1 OpenDeck ",this.gameObject.scene.oGameManager.isGrabCard);
// 					if (this.gameObject.scene.oGameManager.isGrabCard == false) {
// 						this.gameObjectPreset.setPosition(this.gameObject.scene.openedCardDeck.x, this.gameObject.scene.openedCardDeck.y);
// 						this.gameObject.scene.openedCardDeck.setVisible(false);
// 						this.gameObjectPreset.setVisible(false);
// 						this.gameObject.scene.sendDiscardCard(this.cardId);
// 					} else if (this.gameObject.scene.oGameManager.isGrabCard == true) {
// 						this.gameObjectPreset.setPosition(this.gameObject.scene.openedCardDeck.x, this.gameObject.scene.openedCardDeck.y);
// 						this.gameObject.scene.oGameManager.isGrabCard = false;
// 						console.log(" ======> isGrabcard2 ", this.gameObject.scene.oGameManager.isGrabCard);
// 					} else {
// 						this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
// 						this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
// 						this.gameObjectPreset.setScale(1);
// 					}
// 				}
// 				//Group One
// 				else if (this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
// 					this.gameObject.scene.doublePhaseOneCardContainer.add(this.gameObjectPreset);
// 					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseOneCardContainer);
// 					this.gameObjectPreset.setScale(0.6);
// 					this.gameObjectPreset.setPosition(0, 0);
// 					for (var i = 0; i < this.gameObject.scene.doublePhaseOneCardContainer.list.length; i++) {
// 						this.phaseOneHitCardIds.push(this.gameObject.scene.doublePhaseOneCardContainer.list[i].__CardPreset.cardId)
// 					}
// 					this.lastHitcards = this.phaseOneHitCardIds[this.phaseOneHitCardIds.length - 1];
// 					if (this.gameObject.scene.isDeclarePhase == true) {
// 						console.log("Phase Type :::=>>", this.gameObject.scene.oGameManager.phaseOneType)
// 						if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
// 							this.setContition(this.gameObject.scene.doublePhaseOneCardContainer, this.phaseOneHitCardIds, this.lastHitcards, 'aGroup-1');
// 						} else if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
// 							this.runContition(this.gameObject.scene.doublePhaseOneCardContainer);
// 						} else if (this.gameObject.scene.oGameManager.phaseOneType == "color") {
// 							this.colorContition(this.gameObject.scene.doublePhaseOneCardContainer);
// 						}
// 					}
// 				}
// 				//Group Two
// 				else if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
// 					this.gameObject.scene.doublePhaseTwoCardContainer.add(this.gameObjectPreset);
// 					this.gameObjectPreset.setScale(0.6);
// 					this.gameObjectPreset.setPosition(0, 0);
// 					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
// 					for (var i = 0; i < this.gameObject.scene.doublePhaseTwoCardContainer.list.length; i++) {
// 						this.phaseTwoHitCardIds.push(this.gameObject.scene.doublePhaseTwoCardContainer.list[i].__CardPreset.cardId);
// 					}
// 					this.lastHitcards1 = this.phaseTwoHitCardIds[this.phaseTwoHitCardIds.length - 1];
// 					console.log("Phase Type :::=>>", this.gameObject.scene.oGameManager.phaseTwoType)
// 					if (this.gameObject.scene.isDeclarePhase == true) {
// 						if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
// 							this.setContition(this.gameObject.scene.doublePhaseTwoCardContainer, this.phaseTwoHitCardIds, this.lastHitcards1, 'aGroup-2');
// 						}
// 						else if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
// 							this.runContition(this.gameObject.scene.doublePhaseTwoCardContainer);
// 						} else if (this.gameObject.scene.oGameManager.phaseTwoType == "color") {
// 							this.colorContition(this.gameObject.scene.doublePhaseTwoCardContainer);
// 						}

// 					}
// 				}
// 				// }
// 				//Player Hand Container
// 				else {
// 					this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
// 					this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
// 					this.gameObjectPreset.setScale(1);
// 					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseOneCardContainer);
// 					this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
// 					// this.gameObject.scene.oPlayerHand.sendChangeGroupDefault(this.cardId);
// 				}
// 			}
// 			this.gameObject.scene.oPlayerHand.arrangePlayerHandCards();
// 		});
// 		/* END-USER-CTR-CODE */
// 	}

// 	/** @returns {CardPreset} */
// 	static getComponent(gameObject) {
// 		return gameObject["__CardPreset"];
// 	}

// 	/** @type {Phaser.GameObjects.Container} */
// 	gameObject;
// 	/** @type {string} */
// 	cardId = "";
// 	/** @type {string} */
// 	cardNumber = "";
// 	/** @type {string} */
// 	cardColor = "";
// 	/** @type {string} */
// 	lastPosX = "";
// 	/** @type {string} */
// 	lastPosY = "";
// 	/** @type {string} */
// 	cardGroupNo = "";
// 	/** @type {string} */
// 	cardScore = "";

// 	/* START-USER-CODE */

// 	// Write your code here.
// 	handleParentContainerOperations(parentContainerName, gameObjectPreset) {
// 		switch (parentContainerName) {
// 			case "playerHandContainer":
// 				this.gameObject.scene.playerHandContainer.remove(gameObjectPreset);
// 				break;

// 			case "doublePhaseOneCardContainer":
// 				this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
// 				break;

// 			case "doublePhaseTwoCardContainer":
// 				this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
// 				break;

// 			default:
// 				this.gameObject.scene.playerHandContainer.add(gameObjectPreset);
// 				break;
// 		}
// 	}

// 	checkMatchContainer(containerOne, containerTwo) {
// 		console.log("1", containerOne);
// 		this.posX = this.gameObject.x;
// 		this.posY = this.gameObject.y;
// 		for (let i = 0; i < containerOne.length; i++) {
// 			console.log("cardLabel", this.currentOwnCardLabel, containerOne[i].__CardPreset.cardNumber);
// 			if (this.currentOwnCardLabel === containerOne[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
// 				this.gameObject.scene.dp_yellow_ring_1.setVisible(true);
// 				//Handle the Ring Visibility and allow the card to be dragged their
// 			} else {
// 				this.gameObject.x = this.posX;
// 				this.gameObject.y = this.posY;
// 			}
// 		}

// 		for (let i = 0; i < containerTwo.length; i++) {
// 			console.log("cardLabel", this.currentOwnCardLabel, containerTwo[i].__CardPreset.cardNumber);
// 			if (this.currentOwnCardLabel === containerTwo[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
// 				this.gameObject.scene.dp_yellow_ring_2.setVisible(true);
// 				//Handle the Ring Visibility and allow the card to be dragged their
// 			} else {
// 				this.gameObject.x = this.posX;
// 				this.gameObject.y = this.posY;
// 			}
// 		}
// 	}
// 	static clearAllPhaseCards() {
// 		console.log("Hell0");
// 		this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
// 		this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
// 	}
// 	setContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {
// 		if (this.currentOwnCardLabel === groupContainer.list[0].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
// 			console.log("Match");
// 			groupContainer.add(this.gameObjectPreset);
// 			this.gameObjectPreset.disableInteractive();
// 			this.gameObjectPreset.setScale(0.6);
// 			this.gameObjectPreset.setPosition(0, 0);
// 			this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
// 		} else {
// 			this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
// 			this.gameObjectPreset.setScale(1);
// 			this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
// 		}
// 	}
// 	runContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {
// 		let tempFilter = [];
// 		tempFilter = groupContainer.list.forEach(element => {
// 			if (element.__CardPreset.cardNumber != 'w') {
// 				console.log(element.__CardPreset.cardNumber)
// 				return element.__CardPreset.cardNumber;
// 			}
// 		});
// 		console.log(tempFilter);

// 		let min = Math.min(...tempFilter);
// 		let max = Math.max(...tempFilter);
// 		if (min - 1 == this.currentOwnCardLabel || max + 1 == this.currentOwnCardLabel) {
// 			groupContainer.add(this.gameObjectPreset);
// 			this.gameObjectPreset.disableInteractive();
// 			this.gameObjectPreset.setScale(0.6);
// 			this.gameObjectPreset.setPosition(0, 0);
// 			this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
// 		} else {
// 			this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
// 			this.gameObjectPreset.setScale(1);
// 			this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
// 		}

// 	}
// 	colorContition() {

// 	}
// 	/* END-USER-CODE */
// }

// /* END OF COMPILED CODE */

// // You can write more code here
