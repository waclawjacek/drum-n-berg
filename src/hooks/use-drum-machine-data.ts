'use strict';

import { useSelect, useDispatch } from '@wordpress/data';
import { STORE_NAME } from '../data/store';
import { Selectors, ActionCreators } from '../data/types';

/**
 * Exposes functions retrieving and manipulating the drum machine data.
 *
 * @param {string} drumMachineClientId Client ID of the drum machine.
 *
 * @returns {Object} Drum machine data and functions.
 */
export const useDrumMachineData = ( drumMachineClientId: string ) => {
	const currentBeat = useSelect(
		( select: ( storeName: string ) => Selectors ) =>
			select( STORE_NAME ).getCurrentBeat( drumMachineClientId ),
		[ drumMachineClientId ]
	);

	const isPlaying = useSelect(
		( select: ( storeName: string ) => Selectors ) =>
			select( STORE_NAME ).isPlaying( drumMachineClientId ),
		[ drumMachineClientId ]
	);

	const { nextBeat, restartPlaying, stopPlaying }: ActionCreators =
		useDispatch( STORE_NAME );

	return {
		currentBeat,
		isPlaying,
		nextBeat: () => nextBeat( drumMachineClientId ),
		restartPlaying: () => restartPlaying( drumMachineClientId ),
		stopPlaying: () => stopPlaying( drumMachineClientId ),
	};
};
