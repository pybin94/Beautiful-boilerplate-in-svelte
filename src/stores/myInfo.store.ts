import { writable, derived } from 'svelte/store';

export const levelStore = writable(99);

export const balanceStore = writable(0);
export const balanceSiteStore = writable(0);
export const pointStore = writable(0);

export const casinoRollingRateStore = writable(0);
export const casinoLosingRateStore = writable(0);

export const slotRollingRateStore = writable(0);
export const slotLosingRateStore = writable(0);

export const minigameRollingRateStore = writable(0);
export const minigameLosingRateStore = writable(0);
