<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";

    export let ipType: number;
    export let handleVisible: Function;
    export let handleGetBlacklist: Function;
    export let handleGetWhitelist: Function;

    let ip: string = ""
    let memo: string = "";

    const handleInsertIp = async (setIpType: number) => {
        // type 1: blacklist, 2: whitelist

        const pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if(pattern.test(ip) == false) return popup("올바른 아이피를 입력해주세요.", 0);

        let params = {
            ip,
            memo,
        };

        let response: any;

        setIpType == 1
        ? response = await got("/site/blacklist", "PATCH", params)
        : response = await got("/site/whitelist", "PATCH", params);

        popup(response.message, response.status);
        if(response.status == 1) {
            setIpType == 1
            ? handleGetBlacklist()
            : handleGetWhitelist();
            handleVisible()
        };
    };


</script>

<form on:submit|preventDefault={()=>{handleInsertIp(ipType)}}>
    <div class="form-body">
        <div class="form-group">
            <div>
                <label for="">등록 IP</label>
                <input type="text" bind:value={ip}>
            </div>
        </div>
        <div class="form-group">
            <div>
                <label for="">메모</label>
                <input type="text" placeholder="입력하지 않으셔도 됩니다." bind:value={memo}>
            </div>
        </div>
        <div class="form-footer">
            <button class="wide">저장</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "../../../styles/form.scss";
</style>