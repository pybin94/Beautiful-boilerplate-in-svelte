export interface CurrentMenu {
    title: string,
    subtitle: string,
    url: string,
    slot: any,
}

const icon = { 
    ellipsis: "fa-solid fa-ellipsis",
    home: "fa-solid fa-house",
    userAddend: "fa-solid fa-user-plus",
    userList: "fa-solid fa-user-group",
    adminAppend: "fa-solid fa-user-gear",
    adminList: "fa-solid fa-users-gear",
};

export const menus = [ 
    {title: "일반", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null},
    {title: "대시보드", class: "navigate", url: "/", icon: icon.home, subTitle: "Dashboard"},
    {title: "유저", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null},
    {title: "유저 생성", class: "navigate", url: "/user/create", icon: icon.userAddend, subTitle: "User Create"},
    {title: "유저 목록", class: "navigate", url: "/user/list", icon: icon.userList, subTitle: "User List"},
    {title: "관리자", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null},
    {title: "관리자 생성", class: "navigate", url: "/admin/create", icon: icon.adminAppend, subTitle: "Admin Create"},
    {title: "관리자 목록", class: "navigate", url: "/admin/list", icon: icon.adminList, subTitle: "Admin List"},
    {title: "테스트", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null},
    {title: "테스트", class: "navigate", url: "/test", icon: icon.home, subTitle: "Dashboard"},
];

export let currentMenu: CurrentMenu = {
    title: "",
    subtitle: "",
    url: "",
    slot: null,
}
