'use strict';

import { useRef, useEffect } from '@wordpress/element';
import { Howl } from 'howler';
import { useDrumMachineStatus } from './use-drum-machine-status';

export const useTrackAudioPlayer = (
	drumMachineClientId: string,
	url: string | undefined,
	isPlayingOnBeat: boolean[]
) => {
	const { currentBeat, isPlaying } =
		useDrumMachineStatus( drumMachineClientId );
	const player = useRef< Howl | undefined >( undefined );

	const updateSampleUrl = () => {
		if ( ! url ) {
			return;
		}

		player.current = new Howl( {
			src: [ url ],
		} );
	};

	const playSound = () => {
		if ( isPlaying && player.current && isPlayingOnBeat[ currentBeat ] ) {
			player.current.play();
		}
	};

	const stopSound = () => {
		if ( ! isPlaying && player.current ) {
			player.current.stop();
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps -- We want this to only trigger when url changes.
	useEffect( updateSampleUrl, [ url ] );

	// eslint-disable-next-line react-hooks/exhaustive-deps -- We want this to only trigger when currentBeat or isPlaying changes.
	useEffect( playSound, [ currentBeat, isPlaying ] );

	// eslint-disable-next-line react-hooks/exhaustive-deps -- We want this to only trigger when isPlaying changes.
	useEffect( stopSound, [ isPlaying ] );
};
