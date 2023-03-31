<script lang="ts">
    import SearchForm from "components/AdminList/SearchForm.svelte";
    import AdminListTable from "components/AdminList/AdminListTable/AdminListTable.svelte";
    import { adminTableTitle } from "constants/adminList";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import Modal from "utils/Modal.svelte";
    import AdminDetailBody from "components/AdminList/Modal/AdminDetailBody.svelte";
    import AdminDetailFooter from "components/AdminList/Modal/AdminDetailFooter.svelte";
    import Table from "utils/Table.svelte";;
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let searchValue: string;
    let tableList: Array<object>;
    let authSort: number = null;
    let fullPage: number = 1;

    let visible: boolean = false;
    let tableIndex: number;

    const searchFrom: [number, string, number] = [limit, searchValue, authSort]

    const init = (): void => {
        handleGetList()
    }

    const handleVisible = (index: number) => {
        tableIndex = index
        visible = !visible
    }

    const handleGetList = async (setPage: number = 1) => {

        currentPage = setPage;
        limit = searchFrom[0]
        offset = limit * (currentPage-1);

        let params = {
            limit: searchFrom[0],
            offset,
        };

        if(searchFrom[1]) {
            params["searchValue"] = searchFrom[1];
        };

        if(searchFrom[2]) {
            params["authSort"] = searchFrom[2];
        }

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

<SearchForm {handleGetList} {searchFrom} />
<Table tableTitle={adminTableTitle}>
    <AdminListTable {tableList} {handleVisible} {currentPage} {limit} />
</Table>
<Pagenation {handleGetList} {fullPage} {currentPage} />
<Modal {visible} {handleVisible} title={"관리자 상세정보"} >
    <AdminDetailBody {tableIndex} slot="body" />
    <AdminDetailFooter slot="footer" />
</Modal>
<style lang="scss">
    @import "./AdminList.scss";
</style>