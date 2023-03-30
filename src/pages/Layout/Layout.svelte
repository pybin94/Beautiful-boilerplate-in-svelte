<script lang="ts">
    import Header from "components/Layout/Header/Header.svelte";
    import Sidebar from "components/Layout/Sidebar/Sidebar.svelte";
    import Breadcrumb from "components/Layout/Breadcrumb/Breadcrumb.svelte";
    import Footer from 'components/Layout/Footer/Footer.svelte';
    import { onMount } from "svelte";
    import { currentMenu, menus } from "constants/layout";
    import { currentUrl } from "stores/store";

    let sidebarVisible: boolean = true;
    let sidebarVisibleMobile: boolean = false;
    let container: HTMLElement;

    export const handleUrlParams = () => {
        currentUrl.set(window.location.pathname)
        menus.forEach(item => {
            if(item.url == $currentUrl) {
            console.log(item.url == $currentUrl)
                currentMenu.title = item.title;
                currentMenu.subtitle = item.subTitle;
            }
        });
        sidebarVisibleMobile = false;
    };

    const toggleSidebar = () => {
        sidebarVisible = !sidebarVisible;
        handelContainer();
    };

    const toggleSidebarMobile = () => {
        sidebarVisibleMobile = !sidebarVisibleMobile;
    };

    const handelContainer = () => {
        if(!sidebarVisible) {
            container.classList.add("wide")
        } else {
            container.classList.remove("wide")
        }
    };

    window.onpopstate = () => {
        handleUrlParams();
    };

    window.addEventListener("resize", () => {
        if(window.innerWidth > 1200) {
            sidebarVisible = true
            sidebarVisibleMobile = true;
            container.classList.remove("wide")
        } else {
            sidebarVisible = true
            sidebarVisibleMobile = false;
        }
    })

    $: console.log(currentUrl)

    onMount(()=>{
        handelContainer()
        handleUrlParams()
    });

</script>

<Sidebar {toggleSidebar} {toggleSidebarMobile} {handleUrlParams} {sidebarVisible} {sidebarVisibleMobile} />
<div class="container" bind:this={container}>
    <Header {sidebarVisible} {toggleSidebarMobile}/>
    <main class="app-content">
        <Breadcrumb {currentMenu}/>
        <slot />
    </main>
    <Footer />
</div>

<style lang="scss">
    @import "./Layout.scss";
</style>