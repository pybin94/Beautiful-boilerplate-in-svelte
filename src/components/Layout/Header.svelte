<script lang="ts">
  import { Link } from "svelte-routing"
  import { got } from "lib/tools";

  let toggleUserModal: boolean = false;
  
  const showUserModal = (): void => {
    toggleUserModal === true ? toggleUserModal = false : toggleUserModal = true;
  }

  const signOut = async () => {
    const response = await got("/signout")
    if(response.ststue == 1) location.reload();
  }
</script>

<header class="header">
    <div class="header__sign">
      <div 
        class="header__sign__button" 
        on:click={signOut}
        on:keypress={signOut}>로그아웃
      </div>
    </div>
</header>
{#if toggleUserModal}
  <!-- <SignIn /> -->
{/if}

<style lang="scss">
    @import "./Header.scss";
</style>
