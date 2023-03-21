<script lang="ts">
    import Header from "components/Layout/Header/Header.svelte";
    import Sidebar from "components/Layout/Sidebar/Sidebar.svelte";
    import Breadcrumb from "components/Layout/Breadcrumb/Breadcrumb.svelte";
    import Footer from 'components/Layout/Footer/Footer.svelte';
    import { getCookie } from "utils/tools";
    import { onMount } from "svelte";
    import { currentMenu, menus } from "constants/layout";

    let sidebarVisible: boolean = true;
    let container: HTMLElement;
    let userInfo = getCookie("auth")

    const handleUrlParams = () => {
        currentMenu.url = window.location.pathname
        menus.forEach(item => {
            if(item.url == currentMenu.url) 
            currentMenu.title = item.title;
            currentMenu.subtitle = item.subTitle;
        });
    };

    window.onpopstate = () => {
        handleUrlParams();
    };

    const toggleSidebar = () => {
        sidebarVisible = !sidebarVisible;
        handelContainer();
    };

    const handelContainer = () => {
        if(!sidebarVisible) {
            container.classList.add("wide")
        } else {
            container.classList.remove("wide")
        }
    };

    onMount(()=>{
        handelContainer()
        handleUrlParams()
    });
    
</script>

<Sidebar {toggleSidebar} {sidebarVisible} {currentMenu} {handleUrlParams}/>
<div class="container" bind:this={container}>
    <Header {sidebarVisible}/>
    <div class="app-content">
        <Breadcrumb {currentMenu}/>
        <slot />
    </div>
    <Footer />
</div>

<style lang="scss">
    @import "./Layout.scss";
</style>