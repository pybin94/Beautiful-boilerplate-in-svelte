<script lang="ts">
    export let handleGetList: Function;
    export let searchFrom: [number, string];
    const optionValue = [20, 50, 100];
</script> 

<form class="search-form" on:submit|preventDefault={()=>{handleGetList()}}>
    <select bind:value={searchFrom[0]} on:change={()=>{handleGetList()}}>
        {#each optionValue as item}
            <option value={item}>{item}</option>
        {/each}
    </select>
    <div class="input-form">
        <label for="searchInput">어드민 아이디</label>
        <input id="searchInput" type="text" bind:value={searchFrom[1]}>
        <button>검색</button>
    </div>
</form>

<style lang="scss">
    @import "./SearchFrom.scss";
</style>