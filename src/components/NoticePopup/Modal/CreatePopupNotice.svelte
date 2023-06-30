<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import Editor from '@tinymce/tinymce-svelte';
    import { handleValidate } from "utils/validator";

    export let handleGetList: Function;
    export let handleVisible: Function;
    export let targetItem: Array<[]> | undefined;

    let status: number;
    let isSigned: number;
    let isAuto: number;
    let positionX: number = 0;
    let positionY: number = 0;
    let positionZ: number = 0;
    let title: string;
    let contents: string;

    if(targetItem) {
        status = targetItem["status"]
        isSigned = targetItem["isSigned"]
        isAuto = targetItem["isAuto"]
        positionX = targetItem["positionX"]
        positionY = targetItem["positionY"]
        positionZ = targetItem["positionZ"]
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
            isSigned,
            isAuto,
            positionX: positionX,
            positionY: positionY,
            positionZ,
            title,
            contents,
        }

        if (targetItem) params["id"] = targetItem["id"];

        const response = await got(`/notice/popup`, "PATCH", params)
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
                <label for="">권한</label>
                <select name="" id="" bind:value={isSigned}>
                    <option value={1}>전체</option>
                    <option value={0}>로그인</option>
                </select>
            </div>
            <div>
                <label for="">우선 순위</label>
                <input 
                    type="number" 
                    bind:value={positionZ}
                    on:keydown={(e)=>{handleValidate(e)}}
                    on:blur={(e)=>{handleValidate(e)}}
                >
            </div>
        </div>
        <div class="form-group-third">
            <div>
                <label for="">정렬</label>
                <select name="" id="" bind:value={isAuto}>
                    <option value={1}>자동</option>
                    <option value={0}>수동</option>
                </select>
            </div>
            <div>
                <label for="">가로 위치</label>
                <input type="text" id="inputPosition" bind:value={positionX} disabled={isAuto ? true : false}>
            </div>
            <div>
                <label for="">세로 위치</label>
                <input type="text" id="inputPosition" bind:value={positionY} disabled={isAuto ? true : false}>
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