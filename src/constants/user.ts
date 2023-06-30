export const createUserLevel = [
    {title: "플레이어 기본정보", subtitle: "플레이어 기본정보를 입력합니다."},
    {title: "플레이어 설정", subtitle: "플레이어의 상세정보를 설정합니다."},
    {title: "최종 확인", subtitle: "마지막 설정 확인 후 등록합니다."},
]

export const userFormBasic = [
    {id: "identity", title: "플레이어 아이디", placeholder: "플레이어 아이디를 입력하세요."},
    {id: "nickname", title: "닉네임", placeholder: "플레이어 이름를 입력하세요."},
    {id: "password", title: "비밀번호", placeholder: "비밀번호를 이름를 입력하세요.(4자 ~ 15자)"},
    {id: "passwordConfirm", title: "비밀번호 확인", placeholder: "비밀번호를 재입력하세요."},
    {id: "accountHolder", title: "예금주", placeholder: "예금주를 입력하세요."},
    {id: "phoneNumber", title: "연락처", placeholder: "연락처를 입력하세요."},
    {id: "bank", title: "은행", placeholder: ""},
    {id: "accountNumber", title: "계좌번호", type: "", placeholder: "계좌번호를 입력하세요."},
]

export const userFormAdvenced = [
    {id: "casinoRollingRate", title: "카지노 롤링", placeholder: "100이하 숫자만 입력하세요."},
    {id: "casinoLosingRate", title: "카지노 루징", placeholder: "100이하 숫자만 입력하세요."},
    {id: "slotRollingRate", title: "슬롯 롤링", placeholder: "100이하 숫자만 입력하세요."},
    {id: "slotLosingRate", title: "슬롯 루징", placeholder: "100이하 숫자만 입력하세요."},
    {id: "minigameRollingRate", title: "미니게임 롤링", placeholder: "100이하 숫자만 입력하세요."},
    {id: "minigameLosingRate", title: "미니게임 루징", placeholder: "100이하 숫자만 입력하세요."},
]

export const userTableTitle = ["번호", "소속", "아이디", "닉네임", "예금주", "보유금", "포인트", "수동지급", "수정", "생성일", "마지막 접속일"];

export const userNewTableTitle = ["번호", "소속", "아이디", "닉네임", "예금주", "상태", "상태 변경", "메모", "가입 신청일"];

export const userLevel = [
    1, 2, 3, 4, 5
]