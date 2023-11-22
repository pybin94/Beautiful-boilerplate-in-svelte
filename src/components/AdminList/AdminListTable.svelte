<script lang="ts">
    import { dateFormat } from "utils/helpers";

    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
    export let handleVisible: Function;
</script>

{#each tableList as item, index}
    <tr on:click={()=>{handleVisible(item)}}>
        <td>{index+((currentPage-1)*limit)}</td>
        <td>{item["identity"]}</td>
        <td>{item["set1"] ? item["set1"] : "-"}</td>
        <td>{item["set2"] ? item["set2"] : "-"}</td>
        <td>{item["memo"] ? item["memo"] : "-"}</td>
        <td>{dateFormat(item["createdAt"])}</td>
    </tr>
{/each}
