<script lang="ts">
    import { signout } from "services/sign";
    import { link } from "svelte-routing";

    const dorpDownMenus = [
        {title: "설정 및 정보", link: "user/setting", icon: "fa-solid fa-screwdriver-wrench"},
    ];

</script>

<div class="drop-down">
    <ul class="drop-down__menu">
        {#each dorpDownMenus as item}
        <li class="drop-down__menu__list">
            <a href={item.link} use:link>
                <i class="{item.icon}"></i>
                <span>{item.title}</span>
            </a>
        </li>
        <div class="drop-down__menu__hr"></div>
        {/each}
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