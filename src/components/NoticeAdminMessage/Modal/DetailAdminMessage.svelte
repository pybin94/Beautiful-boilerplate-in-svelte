<script lang="ts">
    import { dateFormat, got } from "utils/helpers";
    import Editor from '@tinymce/tinymce-svelte';
    import { popup } from "utils/popup";
    import { levelStore } from "stores/myInfo.store";

    export let messageItem: Array<object> | undefined;
    export let handleVisible: Function;
    export let handleGetList: Function;
    export let handleTemplateVisible: any;
    export let searchForm: [number, number, string, number];

    let comments: string;

    const updateCommments = () => {
        if (messageItem?.["comments"]) comments = messageItem["comments"];
    }

    const replyMessage = async () => {

        if(!comments) return popup("답변을 입력해주세요.", 0);

        let params = {
            id: messageItem["id"],
            comments,
        }

        if(messageItem["status"] !== 3) params["status"] = 2;
        let response = await got(`/notice/admin/message`, "PATCH", params);

        popup(response.message, response.status);
        if (response.status == 1) {
            handleGetList();
            handleVisible();
        }
    }

    $: messageItem, updateCommments()
</script>

<form on:submit|preventDefault={replyMessage}>
    {#if messageItem}
        <div class="form-body">
            <div class="form-group">
                <label for="">작성일</label>
                <input type="text" readonly value={dateFormat(messageItem["createdAt"])}>
            </div>
            <div class="form-group">
                <label for="">제목</label>
                <input type="text" value={messageItem["title"]} readonly>
            </div>
            <div class="form-group">
                <label for="">내용</label>
                <div class="contents-container">
                    {@html messageItem["contents"]}
                </div>
            </div>
            {#if messageItem["comments"] && $levelStore > 1}
                <div class="form-group">
                    <label for="">답변</label>
                    <div class="contents-container">
                        {@html messageItem["comments"]}
                    </div>
                </div>
            {/if}
            {#if searchForm[1] == 2 && $levelStore <= 1}
                <div class="form-group">
                    <label for="">답변</label>
                    <Editor bind:value={comments}/>
                </div>
            {/if}
        </div>
        {#if searchForm[1] == 2 && $levelStore <= 1}
            <div class="form-footer">
                <button 
                    type="button" 
                    class="green line"
                    on:click={handleTemplateVisible}
                >
                    템플릿
                </button>
                <button>전송</button>
            </div>
        {/if}
    {/if}
</form>

<style lang="scss">
    .contents-container {
        border: 2px solid #eee;
        border-radius: 10px;
        padding: 2.538rem 1rem;
    }
    @import "../../../styles/form.scss";
</style>