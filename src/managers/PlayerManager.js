class PlayerManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.players = new Map();
        this.isOwnTurn = null;
        this.ownPlayerId = this.oScene.ownPlayerId;
        this.playerCounter = 0;
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

    clearContainerData(target) {
        target.removeAll(true)
    }

    resetPhaseData() {
        let temp = [
            this.oScene.opponentGrp1PhaseCardContainer,
            this.oScene.opponentGrp2PhaseCardContainer,
            this.oScene.opponent2Grp1PhaseCardContainer,
            this.oScene.opponent2Grp2PhaseCardContainer,
            this.oScene.opponent3Grp1PhaseCardContainer,
            this.oScene.opponent3Grp2PhaseCardContainer,
        ];
        for (let i = 0; i < temp.length; i++) this.clearContainerData(temp[i])

        for (let j = 0; j < this.oScene.playersContainer.length; j++) {
            this.oScene.playersContainer.getAll()[j].intervalTimeReset();
        }

    }

    setUsersData(data, rootSocketId) {
        if (!this.players.has(data.iUserId)) {
            this.addPlayer(data.nSeat, data.iUserId);
            this.setUserInfo(data, rootSocketId);
        }
    }
    setHandData(data) {
        this.oScene.playerHandContainer.setVisible(true);
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

    opponentDeclarePhase(data) {
        if (this.oScene.ownPlayerId != data.iUserId) {
            if (this.oScene.nMaxPlayer == 2) {
                this.oScene.txt_set2_opponent_info.text = this.oScene.txt_set1_opponent_info.text = "";
                this.opponemtGrpPhaseDeclare(data, 1);
                this.opponemtGrpPhaseDeclare(data, 2);
            }
            else if (this.oScene.nMaxPlayer == 3) {
                for (let i = 0; i < this.oScene.playersContainer.length; i++) {
                    if (this.oScene.playersContainer.getAll()[i].name === data.iUserId) {
                        if (this.oScene.playersContainer.getAll()[i].x < 540) {
                            this.oScene.txt_set1_opponent2_info.text = this.oScene.txt_set2_opponent2_info.text = "";
                            this.opponemt2GrpPhaseDeclare(data, 1, "Player1");
                            this.opponemt2GrpPhaseDeclare(data, 2, "Player1");
                        }
                        else {
                            this.oScene.txt_set1_opponent3_info.text = this.oScene.txt_set2_opponent3_info.text = "";
                            this.opponemt2GrpPhaseDeclare(data, 1, "Player2");
                            this.opponemt2GrpPhaseDeclare(data, 2, "Player2");
                        }
                    }
                }
            }
        }
    }

    opponemtGrpPhaseDeclare(data, phase) {
        this.declarePhaseCardInfo = phase == 1 ? data["aGroup_1"] : data["aGroup_2"];
        var startX = 510;
        var startY = phase == 1 ? 410 : 544
        if (this.declarePhaseCardInfo !== undefined) {
            for (let j = 0; j < this.declarePhaseCardInfo.length; j++) {
                this.declarePhaseCard = new CardPrefab(this.oScene, startX, startY);
                this.declarePhaseCard.setScale(0.5)
                this.declarePhaseCard.disableInteractive();

                if (phase == 1) this.oScene.opponentGrp1PhaseCardContainer.add(this.declarePhaseCard)
                else if (phase == 2) this.oScene.opponentGrp2PhaseCardContainer.add(this.declarePhaseCard)

                if (this.declarePhaseCardInfo[j].nLabel <= 12) {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[j].nLabel, this.declarePhaseCardInfo[j].eColor, this.declarePhaseCardInfo[j]._id);
                } else {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[j].eColor, this.declarePhaseCardInfo[j]._id);
                }
                startX += 30;
            }
        }
    }

    opponemt2GrpPhaseDeclare(data, phase, player) {
        this.declarePhaseCardInfo = phase == 1 ? data["aGroup_1"] : data["aGroup_2"];
        var startX = player === "Player1" ? 255 : 765;
        var startY = phase == 1 ? 407 : 543
        if (this.declarePhaseCardInfo !== undefined) {
            for (let j = 0; j < this.declarePhaseCardInfo.length; j++) {

                this.declarePhaseCard = new CardPrefab(this.oScene, startX, startY);
                this.declarePhaseCard.setScale(0.5)
                this.declarePhaseCard.disableInteractive();

                if (player === "Player1") {
                    if (phase == 1) this.oScene.opponent2Grp1PhaseCardContainer.add(this.declarePhaseCard)
                    else if (phase == 2) this.oScene.opponent2Grp2PhaseCardContainer.add(this.declarePhaseCard)
                }
                else {
                    if (phase == 1) this.oScene.opponent3Grp1PhaseCardContainer.add(this.declarePhaseCard)
                    else if (phase == 2) this.oScene.opponent3Grp2PhaseCardContainer.add(this.declarePhaseCard)
                }

                if (this.declarePhaseCardInfo[j].nLabel <= 12) {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[j].nLabel, this.declarePhaseCardInfo[j].eColor, this.declarePhaseCardInfo[j]._id);
                } else {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[j].eColor, this.declarePhaseCardInfo[j]._id);
                }

                startX += 30;
            }
        }
    }


    opponentHitPhaseCard(data) {
        let tempContainer;
        let startY, startX;

        if (this.oScene.ownPlayerId !== data.iHUserId) {
            if (this.oScene.nMaxPlayer === 2) {
                if (data.sGroup === "aGroup-1") {
                    this.clearContainerData(this.oScene.opponentGrp1PhaseCardContainer)
                    tempContainer = this.oScene.opponentGrp1PhaseCardContainer;
                    startY = 410;
                }
                else if (data.sGroup === "aGroup-2") {
                    this.clearContainerData(this.oScene.opponentGrp2PhaseCardContainer)
                    tempContainer = this.oScene.opponentGrp2PhaseCardContainer;
                    startY = 544;
                }
                startX = 510;
            }
            else if (this.oScene.nMaxPlayer == 3) {
                for (let i = 0; i < this.oScene.playersContainer.length; i++) {
                    if (this.oScene.playersContainer.getAll()[i].name === data.iHUserId) {
                        if (this.oScene.playersContainer.getAll()[i].x < 540) {
                            if (data.sGroup === "aGroup-1") {
                                this.clearContainerData(this.oScene.opponent2Grp1PhaseCardContainer);
                                tempContainer = this.oScene.opponent2Grp1PhaseCardContainer;
                                startY = 410;
                            }
                            else if (data.sGroup === "aGroup-2") {
                                this.clearContainerData(this.oScene.opponent2Grp2PhaseCardContainer);
                                tempContainer = this.oScene.opponent2Grp2PhaseCardContainer;
                                startY = 544;
                            }
                            console.log("< 540", tempContainer);
                            startX = 255;
                        }
                        else {
                            if (data.sGroup === "aGroup-1") {
                                this.clearContainerData(this.oScene.opponent3Grp1PhaseCardContainer);
                                tempContainer = this.oScene.opponent3Grp1PhaseCardContainer;
                                startY = 410;
                            }
                            else if (data.sGroup === "aGroup-2") {
                                this.clearContainerData(this.oScene.opponent3Grp2PhaseCardContainer);
                                tempContainer = this.oScene.opponent3Grp2PhaseCardContainer;
                                startY = 544;
                            }
                            console.log("> 540", tempContainer);
                            startX = 765;
                        }
                    }
                }
            }
            this.setOpponentHitPhaseCard(data, tempContainer, startX, startY);
        }
    }

    setOpponentHitPhaseCard(data, container, startX, startY) {
        for (let i = 0; i < data.aCards.length; i++) {
            this.declarePhaseCard = new CardPrefab(this.oScene, startX, startY);
            this.declarePhaseCard.setScale(0.5)
            container.add(this.declarePhaseCard)
            this.declarePhaseCard.disableInteractive();

            if (data.aCards[i].nLabel <= 12) {
                this.declarePhaseCard.checkCardInformation(data.aCards[i].nLabel, data.aCards[i].eColor, data.aCards[i]._id);
            } else {
                this.declarePhaseCard.checkCardInformation(data.aCards[i].eColor, data.aCards[i]._id);
            }
            startX += 30;
        }
    }

    setUserInfo(playerData, rootSocketId) {
        if (rootSocketId == playerData.sRootSocket) {
            this.oScene.ownPlayerId = playerData.iUserId;
            this.ownPlayerId = playerData.iUserId;
            this.ownPlayerPrefab = new PlayerPrefab(this.oScene);
            this.ownPlayerPrefab.setName(playerData.iUserId);
            this.ownPlayerPrefab.setPosition(540, 1750);
            this.oScene.playersContainer.add(this.ownPlayerPrefab);
            this.playerCounter++;
        }
        else {
            if (this.oScene.nMaxPlayer == 2) {
                this.oScene.emptySeatPlayer2.destroy()
                this.oScene.secondPlayerUserNameText.text = playerData.sUserName.length == 0 ? playerData.sMobile.substring(0, 4) + "****" : playerData.sUserName;
                this.oppPlayerPrefab = new PlayerPrefab(this.oScene);
                this.oppPlayerPrefab.setName(playerData.iUserId);
                this.oppPlayerPrefab.setPosition(480, 170);
                this.oScene.playersContainer.add(this.oppPlayerPrefab);
            }
            else if (this.oScene.nMaxPlayer == 3) {
                if (this.playerCounter == 1) {
                    this.oScene.emptySeatTwoPlayer.destroy();
                    this.oScene.secondPlayer2UserNameText.text = playerData.sUserName.length == 0 ? playerData.sMobile.substring(0, 4) + "****" : playerData.sUserName;
                    this.oppPlayerOnePrefab = new PlayerPrefab(this.oScene);
                    this.oppPlayerOnePrefab.setName(playerData.iUserId);
                    this.oppPlayerOnePrefab.setPosition(227, 170);
                    this.oScene.playersContainer.add(this.oppPlayerOnePrefab);
                    this.playerCounter++;
                }
                else {
                    this.oScene.emptySeatThreePlayer.destroy();
                    this.oScene.secondPlayer3UserNameText.text = playerData.sUserName.length == 0 ? playerData.sMobile.substring(0, 4) + "****" : playerData.sUserName;
                    this.oppPlayerTwoPrefab = new PlayerPrefab(this.oScene);
                    this.oppPlayerTwoPrefab.setName(playerData.iUserId);
                    this.oppPlayerTwoPrefab.setPosition(734, 170);
                    this.oScene.playersContainer.add(this.oppPlayerTwoPrefab);
                    this.playerCounter++;
                }
            }
        }
    }
    setPlayerPhaseData(phaseData) {
        this.oScene.oGameManager.nCurrentPhase = phaseData.nCurrentPhase;
        this.oScene.oGameManager.nTotalPhasesCount = phaseData.nTotalPhasesCount;
        //OwnPlayerData
        if (this.oScene.ownPlayerId == phaseData.iUserId) {
            this.oScene.totalPhasesText.setText("PHASE " + phaseData.nCurrentPhase + "/" + phaseData.nTotalPhasesCount);
            if (phaseData.aRules.length == 2) {
                this.oScene.oGameManager.phaseOneType = phaseData.aRules[0].sRuleType.toUpperCase();
                this.oScene.oGameManager.phaseOneTotalCards = phaseData.aRules[0].nNumberOfCards.toString().toUpperCase();
                this.oScene.phaseOneText.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());

                this.oScene.oGameManager.phaseTwoType = phaseData.aRules[1].sRuleType.toUpperCase();
                this.oScene.oGameManager.phaseTwoTotalCards = phaseData.aRules[1].nNumberOfCards.toString().toUpperCase();
                this.oScene.phaseTwoText.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " of " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
            }
            else {
                this.oScene.oGameManager.phaseOneType = phaseData.aRules[0].sRuleType.toUpperCase();
                this.oScene.oGameManager.phaseOneTotalCards = phaseData.aRules[0].nNumberOfCards.toString().toUpperCase();
                this.oScene.phaseMiddleText.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
            }
            //setownPlayerGroup
            this.setGrup1CurrentData(phaseData);
            this.setGrup2CurrentData(phaseData);
        }
        else {
            if (this.oScene.nMaxPlayer == 2) {
                this.oScene.txt_set1_opponent_info.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
                this.oScene.txt_set2_opponent_info.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " of " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
                this.oScene.txt_opponent_phase_count.setText("PHASE " + phaseData.nCurrentPhase);
                this.oScene.txt_opponent_phase_score.setText(phaseData.nScore);
            }
            else if (this.oScene.nMaxPlayer == 3) {
                for (let i = 0; i < this.oScene.playersContainer.length; i++) {
                    if (this.oScene.playersContainer.getAll()[i].name === phaseData.iUserId) {
                        if (this.oScene.playersContainer.getAll()[i].x < 540) {
                            this.oScene.txt_set1_opponent2_info.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
                            this.oScene.txt_set2_opponent2_info.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " of " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
                            this.oScene.txt_opponent2_phase_count.setText("PHASE " + phaseData.nCurrentPhase);
                            this.oScene.txt_opponent2_phase_score.setText(phaseData.nScore);
                        }
                        else {
                            this.oScene.txt_set1_opponent3_info.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
                            this.oScene.txt_set2_opponent3_info.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " of " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
                            this.oScene.txt_opponent3_phase_count.setText("PHASE " + phaseData.nCurrentPhase);
                            this.oScene.txt_opponent3_phase_score.setText(phaseData.nScore);
                        }
                    }
                }
            }
        }

    }



    changePlayerTurn(playerTurnData) {
        this.currentPlayerTurn = playerTurnData.iUserId;
        if (playerTurnData.iUserId == this.oScene.ownPlayerId) {
            this.isOwnTurn = true;
        } else {
            this.isOwnTurn = false;
        }

        for (let i = 0; i < this.oScene.playersContainer.length; i++) {

            for (let j = 0; j < this.oScene.playersContainer.length; j++) {
                if (this.oScene.playersContainer.getAll()[j].name !== this.currentPlayerTurn) {
                    this.oScene.playersContainer.getAll()[j].intervalTimeReset();
                }
            }

            if (this.oScene.playersContainer.getAll()[i].name === this.currentPlayerTurn) {
                this.oScene.playersContainer.getAll()[i].startTimerInit(this.oScene.playersContainer.getAll()[i].x, this.oScene.playersContainer.getAll()[i].y, playerTurnData);
                break;
            }

        }
    }

    setOpponentHandCardCounter(oData) {
        console.log("resHandCardCount", oData);
        let playerId = oData.iUserId;
        if (this.oScene.nMaxPlayer == 2) {
            if (playerId !== this.oScene.ownPlayerId) {
                this.oScene.txt_opponentHandCardCounter.setText(oData.nCardCount);
            }
        }
        if (this.oScene.nMaxPlayer == 3) {
            for (let i = 0; i < this.oScene.playersContainer.length; i++) {
                if (this.oScene.playersContainer.getAll()[i].name === playerId) {
                    if (this.oScene.playersContainer.getAll()[i].x < 540) {
                        this.oScene.txt_opponent2HandCardCounter.setText(oData.nCardCount);

                    }
                    else {
                        this.oScene.txt_opponent3HandCardCounter.setText(oData.nCardCount);
                    }
                }
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
            if (this.oScene.isDeclarePhase == true) {
                this.handleDeclareButtonsVisibilityOFF();
            } else {
                console.log(this.oScene.isDeclarePhase);
                this.handleDeclareButtonsVisibilityON()
                if (this.oScene.dp_yellow_ring_1.visible == true && this.oScene.dp_yellow_ring_2.visible == false && this.isOwnTurn) {
                    this.oScene.confirmButton.setAlpha(0.75);
                    this.oScene.confirmButton.disableInteractive();
                } else if (this.oScene.dp_yellow_ring_1.visible == false && this.oScene.dp_yellow_ring_2.visible == true && this.isOwnTurn) {
                    this.oScene.confirmButton.setAlpha(0.75);
                    this.oScene.confirmButton.disableInteractive();
                } else {
                    if (this.isOwnTurn) {
                        //    this.handleDeclareButtonsVisibilityON()
                        this.oScene.confirmButton.setAlpha(1);
                        this.oScene.confirmButton.setInteractive().on('pointerdown', () => {
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