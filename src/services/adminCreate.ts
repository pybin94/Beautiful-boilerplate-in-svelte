import { got } from '../utils/helpers';

interface AdminInfo {
    identity: string;
    user_name: string;
    password: string;
    passwordConfirm: string;
    set1: string | number;
    set2: string | number;
    set3: string | number;
    memo: string | number;
}

export const createAdmin = async (
    adminInfo: Array<any>
) => {

    let params: AdminInfo = {
        identity: adminInfo[0],
        user_name: adminInfo[1],
        password: adminInfo[2],
        passwordConfirm: adminInfo[3],
        set1: adminInfo[0],
        set2: adminInfo[1],
        set3: adminInfo[2],
        memo: adminInfo[3]
    }

    const response = await got("/admin/create", "POST", params)
    if(response === 1) {
        alert("유저 생성이 완료됐습니다.")
    }
}