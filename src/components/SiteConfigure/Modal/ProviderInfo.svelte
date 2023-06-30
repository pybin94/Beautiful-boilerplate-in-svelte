<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";

    export let siteProviders: Array<object>;
    export let providerInfo: object;
    export let handleVisible: any;
    export let reloadTableList: Function;

    let providers: Array<object>;
    let filteredProviders: Array<object>
    let providerId: string;
    let identity: string;
    let password: string;
    let prefix: string;
    let token: string;

    const init = () => {
        if(providerInfo["id"]){
            identity = providerInfo["identity"]
            password = providerInfo["password"]
            prefix = providerInfo["prefix"]
            token = providerInfo["token"]
        } else {
            handleGetProviders();
        }
    };

    const handleGetProviders = async () => {
        const response = await got(`/provider/providers`)
        if (response.status == 1) {
            // 이미 등록된 provider 제거
            providers = response.data;
            providers.forEach((providersItem, providersIndex)=>{
                siteProviders.forEach((siteProvidersItem)=>{
                    if (providersItem["id"] == siteProvidersItem["providerId"]["id"]) {
                        delete providers[providersIndex];
                    }
                })
            });
            filteredProviders = providers.filter((item) => {
                return item !== null;
            });

            if(filteredProviders.length == 0){
                setTimeout(()=>{
                    handleVisible();
                }, 500)
                popup("모든 API사가 등록된 상태입니다.");
            } else {
                providerId = filteredProviders[0]["id"];
            }
        } else {
            popup(response.message, response.status);
            handleVisible();
        }
    };

    const upsertProvider = async () => {

        let params = {
            providerId,
            identity,
            password,
            prefix,
            token
        };

        if(providerInfo["id"]) params["id"] = providerInfo["id"]

        const response = await got(`/provider/site`, "PATCH", params)
        popup(response.message, response.status);
        if (response.status == 1) {
            reloadTableList();
            handleVisible();
        };
    };

    const deleteProvider = (item: object) => {
        popup("삭제 하시겠습니까?", 3, async (data: boolean) => {
            if(data === false) return; 
            
            let params = {
                id: providerInfo["id"]
            };

            const response = await got(`/provider/site`, "DELETE", params);
            popup(response.message, response.statuS);
            if (response.status == 1) {
                reloadTableList();
            };
        });
    };

    init();
</script>

<form on:submit|preventDefault={upsertProvider}>
    <div class="form-body">
        <div class="form-group">
            <label for="">API사</label>
            {#if providerInfo["id"]}
            <input type="text" disabled bind:value={providerInfo["providerId"]["name"]}>
            {:else}
                <select name="" id="" bind:value={providerId}>
                    {#if filteredProviders}
                        {#each filteredProviders as item}
                        <option value={item["id"]}>{item["name"]}</option>
                        {/each}
                    {/if}
                </select>
            {/if}
        </div>
    </div>
    <div class="form-body">
        <div class="form-group">
            <label for="">아이디</label>
            <input 
                required
                bind:value={identity}
            >
        </div>
        <div class="form-group">
            <label for="">비밀번호</label>
            <input 
                required
                bind:value={password}
            >
        </div>
        <div class="form-group">
            <label for="">PREFIX</label>
            <input 
                required
                bind:value={prefix}
            >
        </div>
        <div class="form-group">
            <label for="">TOKEN</label>
            <input 
                required
                bind:value={token}
            >
        </div>
    </div>
    <div class="form-footer">
        {#if providerInfo["id"]}
            <button class="admin-info-save red" type="button" on:click={deleteProvider}>삭제</button>
            <button class="admin-info-save">저장</button>
        {:else}
            <button class="admin-info-save wide">추가</button>
        {/if}
    </div>
</form>

<style lang="scss">
    @import "./ProviderInfo.scss";
    @import "../../../styles/form.scss";
</style>