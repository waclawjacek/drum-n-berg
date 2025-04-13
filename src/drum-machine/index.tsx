'use strict';

import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';
import icon from '../../assets/drum-n-berg-icon.png';
import { registerStore } from '../data';

registerStore();

// @ts-ignore: It looks like the types for registerBlockType are not up to date.
registerBlockType( metadata.name, {
	icon: <img src={ icon } alt={ metadata.title } />,
	edit: Edit,
	save: Save,
} );
