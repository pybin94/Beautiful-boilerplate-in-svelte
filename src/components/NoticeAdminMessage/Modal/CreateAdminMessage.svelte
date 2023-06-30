<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import Editor from '@tinymce/tinymce-svelte';
    import { handleValidate } from "utils/validator";
    import { levelStore } from "stores/myInfo.store";

    export let handleGetList: Function;
    export let handleVisible: Function;
    export let handleSearchAdminVisible: any;
    export let handleTemplateVisible: any;
    export let messageItem: Array<object> | undefined;
    export let playerIndex: Array<number>;
    export let playerList: Array<string>;

    let title: string;
    let contents: string;

    $: messageItem, exisitingMessageItem();

    const init = () => {
        exisitingMessageItem()
    }

    const exisitingMessageItem = () => {
        if(messageItem) {
            title = messageItem["title"]
            contents = messageItem["contents"]
        }
    }

    interface SendMessage {
        isBroadcast?: boolean,
        direction: number,
    }

    const sendMessage = async (sendMessage: SendMessage) => {

        if(!sendMessage.isBroadcast && $levelStore == 1) {
            if(playerIndex.length == 0) return popup("보낼 대상을 선택해주세요.", 0)
        }

        if(!title) return popup("제목을 입력해주세요.", 0);
        if(!contents) return popup("내용을 입력해주세요.", 0);

        let params = {
            playerIndex,
            title,
            contents,
            status: 0,
            isBroadcast: 0,
        }

        if (messageItem) params["id"] = messageItem["id"];

        let response: any;
        if(sendMessage.isBroadcast) {
            params["isBroadcast"] = 1;
            popup("쪽지를 전체전송 하시겠습니까?", 2, async (data: boolean) => {
                if(data == false) return;
                response = await got(`/notice/admin/message`, "PATCH", params);
            })
        } else {
            response = await got(`/notice/admin/message`, "PATCH", params);
        }

        playerList = [];
        playerIndex = [];

        if(response) {
            popup(response.message, response.status);
            if (response.status == 1) {

                handleGetList()
                handleVisible()
            }
        }
    }

    init()
</script>

<form on:submit|preventDefault={()=>{sendMessage({direction: 1})}}>
    <div class="form-body">
        {#if $levelStore <= 1}
            <div class="form-group">
                <label for="">에이전트 리스트</label>
                <div class="message-target">
                    <input 
                        type="text" 
                        disabled
                        bind:value={playerList}
                    >
                    <button 
                        class="line"
                        type="button"
                        on:click={handleSearchAdminVisible}
                    >에이전트 추가</button>
                </div>
            </div>
        {/if}
        <div class="form-group">
            <label for="">제목</label>
            <input 
                id="title"
                type="text"
                placeholder="제목을 작성해주세요."
                bind:value={title}
                on:keydown={(e)=>{handleValidate(e)}}
                on:blur={(e)=>{handleValidate(e)}}
            >
        </div>
        <div class="form-group">
            <label for="">내용</label>
            <Editor bind:value={contents}/>
        </div>
    </div>
    <div class="form-footer">

        {#if $levelStore <= 1}
            <button 
                type="button" 
                class="green line"
                on:click={handleTemplateVisible}
            >
                템플릿
            </button>
        {/if}
        <div>
            {#if $levelStore <= 1}
                <button 
                    type="button" 
                    class="red line" 
                    on:click={()=>{sendMessage({isBroadcast: true, direction: 1})}}
                >
                    전체 전송
                </button>
            {/if}
            <button>전송</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "../../../styles/form.scss";
    @import "./createAdminMessage.scss";
</style>