class PlayerManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.players = new Map();
        this.ownPlayerId = this.oScene.ownPlayerId;
        this.playerCounter = 0;
        this.oScene.confirmButton.setInteractive().on('pointerdown', () => {
            console.log("sendData ........+++++++++++");
            this.handleRingsVisibilityOFF();
            console.log(this.oScene.oRuleset.sendCardData);
            this.oScene.oRuleset.sendCardData.push(this.oScene.oRuleset.grp1Data, this.oScene.oRuleset.grp2Data)
            console.log("PhaseData ::::::::::::::::::>>>>>>", this.oScene.oRuleset.sendCardData, this.oScene.oRuleset.grp1Data, this.oScene.oRuleset.grp2Data);
            this.oScene.sendPhaseData();
            for (let i = 0; i < this.oScene.doublePhaseOneCardContainer.list.length; i++) {
                this.oScene.doublePhaseOneCardContainer.list[i].disableInteractive();
            }
            for (let i = 0; i < this.oScene.doublePhaseTwoCardContainer.list.length; i++) {
                this.oScene.doublePhaseTwoCardContainer.list[i].disableInteractive();
            }
            // for (let i = 0; i < this.oScene.singlePhaseOneContainer.list.length; i++) {
            //     this.oScene.singlePhaseOneContainer.list[i].disableInteractive();
            // }
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

    clearContainerData(target) {
        target.removeAll(true)
    }

    showSkipPlayer(data) {
        for (let i = 0; i < this.oScene.playersContainer.length; i++) {
            if (this.oScene.playersContainer.getAll()[i].name === data.iUserId) {
                let tempPlayer = this.oScene.playersContainer.getAll()[i]
                this.oScene.oTweenManager.skipPlayerTurnAnim(tempPlayer);
                break;
            }
        }
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
        for (let i = 0; i < data.length; i++) {
            if (data[i].nLabel <= 12) {
                this.oScene.oPlayerHand.setPlayerHand(data[i].nLabel, data[i].eColor, data[i]._id);
            }
            else {
                this.oScene.oPlayerHand.setPlayerHand(data[i].eColor, data[i]._id);
            }
        }
    }
    setGrup1CurrentData(data) {
        let startX = -40;
        this.cardInfo = data.oCurrentPhase["aGroup-1"]
        if (data.iUserId == this.oScene.ownPlayerId) {
            if (data.oCurrentPhase["aGroup-1"][0] == undefined) {
            } else {
                for (let i = 0; i < data.oCurrentPhase["aGroup-1"].length; i++) {
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
        let startX = -40;
        this.cardInfo = data.oCurrentPhase["aGroup-2"]
        if (data.iUserId == this.oScene.ownPlayerId) {
            if (data.oCurrentPhase["aGroup-2"][0] == undefined) {
            } else {
                for (let i = 0; i < data.oCurrentPhase["aGroup-2"].length; i++) {
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
        console.log("data =============> ", data);
        if (this.oScene.ownPlayerId != data.iUserId) {
            
            if (this.oScene.nMaxPlayer == 2) {
                this.oScene.opponentGrp1PhaseCardContainer.removeAll(true);
                this.oScene.opponentGrp2PhaseCardContainer.removeAll(true);


                console.log("nMaxPlayer =============> ", this.oScene.nMaxPlayer);
                this.oScene.txt_set2_opponent_info.text = this.oScene.txt_set1_opponent_info.text = "";
                this.opponemtGrpPhaseDeclare(data, 1);
                this.opponemtGrpPhaseDeclare(data, 2);
            }
            else if (this.oScene.nMaxPlayer == 3) {
                console.log("nMaxPlayer =============> ", this.oScene.nMaxPlayer);
                
                this.oScene.opponent2Grp1PhaseCardContainer.removeAll(true);
                this.oScene.opponent2Grp2PhaseCardContainer.removeAll(true);
                this.oScene.opponent3Grp1PhaseCardContainer.removeAll(true);
                this.oScene.opponent3Grp2PhaseCardContainer.removeAll(true);

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
        // let startX = 510;
        // let startY = phase == 1 ? 410 : 544
        if (this.declarePhaseCardInfo != undefined) {
            for (let i = 0; i < this.declarePhaseCardInfo.length; i++) {
                this.declarePhaseCard = new CardPrefab(this.oScene, 0, 0);
                this.declarePhaseCard.setScale(0.5)
                this.declarePhaseCard.disableInteractive();


                if (this.declarePhaseCardInfo[i].nLabel <= 12) {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[i].nLabel, this.declarePhaseCardInfo[i].eColor, this.declarePhaseCardInfo[i]._id);
                    this.declarePhaseCard.__CardPreset.cardNumber = this.declarePhaseCardInfo[i].nLabel;
                    this.declarePhaseCard.__CardPreset.cardColor = this.declarePhaseCardInfo[i].eColor;
                    this.declarePhaseCard.__CardPreset.cardId = this.declarePhaseCardInfo[i]._id;
                } else {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[i].eColor, this.declarePhaseCardInfo[i]._id);
                    this.declarePhaseCard.__CardPreset.cardNumber = this.declarePhaseCardInfo[i].eColor;
                    this.declarePhaseCard.__CardPreset.cardId = this.declarePhaseCardInfo[i]._id;
                }
                if (phase == 1) {
                    this.oScene.opponentGrp1PhaseCardContainer.add(this.declarePhaseCard)
                    this.oScene.oPlayerHand.arrangeOpponentDeclareCards(this.oScene.opponentGrp1PhaseCardContainer);
                }
                else if (phase == 2) {
                    this.oScene.opponentGrp2PhaseCardContainer.add(this.declarePhaseCard)
                    this.oScene.oPlayerHand.arrangeOpponentDeclareCards(this.oScene.opponentGrp2PhaseCardContainer);
                }
            }
        }
    }

    opponemt2GrpPhaseDeclare(data, phase, player) {
        console.log("oppnent hit card ");
        this.declarePhaseCardInfo = phase == 1 ? data["aGroup_1"] : data["aGroup_2"];
        // let startX = player === "Player1" ? 255 : 765;
        // let startY = phase == 1 ? 407 : 543
        if (this.declarePhaseCardInfo !== undefined) {
            for (let i = 0; i < this.declarePhaseCardInfo.length; i++) {

                this.declarePhaseCard = new CardPrefab(this.oScene, 0, 0);
                this.declarePhaseCard.setScale(0.5)
                this.declarePhaseCard.disableInteractive();

                if (this.declarePhaseCardInfo[i].nLabel <= 12) {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[i].nLabel, this.declarePhaseCardInfo[i].eColor, this.declarePhaseCardInfo[i]._id);
                    this.declarePhaseCard.__CardPreset.cardNumber = this.declarePhaseCardInfo[i].nLabel;
                    this.declarePhaseCard.__CardPreset.cardColor = this.declarePhaseCardInfo[i].eColor;
                    this.declarePhaseCard.__CardPreset.cardId = this.declarePhaseCardInfo[i]._id;
                } else {
                    this.declarePhaseCard.checkCardInformation(this.declarePhaseCardInfo[i].eColor, this.declarePhaseCardInfo[i]._id);
                    this.declarePhaseCard.__CardPreset.cardNumber = this.declarePhaseCardInfo[i].eColor;
                    this.declarePhaseCard.__CardPreset.cardId = this.declarePhaseCardInfo[i]._id;
                }
                if (player === "Player1") {
                    if (phase == 1) {
                        this.oScene.opponent2Grp1PhaseCardContainer.add(this.declarePhaseCard)
                        this.oScene.oPlayerHand.arrangeOpponentDeclareCards(this.oScene.opponent2Grp1PhaseCardContainer);
                    }
                    else if (phase == 2) {
                        this.oScene.opponent2Grp2PhaseCardContainer.add(this.declarePhaseCard)
                        this.oScene.oPlayerHand.arrangeOpponentDeclareCards(this.oScene.opponent2Grp2PhaseCardContainer);
                    }
                }
                else if(player === "Player2"){
                    if (phase == 1) {
                        this.oScene.opponent3Grp1PhaseCardContainer.add(this.declarePhaseCard)
                        this.oScene.oPlayerHand.arrangeOpponentDeclareCards(this.oScene.opponent3Grp1PhaseCardContainer);
                    }
                    else if (phase == 2) {
                        this.oScene.opponent3Grp2PhaseCardContainer.add(this.declarePhaseCard)
                        this.oScene.oPlayerHand.arrangeOpponentDeclareCards(this.oScene.opponent3Grp2PhaseCardContainer);
                    }
                }
            }
        }
    }


    opponentHitPhaseCard(data) {
        let tempContainer1;
        if (this.oScene.nMaxPlayer === 2) {
            // console.log("opponet card and player history1");
            if (data.sGroup === "aGroup-1") {
                // console.log("opponet card and player history11");
                // console.log(this.oScene.opponentGrp1PhaseCardContainer);

                if (this.oScene.ownPlayerId != data.iHrUserId) {
                    this.oScene.opponentGrp1PhaseCardContainer.removeAll(true);
                    tempContainer1 = this.oScene.opponentGrp1PhaseCardContainer;
                }
                else {
                    this.oScene.doublePhaseOneCardContainer.removeAll(true);
                    tempContainer1 = this.oScene.doublePhaseOneCardContainer;
                }
            }
            else if (data.sGroup === "aGroup-2") {
                // console.log("opponet card and player history12");
                // console.log(this.oScene.opponentGrp2PhaseCardContainer);

                if (this.oScene.ownPlayerId != data.iHrUserId) {
                    this.oScene.opponentGrp2PhaseCardContainer.removeAll(true);
                    tempContainer1 = this.oScene.opponentGrp2PhaseCardContainer;
                }
                else {
                    this.oScene.doublePhaseTwoCardContainer.removeAll(true);
                    tempContainer1 = this.oScene.doublePhaseTwoCardContainer;
                }
            }
        }
        else if (this.oScene.nMaxPlayer == 3) {
            // console.log("opponet card and player history3");
            // this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp1 == true
			// this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp1 == true
			// this.gameObjectPreset.scene.oGameManager.opponetPlayer2Grp2 == true
			// this.gameObjectPreset.scene.oGameManager.opponetPlayer3Grp2 == true
            // for(let i = 0; i < this.oScene.playersContainer.getAll().length; i++) {
            //     if (this.oScene.playersContainer.getAll()[i] === "aGroup-1") {

            //     }
            // }

            console.log(this.oScene.playersContainer);
            if (data.sGroup === "aGroup-1") {
                if (this.oScene.ownPlayerId != data.iHrUserId) {
                    if(data.iHrUserId == this.oScene.secondPlayerId){
                        this.oScene.opponent2Grp1PhaseCardContainer.removeAll(true);
                        tempContainer1 = this.oScene.opponent2Grp1PhaseCardContainer;
                    }
                    else{
                        this.oScene.opponent3Grp1PhaseCardContainer.removeAll(true);
                        tempContainer1 = this.oScene.opponent3Grp1PhaseCardContainer;
                    }
                }
                else {
                    this.oScene.doublePhaseOneCardContainer.removeAll(true);
                    tempContainer1 = this.oScene.doublePhaseOneCardContainer;
                }
            }
            else if (data.sGroup === "aGroup-2") {
                if (this.oScene.ownPlayerId != data.iHrUserId) {
                    if(data.iHrUserId == this.oScene.secondPlayerId){
                        this.oScene.opponent2Grp2PhaseCardContainer.removeAll(true);
                        tempContainer1 = this.oScene.opponent2Grp2PhaseCardContainer;
                    }
                    else{
                        this.oScene.opponent3Grp2PhaseCardContainer.removeAll(true);
                        tempContainer1 = this.oScene.opponent3Grp2PhaseCardContainer;
                    }
                }
                else {
                    this.oScene.doublePhaseTwoCardContainer.removeAll(true);
                    tempContainer1 = this.oScene.doublePhaseTwoCardContainer;
                }
            }
        }
        this.setOpponentHitPhaseCard(data, tempContainer1);
    }

    setOpponentHitPhaseCard(data, container) {
        for (let i = 0; i < data.aCards.length; i++) {
            this.declarePhaseCard = new CardPrefab(this.oScene, 0, 0);
            this.declarePhaseCard.setScale(0.5)
            this.declarePhaseCard.cCardID = data.aCards[i]._id;
            this.declarePhaseCard.cCardLable = data.aCards[i].nLabel;
            this.declarePhaseCard.cCardColor = data.aCards[i].eColor;
            this.declarePhaseCard.nGroupId = data.aCards[i].nGroupId;

            this.declarePhaseCard.disableInteractive();

            if (data.aCards[i].nLabel <= 12) {
                this.declarePhaseCard.checkCardInformation(data.aCards[i].nLabel, data.aCards[i].eColor, data.aCards[i]._id);
                this.declarePhaseCard.__CardPreset.cardNumber = data.aCards[i].nLabel;
                this.declarePhaseCard.__CardPreset.cardColor = data.aCards[i].eColor;
                this.declarePhaseCard.__CardPreset.cardId = data.aCards[i]._id;
            } else {
                this.declarePhaseCard.checkCardInformation(data.aCards[i].eColor, data.aCards[i]._id);
                this.declarePhaseCard.__CardPreset.cardNumber = data.aCards[i].eColor;
                this.declarePhaseCard.__CardPreset.cardId = data.aCards[i]._id;
            }
            container.add(this.declarePhaseCard)
            this.oScene.oPlayerHand.arrangeOpponentDeclareCards(container);
        }
    }

    setUserInfo(playerData, rootSocketId) {
        if (rootSocketId == playerData.sRootSocket) {
            console.log("playerCounter", this.playerCounter);
            console.log("555555");
            this.oScene.ownPlayerId = playerData.iUserId;
            this.ownPlayerId = playerData.iUserId;
            this.ownPlayerPrefab = new PlayerPrefab(this.oScene);
            this.ownPlayerPrefab.setName(playerData.iUserId);
            this.ownPlayerPrefab.setPosition(540, 1750);
            this.oScene.playersContainer.add(this.ownPlayerPrefab);
            this.playerCounter++;
        }
        
        else {
            console.log("6666666");
            if (this.oScene.nMaxPlayer == 2) {
                console.log("playerCounter", this.playerCounter);
                this.oScene.emptySeatPlayer2.destroy()
                this.oScene.secondPlayerUserNameText.text = playerData.sUserName.length == 0 ? playerData.sMobile.substring(0, 4) + "****" : playerData.sUserName;
                this.oppPlayerPrefab = new PlayerPrefab(this.oScene);
                this.oppPlayerPrefab.setName(playerData.iUserId);
                this.oppPlayerPrefab.setPosition(480, 170);
                this.oScene.playersContainer.add(this.oppPlayerPrefab);
                this.oScene.secondPlayerId = playerData.iUserId
            }
            else if (this.oScene.nMaxPlayer == 3) {
                if (this.playerCounter == 1) {
                    console.log("playerCounter", this.playerCounter);
                    this.oScene.emptySeatTwoPlayer.destroy();
                    this.oScene.secondPlayer2UserNameText.text = playerData.sUserName.length == 0 ? playerData.sMobile.substring(0, 4) + "****" : playerData.sUserName;
                    this.oppPlayerOnePrefab = new PlayerPrefab(this.oScene);
                    this.oppPlayerOnePrefab.setName(playerData.iUserId);
                    this.oppPlayerOnePrefab.setPosition(227, 170);
                    this.oScene.playersContainer.add(this.oppPlayerOnePrefab);
                    this.oScene.secondPlayerId = playerData.iUserId
                    console.log("oppPlayerOne");
                }
                else {
                    console.log("playerCounter", this.playerCounter);
                    this.oScene.emptySeatThreePlayer.destroy();
                    this.oScene.secondPlayer3UserNameText.text = playerData.sUserName.length == 0 ? playerData.sMobile.substring(0, 4) + "****" : playerData.sUserName;
                    this.oppPlayerTwoPrefab = new PlayerPrefab(this.oScene);
                    this.oppPlayerTwoPrefab.setName(playerData.iUserId);
                    this.oppPlayerTwoPrefab.setPosition(734, 170);
                    this.oScene.playersContainer.add(this.oppPlayerTwoPrefab);
                    this.oScene.thirdPlayerId = playerData.iUserId
                    console.log("oppPlayerTwo");
                }
                this.playerCounter++;
            }
        }
    }
    setPlayerPhaseData(phaseData) {
        this.oScene.oGameManager.nCurrentPhase = phaseData.nCurrentPhase;
        this.oScene.oGameManager.nTotalPhasesCount = phaseData.nTotalPhasesCount;
        this.oScene.oGameManager.phaseRules = phaseData.aRules.length;
        
        //OwnPlayerData
        if (this.oScene.ownPlayerId == phaseData.iUserId) {
            this.oScene.oGameManager.nNumberOfRules = phaseData.nNumberOfRules;
            this.oScene.totalPhasesText.setText("PHASE " + phaseData.nCurrentPhase + "/" + phaseData.nTotalPhasesCount);
            if (phaseData.aRules.length == 2) {
                this.oScene.double_phase.setVisible(true);
                this.oScene.single_phase.setVisible(false);

                this.oScene.oGameManager.phaseOneType = phaseData.aRules[0].sRuleType.toUpperCase();
                this.oScene.oGameManager.phaseOneTotalCards = phaseData.aRules[0].nNumberOfCards.toString().toUpperCase();
                this.oScene.phaseOneText.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
                
                this.oScene.oGameManager.phaseTwoType = phaseData.aRules[1].sRuleType.toUpperCase();
                this.oScene.oGameManager.phaseTwoTotalCards = phaseData.aRules[1].nNumberOfCards.toString().toUpperCase();
                this.oScene.phaseTwoText.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " of " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
                this.setGrup1CurrentData(phaseData);
                this.setGrup2CurrentData(phaseData);
            }
            else {
                this.oScene.doublePhaseOneCardContainer.x = 540;
                this.oScene.double_phase.setVisible(false);
                this.oScene.single_phase.setVisible(true);

                this.oScene.oGameManager.phaseOneType = phaseData.aRules[0].sRuleType.toUpperCase();
                this.oScene.oGameManager.phaseOneTotalCards = phaseData.aRules[0].nNumberOfCards.toString().toUpperCase();
                this.oScene.phaseMiddleText.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
                this.setGrup1CurrentData(phaseData);
            }
            //setownPlayerGroup
        }
        else {
            if (this.oScene.nMaxPlayer == 2) {
                this.oScene.oGameManager.twoPlayerNumberOfRules = phaseData.nNumberOfRules;
                this.oScene.txt_set1_opponent_info.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
                this.oScene.txt_set2_opponent_info.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " of " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
                this.oScene.txt_opponent_phase_count.setText("PHASE " + phaseData.nCurrentPhase);
                this.oScene.txt_opponent_phase_score.setText(phaseData.nScore);
            }
            else if (this.oScene.nMaxPlayer == 3) {
                for (let i = 0; i < this.oScene.playersContainer.length; i++) {
                    if (this.oScene.playersContainer.getAll()[i].name === phaseData.iUserId) {
                        if (this.oScene.secondPlayerId == phaseData.iUserId) {
                            this.oScene.oGameManager.threePlayer1NumberOfRules = phaseData.nNumberOfRules;
                            this.oScene.txt_set1_opponent2_info.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " of " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
                            this.oScene.txt_set2_opponent2_info.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " of " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
                            this.oScene.txt_opponent2_phase_count.setText("PHASE " + phaseData.nCurrentPhase);
                            this.oScene.txt_opponent2_phase_score.setText(phaseData.nScore);
                        }
                        else if(this.oScene.thirdPlayerId == phaseData.iUserId){
                            this.oScene.oGameManager.threePlayer2NumberOfRules = phaseData.nNumberOfRules;
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
        console.log("oWnPlayeR", this.oScene.ownPlayerId);
        // this.oScene.oGameManager.isOwnTurn = false;
        this.oScene.oGameManager.isGrabCardCloseDake = false;
        this.currentPlayerTurn = playerTurnData.iUserId;

        if (playerTurnData.iUserId == this.oScene.ownPlayerId) {
            this.oScene.oGameManager.isOwnTurn = true;
            this.oScene.oGameManager.isGrabCard = false;

            if (this.oScene.oPlayerHand.chakeLastCardSkip == false) {
                for (let i = 0; i < this.oScene.discardDeckContainer.list.length; i++) {
                    this.oScene.discardDeckContainer.list[i].setInteractive();
                }
            } else {
                for (let i = 0; i < this.oScene.discardDeckContainer.list.length; i++) {
                    this.oScene.discardDeckContainer.list[i].disableInteractive();
                }
            }
            this.oScene.closedCardDeck.setInteractive();
            // this.oScene.discardDeckContainer.list[this.oScene.discardDeckContainer.list.length - 1].setInteractive();
        } else {

            this.oScene.oGameManager.isOwnTurn = false;
            this.oScene.oGameManager.isGrabCard = true;
            for (let i = 0; i < this.oScene.discardDeckContainer.list.length; i++) {
                this.oScene.discardDeckContainer.list[i].disableInteractive();
            }
            // this.oScene.discardDeckContainer.list[this.oScene.discardDeckContainer.list.length - 1].disableInteractive();
        }

        for (let i = 0; i < this.oScene.playersContainer.length; i++) {

            for (let j = 0; j < this.oScene.playersContainer.length; j++) {
                if (this.oScene.playersContainer.getAll()[j].name !== this.currentPlayerTurn) {
                    this.ownPlayerTurnReset = "";
                    this.oScene.playersContainer.getAll()[j].intervalTimeReset();
                }
            }

            if (this.oScene.playersContainer.getAll()[i].name === this.currentPlayerTurn) {
                this.ownPlayerTurnReset = this.oScene.playersContainer.getAll()[i];
                this.oScene.playersContainer.getAll()[i].startTimerInit(this.oScene.playersContainer.getAll()[i].x, this.oScene.playersContainer.getAll()[i].y, playerTurnData);
                break;
            }

        }
    }

    setOpponentHandCardCounter(oData) {
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
        this.oScene.sp_yellow_ring_1.setVisible(false);
    }

    handleDeclareButtons() {
        if (this.oScene.dp_yellow_ring_1.visible == false && this.oScene.dp_yellow_ring_2.visible == false && this.oScene.sp_yellow_ring_1.visible == false) {
            this.handleDeclareButtonsVisibilityOFF()
        }
        else {
            if (this.oScene.isDeclarePhase == true) {
                this.handleDeclareButtonsVisibilityOFF();
            } else {
                this.handleDeclareButtonsVisibilityON()
                if ((this.oScene.oGameManager.nNumberOfRules == 2) && this.oScene.dp_yellow_ring_1.visible == true && this.oScene.dp_yellow_ring_2.visible == false && this.oScene.oGameManager.isOwnTurn) {
                    this.oScene.confirmButton.setAlpha(0.75);
                    this.oScene.confirmButton.disableInteractive();
                } else if ((this.oScene.oGameManager.nNumberOfRules == 2) && this.oScene.dp_yellow_ring_1.visible == false && this.oScene.dp_yellow_ring_2.visible == true && this.oScene.oGameManager.isOwnTurn) {
                    this.oScene.confirmButton.setAlpha(0.75);
                    this.oScene.confirmButton.disableInteractive();
                }else if ((this.oScene.oGameManager.nNumberOfRules == 1) && this.oScene.sp_yellow_ring_1.visible == false && this.oScene.oGameManager.isOwnTurn) {
                    this.oScene.confirmButton.setAlpha(0.75);
                    this.oScene.confirmButton.disableInteractive();
                }
                 else {
                    if (this.oScene.oGameManager.isOwnTurn) {
                        if (this.oScene.sp_yellow_ring_1.visible == true) {
                            this.handleDeclareButtonsVisibilityON()
                            this.oScene.confirmButton.setAlpha(1);
                            this.oScene.confirmButton.setInteractive();
                        } else {
                            this.oScene.confirmButton.setAlpha(0.75);
                            this.oScene.confirmButton.disableInteractive();
                        }
                        this.handleDeclareButtonsVisibilityON()
                        this.oScene.confirmButton.setAlpha(1);
                        this.oScene.confirmButton.setInteractive();
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



// if (data.sGroup === "aGroup-1") {

//     if (this.oScene.ownPlayerId != data.iHrUserId) {
//         this.oScene.opponent2Grp1PhaseCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.opponent2Grp1PhaseCardContainer;
//     }

//     else{
//         this.oScene.doublePhaseOneCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.doublePhaseOneCardContainer;
//     }
// }
// else if (data.sGroup === "aGroup-2"){
//     if (this.oScene.ownPlayerId != data.iHrUserId) {
//         this.oScene.opponent2Grp2PhaseCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.opponent2Grp2PhaseCardContainer;
//     }
//     else{
//         this.oScene.doublePhaseTwoCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.doublePhaseTwoCardContainer;
//     }
// }
// // }
// // else{
// if (data.sGroup === "aGroup-1") {
//     if (this.oScene.ownPlayerId != data.iHrUserId) {
//         this.oScene.opponent3Grp1PhaseCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.opponent3Grp1PhaseCardContainer;
//     }
//     else{
//         this.oScene.doublePhaseOneCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.doublePhaseOneCardContainer;
//     }
// }
// else if (data.sGroup === "aGroup-2"){
//     if (this.oScene.ownPlayerId != data.iHrUserId) {
//         this.oScene.opponent3Grp2PhaseCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.opponent3Grp2PhaseCardContainer;
//     }
//     else{
//         this.oScene.doublePhaseTwoCardContainer.removeAll(true);
//         tempContainer1 = this.oScene.doublePhaseTwoCardContainer;
//     }
// }

