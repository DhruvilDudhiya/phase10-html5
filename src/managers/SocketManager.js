class SocketManager {
    constructor(oScene, eGameType, authToken, iTableId, sRootURL, nPracticeChips) {
        this.oScene = oScene;
        this.eGameType = eGameType;
        this.authToken = authToken;
        this.iTableId = iTableId;
        this.sRootURL = sRootURL;
        this.nPracticeChips = nPracticeChips;
        this.oRootSocketConn = io();

        console.log("sRootURL: ", sRootURL);

        //Root Socket conenction 
        this.oRootSocketConn = io(this.sRootURL, {
            transports: ['websocket', 'polling'],
            query: {
                authorization: authToken,
            },
        });

        // Root Socket Connection Events - Start
        this.oRootSocketConn.on('connect', () => {
            this.ownSocketId = this.oRootSocketConn.id;
            console.log("Connected to Socket :: ", this.oRootSocketConn.id, "\nTable ID: ", this.iTableId);
            console.log("sRootURL :: ", this.sRootURL);
        });
        this.oRootSocketConn.on('disconnect', () => {
            console.log("Disconnected from Socket");
        });
        this.oRootSocketConn.on('reconnect', () => {
            console.log("Reconnecting to Socket");
        });
        this.oRootSocketConn.on("error", (error) => {
            console.log("Connection Error :: ", error);
        });
        // Root Socket Connection Events - End

        // Refresh Purpose
        this.oRootSocketConn.on(this.iTableId, (data) => {
            this.onReceivedData(data);
        });

        // Socket Connection
        this.oRootSocketConn.emit("reqJoinTable", { iTableId: this.iTableId }, (error, data) => {
            this.onReceivedData(data);
        });

        // For Requesting Socket Emits
        this.emit = (sEventName, oData = {}, callback) => {
            this.oRootSocketConn.emit(this.iTableId, { sEventName, oData }, callback);
        }
    }

    onReceivedData(data) {
        console.log(data.sEventName);
        // console.log(data);
        // console.log("<===================>");
        switch (data.sEventName) {
            case undefined:
                this.oScene.oUIManager.setPlayerBoxes(data.oData.nMaxPlayer);
                if (data.oData.aParticipant.length == data.oData.nMaxPlayer) {
                    for (var i = 0; i <= data.oData.aParticipant.length; i++) {
                        if (data.oData.aParticipant[i].sRootSocket != this.ownSocketId) {
                            this.oScene.oPlayerManager.setUsersData(data.oData.aParticipant[i]);
                            break;
                        }
                    }
                }
                break;
            case "resUserJoined":
                console.log("resUserJoined ::", data.oData);
                this.oScene.oPlayerManager.setUsersData(data.oData, this.ownSocketId);
                this.oScene.oPlayerManager.setHandData(data.oData.aHand);
                break;
            case "resPhaseData":
                console.log("resPhaseData ::", data.oData);
                this.oScene.oGameManager.resetPhaseData();
                this.oScene.oUIManager.setPhaseContainer(data.oData);
                this.oScene.oPlayerManager.setPlayerPhaseData(data.oData);
                break;
            case "resHand":
                console.log("resHand ::", data.oData);
                this.oScene.oPlayerHand.getHandData(data);
                break;
            case "resHighCards":
                console.log("resHighCards ::", data.oData);
                this.oScene.oPlayerHand.arrangePlayerHighCards(data.oData);
                break;
            case "resGameInitializeTimer":
                console.log("resGameInitializeTimer ::", data.oData);
                this.oScene.oUIManager.startRoundTimer(data.oData);
                break;
            case "resGameState":
                console.log("resGameState ::", data.oData);
                // this.oPlayerManager.resGameState(data.oData);
                this.oScene.tempCardContainer.destroy();
                this.oScene.oTweenManager.startHandCardsDistribution();
                break;
            case "resPlayerTurn":
                console.log("Player Turn Change ->", data.oData);
                this.oScene.oPlayerManager.changePlayerTurn(data.oData);
                break;
            case "resHandCardCount":
                console.log("resHandCardCount :: ", data.oData);
                break;
            case "resPlayersState":
                console.log("resPlayersState :: ", data.oData);
                break;
            case "resClosedCard":
                console.log("RRR :: resClosedCard :: ", data.oData);
                this.oScene.oPlayerManager.handleDeclareButtons();
                break;
            case "resOpenedDeck":
                console.log("resOpenDeck :: ", data.oData);
                // this.oScene.oPlayerManager.handleDeclareButtons();
                this.oScene.oPlayerHand.receiveOpenedDeckCard(data.oData);
                break;
            case 'resHit':
                console.log('resHit ::', data.oData);
                break;
            case "resAutoDiscard":
                console.log("resAutoDiscard :: ", data.oData);
                break;
            case "resDeclarePhase":
                console.log("resDeclarePhase :: ", data.oData);
                break;
            case "resRoundOver":
                console.log("resRoundOver :: ", data.oData);
                this.oScene.setRoundOver();
                break;
            case "resGameOver":
                console.log("resGameOver :: ", data.oData);
                this.oScene.scene.stop('Game')
                this.oScene.scene.start('ResultScreen', { data: data.oData });
                // this.oScene.oResultScene.winnerScene(data.oData);
                break;
            case "resClearTable":
                console.log("resClearTable ::", data.oData);
            // DND - Copy and Paste
            // case "":
            //     console.log(" :: ", data);
            //     break;
            default:
                console.log("New Event Detected :: ", data.sEventName, data);
                break;
        }
    }
}