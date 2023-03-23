<script lang="ts">
    import Header from "components/userCreate/Header/Header.svelte";
    import BasicInfo from "components/userCreate/BasicInfo/BasicInfo.svelte";
    import AdvencedInfo from "components/userCreate/AdvencedInfo/AdvencedInfo.svelte";
    import FullInfo from "components/userCreate/FullInfo/FullInfo.svelte";
    import Footer from "components/userCreate/Footer/Footer.svelte";
    import { createUserLevel } from "constants/userCreate";

    let identity: HTMLElement;
    let username: HTMLElement;
    let password: HTMLElement;
    let passwordConfirm: HTMLElement;

    const bindBasic = [identity, username, password, passwordConfirm]
    const bindAdvenced = [identity, username, password, passwordConfirm]
    let page: number = 1;

    const paging = (value: number):void => {
        if(value === 1) page++ ;    // next
        if(value === 0) page-- ;    // previous
        console.log(page)
    }

</script>
<div class="create-user">
    <div class="card create_user__form">
        <div class="card__header">
            <Header {page} />
        </div>
        <div class="card__body">
            <div class="create-user__title">
                <p>{createUserLevel[page-1]["title"]}</p>
                <p class="create-user__title__subtitle">
                    {createUserLevel[page-1]["subtitle"]}
                </p>
            </div>
            {#if page == 1}
                <BasicInfo {bindBasic} />
            {:else if page == 2}
                <AdvencedInfo {bindAdvenced}/>
            {:else}
                <FullInfo {bindBasic} {bindAdvenced} />
            {/if}
        </div>
        <div class="card__footer">
            <Footer {page} {paging}/>
        </div>
    </div>
</div>
<style lang="scss">
    @import "../../styles/card.scss";
    @import "./UserCreate.scss";
</style>