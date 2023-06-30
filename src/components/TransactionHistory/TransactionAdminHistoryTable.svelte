<script lang="ts">
    import { adminLevel } from "constants/admin";
    import { handleAdminTop, handleGetTopList } from "services/admin";
    import { dateFormat, moneyFormat } from "utils/helpers";
    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;

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
                        handleAdminTop(e, item["fromId"]["topId"]["id"])
                    }}
                >
                    <div class="admin-top__popover"></div>
                    {item["fromId"]["topId"]["identity"]}
                </button>
            </td>
            <td>
                {item["fromId"]["identity"]}
                {#each adminLevel as level}
                    {#if level["level"] == item["fromId"]["level"]}
                        ({level["levelName"]})
                    {/if}
                {/each}
            </td>
            <td>
                {#if item["status"] == 0}
                    <button class="small fade red">취소</button>
                {:else}
                    <button class="small fade ">완료</button>
                {/if}
            </td>
            <td>{moneyFormat(item["money"])}</td>
            <td>{moneyFormat(item["previousBalance"])}</td>
            <td>{moneyFormat(item["postBalance"])}</td>
            <td>{item["fromId"]["accountHolder"]}</td>
            <td>{item["fromId"]["bank"]}</td>
            <td>{item["fromId"]["accountNumber"]}</td>
            <td>{item["fromId"]["phoneNumber"]}</td>
            <td>{item["description"]}</td>
            <td>{item["memo"] ? item["memo"] : "-"}</td>
            <td>{dateFormat(item["createdAt"])}</td>
            <td>{dateFormat(item["updatedAt"])}</td>
        </tr>
    {/each}
{/if}

<style lang="scss">
    @import "../../styles/adminTopPopup.scss";
</style>