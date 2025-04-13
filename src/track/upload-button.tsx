'use strict';

import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';
import { Media } from '../types';

interface Props {
	mediaId: number | undefined;
	setMedia: ( media: Media ) => void;
}

export function UploadButton( { mediaId, setMedia }: Props ) {
	return (
		<MediaUploadCheck>
			<MediaUpload
				value={ Number( mediaId ) }
				onSelect={ setMedia }
				title={ __( 'Choose an Audio Sample', 'drum-n-berg' ) }
				allowedTypes={ [ 'audio' ] }
				render={ ( { open }: { open: () => void } ) => (
					<Button
						size="small"
						onClick={ open }
						variant="secondary"
						className="drum-n-berg__upload-button"
					>
						{ __( 'Choose sample', 'drum-n-berg' ) }
					</Button>
				) }
			/>
		</MediaUploadCheck>
	);
}
