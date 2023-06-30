<script lang="ts">
    import { getMyInfo } from "services/myInfo";
    import { got, moneyFormat } from "utils/helpers";
    import { popup } from "utils/popup";

    export let handleVisible: any;
    export let point: number;
    let convertPoint: number = 0;

    const handleConvertPoint = async () => {

        if(!convertPoint || convertPoint <= 0) {
            return popup("금액을 입력해주세요.", 0);
        }

        if(convertPoint < 10000 ) {
            return popup("10,000포인트 이상부터 전환이 가능합니다.", 0);
        }

        let params = {
            amount: convertPoint,
            paymentType: 4,
        }

        const response = await got(`/admin/payment`, "POST", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleVisible();
            getMyInfo();
        }
    }
</script>

<form on:submit|preventDefault={handleConvertPoint}>
    <div class="form-body">
        <div class="form-group">
            <label for="">보유 포인트</label>
            <input type="text" disabled value={moneyFormat(point)}>
        </div>
        <div class="form-group">
            <label for="">전환 포인트</label>
            <input type="text" bind:value={convertPoint}>
        </div>
        <div class="form-group-half">
            <div>
                <button type="button" class="medium wide line" on:click={()=>{convertPoint = point}}>전액</button>
            </div>
            <div>
                <button type="button" class="medium wide line red" on:click={()=>{convertPoint = 0}}>초기화</button>
            </div>
        </div>
        <div class="form-footer">
            <button class="wide">포인트 전환</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "../../../../styles/form.scss";
</style>