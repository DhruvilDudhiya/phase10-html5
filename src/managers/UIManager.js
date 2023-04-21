class UIManager {
    constructor(oScene) {
        this.oScene = oScene;
    }

    setPhaseContainer(oData) {
        if (oData.aRules.length == "2") {
            this.oScene.doublePhaseContainer.setVisible(true);
            this.oScene.singlePhaseContainer.setVisible(false);
        }
        else {
            this.oScene.singlePhaseContainer.setVisible(true);
            this.oScene.doublePhaseContainer.setVisible(false);
        }
    }

    setPlayerBoxes(nMaxPlayer) {
        this.oScene.nMaxPlayer = nMaxPlayer;
        if (nMaxPlayer == 2) {
            this.oScene.twoPlayerContainer.setVisible(true);
        }
        else {
            this.oScene.threePlayerContainer.setVisible(true);
        }
    }

    setPhaseData(phaseData) {
        this.oScene.oGameManager.nCurrentPhase = phaseData.nCurrentPhase;
        this.oScene.oGameManager.nTotalPhasesCount = phaseData.nTotalPhasesCount;
        this.oScene.totalPhasesText.setText("PHASE " + phaseData.nCurrentPhase + "/" + phaseData.nTotalPhasesCount);
        if (phaseData.aRules.length == 2) {
            this.oScene.oGameManager.phaseOneType = phaseData.aRules[0].sRuleType.toUpperCase();
            this.oScene.oGameManager.phaseOneTotalCards = phaseData.aRules[0].nNumberOfCards.toString().toUpperCase();
            this.oScene.phaseOneText.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " OF " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());

            this.oScene.oGameManager.phaseTwoType = phaseData.aRules[1].sRuleType.toUpperCase();
            this.oScene.oGameManager.phaseTwoTotalCards = phaseData.aRules[1].nNumberOfCards.toString().toUpperCase();
            this.oScene.phaseTwoText.setText(phaseData.aRules[1].sRuleType.toUpperCase() + " OF " + phaseData.aRules[1].nNumberOfCards.toString().toUpperCase());
        }
        else {
            this.oScene.oGameManager.phaseOneType = phaseData.aRules[0].sRuleType.toUpperCase();
            this.oScene.oGameManager.phaseOneTotalCards = phaseData.aRules[0].nNumberOfCards.toString().toUpperCase();
            this.oScene.phaseMiddleText.setText(phaseData.aRules[0].sRuleType.toUpperCase() + " OF " + phaseData.aRules[0].nNumberOfCards.toString().toUpperCase());
        }
    }

    startRoundTimer(roundTimerData) {
        if (roundTimerData.value > 0) {
            this.oScene.waitingPopupContainer.setVisible(true);
            this.oScene.transparentLayer.setVisible(true);
            this.oScene.popUpText.setText("ROUND WILL START IN " + roundTimerData.value + " SECONDS.");
        }
        else {
            this.oScene.waitingPopupContainer.setVisible(false);
            this.oScene.transparentLayer.setVisible(false);
        }
    }
}