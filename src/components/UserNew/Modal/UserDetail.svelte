<script lang="ts">
    import { bankList } from "constants/admin";
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
    let phoneNumber: string = userInfo["phoneNumber"];
    let memo: string = userInfo["memo"];
    let casinoRollingRate: string = userRate["casinoRollingRate"];
    let casinoLosingRate: string = userRate["casinoLosingRate"];
    let slotRollingRate: string = userRate["slotRollingRate"];
    let slotLosingRate: string = userRate["slotLosingRate"];
    let minigameRollingRate: string = userRate["minigameRollingRate"];
    let minigameLosingRate: string = userRate["minigameLosingRate"];

    const updateUser = async (setStatus: number = 0) => {
        let params = {
            id: userInfo["id"],
            bank,
            accountHolder,
            accountNumber,
            phoneNumber,
            status: setStatus,
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

<form on:submit|preventDefault={()=>{updateUser()}}>
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
                <input type="text" bind:value={accountNumber} disabled>
            </div>
            <div>
                <label for="">연락처</label>
                <input type="text" bind:value={phoneNumber} disabled>
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
                <input type="text" bind:value={casinoRollingRate} disabled>
            </div>
            <div>
                <label for="" class="text-emphasis red">카지노 루징</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["casinoLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={casinoLosingRate} disabled>
            </div>
        </div>
        <div class="form-group-half">
            <div>
                <label for="" class="text-emphasis red">슬롯 롤링</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["slotRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={slotRollingRate} disabled>
            </div>
            <div>
                <label for="" class="text-emphasis red">슬롯 루징</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["slotLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={slotLosingRate} disabled>
            </div>
        </div>
        <div class="form-group-half">
            <div>
                <label for="" class="text-emphasis red">미니게임 롤링</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["minigameRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={minigameRollingRate} disabled>
            </div>
            <div>
                <label for="" class="text-emphasis red">미니게임 루징</label>
                {#if userInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {userInfo["topId"]["adminCommissionRate"]["minigameLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={minigameLosingRate} disabled>
            </div>
        </div>
    </div>
    <div class="form-footer">
        <button type="button" class="red" on:click={deleteUser}>블락</button>
        <button type="button" class="user-wait green" on:click={()=>{updateUser(2)}}>대기</button>
        <button class="user-allow">허용</button>
    </div>
</form>

<style lang="scss">
    @import "./UserDetail.scss";
    @import "../../../styles/form.scss";
</style>