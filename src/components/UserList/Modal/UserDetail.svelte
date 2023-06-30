<script lang="ts">
    import { bankList } from "constants/admin";
    import { userLevel } from "constants/user";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import { handleValidate } from "utils/validator";

    export let userInfo: object;
    export let handleDetailVisible: any;
    export let handleGetList: Function;

    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;
    let userRate = userInfo["userCommissionRate"]

    let bank: string = userInfo["back"];
    let accountHolder: string = userInfo["accountHolder"];
    let accountNumber: string = userInfo["accountNumber"];
    let bonusLevel: string = userInfo["bonusLevel"];
    let bettingLimitLevel: string = userInfo["bettingLimitLevel"];
    let phoneNumber: string = userInfo["phoneNumber"];
    let memo: string = userInfo["memo"];
    let casinoRollingRate: string = userRate["casinoRollingRate"];
    let casinoLosingRate: string = userRate["casinoLosingRate"];
    let slotRollingRate: string = userRate["slotRollingRate"];
    let slotLosingRate: string = userRate["slotLosingRate"];
    let minigameRollingRate: string = userRate["minigameRollingRate"];
    let minigameLosingRate: string = userRate["minigameLosingRate"];

    const updateUser = async () => {
        let params = {
            id: userInfo["id"],
            bank,
            accountHolder,
            accountNumber,
            bonusLevel,
            bettingLimitLevel,
            phoneNumber,
            casinoRollingRate,
            casinoLosingRate,
            slotRollingRate,
            slotLosingRate,
            minigameRollingRate,
            minigameLosingRate,
            memo,
        }

        const response = await got(`/user/update`, "PATCH", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleGetList();
            handleDetailVisible();
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

        const response = await got(`/user/update/password`, "PATCH", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleGetList()
            handleDetailVisible()
        }
    }

    const deleteUser = async () => {
        popup("블락하시겠습니까?", 3, async (data: boolean) => {
            if(data === false) return; 

            let params = {
                id: userInfo["id"]
            }

            const response = await got(`/user/delete`, "DELETE", params)
            popup(response.message, response.status)
            if (response.status == 1) {
                handleGetList();
                handleDetailVisible();
            }
        });
    }
</script>

<form on:submit|preventDefault={updateUser}>
    <div class="form-body">
        <div class="form-group">
            <label for="">플레이어 이름</label>
            <input type="text" disabled value={userInfo["nickname"]}>
        </div>
        <div class="form-group">
            <label for="">플레이어 아이디</label>
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
                <label for="">예금주</label>
                <input type="text" bind:value={accountHolder}>
            </div>
            <div>
                <label for="">은행</label>
                <select name="" id="">
                    {#each bankList as item}
                        {#if item.value == bank}
                            <option value={item.value}>{item.name}</option>
                        {:else}
                            <option value={item.value}>{item.name}</option>
                        {/if}
                    {/each}
                </select>
            </div>
        </div>
        <div class="form-group-half">
            <div>
                <label for="">계좌번호</label>
                <input type="text" bind:value={accountNumber}>
            </div>
            <div>
                <label for="">연락처</label>
                <input type="text" bind:value={phoneNumber}>
            </div>
        </div>
        <div class="form-group-half">
            <div>
                <label for="">레벨</label>
                <select name="" id="" bind:value={bonusLevel}>
                    {#each userLevel as item}
                        <option value={item}>{item}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="">베팅 제한 레벨</label>
                <select name="" id="" bind:value={bettingLimitLevel}>
                    {#each userLevel as item}
                        <option value={item}>{item}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="">메모</label>
            <input type="text" bind:value={memo}>
        </div>
        <div class="form-group-half">
            <div>
                <label for="" class="text-emphasis red">카지노 롤링</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["casinoRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={casinoRollingRate}>
            </div>
            <div>
                <label for="" class="text-emphasis red">카지노 루징</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["casinoLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={casinoLosingRate}>
            </div>
        </div>
        <div class="form-group-half">
            <div>
                <label for="" class="text-emphasis red">슬롯 롤링</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["slotRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={slotRollingRate}>
            </div>
            <div>
                <label for="" class="text-emphasis red">슬롯 루징</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["slotLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={slotLosingRate}>
            </div>
        </div>
        <div class="form-group-half">
            <div>
                <label for="" class="text-emphasis red">미니게임 롤링</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["minigameRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={minigameRollingRate}>
            </div>
            <div>
                <label for="" class="text-emphasis red">미니게임 루징</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["minigameLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={minigameLosingRate}>
            </div>
        </div>
    </div>
    <div class="form-footer">
        <button type="button" class="red" on:click={deleteUser}>블락</button>
        <button class="admin-info-save">저장</button>
    </div>
</form>

<style lang="scss">
    @import "./UserDetail.scss";
    @import "../../../styles/form.scss";
</style>