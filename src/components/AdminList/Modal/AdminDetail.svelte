<script lang="ts">
    import { adminAuthLevel } from "constants/adminList";
    import { got } from "utils/helpers";

    export let adminInfo: object;
    export let handleVisible: any;
    export let handleGetList: Function;

    let set1: string = adminInfo["set1"];
    let set2: string = adminInfo["set2"];
    let memo: string = adminInfo["memo"];

    const updateAdminInfo = async () => {
        
        let params = {
            id: adminInfo["id"],
            set1,
            set2,
            memo
        }
        const response = await got(`/admin/update`, "PATCH", params)
        console.log(response)
        alert(response.message)
        if (response.status == 1) {
            handleVisible()
            handleGetList()
        }
    }
</script>

<form on:submit|preventDefault={updateAdminInfo}>
    <div class="form-body">
        <div class="form-group">
            <label for="">관리자 이름</label>
            <input type="text" disabled value={adminInfo["user_name"]}>
        </div>
        <div class="form-group">
            <label for="">관리자 아이디</label>
            <input type="text" disabled value={adminInfo["identity"]}>
        </div>
        <div class="form-group">
            <label for="">관리자 등급</label>
            {#each adminAuthLevel as authItem}
                {#if adminInfo["auth"] === authItem["auth"]}
                    <input type="text" disabled value={authItem["authName"]}>
                {/if}
            {/each}
        </div>
        <div class="form-group-half">
            <div>
                <label for="">추가설정1</label>
                <input type="text" bind:value={set1}>
            </div>
            <div>
                <label for="">추가설정2</label>
                <input type="text" bind:value={set2}>
            </div>
        </div>
        <div class="form-group">
            <label for="">메모</label>
            <input type="text" bind:value={memo}>
        </div>
    </div>
    <div class="form-footer">
        <button class="admin-info-save">저장</button>
    </div>
</form>

<style lang="scss">
    @import "./AdminDetail.scss";
    @import "../../../styles/form.scss";
</style>