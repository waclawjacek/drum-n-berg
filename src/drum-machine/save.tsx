'use strict';

import React from 'react';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Generates the structure of the block that will be saved to the database.
 */
export default function Save() {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
}
