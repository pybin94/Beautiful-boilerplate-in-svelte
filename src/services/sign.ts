import { got, setCookie ,deleteCookie } from "utils/helpers"
import { popup } from "utils/popup";

export const signin = async (identity: string, password: string, rememberMe: boolean): Promise<void> => {

    let params = {
        identity,
        password
    }

    const response = await got("/signin", "POST", params);
    
    if (response.status === 1) {
        rememberMe == true
        ? setCookie("rememberMe", identity)
        : deleteCookie("rememberMe")
        setCookie("user", JSON.stringify(response.data))
        location.reload();
    } else {
        popup(0, "회원 정보가 올바르지 않습니다")
    }
}

export const signout = async () => {
    const response = await got("/signout")
    if(response.ststue == 1) location.reload();
}