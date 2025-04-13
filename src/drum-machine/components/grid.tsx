'use strict';

import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import BarHeaders from './bar-headers';

interface CoreStoreSelectors {
	getSite: () => { url: string; [ key: string ]: unknown };
}

export default function Grid() {
	const siteUrl = useSelect(
		( select: ( storeName: string ) => CoreStoreSelectors ) =>
			select( 'core' ).getSite()?.url,
		[]
	);

	const samplesDirUrl = siteUrl
		? `${ siteUrl }/wp-content/plugins/drum-n-berg/build/assets/samples`
		: undefined;

	return (
		<div className="drum-n-berg__grid">
			<BarHeaders />

			<InnerBlocks
				allowedBlocks={ [ 'drum-n-berg/track' ] }
				template={ [
					[
						'drum-n-berg/track',
						{ name: 'Kick', url: `${ samplesDirUrl }/kick.wav` },
					],
					[
						'drum-n-berg/track',
						{
							name: 'Hi-Hat',
							url: `${ samplesDirUrl }/hihat.wav`,
						},
					],
					[
						'drum-n-berg/track',
						{ name: 'Snare', url: `${ samplesDirUrl }/snare.wav` },
					],
				] }
			/>
		</div>
	);
}
