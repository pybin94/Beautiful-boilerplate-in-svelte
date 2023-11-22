<script lang="ts">
    import Header from "components/AdminCreate/Layout/Header.svelte";
    import BasicInfo from "components/AdminCreate/BasicInfo.svelte";
    import AdvencedInfo from "components/AdminCreate/AdvencedInfo.svelte";
    import FullInfo from "components/AdminCreate/FullInfo.svelte";
    import Footer from "components/AdminCreate/Layout/Footer.svelte";
    import { adminFormBasic, createAdminLevel } from "constants/admin";

    let identity: HTMLInputElement;
    let username: HTMLInputElement;
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;
    let set1: HTMLInputElement;
    let set2: HTMLInputElement;
    let memo: HTMLInputElement;
    let adminAuth: number;

    const bindBasic = [identity, username, password, passwordConfirm];
    const bindAdvenced = [set1, set2, memo];
    const bindSelect: [number] = [adminAuth];
    const validateElements = [identity, username, password, passwordConfirm];
    
    let page: number = 1;

    const paging = (value: number):void => {

        if(value === 1 && page == 1){
            for(let i = 0; i < bindBasic.length; i++){
                if (!bindBasic[i]) {
                    document.querySelector(`#${adminFormBasic[i]["id"]}`).classList.add("invalid");
                    return validateElements[i].focus();
                }
            }

            if(bindBasic[2] !== bindBasic[3]) {
                document.querySelector(`#${adminFormBasic[3]["id"]}`).classList.add("invalid");
                return validateElements[3].focus();
            }
        }

        if(value === 1) page++ ;    // next
        if(value === 0) page-- ;    // previous
    }

</script>
<div class="create-admin content">
    <div class="card create_admin__form">
        <div class="card__header">
            <Header {page} />
        </div>
        <div class="card__body">
            <div class="create-admin__title">
                <p>{createAdminLevel[page-1]["title"]}</p>
                <p class="create-admin__title__subtitle">
                    {createAdminLevel[page-1]["subtitle"]}
                </p>
            </div>
            {#if page == 1}
                <BasicInfo {bindBasic} {validateElements} />
            {:else if page == 2}
                <AdvencedInfo {bindSelect} {bindAdvenced}/>
            {:else}
                <FullInfo {bindSelect} {bindBasic} {bindAdvenced} />
            {/if}
        </div>
        <div class="card__footer">
            <Footer {page} {paging} {bindBasic} {bindSelect} {bindAdvenced} />
        </div>
    </div>
</div>
<style lang="scss">
    @import "../../styles/card.scss";
    @import "./adminCreate.scss";
</style>