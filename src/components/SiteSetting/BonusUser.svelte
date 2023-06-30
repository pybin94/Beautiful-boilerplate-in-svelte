<script lang="ts">
    import { userLevel } from "constants/user";

    export let bonusUserLevel: object;
</script>
{#if bonusUserLevel[0]}
    <div class="card">
        <div class="card__header">
            플레이어 레벨별 보너스 설정
        </div>
        {#each userLevel as item, index}
            <div class="card__body">
                <div class="card__body__items-tiny tac">
                    <button class="fade red small">LV {item}</button>
                </div>
                <div class="card__body__items-tiny mr">
                    <label for="">일일 최대</label>
                    <input type="number" bind:value={bonusUserLevel[index][0]}>
                </div>
                <div class="card__body__items-tiny mr">
                    <label for="">신규 첫충 %</label>
                    <input type="number" bind:value={bonusUserLevel[index][1]}>
                </div>
                <div class="card__body__items-tiny mr">
                    <label for="">당일 첫충 %</label>
                    <input type="number" bind:value={bonusUserLevel[index][3]}>
                </div>
                <div class="card__body__items-tiny mr">
                    <label for="">매충 %</label>
                    <input type="number" bind:value={bonusUserLevel[index][2]}>
                </div>
                <div class="card__body__items-tiny mr">
                    <label for="">신규 최대</label>
                    <input type="number" bind:value={bonusUserLevel[index][4]}>
                </div>
                <div class="card__body__items-tiny">
                    <label for="">당일 최대</label>
                    <input type="number" bind:value={bonusUserLevel[index][6]}>
                </div>
                <div class="card__body__items-tiny mr">
                    <label for="">매충 최대</label>
                    <input type="number" bind:value={bonusUserLevel[index][5]}>
                </div>
            </div>
        {/each}
    </div>
{/if}
<style lang="scss">
    @import "../../styles/card.scss";
</style>