<script lang="ts">
    import UserDetail from "components/UserList/Modal/UserDetail.svelte";
    import UserListTable from "components/UserList/UserListTable.svelte";
    import UserSearchForm from "components/UserList/UserSearchForm.svelte";
    import { userTableTitle } from "constants/userList";
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
    let visible: boolean = false;
    let userInfo: object;

    const searchFrom: [number, string] = [limit, searchValue]

    const init = () => {
        handleGetList();
    };

    const handleVisible = (selectIndex?: object) => {
        if(selectIndex) userInfo = selectIndex;
        visible = !visible
    }

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        limit = searchFrom[0];
        offset = limit * (currentPage-1);

        let params = {
            limit: searchFrom[0],
            offset,
        };

        if(searchFrom[1]) {
            params["searchValue"] = searchFrom[1];
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
    <UserSearchForm {handleGetList} {searchFrom} />
    <Table tableTitle={userTableTitle} {tableList}>
        <UserListTable {handleVisible} {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
    <Modal {visible} {handleVisible} title={"유저 상세정보"} >
        <UserDetail {handleVisible} {userInfo} {handleGetList}/>
    </Modal>
</div>
<style lang="scss">
    
    @import "./UserList.scss";
</style>