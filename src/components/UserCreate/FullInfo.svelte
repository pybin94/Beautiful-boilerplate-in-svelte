<script lang="ts">
    import { userFormAdvenced, userFormBasic } from "constants/user";

    export let bindBasic: object;
    export let bindAdvenced: object;
</script>
<form class="create-user">
    {#each userFormBasic as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:value={bindBasic[index]}
                autocomplete="new-password"
                disabled
            >
        </div>
    {/each}
    {#each userFormAdvenced as item, index}
        <div class="create-user__form">
            <label for={item.id}>{item.title}</label>
            <input 
                id={item.id}
                bind:value={bindAdvenced[index]}
                disabled
            >
        </div>
    {/each}
    <div class="create-user__form">
        <label for="level">레벨</label>
        <input 
            disabled
            id=level
            bind:value={bindAdvenced[6]}
        >
    </div>
    <div class="create-user__form">
        <label for="level">베팅 제한 레벨</label>
        <input 
            disabled
            id=level
            bind:value={bindAdvenced[7]}
        >
    </div>
    <div class="create-user__form">
        <label for="referer" >추천인 설정</label>
        <input 
            disabled
            id=referer
            value="{bindAdvenced[8] == 0 ? "비활성화" : "활성화"}"
        > 
    </div>
    <div class="create-user__form">
        <label for="memo" >메모</label>
        <input 
            disabled
            id=memo
            bind:value={bindAdvenced[9]}
        >
    </div>
</form>

<style lang="scss">
    @import "./Layout/common.scss";
    @import "./FullInfo.scss";
</style>