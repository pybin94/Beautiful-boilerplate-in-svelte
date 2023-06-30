<script lang="ts">
    import { got } from "utils/helpers";
    import { popup } from "utils/popup";
    import Radio from "utils/Radio.svelte";
    import Toggle from "utils/Toggle.svelte";

    let page = 1
    let limit = 1;

    let list = ["받은 쪽지", "보낸 쪽지"];
    let radioValue = 0;
    const handleRadioValue = (setIndex: number) => {
        radioValue = setIndex;
        // console.log(radioValue)
    }
    
    const test = async () => {
        // popup(" asdf", 1, 
        // (data)=> {
        //     console.log(data)   
        // }
        // );
        

        const response = await got("/admin/create", "POST", {})
        console.log(response.data)
    }

</script>
<div class="content">
    <button on:click={test}>
        테스트
    </button>
</div>
<label for="">에이전트 이름</label>
<input type="text" disabled >
<Radio radioList={list} {handleRadioValue} />