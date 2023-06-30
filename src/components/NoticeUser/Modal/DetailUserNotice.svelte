<script lang="ts">
    import { dateFormat } from "utils/helpers";
    export let targetItem: Array<[]> | undefined;
</script>

<form>
    <div class="form-body">
        {#if targetItem}
            <div class="form-group">
                <label for="">작성일</label>
                <input type="text" readonly value={dateFormat(targetItem["createdAt"])}>
            </div>
            <div class="form-group">
                <label for="">제목</label>
                <input type="text" value={targetItem["title"]} readonly>
            </div>
            <div class="form-group">
                <label for="">내용</label>
                <div class="contents-container">
                    {@html targetItem["contents"]}
                </div>
            </div>
        {/if}
    </div>
</form>

<style lang="scss">
    .contents-container {
        border: 2px solid #eee;
        border-radius: 10px;
        padding: 2.538rem 1rem;
    }
    @import "../../../styles/form.scss";
</style>