<script lang="ts">
    import HistoryUserTransactionTable from "components/History/HistoryUserTransactionTable.svelte";
    import { got, nowMax, nowMin } from "utils/helpers";
    import SearchForm from "utils/SearchForm/SearchForm.svelte";
    import Pagenation from "utils/Pagenation.svelte";
    import { popup } from "utils/popup";
    import Table from "utils/Table.svelte";;
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let searchValue: string;
    let tableList: Array<object>;
    let fullPage: number = 1;
    let startDate = nowMin();
    let endDate = nowMax();
    
    const searchForm: [number, string, Date, Date] = [limit, searchValue, startDate, endDate];
    const historyTableTitle = [
        "번호",
        "지급 아이디",
        "대상 아이디", 
        "구분", 
        "지급 금액", 
        "지급 전 금액", 
        "지급 후 금액", 
        "타입", 
        "메모",
        "처리시간",
    ];
    
    const init = (): void => {
        handleGetList();
    };

    const handleGetList = async (setPage?: number) => {

        if(setPage) currentPage = setPage;

        limit = searchForm[0]
        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
            searchValue: searchForm[1],
            startDate: searchForm[2],
            endDate: searchForm[3],
        };

        const response = await got("/history/money/user", "POST", params);
        if(response.status == 1) {
            tableList = response.data.list;
            if(response.data.total !== 0) {
                fullPage = Math.ceil(response.data.total / limit);
            };
        } else {
            popup(response.message, response.status);
        };
    };

    init()

</script>

<div class="content">
    <SearchForm {handleGetList} {searchForm} />
    <Table tableTitle={historyTableTitle}>
        <HistoryUserTransactionTable {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>
