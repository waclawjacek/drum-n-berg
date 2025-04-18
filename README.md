# Drum'n'Berg

A drum machine block for WordPress.

[See a demo using WordPress Playground](https://playground.wordpress.net/#eyIkc2NoZW1hIjoiaHR0cHM6Ly9wbGF5Z3JvdW5kLndvcmRwcmVzcy5uZXQvYmx1ZXByaW50LXNjaGVtYS5qc29uIiwibGFuZGluZ1BhZ2UiOiIvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD00JmFjdGlvbj1lZGl0IiwibG9naW4iOnRydWUsInN0ZXBzIjpbeyJzdGVwIjoiaW5zdGFsbFBsdWdpbiIsInBsdWdpbkRhdGEiOnsicmVzb3VyY2UiOiJ1cmwiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi1wcm94eS5jb20vcHJveHkvP3JlcG89d2FjbGF3amFjZWsvZHJ1bS1uLWJlcmcmcmVsZWFzZT0wLjEuMCZhc3NldD1kcnVtLW4tYmVyZy56aXAifX0seyJzdGVwIjoid3JpdGVGaWxlIiwicGF0aCI6Ii93b3JkcHJlc3Mvd3AtY29udGVudC9wb3N0Y29udGVudC5tZCIsImRhdGEiOnsicmVzb3VyY2UiOiJ1cmwiLCJ1cmwiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vd2FjbGF3amFjZWsvZHJ1bS1uLWJlcmcvbWFpbi9hc3NldHMvZGVtby1wb3N0LWNvbnRlbnQubWQifX0seyJzdGVwIjoicnVuUEhQIiwiY29kZSI6Ijw/cGhwIHJlcXVpcmVfb25jZSAnd29yZHByZXNzL3dwLWxvYWQucGhwJzsgJHBvc3RfY29udGVudCA9IGFkZHNsYXNoZXMoIGZpbGVfZ2V0X2NvbnRlbnRzKCAnL3dvcmRwcmVzcy93cC1jb250ZW50L3Bvc3Rjb250ZW50Lm1kJyApICk7IHdwX2luc2VydF9wb3N0KGFycmF5KCdwb3N0X3RpdGxlJyA9PiAnRHJ1bVxcJ25cXCdCZXJnIFNhbXBsZSBCZWF0JywgJ3Bvc3RfY29udGVudCcgID0+ICRwb3N0X2NvbnRlbnQsICdwb3N0X2F1dGhvcicgICA9PiAxLCAncG9zdF9zdGF0dXMnID0+ICdwdWJsaXNoJykpOyA/PiJ9XSwicHJlZmVycmVkVmVyc2lvbnMiOnsicGhwIjoiOC4wIiwid3AiOiJsYXRlc3QifSwiZmVhdHVyZXMiOnt9fQ==)

![](./assets/drum-n-berg-700.png)

## What is Drum'n'Berg?

Drum'n'Berg is for you if you:

- Are selling audio sample packs online.
- Want to add an audio surprise to your blog.
- Are bored when writing a long article and want to lay down a sick beat.

## What can it do?

Add as many tracks as you want, upload your samples of choice, program the beat you want and listen to it from within the WordPress block editor.

If you publish your post, visitors will be able to listen to your production and even play with it, but not change the tracks or BPM.

## Where can I find audio samples?

Drum'n'Berg comes with demo samples that can be found in the `assets/samples` directory.

You can find more public copyright licensed samples online, including on sites like:

- [Citizen DJ](https://citizen-dj.labs.loc.gov/)
  > Make music using the free-to-use audio and video materials from the Library of Congress
- [freesound](https://freesound.org/)
  > Freesound aims to create a huge collaborative database of audio snippets, samples, recordings, and all sorts of bleeps, ... released under Creative Commons licenses that allow their reuse.

## How is this project structured

### Registered blocks

The plugin registers two Gutenberg blocks:

- the drum machine: `drum-n-berg/drum-machine`,
- a drum machine track: `drum-n-berg/track`.

The drum machine block is the main block and is the only one available from a post context.

The track block can only be added within a drum machine block.

### Conventions

The project uses

- TypeScript
- SASS (BEM methodology)

## Known issues

For a list of known issues, please visit [the Issues tab](https://github.com/waclawjacek/drum-n-berg/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen) of this repository.

## Acknowledgements

- [howler.js](https://howlerjs.com/) - Audio library for the modern web.
