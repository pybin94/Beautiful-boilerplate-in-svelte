<script lang="ts">
    import { createAdminLevel } from "constants/adminCreate";
    import { createAdmin } from "services/adminCreate";
    export let page: number;
    export let paging: Function;
    export let bindBasic: Array<HTMLInputElement>;
    export let bindAdvenced: Array<HTMLInputElement>;
    export let bindSelect: [number];

</script>
<div class="create-admin-footer">
    {#if page !== 1}
        <button 
            class="create-admin-footer__previuos"
            on:click={()=>{paging(0)}}
        >
            <i class="fa-solid fa-chevron-left"></i>이전
        </button>
    {/if}
    {#if page !== createAdminLevel.length}
        <button 
            class="create-admin-footer__next"
            on:click={()=>{paging(1)}}
        >
            다음<i class="fa-solid fa-chevron-right"></i>
        </button>
    {:else}
        <button 
            class="create-admin-footer__next"
            on:click={()=>{createAdmin([...bindBasic, ...bindSelect, ...bindAdvenced])}}
        >완료<i class="fa-solid fa-chevron-right"></i></button>
    {/if}
</div>

<style lang="scss">
    @import "./Footer.scss";
</style>