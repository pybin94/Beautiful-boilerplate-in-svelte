<script lang="ts">
    export let toggle: boolean;
    export let handleToggle: any;


</script>
    <div 
        class="slider-toggle  {toggle === true ? "active" : ""}"
        on:click={handleToggle}
        on:keypress={handleToggle}
    >
        <div class="slider-toggle__button"></div>
    </div>
<style lang="scss">
   @import "../styles/toggle.scss";
</style>