export const createUserLevel = [
    {title: "유저 기본정보", subtitle: "유저 기본정보를 입력합니다."},
    {title: "유저 설정", subtitle: "유저의 상세정보를 설정합니다."},
    {title: "최종 확인", subtitle: "마지막 설정 확인 후 등록합니다."},
]

export const userFormBasic = [
    {id: "identity", title: "유저 아이디", type: "text", placeholder: "유저 아이디를 입력하세요."},
    {id: "username", title: "유저 이름", type: "text", placeholder: "유저 이름를 입력하세요."},
    {id: "password", title: "비밀번호", type: "password", placeholder: "비밀번호를 이름를 입력하세요.(4자 ~ 15자)"},
    {id: "passwordConfirm", title: "비밀번호 확인", type: "password", placeholder: "비밀번호를 재입력하세요."},
]

export const userFormAdvenced = [
    {id: "set1", title: "추가설정 1", type: "text", placeholder: "추가설정 1을 입력하세요."},
    {id: "set2", title: "추가설정 2", type: "text", placeholder: "추가설정 2을 입력하세요."},
    {id: "set3", title: "추가설정 3", type: "number", placeholder: "추가설정 3을 입력하세요."},
    {id: "meme", title: "메모", type: "text", placeholder: "입력하지 않으셔도 됩니다."},
]