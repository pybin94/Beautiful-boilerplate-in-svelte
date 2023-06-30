<script lang="ts">
    export let gameDetail: Array<string | number>;
</script>
{#if gameDetail}
<div class="card">
    <div class="card__header">
        게임 상세 설정
    </div>
    {#if gameDetail[0] == 1}
        <div class="card__body">
            <div class="card__body__items mr">
                <label for="">카지노 롤링 상한 (%)</label>
                <input type="number" bind:value={gameDetail[1]}>
            </div>
            <div class="card__body__items mr">
                <label for="">카지노 루징 상한 (%)</label>
                <input type="number" bind:value={gameDetail[2]}>
            </div>
            <div class="card__body__items">
                <label for="">카지노 누락 상한 (%)</label>
                <input type="number" bind:value={gameDetail[3]}>
            </div>
        </div>
    {/if}
    {#if gameDetail[4] == 1}
        <div class="card__body">
            <div class="card__body__items mr">
                <label for="">슬롯 롤링 상한 (%)</label>
                <input type="number" bind:value={gameDetail[5]}>
            </div>
            <div class="card__body__items mr">
                <label for="">슬롯 루징 상한 (%)</label>
                <input type="number" bind:value={gameDetail[6]}>
            </div>
            <div class="card__body__items">
                <label for="">슬롯 누락 상한 (%)</label>
                <input type="number" bind:value={gameDetail[7]}>
            </div>
        </div>
    {/if}
    {#if gameDetail[8] == 1}
        <div class="card__body">
            <div class="card__body__items mr">
                <label for="">미니게임 롤링 상한 (%)</label>
                <input type="number" bind:value={gameDetail[9]}>
            </div>
            <div class="card__body__items mr">
                <label for="">미니게임 루징 상한 (%)</label>
                <input type="number" bind:value={gameDetail[10]}>
            </div>
            <div class="card__body__items">
                <label for="">미니게임 누락 상한 (%)</label>
                <input type="number" bind:value={gameDetail[11]}>
            </div>
        </div>
    {/if}
</div>
{/if}
<style lang="scss">
    @import "../../styles/card.scss";
</style>