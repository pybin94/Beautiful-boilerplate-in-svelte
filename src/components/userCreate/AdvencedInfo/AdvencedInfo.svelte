<script lang="ts">
    import { userFormAdvenced  } from "constants/userCreate";
    import { handleValidate } from "utils/tools.css";

    export let bindAdvenced: object
</script>
<div class="create-user">
    {#each userFormAdvenced as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:this={bindAdvenced[index]}
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
</style>