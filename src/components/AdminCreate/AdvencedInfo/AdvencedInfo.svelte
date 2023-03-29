<script lang="ts">
    import { adminAuthLevel, adminFormAdvenced  } from "constants/adminCreate";
    import { handleValidate } from "utils/validator";

    export let bindAdvenced: object;
    export let adminAuth: HTMLSelectElement;

</script>

<form class="create-admin">

    <div class="create-admin__form">
        <label for="adminAuth">관리자 등급</label>
        <select id="adminAuth" class="create-admin__form__select" bind:value={adminAuth}>
            {#each adminAuthLevel as item}
                <option value={item.auth}>{item.authName}</option>
            {/each}
        </select>
    </div>
    {#each adminFormAdvenced as item, index}
        <div class="create-admin__form">
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
    @import "./AdvencedInfo.scss";
</style>