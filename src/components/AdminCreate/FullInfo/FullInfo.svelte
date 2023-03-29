<script lang="ts">
    import { adminAuthLevel } from "constants/adminCreate";
    import { userFormAdvenced, userFormBasic } from "constants/userCreate";

    export let bindBasic: object;
    export let bindAdvenced: object;
    export let adminAuth: HTMLSelectElement;
    // adminAuthLevel
    console.log(adminAuth)
</script>
<form class="create-admin">
    {#each userFormBasic as item, index}
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
        <input 
            id="adminAuth"
            bind:value={adminAuth}
            disabled
        >
    </div>
    {#each userFormAdvenced as item, index}
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