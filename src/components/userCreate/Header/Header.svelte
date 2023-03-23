<script lang="ts">
    import { createUserLevel } from "constants/userCreate";

    export let page: number;
</script>
<div class="create-user-header">
    {#each createUserLevel as item, index}
    <div class="create-user-header__level">
        {#if page === index + 1}
            <div class="create-user-header__level__box active">{index + 1}</div>
            <p class="create-user-header__level__title active">{item.title}</p>
        {:else}
            <div class="create-user-header__level__box">{index + 1}</div>
            <p class="create-user-header__level__title">{item.title}</p>
        {/if}
        {#if createUserLevel.length !== index + 1}
            <i class="fa-solid fa-chevron-right"></i>
        {/if}
    </div>
    {/each}
</div>

<style lang="scss">
    @import "./Header.scss";
</style>