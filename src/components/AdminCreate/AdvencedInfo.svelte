<script lang="ts">
    import { adminFormAdvenced  } from "constants/admin";
    import { detailInfo } from "constants/myInfo";
    import { levelStore } from "stores/myInfo.store";
    import { handleValidate } from "utils/validator";

    export let bindAdvenced: object;
</script>

<form class="create-admin">
    {#each adminFormAdvenced as item, index}
        <div class="create-admin__form dubble">
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
    <div class="create-admin__form dubble">
        <label for="memo">메모</label>
        <input 
            id="memo"
            bind:value={bindAdvenced[7]}
            on:keydown={(e)=>{handleValidate(e)}}
            on:blur={(e)=>{handleValidate(e)}}
            placeholder={"입력하지 않으셔도 됩니다."}
        >
    </div>
</form>

<style lang="scss">
    @import "./Layout/common.scss";
    @import "./AdvencedInfo.scss";
</style>