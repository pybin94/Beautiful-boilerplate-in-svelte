<script lang="ts">
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";
    import { got, moneyFormat } from "utils/helpers";
    import { handleValidate } from "utils/validator";

    export let handleVisible: Function;
    export let selectUser: Function;
    export let playerIndex: Array<number>;
    export let playerList: Array<string>;
    
    let currentPage: number = 1;
    let limit: number = 10;
    let searchValue: string;
    let tableList: Array<object>;
    let fullPage: number = 1;
    let offset: number = limit * currentPage-1;

    const handleToggle = (event: any) => {
        event.target.classList.toggle("line")
    };
   
    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
        };

        if(searchValue) {
            params["searchValue"] = searchValue;
        };

        const response = await got("/user/users", "POST", params);

        if(response.status == 1) {
            tableList = response.data.list;

            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        };
    };

    handleGetList()
</script>

<form on:submit|preventDefault={()=>{handleGetList()}}>
    <div class="form-body">
        <div class="form-group">
            <label for="">플레이어 검색</label>
            <div class="message-target">
                <input type="text" bind:value={searchValue}>
                <button>검색</button>
            </div>
        </div>
        <div class="form-group">
            <label for="">리스트</label>
            <input 
                id="title"
                type="text"
                disabled
                bind:value={playerList}
                on:keydown={(e)=>{handleValidate(e)}}
                on:blur={(e)=>{handleValidate(e)}}
            >
        </div>
        <div class="form-group">
            <label for="">플레이어 목록</label>
            {#if tableList}
                <Table tableTitle={["ID", "닉네임", "예금주", "보유금", "선택"]}>
                    {#each tableList as item}
                        <tr>
                            <td>{item["identity"]}</td>
                            <td>{item["nickname"]}</td>
                            <td>{item["accountHolder"]}</td>
                            <td>{moneyFormat(item["balance"])}</td>
                            <td>
                                <button
                                    id="selectButton"
                                    class="small blue 
                                        {playerIndex.indexOf(item["id"]) == -1 ? "line" : undefined}"
                                    type="button"
                                    on:click={(e)=>{
                                        handleToggle(e)
                                        selectUser(item["id"], item["identity"])}
                                    }
                                >
                                    선택
                                </button>
                            </td>
                        </tr>
                    {/each}
                </Table>
            {/if}
            <Pagenation {handleGetList} {fullPage} {currentPage} />
        </div>
    </div>
    <div class="form-footer">
        <button class="wide" type="button" on:click={()=>{handleVisible()}}>확인</button>
    </div>
</form>

<style lang="scss">
    @import "../../../styles/form.scss";
    @import "./SearchUser.scss";
</style>