
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

		// openedCardDeck
		const openedCardDeck = this.add.image(540, 876, "cardHolder");

		// discardDeckContainer
		const discardDeckContainer = this.add.container(0, 1);

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
		const body = this.add.container(0, 0);

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
		phaseContainer.add(singlePhaseContainer);

		// single_phase
		const single_phase = this.add.image(540, 1210, "single-phase");
		singlePhaseContainer.add(single_phase);

		// sp_yellow_ring
		const sp_yellow_ring = this.add.image(540, 1215, "yellow-ring-single");
		sp_yellow_ring.visible = false;
		singlePhaseContainer.add(sp_yellow_ring);

		// singlePhaseOneContainer
		const singlePhaseOneContainer = this.add.container(540, 1220);
		singlePhaseOneContainer.name = "singlePhaseOneContainer";
		singlePhaseContainer.add(singlePhaseOneContainer);

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
		const threePlayer2Box = this.add.image(285, 383, "player-2-box");
		threePlayer2Container.add(threePlayer2Box);

		// txt_opponent2_phase_count
		const txt_opponent2_phase_count = this.add.text(285, 661, "", {});
		txt_opponent2_phase_count.setOrigin(0.5, 0.5);
		txt_opponent2_phase_count.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "26px" });
		threePlayer2Container.add(txt_opponent2_phase_count);

		// txt_opponent2_phase_score
		const txt_opponent2_phase_score = this.add.text(225, 330, "", {});
		txt_opponent2_phase_score.setOrigin(0.5, 0.5);
		txt_opponent2_phase_score.setStyle({ "align": "center", "color": "#f8ca00", "fontFamily": "CHICKEN Pie Height", "fontSize": "26px", "fontStyle": "bold" });
		threePlayer2Container.add(txt_opponent2_phase_score);

		// secondPlayer2UserNameText
		const secondPlayer2UserNameText = this.add.text(225, 295, "", {});
		secondPlayer2UserNameText.setOrigin(0.5, 0.5);
		secondPlayer2UserNameText.text = "Waiting..";
		secondPlayer2UserNameText.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "28px", "fontStyle": "bold" });
		threePlayer2Container.add(secondPlayer2UserNameText);

		// emptySeatTwoPlayer
		const emptySeatTwoPlayer = this.add.container(225, 170);
		threePlayer2Container.add(emptySeatTwoPlayer);

		// player_profile_box_1
		const player_profile_box_1 = this.add.image(0, 0, "player-profile-box");
		player_profile_box_1.alpha = 0.8;
		player_profile_box_1.alphaTopLeft = 0.8;
		player_profile_box_1.alphaTopRight = 0.8;
		player_profile_box_1.alphaBottomLeft = 0.8;
		player_profile_box_1.alphaBottomRight = 0.8;
		player_profile_box_1.tintFill = true;
		player_profile_box_1.tintTopLeft = 0;
		player_profile_box_1.tintTopRight = 0;
		player_profile_box_1.tintBottomLeft = 0;
		player_profile_box_1.tintBottomRight = 0;
		emptySeatTwoPlayer.add(player_profile_box_1);

		// text
		const text = this.add.text(0, 0, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Empty\nSeat";
		text.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		emptySeatTwoPlayer.add(text);

		// opponent2HandCardCountContainer
		const opponent2HandCardCountContainer = this.add.container(396, 204);
		threePlayer2Container.add(opponent2HandCardCountContainer);

		// opp_player_card_deck_1
		const opp_player_card_deck_1 = this.add.image(0, 0, "opp-player-card-deck");
		opponent2HandCardCountContainer.add(opp_player_card_deck_1);

		// txt_opponent2HandCardCounter
		const txt_opponent2HandCardCounter = this.add.text(0, 0, "", {});
		txt_opponent2HandCardCounter.setOrigin(0.5, 0.5);
		txt_opponent2HandCardCounter.setStyle({ "fontSize": "35px", "fontStyle": "bold" });
		opponent2HandCardCountContainer.add(txt_opponent2HandCardCounter);

		// opponent2HandInfoContainer
		const opponent2HandInfoContainer = this.add.container(0, 0);
		threePlayer2Container.add(opponent2HandInfoContainer);

		// txt_set1_opponent2_info
		const txt_set1_opponent2_info = this.add.text(285, 411, "", {});
		txt_set1_opponent2_info.setOrigin(0.5, 0.5);
		txt_set1_opponent2_info.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		opponent2HandInfoContainer.add(txt_set1_opponent2_info);

		// txt_set2_opponent2_info
		const txt_set2_opponent2_info = this.add.text(285, 548, "", {});
		txt_set2_opponent2_info.setOrigin(0.5, 0.5);
		txt_set2_opponent2_info.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		opponent2HandInfoContainer.add(txt_set2_opponent2_info);

		// opponent2DeclareCardContainer
		const opponent2DeclareCardContainer = this.add.container(0, 0);
		threePlayer2Container.add(opponent2DeclareCardContainer);

		// opponent2Grp2PhaseCardContainer
		const opponent2Grp2PhaseCardContainer = this.add.container(285, 540);
		opponent2DeclareCardContainer.add(opponent2Grp2PhaseCardContainer);

		// opponent2Grp1PhaseCardContainer
		const opponent2Grp1PhaseCardContainer = this.add.container(285, 405);
		opponent2DeclareCardContainer.add(opponent2Grp1PhaseCardContainer);

		// threePlayer3Container
		const threePlayer3Container = this.add.container(0, 0);
		threePlayerContainer.add(threePlayer3Container);

		// threePlayer3Box
		const threePlayer3Box = this.add.image(795, 383, "player-3-box");
		threePlayer3Container.add(threePlayer3Box);

		// secondPlayer3UserNameText
		const secondPlayer3UserNameText = this.add.text(736, 294, "", {});
		secondPlayer3UserNameText.setOrigin(0.5, 0.5);
		secondPlayer3UserNameText.text = "Waiting..";
		secondPlayer3UserNameText.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "28px", "fontStyle": "bold" });
		threePlayer3Container.add(secondPlayer3UserNameText);

		// txt_opponent3_phase_score
		const txt_opponent3_phase_score = this.add.text(736, 330, "", {});
		txt_opponent3_phase_score.setOrigin(0.5, 0.5);
		txt_opponent3_phase_score.setStyle({ "align": "center", "color": "#f8ca00", "fontFamily": "CHICKEN Pie Height", "fontSize": "26px", "fontStyle": "bold" });
		threePlayer3Container.add(txt_opponent3_phase_score);

		// txt_opponent3_phase_count
		const txt_opponent3_phase_count = this.add.text(795, 661, "", {});
		txt_opponent3_phase_count.setOrigin(0.5, 0.5);
		txt_opponent3_phase_count.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "26px" });
		threePlayer3Container.add(txt_opponent3_phase_count);

		// emptySeatThreePlayer
		const emptySeatThreePlayer = this.add.container(734, 170);
		threePlayer3Container.add(emptySeatThreePlayer);

		// player_profile_box_2
		const player_profile_box_2 = this.add.image(0, 0, "player-profile-box");
		player_profile_box_2.alpha = 0.8;
		player_profile_box_2.alphaTopLeft = 0.8;
		player_profile_box_2.alphaTopRight = 0.8;
		player_profile_box_2.alphaBottomLeft = 0.8;
		player_profile_box_2.alphaBottomRight = 0.8;
		player_profile_box_2.tintFill = true;
		player_profile_box_2.tintTopLeft = 0;
		player_profile_box_2.tintTopRight = 0;
		player_profile_box_2.tintBottomLeft = 0;
		player_profile_box_2.tintBottomRight = 0;
		emptySeatThreePlayer.add(player_profile_box_2);

		// text_1
		const text_1 = this.add.text(0, 0, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Empty\nSeat";
		text_1.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		emptySeatThreePlayer.add(text_1);

		// opponent3HandCardCountContainer
		const opponent3HandCardCountContainer = this.add.container(907, 204);
		threePlayer3Container.add(opponent3HandCardCountContainer);

		// opp_player_card_deck_2
		const opp_player_card_deck_2 = this.add.image(0, 0, "opp-player-card-deck");
		opponent3HandCardCountContainer.add(opp_player_card_deck_2);

		// txt_opponent3HandCardCounter
		const txt_opponent3HandCardCounter = this.add.text(0, 0, "", {});
		txt_opponent3HandCardCounter.setOrigin(0.5, 0.5);
		txt_opponent3HandCardCounter.setStyle({ "fontSize": "35px", "fontStyle": "bold" });
		opponent3HandCardCountContainer.add(txt_opponent3HandCardCounter);

		// opponent3HandInfoContainer
		const opponent3HandInfoContainer = this.add.container(0, 0);
		threePlayer3Container.add(opponent3HandInfoContainer);

		// txt_set1_opponent3_info
		const txt_set1_opponent3_info = this.add.text(795, 411, "", {});
		txt_set1_opponent3_info.setOrigin(0.5, 0.5);
		txt_set1_opponent3_info.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		opponent3HandInfoContainer.add(txt_set1_opponent3_info);

		// txt_set2_opponent3_info
		const txt_set2_opponent3_info = this.add.text(795, 548, "", {});
		txt_set2_opponent3_info.setOrigin(0.5, 0.5);
		txt_set2_opponent3_info.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		opponent3HandInfoContainer.add(txt_set2_opponent3_info);

		// opponent3DeclareCardContainer
		const opponent3DeclareCardContainer = this.add.container(0, 0);
		threePlayer3Container.add(opponent3DeclareCardContainer);

		// opponent3Grp2PhaseCardContainer
		const opponent3Grp2PhaseCardContainer = this.add.container(795, 540);
		opponent3DeclareCardContainer.add(opponent3Grp2PhaseCardContainer);

		// opponent3Grp1PhaseCardContainer
		const opponent3Grp1PhaseCardContainer = this.add.container(795, 405);
		opponent3DeclareCardContainer.add(opponent3Grp1PhaseCardContainer);

		// twoPlayerContainer
		const twoPlayerContainer = this.add.container(0, 0);
		body.add(twoPlayerContainer);

		// twoPlayer2Container
		const twoPlayer2Container = this.add.container(0, 0);
		twoPlayerContainer.add(twoPlayer2Container);

		// twoPlayer2Box
		const twoPlayer2Box = this.add.image(540, 385, "player-2-box");
		twoPlayer2Container.add(twoPlayer2Box);

		// secondPlayerUserNameText
		const secondPlayerUserNameText = this.add.text(479, 300, "", {});
		secondPlayerUserNameText.setOrigin(0.5, 0.5);
		secondPlayerUserNameText.text = "Waiting..";
		secondPlayerUserNameText.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "28px", "fontStyle": "bold" });
		twoPlayer2Container.add(secondPlayerUserNameText);

		// txt_opponent_phase_score
		const txt_opponent_phase_score = this.add.text(479, 332, "", {});
		txt_opponent_phase_score.setOrigin(0.5, 0.5);
		txt_opponent_phase_score.setStyle({ "align": "center", "color": "#f8ca00", "fontFamily": "CHICKEN Pie Height", "fontSize": "28px", "fontStyle": "bold" });
		twoPlayer2Container.add(txt_opponent_phase_score);

		// txt_opponent_phase_count
		const txt_opponent_phase_count = this.add.text(540, 661, "", {});
		txt_opponent_phase_count.setOrigin(0.5, 0.5);
		txt_opponent_phase_count.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "26px" });
		twoPlayer2Container.add(txt_opponent_phase_count);

		// emptySeatPlayer2
		const emptySeatPlayer2 = this.add.container(480, 172);
		twoPlayer2Container.add(emptySeatPlayer2);

		// player_profile_box
		const player_profile_box = this.add.image(0, 0, "player-profile-box");
		player_profile_box.alpha = 0.8;
		player_profile_box.alphaTopLeft = 0.8;
		player_profile_box.alphaTopRight = 0.8;
		player_profile_box.alphaBottomLeft = 0.8;
		player_profile_box.alphaBottomRight = 0.8;
		player_profile_box.tintFill = true;
		player_profile_box.tintTopLeft = 0;
		player_profile_box.tintTopRight = 0;
		player_profile_box.tintBottomLeft = 0;
		player_profile_box.tintBottomRight = 0;
		emptySeatPlayer2.add(player_profile_box);

		// text_2
		const text_2 = this.add.text(0, 0, "", {});
		text_2.setOrigin(0.5, 0.5);
		text_2.text = "Empty\nSeat";
		text_2.setStyle({ "align": "center", "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		emptySeatPlayer2.add(text_2);

		// opponentHandInfoContainer
		const opponentHandInfoContainer = this.add.container(0, 0);
		twoPlayer2Container.add(opponentHandInfoContainer);

		// txt_set1_opponent_info
		const txt_set1_opponent_info = this.add.text(540, 411, "", {});
		txt_set1_opponent_info.setOrigin(0.5, 0.5);
		txt_set1_opponent_info.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		opponentHandInfoContainer.add(txt_set1_opponent_info);

		// txt_set2_opponent_info
		const txt_set2_opponent_info = this.add.text(540, 548, "", {});
		txt_set2_opponent_info.setOrigin(0.5, 0.5);
		txt_set2_opponent_info.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		opponentHandInfoContainer.add(txt_set2_opponent_info);

		// declareCardContainer
		const declareCardContainer = this.add.container(0, 0);
		twoPlayer2Container.add(declareCardContainer);

		// opponentGrp2PhaseCardContainer
		const opponentGrp2PhaseCardContainer = this.add.container(540, 545);
		declareCardContainer.add(opponentGrp2PhaseCardContainer);

		// opponentGrp1PhaseCardContainer
		const opponentGrp1PhaseCardContainer = this.add.container(540, 410);
		declareCardContainer.add(opponentGrp1PhaseCardContainer);

		// opponentHandCardCountContainer
		const opponentHandCardCountContainer = this.add.container(0, 0);
		twoPlayer2Container.add(opponentHandCardCountContainer);

		// opp_player_card_deck
		const opp_player_card_deck = this.add.image(633, 215, "opp-player-card-deck");
		opponentHandCardCountContainer.add(opp_player_card_deck);

		// txt_opponentHandCardCounter
		const txt_opponentHandCardCounter = this.add.text(633, 212, "", {});
		txt_opponentHandCardCounter.setOrigin(0.5, 0.5);
		txt_opponentHandCardCounter.setStyle({ "fontSize": "35px", "fontStyle": "bold" });
		opponentHandCardCountContainer.add(txt_opponentHandCardCounter);

		// yellow_ring_opponentGrp1
		const yellow_ring_opponentGrp1 = this.add.image(540, 408, "yellow-ring");
		yellow_ring_opponentGrp1.scaleX = 0.81;
		yellow_ring_opponentGrp1.scaleY = 0.56;
		yellow_ring_opponentGrp1.visible = false;
		twoPlayer2Container.add(yellow_ring_opponentGrp1);

		// yellow_ring_opponentGrp2
		const yellow_ring_opponentGrp2 = this.add.image(540, 544, "yellow-ring");
		yellow_ring_opponentGrp2.scaleX = 0.81;
		yellow_ring_opponentGrp2.scaleY = 0.56;
		yellow_ring_opponentGrp2.visible = false;
		twoPlayer2Container.add(yellow_ring_opponentGrp2);

		// ownPlayerContainer
		const ownPlayerContainer = this.add.container(0, -1);
		body.add(ownPlayerContainer);

		// ownPlayerUserNameText
		const ownPlayerUserNameText = this.add.text(540, 1875, "", {});
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

		// closedCardDeck
		const closedCardDeck = this.add.image(540, 876, "main-cards-deck");
		body.add(closedCardDeck);

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

		// skipPlayerTurnContainer
		const skipPlayerTurnContainer = this.add.container(0, 0);
		skipPlayerTurnContainer.visible = false;

		// skip_btn
		const skip_btn = this.add.image(0, 0, "skip-btn");
		skip_btn.scaleX = 0.5;
		skip_btn.scaleY = 0.5;
		skip_btn.angle = -15;
		skipPlayerTurnContainer.add(skip_btn);

		// menuContainer
		const menuContainer = this.add.container(83, 1729);
		menuContainer.visible = false;

		// soundOffBtn
		const soundOffBtn = this.add.image(0, 0, "Asset 8@2x");
		soundOffBtn.scaleX = 0.3;
		soundOffBtn.scaleY = 0.3;
		soundOffBtn.visible = false;
		menuContainer.add(soundOffBtn);

		// soundOnBtn
		const soundOnBtn = this.add.image(2, 1, "Asset 7@2x");
		soundOnBtn.scaleX = 0.3;
		soundOnBtn.scaleY = 0.3;
		menuContainer.add(soundOnBtn);

		// refreshIcon
		const refreshIcon = this.add.image(-1, -87, "icons8-synchronize-50");
		refreshIcon.scaleX = 1.5;
		refreshIcon.scaleY = 1.5;
		menuContainer.add(refreshIcon);

		// exitIcon
		const exitIcon = this.add.image(-2, -175, "exit (1)");
		exitIcon.scaleX = 0.5;
		exitIcon.scaleY = 0.5;
		menuContainer.add(exitIcon);

		// popupContainer
		const popupContainer = this.add.container(0, 0);

		// transparentLayer
		const transparentLayer = this.add.image(540, 960, "transparent-layer");
		transparentLayer.visible = false;
		popupContainer.add(transparentLayer);

		// waitingPopupContainer
		const waitingPopupContainer = this.add.container(540, 960);
		waitingPopupContainer.visible = false;
		popupContainer.add(waitingPopupContainer);

		// popup
		const popup = this.add.image(0, 0, "popup");
		waitingPopupContainer.add(popup);

		// popUpText
		const popUpText = this.add.text(0, 0, "", {});
		popUpText.setOrigin(0.5, 0.5);
		popUpText.text = "WAITING FOR OTHER PLAYERS...";
		popUpText.setStyle({ "align": "center", "fontFamily": "Comica_BD", "fontSize": "28px" });
		waitingPopupContainer.add(popUpText);

		// leaveTablePopup
		const leaveTablePopup = this.add.container(541, 981);
		leaveTablePopup.visible = false;
		popupContainer.add(leaveTablePopup);

		// popupLeave
		const popupLeave = this.add.image(-1, -122, "Asset 3@2x");
		popupLeave.scaleX = 0.5;
		popupLeave.scaleY = 0.5;
		leaveTablePopup.add(popupLeave);

		// yesLeaveBtn
		const yesLeaveBtn = this.add.image(-221, 61, "Asset 6@2x");
		yesLeaveBtn.scaleX = 0.55;
		yesLeaveBtn.scaleY = 0.55;
		leaveTablePopup.add(yesLeaveBtn);

		// cancleLeaveBtn
		const cancleLeaveBtn = this.add.image(222, 61, "Asset 5@2x");
		cancleLeaveBtn.scaleX = 0.55;
		cancleLeaveBtn.scaleY = 0.55;
		leaveTablePopup.add(cancleLeaveBtn);

		// yesLeaveTxt
		const yesLeaveTxt = this.add.text(-221, 61, "", {});
		yesLeaveTxt.setOrigin(0.5, 0.5);
		yesLeaveTxt.text = "YES";
		yesLeaveTxt.setStyle({ "fontSize": "60px" });
		leaveTablePopup.add(yesLeaveTxt);

		// noLeaveTxt
		const noLeaveTxt = this.add.text(222, 61, "", {});
		noLeaveTxt.setOrigin(0.5, 0.5);
		noLeaveTxt.text = "NO";
		noLeaveTxt.setStyle({ "fontSize": "60px" });
		leaveTablePopup.add(noLeaveTxt);

		// leaveTableTxt
		const leaveTableTxt = this.add.text(-1, -122, "", {});
		leaveTableTxt.setOrigin(0.5, 0.5);
		leaveTableTxt.text = "Are you sure you want to\n   leave this table?";
		leaveTableTxt.setStyle({ "fontSize": "50px" });
		leaveTablePopup.add(leaveTableTxt);

		// refreshTablePopup
		const refreshTablePopup = this.add.container(538, 981);
		refreshTablePopup.visible = false;
		popupContainer.add(refreshTablePopup);

		// popuprefresh
		const popuprefresh = this.add.image(2, -121, "Asset 3@2x");
		popuprefresh.scaleX = 0.5;
		popuprefresh.scaleY = 0.5;
		refreshTablePopup.add(popuprefresh);

		// yesRefreshBtn
		const yesRefreshBtn = this.add.image(-221, 61, "Asset 6@2x");
		yesRefreshBtn.scaleX = 0.55;
		yesRefreshBtn.scaleY = 0.55;
		refreshTablePopup.add(yesRefreshBtn);

		// cancleRefreshBtn
		const cancleRefreshBtn = this.add.image(221, 61, "Asset 5@2x");
		cancleRefreshBtn.scaleX = 0.55;
		cancleRefreshBtn.scaleY = 0.55;
		refreshTablePopup.add(cancleRefreshBtn);

		// yesRefreshTxt
		const yesRefreshTxt = this.add.text(-224, 61, "", {});
		yesRefreshTxt.setOrigin(0.5, 0.5);
		yesRefreshTxt.text = "YES";
		yesRefreshTxt.setStyle({ "fontSize": "60px" });
		refreshTablePopup.add(yesRefreshTxt);

		// noRefreshTxt
		const noRefreshTxt = this.add.text(221, 61, "", {});
		noRefreshTxt.setOrigin(0.5, 0.5);
		noRefreshTxt.text = "NO";
		noRefreshTxt.setStyle({ "fontSize": "60px" });
		refreshTablePopup.add(noRefreshTxt);

		// refreshTableTxt
		const refreshTableTxt = this.add.text(2, -121, "", {});
		refreshTableTxt.setOrigin(0.5, 0.5);
		refreshTableTxt.text = "Are you sure you want to\n   Refresh this table?";
		refreshTableTxt.setStyle({ "fontSize": "50px" });
		refreshTablePopup.add(refreshTableTxt);

		// roundWinnerPopupContainer
		const roundWinnerPopupContainer = this.add.container(540, 960);
		roundWinnerPopupContainer.visible = false;
		popupContainer.add(roundWinnerPopupContainer);

		// asset_3_2x
		const asset_3_2x = this.add.image(0, 0, "Asset 3@2x");
		asset_3_2x.scaleX = 0.5;
		asset_3_2x.scaleY = 0.5;
		roundWinnerPopupContainer.add(asset_3_2x);

		// text_round_winner
		const text_round_winner = this.add.text(0, 0, "", {});
		text_round_winner.setOrigin(0.5, 0.5);
		text_round_winner.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "40px" });
		roundWinnerPopupContainer.add(text_round_winner);

		// tableInfoContainer
		const tableInfoContainer = this.add.container(0, 0);
		tableInfoContainer.visible = false;

		// text_3
		const text_3 = this.add.text(488, 35, "", {});
		text_3.setOrigin(0.5, 0.5);
		text_3.text = "Table Id:#";
		text_3.setStyle({ "color": "#c6c6c6ff", "fontFamily": "CHICKEN Pie Height", "fontSize": "30px", "fontStyle": "bold" });
		tableInfoContainer.add(text_3);

		// txt_table_id
		const txt_table_id = this.add.text(556, 35, "", {});
		txt_table_id.setOrigin(0, 0.5);
		txt_table_id.setStyle({ "color": "#c6c6c6ff", "fontFamily": "CHICKEN Pie Height", "fontSize": "30px", "fontStyle": "bold" });
		tableInfoContainer.add(txt_table_id);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(997, 35, 150, 50);
		rectangle_1.alpha = 0.5;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		tableInfoContainer.add(rectangle_1);

		// signal
		const signal = this.add.image(947, 35, "Network");
		signal.scaleX = 0.1;
		signal.scaleY = 0.1;
		tableInfoContainer.add(signal);

		// networkTxt
		const networkTxt = this.add.text(968, 35, "", {});
		networkTxt.setOrigin(0, 0.5);
		networkTxt.setStyle({ "fontFamily": "CHICKEN Pie Height", "fontSize": "30px" });
		tableInfoContainer.add(networkTxt);

		// winnerShowContainer
		const winnerShowContainer = this.add.container(0, 0);
		winnerShowContainer.visible = false;

		// background_1
		const background_1 = this.add.image(540, 960, "background");
		winnerShowContainer.add(background_1);

		// txt_rank
		const txt_rank = this.add.text(540, 420, "", {});
		txt_rank.setOrigin(0.5, 0.5);
		txt_rank.setStyle({ "fontSize": "130px" });
		winnerShowContainer.add(txt_rank);

		// text_4
		const text_4 = this.add.text(540, 540, "", {});
		text_4.setOrigin(0.5, 0.5);
		text_4.text = "Rank";
		text_4.setStyle({ "fontSize": "70px" });
		winnerShowContainer.add(text_4);

		// headerContainer
		const headerContainer = this.add.container(540, 897);
		winnerShowContainer.add(headerContainer);

		// transparent_layer
		const transparent_layer = this.add.image(0, 1, "transparent-layer");
		transparent_layer.scaleY = 0.06;
		headerContainer.add(transparent_layer);

		// noHeader
		const noHeader = this.add.text(-483, 0, "", {});
		noHeader.setOrigin(0.5, 0.5);
		noHeader.text = "No.";
		noHeader.setStyle({ "fontSize": "50px" });
		headerContainer.add(noHeader);

		// nameHeader
		const nameHeader = this.add.text(-304, 0, "", {});
		nameHeader.setOrigin(0.5, 0.5);
		nameHeader.text = "Name";
		nameHeader.setStyle({ "fontSize": "50px" });
		headerContainer.add(nameHeader);

		// scoreHeader
		const scoreHeader = this.add.text(105, 0, "", {});
		scoreHeader.setOrigin(0.5, 0.5);
		scoreHeader.text = "Score";
		scoreHeader.setStyle({ "fontSize": "50px" });
		headerContainer.add(scoreHeader);

		// prizeHeader
		const prizeHeader = this.add.text(400, 0, "", {});
		prizeHeader.setOrigin(0.5, 0.5);
		prizeHeader.text = "Prize";
		prizeHeader.setStyle({ "fontSize": "50px" });
		headerContainer.add(prizeHeader);

		this.openedCardDeck = openedCardDeck;
		this.discardDeckContainer = discardDeckContainer;
		this.btn_settings = btn_settings;
		this.doublePhaseContainer = doublePhaseContainer;
		this.dp_yellow_ring_1 = dp_yellow_ring_1;
		this.dp_yellow_ring_2 = dp_yellow_ring_2;
		this.doublePhaseTwoCardContainer = doublePhaseTwoCardContainer;
		this.doublePhaseOneCardContainer = doublePhaseOneCardContainer;
		this.singlePhaseContainer = singlePhaseContainer;
		this.sp_yellow_ring = sp_yellow_ring;
		this.singlePhaseOneContainer = singlePhaseOneContainer;
		this.totalPhasesText = totalPhasesText;
		this.phaseOneText = phaseOneText;
		this.phaseTwoText = phaseTwoText;
		this.phaseMiddleText = phaseMiddleText;
		this.confirmButton = confirmButton;
		this.cancelButton = cancelButton;
		this.threePlayerContainer = threePlayerContainer;
		this.txt_opponent2_phase_count = txt_opponent2_phase_count;
		this.txt_opponent2_phase_score = txt_opponent2_phase_score;
		this.secondPlayer2UserNameText = secondPlayer2UserNameText;
		this.emptySeatTwoPlayer = emptySeatTwoPlayer;
		this.txt_opponent2HandCardCounter = txt_opponent2HandCardCounter;
		this.opponent2HandInfoContainer = opponent2HandInfoContainer;
		this.txt_set1_opponent2_info = txt_set1_opponent2_info;
		this.txt_set2_opponent2_info = txt_set2_opponent2_info;
		this.opponent2Grp2PhaseCardContainer = opponent2Grp2PhaseCardContainer;
		this.opponent2Grp1PhaseCardContainer = opponent2Grp1PhaseCardContainer;
		this.secondPlayer3UserNameText = secondPlayer3UserNameText;
		this.txt_opponent3_phase_score = txt_opponent3_phase_score;
		this.txt_opponent3_phase_count = txt_opponent3_phase_count;
		this.emptySeatThreePlayer = emptySeatThreePlayer;
		this.txt_opponent3HandCardCounter = txt_opponent3HandCardCounter;
		this.opponent3HandInfoContainer = opponent3HandInfoContainer;
		this.txt_set1_opponent3_info = txt_set1_opponent3_info;
		this.txt_set2_opponent3_info = txt_set2_opponent3_info;
		this.opponent3Grp2PhaseCardContainer = opponent3Grp2PhaseCardContainer;
		this.opponent3Grp1PhaseCardContainer = opponent3Grp1PhaseCardContainer;
		this.twoPlayerContainer = twoPlayerContainer;
		this.secondPlayerUserNameText = secondPlayerUserNameText;
		this.txt_opponent_phase_score = txt_opponent_phase_score;
		this.txt_opponent_phase_count = txt_opponent_phase_count;
		this.emptySeatPlayer2 = emptySeatPlayer2;
		this.opponentHandInfoContainer = opponentHandInfoContainer;
		this.txt_set1_opponent_info = txt_set1_opponent_info;
		this.txt_set2_opponent_info = txt_set2_opponent_info;
		this.declareCardContainer = declareCardContainer;
		this.opponentGrp2PhaseCardContainer = opponentGrp2PhaseCardContainer;
		this.opponentGrp1PhaseCardContainer = opponentGrp1PhaseCardContainer;
		this.txt_opponentHandCardCounter = txt_opponentHandCardCounter;
		this.yellow_ring_opponentGrp1 = yellow_ring_opponentGrp1;
		this.yellow_ring_opponentGrp2 = yellow_ring_opponentGrp2;
		this.ownPlayerUserNameText = ownPlayerUserNameText;
		this.ownPlayerScoreText = ownPlayerScoreText;
		this.closedCardDeck = closedCardDeck;
		this.playerHandContainer = playerHandContainer;
		this.tempCardContainer = tempCardContainer;
		this.playersContainer = playersContainer;
		this.skipPlayerTurnContainer = skipPlayerTurnContainer;
		this.menuContainer = menuContainer;
		this.soundOffBtn = soundOffBtn;
		this.soundOnBtn = soundOnBtn;
		this.refreshIcon = refreshIcon;
		this.exitIcon = exitIcon;
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
		this.roundWinnerPopupContainer = roundWinnerPopupContainer;
		this.text_round_winner = text_round_winner;
		this.tableInfoContainer = tableInfoContainer;
		this.txt_table_id = txt_table_id;
		this.signal = signal;
		this.networkTxt = networkTxt;
		this.winnerShowContainer = winnerShowContainer;
		this.txt_rank = txt_rank;
		this.headerContainer = headerContainer;
		this.transparent_layer = transparent_layer;
		this.noHeader = noHeader;
		this.nameHeader = nameHeader;
		this.scoreHeader = scoreHeader;
		this.prizeHeader = prizeHeader;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	openedCardDeck;
	/** @type {Phaser.GameObjects.Container} */
	discardDeckContainer;
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
	/** @type {Phaser.GameObjects.Container} */
	singlePhaseOneContainer;
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
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent2_phase_count;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent2_phase_score;
	/** @type {Phaser.GameObjects.Text} */
	secondPlayer2UserNameText;
	/** @type {Phaser.GameObjects.Container} */
	emptySeatTwoPlayer;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent2HandCardCounter;
	/** @type {Phaser.GameObjects.Container} */
	opponent2HandInfoContainer;
	/** @type {Phaser.GameObjects.Text} */
	txt_set1_opponent2_info;
	/** @type {Phaser.GameObjects.Text} */
	txt_set2_opponent2_info;
	/** @type {Phaser.GameObjects.Container} */
	opponent2Grp2PhaseCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	opponent2Grp1PhaseCardContainer;
	/** @type {Phaser.GameObjects.Text} */
	secondPlayer3UserNameText;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent3_phase_score;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent3_phase_count;
	/** @type {Phaser.GameObjects.Container} */
	emptySeatThreePlayer;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent3HandCardCounter;
	/** @type {Phaser.GameObjects.Container} */
	opponent3HandInfoContainer;
	/** @type {Phaser.GameObjects.Text} */
	txt_set1_opponent3_info;
	/** @type {Phaser.GameObjects.Text} */
	txt_set2_opponent3_info;
	/** @type {Phaser.GameObjects.Container} */
	opponent3Grp2PhaseCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	opponent3Grp1PhaseCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	twoPlayerContainer;
	/** @type {Phaser.GameObjects.Text} */
	secondPlayerUserNameText;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent_phase_score;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponent_phase_count;
	/** @type {Phaser.GameObjects.Container} */
	emptySeatPlayer2;
	/** @type {Phaser.GameObjects.Container} */
	opponentHandInfoContainer;
	/** @type {Phaser.GameObjects.Text} */
	txt_set1_opponent_info;
	/** @type {Phaser.GameObjects.Text} */
	txt_set2_opponent_info;
	/** @type {Phaser.GameObjects.Container} */
	declareCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	opponentGrp2PhaseCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	opponentGrp1PhaseCardContainer;
	/** @type {Phaser.GameObjects.Text} */
	txt_opponentHandCardCounter;
	/** @type {Phaser.GameObjects.Image} */
	yellow_ring_opponentGrp1;
	/** @type {Phaser.GameObjects.Image} */
	yellow_ring_opponentGrp2;
	/** @type {Phaser.GameObjects.Text} */
	ownPlayerUserNameText;
	/** @type {Phaser.GameObjects.Text} */
	ownPlayerScoreText;
	/** @type {Phaser.GameObjects.Image} */
	closedCardDeck;
	/** @type {Phaser.GameObjects.Container} */
	playerHandContainer;
	/** @type {Phaser.GameObjects.Container} */
	tempCardContainer;
	/** @type {Phaser.GameObjects.Container} */
	playersContainer;
	/** @type {Phaser.GameObjects.Container} */
	skipPlayerTurnContainer;
	/** @type {Phaser.GameObjects.Container} */
	menuContainer;
	/** @type {Phaser.GameObjects.Image} */
	soundOffBtn;
	/** @type {Phaser.GameObjects.Image} */
	soundOnBtn;
	/** @type {Phaser.GameObjects.Image} */
	refreshIcon;
	/** @type {Phaser.GameObjects.Image} */
	exitIcon;
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
	roundWinnerPopupContainer;
	/** @type {Phaser.GameObjects.Text} */
	text_round_winner;
	/** @type {Phaser.GameObjects.Container} */
	tableInfoContainer;
	/** @type {Phaser.GameObjects.Text} */
	txt_table_id;
	/** @type {Phaser.GameObjects.Image} */
	signal;
	/** @type {Phaser.GameObjects.Text} */
	networkTxt;
	/** @type {Phaser.GameObjects.Container} */
	winnerShowContainer;
	/** @type {Phaser.GameObjects.Text} */
	txt_rank;
	/** @type {Phaser.GameObjects.Container} */
	headerContainer;
	/** @type {Phaser.GameObjects.Image} */
	transparent_layer;
	/** @type {Phaser.GameObjects.Text} */
	noHeader;
	/** @type {Phaser.GameObjects.Text} */
	nameHeader;
	/** @type {Phaser.GameObjects.Text} */
	scoreHeader;
	/** @type {Phaser.GameObjects.Text} */
	prizeHeader;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
		this.instantiateSocketManager();
		this.oGameManager = new GameManager(this);
		this.phaseContainerOne = new CardGroup(this.doublePhaseOneCardContainer);
		this.phaseContainerTwo = new CardGroup(this.doublePhaseTwoCardContainer);
		// this.opponentPhaseContainerOne = new CardGroup(this.opponentGrp1PhaseCardContainer);
		// this.opponentPhaseContainerTwo = new CardGroup(this.opponentGrp2PhaseCardContainer);
		this.oPlayerManager = new PlayerManager(this);
		this.oPlayerHand = new PlayerHand(this);
		this.oUIManager = new UIManager(this);
		this.oTweenManager = new TweenManager(this);
		this.oInputManager = new InputManager(this);
		this.oRuleset = new Ruleset(this);
		this.oPlayerPrefab = new PlayerPrefab(this);
		this.isDeclarePhase = false;
		this.isGrabCard = false;

		this.pingTest()

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
		this.isDeclarePhase = true;
		this.oPlayerManager.handleDeclareButtonsVisibilityOFF();
		this.oSocketManager.oRootSocketConn.emit(this.oSocketManager.iTableId, { sEventName: 'reqDeclarePhase', oData: { nPhase: this.oGameManager.nCurrentPhase, aGroup_1: this.oRuleset.grp1Data, aGroup_2: this.oRuleset.grp2Data } });
	}
	sendHitCards(allCards, lastCard, agroups) {
		console.log("send cards");
		this.oSocketManager.oRootSocketConn.emit(this.oSocketManager.iTableId, { sEventName: 'reqHitCard', oData: { iUserId: this.ownPlayerId, cardId: lastCard, sGroup: agroups, aCardId: allCards } }, (response, error) => {
			console.log("------------>>>>>> sendCards ", response, error);
		});
	}
	sendOpponentHitCards(allCards, lastCard, agroups, gameObjectPreset) {
		console.log("called hit");
		console.log(this.secondPlayerId);
		console.log(allCards, lastCard, agroups);
		this.oSocketManager.oRootSocketConn.emit(this.oSocketManager.iTableId, { sEventName: 'reqHitCard', oData: { iUserId: this.secondPlayerId, cardId: lastCard, sGroup: agroups, aCardId: allCards } }, (response, error) => {
			console.log("------------>>>>>> sendOpponentHitCards ", "response", response, "error", error);
			if(response != null) {
				// give the info fot the plase wait for your turn\
				console.log("response", response);
				gameObjectPreset.setPositionOpponetPly();
			}
			else if (error != undefined) {
				console.log("error", error);
				this.playerHandContainer.removeAll(true);
				this.oPlayerHand.getHandData(error);
				// give the handcard data info
			}
		});
	}



	grabOpenDeckCard() {
		this.oSocketManager.emit('reqOpenedCard', { nLabel: this.currentOwnCardLabel, eColor: this.currentOwnCardColor, _id: this.currentOwnCardId, iUserId: this.ownPlayerId }, (error, response) => {
			this.playerHandContainer.removeAll(true);
			for (let i = 0; i < response.length; i++) {
				var flag = false
				if (flag == false) {
					for (let j = 0; j < this.doublePhaseOneCardContainer.getAll().length; j++) {
						if (this.doublePhaseOneCardContainer.list[j].__CardPreset.cardId == response[i]._id) {
							flag = true
							break
						}
					}
				}
				if (flag == false) {
					for (let k = 0; k < this.doublePhaseTwoCardContainer.getAll().length; k++) {
						if (this.doublePhaseTwoCardContainer.list[k].__CardPreset.cardId == response[i]._id) {
							flag = true
							break
						}
					}
				}
				if (flag == false) {
					this.oPlayerHand.getNewCardData(response[i]);
				}
			}
		});
	}
	changeScenes() {
		this.scene.start("ResultScreen");
	}
	setRoundOver(data) {
		this.isDeclarePhase = false;
		this.oRuleset.grp1Data = [];
		this.oRuleset.grp2Data = [];

		this.openedCardDeck.setX(540);
		this.openedCardDeck.visible = true;

		this.closedCardDeck.setX(540);
		this.closedCardDeck.visible = true;

		this.oGameManager.resetPhaseData();
		// this.oPlayerManager.resetPhaseData();
		// this.oPlayerHand.clearPlayerHandCard();

		this.oPlayerPrefab.intervalTimeReset();
		this.playerHandContainer.removeAll(true);
		this.discardDeckContainer.removeAll(true);
		this.doublePhaseOneCardContainer.removeAll(true);
		this.doublePhaseTwoCardContainer.removeAll(true);
		this.opponentGrp1PhaseCardContainer.removeAll(true);
		this.opponentGrp2PhaseCardContainer.removeAll(true);

		this.oTweenManager.openPopUp(this.roundWinnerPopupContainer);
		if (data.iUserId === this.oPlayerManager.ownPlayerId) {
			this.text_round_winner.text = "YOU WON THIS ROUND.";
		}
		else {
			this.text_round_winner.text = ((data.sUserName.length == 0 ? data.sMobile : data.sUserName).toUpperCase()) + " WON THIS ROUND.";
		}
	}

	winnerScene(oData) {

		var resultPrefabX = 517
		var resultPrefabY = 1004
		this.discardDeckContainer.visible = false
		this.winnerShowContainer.visible = true;
		for (let i = 0; i < oData.length; i++) {
			var resultPrefab = new ResultPrefab(this, resultPrefabX, resultPrefabY);
			this.add.existing(resultPrefab);
			resultPrefab.setDepth(10)
			resultPrefab.playerRank.text = i + 1
			resultPrefab.setUserData(oData[i])
			let isOwnPlayer = oData[i].iUserId === this.oPlayerManager.ownPlayerId ? true : false;
			resultPrefab.setOwnBackground(isOwnPlayer)
			if (oData[i].nRank !== undefined) {
				if (oData[i].iUserId === this.oPlayerManager.ownPlayerId) {
					this.txt_rank.text = oData[i].nRank
				}
			}
			resultPrefabY += 93
		}
	}
	pingTest() {
		let pinger = document.getElementById('pingTester');
		let start = new Date().getTime();
		pinger.setAttribute('src', 'https://www.google.com/');
		pinger.onerror = () => {
			let end = new Date().getTime();
			let pingVal = end - start;
			if (pingVal > 99) {
				this.networkTxt.setFontSize(25);
			} else {
				this.networkTxt.setFontSize(30);
			}
			if (pingVal > 999 || !window.navigator.onLine) {
				pingVal = 999;
				this.networkTxt.setColor("#b30000");
				this.networkTxt.setFill("#b30000");
				this.signal.setTint(0xb30000);
				// this.noConnectionPopup.visible = true
			}
			else if (pingVal > 700) {
				this.networkTxt.setColor("#ffff00");
				this.networkTxt.setFill("#ffff00");
				this.signal.setTint(0xffff00);
				// this.noConnectionPopup.visible = false
			}
			else {
				this.networkTxt.setColor("#00ff00");
				this.networkTxt.setFill("#00ff00");
				this.signal.setTint(0x00ff00);
				// this.noConnectionPopup.visible = false
			}
			// if (!window.navigator.onLine) {
			// this.noConnectionPopup.visible = true
			// }
			this.networkTxt.text = pingVal + " ms";
		}
		var self = this;
		setTimeout(() => {
			self.pingTest();
		}, 1000);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */
// You can write more code here
