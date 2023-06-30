import { balanceStore, balanceSiteStore, pointStore, levelStore, casinoRollingRateStore, casinoLosingRateStore, slotRollingRateStore, slotLosingRateStore, minigameRollingRateStore, minigameLosingRateStore } from "stores/myInfo.store";
import { getCookie, got } from "utils/helpers";

const init = () => {
    getMyInfo()
}

export const getMyInfo = async () => {
    const response = getCookie("adminInfo") && await got('/admin', "POST")
    if(response?.status == 1) {
        levelStore.set(response.data.level);
        balanceStore.set(Math.floor(response.data.balance));
        pointStore.set(Math.floor(response.data.point));

        if(response.data.level <= 1) {
            const responseSite = getCookie("adminInfo") && await got('/site')
            balanceSiteStore.set(Math.floor(responseSite.data.balance));
        }

        const rate = response.data.adminCommissionRate;
    
        casinoRollingRateStore.set(rate?.casinoLosingRate);
        casinoLosingRateStore.set(rate?.casinoRollingRate);
        slotRollingRateStore.set(rate?.slotRollingRate);
        slotLosingRateStore.set(rate?.slotLosingRate);
        minigameRollingRateStore.set(rate?.minigameRollingRate);
        minigameLosingRateStore.set(rate?.minigameLosingRate);
    }
}

init()