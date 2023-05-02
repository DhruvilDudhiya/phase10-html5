class InputManager {
    constructor(oScene) {
        this.oScene = oScene;

        // Start Code from Below here

        //Closed Card Deck
        this.oScene.closedCardDeck.setInteractive().on('pointerdown', () => {
            console.log("isOwn::",this.oScene.oGameManager.isOwnTurn)
            if (this.oScene.oGameManager.isOwnTurn == true) {
                if(this.oScene.oGameManager.isGrabCard == false){
                    this.oScene.oSocketManager.emit('reqClosedCard', {}, (error, response) => {
                        if (response.length > this.oScene.playerHandContainer.length) {
                            this.oScene.oPlayerHand.getNewCardData(response[response.length - 1]);
                            this.oScene.oGameManager.isGrabCard = true;
                        }
                    });
                }
                    
            }
        });

        //Opened Card Deck
        // this.oScene.openedCardDeck.setInteractive().on('pointerdown', () => {
        //     console.log("clicked");
        //     this.oScene.oSocketManager.emit('reqOpenedCard', { nLabel :this.currentOwnCardLabel ,eColor :this.currentOwnCardColor ,_id :this.currentOwnCardId  ,iUserId : this.oScene.ownPlayerId }, (error, response) => {
        //         console.log("resOpenedCard ::1 ", response, error); //reqOpenedCard
        //         if (response.length > this.oScene.playerHandContainer.length) {
        //             this.oScene.oPlayerHand.getNewCardData(response[response.length - 1]);
        //         }
        //     });
        // });

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