import { got } from './../utils/helpers';

interface UserInfo {
    identity: string;
    user_name: string;
    password: string;
    passwordConfirm: string;
    set1: string | number;
    set2: string | number;
    set3: string | number;
    set4: string | number;
}

export const createUser = async (
    userInfo: Array<any>
) => {

    let params: UserInfo = {
        identity: userInfo[0],
        user_name: userInfo[1],
        password: userInfo[2],
        passwordConfirm: userInfo[3],
        set1: userInfo[0],
        set2: userInfo[1],
        set3: userInfo[2],
        set4: userInfo[3]
    }
    console.log(params)

    const response = await got("/user/create", "POST", params)
    console.log(response)
}