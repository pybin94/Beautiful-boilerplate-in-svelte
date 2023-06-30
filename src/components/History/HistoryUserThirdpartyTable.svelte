<script lang="ts">
    import { dateFormat, moneyFormat } from "utils/helpers";
    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
</script>

{#if tableList}
    {#each tableList as item, index}
        <tr>
            <td>{index+((currentPage-1)*limit)}</td>
            <td>
                {item["userId"]["identity"]}&nbsp;({item["userId"]["nickname"]})
            </td>
            <td>{ item["type"] == 1 ? item["providerThirdpartyId"]["name"] : "게임사 머니 회수" }</td>
            <td>
                { item["type"] == 1 ? item["providerThirdpartyGameName"] : "-"}
            </td>
            <td>{moneyFormat(item["userBalance"])}</td>
            <td>{moneyFormat(item["providerBalance"])}</td>
            <td>{moneyFormat(item["totalBalance"])}</td>
            <td>
                {#if item["type"] == 1}
                    <button class="small fade green">지급</button>
                {:else}
                    <button class="small fade">회수</button>
                {/if}
            </td>
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
{/if}