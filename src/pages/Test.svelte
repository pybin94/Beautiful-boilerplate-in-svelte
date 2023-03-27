<script lang="ts">
    import { got } from "utils/helpers";

    let page = 2
    let limit = 1;
    let offset = limit * (page-1);

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

<button on:click={test}>
    테스트
</button>