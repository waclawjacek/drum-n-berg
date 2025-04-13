'use strict';

export interface State {
	drumMachines: {
		[ drumMachineId: string ]: {
			currentBeat: number;
			isPlaying: boolean;
		};
	};
}

export interface Selectors {
	getCurrentBeat: ( drumMachineId: string ) => number;
	isPlaying: ( drumMachineId: string ) => boolean;
}

export type Action =
	| { type: 'SET_CURRENT_BEAT'; drumMachineId: string; beatIndex: number }
	| { type: 'NEXT_BEAT'; drumMachineId: string }
	| { type: 'RESTART_PLAYING'; drumMachineId: string }
	| { type: 'STOP_PLAYING'; drumMachineId: string };

export interface ActionCreators {
	setCurrentBeat: ( drumMachineId: string, beatIndex: number ) => void;
	nextBeat: ( drumMachineId: string ) => void;
	restartPlaying: ( drumMachineId: string ) => void;
	stopPlaying: ( drumMachineId: string ) => void;
}
