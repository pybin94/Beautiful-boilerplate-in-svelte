import { currentUrl } from '../stores/store';
import { navigate } from 'svelte-routing';
import { got } from '../utils/helpers';
import { popup } from 'utils/popup';
import { detailInfo } from 'constants/myInfo';

export const createUser = async (
    userInfo: Array<any>
) => {

    if(detailInfo[0][0] < userInfo[8]) return popup("카지노 롤링이 상위요율보다 큽니다.");
    if(detailInfo[0][1] < userInfo[9]) return popup("카지노 루징이 상위요율보다 큽니다.");
    if(detailInfo[1][0] < userInfo[10]) return popup("슬롯 롤링이 상위요율보다 큽니다.");
    if(detailInfo[1][1] < userInfo[11]) return popup("슬롯 루징이 상위요율보다 큽니다.");
    if(detailInfo[2][0] < userInfo[12]) return popup("미니게임 롤링이 상위요율보다 큽니다.");
    if(detailInfo[2][1] < userInfo[13]) return popup("미니게임 루징이 상위요율보다 큽니다.");
    

    let params = {
        identity: userInfo[0],
        nickname: userInfo[1],
        password: userInfo[2],
        passwordConfirm: userInfo[3],
        accountHolder: userInfo[4],
        phoneNumber: userInfo[5],
        bank: userInfo[6],
        accountNumber: userInfo[7],
        casinoRollingRate: userInfo[8],
        casinoLosingRate: userInfo[9],
        slotRollingRate: userInfo[10],
        slotLosingRate: userInfo[11],
        minigameRollingRate: userInfo[12],
        minigameLosingRate: userInfo[13],
        bonusLevel: userInfo[14],
        bettingLimitLevel: userInfo[15],
        isReferer: userInfo[16],
        memo: userInfo[17],
    }

    const response = await got("/user/create", "POST", params)
    popup(response.message, response.status)
    if(response.status === 1) {
        navigate("/user/list", { replace: false });   
        currentUrl.set(window.location.pathname)
    }
}