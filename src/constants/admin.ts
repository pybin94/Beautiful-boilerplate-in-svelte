export const createAdminLevel = [
    {title: "에이전트 기본정보", subtitle: "에이전트 기본정보를 입력합니다."},
    {title: "에이전트 설정", subtitle: "에이전트 상세정보를 설정합니다."},
    {title: "최종 확인", subtitle: "마지막 설정 확인 후 등록합니다."},
]

export const adminFormBasic = [
    {id: "identity", title: "에이전트 아이디", placeholder: "에이전트 아이디를 입력하세요."},
    {id: "password", title: "비밀번호", placeholder: "비밀번호를 이름를 입력하세요.(4자 ~ 15자)"},
    {id: "passwordConfirm", title: "비밀번호 확인", placeholder: "비밀번호를 재입력하세요."},
    {id: "nickname", title: "닉네임", placeholder: "에이전트 이름를 입력하세요."},
    {id: "code", title: "가입코드", placeholder: "가입코드를 입력하세요."},
    {id: "accountHolder", title: "예금주", placeholder: "예금주를 입력하세요."},
    {id: "phoneNumber", title: "연락처", placeholder: "연락처를 입력하세요."},
    {id: "bank", title: "은행", placeholder: ""},
    {id: "accountNumber", title: "계좌번호", placeholder: "계좌번호를 입력하세요."},
]

export const adminFormAdvenced = [
    {id: "casinoRollingRate", title: "카지노 롤링", placeholder: "100이하 숫자만 입력하세요."},
    {id: "casinoLosingRate", title: "카지노 루징", placeholder: "100이하 숫자만 입력하세요."},
    {id: "slotRollingRate", title: "슬롯 롤링", placeholder: "100이하 숫자만 입력하세요."},
    {id: "slotLosingRate", title: "슬롯 루징", placeholder: "100이하 숫자만 입력하세요."},
    {id: "minigameRollingRate", title: "미니게임 롤링", placeholder: "100이하 숫자만 입력하세요."},
    {id: "minigameLosingRate", title: "미니게임 루징", placeholder: "100이하 숫자만 입력하세요."},
]

export const bankList = [
    {value: "HSBC은행", name: "HSBC은행"},
    {value: "KEB하나은행", name: "KEB하나은행"},
    {value: "SC제일은행", name: "SC제일은행"},
    {value: "경남은행", name: "경남은행"},
    {value: "광주은행", name: "광주은행"},
    {value: "국민은행", name: "국민은행"},
    {value: "기업은행", name: "기업은행"},
    {value: "농협", name: "농협"},
    {value: "대구은행", name: "대구은행"},
    {value: "부산은행", name: "부산은행"},
    {value: "산업은행", name: "산업은행"},
    {value: "상호저축은행", name: "상호저축은행"},
    {value: "새마을금고", name: "새마을금고"},
    {value: "수출입은행", name: "수출입은행"},
    {value: "수협", name: "수협"},
    {value: "수협중앙회", name: "수협중앙회"},
    {value: "신한은행", name: "신한은행"},
    {value: "신협", name: "신협"},
    {value: "우리은행", name: "우리은행"},
    {value: "우체국", name: "우체국"},
    {value: "전북은행", name: "전북은행"},
    {value: "제주은행", name: "제주은행"},
    {value: "카카오뱅크", name: "카카오뱅크"},
    {value: "케이뱅크", name: "케이뱅크"},
    {value: "한국산업은행", name: "한국산업은행"},
    {value: "한국씨티은행", name: "한국씨티은행"},
]

export const adminTableTitle = [
    "번호", 
    "소속",
    "아이디", 
    "닉네임", 
    "등급", 
    "보유금", 
    "포인트", 
    "수동지급", 
    "직속 회원", 
    "수정", 
    "생성일",
];

export const adminLevel = [
    {level: 1, levelName: "본사"},
    {level: 2, levelName: "부본사"},
    {level: 3, levelName: "총판"},
    {level: 4, levelName: "매장"},
    {level: 5, levelName: "에이전트"},
]