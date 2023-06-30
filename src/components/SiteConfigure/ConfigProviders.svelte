<script lang="ts">
    import Modal from "utils/Modal.svelte";
    import Table from "utils/Table.svelte";
    import { handleGetSiteProviders } from "services/site";
    import ProviderInfo from "./Modal/ProviderInfo.svelte";

    let providerInfoVisible = false;
    let tableList: Array<object>;
    let providerInfo: object;

    const handleProviderInfoVisible = (item?: object) => {
        if(item) providerInfo = item;
        providerInfoVisible = !providerInfoVisible;
    }

    const init = async () => {
        tableList = await handleGetSiteProviders() as Array<object>;
    }
    init();
       
</script>

<div class="card">
    <div class="card__header">
        <p class="card__header__title">API사 정보</p>
        <button on:click={handleProviderInfoVisible}>추가</button>
    </div>
    <div class="card__body">
        <Table tableTitle={["순서", "제공사", "아이디", "비밀번호", "PREFIX", "TOKEN", "수정"]}>
            {#if tableList}
                {#each tableList as item, index}
                    <tr>
                        <td>{index}</td>
                        <td>{item["providerId"]["name"]}</td>
                        <td>{item["identity"]}</td>
                        <td>{item["password"]}</td>
                        <td>{item["prefix"]}</td>
                        <td>{item["token"]}</td>
                        <td><button class="small" on:click={()=>{handleProviderInfoVisible(item)}}>수정</button></td>
                    </tr>
                {/each}
            {/if}
        </Table>
    </div>
</div>

<Modal visible={providerInfoVisible} handleVisible={handleProviderInfoVisible} title={"제공사 추가"} >
    <ProviderInfo handleVisible={handleProviderInfoVisible} siteProviders={tableList} {providerInfo} reloadTableList={init}/>
</Modal>

<style lang="scss">
    @import "../../styles/card.scss";
    @import "./ConfigProviders.scss";
</style>