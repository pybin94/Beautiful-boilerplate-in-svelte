
<script lang="ts">
    import { dateFormat } from "utils/helpers";

    export let TableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
    export let ipType: number;
    export let handleDeleteIp: Function;

</script>

{#if TableList}
    {#each TableList as item, index}
        <tr>
            <td>{index+((currentPage-1)*limit)}</td>
            <td>{item["ip"]}</td>
            <td>{item["memo"] ? item["memo"] : "-"}</td>
            <td>{dateFormat(item["createdAt"])}</td>
            <td>
                <button 
                    class="small red"
                    on:click={()=>{handleDeleteIp(item["id"], ipType)}}
                >
                    삭제
                </button>
            </td>
        </tr>
    {/each}
{/if}