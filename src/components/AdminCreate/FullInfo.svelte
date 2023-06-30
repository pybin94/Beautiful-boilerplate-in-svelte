<script lang="ts">
    import { adminFormAdvenced, adminFormBasic } from "constants/admin";

    export let bindBasic: object;
    export let bindAdvenced: object;

</script>
<form class="create-admin">
    {#each adminFormBasic as item, index}
        <div class="create-admin__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:value={bindBasic[index]}
                autocomplete="new-password"
                disabled
            >
        </div>
    {/each}
    {#each adminFormAdvenced as item, index}
        <div class="create-admin__form">
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
    @import "./Layout/common.scss";
</style>