class UIManager {
    constructor(oScene) {
        this.oScene = oScene;
    }

    setPhaseContainer(oData) {
        if(this.oScene.nMaxPlayer === 2){
            if (oData.aRules.length == 2) {
                if(this.oScene.secondPlayerId == oData.iUserId){
                    console.log("Player");
                    this.oScene.twoPlayer2Box.setTexture("player-2-box");
                }
            }  else if (oData.aRules.length == 1){
                if(this.oScene.secondPlayerId == oData.iUserId){
                    this.oScene.twoPlayer2Box.setTexture("single-phase-2");
                }
            }
        }
        else if(this.oScene.nMaxPlayer === 3){
            if (oData.aRules.length == 2) {
                if(this.oScene.secondPlayerId == oData.iUserId){
                    this.oScene.threePlayer2Box.setTexture("player-2-box");
                }
                else if(this.oScene.thirdPlayerId == oData.iUserId){
                    this.oScene.threePlayer3Box.setTexture("player-3-box");
                }
            }  else if (oData.aRules.length == 1){
                if(this.oScene.secondPlayerId == oData.iUserId){
                    this.oScene.threePlayer2Box.setTexture("single-phase-2");
                }
                else if(this.oScene.thirdPlayerId == oData.iUserId){
                    this.oScene.threePlayer3Box.setTexture("single-phase-3");
                }
            }
        }
    }

    setPlayerBoxes(nMaxPlayer) {
        this.oScene.nMaxPlayer = nMaxPlayer;
        if (nMaxPlayer == 2) {
            this.oScene.twoPlayerContainer.setVisible(true);
            this.oScene.threePlayerContainer.setVisible(false);
        }
        else {
            this.oScene.twoPlayerContainer.setVisible(false);
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