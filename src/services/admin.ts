import { adminLevel } from '../constants/admin';
import { currentUrl } from '../stores/store';
import { navigate } from 'svelte-routing';
import { got } from '../utils/helpers';
import { popup } from 'utils/popup';
import { detailInfo } from 'constants/myInfo';

export const createAdmin = async (
    adminInfo: Array<any>
) => {

    if(detailInfo[0][0] < adminInfo[9]) return popup("카지노 롤링이 상위요율보다 큽니다.");
    if(detailInfo[0][1] < adminInfo[10]) return popup("카지노 루징이 상위요율보다 큽니다.");
    if(detailInfo[1][0] < adminInfo[12]) return popup("슬롯 롤링이 상위요율보다 큽니다.");
    if(detailInfo[1][1] < adminInfo[13]) return popup("슬롯 루징이 상위요율보다 큽니다.");
    if(detailInfo[2][0] < adminInfo[15]) return popup("미니게임 롤링이 상위요율보다 큽니다.");
    if(detailInfo[2][1] < adminInfo[16]) return popup("미니게임 루징이 상위요율보다 큽니다.");
    
    let params = {
        identity: adminInfo[0],
        password: adminInfo[1],
        passwordConfirm: adminInfo[2],
        nickname: adminInfo[3],
        code: adminInfo[4],
        accountHolder: adminInfo[5],
        phoneNumber: adminInfo[6],
        bank: adminInfo[7],
        accountNumber: adminInfo[8],
        casinoRollingRate: adminInfo[9],
        casinoLosingRate: adminInfo[10],
        slotRollingRate: adminInfo[11],
        slotLosingRate: adminInfo[12],
        minigameRollingRate: adminInfo[13],
        minigameLosingRate: adminInfo[14],
        memo: adminInfo[15],
    };

    const response = await got("/admin/create", "POST", params);
    popup(response.message, response.status);
    
    if(response.status === 1) {
        navigate("/admin/list", { replace: false });   
        currentUrl.set(window.location.pathname);
    };
}

export const handleGetTopList = async (setId: number) => {

    let params = {
        id: setId
    };

    const response = await got("/admin/top", "POST", params);

    if(response.status == 1) {
        let adminTop = [];
        response.data.forEach((item)=>{
            adminLevel.forEach(levelItem => {
                if(item.level == levelItem.level) {
                    adminTop = [...adminTop, levelItem.levelName + " : " + item.identity];
                };
            });
        })
        adminTop.reverse();
        return adminTop;
    };
};

export const handleAdminTop = async (e: any, topId: any) => {
    let topList: Array<String>;
    let popoverContent: string = "";

    if(!e.target.childNodes[0].innerHTML){
        topList = await handleGetTopList(topId)
        topList.forEach((item)=>{
            popoverContent += `${item} <br>`
        })
        e.target.childNodes[0].innerHTML = popoverContent;
    };

    document.querySelectorAll(".admin-top").forEach((itme)=>{
        itme.classList.remove("show")
    })
    document.querySelectorAll(".admin-top__popover").forEach((itme)=>{
        itme.classList.remove("show")
    })

    if(e.target.classList.contains("admin-top__popover.show")) {
        e.target.classList.toggle("show");
        e.target.parentNode.classList.toggle("show");
    } else {
        e.target.childNodes[0].classList.toggle("show");
        e.target.classList.toggle("show");
    }
}