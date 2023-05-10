class InputManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.oScene.oTweenManager = oScene.oTweenManager;

        // Start Code from Below here

        //Closed Card Deck
        this.oScene.closedCardDeck.setInteractive().on('pointerdown', () => {
            // console.log("isOwn::", this.oScene.oGameManager.isOwnTurn)
            if (this.oScene.oGameManager.isOwnTurn == true) {
                if (this.oScene.oGameManager.isGrabCard == false) {
                    this.oScene.oSocketManager.emit('reqClosedCard', {}, (error, response) => {
                        console.log("responce", response,"error", error);
                        if (response.length > this.oScene.playerHandContainer.length && this.oScene.oGameManager.isGrabCard == false) {
                            this.oScene.oPlayerHand.getNewCardData(response[response.length - 1]);
                            this.oScene.oGameManager.isGrabCard = true;
                            this.oScene.oGameManager.isGrabCardCloseDake = true;
                            for (let i = 0; i < this.oScene.discardDeckContainer.list.length; i++) {
                                this.oScene.discardDeckContainer.list[i].disableInteractive();
                            }
                        }
                    });
                }
            }
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
            if (this.oScene.menuContainer.visible) {
                this.oScene.menuContainer.visible = false;
            } else {
                this.oScene.menuContainer.visible = true;
            }

        });
        this.oScene.refreshIcon.setInteractive().on('pointerdown', () => {
            if (this.oScene.refreshTablePopup.visible) return;
            this.oScene.menuContainer.setVisible(false);
            this.oScene.oTweenManager.openPopUp(this.oScene.refreshTablePopup);
        });
        this.oScene.exitIcon.setInteractive().on('pointerdown', () => {
            if (this.oScene.leaveTablePopup.visible) return;
            this.oScene.menuContainer.setVisible(false);
            this.oScene.oTweenManager.openPopUp(this.oScene.leaveTablePopup);
        });

        this.oScene.yesLeaveBtn.setInteractive().on('pointerdown', () => {
            this.oScene.oSocketManager.emit('reqLeave', { iTableId: this.oScene.oSocketManager.iTableId });
            window.close();
        });

        this.oScene.cancleRefreshBtn.setInteractive().on('pointerdown', () => {
            this.oScene.oTweenManager.closePopUp(this.oScene.refreshTablePopup);
        })
        this.oScene.cancleLeaveBtn.setInteractive().on('pointerdown', () => {
            this.oScene.oTweenManager.closePopUp(this.oScene.leaveTablePopup);
        })

        this.oScene.transparentLayer.setInteractive();

    }
}