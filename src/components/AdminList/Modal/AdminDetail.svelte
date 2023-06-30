<script lang="ts">
    import { bankList } from "constants/admin";
    import { adminLevel } from "constants/admin";
    import { levelStore } from "stores/myInfo.store";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import { handleValidate } from "utils/validator";

    export let adminInfo: object;
    export let handleDetailVisible: any;
    export let handleGetList: Function;

    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;
    let bank: string = adminInfo["bank"];
    let accountHolder: string = adminInfo["accountHolder"];
    let accountNumber: string = adminInfo["accountNumber"];
    let phoneNumber: string = adminInfo["phoneNumber"];
    let casinoRollingRate: string = adminInfo["adminCommissionRate"]["casinoRollingRate"];
    let casinoLosingRate: string = adminInfo["adminCommissionRate"]["casinoLosingRate"];
    let casinoOmittingRate: string = adminInfo["adminCommissionRate"]["casinoOmittingRate"];
    let slotRollingRate: string = adminInfo["adminCommissionRate"]["slotRollingRate"];
    let slotLosingRate: string = adminInfo["adminCommissionRate"]["slotLosingRate"];
    let slotOmittingRate: string = adminInfo["adminCommissionRate"]["slotOmittingRate"];
    let minigameRollingRate: string = adminInfo["adminCommissionRate"]["minigameRollingRate"];
    let minigameLosingRate: string = adminInfo["adminCommissionRate"]["minigameLosingRate"];
    let minigameOmittingRate: string = adminInfo["adminCommissionRate"]["minigameOmittingRate"];
    let memo: string = adminInfo["memo"];

    const updateAdminInfo = async () => {
        let params = {
            id: adminInfo["id"],
            accountHolder,
            accountNumber,
            bank,
            casinoRollingRate,
            casinoLosingRate,
            casinoOmittingRate,
            slotRollingRate,
            slotLosingRate,
            slotOmittingRate,
            minigameRollingRate,
            minigameLosingRate,
            minigameOmittingRate,
            memo
        }

        const response = await got(`/admin/update`, "PATCH", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleGetList()
            handleDetailVisible()
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
        const response = await got(`/admin/update/password`, "PATCH", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleGetList()
            handleDetailVisible()
        }
    }

    const deleteAdmin = () => {
        popup("블락하시겠습니까?", 3, async (data: boolean) => {
            if(data === false) return; 
       
            let params = {
                id: adminInfo["id"]
            }

            const response = await got(`/admin/delete`, "DELETE", params)
            popup(response.message, response.statuS)
            if (response.status == 1) {
                handleGetList();
                handleDetailVisible();
            }
        });
    }
</script>

<form on:submit|preventDefault={updateAdminInfo}>
    <div class="form-body">
        <div class="form-group">
            <label for="">에이전트 등급</label>
            {#each adminLevel as level}
                {#if adminInfo["level"] === level["level"]}
                    <input type="text" disabled value={level["levelName"]}>
                {/if}
            {/each}
        </div>
        <div class="form-group-half">
            <div>
                <label for="">에이전트 아이디</label>
                <input type="text" disabled value={adminInfo["identity"]}>
            </div>
            <div>
                <label for="">닉네임</label>
                <input type="text" disabled value={adminInfo["nickname"]}>
            </div>
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
        <div class="form-group">
            <label for="">메모</label>
            <input type="text" bind:value={memo}>
        </div>
        <div class={$levelStore == 1 || $levelStore == 0 ? "form-group-third": "form-group-half"}>
            <div>
                <label for="" class="text-emphasis red">카지노 롤링</label>
                {#if adminInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["casinoRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={casinoRollingRate}>
            </div>
            <div>
                <label for="" class="text-emphasis red">카지노 루징</label>
                {#if adminInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["casinoLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={casinoLosingRate}>
            </div>
            {#if $levelStore == 1 || $levelStore == 0}
                <div>
                    <label for="" class="text-emphasis red">카지노 누락</label>
                    {#if adminInfo["topId"]["level"] > 1}
                        <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["casinoOmittingRate"]}</span>
                    {/if}
                    <input type="text" bind:value={casinoOmittingRate}>
                </div>
            {/if}
        </div>
        <div class={$levelStore == 1 || $levelStore == 0 ? "form-group-third": "form-group-half"}>
            <div>
                <label for="" class="text-emphasis red">슬롯 롤링</label>
                {#if adminInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["slotRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={slotRollingRate}>
            </div>
            <div>
                <label for="" class="text-emphasis red">슬롯 루징</label>
                {#if adminInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["slotLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={slotLosingRate}>
            </div>
            {#if $levelStore == 1 || $levelStore == 0}
                <div>
                    <label for="" class="text-emphasis red">슬롯 누락</label>
                    {#if adminInfo["topId"]["level"] > 1}
                        <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["slotOmittingRate"]}</span>
                    {/if}
                    <input type="text" bind:value={slotOmittingRate}>
                </div>
            {/if}
        </div>
        <div class={$levelStore == 1 || $levelStore == 0 ? "form-group-third": "form-group-half"}>
            <div>
                <label for="" class="text-emphasis red">미니게임 롤링</label>
                {#if adminInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["minigameRollingRate"]}</span>
                {/if}
                <input type="text" bind:value={minigameRollingRate}>
            </div>
            <div>
                <label for="" class="text-emphasis red">미니게임 루징</label>
                {#if adminInfo["topId"]["level"] > 1}
                    <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["minigameLosingRate"]}</span>
                {/if}
                <input type="text" bind:value={minigameLosingRate}>
            </div>
            {#if $levelStore == 1 || $levelStore == 0}
                <div>
                    <label for="" class="text-emphasis red">미니게임 누락</label>
                    {#if adminInfo["topId"]["level"] > 1}
                        <span class="top-commission">상위: {adminInfo["topId"]["adminCommissionRate"]["minigameOmittingRate"]}</span>
                    {/if}
                    <input type="text" bind:value={minigameOmittingRate}>
                </div>
            {/if}
        </div>
    </div>
    <div class="form-footer">
        <button type="button" class="red" on:click={deleteAdmin}>블락</button>
        <button class="admin-info-save">저장</button>
    </div>
</form>

<style lang="scss">
    @import "./AdminDetail.scss";
    @import "../../../styles/form.scss";
</style>