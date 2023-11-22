<script lang="ts">
    export let handleGetList: Function;
    export let searchForm: [number, string, number];
    
    const optionValue = [20, 50, 100];
    const orderBy = [
        {index: 0, title: "생성일"}, 
        {index: 1, title: "아이디"}, 
    ]
</script>

<form class="search-form" on:submit|preventDefault={()=>{handleGetList(1)}}>
    <select bind:value={searchForm[0]} on:change={()=>{handleGetList(1)}}>
        {#each optionValue as item}
            <option value={item}>{item}</option>
        {/each}
    </select>
    <label for="orderBy">정렬</label>
    <select id="orderBy" bind:value={searchForm[2]} on:change={()=>{handleGetList()}}>
        {#each orderBy as item}
                <option value={item.index}>{item.title}</option>
        {/each}
    </select>
    <div class="search-form__search">
        <label for="searchInput">검색어를 입력하세요.</label>
        <div class="search-form__search__wrap input-search">
            <input id="searchInput" type="text" placeholder={"아이디, 닉네임"} bind:value={searchForm[1]}>
            <button class="search-form__search__wrap__button">검색</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "../../styles/searchForm.scss";
</style>