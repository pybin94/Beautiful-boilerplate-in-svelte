<script lang="ts">
    import { adminFormAdvenced  } from "constants/admin";
    import { adminAuthLevel } from "constants/admin";
    import { handleValidate } from "utils/validator";

    export let bindAdvenced: object;
    export let bindSelect: [number];
</script>

<form class="create-admin">
    {#each adminFormAdvenced as item, index}
        <div class="create-admin__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:value={bindAdvenced[index]}
                on:keydown={(e)=>{handleValidate(e)}}
                on:blur={(e)=>{handleValidate(e)}}
                placeholder={item.placeholder}
            >
        </div>
    {/each}
</form>

<style lang="scss">
    @import "./Layout/common.scss";
    @import "./AdvencedInfo.scss";
</style>