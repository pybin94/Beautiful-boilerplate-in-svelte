<script lang="ts">
    import { adminLevel } from "constants/admin";
    import { levelStore } from "stores/myInfo.store";
    import { dateFormat, got } from "utils/helpers";
    import { popup } from "utils/popup";

    export let tableFixed: Array<object>;
    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
    export let handleGetList: Function;
    export let handleCreateNoticeVisible: Function;
    export let handleDetailNoticeVisible: Function;

    const deleteAdminNotice = (setId: number) => {
    
        let params = {
            id: setId,
        };

        popup("정말 삭제하시겠습니까?", 3, async (data: boolean) => {
            if(data === false) return; 

            const response = await got("/notice/admin", "DELETE", params)
            popup(response.message, response.status)
            if(response.status == 1) {
                handleGetList();
            };
        })
    };
</script>

{#if tableFixed}
    {#each tableFixed as item}
        <tr>
            <td><button class="small fade"><i class="fa-solid fa-thumbtack"></i></button></td>
            <td 
                class="table-title"
                width="800"
                on:click={()=>{handleDetailNoticeVisible(item)}}
                on:keypress={()=>{handleDetailNoticeVisible(item)}}
            >
                {item["title"]}
            </td>
            {#if $levelStore <= 1}
                <td>{item["status"] == 0 ? "숨김" : "보임"}</td>
                <td>{item["isFixed"] == 0 ? "일반" : "고정"}</td>
                <td>
                    {#if item["targetLevel"] == 0} 
                        전체
                    {:else}
                        {#each adminLevel as level}
                            {#if level["level"] == item["targetLevel"]} 
                                <option value={level["level"]}>{level["levelName"]}</option>
                            {/if}
                        {/each}
                    {/if}
                </td>
                <td><button class="small red line" type="button" on:click={()=>{handleCreateNoticeVisible(item)}}>수정</button></td>
                <td><button class="small red" type="button" on:click={()=>{deleteAdminNotice(item["id"])}}>삭제</button></td>
            {/if}
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
{/if}
{#if tableList}
    {#each tableList as item, index}
        {#if item["targetLevel"] == 0 || item["targetLevel"] >= $levelStore }
            <tr>
                <td>{index+((currentPage-1)*limit)}</td>
                <td 
                    class="table-title"
                    width="800"
                    on:click={()=>{handleDetailNoticeVisible(item)}}
                    on:keypress={()=>{handleDetailNoticeVisible(item)}}
                >
                    {item["title"]}
                </td>
                {#if $levelStore <= 1}
                    <td>{item["status"] == 0 ? "숨김" : "보임"}</td>
                    <td>{item["isFixed"] == 0 ? "일반" : "고정"}</td>
                    <td>
                        {#if item["targetLevel"] == 99} 
                            전체
                        {:else}
                            {#each adminLevel as level}
                                {#if level["level"] == item["targetLevel"]} 
                                    <option value={level["level"]}>{level["levelName"]}</option>
                                {/if}
                            {/each}
                        {/if}
                    </td>
                    <td><button class="small red line" type="button" on:click={()=>{handleCreateNoticeVisible(item)}}>수정</button></td>
                    <td><button class="small red" type="button" on:click={()=>{deleteAdminNotice(item["id"])}}>삭제</button></td>
                {/if}
                <td>{dateFormat(item["createdAt"])}</td>
            </tr>
        {/if}
    {/each}
{/if}

<style lang="scss">
    .table-title {
        cursor: pointer;
    }
</style>