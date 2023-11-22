<script lang="ts">
    import { dateFormat, moneyFormat } from "utils/helpers";

    export let handleDetailVisible: any;
    export let adminInfo: Array<any>;
</script>
{#if adminInfo}
    <div class="admin-detail">
        <label for="">아이디</label>
        <input type="text" value={adminInfo["identity"]} disabled>
    </div>
    <div class="admin-detail">
        <label for="">가입일</label>
        <input type="text" value={dateFormat(adminInfo["createdAt"])} disabled>
    </div>
    {#if adminInfo["level"] > 1}
    <button class="wide" on:click={handleDetailVisible}>상세정보</button>
    {/if}
{/if}
<style lang="scss">
    @import "./AdminInfo.scss";
</style>