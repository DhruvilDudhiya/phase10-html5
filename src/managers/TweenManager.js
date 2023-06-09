class TweenManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.cards = [];
    }

    startDeckDiscardSeparation() {
        this.oScene.tweens.add({
            targets: this.oScene.closedCardDeck,
            x: this.oScene.closedCardDeck.x + 180,
            duration: 500,
            ease: 'Power2',
        });
        this.oScene.tweens.add({
            targets: this.oScene.openedCardDeck,
            x: this.oScene.openedCardDeck.x - 180,
            duration: 500,
            ease: 'Power2',
        });
    }

    skipPlayerTurnAnim(target) {
        this.oScene.skipPlayerTurnContainer.setPosition(target.x, target.y);
        this.oScene.skipPlayerTurnContainer.setDepth(100);
        this.oScene.skipPlayerTurnContainer.setScale(0);
        this.oScene.skipPlayerTurnContainer.visible = true;
        this.oScene.tweens.add({
            targets: this.oScene.skipPlayerTurnContainer,
            scaleX: 1,
            scaleY: 1,
            duration : 500,
            ease : 'Power4',
            completeDelay: 1500,
            onComplete: () => {
                this.oScene.skipPlayerTurnContainer.visible = false;
            }
        })
    }

    startHighCardsDistribution(card, targetPosX, targetPosY) {
        this.oScene.tweens.add({
            targets: card,
            x: targetPosX,
            y: targetPosY,
            duration: 600,
            ease: 'Power2',
        });
    }

    openPopUp(oTarget) {
        this.oScene.transparentLayer.setVisible(true);
        oTarget.visible = true
        oTarget.scaleX = 0;
        this.oScene.tweens.add({
            targets: oTarget,
            scaleX: 1,
            scaleY: 1,
            duration: 400,
            ease: 'Power4',
        })
    }

    closePopUp(oTarget) {
        this.oScene.transparentLayer.setVisible(false);
        this.oScene.tweens.add({
            targets: oTarget,
            scaleX: 0,
            duration: 400,
            ease: 'Power4',
            completeDelay: 1000,
            onComplete: () => {
                oTarget.visible = false
                oTarget.setScale(1);
            }
        })
    }



    startHandCardsDistribution(data) {
        // this.oScene.closedCardDeck.visible = true;
        let completeCount = 0;
        var self = this;
        for (var i = 0; i < 20; i++) {
            this.cards[i] = this.oScene.add.image(540, 875, 'main-cards-deck');
        }
        for (var j = 0; j < 20; j++) {
            if (j % 2 == 0) {
                this.oScene.tweens.add({
                    targets: this.cards[j],
                    x: 220 + j * 35.5,
                    y: 1580,
                    scaleX: { from: 1, to: 2, from: 2, to: 1.2 },
                    scaleY: { from: 1, to: 2, from: 2, to: 1.2 },
                    ease: 'Power4',
                    duration: 800,
                    delay: (j * 100),
                });
            }
            else {
                this.oScene.tweens.add({
                    targets: this.cards[j],
                    x: 540,
                    y: 250,
                    scaleX: { from: 1, to: 2, from: 2, to: 1.2 },
                    scaleY: { from: 1, to: 2, from: 2, to: 1.2 },
                    ease: 'Power4',
                    alpha: 0,
                    duration: 800,
                    delay: (j * 100),
                });
            }
        }

        for (let j = 0; j < 20; j++) {

            if (j % 2 == 0) {
                this.oScene.tweens.add({
                    targets: this.cards[j],
                    ease: 'Power2',
                    scaleX: 0,
                    scaleY: 1.1,
                    duration: 300,
                    delay: 3000,
                    flipX: true,
                    onComplete: () => {
                        this.cards[j].destroy();
                        if (j == 18) {
                            self.startDeckDiscardSeparation();
                            self.oScene.playerHandContainer.setVisible(true);
                            self.oScene.oPlayerHand.getHandData(data);
                        }
                    }
                });
            }

        }

    }
}