<script lang="ts">
    import Header from "components/Layout/Header.svelte";
    import Footer from 'components/Layout/Footer.svelte';
    import Sidebar from "components/Layout/Sidebar.svelte";
    import { getCookie } from "lib/tools";

    let sidebarVisible: boolean = true;
    let container: HTMLDivElement;

    const toggleSidebar = () => {
        sidebarVisible = !sidebarVisible;
        container.classList.toggle("hide")
        
        console.log(sidebarVisible)
    }
    let userInfo = getCookie("auth")
    console.log(userInfo)
</script>

<Sidebar {toggleSidebar} />
<div class="container" bind:this={container}>
    <Header />
    <div class="app-content">
        <slot />
    </div>
    <Footer />
</div>

<style lang="scss">
    @import "./Layout.scss";
</style>