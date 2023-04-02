<script lang="ts">
    import { adminAuthLevel } from "constants/adminList";
    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
    export let handleVisible: Function;
</script>

{#if tableList}
    {#each tableList as item, index}
        <tr on:click={()=>{handleVisible(item)}}>
            <td>{index+((currentPage-1)*limit)}</td>
            <td>{item["identity"]}</td>
            <td>{item["user_name"]}</td>
            {#each adminAuthLevel as authItem}
                {#if item["auth"] === authItem["auth"]}
                    <td>{authItem["authName"]}</td>
                {/if}
            {/each}
            <td>{item["set1"] ? item["set1"] : "-"}</td>
            <td>{item["set2"] ? item["set2"] : "-"}</td>
            <td>{item["set3"] ? item["set3"] : "-"}</td>
            <td>{item["memo"] ? item["memo"] : "-"}</td>
            <td>{item["created_at"]}</td>
        </tr>
    {/each}
{/if}