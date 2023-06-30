
<script lang="ts">
    import Modal from "utils/Modal.svelte";
    import { dateFormat, moneyFormat } from "utils/helpers";
    import TransactionUserDetailModal from "./Modal/TransactionUserDetailModal.svelte";
    import { handleAdminTop, handleGetTopList } from "services/admin";
    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
    export let handleGetList: Function;

    let transactionInfo: object;
    let trasactionDetailVisible: boolean = false;

    let handleVisible = () => {
        trasactionDetailVisible = !trasactionDetailVisible;
    }

    const handleTransactionStatus = (item: object) => {
        transactionInfo = item
        handleVisible()
    }

</script>

{#if tableList}
    {#each tableList as item, index}
        <tr on:click={()=>{handleTransactionStatus(item)}}>
            <td>{index+((currentPage-1)*limit)}</td>
            <td>
                <button 
                    class="small fade admin-top"
                    on:click={(e)=>{
                        handleAdminTop(e, item["toId"]["topId"]["id"])
                    }}
                >
                    <div class="admin-top__popover"></div>
                    {item["toId"]["topId"]["identity"]}
                </button>
            </td>
            <td>
                {item["toId"]["identity"]}
            </td>
            <td>
                {#if item["status"] == 1}
                    <button class="small fade red">신청</button>
                {:else}
                    <button class="small fade ">대기</button>
                {/if}
            </td>
            <td>{moneyFormat(item["money"])}</td>
            <td>{moneyFormat(item["previousBalance"])}</td>
            <td>{moneyFormat(item["postBalance"])}</td>
            <td>{item["toId"]["accountHolder"]}</td>
            <td>{item["toId"]["bank"]}</td>
            <td>{item["toId"]["accountNumber"]}</td>
            <td>{item["toId"]["phoneNumber"]}</td>
            <td>{item["description"]}</td>
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
    
    <Modal visible={trasactionDetailVisible} handleVisible={handleVisible} title={"상태 설정"} >
        <TransactionUserDetailModal {handleVisible} {transactionInfo} {handleGetList}/>
    </Modal>
{/if}

<style lang="scss">
    @import "../../styles/adminTopPopup.scss";
</style>