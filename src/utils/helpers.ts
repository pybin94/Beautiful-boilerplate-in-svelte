export const url = (params: string): string => {
    return process.env.URL + params
}

export const got = async (urlParams: string = "", method: string = "GET", setParams?: object): Promise<any> => {

    let api: string = url(urlParams)
    let options: object = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    };

    if (setParams) options["body"] = JSON.stringify(setParams);
    
    try {
        const response = await fetch(api, options);
        const res = await response.json();
        
        if(res.status === -1) {
            window.location.href = "/";
            return false;
        } else if (res.status === -2) {
            deleteCookie("auth")
            window.location.href = "/";
            return false;
        } else {
            return res;
        }
    } catch (error) {
        console.log(error);
        return {status: 0, message: "오류가 발생했습니다. 관리자에게 문의주세요."};
    };
};

export const getCookie = (cookieName: string): string => {
    let name: string, data: string;
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        name = cookies[i].substring(0, cookies[i].indexOf('='));
        data = cookies[i].substring(cookies[i].indexOf('=') + 1);
        name = name.replace(/^\s+|\s+$/g, '');
        if (name == cookieName) {
            return data;
        }
    }
}

export const setCookie = (cookieName: string, value: any, expires: number = 0): void => {
    var date = new Date();
    date.setTime(date.getTime() + expires*24*60*60*1000);
    expires == 0
    ? document.cookie = cookieName + '=' + value + ';path=/'
    : document.cookie = cookieName + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

export const deleteCookie = (cookieName: string): void => {
	document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}

export const now = () => {
    const nowDate = new Date
    const setTimeZone = new Date(nowDate.getTime() - (nowDate.getTimezoneOffset() * 60000)) // Asia/Seoul
    return setTimeZone.toISOString().slice(0, 19).replace('T', ' ');
}