<script lang="ts">
    import { adminAuthLevel } from "constants/adminList";
    import { getCookie, got } from "utils/helpers";
    import { handleValidate } from "utils/validator";

    export let handleVisible: any;

    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;

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
            // id: adminInfo["id"],
            password: password.value,
            passwordConfirm: passwordConfirm.value,
        }
        const response = await got(`/admin/password`, "PATCH", params)
        alert(response.message)
        if (response.status == 1) {
            handleVisible()
        }
    }
    const myInfo = JSON.parse(getCookie("user"))
</script>

<form on:submit|preventDefault={updateAdminPassword}>
    <div class="form-body">
        <div class="form-group">
            <label for="">관리자 이름</label>
            <input type="text" disabled value={myInfo["identity"]}>
        </div>
        <div class="form-group">
            <label for="">관리자 아이디</label>
            <input type="text" disabled value={myInfo["name"]}>
        </div>
        <div class="form-group">
            <label for="">관리자 등급</label>
            {#each adminAuthLevel as authItem}
                {#if myInfo["auth"] === authItem["auth"]}
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
        <div class="form-footer">
            <button class="wide">비밀번호 변경</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "../../../../styles/form.scss";
</style>