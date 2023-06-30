<script lang="ts">
    import SiteDetail from "components/SiteSetting/SiteDetail.svelte";
    import GameDetail from "components/SiteSetting/GameDetail.svelte";
    import BonusSetting from "components/SiteSetting/BonusSetting.svelte";
    import BonusUser from "components/SiteSetting/BonusUser.svelte";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";

    let siteSetting: Array<any>, gameDetail: Array<any>, bonusSetting: Array<any>, bonusUserLevel = [];

    const init = (): void => {
        handleGetSiteInfo();
    };

    const handleGetSiteInfo = async () => {
        
        const response = await got("/site", "GET");
        if(response.status == 1) {
            let siteInfo = response.data

            siteSetting = [siteInfo.isEnabledInspection, siteInfo.inspectionMessage, siteInfo.isEnabledTelegram, siteInfo.telegramId]
            gameDetail = [
                siteInfo.isEnabledCasino, siteInfo.casinoRollingRateMax, siteInfo.casinoLosingRateMax, siteInfo.casinoOmittingRateMax,
                siteInfo.isEnabledSlot, siteInfo.slotRollingRateMax, siteInfo.slotLosingRateMax, siteInfo.slotOmittingRateMax,
                siteInfo.isEnabledMinigame, siteInfo.minigameRollingRateMax, siteInfo.minigameLosingRateMax, siteInfo.minigameOmittingRateMax,
            ]
            bonusSetting = [
                siteInfo.isEnabledBonusLevel, siteInfo.dailyBonusLimit, siteInfo.newDepositRate, siteInfo.newBonusLimit, 
                siteInfo.everyBonusLimit, siteInfo.everyDepositRate, siteInfo.firstDepositRate, siteInfo.firstBonusLimit
            ]
        };

        const responseBonus = await got("/site/bonus", "GET");
        if(responseBonus.status == 1 && responseBonus.data[0]) {
            let bonusLevel = responseBonus.data
            bonusLevel.forEach((item: any, index: number)=>{
                bonusUserLevel = [
                    ...bonusUserLevel, 
                    [ 
                        item.dailyBonusLimit, 
                        item.newDepositRate, 
                        item.firstDepositRate, 
                        item.everyDepositRate, 
                        item.newBonusLimit, 
                        item.firstBonusLimit, 
                        item.everyBonusLimit, 
                    ],
                ];
            });
        } else {
            bonusUserLevel = [
                [ 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0 ],
            ]
        }
    };

    const detectBonusLevel = (bonusStatus: number) => {
        bonusSetting[0] = bonusStatus;
    };

    const handleSaveSiteInfo = async () => {
        let params = {
            isEnabledInspection: siteSetting[0],
            inspectionMessage: siteSetting[1],
            isEnabledTelegram: siteSetting[2],
            telegramId: siteSetting[3],

            casinoRollingRateMax: gameDetail[1],
            casinoLosingRateMax: gameDetail[2],
            casinoOmittingRateMax: gameDetail[3],
            slotRollingRateMax: gameDetail[5],
            slotLosingRateMax: gameDetail[6],
            slotOmittingRateMax: gameDetail[7],
            minigameRollingRateMax: gameDetail[9],
            minigameLosingRateMax: gameDetail[10],
            minigameOmittingRateMax: gameDetail[11],

            isEnabledBonusLevel: bonusSetting[0], 
            dailyBonusLimit: bonusSetting[1], 
            newDepositRate: bonusSetting[2], 
            newBonusLimit: bonusSetting[3], 
            everyBonusLimit: bonusSetting[4], 
            everyDepositRate: bonusSetting[5], 
            firstDepositRate: bonusSetting[6], 
            firstBonusLimit: bonusSetting[7], 
        };

        const response = await got("/site", "PATCH", params);
        if(bonusSetting[0] == 2) {
            let userBonusParams = {
                bonusUserLevel
            }
            await got("/site/bonus", "PATCH", userBonusParams);
            popup(response.message, response.status);
        } else {
            popup(response.message, response.status);
        }
    };

    init();
</script>

<div class="content">
    
    <SiteDetail {siteSetting} />
    <GameDetail {gameDetail} />
    <BonusSetting {bonusSetting} {detectBonusLevel} />

    {#if bonusSetting && bonusSetting[0] == 2}
        <BonusUser {bonusUserLevel} />
    {/if}
    <div class="card">
        <div class="card__save">
            <button on:click={handleSaveSiteInfo}>저장</button>
        </div>
    </div>
</div>


<style lang="scss">
    @import "../../styles/card.scss";
    @import "./SiteSetting.scss";
</style>
