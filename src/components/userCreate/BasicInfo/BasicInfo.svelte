<script lang="ts">
    import { userFormBasic } from "constants/userCreate";
    import { handleValidate } from "utils/validator";

    export let bindBasic: any;
</script>

<form class="create-user">
    {#each userFormBasic as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
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
    @import "../common.scss";
    @import "./BasicInfo.scss";
</style>