<script lang="ts">
    import AdminSearchForm from "components/AdminList/AdminSearchForm.svelte";
    import AdminListTable from "components/AdminList/AdminListTable.svelte";
    import { adminTableTitle } from "constants/admin";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import Modal from "utils/Modal.svelte";
    import AdminDetail from "components/AdminList/Modal/AdminDetail.svelte";;
    import Table from "utils/Table.svelte";;
    import AdminPayment from "components/AdminList/Modal/AdminPayment.svelte";
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let searchValue: string;
    let tableList: Array<object>;
    let level: number = null;
    let fullPage: number = 1;
    let detailVisible: boolean = false;
    let paymentVisible: boolean = false;
    let adminInfo: object;

    const searchForm: [number, string, number] = [limit, searchValue, level]

    const init = (): void => {
        handleGetList()
    }

    const handleDetailVisible = (selectIndex?: object) => {
        if(selectIndex) adminInfo = selectIndex;
        detailVisible = !detailVisible;
    }

    const handlePaymentVisible = (selectIndex?: object) => {
        if(selectIndex) adminInfo = selectIndex;
        paymentVisible = !paymentVisible;
    }

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        limit = searchForm[0]
        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
        };

        if(searchForm[1]) {
            params["searchValue"] = searchForm[1];
        };

        if(searchForm[2]) {
            params["level"] = searchForm[2];
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

<div class="content">
    <AdminSearchForm {handleGetList} {searchForm} />
    <Table tableTitle={adminTableTitle}>
        <AdminListTable {tableList} {handlePaymentVisible} {handleDetailVisible} {currentPage} {limit}/>
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
    <Modal visible={detailVisible} handleVisible={handleDetailVisible} title={"에이전트 상세정보"} >
        <AdminDetail {handleDetailVisible} {adminInfo} {handleGetList}/>
    </Modal>
    <Modal visible={paymentVisible} handleVisible={handlePaymentVisible} title={"에이전트 수동지급"} >
        <AdminPayment {handlePaymentVisible} {adminInfo} {handleGetList}/>
    </Modal>
</div>

<style lang="scss">
    @import "./AdminList.scss";
</style>