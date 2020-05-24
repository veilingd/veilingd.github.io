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

		this.songTitleLookup = {
			'song1': 'Song 1',
			'song2': 'Song 2',
			'song3': 'Song 3',
			'song4': 'Song 4',
		};

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
			this.playSvg.style.display = 'none';
			this.pauseSvg.style.display = 'initial';
		};

		this.audioElement.onerror = (e) => {
			if (!this.state.playing) {
				this.playSvg.style.display = 'initial';
				this.pauseSvg.style.display = 'none';
			}
			console.log('audioElement error occurred.');
			console.error(e);
		};
	}

	play() {
		this.audioElement.play().then(() => {

        }).catch((e) => {
        	console.log('audioElement#play unsuccessful.')
        	console.error(e);
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
		this.audioElement.load();
		this.updateTitle();
		this.download.href = this.audioElement.src;
		this.play();
	}

	updateTitle() {
		let filename = this.state.playlist[this.state.playlist.length - 1];
		filename = filename.substring(filename.lastIndexOf('/') + 1);
		filename = filename.substring(0, filename.lastIndexOf('.'));
		this.titleDiv.innerText = this.songTitleLookup[filename];
	}
}

window.onload = () => {
	const audioDiv = document.querySelector('#audioPlayer');
	const playerInstance = new AudioPlayer(audioDiv);
};
