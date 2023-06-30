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
    let isFixed: number;
    let title: string;
    let contents: string;
    let targetLevel: number;

    if(targetItem) {
        status = targetItem["status"]
        isFixed = targetItem["isFixed"]
        title = targetItem["title"]
        contents = targetItem["contents"]
        targetLevel = targetItem["targetLevel"];
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
            targetLevel,
            title,
            contents,
        }

        if (targetItem) params["id"] = targetItem["id"];
        
        const response = await got(`/notice/admin`, "PATCH", params)
        popup(response.message, response.status)
        if (response.status == 1) {
            handleGetList()
            handleVisible()
        }
    }
</script>

<form on:submit|preventDefault={createNotice}>
    <div class="form-body">
        <div class="form-group-third">
            <div>
                <label for="">상태</label>
                <select name="" id="" bind:value={status}>
                    <option value={1}>보임</option>
                    <option value={0}>숨김</option>
                </select>
            </div>
            <div>
                <label for="">상단 고정</label>
                <select name="" id="" bind:value={isFixed}>
                    <option value={0}>일반</option>
                    <option value={1}>고정</option>
                </select>
            </div>
            <div>
                <label for="">대상</label>
                <select name="" id="" bind:value={targetLevel}>
                    <option value={99}>전체</option>
                    {#each adminLevel as level}
                        {#if level["level"] !== 1} 
                            <option value={level["level"]}>{level["levelName"]}</option>
                        {/if}
                    {/each}
                </select>
            </div>
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