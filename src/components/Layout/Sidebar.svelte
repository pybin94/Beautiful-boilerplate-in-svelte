<script lang="ts">
    import { link } from "svelte-routing"
    import { got } from "lib/tools";

    export let toggleSidebar: any;

    // let toggleSidebarIcon: HTMLDivElement;

</script>
  
<aside class="sidebar">
    <div class="sidebar__header">
        <a href="/" class="sidebar__header__brand" use:link>
            <img class="sidebar__header__brand__logo" src="/src/assets/logo.png" alt="">
            <p class="sidebar__header__brand__text">{process.env.SITENAME}</p>
        </a>
        <i 
            on:click={toggleSidebar} 
            on:keydown={toggleSidebar}
            class="fa-regular fa-circle-dot"
        ></i>
        <!-- <i class="fa-regular fa-circle"></i> -->
    </div>
</aside>

<style lang="scss">
    @import "./Sidebar.scss";
</style>