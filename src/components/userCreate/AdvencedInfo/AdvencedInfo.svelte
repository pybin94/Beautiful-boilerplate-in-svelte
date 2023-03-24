<script lang="ts">
    import { userFormAdvenced  } from "constants/userCreate";
    import { handleValidate } from "utils/validator";

    export let bindAdvenced: object;
</script>

<form class="create-user">
    {#each userFormAdvenced as item, index}
        <div class="create-user__form">
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
    @import "../common.scss";
</style>