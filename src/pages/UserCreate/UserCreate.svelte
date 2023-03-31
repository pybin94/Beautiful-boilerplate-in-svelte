<script lang="ts">
    import Header from "components/UserCreate/Header/Header.svelte";
    import BasicInfo from "components/UserCreate/BasicInfo/BasicInfo.svelte";
    import AdvencedInfo from "components/UserCreate/AdvencedInfo/AdvencedInfo.svelte";
    import FullInfo from "components/UserCreate/FullInfo/FullInfo.svelte";
    import Footer from "components/UserCreate/Footer/Footer.svelte";
    import { createUserLevel, userFormBasic } from "constants/userCreate";

    let identity: HTMLInputElement;
    let username: HTMLInputElement;
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;
    let set1: HTMLInputElement;
    let set2: HTMLInputElement;
    let set3: HTMLInputElement;
    let set4: HTMLInputElement;

    const bindBasic = [identity, username, password, passwordConfirm];
    const validateElements = [identity, username, password, passwordConfirm];
    const bindAdvenced = [set1, set2, set3, set4];
    
    let page: number = 1;

    const paging = (value: number):void => {

        if(value === 1 && page == 1){
            for(let i = 0; i < bindBasic.length; i++){
                if (!bindBasic[i]) {
                    document.querySelector(`#${userFormBasic[i]["id"]}`).classList.add("invalid");
                    return validateElements[i].focus();
                }
            }

            if(bindBasic[2] !== bindBasic[3]) {
                document.querySelector(`#${userFormBasic[3]["id"]}`).classList.add("invalid");
                return validateElements[3].focus();
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
        <div class="card__body">
            <div class="create-user__title">
                <p>{createUserLevel[page-1]["title"]}</p>
                <p class="create-user__title__subtitle">
                    {createUserLevel[page-1]["subtitle"]}
                </p>
            </div>
            {#if page == 1}
                <BasicInfo {bindBasic} {validateElements}/>
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