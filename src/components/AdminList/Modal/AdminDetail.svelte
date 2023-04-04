<script lang="ts">
    import { adminAuthLevel } from "constants/adminList";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import { handleValidate } from "utils/validator";

    export let adminInfo: object;
    export let handleVisible: any;
    export let handleGetList: Function;

    let set1: string = adminInfo["set1"];
    let set2: string = adminInfo["set2"];
    let memo: string = adminInfo["memo"];
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;

    const updateAdminInfo = async () => {
        
        let params = {
            id: adminInfo["id"],
            set1,
            set2,
            memo
        }

        const response = await got(`/admin/update`, "PATCH", params)
        popup(response.status, response.message)
        if (response.status == 1) {
            handleGetList()
            handleVisible()
        }
    }

    const updateAdminPassword = async () => {

        if(!password.value) {
            password.classList.add("invalid");
            return password.focus();
        }

        if(!passwordConfirm.value || password.value !== passwordConfirm.value) {
            passwordConfirm.classList.add("invalid");
            return passwordConfirm.focus();
        }

        let params = {
            id: adminInfo["id"],
            password: password.value,
            passwordConfirm: passwordConfirm.value,
        }
        const response = await got(`/admin/password`, "PATCH", params)
        popup(response.status, response.message)
        if (response.status == 1) {
            handleGetList()
            handleVisible()
        }
    }

    const deleteAdmin = () => {
        popup(3, "정말 삭제하시겠습니까?", async (data: boolean) => {
            if(data === false) return; 
       
            let params = {
                id: adminInfo["id"]
            }

            const response = await got(`/admin/delete`, "DELETE", params)
            popup(response.status, response.message)
            if (response.status == 1) {
                handleGetList();
                handleVisible();
            }
        });
    }
</script>

<form on:submit|preventDefault={updateAdminInfo}>
    <div class="form-body">
        <div class="form-group">
            <label for="">관리자 이름</label>
            <input type="text" disabled value={adminInfo["user_name"]}>
        </div>
        <div class="form-group">
            <label for="">관리자 아이디</label>
            <input type="text" disabled value={adminInfo["identity"]}>
        </div>
        <div class="form-group">
            <label for="">관리자 등급</label>
            {#each adminAuthLevel as authItem}
                {#if adminInfo["auth"] === authItem["auth"]}
                    <input type="text" disabled value={authItem["authName"]}>
                {/if}
            {/each}
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
                class="wide line"
                on:click={updateAdminPassword}
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
        <div class="form-group">
            <label for="">메모</label>
            <input type="text" bind:value={memo}>
        </div>
        <button 
            type="button" 
            class="wide red"
            on:click={deleteAdmin}
        >삭제
        </button>
    </div>
    <div class="form-footer">
        <button class="admin-info-save">저장</button>
    </div>
</form>

<style lang="scss">
    @import "./AdminDetail.scss";
    @import "../../../styles/form.scss";
</style>