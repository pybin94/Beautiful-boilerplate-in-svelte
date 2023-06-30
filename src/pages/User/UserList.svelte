<script lang="ts">
    import UserDetail from "components/UserList/Modal/UserDetail.svelte";
    import UserPayment from "components/UserList/Modal/UserPayment.svelte";
    import UserSearchForm from "components/UserList/UserSearchForm.svelte";
    import UserListTable from "components/UserList/UserListTable.svelte";
    import { userTableTitle } from "constants/user";
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
    let paymentVisible: boolean = false;
    let userInfo: object;

    const searchForm: [number, string] = [limit, searchValue]
    const init = () => {
        if(location.search) {
            currentUrl.set(window.location.pathname)
            searchForm[1] = decodeURI(location.search.replace("?", ""))
        }
        handleGetList();
    };

    const handleDetailVisible = (selectIndex?: object) => {
        if(selectIndex) userInfo = selectIndex;
        detailVisible = !detailVisible
    }

    const handlePaymentVisible = (selectIndex?: object) => {
        if(selectIndex) userInfo = selectIndex;
        paymentVisible = !paymentVisible;
    }

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        limit = searchForm[0];
        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
            status: 0,
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
    <UserSearchForm {handleGetList} {searchForm} />
    <Table tableTitle={userTableTitle} >
        <UserListTable {handleDetailVisible} {handlePaymentVisible} {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
    <Modal visible={detailVisible} handleVisible={handleDetailVisible} title={"플레이어 상세정보"} >
        <UserDetail {handleDetailVisible} {userInfo} {handleGetList}/>
    </Modal>
    <Modal visible={paymentVisible} handleVisible={handlePaymentVisible} title={"플레이어 수동지급"} >
        <UserPayment {handlePaymentVisible} {userInfo} {handleGetList}/>
    </Modal>
</div>
<style lang="scss">
    
    @import "./UserList.scss";
</style>