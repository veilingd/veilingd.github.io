class AudioPlayer {
	constructor(audioDiv) {
	    if (navigator.userAgent.indexOf('Edge') !== -1) return; // TODO replace with feature detection

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
		this.state = {
			playing: false,
			currentItem: this.audioElement.src,
			playlist: [
				'sound/song4.mp3',
				'sound/song3.mp3',
				'sound/song2.mp3',
				'sound/song1.mp3'
			]
		};
		this.registerEvents();
	}

	reduce(state, action) {
		switch(action.type) {
			case 'got:playing':
				return Object.assign({}, state, {playing: true});
			case 'got:paused':
				return Object.assign({}, state, {playing: false});
			case 'got:next':
				const playlist = state.playlist.slice();
				if (this.audioElement.src === `${location.protocol}//${location.host}/${this.state.playlist[0]}`) {
					playlist.push(playlist.shift());
				}
                const nextItem = playlist.shift();
                playlist.push(nextItem);
				return Object.assign({}, state, {currentItem: nextItem, playlist: playlist});
			case 'got:error':
				return Object.assign({}, state, {playing: false});
			default:
				return state;
		}
	}

	registerEvents() {
		this.playPauseButton.onclick = () => {
			if (this.state.playing) {
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
		};

		this.audioElement.onplaying = () => {
			this.state = this.reduce(this.state, {type: 'got:playing'});
			if (this.state.playing) {
				this.playSvg.style.display = 'none';
				this.pauseSvg.style.display = 'initial';
			}
		};

		this.audioElement.onerror = (e) => {
			this.playSvg.style.display = 'initial';
			this.pauseSvg.style.display = 'none';
			this.error(e);
		};
	}

	play() {
		this.audioElement.play().then(() => {

        }).catch(() => {
        	this.error();
        });
	}

	pause() {
		this.audioElement.pause();
		this.state = this.reduce(this.state, {type: 'got:paused'});
		this.playSvg.style.display = 'initial';
		this.pauseSvg.style.display = 'none';
	}

	next() {
		this.state = this.reduce(this.state, {type: 'got:next'});
		this.audioElement.src = this.state.currentItem;
		this.updateTitle();
		this.download.href = this.audioElement.src;
		this.play();
	}

	updateTitle() {
		let text = this.state.playlist[this.state.playlist.length - 1];
		text = text.substring(text.lastIndexOf('/') + 1);
		text = text.substring(0, text.indexOf('.'));
		this.titleDiv.innerText = text;
	}

	error() {
		this.state = this.reduce(this.state, {type: 'got:error'});
		this.titleDiv.innerText = `error`;
	}
}

window.onload = () => {
	const audioDiv = document.getElementById('audioPlayer');
	const playerInstance = new AudioPlayer(audioDiv);
};
