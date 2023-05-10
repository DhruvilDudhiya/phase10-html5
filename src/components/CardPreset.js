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
        this.checkMatchContainer(
          this.gameObject.scene.doublePhaseOneCardContainer.list,
          this.gameObject.scene.doublePhaseTwoCardContainer.list,
          this.gameObjectPreset.scene.opponentGrp1PhaseCardContainer.list,
          this.gameObjectPreset.scene.opponentGrp2PhaseCardContainer.list
        );
      }
      let parentContainerName = this.gameObjectPreset.parentContainer.name;
      this.handleParentContainerOperations(
        parentContainerName,
        this.gameObjectPreset
      );
      this.gameObjectPreset.x = pointer.x;
      this.gameObjectPreset.y = pointer.y;
    });
    this.gameObjectPreset.on(
      "pointerup",
      () => {
        if (this.gameObject.scene.isDeclarePhase == true) {
          this.gameObject.scene.dp_yellow_ring_1.setVisible(false);
          this.gameObject.scene.dp_yellow_ring_2.setVisible(false);
          this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(false);
          this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(false);
        }
      },
      this
    );

    this.gameObjectPreset.on("drag", (pointer, dragX, dragY) => {
      // console.log(" drag ++++++++++++++>",this.gameObject.scene.oGameManager.isGrabCard);

      this.gameObjectPreset.x = pointer.x;
      this.gameObjectPreset.y = pointer.y;
      // console.log("hhh",this.gameObjectPreset.x, this.gameObjectPreset.y)
    });

    this.gameObjectPreset.on("dragend", (pointer, dragX, dragY) => {
      this.gameObjectPreset.x = pointer.x - dragX;
      this.gameObjectPreset.y = pointer.y - dragY;

      this.ownPly = false;
      this.opponetPly = false;

      if (
        this.gameObject.scene.nMaxPlayer == 3 ||
        this.gameObject.scene.nMaxPlayer == 2
      ) {
        //Opened Card Deck
        // Put card in openDeck
        if (this.gameObjectPreset.x >= 350 && this.gameObjectPreset.x <= 500 && this.gameObjectPreset.y >= 750 && this.gameObjectPreset.y <= 1000) {
          if (
            this.gameObject.scene.oGameManager.isOwnTurn == true &&
            this.gameObject.scene.oGameManager.isGrabCard == true
          ) {
            // console.log("dragend ++++++++++++++>",this.gameObject.scene.oGameManager.isGrabCard);

            this.gameObjectPreset.setPosition(
              this.gameObject.scene.openedCardDeck.x,
              this.gameObject.scene.openedCardDeck.y
            );
            // this.gameObject.scene.discardDeckContainer.add(this.gameObjectPreset);
            this.gameObjectPreset.setVisible(false);
            this.sendDiscardCard(this.cardId);
          } else {
            console.log("this.lastPosX",this.gameObjectPreset.x,"this.lastPosY",this.gameObjectPreset.y);
            this.gameObjectPreset.setPosition(
              parseFloat(this.gameObjectPreset.x),
              parseFloat(this.gameObjectPreset.y)
            );
            this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
            this.gameObjectPreset.setScale(1);
          }
        }
        //Group One
        else if ((this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) || (this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 350 && this.gameObjectPreset.y <= 470)) {

          if (this.gameObjectPreset.x >= 60 && this.gameObjectPreset.x <= 515 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
            this.ownPly = true;

            this.gameObject.scene.doublePhaseOneCardContainer.add(
              this.gameObjectPreset
            );
            this.gameObject.scene.oRuleset.validateRuleset(
              this.gameObject.scene.doublePhaseOneCardContainer
            );
            this.gameObjectPreset.setScale(0.6);
            this.gameObjectPreset.setPosition(0, 0);
            for (
              let i = 0;
              i < this.gameObject.scene.doublePhaseOneCardContainer.list.length;
              i++
            ) {
              this.phaseOneHitCardIds.push(
                this.gameObject.scene.doublePhaseOneCardContainer.list[i]
                  .__CardPreset.cardId
              );
            }
            this.lastHitcards = this.phaseOneHitCardIds[this.phaseOneHitCardIds.length - 1];
          }

          else if(this.gameObject.scene.isDeclarePhase == true && this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 350 && this.gameObjectPreset.y <= 470){
            this.opponetPly = true;

            this.gameObject.scene.opponentGrp1PhaseCardContainer.add(
              this.gameObjectPreset
            );
            this.gameObject.scene.oRuleset.validateRuleset(
              this.gameObject.scene.opponentGrp1PhaseCardContainer
            );
            this.gameObjectPreset.setScale(0.5);
            this.gameObjectPreset.setPosition(0, 0);
            for (let i = 0; i < this.gameObject.scene.opponentGrp1PhaseCardContainer.list.length; i++) {
              this.opponentGrp1PhaseCardIds.push(this.gameObject.scene.opponentGrp1PhaseCardContainer.list[i].__CardPreset.cardId);
            }
            this.lastHitcards = this.opponentGrp1PhaseCardIds[this.opponentGrp1PhaseCardIds.length - 1];

          }


          if (this.gameObject.scene.isDeclarePhase == true) {
            if (this.gameObject.scene.oGameManager.phaseOneType == "SET") {
              console.log("phaseOne", this.ownPly);
              this.setContition(
                (this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer,
                (this.ownPly == true) ? this.phaseOneHitCardIds : this.opponentGrp1PhaseCardIds,
                this.lastHitcards,
                "aGroup-1"
              );
            } else if (
              this.gameObject.scene.oGameManager.phaseOneType == "RUN"
            ) {
              this.runContition(
                // this.gameObject.scene.doublePhaseOneCardContainer
                (this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer,
              );
            } else if (
              this.gameObject.scene.oGameManager.phaseOneType == "color"
            ) {
              this.colorContition(
                // this.gameObject.scene.doublePhaseOneCardContainer
                (this.ownPly == true) ? this.gameObject.scene.doublePhaseOneCardContainer : this.gameObject.scene.opponentGrp1PhaseCardContainer,
              );
            }
          }
          console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly);


        }
        //Group Two
        else if ((this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) || (this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 485 && this.gameObjectPreset.y <= 605)) {

          if (this.gameObjectPreset.x >= 565 && this.gameObjectPreset.x <= 1020 && this.gameObjectPreset.y >= 1105 && this.gameObjectPreset.y <= 1305) {
            this.ownPly = true;
            
            this.gameObject.scene.doublePhaseTwoCardContainer.add(
              this.gameObjectPreset
            );
            this.gameObjectPreset.setScale(0.6);
            this.gameObjectPreset.setPosition(0, 0);
            this.gameObject.scene.oRuleset.validateRuleset(
              this.gameObject.scene.doublePhaseTwoCardContainer
            );
            for (
              let i = 0;
              i < this.gameObject.scene.doublePhaseTwoCardContainer.list.length;
              i++
            ) {
              this.phaseTwoHitCardIds.push(
                this.gameObject.scene.doublePhaseTwoCardContainer.list[i]
                  .__CardPreset.cardId
              );
            }
            this.lastHitcards1 = this.phaseTwoHitCardIds[this.phaseTwoHitCardIds.length - 1];

          } else if (this.gameObject.scene.isDeclarePhase == true && this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x <= 720 && this.gameObjectPreset.y >= 485 && this.gameObjectPreset.y <= 605){
            this.opponetPly = true;

            this.gameObject.scene.opponentGrp2PhaseCardContainer.add(
              this.gameObjectPreset
            );
            this.gameObjectPreset.setScale(0.5);
            this.gameObjectPreset.setPosition(0, 0);
            this.gameObject.scene.oRuleset.validateRuleset(
              this.gameObject.scene.opponentGrp2PhaseCardContainer
            );
            for (let i = 0; i < this.gameObject.scene.opponentGrp2PhaseCardContainer.list.length; i++) {
              this.opponentGrp2PhaseCardIds.push(
                this.gameObject.scene.opponentGrp2PhaseCardContainer.list[i]
                  .__CardPreset.cardId
              );
            }
            this.lastHitcards1 = this.opponentGrp2PhaseCardIds[this.opponentGrp2PhaseCardIds.length - 1];

          }


          if (this.gameObject.scene.isDeclarePhase == true) {
            if (this.gameObject.scene.oGameManager.phaseTwoType == "SET") {
              console.log("phaseTwo", this.ownPly);

              this.setContition(
                (this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer,
                (this.ownPly == true) ? this.phaseTwoHitCardIds : this.opponentGrp2PhaseCardIds,
                this.lastHitcards1,
                "aGroup-2"
              );
            } else if (this.gameObject.scene.oGameManager.phaseTwoType == "RUN") {
              this.runContition(
                (this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer,
              );
            } else if (
              this.gameObject.scene.oGameManager.phaseTwoType == "color"
            ) {
              this.colorContition(
                (this.ownPly == true) ? this.gameObject.scene.doublePhaseTwoCardContainer : this.gameObject.scene.opponentGrp2PhaseCardContainer,
              );
            }
          }
          console.log("this.ownPly", this.ownPly, "this.opponetPly", this.opponetPly);
        }
       
        // skip player
        else if (this.gameObjectPreset.x >= 346 && this.gameObjectPreset.x <= 734 && this.gameObjectPreset.y >= 74 && this.gameObjectPreset.y <= 697 ) {
          if (this.gameObject.__CardPreset.cardNumber === "s") {
            this.gameObject.scene.oRuleset.validateSkipCard(this.gameObject);
          } else {
            this.gameObjectPreset.setPosition(
              parseFloat(this.lastPosX),
              parseFloat(this.lastPosY)
            );
            this.gameObject.scene.playerHandContainer.add(
              this.gameObjectPreset
            );
            this.gameObjectPreset.setScale(1);
          }
        }
        // }
        //Player Hand Container
        else {
          this.gameObjectPreset.setPosition(
            parseFloat(this.lastPosX),
            parseFloat(this.lastPosY)
          );
          this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
          this.gameObjectPreset.setScale(1);
          this.gameObject.scene.oRuleset.validateRuleset(
            this.gameObject.scene.doublePhaseOneCardContainer
          );
          this.gameObject.scene.oRuleset.validateRuleset(
            this.gameObject.scene.doublePhaseTwoCardContainer
          );
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
    console.log("remove the card data in container -=-=--=-=--=-=-=>>>>> ", gameObjectPreset, "parentContainerName", parentContainerName);
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

  checkMatchContainer(containerOne, containerTwo, opponentContainer1, opponentContainer2) {
    this.posX = this.gameObject.x;
    this.posY = this.gameObject.y;
    for (let i = 0; i < containerOne.length; i++) {
      if (
        this.currentOwnCardLabel === containerOne[i].__CardPreset.cardNumber ||
        this.currentOwnCardLabel === "w"
      ) {
        this.gameObject.scene.dp_yellow_ring_1.setVisible(true);
        //Handle the Ring Visibility and allow the card to be dragged their
      } else {
        this.gameObject.x = this.posX;
        this.gameObject.y = this.posY;
      }
    }

    for (let i = 0; i < containerTwo.length; i++) {
      if (
        this.currentOwnCardLabel === containerTwo[i].__CardPreset.cardNumber ||
        this.currentOwnCardLabel === "w"
      ) {
        this.gameObject.scene.dp_yellow_ring_2.setVisible(true);
        //Handle the Ring Visibility and allow the card to be dragged their
      } else {
        this.gameObject.x = this.posX;
        this.gameObject.y = this.posY;
      }
    }

    for (let i = 0; i < opponentContainer1.length; i++) {
      if (this.currentOwnCardLabel === opponentContainer1[i].__CardPreset.cardNumber || this.currentOwnCardLabel === "w") {
        this.gameObject.scene.yellow_ring_opponentGrp1.setVisible(true);
        //Handle the Ring Visibility and allow the card to be dragged their
      } else {
        this.gameObject.x = this.posX;
        this.gameObject.y = this.posY;
      }
    }

    for (let i = 0; i < opponentContainer2.length; i++) {
      if (
        this.currentOwnCardLabel ===
        opponentContainer2[i].__CardPreset.cardNumber ||
        this.currentOwnCardLabel === "w"
      ) {
        this.gameObject.scene.yellow_ring_opponentGrp2.setVisible(true);
        //Handle the Ring Visibility and allow the card to be dragged their
      } else {
        this.gameObject.x = this.posX;
        this.gameObject.y = this.posY;
      }
    }
  }
  static clearAllPhaseCards() {
    this.gameObject.scene.doublePhaseOneCardContainer.remove(gameObjectPreset);
    this.gameObject.scene.doublePhaseTwoCardContainer.remove(gameObjectPreset);
  }

  setContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {

    let tempMatch = false;
    for(let i = 0; i < groupContainer.list.length; i++) {
      if(this.currentOwnCardLabel === groupContainer.list[i].__CardPreset.cardNumber){
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
      if(this.ownPly == true){
        this.gameObject.scene.sendHitCards(phaseHitCardIds, lastHitcard, grp);
      }
      else{
        let rtn = this.gameObject.scene.sendOpponentHitCards(phaseHitCardIds, lastHitcard, grp);
        if(rtn == true){
          this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
        }

      }
    } else {
      console.log("all are not done to work it");
      this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);
      this.gameObjectPreset.setScale(1);
      this.gameObjectPreset.setPosition(
        parseFloat(this.lastPosX),
        parseFloat(this.lastPosY)
      );
    }
  }
  
  runContition(groupContainer, phaseHitCardIds, lastHitcard, grp) {
    let tempFilter = [];
    tempFilter = groupContainer.list.forEach((element) => {
      if (element.__CardPreset.cardNumber != "w") {
        return element.__CardPreset.cardNumber;
      }
    });

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
      // response null and error arrCard
      (response, error) => {
        console.log("response", response, "error", error);
        if (response != null && response.message == "grab card first") {
          this.gameObject.scene.playerHandContainer.add(this.gameObjectPreset);

          this.gameObjectPreset.setPosition(parseFloat(this.lastPosX), parseFloat(this.lastPosY));
          this.gameObjectPreset.setScale(1);
          this.gameObject.scene.oPlayerHand.arrangePlayerHandCards();
        } else {
          // console.log("{}{}{}{}{{}{}{}{}{_+_+_{P_+)+");
          // this.gameObject.scene.playerHandContainer.removeAll(true);
          // this.gameObject.scene.oPlayerHand.getHandData(error);
          // console.log(error, this.gameObject.scene.oPlayerHand);
          console.log("oplayer manger", error);
        }
      }
    );
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here



 //set hit card
        // else if(this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x<= 720 && this.gameObjectPreset.scene.opponentGrp1PhaseCardContainer.y >= 350 && this.gameObjectPreset.scene.opponentGrp1PhaseCardContainer.y <= 470) {
        // 	if(this.gameObject.scene.nMaxPlayer == 2){
        // 		for (var i = 0; i < this.gameObject.scene.opponentGrp1PhaseCardContainer.list.length; i++) {
        // 			this.opponentContainer1CardIds.push(this.gameObject.scene.opponentGrp1PhaseCardContainer.list[i].__CardPreset.cardId);
        // 		}
        // 		this.lastOwnHitCard = this.opponentContainer1CardIds[this.opponentContainer1CardIds - 1 ];
        // 		if (this.gameObject.scene.isDeclarePhase == true){

        // 		} 
        // 		// let hitCardData = []
        // 		// for (let i = 0; i < this.gameObject.scene.opponentGrp1PhaseCardContainer.list.length; i++) {
        // 		// 	hitCardData.push(this.gameObject.scene.opponentGrp1PhaseCardContainer.list[i].__CardPreset.cardId);
        // 		// }
        // 		// let lastHitCardData = this.currentOwnCardId;
        // 		// console.log("opponentGrp1PhaseCardContainer",hitCardData,lastHitCardData);
        // 		// console.log("this.currentOwnCardId",this.currentOwnCardId);
        // 		// this.gameObject.scene.sendOpponentHitCards(hitCardData,lastHitCardData,'aGroup-1');
        // 	}
        // }
        // else if(this.gameObjectPreset.x >= 363 && this.gameObjectPreset.x<= 720 && this.gameObjectPreset.scene.opponentGrp2PhaseCardContainer.y>=485 && this.gameObjectPreset.scene.opponentGrp2PhaseCardContainer.y<= 605){
        // 	if(this.gameObject.scene.nMaxPlayer == 2){
        // 		let hitCardData = []
        // 		for (let i = 0; i < this.gameObject.scene.opponentGrp2PhaseCardContainer.list.length; i++) {
        // 			hitCardData.push(this.gameObject.scene.opponentGrp2PhaseCardContainer.list[i].__CardPreset.cardId);
        // 		}
        // 		let lastHitCardData = this.currentOwnCardId;
        // 		console.log("opponentGrp2PhaseCardContainer",hitCardData,lastHitCardData);
        // 		this.gameObject.scene.sendOpponentHitCards(hitCardData,lastHitCardData,'aGroup-2');
        // 	}
        // }