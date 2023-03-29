<script lang="ts">
    import Header from "components/AdminCreate/Header/Header.svelte";
    import BasicInfo from "components/AdminCreate/BasicInfo/BasicInfo.svelte";
    import AdvencedInfo from "components/AdminCreate/AdvencedInfo/AdvencedInfo.svelte";
    import FullInfo from "components/AdminCreate/FullInfo/FullInfo.svelte";
    import Footer from "components/AdminCreate/Footer/Footer.svelte";
    import { createAdminLevel } from "constants/adminCreate";

    let identity: HTMLInputElement;
    let username: HTMLInputElement;
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;
    let set1: HTMLInputElement;
    let set2: HTMLInputElement;
    let memo: HTMLInputElement;
    let adminAuth: HTMLSelectElement;

    const bindBasic = [identity, username, password, passwordConfirm];
    const bindAdvenced = [set1, set2, memo];
    
    let page: number = 1;

    const paging = (value: number):void => {
        if(value === 1) page++ ;    // next
        if(value === 0) page-- ;    // previous
    }

</script>
<div class="create-user">
    <div class="card create_user__form">
        <div class="card__header">
            <Header {page} />
        </div>
        <div class="card__body">
            <div class="create-user__title">
                <p>{createAdminLevel[page-1]["title"]}</p>
                <p class="create-user__title__subtitle">
                    {createAdminLevel[page-1]["subtitle"]}
                </p>
            </div>
            {#if page == 1}
                <BasicInfo {bindBasic} />
            {:else if page == 2}
                <AdvencedInfo {adminAuth} {bindAdvenced}/>
            {:else}
                <FullInfo {adminAuth} {bindBasic} {bindAdvenced} />
            {/if}
        </div>
        <div class="card__footer">
            <Footer {page} {paging} {bindBasic} {adminAuth} {bindAdvenced} />
        </div>
    </div>
</div>
<style lang="scss">
    @import "../../styles/card.scss";
    @import "./adminCreate.scss";
</style>