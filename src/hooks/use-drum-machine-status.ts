'use strict';

import { useDrumMachineData } from './use-drum-machine-data';

export const useDrumMachineStatus = ( drumMachineClientId: string ) => {
	const { currentBeat, isPlaying } =
		useDrumMachineData( drumMachineClientId );

	return {
		currentBeat,
		isPlaying,
	};
};
