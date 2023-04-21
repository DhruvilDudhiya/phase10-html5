class PlayerManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.players = new Map();
        this.isOwnTurn = null;

        this.oScene.cancelButton.setInteractive().on('pointerdown', () => {
            console.log("Cancel Button Clicked");
        });
    }

    addPlayer(playerId, player) {
        this.players.set(playerId, player);
    }

    removePlayer(playerId) {
        this.players.delete(playerId);
    }

    getPlayer(playerId) {
        return this.players.get(playerId);
    }

    getPlayerCount() {
        return this.players.size;
    }

    setUsersData(data, rootSocketId) {
        if (!this.players.has(data.iUserId)) {
            this.addPlayer(data.nSeat, data.iUserId);
            this.setUserInfo(data, rootSocketId);
        }
    }
    setHandData(data) {
        console.log("ownPlayerHand", data);
        this.oScene.playerHandContainer.setVisible(true);
        if (data.length != 0) {
            this.oScene.oTweenManager.startDeckDiscardSeparation();
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i].nLabel <= 12) {
                this.oScene.oPlayerHand.setPlayerHand(data[i].nLabel, data[i].eColor, data[i]._id);
            }
            else {
                this.oScene.oPlayerHand.setPlayerHand(data[i].eColor, data[i]._id);
            }
        }
    }
    setGrup1CurrentData(data) {
        var startX = -40;
        this.cardInfo = data.oCurrentPhase["aGroup-1"]
        console.log(this.cardInfo.length);
        if (data.iUserId == this.oScene.ownPlayerId) {
            if (data.oCurrentPhase["aGroup-1"][0] == undefined) {
            } else {
                for (var i = 0; i < data.oCurrentPhase["aGroup-1"].length; i++) {
                    this.phaseGrp1Cards = new CardPrefab(this.oScene, startX, 0);
                    this.phaseGrp1Cards.setScale(0.6)
                    this.oScene.doublePhaseOneCardContainer.add(this.phaseGrp1Cards);
                    if (this.cardInfo[i].nLabel <= 12) {
                        this.phaseGrp1Cards.checkCardInformation(this.cardInfo[i].nLabel, this.cardInfo[i].eColor, this.cardInfo[i]._id);
                    } else {
                        this.phaseGrp1Cards.checkCardInformation(this.cardInfo[i].eColor, this.cardInfo[i]._id);
                    }
                    startX += 50
                }
            }

        }
    }
    setGrup2CurrentData(data) {
        var startX = -40;
        this.cardInfo = data.oCurrentPhase["aGroup-2"]
        if (data.iUserId == this.oScene.ownPlayerId) {
            if (data.oCurrentPhase["aGroup-2"][0] == undefined) {
            } else {
                for (var i = 0; i < data.oCurrentPhase["aGroup-2"].length; i++) {
                    this.phaseGrp2Cards = new CardPrefab(this.oScene, startX, 0);
                    this.phaseGrp2Cards.setScale(0.6)
                    this.oScene.doublePhaseTwoCardContainer.add(this.phaseGrp2Cards);
                    if (this.cardInfo[i].nLabel <= 12) {
                        this.phaseGrp2Cards.checkCardInformation(this.cardInfo[i].nLabel, this.cardInfo[i].eColor, this.cardInfo[i]._id);
                    } else {
                        this.phaseGrp2Cards.checkCardInformation(this.cardInfo[i].eColor, this.cardInfo[i]._id);
                    }
                    startX += 50
                }
            }

        }
    }

    setUserInfo(playerData, rootSocketId) {
        if (rootSocketId == playerData.sRootSocket) {
            this.oScene.ownPlayerId = playerData.iUserId;
            this.ownPlayerPrefab = new PlayerPrefab(this.oScene);
            this.ownPlayerPrefab.setName(playerData.iUserId);
            this.ownPlayerPrefab.setPosition(540, 1750);
            this.oScene.playersContainer.add(this.ownPlayerPrefab);
        }
        else {
            if (this.oScene.nMaxPlayer == 2) {
                this.oScene.secondPlayerUserNameText.setText(playerData.sUserName);
                this.oppPlayerPrefab = new PlayerPrefab(this.oScene);
                this.oppPlayerPrefab.setName(playerData.iUserId);
                this.oppPlayerPrefab.setPosition(480, 170);
                this.oScene.playersContainer.add(this.oppPlayerPrefab);
            }
        }
    }
    // resGameState(oGameData){

    // }

    changePlayerTurn(playerTurnData) {
        this.currentPlayerTurn = playerTurnData.iUserId;
        if (playerTurnData.iUserId == this.oScene.ownPlayerId) {
            this.isOwnTurn = true;
            console.log("ownPlayerturn", this.isOwnTurn)
        } else {
            this.isOwnTurn = false;
            // this.oScene.confirmButton.setAlpha(0.75);
            // this.oScene.confirmButton.disableInteractive();
        }
        for (var i = 0; i < this.oScene.playersContainer.length; i++) {
            if (this.oScene.playersContainer.getAll()[i].name.includes(this.currentPlayerTurn)) {
                this.oScene.playersContainer.getAll()[i + 1].intervalTimeReset();
                this.oScene.playersContainer.getAll()[i].startTimerInit(this.oScene.playersContainer.getAll()[i].x, this.oScene.playersContainer.getAll()[i].y, playerTurnData.ttl);
                break;
            }
            else {
                this.oScene.playersContainer.getAll()[i].intervalTimeReset();
                this.oScene.playersContainer.getAll()[i + 1].startTimerInit(this.oScene.playersContainer.getAll()[i + 1].x, this.oScene.playersContainer.getAll()[i + 1].y, playerTurnData.ttl);
                break;
            }
        }
    }

    handleDeclareButtonsVisibilityON() {
        this.oScene.confirmButton.setVisible(true);
        this.oScene.cancelButton.setVisible(true);
    }
    
    handleDeclareButtonsVisibilityOFF() {
        this.oScene.confirmButton.setVisible(false);
        this.oScene.cancelButton.setVisible(false);
    }

    handleRingsVisibilityOFF() {
        this.oScene.dp_yellow_ring_1.setVisible(false);
        this.oScene.dp_yellow_ring_2.setVisible(false);
    }

    handleDeclareButtons() {
        if (this.oScene.dp_yellow_ring_1.visible == false && this.oScene.dp_yellow_ring_2.visible == false) {
            this.handleDeclareButtonsVisibilityOFF()
        }
        else {
            console.log("isDeclarePhase",this.oScene.isDeclarePhase);
            if (this.oScene.isDeclarePhase == true) {
                this.handleDeclareButtonsVisibilityOFF();
            } else {
                this.handleDeclareButtonsVisibilityON()
                if (this.oScene.dp_yellow_ring_1.visible == true && this.oScene.dp_yellow_ring_2.visible == false && this.isOwnTurn) {
                    this.oScene.confirmButton.setAlpha(0.75);
                    this.oScene.confirmButton.disableInteractive();
                } else if (this.oScene.dp_yellow_ring_1.visible == false && this.oScene.dp_yellow_ring_2.visible == true && this.isOwnTurn) {
                    this.oScene.confirmButton.setAlpha(0.75);
                    this.oScene.confirmButton.disableInteractive();
                } else {
                    if (this.isOwnTurn) {
                        this.oScene.confirmButton.setAlpha(1);
                        this.oScene.confirmButton.setInteractive().on('pointerdown', () => {
                            console.log("Confirm Button Clicked");
                            this.handleRingsVisibilityOFF();
                            this.oScene.oRuleset.sendCardData.push(this.oScene.oRuleset.grp1Data, this.oScene.oRuleset.grp2Data)
                            this.oScene.sendPhaseData();
                        });
                    } else {
                        this.oScene.confirmButton.setAlpha(0.75);
                        this.oScene.confirmButton.disableInteractive();
                    }
                }
            }
        }
        this.oScene.cancelButton.setInteractive().on('pointerdown', () => {
            this.handleDeclareButtonsVisibilityOFF();
        });
    }

}