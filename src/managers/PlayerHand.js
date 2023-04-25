class PlayerHand {
    constructor(oScene) {
        this.oScene = oScene;
        this.playerCard = [];
        this.playerCardCounter = 0;
    }

    getHandData(data) {
        for (var i = 0; i <= 9; i++) {
            if (data.oData[i].nLabel <= 12) {
                this.setPlayerHand(data.oData[i].nLabel, data.oData[i].eColor, data.oData[i]._id);
            }
            else {
                this.setPlayerHand(data.oData[i].eColor, data.oData[i]._id);
            }
        }
    }

    getNewCardData(data) {
        if (data.nLabel <= 12) {
            this.setPlayerHand(data.nLabel, data.eColor, data._id);
        }
        else {
            this.setPlayerHand(data.eColor, data._id);
        }
    }

    setPlayerHand(...args) {
        this.playerCard[this.playerCardCounter] = new CardPrefab(this.oScene, 0, 0);
        this.oScene.playerHandContainer.add(this.playerCard[this.playerCardCounter]);
        if (arguments.length == 2) {
            // Special Cards - cardName, cardId
            this.playerCard[this.playerCardCounter].checkCardInformation(args[0], args[1]);
            this.playerCard[this.playerCardCounter].__CardPreset.cardNumber = args[0];
            this.playerCard[this.playerCardCounter].__CardPreset.cardId = args[1];
        }
        else {
            // Normal Cards - cardNumber, cardColor, cardId
            this.playerCard[this.playerCardCounter].checkCardInformation(args[0], args[1], args[2]);
            this.playerCard[this.playerCardCounter].__CardPreset.cardNumber = args[0];
            this.playerCard[this.playerCardCounter].__CardPreset.cardColor = args[1];
            this.playerCard[this.playerCardCounter].__CardPreset.cardId = args[2];
        }
        this.playerCardCounter++;
        this.arrangePlayerHandCards();
    }
    clearPlayerHandCard() {
        this.playerCardCounter = 0;
        this.oScene.playerHandContainer.remove(this.playerCard[this.playerCardCounter]);
    }

    arrangePlayerHandCards() {
        let lengthOfHand = this.oScene.playerHandContainer.getAll().length;
        let centerGap = 0;
        let cardGap = 60;
        if (Number.isInteger(lengthOfHand) && !isNaN(lengthOfHand)) {
            centerGap = cardGap / 2;
        }
        let nFirstCardPosition = ((lengthOfHand / 2) - 1) * -cardGap;
        this.oScene.playerHandContainer.getAll().forEach(card => {
            card.setPosition(nFirstCardPosition - centerGap, 0);
            nFirstCardPosition += cardGap;
        });
        this.oScene.phaseContainerOne.getCardGroupChildren();
        this.oScene.phaseContainerTwo.getCardGroupChildren();
    }

    // arrangeOpponentPlayerPhaseCards(data) {
    //     let target
    //     if (data.sGroup === "aGroup-1") {
    //         target = this.oScene.opponentGrp1PhaseCardContainer
    //     }
    //     else if (data.sGroup === "aGroup-2") {
    //         target = this.oScene.opponentGrp2PhaseCardContainer
    //     }
    //     let lengthOfHand = target.getAll().length;
    //     let centerGap = 0;
    //     let cardGap = 60;
    //     if (Number.isInteger(lengthOfHand) && !isNaN(lengthOfHand)) {
    //         centerGap = cardGap / 2;
    //     }
    //     let nFirstCardPosition = ((lengthOfHand / 2) - 1) * -cardGap;
    //     target.getAll().forEach(card => {
    //         card.setPosition(nFirstCardPosition - centerGap, 0);
    //         nFirstCardPosition += cardGap;
    //     });
    //     this.oScene.opponentPhaseContainerOne.getCardGroupChildren();
    //     this.oScene.opponentPhaseContainerTwo.getCardGroupChildren();
    // }

    arrangePlayerHighCards(data) {
        let tempCardPosX = 0;
        let tempCardPosY = 0;

        for (var i = 0; i < data.length; i++) {
            if (this.oScene.ownPlayerId == data[i].iUserId) {
                tempCardPosX = 540;
                tempCardPosY = 1550;
            }
            else {
                tempCardPosX = 540;
                tempCardPosY = 875;
            }
            this.distributeHighCards(data[i], tempCardPosX, tempCardPosY);
        }
    }

    distributeHighCards(cardData, xPos, yPos) {
        var tempCard = new CardPrefab(this.oScene, 540, 875);
        tempCard.disableInteractive();
        tempCard.setName(cardData.iUserId);
        this.oScene.tempCardContainer.add(tempCard);
        tempCard.checkCardInformation(cardData.card.nLabel, cardData.card.eColor, cardData.card._id);
        tempCard.checkHighCard(cardData.isHigh);
        if (this.oScene.ownPlayerId == tempCard.name) {
            this.oScene.oTweenManager.startHighCardsDistribution(tempCard, xPos, yPos);
        }
    }


    receiveOpenedDeckCard(data) {
        if (data.aOpenDeck[data.aOpenDeck.length - 1].nLabel <= 12) {
            this.setDiscardDeck(data.aOpenDeck[data.aOpenDeck.length - 1].nLabel, data.aOpenDeck[data.aOpenDeck.length - 1].eColor, data.aOpenDeck[data.aOpenDeck.length - 1]._id);
        }
        else {
            this.setDiscardDeck(data.aOpenDeck[data.aOpenDeck.length - 1].eColor, data.aOpenDeck[data.aOpenDeck.length - 1]._id);
        }
    }

    setDiscardDeck(...args) {
        this.discardCard = new CardPrefab(this.oScene, 0, 0);
        this.oScene.discardDeckContainer.add(this.discardCard);
        this.discardCard.setPosition(this.oScene.openedCardDeck.x, this.oScene.openedCardDeck.y);
        if (arguments.length == 2) {
            this.discardCard.checkCardInformation(args[0], args[1]);
        }
        else {
            this.discardCard.checkCardInformation(args[0], args[1], args[2]);
        }
    }

    sendChangeGroupDefault(cardId) {
        console.log("Group - 0 :: ", cardId);
        this.oScene.oSocketManager.emit('reqChangeGroup', [{ iCardId: cardId, nGroupId: 0 }], (error, response) => {
            console.log("reqChangeGroup :: ", response, error);
        });
    }

    sendChangeGroupOne(cardId) {
        console.log("Group - 1 :: ", cardId);
        this.oScene.oSocketManager.emit('reqChangeGroup', [{ iCardId: cardId, nGroupId: 1 }], (error, response) => {
            console.log("reqChangeGroup :: ", response, error);
        });
    }

    sendChangeGroupTwo(cardId) {
        console.log("Group - 2 :: ", cardId);
        this.oScene.oSocketManager.emit('reqChangeGroup', [{ iCardId: cardId, nGroupId: 2 }], (error, response) => {
            console.log("reqChangeGroup :: ", response, error);
        });
    }
}