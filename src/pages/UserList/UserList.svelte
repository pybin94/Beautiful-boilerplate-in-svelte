<script lang="ts">
    import SearchForm from "components/UserList/SearchForm.svelte";
    import { userTableTitle } from "constants/userList";
    import { onMount } from "svelte";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";

    let currentPage: number = 1;
    let limit: number = 20;
    let searchValue: string;
    let tableList: Array<object>;
    let fullPage: number = 1;
    let offset: number = limit * currentPage-1;

    const searchFrom: [number, string] = [limit, searchValue]

    const init = () => {
        handleGetList();
    };

    const handleGetList = async (setPage: number = 1) => {

        currentPage = setPage;
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
<SearchForm {handleGetList} {searchFrom} />
<Table {tableList} tableTitle={userTableTitle} {currentPage} {limit} />
<Pagenation {handleGetList} {fullPage} {currentPage} />

<style lang="scss">
    @import "./UserList.scss";
</style>