<script lang="ts">
    import SearchForm from "components/AdminList/SearchFrom/SearchForm.svelte";
    import AdminListTable from "components/AdminList/AdminListTable/AdminListTable.svelte";
    import { adminTableTitle } from "constants/adminList";
    import { onMount } from "svelte";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let searchValue: string;
    let tableList: Array<object>;
    let authSort: number = null;
    let fullPage: number = 1;

    const searchFrom: [number, string, number] = [limit, searchValue, authSort]

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

    onMount(()=>{
        handleGetList()
    })

</script>
<SearchForm {handleGetList} {searchFrom} />
<AdminListTable {tableList} tableTitle={adminTableTitle} {currentPage} {limit} />
<Pagenation {handleGetList} {fullPage} {currentPage} />

<style lang="scss">
    @import "./AdminList.scss";
</style>