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
        switch (containerName) {
            case "doublePhaseOneCardContainer":
                this.checkRulesetCondition(this.oScene.oGameManager.phaseOneType, this.oScene.oGameManager.phaseOneTotalCards, containerName, validateData);
                break;

            case "doublePhaseTwoCardContainer":
                this.checkRulesetCondition(this.oScene.oGameManager.phaseTwoType, this.oScene.oGameManager.phaseTwoTotalCards, containerName, validateData);
                break;

            //Extra Case for Single Phase || Container to be added in GameUI
        }
    }

    checkRulesetCondition(ruleType, totalCards, containerName, validateData) {
        switch (ruleType) {
            case "SET":
                this.validateRulesetOfSet(totalCards, containerName, validateData);
                break;

            case "RUN":
                this.validateRulesetOfRun(totalCards, containerName, validateData);
                break;

        }
    }

    validateRulesetOfSet(totalCards, containerName, validateData) {
        this.cardNumbers.sort();
        if (this.cardNumbers.every(element => element === this.cardNumbers[0] || element === 'w') && this.cardNumbers.length == totalCards) {
            if (containerName == "doublePhaseOneCardContainer") {
                this.grp1Data = [];
                if(this.oScene.isDeclarePhase == false){
                    this.preValidateofSetOne();
                }else{
                    
                }
                for (let i = 0; i < validateData.list.length; i++) {
                    this.grp1Data.push({ nLabel: this.cardNumbers[i], eColor: this.cardIds[i], _id: this.cardIds[i] })
                }
            }
            if (containerName == "doublePhaseTwoCardContainer") {
                this.grp2Data = [];
                if(this.oScene.isDeclarePhase == false){
                    this.preValidateofSetTwo();
                }else{
                 
                }
                for (let i = 0; i < validateData.list.length; i++) {
                    this.grp2Data.push({ nLabel: this.cardNumbers[i], eColor: this.cardIds[i], _id: this.cardIds[i] })
                }
            }
        }
    }

    preValidateofSetOne() {
        this.oScene.dp_yellow_ring_1.setVisible(true);
        this.oScene.oPlayerManager.handleDeclareButtons();
    }
    preValidateofSetTwo() {
        this.oScene.dp_yellow_ring_2.setVisible(true);
        this.oScene.oPlayerManager.handleDeclareButtons();
    }
    validateRulesetOfRun(totalCards, containerName) {
        this.cardNumbers.sort((a, b) => {
            if (a === 'w') return 1;
            if (b === 'w') return -1;
            return a - b;
        });

        let run = [];
        let wildcardCount = 0;
        for (let i = 0; i < this.cardNumbers.length; i++) {
            if (this.cardNumbers[i] === 'w') {
                wildcardCount++;
                continue;
            }
            let cardNum = this.cardNumbers[i];
            if (run.length === 0) {
                run.push(cardNum);
            } else {
                let lastNum = run[run.length - 1];
                if (lastNum === 'w') {
                    run.pop();
                    wildcardCount--;
                    run.push(cardNum);
                } else if (wildcardCount > 0) {
                    run.push('w');
                    wildcardCount--;
                    i--;
                }
                else {
                    for (let j = 0; j <= this.cardNumbers.length - 1; j++) {
                        if (parseInt(cardNum) === parseInt(lastNum) + j) {
                            run.push(cardNum);
                        }
                    }
                }
            }
        }

        while (wildcardCount > 0) {
            run.push('w');
            wildcardCount--;
        }

        if (this.cardNumbers.length == run.length == totalCards.length) {
            if (containerName == "doublePhaseOneCardContainer") {
                this.oScene.dp_yellow_ring_1.setVisible(true);
                this.oScene.oPlayerManager.handleDeclareButtons()
            }
            if (containerName == "doublePhaseTwoCardContainer") {
                this.oScene.dp_yellow_ring_2.setVisible(true);
                this.oScene.oPlayerManager.handleDeclareButtons()
            }
        }
    }
}