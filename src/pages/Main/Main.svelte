<script lang="ts">
    import { link } from 'svelte-routing';

    let toggleStatus: number = 0;

</script>
    <button>sad</button>
    <h1 class="text-4xl font-bold my-8">MAIN</h1>
    <a
    use:link
    href="/minigame"
    >
    게임하기
    </a>

<style lang="scss">
    @import "./main.scss";
</style>