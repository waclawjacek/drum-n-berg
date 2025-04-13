'use strict';

import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

interface Props {
	bpm: number;
	setBpm: ( bpm: number ) => void;
}

export default function SettingsSidebar( { bpm, setBpm }: Props ) {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Settings', 'drum-n-berg' ) }>
				<NumberControl
					__next40pxDefaultSize
					label={ __( 'BPM (Beats Per Minute)', 'drum-n-berg' ) }
					help={ __(
						'The higher this number, the faster the rhythm.',
						'drum-n-berg'
					) }
					value={ bpm }
					onChange={ ( value ) => setBpm( Number( value ) ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
