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

		this.opponent2Grp1PhaseCardIds = [];
		this.opponent2Grp2PhaseCardIds = [];
		this.opponent3Grp1PhaseCardIds = [];
		this.opponent3Grp2PhaseCardIds = [];

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

				if(this.gameObjectPreset.scene.nMaxPlayer == 2){
					this.checkOpponentMatchContainer(this.gameObjectPreset.scene.opponentGrp1PhaseCardContainer.list, this.gameObjectPreset.scene.opponentGrp2PhaseCardContainer.list, this.gameObjectPreset.scene.nMaxPlayer)
				}
				else{
					this.checkOpponentMatchContainer(this.gameObjectPreset.scene.opponent2Grp1PhaseCardContainer.list, this.gameObjectPreset.scene.opponent3Grp1PhaseCardContainer.list, this.gameObjectPreset.scene.nMaxPlayer)
					this.checkOpponentMatchContainer(this.gameObjectPreset.scene.opponent2Grp2PhaseCardContainer.list, this.gameObjectPreset.scene.opponent3Grp2PhaseCardContainer.list, this.gameObjectPreset.scene.nMaxPlayer)
				}
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

				this.gameObject.scene.yellow_ring_opponentGrp_21.setVisible(false);
				this.gameObject.scene.yellow_ring_opponentGrp_22.setVisible(false);
				this.gameObject.scene.yellow_ring_opponentGrp_31.setVisible(false);
				this.gameObject.scene.yellow_ring_opponentGrp_32.setVisible(false);



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

			this.gameObjectPreset.scene.oGameManager.ownPly = false;
			this.gameObjectPreset.scene.oGameManager.opponetPly = false;
			this.ownPly = false;
			this.opponetPly = false;
			this.opponetPlayer2Grp1 = false;
			this.opponetPlayer2Grp2 = false;
			this.opponetPlayer3Grp1 = false;
			this.opponetPlayer3Grp2 = false;


			this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp1 = false;
			this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp1 = false;
			this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp2 = false;
			this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp2 = false;


			if (this.gameObject.scene.oGameManager.phaseRules == 2) {
				if (this.gameObject.scene.nMaxPlayer == 2) {
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
						this.playerHandPosition()
					}
				}
				else if (this.gameObject.scene.nMaxPlayer == 3) {
					//Opened Card Deck
					// Put card in openDeck
					if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
						this.putOpenDeckPosition();
					}
					//Group One
					else if ((this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) || (this.gameObjectPreset.x >= 105 && this.gameObjectPreset.x <= 460 && this.gameObjectPreset.y >= 355 && this.gameObjectPreset.y <= 460) || (this.gameObjectPreset.x >= 615 && this.gameObjectPreset.x <= 970 && this.gameObjectPreset.y >= 355 && this.gameObjectPreset.y <= 460)) {
						this.doublePlayerGroupOnePosition()
					}
					//Group Two
					else if ((this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) || (this.gameObjectPreset.x >= 105 && this.gameObjectPreset.x <= 460 && this.gameObjectPreset.y >= 490 && this.gameObjectPreset.y <= 600) || (this.gameObjectPreset.x >= 615 && this.gameObjectPreset.x <= 970 && this.gameObjectPreset.y >= 490 && this.gameObjectPreset.y <= 600)) {
						this.doublePlayerGroupTwoPosition()
					}
					// skip player
					else if (this.gameObjectPreset.x >= 346 && this.gameObjectPreset.x <= 734 && this.gameObjectPreset.y >= 74 && this.gameObjectPreset.y <= 697) {
						this.skipPlayerPosition()
					}
					//Player Hand Container
					else {
						this.playerHandPosition()
					}
				}
			}
			else if (this.gameObject.scene.oGameManager.phaseRules == 1) {
				console.log("single container phase start");
				if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
					this.putOpenDeckPosition();
				} else if ((this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) || (this.gameObjectPreset.x >= 360 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 380 && this.gameObjectPreset.y <= 490)) {
					this.ruleOneGroupPosition()
				} else if (this.gameObjectPreset.x >= 346 && this.gameObjectPreset.x <= 734 && this.gameObjectPreset.y >= 74 && this.gameObjectPreset.y <= 697) {
					this.skipPlayerPosition()
				} else {
					this.playerHandPosition();
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
			case "opponent2Grp1PhaseCardContainer":
				console.log("group one container");
				this.gameObject.scene.opponent2Grp1PhaseCardContainer.remove(gameObjectPreset);
				break;
			case "opponent2Grp2PhaseCardContainer":
				console.log("group two container");
				this.gameObject.scene.opponent2Grp2PhaseCardContainer.remove(gameObjectPreset);
				break;
			case "opponent3Grp1PhaseCardContainer":
				console.log("group two container");
				this.gameObject.scene.opponent3Grp1PhaseCardContainer.remove(gameObjectPreset);
				break;
			case "opponent3Grp2PhaseCardContainer":
				console.log("group two container");
				this.gameObject.scene.opponent3Grp2PhaseCardContainer.remove(gameObjectPreset);
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
			if(this.gameObject.oScene.oGameManager.isOwnTurn == true){
				if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
					this.setContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : this.opponentGrp1PhaseCardIds, this.lastHitcards, "aGroup-1");
				} else if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
					this.runContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : this.opponentGrp1PhaseCardIds, this.lastHitcards, "aGroup-1");
				} else if (this.gameObject.scene.oGameManager.phaseOneType == "color") {
					this.colorContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer,);
				}
			}
			else{
				this.playerHandPosition();
			}
		}
		console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly);
	}
	groupTwoPosition() {
		if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
			this.ownPly = true;
			this.gameObjectPreset.scene.oGameManager.ownPly = true;
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
			this.gameObjectPreset.scene.oGameManager.opponetPly = true;

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


			if(this.gameObject.oScene.oGameManager.isOwnTurn == true){
				if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
					this.setContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : this.opponentGrp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
				} else if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
					this.runContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : this.opponentGrp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
				} else if (this.gameObject.scene.oGameManager.phaseTwoType == "color") {
					this.colorContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer,);
				}
			}
			else{
				this.playerHandPosition();
			}
		}
		console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly);
	}


	// --------------------------------------------------------------------------------------------------------------------

	// doubl player oppnent players card drag and drop functionality 3 Player join 

	// this.oScene.opponentGrp1PhaseCardContainer,
	// this.oScene.opponentGrp2PhaseCardContainer,
	// this.oScene.opponent2Grp1PhaseCardContainer,
	// this.oScene.opponent2Grp2PhaseCardContainer,
	// this.oScene.opponent3Grp1PhaseCardContainer,
	// this.oScene.opponent3Grp2PhaseCardContainer,



		// this.opponent2Grp1PhaseCardIds = [];
		// this.opponent2Grp2PhaseCardIds = [];
		// this.opponent3Grp1PhaseCardIds = [];
		// this.opponent3Grp2PhaseCardIds = [];
		
	
	doublePlayerGroupOnePosition() {
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

		else if (this.gameObject.scene.isDeclarePhase == true && (this.gameObjectPreset.x >= 105 && this.gameObjectPreset.x <= 460 && this.gameObjectPreset.y >= 355 && this.gameObjectPreset.y <= 460)) {
			this.opponetPly = true;
			this.opponetPlayer2Grp1 = true;
			this.gameObjectPreset.scene.oGameManager.opponetPly = true;
			this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp1 = true;
			this.gameObject.scene.opponent2Grp1PhaseCardContainer.add(this.gameObjectPreset);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.opponent2Grp1PhaseCardContainer);
			this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			for (let i = 0; i < this.gameObject.scene.opponent2Grp1PhaseCardContainer.list.length; i++) {
				this.opponent2Grp1PhaseCardIds.push(this.gameObject.scene.opponent2Grp1PhaseCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards = this.opponent2Grp1PhaseCardIds[this.opponent2Grp1PhaseCardIds.length - 1];
		}
		
		else if (this.gameObject.scene.isDeclarePhase == true && (this.gameObjectPreset.x >= 615 && this.gameObjectPreset.x <= 970 && this.gameObjectPreset.y >= 355 && this.gameObjectPreset.y <= 460)) {
			this.opponetPly = true;
			this.opponetPlayer3Grp1 = true;
			this.gameObjectPreset.scene.oGameManager.opponetPly = true;
			this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp1 = true;
			this.gameObject.scene.opponent3Grp1PhaseCardContainer.add(this.gameObjectPreset);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.opponent3Grp1PhaseCardContainer);
			this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			for (let i = 0; i < this.gameObject.scene.opponent3Grp1PhaseCardContainer.list.length; i++) {
				this.opponent3Grp1PhaseCardIds.push(this.gameObject.scene.opponent3Grp1PhaseCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards = this.opponent3Grp1PhaseCardIds[this.opponent3Grp1PhaseCardIds.length - 1];
		}


		
		if (this.gameObject.scene.isDeclarePhase == true) {
			if(this.gameObject.oScene.oGameManager.isOwnTurn == true){
				if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
					this.setContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : (this.opponetPlayer2Grp1 == true) ? this.gameObject.scene.opponent2Grp1PhaseCardContainer : this.gameObject.scene.opponent3Grp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : (this.opponetPlayer2Grp1 == true) ? this.opponent2Grp1PhaseCardIds : this.opponent3Grp1PhaseCardIds, this.lastHitcards, "aGroup-1");
				} else if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
					this.runContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : (this.opponetPlayer2Grp1 == true) ? this.gameObject.scene.opponent2Grp1PhaseCardContainer : this.gameObject.scene.opponent3Grp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : (this.opponetPlayer2Grp1 == true) ? this.opponent2Grp1PhaseCardIds : this.opponent3Grp1PhaseCardIds, this.lastHitcards, "aGroup-1");
				} else if (this.gameObject.scene.oGameManager.phaseOneType == "color") {
					this.colorContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer,);
				}
			}
			else{
				this.playerHandPosition();
			}
		}
		console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly, "this.opponetPlayer2Grp1", this.opponetPlayer2Grp1);
	}



	
	doublePlayerGroupTwoPosition() {
		// this.opponent2Grp1PhaseCardIds = [];
		// this.opponent2Grp2PhaseCardIds = [];
		// this.opponent3Grp1PhaseCardIds = [];
		// this.opponent3Grp2PhaseCardIds = [];

		if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
			this.ownPly = true;
			this.gameObjectPreset.scene.oGameManager.ownPly = true;
			this.gameObject.scene.doublePhaseTwoCardContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(0.6);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
			for (let i = 0; i < this.gameObject.scene.doublePhaseTwoCardContainer.list.length; i++) {
				this.phaseTwoHitCardIds.push(this.gameObject.scene.doublePhaseTwoCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards1 = this.phaseTwoHitCardIds[this.phaseTwoHitCardIds.length - 1];

		}
		
		else if (this.gameObject.scene.isDeclarePhase == true && (this.gameObjectPreset.x >= 105 && this.gameObjectPreset.x <= 460 && this.gameObjectPreset.y >= 490 && this.gameObjectPreset.y <= 600)) {
			this.opponetPly = true;
			this.opponetPlayer2Grp2 = true;

			this.gameObjectPreset.scene.oGameManager.opponetPly = true;
			this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp2 = true;

			this.gameObject.scene.opponent2Grp2PhaseCardContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.opponent2Grp2PhaseCardContainer);
			
			for (let i = 0; i < this.gameObject.scene.opponent2Grp2PhaseCardContainer.list.length; i++) {
				this.opponent2Grp2PhaseCardIds.push(this.gameObject.scene.opponent2Grp2PhaseCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards1 = this.opponent2Grp2PhaseCardIds[this.opponent2Grp2PhaseCardIds.length - 1];
		}

		else if (this.gameObject.scene.isDeclarePhase == true && (this.gameObjectPreset.x >= 615 && this.gameObjectPreset.x <= 970 && this.gameObjectPreset.y >= 490 && this.gameObjectPreset.y <= 600)) {
			this.opponetPly = true;
			this.opponetPlayer3Grp2 = true;

			this.gameObjectPreset.scene.oGameManager.opponetPly = true;
			this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp2 = true;

			this.gameObject.scene.opponent3Grp2PhaseCardContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.opponent3Grp2PhaseCardContainer);
			for (let i = 0; i < this.gameObject.scene.opponent3Grp2PhaseCardContainer.list.length; i++) {
				this.opponent3Grp2PhaseCardIds.push(this.gameObject.scene.opponent3Grp2PhaseCardContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards1 = this.opponent3Grp2PhaseCardIds[this.opponent3Grp2PhaseCardIds.length - 1];
		}





		if (this.gameObject.scene.isDeclarePhase == true) {
			if(this.gameObject.oScene.oGameManager.isOwnTurn == true){
				if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
					this.setContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : (this.opponetPlayer2Grp2 == true) ? this.gameObject.scene.opponent2Grp2PhaseCardContainer : this.gameObject.scene.opponent3Grp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : (this.opponetPlayer2Grp2 == true) ? this.opponent2Grp2PhaseCardIds : this.opponent3Grp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
				} else if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
					this.runContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : (this.opponetPlayer2Grp2 == true) ? this.gameObject.scene.opponent2Grp2PhaseCardContainer : this.gameObject.scene.opponent3Grp2PhaseCardContainer, (this.ownPly == true) ? this.phaseTwoHitCardIds : (this.opponetPlayer2Grp2 == true) ? this.opponent2Grp2PhaseCardIds : this.opponent3Grp2PhaseCardIds, this.lastHitcards1, "aGroup-2");
				} else if (this.gameObject.scene.oGameManager.phaseTwoType == "color") {
					this.colorContition((this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer,);
				}
			}
			else{
				this.playerHandPosition();
			}
		}
		console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly, "this.opponetPlayer2Grp2", this.opponetPlayer2Grp2);
	}
	// --------------------------------------------------------------------------------------------------------------------

	playerHandPosition() {
		this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
		this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
		this.gameObjectPreset.setScale(1);
		this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseOneCardContainer);
		this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.doublePhaseTwoCardContainer);
		// this.gameObject.scene.oPlayerHand.sendChangeGroupDefault(this.cardId);
	}
	ruleOneGroupPosition() {
		if (this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
			this.ownPly = true;
			// this.gameObject.scene.oGameManager.onePhaseContainer = true
			this.gameObjectPreset.scene.oGameManager.ownPly = true;
			this.gameObject.scene.singlePhaseOneContainer.add(this.gameObjectPreset);
			this.gameObject.scene.oRuleset.validateRuleset(this.gameObject.scene.singlePhaseOneContainer);
			this.gameObjectPreset.setScale(0.7);
			this.gameObjectPreset.setPosition(0,0);
			for (let i = 0; i < this.gameObject.scene.singlePhaseOneContainer.list.length; i++) {
				this.phaseOneHitCardIds.push(this.gameObject.scene.singlePhaseOneContainer.list[i].__CardPreset.cardId);
			}
			this.lastHitcards = this.phaseOneHitCardIds[this.phaseOneHitCardIds.length - 1];
		}
		else if (this.gameObject.scene.isDeclarePhase == true && this.gameObjectPreset.x >= 360 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 380 && this.gameObjectPreset.y <= 490) {
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
				this.setContition((this.ownPly == true) ? this.gameObject.scene.singlePhaseOneContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : this.opponentGrp1PhaseCardIds, this.lastHitcards, "aGroup-1");
			} else if (this.gameObject.scene.oGameManager.phaseOneType == "RUN") {
				this.runContition((this.ownPly == true) ? this.gameObject.scene.singlePhaseOneContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer, (this.ownPly == true) ? this.phaseOneHitCardIds : this.opponentGrp1PhaseCardIds, this.lastHitcards, "aGroup-1");
			} else if (this.gameObject.scene.oGameManager.phaseOneType == "color") {
				this.colorContition((this.ownPly == true) ? this.gameObject.scene.singlePhaseOneContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer,);
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
	checkOpponentMatchContainer(opponentContainer1, opponentContainer2, nMaxPlayers) {
		if (this.gameObjectPreset.scene.opponentGrp1PhaseCardContainer.name == "opponentGrp1PhaseCardContainer" || this.gameObjectPreset.scene.opponent2Grp1PhaseCardContainer.name == "opponent2Grp1PhaseCardContainer" || this.gameObjectPreset.scene.opponent3Grp1PhaseCardContainer.name == "opponent3Grp1PhaseCardContainer") {
			let cardContTwoArray = [];
			if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
				for (let i = 0; i < opponentContainer1.length; i++) {
					if (this.currentOwnCardLabel == opponentContainer1[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
						console.log("visible");
						(nMaxPlayers == 2) ? this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(true) : (this.gameObjectPreset.scene.opponent2Grp1PhaseCardContainer.name == "opponent2Grp1PhaseCardContainer") ? this.gameObject.scene.yellow_ring_opponentGrp_21.setVisible(true) :  this.gameObject.scene.yellow_ring_opponentGrp_31.setVisible(true);
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
					console.log("visible");
					(nMaxPlayers == 2) ? this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(true) : (this.gameObjectPreset.scene.opponent2Grp1PhaseCardContainer.name == "opponent2Grp1PhaseCardContainer") ? this.gameObject.scene.yellow_ring_opponentGrp_21.setVisible(true) :  this.gameObject.scene.yellow_ring_opponentGrp_31.setVisible(true);
					// this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(true);
				}
				
			}
		}
		if (this.gameObjectPreset.scene.opponentGrp2PhaseCardContainer.name == "opponentGrp2PhaseCardContainer" || this.gameObjectPreset.scene.opponent2Grp2PhaseCardContainer.name == "opponent2Grp2PhaseCardContainer" || this.gameObjectPreset.scene.opponent3Grp2PhaseCardContainer.name == "opponent3Grp2PhaseCardContainer") {
			let cardContTwoArray = [];
			if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
				for (let i = 0; i < opponentContainer2.length; i++) {
					if (this.currentOwnCardLabel == opponentContainer2[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
						console.log("visible");
						(nMaxPlayers == 2) ? this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(true) : (this.gameObjectPreset.scene.opponent2Grp2PhaseCardContainer.name == "opponent2Grp2PhaseCardContainer") ? this.gameObject.scene.yellow_ring_opponentGrp_22.setVisible(true) :  this.gameObject.scene.yellow_ring_opponentGrp_32.setVisible(true);
						// this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(true);
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
					console.log("visible");
					(nMaxPlayers == 2) ? this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(true) : (this.gameObjectPreset.scene.opponent2Grp2PhaseCardContainer.name == "opponent2Grp2PhaseCardContainer") ? this.gameObject.scene.yellow_ring_opponentGrp_22.setVisible(true) :  this.gameObject.scene.yellow_ring_opponentGrp_32.setVisible(true);
					// this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(true);
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
		console.log("groupContainer", groupContainer);
		for (let i = 0; i < groupContainer.list.length - 1; i++) {
			if (this.currentOwnCardLabel === groupContainer.list[i].__CardPreset.cardNumber) {
				console.log(this.currentOwnCardLabel, "===", groupContainer.list[i].__CardPreset.cardNumber);
				console.log("match the data");
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
				console.log("Play for the own player");
				this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
			}
			else {
				console.log("Play for the not own player");
				// thirdPlayerId
				if(this.gameObject.scene.nMaxPlayer == 3){
					if(this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp1 == true || this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp2 == true){
						this.gameObjectPreset.scene.oGameManager.whichPlayer = 2;
					}else if(this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp1 == true || this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp2 == true){
						this.gameObjectPreset.scene.oGameManager.whichPlayer = 3;
					}
				}
				// console.log(this.gameObjectPreset.scene.oPlayerManager.secondPlayerId, this.gameObjectPreset.scene.oPlayerManager.thirdPlayerId, this.gameObjectPreset.scene.oPlayerManager.iOwnPlayerId);

				this.gameObject.scene.sendOpponentHitCards(phaseHitCardIds, lastHitcard, grp, this.gameObjectPreset);

			}
		} else {
			console.log("all are not done to work it");
			this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
			this.gameObjectPreset.setScale(1);
			this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
		}
		// compounding
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
			(this.ownPly == true) ? this.gameObjectPreset.setScale(0.6) : this.gameObjectPreset.setScale(0.5);
			this.gameObjectPreset.setPosition(0, 0);
			if (this.ownPly == true) {
				console.log("Play for the own player");
				this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
			}
			else {
				console.log("Play for the not own player");
				this.gameObject.scene.sendOpponentHitCards(phaseHitCardIds, lastHitcard, grp, this.gameObjectPreset);
			}
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
