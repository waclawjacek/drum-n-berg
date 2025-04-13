'use strict';

import React from 'react';
import { useState } from '@wordpress/element';
import { useTrackAudioPlayer } from '../hooks/use-track-audio-player';
import { useDrumMachineStatus } from '../hooks/use-drum-machine-status';
import { TrackBlockAttributes } from '../types';
import { barCount } from '../config';

interface Props {
	attributes: TrackAttributesFrontEnd;
	drumMachineClientId: string;
}

type TrackAttributesFrontEnd = Pick<
	TrackBlockAttributes,
	'name' | 'url' | 'isPlayingOnBeat'
>;

export const Track = ( { attributes, drumMachineClientId }: Props ) => {
	const { name, url } = attributes;
	const { currentBeat, isPlaying } =
		useDrumMachineStatus( drumMachineClientId );

	const [ isPlayingOnBeat, setIsPlayingOnBeatRaw ] = useState(
		attributes.isPlayingOnBeat
	);

	useTrackAudioPlayer( drumMachineClientId, url, isPlayingOnBeat );

	const setIsPlayingOnBeat = ( beatIndex: number ) => {
		const newValue = [ ...isPlayingOnBeat ];
		newValue[ beatIndex ] = ! newValue[ beatIndex ];
		setIsPlayingOnBeatRaw( newValue );
	};

	return (
		<div className="drum-n-berg__track">
			<div>{ name }</div>
			{ Array( barCount * 4 )
				.fill( undefined )
				.map( ( _, beatIndex ) => (
					<div
						key={ `beat-${ beatIndex }` }
						className={ `drum-n-berg__beat-cell ${
							isPlaying && beatIndex === currentBeat
								? 'drum-n-berg__beat-cell--is-current'
								: ''
						}` }
					>
						<input
							type="checkbox"
							checked={ Boolean( isPlayingOnBeat[ beatIndex ] ) }
							onChange={ () => setIsPlayingOnBeat( beatIndex ) }
						/>
					</div>
				) ) }
		</div>
	);
};
