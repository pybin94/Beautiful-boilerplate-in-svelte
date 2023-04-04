import { currentUrl } from './../stores/store';
import { navigate } from 'svelte-routing';
import { got } from '../utils/helpers';
import { popup } from 'utils/popup';

interface AdminInfo {
    identity: string;
    user_name: string;
    password: string;
    passwordConfirm: string;
    auth: string | number;
    set1: string | number;
    set2: string | number;
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
        auth: adminInfo[4],
        set1: adminInfo[5],
        set2: adminInfo[6],
        memo: adminInfo[7],
    }

    const response = await got("/admin/create", "POST", params)
    popup(response.status, response.message)
    
    if(response.status === 1) {
        navigate("/admin/list", { replace: false });   
        currentUrl.set(window.location.pathname)
    }
}