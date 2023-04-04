<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import Toggle from "utils/Toggle.svelte";

    let page = 2
    let limit = 1;
    const test = () => {
        let a = popup(2, " asdf");
        console.log(a)
    }

</script>
<div class="content">
    <button on:click={test}>
        테스트
    </button>
</div>