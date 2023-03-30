import { currentUrl } from './../stores/store';
import { navigate } from 'svelte-routing';
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

    const response = await got("/user/create", "POST", params)
    alert(response.message)
    if(response.status === 1) {
        navigate("/admin/create", { replace: false });   
        currentUrl.set(window.location.pathname)
    }
}