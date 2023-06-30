<script lang="ts">
    import LoginCard from "components/Login/LoginCard.svelte";
    if(location.pathname !== "/") {
        location.href = "/"
    }
</script>
<LoginCard />
<style lang="scss">
    @import "./Login.scss";
</style>