<script lang="ts">
    import AdminListTable from "components/AdminList/AdminListTable.svelte";
    import { adminTableTitle } from "constants/admin";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import Modal from "utils/Modal.svelte";
    import AdminDetail from "components/AdminList/Modal/AdminDetail.svelte";;
    import Table from "utils/Table.svelte";
    import AdminSearchForm from "components/AdminList/AdminSearchForm.svelte";
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let searchValue: string;
    let tableList: Array<object>;
    let orderBy: number = null;
    let fullPage: number = 1;
    let visible: boolean = false;
    let adminInfo: object;

    const searchForm: [number, string, number] = [limit, searchValue, orderBy]

    const init = (): void => {
        handleGetList()
    }

    const handleVisible = (selectIndex?: object) => {
        if(selectIndex) adminInfo = selectIndex;
        visible = !visible
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

        const response = await got("/admin/admins", "POST", params);
        if(response.status == 1) {
            tableList = response.data.list;

            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        };
    };

    init()
</script>

<div class="content">
    <AdminSearchForm {handleGetList} {searchForm} />
    <Table tableTitle={adminTableTitle} {tableList}>
        <AdminListTable {tableList} {handleVisible} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
    <Modal {visible} {handleVisible} title={"관리자 상세정보"} >
        <AdminDetail {handleVisible} {adminInfo} {handleGetList}/>
    </Modal>
</div>

<style lang="scss">
    @import "./AdminList.scss";
</style>