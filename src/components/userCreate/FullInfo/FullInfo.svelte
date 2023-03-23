<script lang="ts">
    import { userFormAdvenced, userFormBasic } from "constants/userCreate";

    export let bindBasic: object;
    export let bindAdvenced: object
</script>
<div class="create-user">
    {#each userFormBasic as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:this={bindBasic[index]}
                type={item.type}
                placeholder={item.placeholder}
            >
        </div>
    {/each}
    {#each userFormAdvenced as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:this={bindAdvenced[index]}
                type={item.type}
                placeholder={item.placeholder}
            >
        </div>
    {/each}
</div>

<style lang="scss">
    @import "../common.scss";
</style>