<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let visible: boolean;
    export let handleVisible: Function;
    export let title: string;

    let cover: HTMLDivElement;
    let contents: HTMLDivElement;

    const handleInOutro = (): void => {
        cover.classList.add("inactive");
        contents.classList.add("inactive");
        setTimeout(()=>{
            if(visible){
                handleVisible()
            }
        }, 500);
    };

</script>

{#if visible}
<div class="modal">
    <div
        class="modal__cover"
        bind:this={cover}
        on:click={handleInOutro}
        on:keypress={handleInOutro}
    ></div>
    <div 
        class="modal__contents"
        bind:this={contents}
    >   
        <div class="modal__contents__header">
            {title}
            <i class="fa-solid fa-xmark modal__contents__header__close"
                on:click={handleInOutro}
                on:keypress={handleInOutro}
            ></i>
        </div>
        <div class="modal__contents__body">
            <slot name="body"/>
        </div>
        <div class="modal__contents__footer">
            <slot name="footer"/>
        </div>
    </div>
</div>
{/if}
<style lang="scss">
    @import "../styles/modal.scss";
</style>
