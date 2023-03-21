export interface CurrentMenu {
    title: string,
    subtitle: string,
    url: string
}

const icon = { 
    ellipsis: "fa-solid fa-ellipsis",
    home: "fa-solid fa-house",
    user: "fa-regular fa-user",
};

export const menus = [ 
    {title: "일반", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null},
    {title: "대시보드", class: "navigate", url: "/", icon: icon.home, subTitle: "Dashboard"},
    {title: "대시보드", class: "navigate", url: "/test", icon: icon.home, subTitle: "Dashboard" },
    {title: "유저 관리", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: "User Management"},
    {title: "유저", class: "navigate", url: "/user", icon: icon.user, subTitle: "User"},
    {title: "관리자", class: "navigate", url: "/asdjkasklj", icon: icon.user, subTitle: "Administrator"},
];

export let currentMenu: CurrentMenu = {
    title: "",
    subtitle: "",
    url: ""
}
