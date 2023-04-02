<script lang="ts">
    import { got } from "utils/helpers";
    import { handleValidate } from "utils/validator";

    export let userInfo: object;
    export let handleVisible: any;
    export let handleGetList: Function;

    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;

    let set1: string = userInfo["set1"];
    let set2: string = userInfo["set2"];
    let set3: string = userInfo["set3"];
    let memo: string = userInfo["memo"];

    const updateUser = async () => {
        
        let params = {
            id: userInfo["id"],
            set1,
            set2,
            set3,
            memo,
        }

        const response = await got(`/user/update`, "PATCH", params)
        alert(response.message)
        if (response.status == 1) {
            handleGetList();
            handleVisible();
        }
    }
    
    const updateUserPassword = async () => {
        
        if(!password.value) {
            password.classList.add("invalid");
            return password.focus();
        }

        if(!passwordConfirm.value || password.value !== passwordConfirm.value) {
            passwordConfirm.classList.add("invalid");
            return passwordConfirm.focus();
        }

        let params = {
            id: userInfo["id"],
            password: password.value,
            passwordConfirm: passwordConfirm.value,
        }

        const response = await got(`/user/password`, "PATCH", params)
        alert(response.message)
        if (response.status == 1) {
            handleGetList()
            handleVisible()
        }
    }
    const deleteUser = async () => {
        const confirmDialog = confirm("정말 삭제하시겠습니까?");
        if(!confirmDialog) {
            return;
        }

        let params = {
            id: userInfo["id"]
        }

        const response = await got(`/user/delete`, "DELETE", params)
        alert(response.message)
        if (response.status == 1) {
            handleGetList();
            handleVisible();
        }
    }
</script>

<form on:submit|preventDefault={updateUser}>
    <div class="form-body">
        <div class="form-group">
            <label for="">관리자 이름</label>
            <input type="text" disabled value={userInfo["user_name"]}>
        </div>
        <div class="form-group">
            <label for="">관리자 아이디</label>
            <input type="text" disabled value={userInfo["identity"]}>
        </div>
        <div class="form-group-half">
            <div>
                <label for="">새 비밀번호</label>
                <input 
                    type="password" 
                    bind:this={password}
                    on:keydown={(e)=>{handleValidate(e)}}
                    on:blur={(e)=>{handleValidate(e)}}
                >
            </div>
            <div>
                <label for="">비밀번호 확인</label>
                <input 
                    type="password" 
                    bind:this={passwordConfirm}
                    on:keydown={(e)=>{handleValidate(e)}}
                    on:blur={(e)=>{handleValidate(e)}}
                >
            </div>
        </div>
        <div class="form-group">
            <button 
                type="button" 
                class="wide"
                on:click={updateUserPassword}
            >비밀번호 변경</button>
        </div>
        <div class="form-group-half">
            <div>
                <label for="">추가설정1</label>
                <input type="text" bind:value={set1}>
            </div>
            <div>
                <label for="">추가설정2</label>
                <input type="text" bind:value={set2}>
            </div>
        </div>
        <div class="form-group-half">
            <div>
                <label for="">추가설정3</label>
                <input type="text" bind:value={set3}>
            </div>
            <div>
                <label for="">메모</label>
                <input type="text" bind:value={memo}>
            </div>
        </div>
        <button 
            type="button" 
            class="wide red"
            on:click={deleteUser}
        >삭제
        </button>
    </div>
    <div class="form-footer">
        <button class="admin-info-save">저장</button>
    </div>
</form>

<style lang="scss">
    @import "./UserDetail.scss";
    @import "../../../styles/form.scss";
</style>