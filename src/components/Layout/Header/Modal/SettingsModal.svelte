<script lang="ts">
    import { adminLevel } from "constants/admin";
    import { detailInfo, myInfo } from "constants/myInfo";
    import { levelStore } from "stores/myInfo.store";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
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
            password: password.value,
            passwordConfirm: passwordConfirm.value,
        }
        const response = await got(`/admin/update/password`, "PATCH", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleVisible()
        }
    }
</script>

<form on:submit|preventDefault={updateAdminPassword}>
    <div class="form-body">
        <div class="form-group">
            <label for="">에이전트 이름</label>
            <input type="text" disabled value={myInfo["name"]}>
        </div>
        <div class="form-group">
            <label for="">에이전트 아이디</label>
            <input type="text" disabled value={myInfo["identity"]}>
        </div>
        <div class="form-group">
            <label for="">에이전트 등급</label>
            {#each adminLevel as level}
                {#if $levelStore === level["level"]}
                    <input type="text" disabled value={level["levelName"]}>
                {/if}
            {/each}
        </div>
        {#each detailInfo as item}
        <div class="form-group-half">
            <div>
                <label for="" class="text-emphasis red">{item.title} 롤링</label>
                <input type="text" disabled bind:value={item.data[0]}>
            </div>
            <div>
                <label for="" class="text-emphasis red">{item.title} 루징</label>
                <input type="text" disabled bind:value={item.data[1]}>
            </div>
        </div>
        {/each}
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