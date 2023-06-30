<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import Editor from '@tinymce/tinymce-svelte';
    import { adminLevel } from "constants/admin";
    import { handleValidate } from "utils/validator";

    export let handleGetList: Function;
    export let handleVisible: Function;
    export let targetItem: Array<[]> | undefined;
    let status: number;
    let type: number;
    let isFixed: number;
    let title: string;
    let contents: string;

    if(targetItem) {
        status = targetItem["status"]
        type = targetItem["type"]
        isFixed = targetItem["isFixed"]
        title = targetItem["title"]
        contents = targetItem["contents"]
    }
    
    const createNotice = async () => {

        if(!title) {
            return popup("제목을 입력해주세요.", 0)
        }

        if(!contents) {
            return popup("내용을 입력해주세요.", 0)
        }
        
        let params = {
            status,
            isFixed,
            title,
            type,
            contents,
        }

        if (targetItem) params["id"] = targetItem["id"];
        
        const response = await got(`/notice/user`, "PATCH", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleGetList()
            handleVisible()
        }
    }
</script>

<form on:submit|preventDefault={createNotice}>
    <div class="form-body">
        <div class="form-group">
            <label for="">상태</label>
            <select name="" id="" bind:value={status}>
                <option value={1}>보임</option>
                <option value={0}>숨김</option>
            </select>
        </div>
        <div class="form-group">
            <label for="">타입</label>
            <select name="" id="" bind:value={type}>
                <option value={0}>공지</option>
                <option value={1}>이벤트</option>
            </select>
        </div>
        <div class="form-group">
            <label for="">상단 고정</label>
            <select name="" id="" bind:value={isFixed}>
                <option value={0}>일반</option>
                <option value={1}>고정</option>
            </select>
        </div>
        <div class="form-group">
            <label for="">제목</label>
            <input 
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
        <div class="form-footer">
            <button class="wide">저장</button>
        </div>
    </div>
</form>

<style lang="scss">
    @import "../../../styles/form.scss";
</style>