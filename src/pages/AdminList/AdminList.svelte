<script lang="ts">
    import SearchForm from "components/UserList/SearchForm.svelte";
    import { onMount } from "svelte";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";

    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let findData: string;
    let tableList: Array<object>;
    let fullPage: number = 1;

    const handleGetList = async (setPage: number = 1) => {

        currentPage = setPage;
        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
        };
        if(findData) {
            params["findData"] = findData;
        };

        const response = await got("/admin/admins", "POST", params);

        if(response.status == 1) {
            tableList = response.data.list;

            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit)
            };
        };
    };

    onMount(()=>{
        handleGetList()
    })

</script>
<SearchForm {handleGetList} {limit} {findData} />
<Table {tableList} {currentPage} {limit} />
<Pagenation {handleGetList} {fullPage} {currentPage} />

<style lang="scss">
    @import "./AdminList.scss";
</style>