<script lang="ts">
    import { adminLevel } from "constants/admin";
    import { levelStore } from "stores/myInfo.store";
    export let handleGetList: Function;
    export let searchForm: [number, string, number];
    
    const optionValue = [20, 50, 100];
</script>

<form class="search-form" on:submit|preventDefault={()=>{handleGetList(1)}}>
    <select bind:value={searchForm[0]} on:change={()=>{handleGetList(1)}}>
        {#each optionValue as item}
            <option value={item}>{item}</option>
        {/each}
    </select>
    <label for="levelSelect">에이전트 등급</label>
    <select id="levelSelect" bind:value={searchForm[2]} on:change={()=>{handleGetList()}}>
        <option value={null}>전체</option>
        {#each adminLevel as item}
            {#if item.level > $levelStore}
                <option value={item.level}>{item.levelName}</option>
            {/if}
        {/each}
    </select>
    <div class="search-form__search">
        <label for="searchInput">검색어를 입력하세요.</label>
        <div class="search-form__search__wrap input-search">
            <input id="searchInput" type="text" placeholder="소속, 아이디, 닉네임" bind:value={searchForm[1]}>
            <button class="search-form__search__wrap__button">검색</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "../../styles/searchForm.scss";
</style>