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
                {#if item["fromId"]}
                    {item["fromId"]["identity"]}
                {:else}
                    관리자
                {/if}
            </td>
            <td>{item["toId"]["identity"]}&nbsp;({item["toId"]["nickname"]})</td>
            <td>
                {#if item["transactionType"] == 1 
                    || item["transactionType"] == 3 
                    || item["transactionType"] == 5
                }
                    <button class="small fade">지급</button>
                {:else}
                    <button class="small fade red">회수</button>
                {/if}
            </td>
            <td>{moneyFormat(item["money"])}</td>
            <td>{moneyFormat(item["previousBalance"])}</td>
            <td>{moneyFormat(item["postBalance"])}</td>
            <td>{item["description"]}</td>
            <td>{item["memo"] ? item["memo"] : "-"}</td>
            <td>{dateFormat(item["updatedAt"])}</td>
        </tr>
    {/each}
{/if}