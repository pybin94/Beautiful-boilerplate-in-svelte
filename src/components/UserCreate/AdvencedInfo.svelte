<script lang="ts">
    import { userFormAdvenced  } from "constants/user";
    import { detailInfo } from "constants/myInfo";
    import { handleValidate } from "utils/validator";
    import Toggle from "utils/Toggle.svelte";
    import { userLevel } from "constants/user";
    import { levelStore } from "stores/myInfo.store";

    export let bindAdvenced: object;

    let isReferer: boolean = false;

    const toggleIsReffrer = (): void => {
        isReferer = !isReferer
        if(isReferer) {
            bindAdvenced[8] = 1
        } else {
            bindAdvenced[8] = 0
        }
    }
</script>

<form class="create-user">
    {#each userFormAdvenced as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}
                {#if $levelStore > 1}
                    <span>(상위 {detailInfo[Math.floor(index/2)]["data"][index%2]}%)</span>
                {/if}
            </label>
            <input 
                id={item.id}
                bind:value={bindAdvenced[index]}
                on:keydown={(e)=>{handleValidate(e)}}
                on:blur={(e)=>{handleValidate(e)}}
                placeholder={item.placeholder}
            >
        </div>
    {/each}
    <div class="create-user__form">
        <label for="level">레벨</label>
        <select 
            id=level
            class="create-user__form__select"
            bind:value={bindAdvenced[6]}
        >
            {#each userLevel as item}
                <option value={item}>{item}</option>
            {/each}
        </select>
    </div>
    <div class="create-user__form">
        <label for="level">베팅 제한 레벨</label>
        <select 
            id=level
            class="create-user__form__select"
            bind:value={bindAdvenced[7]}
        >
        {#each userLevel as item}
            <option value={item}>{item}</option>
        {/each}
        </select>
    </div>
    <div class="create-user__form">
        <label for="raffrer" >추천인 설정</label>
        <div class="toggle">
            <Toggle toggle={isReferer} handleToggle={toggleIsReffrer}/>
        </div>
    </div>
    <div class="create-user__form">
        <label for="raffrer" >메모</label>
        <input 
            id=raffrer
            bind:value={bindAdvenced[9]}
            on:keydown={(e)=>{handleValidate(e)}}
            on:blur={(e)=>{handleValidate(e)}}
            placeholder="입력하지 않으셔도 됩니다."
        >
    </div>
</form>

<style lang="scss">
    @import "./Layout/common.scss";
    @import "./AdvencedInfo.scss"; 
</style>