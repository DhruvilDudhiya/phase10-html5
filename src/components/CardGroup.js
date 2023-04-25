
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class CardGroup {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__CardGroup"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.

		/* END-USER-CTR-CODE */
	}

	/** @returns {CardGroup} */
	static getComponent(gameObject) {
		return gameObject["__CardGroup"];
	}

	/** @type {Phaser.GameObjects.Container} */
	gameObject;

	/* START-USER-CODE */

	// Write your code here.
	getCardGroupChildren() {
		for(var i = 0; i < this.gameObject.length; i++) {
			var lengthOfHand = this.gameObject.getAll().length;
        	var centerGap = 0;
        	var cardGap = 40;
			if(Number.isInteger(lengthOfHand) && !isNaN(lengthOfHand)) {
				centerGap = cardGap / 2;
			}
			var nFirstCardPosition = ((lengthOfHand / 2) - 1) * -cardGap;
			this.gameObject.getAll().forEach(card => {
				card.setPosition(nFirstCardPosition - centerGap, 0);
				nFirstCardPosition += cardGap;
			});
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
