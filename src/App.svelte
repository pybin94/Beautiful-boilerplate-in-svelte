<script lang="ts">
  import { Router, Route} from "svelte-routing";
  import { getCookie } from "utils/tools"

  import Layout from 'pages/Layout.svelte';
  import Login from "pages/Login/Login.svelte";
  import Main from "pages/Main/Main.svelte";

  document.title = process.env.SITENAME
  
  let hasCookie:boolean;
  getCookie("auth") ? hasCookie = true : hasCookie = false;

</script>

{#if !hasCookie}
  <Router basepath="/">
      <Route path="/*"><Login /></Route>
  </Router>
{:else}
  <Router basepath="/">
    <Layout>
      <Route path="/"><Main /></Route>
      <Route path="/*"><Main /></Route>
    </Layout>
  </Router>
{/if}

<style lang="scss">
  @import "./App.scss";
</style>