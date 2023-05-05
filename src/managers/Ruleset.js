class Ruleset {
    constructor(oScene) {
        this.oScene = oScene;
        this.sendCardData = [];
        this.grp1Data = []
        this.grp2Data = []
        this.hitCardsData = []
    }

    validateRuleset(validateData) {
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
        }
    }

    checkRulesetContainer(containerName, validateData) {
        if (containerName == 'doublePhaseOneCardContainer') {
            this.checkRulesetCondition(this.oScene.oGameManager.phaseOneType, this.oScene.oGameManager.phaseOneTotalCards, containerName, validateData);
        }
        if (containerName == 'doublePhaseTwoCardContainer') {
            this.checkRulesetCondition(this.oScene.oGameManager.phaseTwoType, this.oScene.oGameManager.phaseTwoTotalCards, containerName, validateData);
        }
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
    validateRulesetOfRun(totalCards, containerName) {
        console.log("")
        let copy = this.cardNumbers;
        let wildArr = [];
        let count = 0;
        let t = 0;

        wildArr = this.cardNumbers.filter((a) => a !== "w").sort((a, b) => a - b);
        let c = this.cardNumbers.length - wildArr.length;
        let temp = c;
        this.cardNumbers = [];
        let data = 0;
        for (let i = 0; i < wildArr.length - 1; i++) {
            data = wildArr[i];
            count = ((wildArr[i + 1] - wildArr[i]) - 1);
            t += count;
            while (count--) {
                if (c != 0) {
                    this.cardNumbers.push(++data);
                    c--;
                }
                else {
                    break;
                }
            }
        }
        while (c--) {
            this.cardNumbers.push(wildArr[wildArr.length - 1]++);
        }

        t = 0;
        for (let i = 0; i < wildArr.length - 1; i++) {
            count = ((wildArr[i + 1] - wildArr[i]) - 1);
            t += count;
        }

        wildArr.push(...this.cardNumbers);
        wildArr.sort((a, b) => a - b);

        if (temp >= t) {
            this.grp2Data = [];
            for (let i = 0; i < copy.length; i++) {
                if (copy[i] == "w") {
                    this.grp2Data.push({ nLabel: 13, eColor: this.cardColors[i], _id: this.cardIds[i] })
                }
                else {
                    this.grp2Data.push({ nLabel: copy[i], eColor: this.cardColors[i], _id: this.cardIds[i] })
                }
            }
            this.oScene.dp_yellow_ring_2.setVisible(true);
            this.oScene.oPlayerManager.handleDeclareButtons()
        }

        // if (this.cardNumbers.length == this.run.length == totalthis.cardNumbers.length) {
        //     if (containerName == "doublePhaseOneCardContainer") {
        //         this.oScene.dp_yellow_ring_1.setVisible(true);
        //         this.oScene.oPlayerManager.handleDeclareButtons()
        //     }
        //     if (containerName == "doublePhaseTwoCardContainer") {
        //         this.oScene.dp_yellow_ring_2.setVisible(true);
        //         this.oScene.oPlayerManager.handleDeclareButtons()
        //     }
        // }
    }

    validateSkipCard(cardData) {
        this.oScene.oSocketManager.emit('reqSkipUser', { 'iCardId': cardData.__CardPreset.cardId , 'iUserId': this.oScene.secondPlayerId });
        cardData.destroy();
    }

    
}