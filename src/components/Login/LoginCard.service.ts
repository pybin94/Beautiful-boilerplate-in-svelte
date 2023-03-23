import { got, setCookie ,deleteCookie } from "utils/tools"

export const handelSignin = async (identity: string, password: string, rememberMe: boolean): Promise<void> => {

    let params = {
        identity,
        password
    }

    const response = await got("/signin", "POST", params);
    
    if (response.status === 1) {
        rememberMe == true
        ? setCookie("rememberMe", identity)
        : deleteCookie("rememberMe")

        location.reload();
    } else {
        alert("회원 정보가 올바르지 않습니다")
    }
}
