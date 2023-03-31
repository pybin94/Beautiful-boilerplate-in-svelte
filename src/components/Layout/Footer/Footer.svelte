<script lang="ts">
    export let sidebarVisible: boolean;
</script>

<footer class="footer {sidebarVisible === false ? "hide" : ""}">
    Copyright (c) <span>{process.env.SITENAME}</span> &amp; Unify, 2022
</footer>

<style lang="scss">
    @import "./Footer.scss";
</style>