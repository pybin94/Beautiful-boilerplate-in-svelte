<script lang="ts">
    import { adminAuthLevel } from "constants/adminList";
    export let handleGetList: Function;
    export let searchFrom: [number, string, number];
    
    const optionValue = [20, 50, 100];
</script>

<form class="search-form" on:submit|preventDefault={()=>{handleGetList()}}>
    <select bind:value={searchFrom[0]} on:change={()=>{handleGetList()}}>
        {#each optionValue as item}
            <option value={item}>{item}</option>
        {/each}
    </select>
    <label for="authSelect">관리자 등급</label>
    <select id="authSelect" bind:value={searchFrom[2]} on:change={()=>{handleGetList()}}>
        <option value={null}>전체</option>
        {#each adminAuthLevel as item}
            <option value={item.auth}>{item.authName}</option>
        {/each}
    </select>
    <div class="search-form__search">
        <label for="searchInput">검색어를 입력하세요.</label>
        <div class="search-form__search__wrap">
            <input id="searchInput" type="text" bind:value={searchFrom[1]}>
            <button class="search-form__search__wrap__button">검색</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "./SearchFrom.scss";
</style>