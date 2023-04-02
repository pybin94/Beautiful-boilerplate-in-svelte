<script lang="ts">
    import { signout } from "services/sign";
    import { link } from "svelte-routing";
    export let toggleSignModal: Function;
    export let handleSettingsVisible: Function;

    const dorpDownMenus = [
        {title: "설정 및 정보", link: "/user/list", icon: "fa-solid fa-screwdriver-wrench"},
    ];

    const settings = () => {
        toggleSignModal();
        handleSettingsVisible();
    }

</script>

<div class="drop-down">
    <ul class="drop-down__menu">
        <li class="drop-down__menu__list">
            <a 
                href={"#"} use:link
                on:click={settings}
            >
                <i class="fa-solid fa-screwdriver-wrench"></i>
                <span>설정 및 정보</span>
            </a>
        </li>
        <div class="drop-down__menu__hr"></div>
        <li class="drop-down__menu__list">
            <a 
                href={"#"}
                on:click={signout}
            >
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>{"로그아웃"}</span>
            </a>
        </li>
    </ul>
</div>
<style lang="scss">
    @import "../../../../styles/animation.scss";
    @import "./DropDown.scss";
</style>