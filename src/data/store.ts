/**
 * The drum machine player data store.
 *
 * Do not use this store directly. Instead, use the hooks defined in `/src/hooks`.
 */

'use strict';

import { createReduxStore, register } from '@wordpress/data';
import { barCount } from '../config';
import { State, Action } from './types';

export const STORE_NAME = 'drum-n-berg-player-data';

const getNextBeatIndex = ( state: State, action: Action ) => {
	const currentBeat =
		state.drumMachines[ action.drumMachineId ]?.currentBeat || 0;

	return ( currentBeat + 1 ) % ( barCount * 4 );
};

const DEFAULT_STATE: State = {
	drumMachines: {},
};

const store = createReduxStore( STORE_NAME, {
	selectors: {
		/**
		 * Get the currently playing beat of a drum machine.
		 *
		 * @param {State} state Current state of the store.
		 * @param {string} drumMachineId ID of the drum machine.
		 *
		 * @returns {number} Current beat of the drum machine.
		 */
		getCurrentBeat: ( state: State, drumMachineId: string ): number =>
			state.drumMachines[ drumMachineId ]?.currentBeat || 0,

		/**
		 * Get whether a drum machine is currently playing.
		 *
		 * @param {State} state Current state of the store.
		 * @param {string} drumMachineId ID of the drum machine.
		 *
		 * @returns {boolean} Whether the drum machine is playing.
		 */
		isPlaying: ( state: State, drumMachineId: string ): boolean =>
			state.drumMachines[ drumMachineId ]?.isPlaying || false,
	},

	actions: {
		/**
		 * Set the currently playing beat of a drum machine.
		 *
		 * @param {string} drumMachineId ID of the drum machine.
		 * @param {number} beatIndex Index of the beat to set.
		 */
		setCurrentBeat: (
			drumMachineId: string,
			beatIndex: number
		): Action => ( {
			type: 'SET_CURRENT_BEAT',
			drumMachineId,
			beatIndex,
		} ),

		/**
		 * Move to the next beat of a drum machine.
		 *
		 * @param {string} drumMachineId ID of the drum machine.
		 */
		nextBeat: ( drumMachineId: string ): Action => ( {
			type: 'NEXT_BEAT',
			drumMachineId,
		} ),

		/**
		 * Restart the playback of a drum machine.
		 *
		 * Resets the current beat to 0 and starts playing.
		 *
		 * @param {string} drumMachineId ID of the drum machine.
		 */
		restartPlaying: ( drumMachineId: string ): Action => ( {
			type: 'RESTART_PLAYING',
			drumMachineId,
		} ),

		/**
		 * Stop the playback of a drum machine.
		 *
		 * @param {string} drumMachineId ID of the drum machine.
		 */
		stopPlaying: ( drumMachineId: string ): Action => ( {
			type: 'STOP_PLAYING',
			drumMachineId,
		} ),
	},

	reducer: ( state = DEFAULT_STATE, action: Action ) => {
		switch ( action.type ) {
			case 'SET_CURRENT_BEAT':
				return {
					...state,
					drumMachines: {
						...state.drumMachines,
						[ action.drumMachineId ]: {
							...state.drumMachines[ action.drumMachineId ],
							currentBeat: action.beatIndex,
						},
					},
				};

			case 'NEXT_BEAT':
				return {
					...state,
					drumMachines: {
						...state.drumMachines,
						[ action.drumMachineId ]: {
							...state.drumMachines[ action.drumMachineId ],
							currentBeat: getNextBeatIndex( state, action ),
						},
					},
				};

			case 'RESTART_PLAYING':
				return {
					...state,
					drumMachines: {
						...state.drumMachines,
						[ action.drumMachineId ]: {
							...state.drumMachines[ action.drumMachineId ],
							currentBeat: 0,
							isPlaying: true,
						},
					},
				};

			case 'STOP_PLAYING':
				return {
					...state,
					drumMachines: {
						...state.drumMachines,
						[ action.drumMachineId ]: {
							...state.drumMachines[ action.drumMachineId ],
							isPlaying: false,
						},
					},
				};
		}

		return state;
	},
} );

export const registerStore = () => {
	register( store );
};
