<script lang="ts">
    export let siteSetting: Array<string | number>;
</script>
{#if siteSetting}
<div class="card">
    <div class="card__header">
        사이트 상세 설정
    </div>
    <div class="card__body">
        <div class="card__body__items mr">
            <label for="">사이트 점검</label>
            <select name="" id="" bind:value={siteSetting[0]}>
                <option value={0}>비활성화</option>
                <option value={1}>활성화</option>
            </select>
        </div>
        <div class="card__body__items-75">
            <label for="">사이트 점검 문구</label>
            <input type="text" placeholder="플레이어 사이트 점검 시 표기할 문구를 적어주세요." bind:value={siteSetting[1]}>
        </div>
    </div>
    <div class="card__body">
        <div class="card__body__items mr">
            <label for="">텔레그램</label>
            <select name="" id="" bind:value={siteSetting[2]}>
                <option value={1}>활성화</option>
                <option value={0}>비활성화</option>
            </select>
        </div>
        <div class="card__body__items-50">
            <label for="">텔레그램 아이디</label>
            <input type="text" disabled={siteSetting[2] ? false : true} bind:value={siteSetting[3]}>
        </div>
    </div>
</div>
{/if}
<style lang="scss">
    @import "../../styles/card.scss";
</style>