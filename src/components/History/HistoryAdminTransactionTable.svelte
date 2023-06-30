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
                {#if item["fromId"]}
                    {item["fromId"]["identity"]}
                    {#each adminLevel as level}
                        {#if level["level"] == item["fromId"]["level"]}
                            ({level["levelName"]})
                        {/if}
                    {/each}
                {:else}
                    관리자
                {/if}
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
            {:else}
                <td>{item["toUserId"]["identity"]} (플레이어)</td>
            {/if}
            <td>
                {#if item["transactionType"] == 2
                    || item["transactionType"] == 4
                    || item["transactionType"] == 6
                    || item["transactionType"] == 8
                }
                    <button class="small fade red">회수</button>
                {:else}
                    <button class="small fade">지급</button>
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