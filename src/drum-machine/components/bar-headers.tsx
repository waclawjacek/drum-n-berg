'use strict';

import React from 'react';
import { __ } from '@wordpress/i18n';
import { barCount } from '../../config';

export default function BarHeaders() {
	return (
		<>
			{ /* Empty cell for track name column */ }
			<div key="bar-none"></div>

			{ /* Bar headers */ }
			{ Array( barCount )
				.fill( undefined )
				.map( ( _, barIndex ) => (
					<div
						key={ `bar-${ barIndex }` }
						className="drum-n-berg__bar-headers"
						style={ {
							gridColumn: `span ${ barCount }`,
						} }
					>
						{ __( 'Bar', 'drum-n-berg' ) } { barIndex + 1 }
					</div>
				) ) }
		</>
	);
}
