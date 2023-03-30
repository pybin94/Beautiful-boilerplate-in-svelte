<script lang="ts">
    import { onMount } from "svelte";
    import { link } from "svelte-routing"
    import { menus } from "constants/layout";
    import { currentUrl } from "stores/store";

    export let toggleSidebar: any;
    export let toggleSidebarMobile: any;
    export let handleUrlParams: any;
    export let sidebarVisible: boolean;
    export let sidebarVisibleMobile: boolean;

    let sidebar: HTMLElement;
    let sidebarWrap: HTMLElement;
    let hideIcon: HTMLElement;
    let menuLists: NodeListOf<Element>;
        
    onMount(()=>{
        menuLists = document.querySelectorAll(".sidebar__menu__list");
    })

    $: if(sidebar && menuLists){
        if(sidebarVisible == true) {
            sidebar.classList.remove("hide")
            hideIcon.classList.remove("fa-circle")
            hideIcon.classList.add("fa-circle-dot")
            menuLists.forEach(item => {
                item.classList.remove("hide")
            });

            sidebar.style.left = "0";
            sidebarWrap.classList.remove("visible");

        } else {
            sidebar.classList.add("hide");
            hideIcon.classList.add("fa-circle")
            hideIcon.classList.remove("fa-circle-dot")
            menuLists.forEach(item => {
                item.classList.add("hide")
            });
        }

        if(window.innerWidth <= 1200) {
            if(sidebarVisibleMobile == true) {
                sidebar.style.left = "0"
                sidebarWrap.classList.add("visible");
            } else {
                sidebar.style.left = "-235px";
                sidebarWrap.classList.remove("visible");
            }
        }
    };

</script>
<div 
    class="sidebar-wrap"
    bind:this={sidebarWrap}
></div>
<aside 
    class="sidebar"
    bind:this={sidebar}
>
    <div class="sidebar__header">
        <a href="/" class="sidebar__header__brand" use:link>
            <img class="sidebar__header__brand__logo" src="/src/assets/logo.png" alt="">
            <p class="sidebar__header__brand__text">{process.env.SITENAME}</p>
        </a>
        <i 
            on:click={toggleSidebarMobile} 
            on:keypress={toggleSidebarMobile}
            class="fa-solid fa-xmark"
        ></i>
        <i 
            bind:this={hideIcon}
            on:click={toggleSidebar} 
            on:keypress={toggleSidebar}
            class="fa-regular fa-circle-dot"
        ></i>
    </div>
    <ul class="sidebar__menu">
        {#each menus as item}
            {#if item.class == "truncate"}
                <li class="sidebar__menu__list {item.class}">
                    <a href={item.url} use:link>
                        <i class="{item.icon}"></i>
                        <p>{item.title}</p>
                    </a>
                </li>
            {:else}
                <li 
                    class="sidebar__menu__list {item.class} 
                    {$currentUrl == item.url 
                    ? (sidebarVisible == true ? "active" : "active hide") 
                    : (sidebarVisible == true ? "" : "hide")}"
                >
                    <a href={item.url} use:link on:click={handleUrlParams}>
                        <i class="{item.icon}"></i>
                        <p>{item.title}</p>
                    </a>
                </li>
            {/if}
        {/each}
    </ul>
</aside>

<style lang="scss">
    @import "./Sidebar.scss";
</style>