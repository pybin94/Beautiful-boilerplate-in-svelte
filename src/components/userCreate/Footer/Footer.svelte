<script lang="ts">
    import { createUserLevel } from "constants/userCreate";
    import { createUser } from "services/userCreate";
    export let page: number;
    export let paging: Function;
    export let bindBasic: Array<HTMLInputElement>;
    export let bindAdvenced: Array<HTMLInputElement>;

</script>
<div class="create-user-footer">
    {#if page !== 1}
        <button 
            class="create-user-footer__previuos"
            on:click={()=>{paging(0)}}
        >
            <i class="fa-solid fa-chevron-left"></i>이전
        </button>
    {/if}
    {#if page !== createUserLevel.length}
        <button 
            class="create-user-footer__next"
            on:click={()=>{paging(1)}}
        >
            다음<i class="fa-solid fa-chevron-right"></i>
        </button>
    {:else}
        <button 
            class="create-user-footer__next"
            on:click={()=>{createUser([...bindBasic, ...bindAdvenced])}}
        >완료<i class="fa-solid fa-chevron-right"></i></button>
    {/if}
</div>

<style lang="scss">
    @import "./Footer.scss";
</style>