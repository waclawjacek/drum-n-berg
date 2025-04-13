'use strict';

/**
 * Drum machine block attributes as used by the block editor.
 */
export interface DrumMachineBlockAttributes {
	bpm: number;
}

/**
 * Drum machine block attributes generated by PHP for use on the front-end.
 *
 * It includes the track attributes the <Track> inner block normally holds.
 */
export interface DrumMachineViewAttributes extends DrumMachineBlockAttributes {
	tracks: TrackBlockAttributes[];
}

export interface Media {
	id: number;
	url: string;
}

export interface TrackBlockAttributes {
	name: string;
	url: string | undefined;
	mediaId: number | undefined;
	isPlayingOnBeat: boolean[];
}
