<script lang="ts">
    import { adminAuthLevel } from "constants/adminList";
    import { adminFormAdvenced, adminFormBasic } from "constants/adminCreate";

    export let bindBasic: object;
    export let bindAdvenced: object;
    export let bindSelect: [number];

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
    <div class="create-admin__form">
        <label for="adminAuth">관리자 등급</label>

        {#each adminAuthLevel as item }
            {#if item.auth == bindSelect[0]}
                <input 
                    id="adminAuth"
                    bind:value={item.authName}
                    disabled
                >
            {/if}
        {/each}
    </div>
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
    @import "../common.scss";
</style>