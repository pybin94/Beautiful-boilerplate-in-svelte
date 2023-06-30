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
                {#if item["transactionType"] == 1}
                    <button class="small fade">지급</button>
                {:else if item["transactionType"] == 2}
                    <button class="small fade red">회수</button>
                {:else}
                    <button class="small fade green">전환</button>
                {/if}
            </td>
            <td>{moneyFormat(item["point"])}</td>
            <td>{moneyFormat(item["previousPoint"])}</td>
            <td>{moneyFormat(item["postPoint"])}</td>
            <td>{item["description"]}</td>
            <td>{item["memo"] ? item["memo"] : "-"}</td>
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
{/if}