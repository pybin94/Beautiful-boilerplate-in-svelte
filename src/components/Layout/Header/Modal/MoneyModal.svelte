<script lang="ts">
    import { getMyInfo } from "services/myInfo";
    import { got, moneyFormat } from "utils/helpers";
    import { popup } from "utils/popup";

    export let handleVisible: any;
    export let balance: number;
    let amount: number = null;
    let paymentTitle: string = "출금";
    let paymentType: number = 2;

    const handlePayment = async () => {
        if(!amount || amount <= 0) {
            return popup("금액을 입력해주세요.", 0);
        }

        if(amount < 10000 ) {
            return popup("10,000원 이상부터 전환이 가능합니다.", 0);
        }

        let params = {
            amount,
            paymentType,
            status: 1,
        }

        const response = await got(`/admin/transaction`, "POST", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleVisible();
            getMyInfo();
        }
    }

    const handlePaymentType = (setType: number) => {
        amount = null;
        switch (setType) {
            case 1:
                paymentType = setType;
                paymentTitle = "입금"
                break;
            case 2:
                paymentType = setType;
                paymentTitle = "출금"
                break;
        }
    }

    const setAmount = (data: number) => {
        if(!amount) amount = 0;
        amount += data
    }

    const accountInquiry = () => {

        let params = {
            title: "[에이전트] 입금 계좌 문의",
            contents: "입금 계좌 문의드립니다.",
            status: 0,
            isBroadcast: 0,
        }
        popup("입금문의 쪽지를 보내시겠습니까?", 2, async (data: boolean) => {
            if(data == false) return;
            
            let response = await got(`/notice/admin/message`, "PATCH", params);
            if(response) {
                popup(response.message, response.status);
                if (response.status == 1) {
                    handleVisible()
                }
            }

        })
    }
</script>

<form on:submit|preventDefault={handlePayment}>
    <div class="form-body">
        <div class="form-group payment-tab">
            <button type="button" on:click={()=>{handlePaymentType(2)}} class="medium">머니 출금 신청</button>
            <button type="button" on:click={()=>{handlePaymentType(1)}} class="medium">머니 입금 신청</button>
        </div>
        <div class="form-group">
            <label for="">현재 보유 금액</label>
            <input type="text" disabled value={moneyFormat(balance)}>
        </div>
        <div class="form-group">
            <label for="">{paymentTitle} 신청 금액</label>
            <input 
                type="text" 
                bind:value={amount}
                placeholder="{paymentTitle}하실 금액을 입력해주세요."
            >
        </div>

        {#if paymentType == 2}
            <div class="form-group-half">
                <div>
                    <button type="button" class="medium wide line" on:click={()=>{amount = balance}}>전액</button>
                </div>
                <div>
                    <button type="button" class="medium wide line red" on:click={()=>{amount = null}}>초기화</button>
                </div>
            </div>
        {:else}
            <div class="set-amount">
                <button type="button" class="medium wide line" on:click={()=>{setAmount(10000)}}>1만</button>
                <button type="button" class="medium wide line" on:click={()=>{setAmount(100000)}}>10만</button>
                <button type="button" class="medium wide line" on:click={()=>{setAmount(500000)}}>50만</button>
                <button type="button" class="medium wide line" on:click={()=>{setAmount(1000000)}}>100만</button>
                <button type="button" class="medium wide line red" on:click={()=>{amount = null}}>초기화</button>
            </div>
        {/if}
        <div class="form-footer">
            {#if paymentType == 1}
                <button 
                    class="wide line" 
                    type="button"
                    on:click={accountInquiry}
                >
                    입금 계좌 문의
                </button>
            {/if}
            <button class="wide">신청</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "./MoneyModal.scss";
    @import "../../../../styles/form.scss";
</style>