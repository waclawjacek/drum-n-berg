'use strict';

import { DrumMachineViewAttributes } from './index';

declare global {
	interface Window {
		DrumNBergInstancesConfig: DrumMachineViewAttributes[];
	}

	declare module '*.png';
}

export {};