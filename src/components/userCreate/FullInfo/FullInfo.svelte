<script lang="ts">
    import { userFormAdvenced, userFormBasic } from "constants/userCreate";

    export let bindBasic: object;
    export let bindAdvenced: object;
</script>
<form class="create-user">
    {#each userFormBasic as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:value={bindBasic[index]}
                autocomplete="new-password"
                disabled
            >
        </div>
    {/each}
    {#each userFormAdvenced as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:value={bindAdvenced[index]}
                disabled
            >
        </div>
    {/each}
</form>

<style lang="scss">
    @import "../common.scss";
</style>