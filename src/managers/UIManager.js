class UIManager {
    constructor(oScene) {
        this.oScene = oScene;
    }

    setPhaseContainer(oData) {
        this.oScene.oGameManager.phaseRules = oData.aRules.length; 
        if (oData.aRules.length == "2") {
            this.oScene.doublePhaseContainer.setVisible(true);
            this.oScene.singlePhaseContainer.setVisible(false);
        }
        else {
            this.oScene.singlePhaseContainer.setVisible(true);
            this.oScene.doublePhaseContainer.setVisible(false);
            this.oScene.twoPlayer2Box.setTexture("single-phase-2");
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