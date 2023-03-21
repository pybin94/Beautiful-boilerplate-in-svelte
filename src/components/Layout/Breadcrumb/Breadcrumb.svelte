<script lang="ts">
    import type { CurrentMenu } from "interfaces/layout";
    import { link } from "svelte-routing";
    export let currentMenu: CurrentMenu;
</script>

<div class="breadcrumb">
    <h2 class="breadcrumb__title">{currentMenu.title}</h2>
    <a class="breadcrumb__home-icon" href="/" use:link>
        <i class="fa-solid fa-house "></i>
    </a>
    <span class="breadcrumb__division"><i class="fa-solid fa-angle-right"></i></span>
    <p class="breadcrumb__subtitle">
        {currentMenu.subtitle}
    </p>
</div>

<style lang="scss">
    @import "./Breadcrumb.scss";
</style>