<script lang="ts">
    import AdminMessageSearchForm from "components/NoticeAdminMessage/AdminMessageSearchForm.svelte";
    import AdminMessageTemplate from "components/NoticeAdminMessage/Modal/AdminMessageTemplate.svelte";
    import CreateAdminMessage from "components/NoticeAdminMessage/Modal/CreateAdminMessage.svelte";
    import CreateAdminTemplate from "components/NoticeAdminMessage/Modal/CreateAdminTemplate.svelte";
    import DetailAdminMessage from "components/NoticeAdminMessage/Modal/DetailAdminMessage.svelte";
    import SearchAdmin from "components/NoticeAdminMessage/Modal/SearchAdmin.svelte";
    import NoticeAdminMessageTable from "components/NoticeAdminMessage/NoticeAdminMessageTable.svelte";
    import AdminCreate from "pages/Admin/AdminCreate.svelte";
    import { got } from "utils/helpers";
    import Modal from "utils/Modal.svelte";
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";;
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let tableList: Array<object>;
    let fullPage: number = 1;
    let direction: number = 2;

    let templateCurrentPage: number = 1;
    let templateLimit: number = 10;
    let templateTableList: Array<any>;
    let templateFullPage: number = 1;
    let templateOffset: number = limit * currentPage-1;

    let createMessageVisible: boolean = false;
    let detailMessageVisible: boolean = false;
    let searchAdminVisible: boolean = false;
    let templateVisible: boolean = false;
    let createTemplateVisible: boolean = false;
    let messageItem: Array<any> | undefined;
    let templateItem: Array<any> | undefined;
    let playerIndex: Array<number> = [];
    let playerList: Array<string> = [];
    let searchValue: string; 
    let searchCondition: number = 0;
    
    const adminMessageTableTitle = [
        "번호", "에이전트 아이디", "제목", "상태", "타입", "작성일",
    ];

    const searchForm: [number, number, string, number] = [limit, direction, searchValue, searchCondition]

    const init = (): void => {
        handleGetList()
    }

    const handleCreateMessageVisible = (target: Array<[]> | undefined = undefined) => {
        messageItem = target
        createMessageVisible = !createMessageVisible;
    }

    const handleDetailMessageVisible = (target: Array<[]> | undefined = undefined) => {
        messageItem = target
        detailMessageVisible = !detailMessageVisible;
    }
    
    const handleSearchAdminVisible = () => {
        searchAdminVisible = !searchAdminVisible;
    }

    const handleCreateTemplateVisible = (target: Array<[]> | undefined = undefined) => {
        templateItem = target
        createTemplateVisible = !createTemplateVisible;
    }
    
    const handleTemplateVisible = () => {
        templateVisible = !templateVisible;
    }
    
    const applyTemplate = (item: Array<[]>, target?: Array<any> | undefined) => {
        // target ? 답변 템플릿 : 일반 템플릿
        target
        ? messageItem["comments"] = item["contents"]
        : messageItem = item;
        
        handleTemplateVisible()
    };

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        limit = searchForm[0];
        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
            direction: searchForm[1],
            searchValue: searchForm[2],
            searchCondition: searchForm[3],
        };

        const response = await got("/notice/admin/message", "POST", params);
        if(response.status == 1) {
            tableList = response.data.list;
            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        };
    };

    const handleGetTemplateList = async (setPage?: number) => {
        if(setPage) templateCurrentPage = setPage;

        templateOffset = templateLimit * (templateCurrentPage-1);

        let params = {
            limit: templateLimit,
            offset: templateOffset,
        };

        const response = await got("/notice/admin/message/template", "POST", params);
        if(response.status == 1) {
            templateTableList = response.data.list;
            
            if(response.data.total !== 0) {
                templateFullPage = Math.ceil(response.data.total / templateLimit);
            };
        };
    }

    const selectAdmin = (setIndex: number, setIdentity: string) => {
        const index = playerIndex.indexOf(setIndex);
        if (index === -1) {
            playerIndex = [...playerIndex, setIndex];
            playerList = [...playerList, setIdentity];
        } else {
            playerIndex.splice(index, 1);
            playerList.splice(index, 1);
            playerIndex = [...playerIndex]
            playerList = [...playerList]
        }
    }

    init()
</script>

<div class="content">
    <AdminMessageSearchForm {handleCreateMessageVisible} {handleGetList} {searchForm} />
    <Table tableTitle={adminMessageTableTitle}>
        <NoticeAdminMessageTable 
            {handleGetList} 
            {handleDetailMessageVisible}
            {tableList} 
            {currentPage} 
            {limit} 
            {searchForm}
        />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>

<Modal visible={createMessageVisible} handleVisible={handleCreateMessageVisible} title={"에이전트 쪽지"}>
    <CreateAdminMessage 
        {playerList} 
        {playerIndex} 
        {handleGetList} 
        {messageItem} 
        handleVisible={handleCreateMessageVisible} 
        {handleSearchAdminVisible}
        {handleTemplateVisible}
    />
</Modal>

<Modal visible={detailMessageVisible} handleVisible={handleDetailMessageVisible} title={"에이전트 쪽지"}>
    <DetailAdminMessage {messageItem} {handleGetList} handleVisible={handleDetailMessageVisible} {searchForm} {handleTemplateVisible} />
</Modal>

<Modal visible={searchAdminVisible} handleVisible={handleSearchAdminVisible} title={"에이전트 검색"}>
    <SearchAdmin {playerIndex} {playerList} {selectAdmin} handleVisible={handleSearchAdminVisible} />
</Modal>

<Modal visible={templateVisible} handleVisible={handleTemplateVisible} title={"에이전트 템플릿"}>
    <AdminMessageTemplate 
        {handleGetTemplateList} 
        {handleCreateTemplateVisible} 
        {applyTemplate}
        currentPage={templateCurrentPage}
        limit={templateLimit}
        tableList={templateTableList}
        fullPage={templateFullPage}
        {messageItem}
    />
</Modal>

<Modal visible={createTemplateVisible} handleVisible={handleCreateTemplateVisible} title={"에이전트 템플릿 설정"}>
    <CreateAdminTemplate {templateItem} {handleGetTemplateList} handleVisible={handleCreateTemplateVisible} />
</Modal>

<style lang="scss">
</style>