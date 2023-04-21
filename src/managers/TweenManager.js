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

    startHighCardsDistribution(card, targetPosX, targetPosY) {
        this.oScene.tweens.add({
            targets: card,
            x: targetPosX,
            y: targetPosY,
            duration: 600,
            ease: 'Power2',
        });
    }

    startHandCardsDistribution() {
        for(var i = 0; i < 20; i++) {
            this.cards[i] = this.oScene.add.image(540, 875, 'main-cards-deck');
        }

        for(var j = 0; j < 20; j++) {
            if(j % 2 == 0) {
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

        for (var j = 0; j < 20; j++) {
            if(j % 2 == 0) {
                this.oScene.tweens.add({
                    targets: this.cards[j],
                    scaleX: 0,
                    scaleY: 1.1,
                    duration: 300,
                    delay: 3200,
                    flipX: true,
                    onComplete: () => {
                        this.startDeckDiscardSeparation();
                        this.oScene.playerHandContainer.setVisible(true);
                    }
                });
            }
		}
    }
}