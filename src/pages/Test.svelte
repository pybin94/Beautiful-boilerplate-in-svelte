<script lang="ts">
    import { got } from "utils/helpers";
    import Toggle from "utils/Toggle.svelte";

    let page = 2
    let limit = 1;
    let offset = limit * (page-1);
    let testToggle: boolean = false;


    const handleToggle = () => {
        testToggle = !testToggle;
    }


    const test = async () => {
        let params = {
            limit,
            offset
        }

        const response = await got("/user/all", "POST", params)
        console.log(response)
        if(response.ststue == 1) location.reload();
    }
</script>
<div class="content">
    <Toggle toggle={testToggle} {handleToggle}/>

    <button on:click={test}>
        테스트
    </button>
</div>