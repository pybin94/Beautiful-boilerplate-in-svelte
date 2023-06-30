<script lang="ts">
    import { got } from "utils/helpers";
    import Table from "utils/Table.svelte";
    import { popup } from "utils/popup";
    import Toggle from "utils/Toggle.svelte";
    import Radio from "utils/Radio.svelte";

    interface ThirdpartyStatus {
        id: number;
        status: number;
    }

    let tableList: Array<object>;
    let originTableList: Array<object>;
    let currentPage: number = 1;
    let limit: number = 20;
    let fullPage: number = 1;
    let offset: number = limit * currentPage-1;
    let gameType: null | number = null
    let registeredGames: Array<number> = [];
    let radioList = ["전체", "카지노", "슬롯"];
    let thirdpartyStatus: Array<ThirdpartyStatus> = [];

    const init = () => {
        handleGetList();
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
            originTableList = response.data;
            tableList = response.data;
            tableList.forEach((item)=>{
                registeredGames = [...registeredGames, item["providerThirdpartyId"]["id"]];
            });
            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        };
    }

    const updateThirdpartyStatus = async () => {

        let params = {
            thirdpartyStatus
        };

        const response = await got("/provider/site/thirdpartys", "PATCH", params);
        popup(response.message, response.status)
        if(response.status == 1) {
            thirdpartyStatus = [];
        }
    }

    const handleRadioValue = (setIndex: number) => {
        if(setIndex == 0) {
            tableList = originTableList
        } else if (setIndex == 1) {
            filteredTableList(setIndex)
        } else if (setIndex == 2) {
            filteredTableList(setIndex)
        }
    }

    const filteredTableList = (setIndex: number) => {
        tableList = [];
        originTableList.forEach((item)=>{
            if(item["providerThirdpartyId"]["type"] == setIndex) {
                tableList = [...tableList, item]
            }
        })
    }

    const handleToggle = (item: object): void => {
        item["status"] == 1
        ? item["status"] = 0
        : item["status"] = 1;
        
        tableList = tableList;

        if(thirdpartyStatus.length == 0) {
            thirdpartyStatus = [...thirdpartyStatus, {id: item["id"], status: item["status"]}];
        } else {
            let checkArrayList = true;
            thirdpartyStatus.forEach((thirdpartyStatusItem, index): any=>{
                if(thirdpartyStatusItem["id"] == item["id"]) {
                    thirdpartyStatus.splice(index, 1);
                    return checkArrayList = false;
                }
            })
            if(checkArrayList == true) {
                thirdpartyStatus = [...thirdpartyStatus, {id: item["id"], status: item["status"]}];
            }
        }
    }

    init();
</script>

<div class="card">
    <div class="card__header">
        <Radio {radioList} {handleRadioValue} />
    </div>
    <div class="card__body">
        <Table tableTitle={["순서", "게임사", "게임종류", "사용"]}>
            {#if tableList}
                {#each tableList as item, index}
                    <tr>
                        <td>{index+((currentPage-1)*limit)}</td>
                        <td>{item["providerThirdpartyId"]["name"]}</td>
                        <td>{item["providerThirdpartyId"]["type"] == 1 ? "카지노" : "슬롯"}</td>
                        <td>
                            <Toggle 
                                toggle={item["status"] == 1 ? true : false} 
                                handleToggle={()=>{handleToggle(item)}}
                            />
                        </td>
                    </tr>
                {/each}
            {/if}
        </Table>
    </div>
    <div class="card__footer">
        <button on:click={updateThirdpartyStatus}>저장</button>
    </div>
</div>

<style lang="scss">
    @import "../../styles/card.scss";
    @import "./SiteThirdparty.scss";
</style>