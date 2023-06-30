<script lang="ts">
    import { adminLevel } from "constants/admin";
    import { handleAdminTop, handleGetTopList } from "services/admin";
    import { dateFormat, moneyFormat } from "utils/helpers";
    import { navigate } from 'svelte-routing';

    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
    export let handlePaymentVisible: Function;
    export let handleDetailVisible: Function;

    const handleDirectInquiry = (adminInfo: string) => {
        navigate(`/user/list?${adminInfo}`, { replace: false });   
    };
</script>

{#if tableList}
    {#each tableList as item, index}
        <tr>
            <td>{index+((currentPage-1)*limit)}</td>
            <td>
                <button 
                    class="small fade admin-top"
                    on:click={(e)=>{
                        handleAdminTop(e, item["topId"]["id"])
                    }}
                >
                    <div class="admin-top__popover"></div>
                    {item["topId"]["identity"]}
                </button>
            </td>
            <td>{item["identity"]}</td>
            <td>{item["nickname"]}</td>
            {#each adminLevel as level}
                {#if item["level"] === level["level"]}
                    <td>{level["levelName"]}</td>
                {/if}
            {/each}
            <td>{moneyFormat(item["balance"])}</td>
            <td>{moneyFormat(item["point"])}</td>
            <td><button class="small" on:click={()=>{handlePaymentVisible(item)}}>지급</button></td>
            <td><button class="small line" on:click={()=>{handleDirectInquiry(item["identity"])}}>확인</button></td>
            <td><button class="small red line" on:click={()=>{handleDetailVisible(item)}}>수정</button></td>
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
{/if}

<style lang="scss">
    @import "../../styles/adminTopPopup.scss";
</style>