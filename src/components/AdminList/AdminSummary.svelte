<script lang="ts">
    import { moneyFormat } from "utils/helpers";

    export let adminData: Array<object>;

    
</script>

{#if adminData}
    <div class="admin-summary">
        <p>전체 <span class="admin-summary__coloring">{moneyFormat(adminData["total"])}</span> 명</p>
        <!-- <p>보유금 <span class="admin-summary__coloring">{moneyFormat(adminData["balance"])}</span></p> -->
    </div>
{/if}

<style lang="scss">
    @import "./AdminSummary.scss";
</style>