<script lang="ts">
    let subMenu: boolean = false;

    const handleSubMenu = () => {
        subMenu = !subMenu;
    };

    const subButtons = [
        {event: handleSubMenu(), icon: "fa-brands fa-internet-explorer"}, 
        {event: handleSubMenu(), icon: "fa-brands fa-docker"}, 
        {event: handleSubMenu(), icon: "fa-brands fa-github"},
    ]
    $: console.log(subMenu)
</script>

<div class="sub-menu">
    <div 
        class="sub-menu__main-button sub-menu__button {subMenu == true ? "active" : ""}"
        on:click={handleSubMenu}
        on:keypress={handleSubMenu}
    >
        <i class="fa-solid fa-xmark"></i>
    </div>
    {#each subButtons as item}
        <div 
            class="sub-menu__sub-button sub-menu__button {subMenu == true ? "active" : ""}"
            on:click={()=>{item.event}}
            on:keypress={()=>{item.event}}
        >
            <i class={item.icon}></i>
        </div>
    {/each}
</div>

<style lang="scss">
    @import "./SubMenu.scss";
</style>