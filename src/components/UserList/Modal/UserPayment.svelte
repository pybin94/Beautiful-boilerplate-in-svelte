<script lang="ts">
    import { getMyInfo } from "services/myInfo";
    import { got, moneyFormat } from "utils/helpers";
    import { popup } from "utils/popup";

    export let userInfo: object;
    export let handlePaymentVisible: any;
    export let handleGetList: Function;

    let amount: number;
    let paymentType: number = 0;
    let pointDetail: number = 1;
    let memo: string;
    let paymentTitle: string = "머니";
    let currency: string = userInfo["balance"]

    const handlePointDetail = (setPointDetail: number) => {
        pointDetail = setPointDetail;
    }

    const handelPayment = async () => {
        if(!amount) {
            return popup("금액을 입력해주세요.", 0);
        }

        let params = {
            amount,
            paymentType,
            pointDetail,
            memo,
            targetId: userInfo["id"],
            identity: userInfo["identity"],
        }
        let response: any;

        if(paymentType == 1) {
            popup("플레이어 게임머니가 사이트 보유머니로 전환됩니다.", 3, async (data: boolean) => {
                if (data == false) return;
                response = await got("/user/payment", "POST", params);
                popup(response.message, response.status)
                if (response.status == 1) {
                    handleGetList();
                    handlePaymentVisible();
                    getMyInfo();
                }
            })
        } else {
            response = await got("/user/payment", "POST", params);
            popup(response.message, response.status)
            if (response.status == 1) {
                handleGetList();
                handlePaymentVisible();
                getMyInfo();
            }
        }
    }

    const handlePaymentType = (setType: number) => {
        amount = null;
        switch (setType) {
            case 0:
                paymentType = setType;
                paymentTitle = "머니";
                currency = userInfo["balance"];
                break;
            case 1:
                paymentType = setType;
                paymentTitle = "머니";
                currency = userInfo["balance"];
                break;
            case 2:
                paymentType = setType;
                paymentTitle = "포인트";
                currency = userInfo["point"];
                break;
            case 3:
                paymentType = setType;
                paymentTitle = "포인트";
                currency = userInfo["point"];
                break;
        }
    }

    const setAmount = (data: number) => {
        if(!amount) amount = 0;
        amount += data
    }
</script>

<form on:submit|preventDefault={handelPayment}>
    <div class="form-body">
        <div class="form-group payment-tab">
            <button type="button" on:click={()=>{handlePaymentType(0)}} class="medium">머니 지급</button>
            <button type="button" on:click={()=>{handlePaymentType(1)}} class="medium">머니 회수</button>
            <button type="button" on:click={()=>{handlePaymentType(2)}} class="medium green">포인트 지급</button>
            <button type="button" on:click={()=>{handlePaymentType(3)}} class="medium green">포인트 회수</button>
        </div>
        <div class="form-group-half">
            <div>
                <label for="">플레이어 아이디</label>
                <input type="text" disabled value={userInfo["identity"]}>
            </div>
            <div>
                <label for="">닉네임</label>
                <input type="text" disabled value={userInfo["nickname"]}>
            </div>
        </div>
        <div class="form-group">
            <label for="">보유 {paymentTitle}</label>
            <div class="input-search">
                <input type="text" disabled value={moneyFormat(currency)}>
                <button type="button">조회</button>
            </div>
        </div>
        <div class="form-group">
            <label for="">{paymentTitle}{paymentType % 2 == 0 ? " 지급" : " 회수"}</label>
            <input type="number" placeholder="{paymentType % 2 == 0 ? "지급" : "회수"} 금액을 입력해주세요." bind:value={amount}>
        </div>
        {#if paymentType == 2}
            <div class="form-group">
                <p class="pointDetail">지급 방식</p>
                <button class="medium {pointDetail == 1 ? "" : "line"}" type="button" on:click={()=>{handlePointDetail(1)}}>롤링</button>
                <button class="medium {pointDetail == 2 ? "" : "line"}" type="button" on:click={()=>{handlePointDetail(2)}}>루징</button>
                <button class="medium {pointDetail == 3 ? "" : "line"}" type="button" on:click={()=>{handlePointDetail(3)}}>기타</button>
            </div>
        {/if}
        <div class="form-group">
            <label for="">메모</label>
            <input type="text" placeholder="입력하지 않으셔도 됩니다." bind:value={memo}>
        </div>
        <div class="set-amount">
            <button type="button" class="line medium" on:click={()=>{setAmount(10000)}}>1만</button>
            <button type="button" class="line medium" on:click={()=>{setAmount(50000)}}>5만</button>
            <button type="button" class="line medium" on:click={()=>{setAmount(100000)}}>10만</button>
            <button type="button" class="line medium" on:click={()=>{setAmount(500000)}}>50만</button>
            <button type="button" class="line medium" on:click={()=>{setAmount(1000000)}}>100만</button>
            <button type="button" class="line medium" on:click={()=>{setAmount(5000000)}}>500만</button>
            <button type="button" class="line medium red" on:click={()=>{amount = undefined}}>리셋</button>
        </div>
        <div class="form-footer">
            <button class="admin-payment-confirm">확인</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "./UserPayment.scss";
    @import "../../../styles/form.scss";
</style>