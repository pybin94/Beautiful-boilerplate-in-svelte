import { balanceStore, balanceSiteStore, pointStore, casinoLosingRateStore, casinoRollingRateStore, levelStore, minigameLosingRateStore, minigameRollingRateStore, slotLosingRateStore, slotRollingRateStore } from "stores/myInfo.store";
import { getCookie } from "utils/helpers";
import { got, moneyFormat } from "utils/helpers";

let casinoRollingRate: number;
let casinoLosingRate: number;
let slotRollingRate: number;
let slotLosingRate: number;
let minigameRollingRate: number;
let minigameLosingRate: number;

casinoRollingRateStore.subscribe(value => { casinoRollingRate = value });
casinoLosingRateStore.subscribe(value => { casinoLosingRate = value });
slotRollingRateStore.subscribe(value => { slotRollingRate = value });
slotLosingRateStore.subscribe(value => { slotLosingRate = value });
minigameRollingRateStore.subscribe(value => { minigameRollingRate = value });
minigameLosingRateStore.subscribe(value => { minigameLosingRate = value });

export const myInfo = getCookie("adminInfo") && JSON.parse(getCookie("adminInfo"));
export const detailInfo = [
    {title: "카지노", data: [casinoRollingRate, casinoLosingRate]},
    {title: "슬롯", data: [slotRollingRate, slotLosingRate]},
    {title: "미니게임", data: [minigameRollingRate, minigameLosingRate]}, 
];