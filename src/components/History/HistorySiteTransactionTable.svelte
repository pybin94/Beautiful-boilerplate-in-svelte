<script lang="ts">
    import { adminLevel } from "constants/admin";
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
                관리자
            </td>
            {#if item["toAdminId"]}
                <td>
                    {item["toAdminId"]["identity"]}
                    {#each adminLevel as level}
                        {#if level["level"] == item["toAdminId"]["level"]}
                            ({level["levelName"]})
                        {/if}
                    {/each}
                </td>
            {:else if item["toUserId"]}
                <td>{item["toUserId"]["identity"]} (플레이어)</td>
            {:else}
                <td>-</td>
            {/if}
            <td>
                {#if item["transactionType"] == 2}
                    <button class="small fade red">지급</button>
                {:else}
                    <button class="small fade">회수</button>
                {/if}
            </td>
            <td>{moneyFormat(item["money"])}</td>
            <td>{moneyFormat(item["previousBalance"])}</td>
            <td>{moneyFormat(item["postBalance"])}</td>
            <td>{item["description"]}</td>
            <td>{item["memo"] ? item["memo"] : "-"}</td>
            <td>{dateFormat(item["createdAt"])}</td>
        </tr>
    {/each}
{/if}