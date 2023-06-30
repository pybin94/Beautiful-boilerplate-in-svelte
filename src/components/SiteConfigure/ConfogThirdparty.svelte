<script lang="ts">
    import Modal from "utils/Modal.svelte";
    import Pagenation from "utils/Pagenation.svelte";
    import { got } from "utils/helpers";
    import Table from "utils/Table.svelte";
    import AddThirdparty from "./Modal/AddThirdparty.svelte";
    import { popup } from "utils/popup";

    let tableList: Array<object>;
    let currentPage: number = 1;
    let limit: number = 20;
    let fullPage: number = 1;
    let offset: number = limit * currentPage-1;
    let gameType: null | number = null
    let searchGameListVisible = false;
    let registeredGames: Array<number> = [];

    const init = () => {
        handleGetList();
    };

    const handleSearchGameListVisible = () => {
        searchGameListVisible = !searchGameListVisible;
    };

    const handleGetList = async (setPage?: number) => {
        if(setPage) currentPage = setPage;

        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
            type: gameType,
        };

        const response = await got("/provider/site/thirdpartys", "POST", params);
        if(response.status == 1) {
            tableList = response.data;
            tableList.forEach((item)=>{
                registeredGames = [...registeredGames, item["providerThirdpartyId"]["id"]];
            });
            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        };
    }

    const deleteThirdparty = (item: object) => {
        popup("삭제 하시겠습니까?", 3, async (data: boolean) => {
            if(data === false) return; 
            
            let params = {
                id: item["id"]
            };

            const response = await got(`/provider/site/thirdpartys`, "DELETE", params);
            popup(response.message, response.status);
            if (response.status == 1) {
                handleGetList();
            };
        });
    };

    init();
</script>
<div class="card">
    <div class="card__header">
        <p class="card__header__title">게임 리스트</p>
        <button type="button" on:click={handleSearchGameListVisible}>추가</button>
    </div>
    <div class="card__body">
        <Table tableTitle={["순서", "제공사", "게임사", "게임종류", "삭제"]}>
            {#if tableList}
                {#each tableList as item, index}
                    <tr>
                        <td>{index+((currentPage-1)*limit)}</td>
                        <td>{item["providerThirdpartyId"]["providerId"]["name"]}</td>
                        <td>{item["providerThirdpartyId"]["name"]}</td>
                        <td>{item["providerThirdpartyId"]["type"] == 1 ? "카지노" : "슬롯"}</td>
                        <td>
                            <button 
                                type="button" 
                                class="small red line" 
                                on:click={()=>{deleteThirdparty(item)}}
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                {/each}
            {/if}
        </Table>
    </div>
    <div class="card__footer">
        <Pagenation {handleGetList} {fullPage} {currentPage} />
    </div>
</div>

<Modal visible={searchGameListVisible} handleVisible={handleSearchGameListVisible} title={"게임 리스트 추가"} >
    <AddThirdparty handleVisible={handleSearchGameListVisible} {handleGetList} {registeredGames}/>
</Modal>

<style lang="scss">
    @import "../../styles/card.scss";
    @import "./ConfigThirdparty.scss";
</style>