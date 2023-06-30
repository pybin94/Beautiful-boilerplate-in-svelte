<script lang="ts">
    import CreatePopupNotice from "components/NoticePopup/Modal/CreatePopupNotice.svelte";
    import NoticePopupTable from "components/NoticePopup/NoticePopupTable.svelte";
    import { got } from "utils/helpers";
    import Modal from "utils/Modal.svelte";
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";;
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let tableFixed: Array<object>;
    let tableList: Array<object>;
    let fullPage: number = 1;
    let createNoticeVisible: boolean = false;
    let targetItem: Array<[]> | undefined;
    
    const popupTableTitle = [
        "번호",
        "제목", 
        "상태",
        "정렬",
        "권한",
        "수정",
        "삭제",
        "작성일",
    ];

    const init = (): void => {
        handleGetList()
    }

    const handleCreatePopupVisible = (target: Array<[]> | undefined = undefined) => {
        targetItem = target
        createNoticeVisible = !createNoticeVisible;
    }

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
        };

        const response = await got("/notice/popup", "POST", params);
        if(response.status == 1) {
            tableFixed = response.data.fixed;
            tableList = response.data.list;

            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        };
    };

    init()
</script>

<div class="content">
    <div class="button-wrap">
        <button 
            on:click={()=>{handleCreatePopupVisible()}}
            class="button-wrap__create-notice"
        >팝업 추가</button>
    </div>
    <Table tableTitle={popupTableTitle}>
        <NoticePopupTable {handleGetList} {handleCreatePopupVisible} {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>

<Modal visible={createNoticeVisible} handleVisible={handleCreatePopupVisible} title={"팝업"}>
    <CreatePopupNotice {handleGetList} {targetItem} handleVisible={handleCreatePopupVisible} />
</Modal>

<style lang="scss">
    @import "./NoticePopup.scss";
</style>