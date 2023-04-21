class InputManager {
    constructor(oScene) {
        this.oScene = oScene;

        // Start Code from Below here

        //Closed Card Deck
        this.oScene.closedCardDeck.setInteractive().on('pointerdown', () => {
            this.oScene.oSocketManager.emit('reqClosedCard', {}, (error, response) => {
                console.log("resClosedCard :: ", response, error);
                if (response.length > this.oScene.playerHandContainer.length) {
                    this.oScene.oPlayerHand.getNewCardData(response[response.length - 1]);
                }
            });
        });

        //Opened Card Deck
        this.oScene.openedCardDeck.setInteractive().on('pointerdown', () => {
            this.oScene.oSocketManager.emit('reqOpenedCard', {}, (error, response) => {
                console.log("resOpenedCard :: ", response, error);
                if (response.length > this.oScene.playerHandContainer.length) {
                    this.oScene.oPlayerHand.getNewCardData(response[response.length - 1]);
                }
            });
        });
       
        this.oScene.soundOnBtn.setInteractive().on('pointerdown', () => {
            if (this.oScene.soundOnBtn.visible) {
                this.oScene.soundOffBtn.visible = true;
                this.oScene.soundOnBtn.visible = false;
            }
        });
        this.oScene.soundOffBtn.setInteractive().on('pointerdown', () => {
            if (this.oScene.soundOffBtn.visible) {
                this.oScene.soundOnBtn.visible = true;
                this.oScene.soundOffBtn.visible = false;
            }
        });
        this.oScene.btn_settings.setInteractive().on('pointerdown', () => {
            if (this.oScene.manuContainer.visible) {
                this.oScene.manuContainer.visible = false;
            } else {
                this.oScene.manuContainer.visible = true;
            }

        });
        this.oScene.refreshIcon.setInteractive().on('pointerdown', () => {
            this.oScene.refreshTablePopup.visible = true;
        });
        this.oScene.exitIcon.setInteractive().on('pointerdown', () => {
            this.oScene.leaveTablePopup.visible = true;
        });
          

    }
}