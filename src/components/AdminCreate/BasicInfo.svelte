<script lang="ts">
    import { adminFormBasic, bankList } from "constants/admin";
    import { handleValidate } from "utils/validator";
    import { adminLevel } from "constants/admin";
    import { getCookie, got } from "utils/helpers";
    import { popup } from "utils/popup";
    import { levelStore } from "stores/myInfo.store";

    export let bindBasic: any;
    export let basicValidate: object;
    let user = JSON.parse(getCookie("adminInfo") )

    const duplicateCheck = async (check:string, data: string) => {
        let params: object;
        if(check == "identity") {
            if(!data) {
                return popup("아이디를 입력해주세요.", 0)
            }
            params = {identity: data}
        } else {
            if(!data) {
                return popup("가입코드를 입력해주세요.", 0)
            }
            params = {code: data}
        }

        const response = await got(`/admin/check/${check}`, "POST", params)
        popup(response.message, response.status)
    }
</script>

<form class="create-admin">
    <div class="create-admin__form">
        <label for="">에이전트 등급</label>
        {#each adminLevel as item}
            {#if $levelStore+1 === item.level}
                <input 
                    disabled
                    value="{item.levelName}"
                >
            {/if}
        {/each}
    </div>
    {#each adminFormBasic as item, index}
        {#if item["id"] == "bank"}
            <div class="create-admin__form">
                <label for={item.id}>{item.title}</label>
                <select 
                    id={item.id}
                    class="create-admin__form__select"
                    bind:this={basicValidate[index]}
                    bind:value={bindBasic[index]}
                >
                    <option value="">은행선택</option>
                    {#each bankList as bankListItem}
                    <option value={bankListItem.value}>{bankListItem.name}</option>
                    {/each}
                </select>
            </div>
        {:else if item["id"] == "identity" || item["id"] == "code"}
            <div class="create-admin__form">
                <label for={item.id}>{item.title}</label>
                <div class="input-search">
                    <input 
                        id={item.id}
                        bind:this={basicValidate[index]}
                        bind:value={bindBasic[index]}
                        on:keydown={(e)=>{handleValidate(e)}}
                        on:blur={(e)=>{handleValidate(e)}}
                        placeholder={item.placeholder}
                        autocomplete="new-password"
                    >
                    <button type="button" on:click={()=>{duplicateCheck(item.id, bindBasic[index])}}>확인</button>
                </div>
            </div>
        {:else}
            <div class="create-admin__form">
                <label for={item.id}>{item.title}</label>
                <input 
                    id={item.id}
                    bind:this={basicValidate[index]}
                    bind:value={bindBasic[index]}
                    on:keydown={(e)=>{handleValidate(e)}}
                    on:blur={(e)=>{handleValidate(e)}}
                    placeholder={item.placeholder}
                    autocomplete="new-password"
                >
            </div>
        {/if}
    {/each}
</form>

<style lang="scss">
    @import "./Layout/common.scss";
    @import "./BasicInfo.scss";
</style>