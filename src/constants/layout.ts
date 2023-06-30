export interface CurrentMenu {
    title: string,
    subtitle: string,
    slot: any,
}

interface Menus {
    title: string;
    class: string;
    url: string;
    icon: string;
    subTitle: string | null;
    level: number | undefined;
    levelLimit: number | undefined;
}

const icon = { 
    ellipsis: "fa-solid fa-ellipsis",
    home: "fa-solid fa-chart-pie",
    // 플레이어
    userCreate: "fa-solid fa-user-plus",
    userList: "fa-solid fa-user-group",
    userBlock: "fa-solid fa-user-large-slash",
    userNew: "fa-solid fa-user-check",
    // 에이전트
    adminCreate: "fa-solid fa-user-gear",
    adminList: "fa-solid fa-users-gear",
    adminBlock: "fa-solid fa-users-slash",
    adminTree: "fa-solid fa-diagram-project",
    // 입출금
    userDeposit: "fa-solid fa-money-bill-wave",
    userWithdrawal: "fa-solid fa-money-bill-trend-up",
    userTransactionHistory: "fa-solid fa-money-bill-transfer",
    adminDeposit: "fa-solid fa-scale-unbalanced",
    adminWithdrawal: "fa-solid fa-scale-unbalanced-flip",
    adminTransactionHistory: "fa-solid fa-scale-balanced",
    // 정산관리
    realTimeSettlement: "fa-regular fa-calendar-check",
    userSettlement: "fa-solid fa-address-book",
    adminSettlement: "fa-regular fa-address-book",
    // 내역조회
    userTransaction: "fa-solid fa-arrow-right-arrow-left",
    userPoint: "fa-solid fa-coins",
    adminTransaction: "fa-solid fa-arrow-right-arrow-left",
    adminPoint: "fa-solid fa-coins",
    siteTransaction: "fa-solid fa-arrow-right-arrow-left",
    userMoveToThirdparty: "fa-solid fa-receipt",
    // 베팅내역
    historyCasino: "fa-solid fa-diamond",
    historySlot: "fa-solid fa-chess-knight",
    historyMinigame: "fa-solid fa-dice",
    historyOmissions: "fa-solid fa-ban",
    // 게시판
    popup: "fa-solid fa-envelope-open-text",
    userMessage: "fa-solid fa-comments",
    userNotice: "fa-solid fa-message",
    adminMessage: "fa-regular fa-comments",
    adminNotice: "fa-regular fa-message",
    // 설정
    siteSetting: "fa-solid fa-sliders",
    ip: "fa-solid fa-keyboard",
    gameList: "fa-solid fa-gamepad",
    // 관리자 설정
    userAdmin: "fa-solid fa-gear",
    // 테스트
    test: "fa-solid fa-flask-vial",
};

export const menus: Array<Menus> = [ 
    {title: "메인", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: undefined, levelLimit: undefined},
    {title: "대시보드", class: "navigate", url: "/", icon: icon.home, subTitle: "Dashboard", level: undefined, levelLimit: undefined},
    
    {title: "플레이어", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: undefined, levelLimit: undefined},
    {title: "플레이어 목록", class: "navigate", url: "/user/list", icon: icon.userList, subTitle: "Player List", level: undefined, levelLimit: undefined},
    {title: "플레이어 생성", class: "navigate", url: "/user/create", icon: icon.userCreate, subTitle: "Player Create", level: undefined, levelLimit: undefined},
    // {title: "플레이어 블락", class: "navigate", url: "/user/block", icon: icon.userBlock, subTitle: "Player Create", level: undefined, levelLimit: undefined},
    {title: "신규 플레이어", class: "navigate", url: "/user/new", icon: icon.userNew, subTitle: "Player New", level: 1, levelLimit: undefined},
    
    {title: "에이전트", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: undefined, levelLimit: 5},
    {title: "에이전트 목록", class: "navigate", url: "/admin/list", icon: icon.adminList, subTitle: "Agent List", level: undefined, levelLimit: 5},
    {title: "에어전트 생성", class: "navigate", url: "/admin/create", icon: icon.adminCreate, subTitle: "Agent Create", level: undefined, levelLimit: 5},
    // {title: "에어전트 블락", class: "navigate", url: "/admin/block", icon: icon.adminBlock, subTitle: "Agent Create", level: undefined, levelLimit: 5},
    {title: "에이전트 트리뷰", class: "navigate", url: "/admin/tree", icon: icon.adminTree, subTitle: "Agent Create", level: undefined, levelLimit: 5},

    {title: "입출금관리", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: 1, levelLimit: undefined},
    {title: "플레이어 입금", class: "navigate", url: "/transaction/user/deposit", icon: icon.userDeposit, subTitle: "Player Deposit", level: 1, levelLimit: undefined},
    {title: "플레이어 출금", class: "navigate", url: "/transaction/user/withdrawal", icon: icon.userWithdrawal, subTitle: "Player Withdrawal", level: 1, levelLimit: undefined},
    {title: "플레이어 입출금 내역", class: "navigate", url: "/transaction/user/history", icon: icon.userTransactionHistory, subTitle: "Player Transaction History", level: 1, levelLimit: undefined},
    {title: "에이전트 입금", class: "navigate", url: "/transaction/admin/deposit", icon: icon.adminDeposit, subTitle: "Agnet Deposit", level: 1, levelLimit: undefined},
    {title: "에이전트 출금", class: "navigate", url: "/transaction/admin/withdrawal", icon: icon.adminWithdrawal, subTitle: "Agent Withdrawal", level: 1, levelLimit: undefined},
    {title: "에이전트 입출금 내역", class: "navigate", url: "/transaction/admin/history", icon: icon.adminTransactionHistory, subTitle: "Agent Transaction History", level: 1, levelLimit: undefined},

    {title: "정산관리", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: undefined, levelLimit: undefined},
    {title: "실시간 정산", class: "navigate", url: "/settlement/real-time", icon: icon.realTimeSettlement, subTitle: "Real Time Settlement", level: undefined, levelLimit: undefined},
    {title: "플레이어 정산", class: "navigate", url: "/settlement/user", icon: icon.userSettlement, subTitle: "Player Settlement", level: undefined, levelLimit: undefined},
    {title: "에이전트 정산", class: "navigate", url: "/settlement/admin", icon: icon.adminSettlement, subTitle: "Agent Settlement", level: undefined, levelLimit: undefined},
    
    {title: "트렌젝션", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: undefined, levelLimit: undefined},
    {title: "플레이어 트렌젝션", class: "navigate", url: "/history/transaction/user", icon: icon.userTransaction, subTitle: "Player Transaction", level: undefined, levelLimit: undefined},
    {title: "플레이어 포인트", class: "navigate", url: "/history/point/user", icon: icon.userPoint, subTitle: "Player Point", level: undefined, levelLimit: undefined},
    {title: "에이전트 트렌젝션", class: "navigate", url: "/history/transaction/admin", icon: icon.adminTransaction, subTitle: "Agent Transaction", level: undefined, levelLimit: undefined},
    {title: "에이전트 포인트", class: "navigate", url: "/history/point/admin", icon: icon.adminPoint, subTitle: "Agent Point", level: undefined, levelLimit: undefined},
    {title: "사이트 트렌젝션", class: "navigate", url: "/history/transaction/site", icon: icon.adminTransaction, subTitle: "Agent Transaction", level: 1, levelLimit: undefined},
    {title: "API사 트렌젝션", class: "navigate", url: "/history/thirdparty", icon: icon.userMoveToThirdparty, subTitle: "Player Move To Thirdparty", level: 1, levelLimit: undefined},
    
    {title: "베팅내역", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: undefined, levelLimit: undefined},
    {title: "카지노", class: "navigate", url: "/betting/casino", icon: icon.historyCasino, subTitle: "Betting Histroy", level: undefined, levelLimit: undefined},
    {title: "슬롯", class: "navigate", url: "/betting/slot", icon: icon.historySlot, subTitle: "Betting Histroy", level: undefined, levelLimit: undefined},
    {title: "미니게임", class: "navigate", url: "/betting/minigame", icon: icon.historyMinigame, subTitle: "Betting Histroy", level: undefined, levelLimit: undefined},
    {title: "베팅 누락", class: "navigate", url: "/betting/omissions", icon: icon.historyOmissions, subTitle: "Betting Omittions", level: 1, levelLimit: undefined},
    
    {title: "게시판", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: undefined, levelLimit: undefined},
    {title: "팝업 관리", class: "navigate", url: "/notice/user/popup", icon: icon.popup, subTitle: "Popup", level: 1, levelLimit: undefined},
    {title: "플레이어 공지", class: "navigate", url: "/notice/user", icon: icon.userNotice, subTitle: "Player Notice", level: 1, levelLimit: undefined},
    {title: "플레이어 쪽지", class: "navigate", url: "/notice/user/message", icon: icon.userMessage, subTitle: "Player Message", level: 1, levelLimit: undefined},
    {title: "에이전트 공지", class: "navigate", url: "/notice/admin", icon: icon.adminNotice, subTitle: "Agent Notice", level: undefined, levelLimit: undefined},
    {title: "에이전트 쪽지", class: "navigate", url: "/notice/admin/message", icon: icon.adminMessage, subTitle: "Agent Message", level: undefined, levelLimit: undefined},
    
    {title: "설정", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: 1, levelLimit: undefined},
    {title: "사이트 설정", class: "navigate", url: "/setting/site", icon: icon.siteSetting, subTitle: "Site Setting", level: 1, levelLimit: undefined},
    {title: "IP 설정", class: "navigate", url: "/setting/ip", icon: icon.ip, subTitle: "Ip", level: 1, levelLimit: undefined},
    {title: "게임 리스트", class: "navigate", url: "/setting/game", icon: icon.gameList, subTitle: "Game List", level: 1, levelLimit: undefined},
    
    {title: "관리자 설정", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: 0, levelLimit: undefined},
    // {title: "사이트 목록", class: "navigate", url: "/site/list", icon: icon.userAdmin, subTitle: "Site List", level: 0, levelLimit: undefined},
    {title: "설정", class: "navigate", url: "/site/setting", icon: icon.userAdmin, subTitle: "Site Setting", level: 0, levelLimit: undefined},

    {title: "테스트", class: "truncate", url: "#", icon: icon.ellipsis, subTitle: null, level: 1, levelLimit: undefined},
    {title: "테스트", class: "navigate", url: "/test", icon: icon.test, subTitle: "Test", level: 1, levelLimit: undefined},
];

export let currentMenu: CurrentMenu = {
    title: "",
    subtitle: "",
    slot: null,
}