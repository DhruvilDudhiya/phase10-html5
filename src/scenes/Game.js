
// You can write more code here

/* START OF COMPILED CODE */

class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// backgroundImage
		const backgroundImage = this.add.container(0, 2);

		// background
		const background = this.add.image(540, 960, "background");
		backgroundImage.add(background);

		// discardDeckContainer
		const discardDeckContainer = this.add.container(0, 1);

		// openedCardDeck
		const openedCardDeck = this.add.image(540, 875, "cardHolder");
		discardDeckContainer.add(openedCardDeck);

		// closedCardDeck
		const closedCardDeck = this.add.image(540, 875, "main-cards-deck");
		discardDeckContainer.add(closedCardDeck);

		// footerContainer
		const footerContainer = this.add.container(0, 0);

		// footer
		const footer = this.add.image(540, 1816.5, "footer");
		footerContainer.add(footer);

		// btn_settings
		const btn_settings = this.add.image(80, 1860, "btn-settings");
		footerContainer.add(btn_settings);

		// btn_shuffle
		const btn_shuffle = this.add.image(1000, 1860, "btn-shuffle");
		footerContainer.add(btn_shuffle);

		// body
		const body = this.add.container(0, 1);

		// phaseContainer
		const phaseContainer = this.add.container(0, 1);
		body.add(phaseContainer);

		// doublePhaseContainer
		const doublePhaseContainer = this.add.container(0, 0);
		doublePhaseContainer.visible = false;
		phaseContainer.add(doublePhaseContainer);

		// double_phase
		const double_phase = this.add.image(540, 1210, "double-phase");
		doublePhaseContainer.add(double_phase);

		// dp_yellow_ring_1
		const dp_yellow_ring_1 = this.add.image(291, 1220, "yellow-ring");
		dp_yellow_ring_1.visible = false;
		doublePhaseContainer.add(dp_yellow_ring_1);

		// dp_yellow_ring_2
		const dp_yellow_ring_2 = this.add.image(796, 1216, "yellow-ring");
		dp_yellow_ring_2.visible = false;
		doublePhaseContainer.add(dp_yellow_ring_2);

		// doublePhaseTwoCardContainer
		const doublePhaseTwoCardContainer = this.add.container(795, 1220);
		doublePhaseTwoCardContainer.name = "doublePhaseTwoCardContainer";
		doublePhaseContainer.add(doublePhaseTwoCardContainer);

		// doublePhaseOneCardContainer
		const doublePhaseOneCardContainer = this.add.container(285, 1220);
		doublePhaseOneCardContainer.name = "doublePhaseOneCardContainer";
		doublePhaseContainer.add(doublePhaseOneCardContainer);

		// singlePhaseContainer
		const singlePhaseContainer = this.add.container(0, 0);
		singlePhaseContainer.visible = false;
		phaseContainer.add(singlePhaseContainer);

		// single_phase
		const single_phase = this.add.image(540, 1210, "single-phase");
		singlePhaseContainer.add(single_phase);

		// sp_yellow_ring
		const sp_yellow_ring = this.add.image(540, 1215, "yellow-ring-single");
		sp_yellow_ring.visible = false;
		singlePhaseContainer.add(sp_yellow_ring);

		// phaseTextContainer
		const phaseTextContainer = this.add.container(0, 0);
		phaseContainer.add(phaseTextContainer);

		// totalPhasesText
		const totalPhasesText = this.add.text(540, 1340, "", {});
		totalPhasesText.setOrigin(0.5, 0.5);
		totalPhasesText.setStyle({ "align": "center", "fixedWidth":200,"fontFamily": "CHICKEN PIE Height", "fontSize": "32px", "fontStyle": "bold" });
		phaseTextContainer.add(totalPhasesText);

		// phaseOneText
		const phaseOneText = this.add.text(286, 1070, "", {});
		phaseOneText.setOrigin(0.5, 0.5);
		phaseOneText.setStyle({ "align": "center", "fixedWidth":450,"fontFamily": "CHICKEN PIE Height", "fontSize": "40px", "fontStyle": "bold" });
		phaseTextContainer.add(phaseOneText);

		// phaseTwoText
		const phaseTwoText = this.add.text(794, 1070, "", {});
		phaseTwoText.setOrigin(0.5, 0.5);
		phaseTwoText.setStyle({ "align": "center", "fixedWidth":450,"fontFamily": "CHICKEN PIE Height", "fontSize": "40px", "fontStyle": "bold" });
		phaseTextContainer.add(phaseTwoText);

		// phaseMiddleText
		const phaseMiddleText = this.add.text(540, 1070, "", {});
		phaseMiddleText.setOrigin(0.5, 0.5);
		phaseMiddleText.setStyle({ "align": "center", "fixedWidth":450,"fontFamily": "CHICKEN PIE Height", "fontSize": "40px", "fontStyle": "bold" });
		phaseTextContainer.add(phaseMiddleText);

		// confirmButton
		const confirmButton = this.add.image(795, 1400, "btn-confirm");
		confirmButton.visible = false;
		phaseContainer.add(confirmButton);

		// cancelButton
		const cancelButton = this.add.image(285, 1400, "btn-cancel");
		cancelButton.visible = false;
		phaseContainer.add(cancelButton);

		// threePlayerContainer
		const threePlayerContainer = this.add.container(0, 1);
		threePlayerContainer.visible = false;
		body.add(threePlayerContainer);

		// threePlayer2Container
		const threePlayer2Container = this.add.container(0, 0);
		threePlayerContainer.add(threePlayer2Container);

		// threePlayer2Box
		const threePlayer2Box = this.add.image(285, 385, "player-2-box");
		threePlayer2Container.add(threePlayer2Box);

		// threePlayer3Container
		const threePlayer3Container = this.add.container(0, 0);
		threePlayerContainer.add(threePlayer3Container);

		// threePlayer3Box
		const threePlayer3Box = this.add.image(825, 385, "player-3-box");
		threePlayer3Container.add(threePlayer3Box);

		// twoPlayerContainer
		const twoPlayerContainer = this.add.container(-1, 1);
		twoPlayerContainer.visible = false;
		body.add(twoPlayerContainer);

		// twoPlayer2Container
		const twoPlayer2Container = this.add.container(1, 1);
		twoPlayerContainer.add(twoPlayer2Container);

		// twoPlayer2Box
		const twoPlayer2Box = this.add.image(540, 385, "player-2-box");
		twoPlayer2Container.add(twoPlayer2Box);

		// secondPlayerUserNameText
		const secondPlayerUserNameText = this.add.text(479, 300, "", {});
		secondPlayerUserNameText.setOrigin(0.5, 0.5);
		secondPlayerUserNameText.text = "Harsh";
		secondPlayerUserNameText.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "28px", "fontStyle": "bold" });
		twoPlayer2Container.add(secondPlayerUserNameText);

		// secondPlayerScoreText
		const secondPlayerScoreText = this.add.text(479, 332, "", {});
		secondPlayerScoreText.setOrigin(0.5, 0.5);
		secondPlayerScoreText.text = "0";
		secondPlayerScoreText.setStyle({ "align": "center", "color": "#f8ca00", "fontFamily": "CHICKEN Pie Height", "fontSize": "22px", "fontStyle": "bold" });
		twoPlayer2Container.add(secondPlayerScoreText);

		// ownPlayerContainer
		const ownPlayerContainer = this.add.container(0, -1);
		body.add(ownPlayerContainer);

		// ownPlayerUserNameText
		const ownPlayerUserNameText = this.add.text(538, 1880, "", {});
		ownPlayerUserNameText.setOrigin(0.5, 0.5);
		ownPlayerUserNameText.text = "YOU";
		ownPlayerUserNameText.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "40px", "fontStyle": "bold" });
		ownPlayerContainer.add(ownPlayerUserNameText);

		// ownPlayerScoreText
		const ownPlayerScoreText = this.add.text(650, 1880, "", {});
		ownPlayerScoreText.setOrigin(0.5, 0.5);
		ownPlayerScoreText.text = "0";
		ownPlayerScoreText.setStyle({ "align": "center", "color": "#f8ca00", "fontFamily": "CHICKEN Pie Height", "fontSize": "22px", "fontStyle": "bold" });
		ownPlayerContainer.add(ownPlayerScoreText);

		// playerHandContainer
		const playerHandContainer = this.add.container(540, 1580);
		playerHandContainer.name = "playerHandContainer";
		playerHandContainer.scaleX = 1.2;
		playerHandContainer.scaleY = 1.2;
		playerHandContainer.visible = false;

		// tempCardContainer
		const tempCardContainer = this.add.container(0, 2);

		// playersContainer
		const playersContainer = this.add.container(0, 3);

		// popupContainer
		const popupContainer = this.add.container(0, 0);

		// transparentLayer
		const transparentLayer = this.add.image(540, 959, "transparent-layer");
		transparentLayer.visible = false;
		popupContainer.add(transparentLayer);

		// waitingPopupContainer
		const waitingPopupContainer = this.add.container(540, 958);
		waitingPopupContainer.visible = false;
		popupContainer.add(waitingPopupContainer);

		// popup
		const popup = this.add.image(0, 1, "popup");
		waitingPopupContainer.add(popup);

		// popUpText
		const popUpText = this.add.text(0, 0, "", {});
		popUpText.setOrigin(0.5, 0.5);
		popUpText.text = "WAITING FOR OTHER PLAYERS...";
		popUpText.setStyle({ "align": "center", "fontFamily": "Comica_BD", "fontSize": "28px" });
		waitingPopupContainer.add(popUpText);

		// leaveTablePopup
		const leaveTablePopup = this.add.container(298, 873);
		leaveTablePopup.visible = false;
		popupContainer.add(leaveTablePopup);

		// popupLeave
		const popupLeave = this.add.image(240, 26, "Asset 3@2x");
		popupLeave.scaleX = 0.62;
		popupLeave.scaleY = 0.7;
		leaveTablePopup.add(popupLeave);

		// yesLeaveBtn
		const yesLeaveBtn = this.add.image(8, 297, "Asset 6@2x");
		yesLeaveBtn.scaleX = 0.55;
		yesLeaveBtn.scaleY = 0.55;
		leaveTablePopup.add(yesLeaveBtn);

		// cancleLeaveBtn
		const cancleLeaveBtn = this.add.image(450, 294, "Asset 5@2x");
		cancleLeaveBtn.scaleX = 0.55;
		cancleLeaveBtn.scaleY = 0.55;
		leaveTablePopup.add(cancleLeaveBtn);

		// yesLeaveTxt
		const yesLeaveTxt = this.add.text(0, 297, "", {});
		yesLeaveTxt.setOrigin(0.5, 0.5);
		yesLeaveTxt.text = "YES";
		yesLeaveTxt.setStyle({ "fontSize": "60px" });
		leaveTablePopup.add(yesLeaveTxt);

		// noLeaveTxt
		const noLeaveTxt = this.add.text(451, 294, "", {});
		noLeaveTxt.setOrigin(0.5, 0.5);
		noLeaveTxt.text = "NO";
		noLeaveTxt.setStyle({ "fontSize": "60px" });
		leaveTablePopup.add(noLeaveTxt);

		// leaveTableTxt
		const leaveTableTxt = this.add.text(247, 0, "", {});
		leaveTableTxt.setOrigin(0.5, 0.5);
		leaveTableTxt.text = "Are you sure you want to\n   leave this table?";
		leaveTableTxt.setStyle({ "fontSize": "50px" });
		leaveTablePopup.add(leaveTableTxt);

		// refreshTablePopup
		const refreshTablePopup = this.add.container(298, 873);
		refreshTablePopup.visible = false;
		popupContainer.add(refreshTablePopup);

		// popuprefresh
		const popuprefresh = this.add.image(240, 26, "Asset 3@2x");
		popuprefresh.scaleX = 0.62;
		popuprefresh.scaleY = 0.7;
		refreshTablePopup.add(popuprefresh);

		// yesRefreshBtn
		const yesRefreshBtn = this.add.image(8, 297, "Asset 6@2x");
		yesRefreshBtn.scaleX = 0.55;
		yesRefreshBtn.scaleY = 0.55;
		refreshTablePopup.add(yesRefreshBtn);

		// cancleRefreshBtn
		const cancleRefreshBtn = this.add.image(450, 294, "Asset 5@2x");
		cancleRefreshBtn.scaleX = 0.55;
		cancleRefreshBtn.scaleY = 0.55;
		refreshTablePopup.add(cancleRefreshBtn);

		// yesRefreshTxt
		const yesRefreshTxt = this.add.text(0, 297, "", {});
		yesRefreshTxt.setOrigin(0.5, 0.5);
		yesRefreshTxt.text = "YES";
		yesRefreshTxt.setStyle({ "fontSize": "60px" });
		refreshTablePopup.add(yesRefreshTxt);

		// noRefreshTxt
		const noRefreshTxt = this.add.text(451, 294, "", {});
		noRefreshTxt.setOrigin(0.5, 0.5);
		noRefreshTxt.text = "NO";
		noRefreshTxt.setStyle({ "fontSize": "60px" });
		refreshTablePopup.add(noRefreshTxt);

		// refreshTableTxt
		const refreshTableTxt = this.add.text(247, 0, "", {});
		refreshTableTxt.setOrigin(0.5, 0.5);
		refreshTableTxt.text = "Are you sure you want to\n   leave this table?";
		refreshTableTxt.setStyle({ "fontSize": "50px" });
		refreshTablePopup.add(refreshTableTxt);

		// manuContainer
		const manuContainer = this.add.container(82, 1729);
		manuContainer.visible = false;

		// soundOffBtn
		const soundOffBtn = this.add.image(0, 0, "Asset 8@2x");
		soundOffBtn.scaleX = 0.3;
		soundOffBtn.scaleY = 0.3;
		soundOffBtn.visible = false;
		manuContainer.add(soundOffBtn);

		// soundOnBtn
		const soundOnBtn = this.add.image(2, 1, "Asset 7@2x");
		soundOnBtn.scaleX = 0.3;
		soundOnBtn.scaleY = 0.3;
		manuContainer.add(soundOnBtn);

		// refreshIcon
		const refreshIcon = this.add.image(-1, -87, "icons8-synchronize-50");
		refreshIcon.scaleX = 1.5;
		refreshIcon.scaleY = 1.5;
		manuContainer.add(refreshIcon);

		// exitIcon
		const exitIcon = this.add.image(-2, -175, "exit (1)");
		exitIcon.scaleX = 0.5;
		exitIcon.scaleY = 0.5;
		manuContainer.add(exitIcon);

		this.discardDeckContainer = discardDeckContainer;
		this.openedCardDeck = openedCardDeck;
		this.closedCardDeck = closedCardDeck;
		this.btn_settings = btn_settings;
		this.doublePhaseContainer = doublePhaseContainer;
		this.dp_yellow_ring_1 = dp_yellow_ring_1;
		this.dp_yellow_ring_2 = dp_yellow_ring_2;
		this.doublePhaseTwoCardContainer = doublePhaseTwoCardContainer;
		this.doublePhaseOneCardContainer = doublePhaseOneCardContainer;
		this.singlePhaseContainer = singlePhaseContainer;
		this.sp_yellow_ring = sp_yellow_ring;
		this.totalPhasesText = totalPhasesText;
		this.phaseOneText = phaseOneText;
		this.phaseTwoText = phaseTwoText;
		this.phaseMiddleText = phaseMiddleText;
		this.confirmButton = confirmButton;
		this.cancelButton = cancelButton;
		this.threePlayerContainer = threePlayerContainer;
		this.twoPlayerContainer = twoPlayerContainer;
		this.secondPlayerUserNameText = secondPlayerUserNameText;
		this.secondPlayerScoreText = secondPlayerScoreText;
		this.ownPlayerUserNameText = ownPlayerUserNameText;
		this.ownPlayerScoreText = ownPlayerScoreText;
		this.playerHandContainer = playerHandContainer;
		this.tempCardContainer = tempCardContainer;
		this.playersContainer = playersContainer;
		this.popupContainer = popupContainer;
		this.transparentLayer = transparentLayer;
		this.waitingPopupContainer = waitingPopupContainer;
		this.popUpText = popUpText;
		this.leaveTablePopup = leaveTablePopup;
		this.popupLeave = popupLeave;
		this.yesLeaveBtn = yesLeaveBtn;
		this.cancleLeaveBtn = cancleLeaveBtn;
		this.yesLeaveTxt = yesLeaveTxt;
		this.noLeaveTxt = noLeaveTxt;
		this.leaveTableTxt = leaveTableTxt;
		this.refreshTablePopup = refreshTablePopup;
		this.popuprefresh = popuprefresh;
		this.yesRefreshBtn = yesRefreshBtn;
		this.cancleRefreshBtn = cancleRefreshBtn;
		this.yesRefreshTxt = yesRefreshTxt;
		this.noRefreshTxt = noRefreshTxt;
		this.refreshTableTxt = refreshTableTxt;
		this.manuContainer = manuContainer;
		this.soundOffBtn = soundOffBtn;
		this.soundOnBtn = soundOnBtn;
		this.refreshIcon = refreshIcon;
		this.exitIcon = exitIcon;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	discardDeckContainer;
	/** @type {Phaser.GameObjects.Image} */
	openedCardDeck;
	/** @type {Phaser.GameObjects.Image} */
	closedCardDeck;
	/** @type {Phaser.GameObjects.Image} */
	btn_settings;
	/** @type {Phaser.GameObjects.Container} */
	doublePhaseContainer;
	/** @type {Phaser.GameObjects.Image} */
	dp_yellow_ring_1;
	/** @type {Phaser.GameObjects.Image} */
	dp_yellow_ring_2;
	/** @type {Phaser.GameObjects.Container} */
	doublePhaseTwoCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	doublePhaseOneCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	singlePhaseContainer;
	/** @type {Phaser.GameObjects.Image} */
	sp_yellow_ring;
	/** @type {Phaser.GameObjects.Text} */
	totalPhasesText;
	/** @type {Phaser.GameObjects.Text} */
	phaseOneText;
	/** @type {Phaser.GameObjects.Text} */
	phaseTwoText;
	/** @type {Phaser.GameObjects.Text} */
	phaseMiddleText;
	/** @type {Phaser.GameObjects.Image} */
	confirmButton;
	/** @type {Phaser.GameObjects.Image} */
	cancelButton;
	/** @type {Phaser.GameObjects.Container} */
	threePlayerContainer;
	/** @type {Phaser.GameObjects.Container} */
	twoPlayerContainer;
	/** @type {Phaser.GameObjects.Text} */
	secondPlayerUserNameText;
	/** @type {Phaser.GameObjects.Text} */
	secondPlayerScoreText;
	/** @type {Phaser.GameObjects.Text} */
	ownPlayerUserNameText;
	/** @type {Phaser.GameObjects.Text} */
	ownPlayerScoreText;
	/** @type {Phaser.GameObjects.Container} */
	playerHandContainer;
	/** @type {Phaser.GameObjects.Container} */
	tempCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	playersContainer;
	/** @type {Phaser.GameObjects.Container} */
	popupContainer;
	/** @type {Phaser.GameObjects.Image} */
	transparentLayer;
	/** @type {Phaser.GameObjects.Container} */
	waitingPopupContainer;
	/** @type {Phaser.GameObjects.Text} */
	popUpText;
	/** @type {Phaser.GameObjects.Container} */
	leaveTablePopup;
	/** @type {Phaser.GameObjects.Image} */
	popupLeave;
	/** @type {Phaser.GameObjects.Image} */
	yesLeaveBtn;
	/** @type {Phaser.GameObjects.Image} */
	cancleLeaveBtn;
	/** @type {Phaser.GameObjects.Text} */
	yesLeaveTxt;
	/** @type {Phaser.GameObjects.Text} */
	noLeaveTxt;
	/** @type {Phaser.GameObjects.Text} */
	leaveTableTxt;
	/** @type {Phaser.GameObjects.Container} */
	refreshTablePopup;
	/** @type {Phaser.GameObjects.Image} */
	popuprefresh;
	/** @type {Phaser.GameObjects.Image} */
	yesRefreshBtn;
	/** @type {Phaser.GameObjects.Image} */
	cancleRefreshBtn;
	/** @type {Phaser.GameObjects.Text} */
	yesRefreshTxt;
	/** @type {Phaser.GameObjects.Text} */
	noRefreshTxt;
	/** @type {Phaser.GameObjects.Text} */
	refreshTableTxt;
	/** @type {Phaser.GameObjects.Container} */
	manuContainer;
	/** @type {Phaser.GameObjects.Image} */
	soundOffBtn;
	/** @type {Phaser.GameObjects.Image} */
	soundOnBtn;
	/** @type {Phaser.GameObjects.Image} */
	refreshIcon;
	/** @type {Phaser.GameObjects.Image} */
	exitIcon;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
		this.instantiateSocketManager();
		this.oGameManager = new GameManager(this);
		this.phaseContainerOne = new CardGroup(this.doublePhaseOneCardContainer);
		this.phaseContainerTwo = new CardGroup(this.doublePhaseTwoCardContainer);
		this.oPlayerManager = new PlayerManager(this);
		this.oPlayerHand = new PlayerHand(this);
		this.oUIManager = new UIManager(this);
		this.oTweenManager = new TweenManager(this);
		this.oInputManager = new InputManager(this);
		this.oRuleset = new Ruleset(this);
		this.oPlayerPrefab = new PlayerPrefab(this);
		this.isDeclarePhase = false;
	}

	instantiateSocketManager() {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const eGameType = urlParams.get('eGameType');
		const authToken = urlParams.get('sAuthToken');
		const iTableId = urlParams.get('iTableId');
		const sRootURL = urlParams.get('sRootUrl');
		const nPracticeChips = urlParams.get('nPracticeChips');
		this.oSocketManager = new SocketManager(this, eGameType, authToken, iTableId, sRootURL, nPracticeChips);
	}
	sendPhaseData() {
		console.log("isDeclarePhase", this.isDeclarePhase);
		this.isDeclarePhase = true;
		this.oPlayerManager.handleDeclareButtonsVisibilityOFF();
		console.log("isDeclarePhase", this.isDeclarePhase);
		this.oSocketManager.oRootSocketConn.emit(this.oSocketManager.iTableId, { sEventName: 'reqDeclarePhase', oData: { nPhase: this.oGameManager.nCurrentPhase, aGroup_1: this.oRuleset.grp1Data, aGroup_2: this.oRuleset.grp2Data } }, (error, response) => {
			console.log("reqDeclarePhase :: ", response, error);
		});
	}
	sendDiscardCard(cardDiscard) {
		this.oSocketManager.oRootSocketConn.emit(this.oSocketManager.iTableId, { sEventName: 'reqDiscardCard', oData: { iCardId: cardDiscard } }, (error, response) => {
			console.log("reqDiscardCard :: ", response, error);
		});
	}
	sendHitCards(allCards, lastCard, agroups) {
		this.oSocketManager.oRootSocketConn.emit(this.oSocketManager.iTableId, { sEventName: 'reqHitCard', oData: { iUserId: this.ownPlayerId, cardId: lastCard, sGroup: agroups, aCardId: allCards } }, (error, response) => {
			console.log("reqHitCard :: ", response, error);
		});

	}
	changeScenes() {
		this.scene.start("ResultScreen");
	}
	setRoundOver() {

		this.isDeclarePhase = true;
		this.oPlayerHand.clearPlayerHandCard();
		this.oPlayerPrefab.intervalTimeReset();
		// this.closedCardDeck.visible = false;
		// this.openedCardDeck.visible = false;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
