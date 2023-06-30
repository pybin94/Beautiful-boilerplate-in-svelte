<script lang="ts">
    import HistoryUserThirdpartyTable from "components/History/HistoryUserThirdpartyTable.svelte";
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
        "플레이어 아이디", 
        "게임사", 
        "게임", 
        "유저 머니", 
        "게임 머니", 
        "전체 머니", 
        "이동",
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

        const response = await got("/history/thirdparty", "POST", params);
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
        <HistoryUserThirdpartyTable {tableList} {currentPage} {limit} />
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>
