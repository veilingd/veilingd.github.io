class AudioPlayer {
	constructor(audioDiv) {
		// prepare element vars
		this.audioElement = audioDiv.querySelector('audio');
		this.customControls = document.getElementById('customControls');
		this.playPauseButton = document.getElementById('playPauseButton');
		this.playSvg = document.getElementById('play');
		this.pauseSvg = document.getElementById('pause');
		this.nextButton = document.getElementById('nextButton');
		this.titleDiv = document.getElementById('songTitle');
		this.download = document.getElementById('download');

		// replace controls
		this.audioElement.removeAttribute('controls');
		this.customControls.style.display = 'grid';

		// initialize state
		this.playing = false;
		this.registerEvents();
		this.playlist = [
			'sound/song1.mp3',
			'sound/song2.mp3',
			'sound/song3.mp3',
			'sound/song4.mp3'
		]
	}

	registerEvents() {
		this.playPauseButton.onclick = () => {
			if (this.playing) {
				this.pause();
			} else {
				this.play();
			}
		};

		this.nextButton.onclick = () => {
			this.next();
		};

		this.audioElement.onended = () => {
			this.next();
		}
	}

	play() {
		if (this.audioElement.src === this.playlist[0]) {
			this.rotatePlaylist();
		}
		this.audioElement.play();
		this.playing = true;
		this.playSvg.style.display = 'none';
		this.pauseSvg.style.display = 'initial';

	}

	pause() {
		this.audioElement.pause();
		this.playing = false;
		this.playSvg.style.display = 'initial';
		this.pauseSvg.style.display = 'none';
	}

	next() {
		if (this.audioElement.src === this.playlist[0]) {
			this.rotatePlaylist();
		}
		this.audioElement.src = this.rotatePlaylist();
		this.updateTitle();
		this.download.href = this.audioElement.src;
		this.play();
	}

	rotatePlaylist() {
		const first = this.playlist.shift();
		this.playlist.push(first);
		return first;
	}

	updateTitle() {
		let text = this.playlist[this.playlist.length - 1];
		text = text.substring(text.lastIndexOf('/') + 1);
		text = text.substring(0, text.indexOf('.'));
		this.titleDiv.innerText = text;
	}
}

window.onload = () => {
	const audioDiv = document.getElementById('audioPlayer');
	const playerInstance = new AudioPlayer(audioDiv);
};
