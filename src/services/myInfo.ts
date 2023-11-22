import { levelStore } from "stores/myInfo.store";
import { getCookie, got } from "utils/helpers";

export const getMyInfo = async () => {
    const response = getCookie("adminInfo") && await got('/admin', "POST")
    if(response?.status == 1) {
        levelStore.set(response.data.level);
    }
}
