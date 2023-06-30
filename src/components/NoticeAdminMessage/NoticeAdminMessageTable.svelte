<script lang="ts">
    import { dateFormat, got } from "utils/helpers";

    export let tableList: Array<any>;
    export let currentPage: number;
    export let limit: number;
    export let handleDetailMessageVisible: Function;
    export let handleGetList: Function;
    export let searchForm: [number, number, string, number];
    
    const checkMessage = async (targetItem: Array<object>) => {
        
        // 쪽지 확인
        if (searchForm[1] == 2 && targetItem["status"] == 0) {
            let params = {
                id: targetItem["id"],
                status: 1
            }
            const response = await got(`/notice/admin/message`, "PATCH", params);
            if(response.status == 1) {
                handleGetList()
            }

        // 답변 확인
        } else if (searchForm[1] == 1 && targetItem["status"] == 2) {
            let params = {
                id: targetItem["id"],
                status: 3
            }
            const response = await got(`/notice/admin/message`, "PATCH", params);
            if(response.status == 1) {
                handleGetList()
            }
        }
    }
    const statusList = ["쪽지 전송", "쪽지 확인", "답변 전송", "답변 확인"];
</script>

{#if tableList}
    {#each tableList as item, index}
        <tr>
            <td>{index+((currentPage-1)*limit)}</td>
            <td>
                {
                    item["isBroadcast"] == 0 
                    ? (item[searchForm[1] == 2 
                        ? "sendId" 
                        : "receiveId"]?.identity) == null 
                            ? process.env.SITENAME
                            : (item[searchForm[1] == 2 
                                ? "sendId" 
                                : "receiveId"]?.identity)
                    : "전체 발송"
                }
            </td>
            <td 
                class="table-title"
                width="800"
                on:click={()=>{
                    handleDetailMessageVisible(item)
                    checkMessage(item)
                }}
                on:keypress={()=>{
                    handleDetailMessageVisible(item)
                    checkMessage(item)
                }}
            >
                {item["title"]}
            </td>
            <td>{statusList[item["status"]]}</td>
            <td>{item["isBroadcast"] == 0 ? "일반" : "전체"}</td>
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
{/if}

<style lang="scss">
    .table-title {
        cursor: pointer;
    }
</style>