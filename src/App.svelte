<script lang="ts">
  import { Router, Route} from "svelte-routing";
  import { lightMode } from "stores/store";
  import { getCookie } from "utils/helpers";

  import Layout from 'pages/Layout/Layout.svelte';
  import Login from "pages/Login/Login.svelte";
  import Dashboard from "pages/Dashboard/Dashboard.svelte"
  import UserList from "pages/User/UserList.svelte";
  import UserCreate from "pages/User/UserCreate.svelte";
  import UserNew from "pages/User/UserNew.svelte";
  import AdminList from "pages/Admin/AdminList.svelte";
  import AdminCreate from "pages/Admin/AdminCreate.svelte";
  import AdminTree from "pages/Admin/AdminTree.svelte";
  import HistoryUserTransaction from "pages/History/HistoryUserTransaction.svelte";
  import HistoryUserPoint from "pages/History/HistoryUserPoint.svelte";
  import HistoryAdminTransaction from "pages/History/HistoryAdminTransaction.svelte";
  import HistoryAdminPoint from "pages/History/HistoryAdminPoint.svelte";
  import HistorySiteTransaction from "pages/History/HistorySiteTransaction.svelte";
  import TransactionAdminHistory from "pages/Transaction/TransactionAdminHistory.svelte";
  import TransactionAdminDeposit from "pages/Transaction/TransactionAdminDeposit.svelte";
  import TransactionAdminWithdrawal from "pages/Transaction/TransactionAdminWithdrawal.svelte";
  import TransactionUserDeposit from "pages/Transaction/TransactionUserDeposit.svelte";
  import TransactionUserWithdrawal from "pages/Transaction/TransactionUserWithdrawal.svelte";
  import TransactionUserHistory from "pages/Transaction/TransactionUserHistory.svelte";
  import NoticeAdmin from "pages/Notice/NoticeAdmin.svelte";
  import NoticeUser from "pages/Notice/NoticeUser.svelte";
  import NoticePopup from "pages/Notice/NoticePopup.svelte";
  import NoticeUserMessage from "pages/Notice/NoticeUserMessage.svelte";
  import NoticeAdminMessage from "pages/Notice/NoticeAdminMessage.svelte";
  import SiteSetting from "pages/Setting/SiteSetting.svelte";
  import IpSetting from "pages/Setting/IpSetting.svelte";
  import GameList from "pages/Setting/ThirdpartyList.svelte";
  import HistoryUserThirdparty from "pages/History/HistoryUserThirdparty.svelte";
  import SiteConfigure from "pages/Config/SiteConfigure.svelte";
  import UserBlock from "pages/User/UserBlock.svelte";
  import AdminBlock from "pages/Admin/AdminBlock.svelte";

  import Test from "pages/Test.svelte";  
  import Test2 from "pages/Test2.svelte";

  const init = () => {
    document.title = process.env.SITENAME
  }

  let hasCookie: boolean;
  getCookie("adminInfo") ? hasCookie = true : hasCookie = false;

  $: if($lightMode == "off") {
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
  }

  init()

</script>

{#if !hasCookie}
  <Router basepath="/">
    <Route path="/*"><Login /></Route>
  </Router>
{:else}
  <Router basepath="/">
    <Layout>
      <Route path="/" name="dashboard"><Dashboard /></Route>
      <Route path="/user/create" name="UserCreate"><UserCreate /></Route>
      <Route path="/user/list/*"><UserList /></Route>
      <Route path="/user/new"><UserNew /></Route>
      <Route path="/user/block"><UserBlock /></Route>
      <Route path="/admin/tree"><AdminTree /></Route>
      <Route path="/admin/create"><AdminCreate /></Route>
      <Route path="/admin/list"><AdminList /></Route>
      <Route path="/admin/block"><AdminBlock /></Route>
      <Route path="/transaction/user/deposit"><TransactionUserDeposit /></Route>
      <Route path="/transaction/user/withdrawal"><TransactionUserWithdrawal /></Route>
      <Route path="/transaction/user/history"><TransactionUserHistory /></Route>
      <Route path="/transaction/admin/deposit"><TransactionAdminDeposit /></Route>
      <Route path="/transaction/admin/withdrawal"><TransactionAdminWithdrawal /></Route>
      <Route path="/transaction/admin/history"><TransactionAdminHistory /></Route>
      <Route path="/history/transaction/user"><HistoryUserTransaction /></Route>
      <Route path="/history/point/user"><HistoryUserPoint /></Route>
      <Route path="/history/transaction/admin"><HistoryAdminTransaction /></Route>
      <Route path="/history/point/admin"><HistoryAdminPoint /></Route>
      <Route path="/history/transaction/site"><HistorySiteTransaction /></Route>
      <Route path="/history/thirdparty"><HistoryUserThirdparty /></Route>
      <Route path="/betting/casino"></Route>
      <Route path="/betting/slot"></Route>
      <Route path="/betting/minigame"></Route>
      <Route path="/betting/omissions"></Route>
      <Route path="/notice/user/popup"><NoticePopup /></Route>
      <Route path="/notice/user"><NoticeUser /></Route>
      <Route path="/notice/user/message"><NoticeUserMessage /></Route>
      <Route path="/notice/admin"><NoticeAdmin /></Route>
      <Route path="/notice/admin/message"><NoticeAdminMessage /></Route>
      <Route path="/setting/site"><SiteSetting /></Route>
      <Route path="/setting/ip"><IpSetting /></Route>
      <Route path="/setting/game"><GameList /></Route>
      <Route path="/site/setting"><SiteConfigure /></Route>
      <Route path="/test"><Test2 /></Route>
      <Route path="/*"><Dashboard /></Route>
    </Layout>
  </Router>
{/if}

<style lang="scss">
  @import "./App.scss";
  @import "./styles/popup.scss";
</style>