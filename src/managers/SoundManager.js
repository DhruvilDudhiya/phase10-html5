class SoundManager {
    constructor(oSceneObj) {
        this.oSceneObj = oSceneObj;

        // Start Code from Below here
    }
    playSound(key, loop) {
        key.play();
        key.loop = loop;
    }
    stopSound(key, loop) {
        key.loop = loop
        key.stop();
    }
}