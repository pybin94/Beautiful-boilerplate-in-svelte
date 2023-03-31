<script lang="ts">
    import DropDown from "./Modal/DropDown.svelte";
    import { onMount } from "svelte";
    import { nightMode } from "stores/store";
    import { getCookie } from "utils/helpers";

    export let sidebarVisible: boolean;
    export let toggleSidebarMobile: any;

    let toggleUserModal: boolean = false;
    let header: HTMLElement;
    let nightModeIcon: HTMLElement;

    const toggleSignModal = (): void => {
        // toggleUserModal === true ? toggleUserModal = false : toggleUserModal = true;
        toggleUserModal = !toggleUserModal
    }

    const handleNightMode = ():void => {
        nightMode.update((value) => !value)
        toggleNightMode()
    }

    const toggleNightMode = (): void => {
        if($nightMode == false) {
            nightModeIcon.classList.remove("fa-regular", "fa-sun");
            nightModeIcon.classList.add("fa-solid", "fa-moon");
        } else {
            nightModeIcon.classList.remove("fa-solid", "fa-moon");
            nightModeIcon.classList.add("fa-regular", "fa-sun");
        }
    }

    onMount(()=>{
        toggleNightMode()
    })

    $: if(header){
        sidebarVisible == true
        ? header.classList.remove("wide")
        : header.classList.add("wide");
    }

    let adminInfo = JSON.parse(getCookie("user"))
    
</script>

<header class="header" bind:this={header}>
    <div class="header__icons">
        <i 
            class="fa-solid fa-bars"
            on:click={toggleSidebarMobile}
            on:keypress={toggleSidebarMobile} 
        ></i>
        <i 
            bind:this={nightModeIcon} 
            on:click={handleNightMode} 
            on:keypress={handleNightMode} 
            class="fa-regular fa-sun"
        ></i>
    </div>
    <div class="header__sign">
        <p>{adminInfo["name"]}</p>
        <p>{adminInfo["identity"]}</p>
    </div>
    <i class="fa-solid fa-user header__profile-icon"
        on:click={toggleSignModal}
        on:keypress={toggleSignModal}
    ></i>
    {#if toggleUserModal}
        <DropDown {toggleSignModal} />
    {/if}
</header>

<style lang="scss">
    @import "./Header.scss";
</style>
