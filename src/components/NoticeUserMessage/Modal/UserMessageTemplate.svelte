<script lang="ts">
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";
    import { dateFormat, got } from "utils/helpers";
    import { popup } from "utils/popup";

    export let handleCreateTemplateVisible: Function;
    export let applyTemplate: Function;
    export let currentPage: number;
    export let limit: number;
    export let tableList: Array<any>;
    export let fullPage: number;
    export let handleGetTemplateList: any;
    export let messageItem: Array<any>;

    const init = () => {
        handleGetTemplateList()
    }
    
    const deleteTemplate = (setId: number) => {
    
        let params = {
            id: setId,
        };

        popup("정말 삭제하시겠습니까?", 3, async (data: boolean) => {
            if(data === false) return; 

            const response = await got("/notice/user/message/template", "DELETE", params)
            popup(response.message, response.status)
            if(response.status == 1) {
                handleGetTemplateList()
            };
        })
    };

    init()
</script>

<form>
    <div class="form-body">
        <Table  tableTitle={["번호", "제목", "적용", "수정", "삭제", "생성일"]}>
            {#if tableList}
                {#each tableList as item, index}
                    <tr>
                        <td>{index+((currentPage-1)*limit)}</td>
                        <td width="600">{item["title"]}</td>
                        <td><button class="small line" type="button" on:click={()=>{applyTemplate(item, messageItem)}}>적용</button></td>
                        <td><button class="small red line" type="button" on:click={()=>{handleCreateTemplateVisible(item)}}>수정</button></td>
                        <td><button class="small red" type="button" on:click={()=>{deleteTemplate(item["id"])}}>삭제</button></td>
                        <td>{dateFormat(item["createdAt"])}</td>
                    </tr>
                {/each}
            {:else if !tableList || tableList.length == 0}
            <tr>
                <td colspan="6" class="form-body__text-center">데이터 없음</td>
            </tr>
            {/if}
        </Table>
        <Pagenation handleGetList={handleGetTemplateList} {fullPage} {currentPage} />
    </div>
    <div class="form-footer">
        <button 
            class="wide" 
            type="button"
            on:click={()=>{handleCreateTemplateVisible()}}
        >
            템플릿 생성
        </button>
    </div>
</form>


<style lang="scss">
    @import "../../../styles/form.scss";
</style>