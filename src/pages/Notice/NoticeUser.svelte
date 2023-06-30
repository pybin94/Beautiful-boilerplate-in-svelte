<script lang="ts">
    import CreateUserNotice from "components/NoticeUser/Modal/CreateUserNotice.svelte";
    import DetailUserNotice from "components/NoticeUser/Modal/DetailUserNotice.svelte";
    import NoticeUserTable from "components/NoticeUser/NoticeUserTable.svelte";
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
        "타입",
        "위치",
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

        const response = await got("/notice/user", "POST", params);
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
        >플레이어 공지 추가</button>
    </div>
    <Table tableTitle={$levelStore <= 1 ? noticeTableTitle : ["번호", "제목", "작성일"]}>
        <NoticeUserTable {handleGetList} {handleCreateNoticeVisible} {handleDetailNoticeVisible} {tableList} {tableFixed} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>

<Modal visible={createNoticeVisible} handleVisible={handleCreateNoticeVisible} title={"플레이어 공지"}>
    <CreateUserNotice {handleGetList} {targetItem} handleVisible={handleCreateNoticeVisible} />
</Modal>

<Modal visible={detailNoticeVisible} handleVisible={handleDetailNoticeVisible} title={"플레이어 공지"}>
    <DetailUserNotice {targetItem} />
</Modal>

<style lang="scss">
    @import "./NoticeUser.scss";
</style>