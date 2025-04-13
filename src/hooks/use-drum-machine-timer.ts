'use strict';

import { useRef, useEffect } from '@wordpress/element';
import { useDrumMachineData } from './use-drum-machine-data';

const oneMinuteInMs = 60000;

/**
 * Exposes functions to manipulate the drum machine's playback timer.
 *
 * @param {string} drumMachineClientId Client ID of the drum machine.
 * @param {number} bpm Beats per minute.
 *
 * @returns {Object} Functions to start and stop the drum machine timer.
 */
export const useDrumMachineTimer = (
	drumMachineClientId: string,
	bpm: number
) => {
	const { nextBeat, stopPlaying, restartPlaying, isPlaying } =
		useDrumMachineData( drumMachineClientId );

	const timer = useRef< NodeJS.Timeout | undefined >( undefined );

	const stop = () => {
		if ( undefined !== timer.current ) {
			clearInterval( timer.current );
			timer.current = undefined;
		}

		stopPlaying();
	};

	const play = () => {
		stop();
		timer.current = setInterval( nextBeat, oneMinuteInMs / bpm );
		restartPlaying();
	};

	const restartIfPlaying = () => {
		if ( isPlaying ) {
			play();
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps -- We want this to only trigger when bpm changes.
	useEffect( restartIfPlaying, [ bpm ] );

	return {
		stop,
		play,
	};
};
