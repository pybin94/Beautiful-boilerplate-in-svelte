<script lang="ts">
    import TransactionAdminHistoryTable from "components/TransactionHistory/TransactionAdminHistoryTable.svelte";
    import { got, nowMax, nowMin } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import SearchForm from "utils/SearchForm/SearchForm.svelte";
    import Table from "utils/Table.svelte";;
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let searchValue: string;
    let tableList: Array<object>;
    let fullPage: number = 1;
    let startDate = nowMin();
    let endDate = nowMax();
    
    const searchForm: [number, string, Date, Date] = [limit, searchValue, startDate, endDate]

    const transactionTableTitle = [
        "번호",
        "소속",
        "에이전트 아이디", 
        "상태",
        "지급 금액",
        "지급 전 금액",
        "지급 후 금액",
        "예금주",
        "은행",
        "계좌번호",
        "연락처",
        "타입", 
        "메모", 
        "신청일",
        "처리시간",
    ];

    const init = (): void => {
        handleGetList()
    }

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

        const response = await got("/transaction/admin/history", "POST", params);
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
    
    <SearchForm {handleGetList} {searchForm} />
    <Table tableTitle={transactionTableTitle}>
        <TransactionAdminHistoryTable {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>
