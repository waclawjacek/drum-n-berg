'use strict';

/**
 * JavaScript code that will run in the front-end on posts/pages that contain this block.
 */

import React from 'react';
import { createRoot } from '@wordpress/element';
import { registerStore } from '../data';
import PlayerButtons from './components/player-buttons';
import BarHeaders from './components/bar-headers';
import { Track } from '../track/track';
import { DrumMachineViewAttributes } from '../types';

interface Props {
	attributes: DrumMachineViewAttributes;
	clientId: string;
}

/**
 * Renders the front-end view of the Drum Machine block.
 */
const View = ( { attributes, clientId }: Props ) => {
	const { bpm, tracks } = attributes;

	return (
		<>
			<PlayerButtons bpm={ bpm } drumMachineClientId={ clientId } />
			<div className="drum-n-berg__grid">
				<BarHeaders />

				{ tracks.map( ( track, index: number ) => {
					return (
						<Track
							key={ index }
							attributes={ track }
							drumMachineClientId={ clientId }
						/>
					);
				} ) }
			</div>
		</>
	);
};

/**
 * Renders all drum machine blocks on the front-end.
 */
const renderDrumMachines = () => {
	registerStore();

	const domElements = document.querySelectorAll(
		'.wp-block-drum-n-berg-drum-machine'
	);

	domElements.forEach( ( domElement, index ) => {
		const root = createRoot( domElement );
		root.render(
			<View
				attributes={ window.DrumNBergInstancesConfig[ index ] }
				clientId={ String( index ) }
			/>
		);
	} );
};

window.addEventListener( 'DOMContentLoaded', renderDrumMachines );
