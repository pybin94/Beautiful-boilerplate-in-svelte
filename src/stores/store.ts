import { getCookie } from '../utils/helpers';
import { writable, derived } from 'svelte/store';

export const lightMode = writable(getCookie("lightMode") ? getCookie("lightMode") : "on");

export const currentUrl = writable("/");