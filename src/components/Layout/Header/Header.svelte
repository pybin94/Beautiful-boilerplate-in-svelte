<script lang="ts">
    import { lightMode } from "stores/store";
    import { getCookie, moneyFormat, setCookie } from "utils/helpers";
    import { adminLevel } from "constants/admin";
    import { myInfo } from "constants/myInfo";
    import { balanceStore, balanceSiteStore, pointStore, levelStore } from "stores/myInfo.store";
    import SettingsModal from "./Modal/SettingsModal.svelte";
    import DropDown from "./Modal/DropDown.svelte";
    import Modal from "utils/Modal.svelte";
    import PointModal from "./Modal/PointModal.svelte";
    import MoneyModal from "./Modal/MoneyModal.svelte";

    export let sidebarVisible: boolean;
    export let toggleSidebarMobile: any;
    
    let toggleUserModal: boolean = false;
    let moneyVisible: boolean = false;
    let pointVisible: boolean = false;
    let settingsVisible: boolean = false;
    let header: HTMLElement;
    let balance: number;
    let balanceSite: number;
    let point: number;

    balanceStore.subscribe(value => {
        balance = value
    });

    balanceSiteStore.subscribe(value => {
        balanceSite = value
    });

    pointStore.subscribe(value => {
        point = value
    });

    const handleMoneyVisible = () => {
        moneyVisible = !moneyVisible
    }

    const handlePointVisible = () => {
        pointVisible = !pointVisible
    }

    const handleSettingsVisible = () => {
        settingsVisible = !settingsVisible
    }

    const toggleSignModal = (): void => {
        toggleUserModal = !toggleUserModal
    }

    const handleNightMode = ():void => {
        if (!getCookie("lightMode") || getCookie("lightMode") == "off") {
            setCookie("lightMode", "on")
            lightMode.update(() => "on")
        } else {
            setCookie("lightMode", "off")
            lightMode.update(() => "off")
        }
    }

    $: if(header){
        sidebarVisible == true
        ? header.classList.remove("wide")
        : header.classList.add("wide");
    }
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
    <div class="header__balance">
        <div 
            class="header__balance__content"
            on:click={$levelStore > 1 ? handleMoneyVisible : undefined}
            on:keydown={$levelStore  > 1 ? handleMoneyVisible : undefined}
        >
            <input type="text" disabled value={$levelStore  > 1 ? moneyFormat(balance) : moneyFormat(balanceSite)}>
            <button class="small" type="button">보유금</button>
        </div>
        {#if $levelStore  > 1}
        <div 
            class="header__balance__content"
            on:click={handlePointVisible}
            on:keydown={handlePointVisible}
        >
            <input type="text" disabled value={moneyFormat(point)}>
            <button class="small" type="button">포인트</button>
        </div>
        {/if}
    </div>
    <div class="header__sign">
        <p>{myInfo["nickname"]}</p>
        {#each adminLevel as item}
            {#if $levelStore  === item['level']}
                <p>{item['levelName']}</p>
            {/if}
        {/each}
    </div>
    <i class="fa-solid fa-user header__profile-icon"
        on:click={toggleSignModal}
        on:keypress={toggleSignModal}
    ></i>
    {#if toggleUserModal}
        <DropDown {toggleSignModal} {handleSettingsVisible}/>
    {/if}
</header>

<Modal visible={moneyVisible} handleVisible={handleMoneyVisible} title={"머니 입출금"}>
    <MoneyModal handleVisible={handleMoneyVisible} {balance}/>
</Modal>
<Modal visible={pointVisible} handleVisible={handlePointVisible} title={"포인트 전환"}>
    <PointModal handleVisible={handlePointVisible} {point}/>
</Modal>
<Modal visible={settingsVisible} handleVisible={handleSettingsVisible} title={"설정 및 정보"}>
    <SettingsModal handleVisible={handleSettingsVisible} />
</Modal>


<style lang="scss">
    @import "./Header.scss";
</style>