import config from "./config";

interface Json {
    status: number;
    data?: any;
    message: string;
}

export const url = (params: string): string => {
    return config.url+params
}

export const got = async (urlParams: string = "", method: string = "get", setParams?: object): Promise<any> => {

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
        
        if(res.statusCode === 403 || res.status === -1) {
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

export const deleteCookie = (cookieName: string): void => {
	document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}