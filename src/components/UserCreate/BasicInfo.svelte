<script lang="ts">
    import { bankList } from "constants/admin";
    import { userFormBasic } from "constants/user";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import { handleValidate } from "utils/validator";

    export let bindBasic: any;
    export let basicValidate: object;

    const duplicateCheck = async (check:string, data: string) => {
        let params: object;
        if(!data) {
            return popup("아이디를 입력해주세요.", 0)
        }
        
        params = {
            identity: data
        }

        const response = await got(`/user/check/${check}`, "POST", params)
        popup(response.message, response.status)
    }

</script>

<form class="create-user">
    {#each userFormBasic as item, index}
    {#if item["id"] == "bank"}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <select 
                id={item.id}
                class="create-user__form__select"
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
        <div class="create-user__form">
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
        <div class="create-user__form">
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