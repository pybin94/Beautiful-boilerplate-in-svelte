<script lang="ts">
    import CreateAdminNotice from "components/NoticeAdmin/Modal/CreateAdminNotice.svelte";
    import DetailAdminNotice from "components/NoticeAdmin/Modal/DetailAdminNotice.svelte";
    import NoticeAdminTable from "components/NoticeAdmin/NoticeAdminTable.svelte";
    import { levelStore } from "stores/myInfo.store";
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
    let detailNoticeVisible: boolean = false;
    let targetItem: Array<[]> | undefined;
    
    const noticeTableTitle = [
        "번호",
        "제목", 
        "상태",
        "위치",
        "대상",
        "수정",
        "삭제",
        "작성일",
    ];

    const init = (): void => {
        handleGetList()
    }

    const handleCreateNoticeVisible = (target: Array<[]> | undefined = undefined) => {
        targetItem = target
        createNoticeVisible = !createNoticeVisible;
    }
    const handleDetailNoticeVisible = (target: Array<[]> | undefined = undefined) => {
        targetItem = target
        detailNoticeVisible = !detailNoticeVisible;
    }

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
        };

        const response = await got("/notice/admin", "POST", params);
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
            on:click={()=>{handleCreateNoticeVisible()}}
            class="button-wrap__create-notice"
        >에이전트 공지 추가</button>
    </div>
    <Table tableTitle={$levelStore <= 1 ? noticeTableTitle : ["번호", "제목", "작성일"]}>
        <NoticeAdminTable {handleGetList} {handleCreateNoticeVisible} {handleDetailNoticeVisible} {tableFixed} {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>

<Modal visible={createNoticeVisible} handleVisible={handleCreateNoticeVisible} title={"에이전트 공지"}>
    <CreateAdminNotice {handleGetList} {targetItem} handleVisible={handleCreateNoticeVisible} />
</Modal>

<Modal visible={detailNoticeVisible} handleVisible={handleDetailNoticeVisible} title={"에이전트 공지"}>
    <DetailAdminNotice {targetItem} />
</Modal>

<style lang="scss">
    @import "./NoticeAdmin.scss";
</style>