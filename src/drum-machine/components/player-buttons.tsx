'use strict';

import React from 'react';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDrumMachinePlayer, useDrumMachineStatus } from '../../hooks';

interface Props {
	bpm: number;
	drumMachineClientId: string;
}

export default function PlayerButtons( { bpm, drumMachineClientId }: Props ) {
	const { play, stop } = useDrumMachinePlayer( drumMachineClientId, bpm );
	const { isPlaying } = useDrumMachineStatus( drumMachineClientId );

	return (
		<div className="drum-n-berg__player-buttons">
			<Button variant="primary" onClick={ play } disabled={ isPlaying }>
				{ __( 'Play', 'drum-n-berg' ) }
			</Button>
			<Button
				variant="secondary"
				onClick={ stop }
				disabled={ ! isPlaying }
			>
				{ __( 'Stop', 'drum-n-berg' ) }
			</Button>
			<span style={ { marginLeft: 'auto' } }>
				{ __( 'BPM:', 'drum-n-berg' ) } { bpm }
			</span>
		</div>
	);
}
