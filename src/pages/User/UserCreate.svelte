<script lang="ts">
    import Header from "components/UserCreate/Layout/Header.svelte";
    import BasicInfo from "components/UserCreate/BasicInfo.svelte";
    import AdvencedInfo from "components/UserCreate/AdvencedInfo.svelte";
    import FullInfo from "components/UserCreate/FullInfo.svelte";
    import Footer from "components/UserCreate/Layout/Footer.svelte";
    import { createUserLevel, userFormBasic } from "constants/user";

    let identity: HTMLInputElement;
    let nickname: HTMLInputElement;
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;
    let phoneNumber: HTMLInputElement;
    let bank: HTMLInputElement;
    let accountNumber: HTMLInputElement;
    let accountHolder: HTMLInputElement;
    
    let casinoRollingRate: HTMLInputElement | number = 0;
    let casinoLosingRate: HTMLInputElement | number = 0;
    let slotRollingRate: HTMLInputElement | number = 0;
    let slotLosingRate: HTMLInputElement | number = 0;
    let minigameRollingRate: HTMLInputElement | number = 0;
    let minigameLosingRate: any = 0;
    let bonusLevel: HTMLInputElement | number = 1;
    let bettingLimitLevel: HTMLInputElement | number = 1;
    let isReferer: HTMLInputElement | number = 0;
    let memo: HTMLInputElement;

    const bindBasic = [identity, nickname, password, passwordConfirm, accountHolder, phoneNumber, bank, accountNumber];
    const basicValidate = [identity, nickname, password, passwordConfirm, accountHolder, phoneNumber, bank, accountNumber];
    const bindAdvenced = [casinoRollingRate, casinoLosingRate, slotRollingRate, slotLosingRate, minigameRollingRate, minigameLosingRate, bonusLevel, bettingLimitLevel, isReferer, memo];
    
    let page: number = 1;

    const paging = (value: number):void => {

        if(value === 1 && page == 1){
            for(let i = 0; i < bindBasic.length; i++){
                if (!bindBasic[i]) {
                    document.querySelector(`#${userFormBasic[i]["id"]}`).classList.add("invalid");
                    return basicValidate[i].focus();
                }
            }

            if(bindBasic[2] !== bindBasic[3]) {
                document.querySelector(`#${userFormBasic[3]["id"]}`).classList.add("invalid");
                return basicValidate[3].focus();
            }
        }

        if(value === 1) page++ ;    // next
        if(value === 0) page-- ;    // previous
    }

</script>
<div class="content create-user">
    <div class="card create_user__form">
        <div class="card__header">
            <Header {page} />
        </div>
        <div class="create-user__title">
            <p>{createUserLevel[page-1]["title"]}</p>
            <p class="create-user__title__subtitle">
                {createUserLevel[page-1]["subtitle"]}
            </p>
        </div>
        <div class="card__body">
            {#if page == 1}
                <BasicInfo {bindBasic} {basicValidate}/>
            {:else if page == 2}
                <AdvencedInfo {bindAdvenced}/>
            {:else}
                <FullInfo {bindBasic} {bindAdvenced} />
            {/if}
        </div>
        <div class="card__footer">
            <Footer {page} {paging} {bindBasic} {bindAdvenced} />
        </div>
    </div>
</div>
<style lang="scss">
    @import "../../styles/card.scss";
    @import "./UserCreate.scss";
</style>