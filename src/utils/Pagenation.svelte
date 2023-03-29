<script lang="ts">
    export let fullPage: number;
    export let currentPage: number;
    export let handleGetList: Function;
</script>

<div class="pagenation">
    {#if fullPage}
        <ul>
            <li class="shift first">
                <a href={"#"} class="{currentPage > 1 ? "active" : ""}" on:click={ currentPage > 1 ? ()=>{handleGetList(1)} : null}>
                    <i class="fa-solid fa-angles-left"></i>
                </a>
            </li>
            <li class="shift">
                <a href={"#"} class="{currentPage > 1 ? "active" : ""}" on:click={ currentPage > 1 ? ()=>{handleGetList(currentPage-1)} : null}>
                    <i class="fa-solid fa-angle-left"></i>
                </a>
            </li>
            {#if fullPage > 4 && currentPage >= 3}
            <li class="shift">
                <a href={"#"}><i class="fa-solid fa-ellipsis"></i></a>
            </li>
            {/if}
            {#if fullPage < 5}
                {#each { length: fullPage } as _, i}
                    <li class="page {currentPage == i+1 ? "active" : ""}">
                        <a href={"#"} on:click={currentPage == i+1 ? null : ()=>{handleGetList(i+1)}}>{i+1}</a>
                    </li>
                {/each}
            {:else}
                {#if currentPage <= 2} 
                    <li class="page {currentPage == 1 ? "active" : ""}">
                        <a href={"#"} on:click={currentPage == 1 ? null : ()=>{handleGetList(1)}}>1</a>
                    </li>
                    <li class="page {currentPage == 2 ? "active" : ""}">
                        <a href={"#"} on:click={currentPage == 2 ? null : ()=>{handleGetList(2)}}>2</a>
                    </li>
                    <li class="page">
                        <a href={"#"} on:click={()=>{handleGetList(3)}}>3</a>
                    </li>
                    <li class="page">
                        <a href={"#"} on:click={()=>{handleGetList(4)}}>4</a>
                    </li>
                {:else if currentPage >= fullPage-1} 
                    <li class="page">
                        <a href={"#"} on:click={()=>{handleGetList(fullPage-3)}}>{fullPage-3}</a>
                    </li>
                    <li class="page">
                        <a href={"#"} on:click={()=>{handleGetList(fullPage-2)}}>{fullPage-2}</a>
                    </li>
                    <li class="page {currentPage == fullPage-1 ? "active" : ""}">
                        <a href={"#"} on:click={currentPage == fullPage-1 ? null : ()=>{handleGetList(fullPage-1)}}>{fullPage-1}</a>
                    </li>
                    <li class="page {currentPage == fullPage ? "active" : ""}">
                        <a href={"#"} on:click={currentPage == fullPage ? null : ()=>{handleGetList(fullPage)}}>{fullPage}</a>
                    </li>
                {:else} 
                    <li class="page">
                        <a href={"#"} on:click={()=>{handleGetList(currentPage-1)}}>{currentPage-1}</a>
                    </li>
                    <li class="page active">
                        <a href={"#"} on:click={()=>{handleGetList(currentPage)}}>{currentPage}</a>
                    </li>
                    <li class="page">
                        <a href={"#"} on:click={()=>{handleGetList(currentPage+1)}}>{currentPage+1}</a>
                    </li>
                {/if}
            {/if}
            {#if fullPage >= 5 && currentPage <= fullPage-2}
            <li class="shift">
                <a href={"#"}><i class="fa-solid fa-ellipsis"></i></a>
            </li>
            {/if}
            <li class="shift">
                <a href={"#"} class="{currentPage < fullPage ? "active" : ""}" on:click={ currentPage < fullPage ? ()=>{handleGetList(currentPage+1)} : null}>
                    <i class="fa-solid fa-chevron-right"></i>
                </a>
            </li>
            <li class="shift last">
                <a href={"#"} class="{currentPage < fullPage ? "active" : ""}" on:click={ currentPage < fullPage ? ()=>{handleGetList(fullPage)} : null}>
                    <i class="fa-solid fa-angles-right"></i>
                </a>
            </li>
        </ul>
    {/if}
</div>

<style lang="scss">
    @import "../styles/pagenation.scss";
</style>