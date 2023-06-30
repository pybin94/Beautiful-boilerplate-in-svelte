<script lang="ts">
    import Radio from "utils/Radio.svelte";

    export let handleCreateMessageVisible: Function;
    export let handleGetList: Function;
    export let searchForm: [number, number, string, number];

    let radioList = ["받은 쪽지", "보낸 쪽지"];

    const handleRadioValue = (setIndex: number) => {
        if(setIndex == 0) {
            searchForm[1] = 2;
            handleGetList(1);
        } else if (setIndex == 1) {
            searchForm[1] = 1;
            handleGetList(1);
        };
    };
</script>

<form class="search-form" on:submit|preventDefault={()=>{handleGetList(1)}}>
    <div class="search-form__search">
        <label for="searchInput">검색어를 입력하세요.</label>
        <select name="" id="" bind:value={searchForm[3]}>
            <option value={0}>전체</option>
            <option value={1}>아이디</option>
            <option value={2}>제목</option>
            <option value={3}>내용</option>
            <option value={4}>답변</option>
        </select>
        <div class="search-form__search__wrap input-search">
            <input id="searchInput" type="text" bind:value={searchForm[2]}>
            <button class="search-form__search__wrap__button">검색</button>
        </div>
    </div>
</form>
<div class="button-wrap">
    <Radio radioList={radioList} {handleRadioValue} />
    <button 
        on:click={()=>{handleCreateMessageVisible()}}
        class="button-wrap__send-message"
    >
        쪽지 보내기
    </button>
</div>

<style lang="scss">
    @import "../../styles/searchForm.scss";
    @import "./UserMessageSearchForm.scss";
</style>