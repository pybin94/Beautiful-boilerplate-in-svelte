<script lang="ts">
    export let treeStructure: Array<any>;
    export let handleSelectAdmin: Function;

    const handleToggleChildren = (e: any) => {
        if(e.target.parentNode.classList.contains("tree-list")){
            e.target.parentNode.classList.toggle("show");
        } else {
            e.target.classList.toggle("show");
        }
    };
    
</script>
{#if treeStructure}
    {#each treeStructure as item}
        <ul 
            class="tree-list" 
            on:click={(e)=>{
                item.children ? handleToggleChildren(e) : undefined;
                handleSelectAdmin(item);
            }}
            on:keypress={(e)=>{
                item.children ? handleToggleChildren(e) : undefined;
                handleSelectAdmin(item);
            }}
        >
            {#if item.children}
                <i class="fa-solid fa-caret-right"></i>
            {:else}
                <i></i>
            {/if}
            
            <button class="fade small tree-list__level">
                등급
            </button>
            <p class="tree-list__identity">{item["identity"]}</p>
        </ul>
        {#if item.children}
            <div class="tree-list__children ">
                <svelte:self treeStructure={item.children} {handleSelectAdmin}/>
            </div>
        {/if}
    {/each}
{/if}
<style lang="scss">
    @import "./TreeList.scss";
</style>