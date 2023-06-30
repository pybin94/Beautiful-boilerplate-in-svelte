<script lang="ts">
    import IpList from "components/IpSetting/IpList.svelte";
    import InsertIpForm from "components/IpSetting/Modal/InsertIpForm.svelte";
    import Modal from "utils/Modal.svelte";
    import Pagenation from "utils/Pagenation.svelte";
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import Table from "utils/Table.svelte";
    import Toggle from "utils/Toggle.svelte";
    
    let blacklistCurrentPage: number = 1;
    let blacklistLimit: number = 20;
    let blacklistOffset: number = blacklistLimit * blacklistCurrentPage-1;
    let blacklistTableList: Array<object>;
    let blacklistFullPage: number = 1;
    
    let whitelistCurrentPage: number = 1;
    let whitelistLimit: number = 20;
    let whitelistOffset: number = whitelistLimit * whitelistCurrentPage-1;
    let whitelistTableList: Array<object>;
    let whitelistFullPage: number = 1;
    
    let ipToggle: boolean = false;
    let insertIpFormVisible: boolean = false;
    let ipType: number;

    const blackIpTableTitle = [
        "번호", "Black IP", "메모", "등록일", "삭제"
    ];

    const whiteIpTableTitle = [
        "번호", "White IP", "메모", "등록일", "삭제"
    ];

    const init = (): void => {
        handleGetBlacklist();
        handleGetWhitelist();
        chackIsEnabledWhitelist();
    };

    const handleIpToggle = (): void => {
        ipToggle = !ipToggle;
    };

    const handleInsertIpFormVisible = (setIpType: number) => {
        ipType = setIpType;
        insertIpFormVisible = !insertIpFormVisible;
    }

    const chackIsEnabledWhitelist = async () => {
        
        const response = await got("/site", "GET");
        if(response.status == 1) {
            response.data.isEnabledWhitelist == 0
            ? ipToggle = false
            : ipToggle = true
        };
    };

    const saveIsEnabledWhitelist = async (setEnabled: boolean) => {
        if(whitelistTableList.length == 0) {
            ipToggle = false;
            return popup("1개 이상의 화이트 아이피를 등록해주세요.", 0);
        };

        let params = {};

        setEnabled == true
        ? params["isEnabledWhitelist"] = 1
        : params["isEnabledWhitelist"] = 0;

        const response = await got("/site/enabled-whitelist", "PATCH", params);
        popup(response.message, response.status);
    };

    const handleGetBlacklist = async (setPage?: number) => {
        
        if(setPage) blacklistCurrentPage = setPage;
        blacklistOffset = blacklistLimit * (blacklistCurrentPage-1);

        let params = {
            limit : blacklistLimit,
            offset: blacklistOffset,
        };

        const response = await got("/site/blacklist", "POST", params);
        if(response.status == 1) {
            blacklistTableList = response.data.list;

            if(response.data.total !== 0) {
                blacklistFullPage = Math.ceil(response.data.total / blacklistLimit);
            };
        };
    };

    const handleGetWhitelist = async (setPage?: number) => {

        if(setPage) whitelistCurrentPage = setPage;
        whitelistOffset = whitelistLimit * (whitelistCurrentPage-1);

        let params = {
            limit : whitelistLimit,
            offset: whitelistOffset,
        };

        const response = await got("/site/whitelist", "POST", params);
        if(response.status == 1) {
            whitelistTableList = response.data.list;
            if(response.data.total !== 0) {
                whitelistFullPage = Math.ceil(response.data.total / whitelistLimit);
            };
        };
    };

    const handleDeleteIp = (index: number, setIpType: number) => {
        // setIpType 1: blacklist, 2: whitelist
        popup("정말 삭제하시겠습니까?", 3, async (data: boolean) => {
            if(data == false) return;

            let params = {
                id : index,
            };

            let response: any;

            setIpType == 1
            ? response = await got("/site/blacklist", "DELETE", params)
            : response = await got("/site/whitelist", "DELETE", params);

            popup(response.message, response.status);
            if(response.status == 1) {
                setIpType == 1
                ? handleGetBlacklist()
                : handleGetWhitelist();
            };
        })
    };

    init();
</script>

<div class="content">
    <div class="card">
        <p class="card__header__sub-title">블랙 리스트에 등록된 아이피만 사이트 접속이 차단됩니다.</p>
    </div>
    <div class="card">
        <div class="card__header">
            <p class="card__header__title">블랙 리스트</p>
            <button on:click={()=>{handleInsertIpFormVisible(1)}}>등록</button>
        </div>
        <Table tableTitle={blackIpTableTitle}>
            <IpList {handleDeleteIp} ipType={1} TableList={blacklistTableList} currentPage={blacklistCurrentPage} limit={blacklistLimit} />
        </Table>
        <div class="card__footer">
            <Pagenation handleGetList={handleGetBlacklist} fullPage={blacklistFullPage} currentPage={blacklistCurrentPage} />
        </div>
    </div>
    <div class="card">
        <div class="card__header">
            <div>
                <p class="card__header__title">화이트 아이피 사용</p>
                <p class="card__header__sub-title">화이트 리스트에 등록된 아이피만 사이트 접근이 허용됩니다. 블랙 리스트의 기능은 비활성화 됩니다.</p>
            </div>
        </div>
        <div class="card__wrap">
            <Toggle toggle={ipToggle} handleToggle={handleIpToggle}/>
            <button on:click={()=>{saveIsEnabledWhitelist(ipToggle)}}>저장</button>
        </div>
    </div>
    <div class="card">
        <div class="card__header">
            <p class="card__header__title">화이트 리스트</p>
            <button on:click={()=>{handleInsertIpFormVisible(2)}}>등록</button>
        </div>
        <Table tableTitle={whiteIpTableTitle}>
            <IpList {handleDeleteIp} ipType={2} TableList={whitelistTableList} currentPage={whitelistCurrentPage} limit={whitelistLimit} />
        </Table>
        <div class="card__footer">
            <Pagenation handleGetList={handleGetWhitelist} fullPage={whitelistFullPage} currentPage={whitelistCurrentPage} />
        </div>
    </div>
</div>

<Modal visible={insertIpFormVisible} handleVisible={handleInsertIpFormVisible} title={`${ipType == 1 ? "블랙" : "화이트"} 아이피 등록`}>
    <InsertIpForm {handleGetBlacklist} {handleGetWhitelist} handleVisible={handleInsertIpFormVisible} {ipType} />
</Modal>

<style lang="scss">
    @import "../../styles/card.scss";
    @import "./IpSetting.scss";
</style>
