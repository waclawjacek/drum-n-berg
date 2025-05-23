'use strict';

import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

/**
 * Note icon for the track block.
 *
 * It is a copy of WordPress's Audio block icon.
 */
const noteIcon = (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M17.7 4.3c-1.2 0-2.8 0-3.8 1-.6.6-.9 1.5-.9 2.6V14c-.6-.6-1.5-1-2.5-1C8.6 13 7 14.6 7 16.5S8.6 20 10.5 20c1.5 0 2.8-1 3.3-2.3.5-.8.7-1.8.7-2.5V7.9c0-.7.2-1.2.5-1.6.6-.6 1.8-.6 2.8-.6h.3V4.3h-.4z"></path>
	</svg>
);

// @ts-ignore: It looks like the types for registerBlockType are not up to date.
registerBlockType( metadata.name, {
	icon: noteIcon,
	edit: Edit,
	save: Save,
} );
