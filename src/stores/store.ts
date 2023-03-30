import { writable, derived } from 'svelte/store';

export const nightMode = writable(true);

export const currentUrl = writable("/");