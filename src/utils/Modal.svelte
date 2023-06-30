<script lang="ts">
    export let title: string; 
    export let visible: boolean;
    export let handleVisible: Function;

    let animation: boolean;
    let showModal: boolean = false;
    let blockModal: boolean = false;

    const handleIntro = (): void => {
        animation = true;
        showModal = true;
        blockModal = false;
    };

    const handleOutro = (): void => {
        if(showModal == true && blockModal == false) {
            blockModal = true
            animation = false
            setTimeout(()=>{
                showModal = false
                handleVisible();
            }, 300);
        }
    };

    const handleShowModalOutro = (): void => {
        if(showModal == true) {
            animation = false
            setTimeout(()=>{
                showModal = false
            }, 300);
        }
    };

    $: if(visible === true){
        handleIntro()
    } else if (visible === false) {
        handleShowModalOutro()
    }
</script>

{#if showModal}
<div class="modal">
    <div
        class="modal__cover {animation === false ? "inactive" : ""}"
        on:click={handleOutro}
        on:keypress={handleOutro}
    ></div>
    <div 
        class="modal__contents {animation === false ? "inactive" : ""}"
    >   
        <div class="modal__contents__header">
            <div class="modal__contents__header__title">{title}</div>
            <i class="fa-solid fa-xmark modal__contents__header__close"
                on:click={handleOutro}
                on:keypress={handleOutro}
            ></i>
        </div>
        <div class="modal__contents__content">
            <slot />
        </div>
    </div>
</div>
{/if}

<style lang="scss">
    @import "../styles/animation.scss";
    @import "../styles/modal.scss";
</style>
