<script lang="ts">
    import Header from "components/AdminCreate/Layout/Header.svelte";
    import Footer from "components/AdminCreate/Layout/Footer.svelte";
    import BasicInfo from "components/AdminCreate/BasicInfo.svelte";
    import AdvencedInfo from "components/AdminCreate/AdvencedInfo.svelte";
    import FullInfo from "components/AdminCreate/FullInfo.svelte";
    import { adminFormBasic, createAdminLevel } from "constants/admin";

    let identity: HTMLInputElement;
    let nickname: HTMLInputElement;
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;
    let phoneNumber: HTMLInputElement;
    let code: HTMLInputElement;
    let bank: HTMLInputElement;
    let accountNumber: HTMLInputElement;
    let accountHolder: HTMLInputElement;
    
    let casinoRollingRate: HTMLInputElement | number = 0;
    let casinoLosingRate: HTMLInputElement | number = 0;
    let slotRollingRate: HTMLInputElement | number = 0;
    let slotLosingRate: HTMLInputElement | number = 0;
    let minigameRollingRate: HTMLInputElement | number = 0;
    let minigameLosingRate: HTMLInputElement | number = 0;
    let memo: HTMLInputElement;

    const bindBasic = [identity, password, passwordConfirm, nickname, code, accountHolder, phoneNumber, bank, accountNumber];
    const basicValidate = [identity, password, passwordConfirm, nickname, code, accountHolder, phoneNumber, bank, accountNumber];
    const bindAdvenced = [casinoRollingRate, casinoLosingRate, slotRollingRate, slotLosingRate, minigameRollingRate, minigameLosingRate, memo];
    
    let page: number = 1;

    const paging = (value: number):void => {

        if(value === 1 && page == 1){
            for(let i = 0; i < bindBasic.length; i++){
                if (!bindBasic[i]) {
                    document.querySelector(`#${adminFormBasic[i]["id"]}`).classList.add("invalid");
                    return basicValidate[i].focus();
                }
            }

            if(bindBasic[1] !== bindBasic[2]) {
                document.querySelector(`#${adminFormBasic[3]["id"]}`).classList.add("invalid");
                return basicValidate[3].focus();
            }
        }

        if(value === 1) page++ ;    // next
        if(value === 0) page-- ;    // previous
    }
</script>
<div class="create-user content">
    <div class="card create_user__form">
        <div class="card__header">
            <Header {page} />
        </div>
        <div class="create-user__title">
            <p>{createAdminLevel[page-1]["title"]}</p>
            <p class="create-user__title__subtitle">
                {createAdminLevel[page-1]["subtitle"]}
            </p>
        </div>
        <div class="card__body">
            {#if page == 1}
                <BasicInfo {bindBasic} {basicValidate} />
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
    @import "./adminCreate.scss";
</style>