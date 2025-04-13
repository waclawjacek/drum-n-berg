'use strict';

import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import Grid from './components/grid';
import SettingsSidebar from './components/settings-sidebar';
import PlayerButtons from './components/player-buttons';
import metadata from './block.json';
import { DrumMachineBlockAttributes } from '../types';

interface Props {
	attributes: DrumMachineBlockAttributes;
	setAttributes: (
		attributes: Partial< DrumMachineBlockAttributes >
	) => void;
	clientId: string;
}

/**
 * Renders the edit view of the Drum Machine block.
 */
export default function Edit( { attributes, setAttributes, clientId }: Props ) {
	const bpm = attributes.bpm || metadata.attributes.bpm.default;

	const setBpm = ( value: number ) => {
		setAttributes( { bpm: value } );
	};

	return (
		<>
			<SettingsSidebar bpm={ bpm } setBpm={ setBpm } />
			<div { ...useBlockProps( { className: 'drum-n-berg' } ) }>
				<PlayerButtons bpm={ bpm } drumMachineClientId={ clientId } />
				<Grid />
			</div>
		</>
	);
}
