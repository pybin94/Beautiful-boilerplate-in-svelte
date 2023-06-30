<script lang="ts">
    import { getMyInfo } from "services/myInfo";
    import { got, moneyFormat } from "utils/helpers";
    import { popup } from "utils/popup";

    export let handleVisible: any;
    export let transactionInfo: object;
    export let handleGetList: Function;

    let memo: string ;
    let status: number;

    const updateTransactionStatus = async () => {

        if(!status) {
            return popup("상태를 설정해주세요.", 0)
        }
        
        let params = {
            status,
            logId: transactionInfo["id"],
            memo
        }

        const response = await got(`/admin/transaction`, "POST", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleVisible();
            handleGetList();
            getMyInfo();
        }
    }
</script>

<form on:submit|preventDefault={updateTransactionStatus}>
    <div class="form-body">
        <div class="form-group">
            <p>에이전트 이름</p>
            <input type="text" disabled value={transactionInfo["fromId"]["nickname"]}>
        </div>
        <div class="form-group">
            <p>에이전트 아이디</p>
            <input type="text" disabled value={transactionInfo["fromId"]["identity"]}>
        </div>
        <div class="form-group">
            <p>신청금액</p>
            <input type="text" disabled value={moneyFormat(transactionInfo["money"])}>
        </div>
        <div class="form-group">
            <p>상태</p>
            <select name="" id="" bind:value={status}>
                <option value="">선택</option>
                <option value="3">완료</option>
                <option value="2">대기</option>
                <option value="0">취소</option>
            </select>
        </div>
        <div class="form-footer">
            <button class="wide">변경</button>
        </div>
    </div>
</form>

<style lang="scss">
    p {
        font-size: 0.85rem;
    }
    @import "../../../styles/form.scss";
</style>