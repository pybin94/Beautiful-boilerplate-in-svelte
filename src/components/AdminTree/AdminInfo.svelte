<script lang="ts">
    import { levelStore } from "stores/myInfo.store";
    import { dateFormat, moneyFormat } from "utils/helpers";

    export let handleDetailVisible: any;
    export let adminInfo: Array<any>;
</script>
{#if adminInfo}
    <div class="admin-detail">
        <label for="">에이전트 아이디</label>
        <input type="text" value={adminInfo["identity"]} disabled>
    </div>
    {#if adminInfo["adminCommissionRate"]}
        <div class="admin-detail">
            <label for="">닉네임</label>
            <input type="text" value={adminInfo["nickname"]} disabled>
        </div>
        <div class="admin-detail half">
            <div>
                <label for="">보유 머니</label>
                <input type="text" value={moneyFormat(adminInfo["balance"])} disabled>
            </div>
            <div>
                <label for="">보유 포인트</label>
                <input type="text" value={moneyFormat(adminInfo["point"])} disabled>
            </div>
        </div>
        <div class="admin-detail {$levelStore > 1 ? "half" : "third"}">
            <div>
                <label for="">카지노 롤링 %</label>
                <input type="text" value={adminInfo["adminCommissionRate"]["casinoRollingRate"]} disabled>
            </div>
            <div>
                <label for="">카지노 루징 %</label>
                <input type="text" value={adminInfo["adminCommissionRate"]["casinoLosingRate"]} disabled>
            </div>
            {#if $levelStore == 1 || $levelStore == 0}
                <div>
                    <label for="">카지노 누락 %</label>
                    <input type="text" value={adminInfo["adminCommissionRate"]["casinoOmittingRate"]} disabled>
                </div>
            {/if}
        </div>
        <div class="admin-detail {$levelStore > 1 ? "half" : "third"}">
            <div>
                <label for="">슬롯 롤링 %</label>
                <input type="text" value={adminInfo["adminCommissionRate"]["slotRollingRate"]} disabled>
            </div>
            <div>
                <label for="">슬롯 루징 %</label>
                <input type="text" value={adminInfo["adminCommissionRate"]["slotLosingRate"]} disabled>
            </div>
            {#if $levelStore == 1 || $levelStore == 0}
                <div>
                    <label for="">슬롯 누락 %</label>
                    <input type="text" value={adminInfo["adminCommissionRate"]["slotOmittingRate"]} disabled>
                </div>
            {/if}
        </div>
        <div class="admin-detail {$levelStore > 1 ? "half" : "third"}">
            <div>
                <label for="">미니게임 롤링 %</label>
                <input type="text" value={adminInfo["adminCommissionRate"]["minigameRollingRate"]} disabled>
            </div>
            <div>
                <label for="">미니게임 루징 %</label>
                <input type="text" value={adminInfo["adminCommissionRate"]["minigameLosingRate"]} disabled>
            </div>
            {#if $levelStore == 1 || $levelStore == 0}
                <div>
                    <label for="">미니게임 누락 %</label>
                    <input type="text" value={adminInfo["adminCommissionRate"]["minigameOmittingRate"]} disabled>
                </div>
            {/if}
        </div>
        <div class="admin-detail">
            <label for="">등록일</label>
            <input type="text" value={dateFormat(adminInfo["createdAt"])} disabled>
        </div>
        {#if adminInfo["level"] > 1}
        <button class="wide" on:click={handleDetailVisible}>상세 정보</button>
        {/if}
    {/if}
{/if}
<style lang="scss">
    @import "./AdminInfo.scss";
</style>