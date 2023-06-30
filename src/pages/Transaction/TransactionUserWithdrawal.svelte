<script lang="ts">
    import TransactionUserTable from "components/Transaction/TransactionUserTable.svelte";
    import { got } from "utils/helpers";
    import Pagenation from "utils/Pagenation.svelte";
    import Table from "utils/Table.svelte";;
    
    let currentPage: number = 1;
    let limit: number = 20;
    let offset: number = limit * currentPage-1;
    let tableList: Array<object>;
    let fullPage: number = 1;
    
    const transactionTableTitle = [
        "번호",
        "소속",
        "플레이어 아이디", 
        "상태",
        "출금 금액",
        "출금 전 금액",
        "출금 후 금액",
        "예금주",
        "은행",
        "계좌번호",
        "연락처",
        "타입", 
        "신청일",
    ];

    const init = (): void => {
        handleGetList()
    }

    const handleGetList = async (setPage?: number) => {
        
        if(setPage) currentPage = setPage;
        offset = limit * (currentPage-1);

        let params = {
            limit,
            offset,
        };

        const response = await got("/transaction/user/withdrawal", "POST", params);
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
    <Table tableTitle={transactionTableTitle}>
        <TransactionUserTable {tableList} {currentPage} {limit} {handleGetList}/>
    </Table>
    <Pagenation {handleGetList} {fullPage} {currentPage} />
</div>
