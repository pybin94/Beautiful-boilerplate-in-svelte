<script lang="ts">
    import AdminSearchForm from "components/AdminList/AdminSearchForm.svelte";
    import AdminListTable from "components/AdminList/AdminListTable.svelte";
    import { adminTableTitle } from "constants/admin";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import Modal from "utils/Modal.svelte";
    import AdminDetail from "components/AdminList/Modal/AdminDetail.svelte";;
    import Table from "utils/Table.svelte";;
    import AdminSummary from "components/AdminList/AdminSummary.svelte";
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let searchValue: string;
    let tableList: Array<object>;
    let userList: Array<object>;
    let fullPage: number = 1;
    let detailVisible: boolean = false;
    let adminInfo: object;
    let orderBy: number = 0;

    const searchForm: [number, string, number] = [limit, searchValue, orderBy];

    const init = (): void => {
        handleGetList()
    }

    const handleDetailVisible = (selectIndex?: object) => {
        if(selectIndex) adminInfo = selectIndex;
        detailVisible = !detailVisible;
    }

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        limit = searchForm[0]
        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
            searchValue: searchForm[1],
            orderBy: searchForm[2],
        };

        const response = await got("/admin/block", "POST", params);

        if(response.status == 1) {
            tableList = response.data;
            userList = tableList["list"]
            response.data.total == 0
            ? fullPage = 1
            : fullPage = Math.ceil(response.data.total / limit);
        };
    };

    init()

</script>

<div class="content">
    <AdminSummary adminData={tableList} />
    <AdminSearchForm {handleGetList} {searchForm} />
    <Table tableTitle={adminTableTitle} tableList={userList}>
        <AdminListTable tableList={userList} handleVisible={handleDetailVisible} {currentPage} {limit}/>
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
    <Modal visible={detailVisible} handleVisible={handleDetailVisible} title={"에이전트 상세정보"}>
        <AdminDetail handleVisible={handleDetailVisible} {adminInfo} {handleGetList}/>
    </Modal>
</div>

<style lang="scss">
    @import "./AdminList.scss";
</style>