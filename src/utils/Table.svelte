<script lang="ts">
    import { userListTitle } from "constants/userList";

    export let tableList: Array<object>;
    export let currentPage: number;
    export let limit: number;
</script>

<div class="table">
    <table>
        <thead>
            <tr>
                {#each userListTitle as item}
                    <th>{item}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#if tableList}
                {#each tableList as item, index}
                    <tr>
                        <td>{index+((currentPage-1)*limit)}</td>
                        <td>{item["identity"]}</td>
                        <td>{item["user_name"]}</td>
                        <td>{item["set1"]}</td>
                        <td>{item["set2"]}</td>
                        <td>{item["set3"]}</td>
                        <td>{item["set4"]}</td>
                        <td>{item["created_at"]}</td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<style lang="scss">
    @import "../styles/table.scss";
</style>