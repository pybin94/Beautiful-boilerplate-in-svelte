<script>
    const addContentsSpeed = 3000;

    let response = [{
        "idx": 109,
        "productName": "써큘레이터 거실용 리모컨 선풍기",
        "originPrice": "59,900",
        "discountPrice": "45,520",
        "discountRate": "24%",
        "rating": 4.0,
        "reviewCount": 172
    }]

    let addData = [{
        "idx": 999,
        "productName": "foo",
        "originPrice": "59,900",
        "discountPrice": "45,520",
        "discountRate": "24%",
        "rating": 4.0,
        "reviewCount": 172
    }]

    setInterval(()=>{
        response = [...addData, ...response]
    }, addContentsSpeed)


</script>
<ul>
    {#if response}
        {#each response as item}
            <li>{item["idx"]}</li>
            <li>{item["productName"]}</li>
            <li>{item["originPrice"]}</li>
            <li>{item["discountPrice"]}</li>
        {/each}
    {/if}
</ul>