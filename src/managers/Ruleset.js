class Ruleset {
    constructor(oScene) {
        this.oScene = oScene;
        this.sendCardData = [];
        this.grp1Data = []
        this.grp2Data = []
        this.hitCardsData = []
    }

    validateRuleset(validateData) {
        console.log("ValidDataList :->", validateData.list.length, "Phase1TotalCards", this.oScene.oGameManager.phaseOneTotalCards, "phase2TotalCards", this.oScene.oGameManager.phaseTwoTotalCards)
        if (validateData.list.length == this.oScene.oGameManager.phaseOneTotalCards || validateData.list.length == this.oScene.oGameManager.phaseTwoTotalCards) {
            this.cardColors = [];
            this.cardNumbers = [];
            this.cardIds = [];
            for (let i = 0; i < validateData.list.length; i++) {
                this.cardColors.push(validateData.list[i].__CardPreset.cardColor);
                this.cardNumbers.push(validateData.list[i].__CardPreset.cardNumber);
                this.cardIds.push(validateData.list[i].__CardPreset.cardId);
            }
            this.checkRulesetContainer(validateData.name, validateData);
        }
        else {
            if (validateData.name == "doublePhaseOneCardContainer" && this.oScene.dp_yellow_ring_1.visible == true) {
                this.oScene.dp_yellow_ring_1.setVisible(false);
            }
            if (validateData.name == "doublePhaseTwoCardContainer" && this.oScene.dp_yellow_ring_2.visible == true) {
                this.oScene.dp_yellow_ring_2.setVisible(false);
            }
            // if (validateData.name == "doublePhaseTwoCardContainer" && this.oScene.dp_yellow_ring_2.visible == true) {
            //     this.oScene.dp_yellow_ring_2.setVisible(false);
            // }
        }
    }

    checkRulesetContainer(containerName, validateData) {
        if (containerName == 'doublePhaseOneCardContainer') {
            this.checkRulesetCondition(this.oScene.oGameManager.phaseOneType, this.oScene.oGameManager.phaseOneTotalCards, containerName, validateData);
        }
        if (containerName == 'doublePhaseTwoCardContainer') {
            this.checkRulesetCondition(this.oScene.oGameManager.phaseTwoType, this.oScene.oGameManager.phaseTwoTotalCards, containerName, validateData);
        }
        // if(containerName == 'doublePhaseTwoCardContainer'){
        //     this.checkRulesetCondition(this.oScene.oGameManager.phaseTwoType, this.oScene.oGameManager.phaseTwoTotalCards, containerName, validateData);
        // }
    }

    checkRulesetCondition(ruleType, totalCards, containerName, validateData) {
        if (ruleType == 'SET') {
            this.validateRulesetOfSet(totalCards, containerName, validateData);
        } else if (ruleType == 'RUN') {
            this.validateRulesetOfRun(totalCards, containerName, validateData);
        } else if (ruleType == 'color') {
            this.validateRulesetOfColor(totalCards, containerName, validateData);
        }
    }
    // Rule ==========> set
    validateRulesetOfSet(totalCards, containerName, validateData) {
        this.cardNumbers.sort();
        if (this.cardNumbers.every(element => element === this.cardNumbers[0] || element === 'w') && this.cardNumbers.length == totalCards) {
            if (this.cardNumbers.every(element => element !== 's')) {
                if (containerName == "doublePhaseOneCardContainer") {
                    this.grp1Data = [];
                    if (this.oScene.isDeclarePhase == false) {
                        this.oScene.dp_yellow_ring_1.setVisible(true);
                        this.oScene.oPlayerManager.handleDeclareButtons();
                    }
                    for (let i = 0; i < validateData.list.length; i++) {
                        this.grp1Data.push({ nLabel: this.cardNumbers[i], eColor: this.cardColors[i], _id: this.cardIds[i] })
                    }
                }
                if (containerName == "doublePhaseTwoCardContainer") {
                    this.grp2Data = [];
                    if (this.oScene.isDeclarePhase == false) {
                        this.oScene.dp_yellow_ring_2.setVisible(true);
                        this.oScene.oPlayerManager.handleDeclareButtons();
                    }
                    for (let i = 0; i < validateData.list.length; i++) {
                        this.grp2Data.push({ nLabel: this.cardNumbers[i], eColor: this.cardColors[i], _id: this.cardIds[i] })
                    }
                }
            }
        }
    }
    // Rule ==========> Run
    validateRulesetOfRun(totalCards, containerName, validateData) {
        console.log(" ValidateRule of Run ===>", totalCards, containerName);
        this.grp1Data = [];
        this.grp2Data = [];
        if (this.cardNumbers.length == totalCards) {
            if (containerName == 'doublePhaseOneCardContainer') {
                this.checkRule(this.cardNumbers, this.grp1Data, validateData)
            }
            if (containerName == 'doublePhaseTwoCardContainer') {
                this.checkRule(this.cardNumbers, this.grp2Data, validateData)
            }
        }
    }
    checkRule(cardNumberArray, grp, containerData) {
        console.log("cardData", cardNumberArray);
        let sortedNumbers = [...cardNumberArray];
        let tempArray = [];
        let isWildCard = false;
        let wildCount = 0;
        let isSquence = true;
        tempArray = cardNumberArray.filter((value) => {
            if (value != "w") {
                return value;
            } else if (value == "w") {
                wildCount++;
            }
        }).sort((a, b) => {
            return a - b;
        })
        if (wildCount == 0) {
            for (let i = 0; i < tempArray.length - 1; i++) {
                if (tempArray[i] + 1 != tempArray[i + 1]) {
                    isSquence = false;
                    break;
                }
            }
            if (isSquence) {
                isWildCard = true
            }
        } else {
            for (let i = 0; i < tempArray.length - 1; i++) {
                let x = tempArray[i];
                let y = tempArray[i + 1];
                let ans = (y - x) - 1;
                wildCount = wildCount - ans;
            } if (wildCount >= 0) {
                isWildCard = true
            }


        }
        if (isWildCard == true) {
            for (let i = 0; i < sortedNumbers.length; i++) {
                if (sortedNumbers[i] == "w") {
                    sortedNumbers[i] = 13;
                }
            }
            console.log("conform", sortedNumbers);
            this.oScene.dp_yellow_ring_2.visible = true;
            this.oScene.oPlayerManager.handleDeclareButtons();
            for (let i = 0; i < containerData.list.length; i++) {
                grp.push({ nLabel: this.cardNumbers[i], eColor: this.cardColors[i], _id: this.cardIds[i] })
            }
            console.log("RunCARD DATA", grp);
        } else {
            console.log("not sequence", sortedNumbers);
        }
    }
    validateRulesetOfColor(totalCards, containerName, validateData){
        this.grp1Data = [];
        this.grp2Data = [];
        if (this.cardNumbers.every(element => element === this.cardColors[0] || element === 'w') && this.cardNumbers.length == totalCards) {
            if (this.cardNumbers.every(element => element !== 's')) {
                if (containerName == "doublePhaseOneCardContainer") {
                    this.grp1Data = [];
                    if (this.oScene.isDeclarePhase == false) {
                        this.oScene.dp_yellow_ring_1.setVisible(true);
                        this.oScene.oPlayerManager.handleDeclareButtons();
                    }
                    for (let i = 0; i < validateData.list.length; i++) {
                        this.grp1Data.push({ nLabel: this.cardNumbers[i], eColor: this.cardColors[i], _id: this.cardIds[i] })
                    }
                }
                if (containerName == "doublePhaseTwoCardContainer") {
                    this.grp2Data = [];
                    if (this.oScene.isDeclarePhase == false) {
                        this.oScene.dp_yellow_ring_2.setVisible(true);
                        this.oScene.oPlayerManager.handleDeclareButtons();
                    }
                    for (let i = 0; i < validateData.list.length; i++) {
                        this.grp2Data.push({ nLabel: this.cardNumbers[i], eColor: this.cardColors[i], _id: this.cardIds[i] })
                    }
                }
            }
        }


    }

    validateSkipCard(cardData) {
        this.oScene.oSocketManager.emit('reqSkipUser', { 'iCardId': cardData.__CardPreset.cardId, 'iUserId': this.oScene.secondPlayerId });

        cardData.destroy();
    }

}