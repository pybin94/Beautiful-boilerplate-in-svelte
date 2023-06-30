<script lang="ts">
    import { DateInput } from 'date-picker-svelte'
    export let handleGetList: Function;
    export let searchForm: [number, string, Date, Date];

    const optionValue = [20, 50, 100];
</script>

<form class="search-form" on:submit|preventDefault={()=>{handleGetList(1)}}>
    <select bind:value={searchForm[0]} on:change={()=>{
            handleGetList(1);
        }}>
        {#each optionValue as item}
            <option value={item}>{item}</option>
        {/each}
    </select>
    <div class="date-picker-wrap">
        <DateInput bind:value={searchForm[2]} max={searchForm[3]}/>
        <DateInput bind:value={searchForm[3]} min={searchForm[2]}/>
    </div>
    <div class="search-form__search">
        <label for="searchInput">검색어를 입력하세요.</label>
        <div class="search-form__search__wrap input-search">
            <input id="searchInput" type="text" bind:value={searchForm[1]}>
            <button class="search-form__search__wrap__button">검색</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "./SearchForm.scss";
    @import "../../styles/searchForm.scss";
</style>