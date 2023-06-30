<script lang="ts">
    import { handleGetSiteProviders } from "services/site";
    import Table from "utils/Table.svelte";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";

    export let handleVisible: Function;
    export let handleGetList: any;
    export let registeredGames: Array<number>;

    let provider: number = 1;
    let gameType: number | null = null;
    let providers: Array<object>;
    let thirdPartys: Array<number> = [];
    let tableList: Array<object>;

    const init = async () => {
        providers = await handleGetSiteProviders() as Array<object>;
        handleGetThirdparty();
    };

    const handleToggle = (event: any) => {
        event.target.classList.toggle("line")
    };

    const selectAdmin = (event: any, setIndex: number) => {
        handleToggle(event)
        const index = thirdPartys.indexOf(setIndex);
        if (index === -1) {
            thirdPartys = [...thirdPartys, setIndex];
        } else {
            thirdPartys.splice(index, 1);
            thirdPartys = [...thirdPartys]
        }
    }

    const handleRegistration = async () => {
        let params = {
            thirdPartys
        }

        const response = await got("/provider/site/thirdpartys", "PATCH", params);
        popup(response.message, response.status);
        if(response.status == 1) {
            handleVisible();
            handleGetList();
        };
    };

    const handleGetThirdparty = async () => {
        let params = {
            providerId: provider,
            type: gameType,
        };

        const response = await got("/provider/thirdpartys", "POST", params);
        if(response.status == 1) {
            tableList = response.data
        };
    };

    const selectAllList = () => {
        thirdPartys = [];
        tableList.forEach((item)=>{
            if(registeredGames.indexOf(item["id"]) == -1){
                thirdPartys = [...thirdPartys, item["id"]]
            };
        });
        if(!thirdPartys[0]) {
            return popup("추가할 게임이 없습니다.", 0);
        };
        let selectGameButton = document.querySelectorAll("#selectGameButton");
        selectGameButton.forEach((item)=>{
            item.classList.remove("line");
        });
    };

    init();

</script>

<form on:submit|preventDefault={()=>{handleRegistration()}}>
    <div class="form-body">
        <div class="form-group">
            <label for="">제공사</label>
            <div class="message-target">
                <select name="" id="" bind:value={provider} on:change={handleGetThirdparty}>
                    {#if providers}
                        {#each providers as item}
                            <option value={item["providerId"]["id"]}>{item["providerId"]["name"]}</option>
                        {/each}
                    {/if}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="">게임 종류</label>
            <div class="message-target">
                <select name="" id="" bind:value={gameType} on:change={handleGetThirdparty}>
                    <option value={null}>전체</option>
                    <option value={1}>카지노</option>
                    <option value={2}>슬롯</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="">목록</label>
            <Table tableTitle={["게임사", "게임명", "게임종류", "선택"]}>
                {#if tableList}
                    {#each tableList as item}
                        <tr>
                            <td>{item["providerId"]["name"]}</td>
                            <td>{item["name"]}</td>
                            <td>{item["type"] == 1 ? "카지노" : "슬롯"}</td>
                            <td>
                                {#if registeredGames.indexOf(item["id"]) == -1}
                                <button 
                                    type="button" 
                                    id="selectGameButton"
                                    class="small blue line" 
                                    on:click={(event)=>{
                                        selectAdmin(event, item["id"])
                                    }}
                                >
                                    선택
                                </button>
                                {:else}
                                <button 
                                    type="button" 
                                    class="small red fade" 
                                >
                                    추가됨
                                </button>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                {/if}
            </Table>
        </div>
    </div>
    <div class="form-footer">
        <button class="green" type="button" on:click={()=>{selectAllList()}}>전체 선택</button>
        <button class="">확인</button>
    </div>
</form>

<style lang="scss">
    @import "../../../styles/form.scss";
    @import "./AddThirdparty.scss";
</style>