<script lang="ts">
  import { Router, Route} from "svelte-routing";

  import Layout from 'pages/Layout/Layout.svelte';
  import Login from "pages/Login/Login.svelte";
  import Dashboard from "pages/Dashboard/Dashboard.svelte"
  import UserList from "pages/UserList/UserList.svelte";
  import UserCreate from "pages/UserCreate/UserCreate.svelte";
  import AdminList from "pages/AdminList/AdminList.svelte";
  import Test from "pages/Test.svelte";
  import { getCookie } from "utils/helpers";
  import AdminCreate from "pages/AdminCreate/AdminCreate.svelte";
  
  document.title = process.env.SITENAME

  let hasCookie: boolean;
  getCookie("user") ? hasCookie = true : hasCookie = false;
</script>

{#if !hasCookie}
  <Router basepath="/">
      <Route path="/*"><Login /></Route>
  </Router>
{:else}
  <Router basepath="/">
    <Layout>
      <Route path="/" name="dashboard"><Dashboard /></Route>
      <Route path="/user/create" name="UserCreate"><UserCreate/></Route>
      <Route path="/user/list"><UserList/></Route>
      <Route path="/admin/create"><AdminCreate /></Route>
      <Route path="/admin/list"><AdminList/></Route>
      <Route path="/test"><Test /></Route>
      <Route path="/*"><Dashboard /></Route>
    </Layout>
  </Router>
{/if}

<style lang="scss">
  @import "./App.scss";
</style>