<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import Editor from '@tinymce/tinymce-svelte';
    import { handleValidate } from "utils/validator";

    export let handleVisible: Function;
    export let templateItem: Array<[]> | undefined;
    export let handleGetTemplateList: Function;
    
    let title: string;
    let contents: string;

    if(templateItem) {
        title = templateItem["title"]
        contents = templateItem["contents"]
    }
    
    const saveTemplate = async () => {

        if(!title) return popup("제목을 입력해주세요.", 0);
        if(!contents) return popup("내용을 입력해주세요.", 0);

        let params = {
            title,
            contents,
        }

        if (templateItem) params["id"] = templateItem["id"];

        let response = await got(`/notice/admin/message/template`, "PATCH", params);
        
        popup(response.message, response.status);
        if (response.status == 1) {
            handleGetTemplateList()
            handleVisible()
        }
    }
</script>

<form on:submit|preventDefault={()=>{saveTemplate()}}>
    <div class="form-body">
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
        <button class="wide">저장</button>
    </div>
</form>

<style lang="scss">
    @import "../../../styles/form.scss";
    @import "./createAdminMessage.scss";
</style>