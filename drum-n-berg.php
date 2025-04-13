<?php
/**
 * Plugin Name:       Drum'n'Berg
 * Description:       A drum machine block for WordPress.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Wacław Jacek <waclawjacek@gmail.com>
 * Author URI:        https://waclaw.blog/
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       drum-n-berg
 *
 * @package drum-n-berg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Load the block metadata JSON.
$drum_n_berg_metadata = array(
	'drum_machine' => json_decode( file_get_contents( __DIR__ . '/build/drum-machine/block.json' ), true ),
	'track' => json_decode( file_get_contents( __DIR__ . '/build/track/block.json' ), true ),
);

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function drum_n_berg_block_init()
{
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}

	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'drum_n_berg_block_init' );

/**
 * Adds the Drum'n'Berg instance config as inline JS.
 *
 * Adds the inline JS before the block is rendered.
 *
 * @param string $block_content
 * @param array $block
 *
 * @return string
 */
function drum_n_berg_add_instance_config_inline_js( $block_content, $block )
{
	global $drum_n_berg_metadata;

	$drum_machine_attributes = $drum_n_berg_metadata['drum_machine']['attributes'];
	$track_attributes = $drum_n_berg_metadata['track']['attributes'];

	// Format the config.
	$config = array(
		'bpm' => $block['attrs']['bpm'] ?? $drum_machine_attributes['bpm']['default'],
		'tracks' => array_map( function ( $track ) use ( $track_attributes ) {
			return array(
				'name' => $track['attrs']['name'] ?? $track_attributes['name']['default'],
				'url' => $track['attrs']['url'] ?? $track_attributes['url']['default'],
				'isPlayingOnBeat' => $track['attrs']['isPlayingOnBeat'] ?? $track_attributes['isPlayingOnBeat']['default'],
			);
		}, $block['innerBlocks'] ),
	);

	wp_add_inline_script(
		'drum-n-berg-drum-machine-view-script',
		"var DrumNBergInstancesConfig = [ ...DrumNBergInstancesConfig ?? [], " . wp_json_encode( $config ) . " ];",
		'before'
	);

	return $block_content;
}
add_filter( 'render_block_' . $drum_n_berg_metadata['drum_machine']['name'], 'drum_n_berg_add_instance_config_inline_js', 10, 2 );
