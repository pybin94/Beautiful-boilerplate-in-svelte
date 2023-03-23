<script lang="ts">
    import { userFormBasic } from "constants/userCreate";
    import { handleValidate } from "utils/tools.css";

    export let bindBasic: object;
</script>

<div class="create-user">
    {#each userFormBasic as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:this={bindBasic[index]}
                on:keydown={(e)=>{handleValidate(e)}}
                on:blur={(e)=>{handleValidate(e)}}
                type={item.type}
                placeholder={item.placeholder}
            >
        </div>
    {/each}
</div>

<style lang="scss">
    @import "../common.scss";
    @import "./BasicInfo.scss";
</style>