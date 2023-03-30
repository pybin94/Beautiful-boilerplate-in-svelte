export const createAdminLevel = [
    {title: "관리자 기본정보", subtitle: "관리자 기본정보를 입력합니다."},
    {title: "관리자 설정", subtitle: "관리자 상세정보를 설정합니다."},
    {title: "최종 확인", subtitle: "마지막 설정 확인 후 등록합니다."},
]

export const adminFormBasic = [
    {id: "identity", title: "관리자 아이디", type: "text", placeholder: "관리자 아이디를 입력하세요."},
    {id: "username", title: "관리자 이름", type: "text", placeholder: "관리자 이름를 입력하세요."},
    {id: "password", title: "비밀번호", type: "password", placeholder: "비밀번호를 이름를 입력하세요.(4자 ~ 15자)"},
    {id: "passwordConfirm", title: "비밀번호 확인", type: "password", placeholder: "비밀번호를 재입력하세요."},
]

export const adminFormAdvenced = [
    {id: "set1", title: "추가설정 1", type: "text", placeholder: "추가설정 1을 입력하세요."},
    {id: "set2", title: "추가설정 2", type: "text", placeholder: "추가설정 2을 입력하세요."},
    {id: "memo", title: "메모", type: "text", placeholder: "입력하지 않으셔도 됩니다."},
]
