class Boot extends Phaser.Scene {
	preload() {
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}

function startProject() {
	$("splashPage").hide();
	game = new Phaser.Game({
		type: Phaser.AUTO,
		width: 1080,
		height: 1920,
		parent: 'game-division',
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		audio: {
			disableWebAudio: true
		},
		dom: {
			createContainer: true
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Game", Game);
	game.scene.add("Boot", Boot, true);
	game.scene.start("Boot", {});
	game.scene.add("ResultScreen",ResultScreen);
}

$(document).ready(function () {
	startProject();
});