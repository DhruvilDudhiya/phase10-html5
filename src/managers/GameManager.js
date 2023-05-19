class GameManager {
	constructor(oScene) {
		this.oScene = oScene;

        // Start Code from Below here
        // Color of Cards Holder
        this.bCard = Phaser.Display.Color.HexStringToColor("#0071CC").color; //Blue Card
		this.gCard = Phaser.Display.Color.HexStringToColor("#309A40").color; //Green Card
		this.rCard = Phaser.Display.Color.HexStringToColor("#EB0028").color; //Red Card
		this.yCard = Phaser.Display.Color.HexStringToColor("#F8CA00").color; //Yellow Card

		// Special Card Names in Backend
		this.wildCard = "w"; //Wild Card
		this.skipCard = "s"; //Skip Card

		//Set Ruleset Condition
		this.phaseOneType = "";
		this.phaseOneTotalCards = "";
		this.phaseTwoType = "";
		this.phaseTwoTotalCards = "";
		this.isOwnTurn = false;
		this.isGrabCard = false;
		this.isGrabCardCloseDake = false;
		this.ownPly = false;
		this.opponetPly = false;
		this.onePhaseContainer = false;
		this.opponetPlayer2Grp1 = false;
		this.opponetPlayer3Grp1 = false;
		this.opponetPlayer2Grp2 = false;
		this.opponetPlayer3Grp2 = false;
		this.whichPlayer = undefined;
		
		this.nCurrentPhase = 0;
		this.nTotalPhasesCount = 0;
		this.phaseRules = 0;
		this.nNumberOfRules = 0;

		this.twoPlayerNumberOfRules = 0;
		this.threePlayer1NumberOfRules = 0;
		this.threePlayer2NumberOfRules = 0;
	}
	
	resetPhaseData() {
		//Set Ruleset Condition
		this.phaseOneType = "";
		this.phaseOneTotalCards = "";
		this.phaseTwoType = "";
		this.phaseTwoTotalCards = "";
		
		this.nCurrentPhase = 0;
		this.nTotalPhasesCount = 0;
		this.phaseRules = 0;
		this.nNumberOfRules = 0;

		this.twoPlayerNumberOfRules = 0;
		this.threePlayer1NumberOfRules = 0;
		this.threePlayer2NumberOfRules = 0;
	}
}