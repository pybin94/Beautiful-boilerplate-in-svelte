<script lang="ts">
    import { dateFormat, got } from "utils/helpers";
    import { popup } from "utils/popup";

    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
    export let handleGetList: Function;
    export let handleCreatePopupVisible: Function;

    const deletePopupNotice = (setId: number) => {
    
        let params = {
            id: setId,
        };

        popup("정말 삭제하시겠습니까?", 3, async (data: boolean) => {
            if(data === false) return; 

            const response = await got("/notice/popup", "DELETE", params)
            popup(response.message, response.status)
            if(response.status == 1) {
                handleGetList();
            };
        })
    };
</script>

{#if tableList}
    {#each tableList as item, index}
        <tr>
            <td>{index+((currentPage-1)*limit)}</td>
            <td width="800">{item["title"]}</td>
            <td>{item["status"] == 0 ? "숨김" : "보임"}</td>
            <td>{item["isAuto"] == 0 ? "수동" : "자동"}</td>
            <td>{item["isSigned"] == 0 ? "로그인" : "전체"}</td>
            <td><button class="small red line" type="button" on:click={()=>{handleCreatePopupVisible(item)}}>수정</button></td>
            <td><button class="small red" type="button" on:click={()=>{deletePopupNotice(item["id"])}}>삭제</button></td>
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
{/if}

<style lang="scss">
    .table-title {
        cursor: pointer;
    }
</style>