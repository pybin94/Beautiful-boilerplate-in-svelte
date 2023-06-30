<script lang="ts">
    import UserDetail from "components/UserNew/Modal/UserDetail.svelte";
    import UserNewSearchForm from "components/UserNew/UserNewSearchForm.svelte";
    import UserNewTable from "components/UserNew/UserNewTable.svelte";
    import { userNewTableTitle } from "constants/user";
    import { currentUrl } from "stores/store";
    import { got } from "utils/helpers";
    import Modal from "utils/Modal.svelte";
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";

    let currentPage: number = 1;
    let limit: number = 20;
    let searchValue: string;
    let tableList: Array<object>;
    let fullPage: number = 1;
    let offset: number = limit * currentPage-1;
    let detailVisible: boolean = false;
    let userInfo: object;
    let status: boolean | number = true;

    const searchForm: [number, string, boolean | number] = [limit, searchValue, status]
    const init = () => {
        if(location.search) {
            currentUrl.set(window.location.pathname)
            searchForm[1] = decodeURI(location.search.replace("?", ""))
        }
        handleGetList();
    };

    const handleDetailVisible = (selectIndex?: object) => {
        if(selectIndex) userInfo = selectIndex;
        detailVisible = !detailVisible;
    }

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        limit = searchForm[0];
        offset = limit * (currentPage-1);
        
        let params = {
            limit,
            offset,
            status: searchForm[2]
        };

        if(searchForm[1]) {
            params["searchValue"] = searchForm[1];
        };

        const response = await got("/user/users", "POST", params);

        if(response.status == 1) {
            tableList = response.data.list;

            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        };
    };

    init();
</script>
<div class="content">
    <UserNewSearchForm {handleGetList} {searchForm} />
    <Table tableTitle={userNewTableTitle} >
        <UserNewTable {handleDetailVisible} {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
    <Modal visible={detailVisible} handleVisible={handleDetailVisible} title={"플레이어 설정"} >
        <UserDetail {handleDetailVisible} {userInfo} {handleGetList}/>
    </Modal>
</div>
<style lang="scss">
    
    @import "./UserNew.scss";
</style>