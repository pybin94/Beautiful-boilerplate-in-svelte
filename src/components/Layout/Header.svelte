<script lang="ts">
  import { Link } from "svelte-routing"
  import { got } from "lib/tools";
  import DropDown from "./Modal/DropDown.svelte";

  let toggleUserModal: boolean = false;
  
  const toggleSignModal = (): void => {
    toggleUserModal === true ? toggleUserModal = false : toggleUserModal = true;
  }

</script>

<header class="header">
  <i class="fa-regular fa-sun"></i>
  <!-- <i class="fa-solid fa-moon"></i> -->
  <div class="header__sign">
    <p>유저 이름</p>
    <p>유저 권한</p>
  </div>
  <img 
    on:click={toggleSignModal}
    on:keypress={toggleSignModal}
    class="header__profile-icon" 
    src="/src/assets/icon/profile.png" 
    alt="프로필 이미지"
  >
  {#if toggleUserModal}
    <DropDown />
  {/if}
</header>
{#if toggleUserModal}
  <!-- <SignIn /> -->
{/if}

<style lang="scss">
    @import "./Header.scss";
</style>
