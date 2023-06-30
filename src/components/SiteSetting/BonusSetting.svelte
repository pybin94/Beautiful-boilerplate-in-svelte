<script lang="ts">
    export let bonusSetting: Array<any>;
    export let detectBonusLevel: Function;
</script>
{#if bonusSetting}
<div class="card">
    <div class="card__header">
        보너스 설정
    </div>
    <div class="card__body">
        <div class="card__body__items mr">
            <label for="">보너스 사용</label>
            <select name="" id="" 
                bind:value={bonusSetting[0]}
                on:change={()=>{detectBonusLevel(bonusSetting[0])}}
            >
                <option value={0}>보너스 비활성화</option>
                <option value={1}>보너스 활성화</option>
                <option value={2}>보너스 레벨 활성화</option>
            </select>
        </div>
        <div class="card__body__items mr">
            <label for="">신규 첫충 %</label>
            <input type="number" bind:value={bonusSetting[2]} disabled={bonusSetting[0] == 1 ? false : true}>
        </div>
        <div class="card__body__items mr">
            <label for="">당일 첫충 %</label>
            <input type="number" bind:value={bonusSetting[6]} disabled={bonusSetting[0] == 1 ? false : true}>
        </div>
        <div class="card__body__items">
            <label for="">매충 %</label>
            <input type="number" bind:value={bonusSetting[4]} disabled={bonusSetting[0] == 1 ? false : true}>
        </div>
    </div>
    <div class="card__body">
        <div class="card__body__items mr">
            <label for="">일일 최대</label>
            <input type="number" bind:value={bonusSetting[1]} disabled={bonusSetting[0] == 1 ? false : true}>
        </div>
        <div class="card__body__items mr">
            <label for="">신규 최대</label>
            <input type="number" bind:value={bonusSetting[3]} disabled={bonusSetting[0] == 1 ? false : true}>
        </div>
        <div class="card__body__items mr">
            <label for="">당일 최대</label>
            <input type="number" bind:value={bonusSetting[7]} disabled={bonusSetting[0] == 1 ? false : true}>
        </div>
        <div class="card__body__items">
            <label for="">매충 최대</label>
            <input type="number" bind:value={bonusSetting[5]} disabled={bonusSetting[0] == 1 ? false : true}>
        </div>
    </div>
</div>
{/if}
<style lang="scss">
    @import "../../styles/card.scss";
</style>