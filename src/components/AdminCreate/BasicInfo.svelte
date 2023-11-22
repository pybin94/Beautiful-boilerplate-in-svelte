<script lang="ts">
    import { adminFormBasic } from "constants/admin";
    import { handleValidate } from "utils/validator";

    export let bindBasic: any;
    export let validateElements: object;
</script>

<form class="create-admin">
    {#each adminFormBasic as item, index}
        <div class="create-admin__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:this={validateElements[index]}
                bind:value={bindBasic[index]}
                on:keydown={(e)=>{handleValidate(e)}}
                on:blur={(e)=>{handleValidate(e)}}
                placeholder={item.placeholder}
                autocomplete="new-password"
            >
        </div>
    {/each}
</form>

<style lang="scss">
    @import "./Layout/common.scss";
    @import "./BasicInfo.scss";
</style>