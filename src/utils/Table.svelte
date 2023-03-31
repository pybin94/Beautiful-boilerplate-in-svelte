<script lang="ts">
    export let tableTitle: Array<string>;
</script>

<div class="table">
    <table>
        <thead>
            <tr>
                {#each tableTitle as item}
                    <th>{item}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            <slot />
        </tbody>
    </table>
</div>

<style lang="scss">
    @import "../styles/table.scss";
</style>