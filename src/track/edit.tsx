'use strict';

import React from 'react';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, CheckboxControl } from '@wordpress/components';
import { UploadButton } from './upload-button';
import { useTrackAudioPlayer } from '../hooks/use-track-audio-player';
import { useDrumMachineStatus } from '../hooks/use-drum-machine-status';
import { TrackBlockAttributes, Media } from '../types';
import { barCount } from '../config';
import metadata from './block.json';

interface Props {
	attributes: TrackBlockAttributes;
	setAttributes: ( attributes: Partial< TrackBlockAttributes > ) => void;
	clientId: string;
}

interface CoreBlockEditorStoreSelectors {
	getBlockParents: ( clientId: string ) => string[];
}

export default function Edit( {
	attributes: { name, url, mediaId, isPlayingOnBeat },
	setAttributes,
	clientId,
}: Props ) {
	const drumMachineClientId = useSelect(
		( select: ( storeName: string ) => CoreBlockEditorStoreSelectors ) =>
			select( 'core/block-editor' ).getBlockParents( clientId )[ 0 ],
		[ clientId ]
	);
	const { currentBeat, isPlaying } =
		useDrumMachineStatus( drumMachineClientId );

	name = name || metadata.attributes.name.default;
	url = url || undefined;
	mediaId = mediaId || undefined;
	isPlayingOnBeat =
		isPlayingOnBeat || metadata.attributes.isPlayingOnBeat.default;

	useTrackAudioPlayer( drumMachineClientId, url, isPlayingOnBeat );

	const setIsPlayingOnBeat = ( beatIndex: number ) => {
		const newValue = [ ...isPlayingOnBeat ];
		newValue[ beatIndex ] = ! newValue[ beatIndex ];
		setAttributes( { isPlayingOnBeat: newValue } );
	};

	const setMedia = ( media: Media ) => {
		if ( media?.id && media?.url ) {
			setAttributes( { mediaId: media.id, url: media.url } );
		} else {
			setAttributes( { mediaId: undefined, url: undefined } );
		}
	};

	return (
		<div { ...useBlockProps( { className: 'drum-n-berg__track' } ) }>
			<div>
				<TextControl
					__nextHasNoMarginBottom
					value={ name }
					onChange={ ( value ) => setAttributes( { name: value } ) }
				/>
				<UploadButton mediaId={ mediaId } setMedia={ setMedia } />
			</div>
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
						<CheckboxControl
							__nextHasNoMarginBottom
							checked={ Boolean( isPlayingOnBeat[ beatIndex ] ) }
							onChange={ () => setIsPlayingOnBeat( beatIndex ) }
						/>
					</div>
				) ) }
		</div>
	);
}
