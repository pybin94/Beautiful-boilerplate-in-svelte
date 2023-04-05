<script lang="ts">
    import DropDown from "./Modal/DropDown.svelte";
    import { lightMode } from "stores/store";
    import { getCookie, setCookie } from "utils/helpers";
    import Modal from "utils/Modal.svelte";
    import Settings from "./Modal/Settings.svelte";

    export let sidebarVisible: boolean;
    export let toggleSidebarMobile: any;
    
    let toggleUserModal: boolean = false;
    let settingsVisible: boolean = false;
    let header: HTMLElement;

    const handleSettingsVisible = () => {
        settingsVisible = !settingsVisible

    }

    const toggleSignModal = (): void => {
        toggleUserModal = !toggleUserModal
    }

    const handleNightMode = ():void => {
        if (!getCookie("lightMode") || getCookie("lightMode") == "off") {
            setCookie("lightMode", "on")
            lightMode.update((value) => "on")
        } else {
            setCookie("lightMode", "off")
            lightMode.update((value) => "off")
        }
    }


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
        <div 
            class="night-mode {$lightMode == "on" ? "active" : ""}"
            on:click={handleNightMode}
            on:keypress={handleNightMode} 
        >
            <div class="night-mode__button"></div>
        </div>
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
        <DropDown {toggleSignModal} {handleSettingsVisible}/>
    {/if}
</header>

<Modal visible={settingsVisible} handleVisible={handleSettingsVisible} title={"설정 및 정보"}><Settings handleVisible={handleSettingsVisible} /></Modal>

<style lang="scss">
    @import "./Header.scss";
</style>
