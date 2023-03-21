<script lang="ts">
  import { Link } from "svelte-routing"
  import { got } from "utils/tools";
  import DropDown from "./Modal/DropDown.svelte";
  import { nightMode } from "store/store"
  import { onMount } from "svelte";

  export let sidebarVisible: boolean;
  let toggleUserModal: boolean = false;
  let header: HTMLElement;
  let nightModeIcon: HTMLElement;

  const toggleSignModal = (): void => {
    toggleUserModal === true ? toggleUserModal = false : toggleUserModal = true;
  }

  const handleNightMode = ():void => {
    nightMode.update((value) => !value)
    toggleNightMode()
  }

  const toggleNightMode = (): void => {
    if($nightMode == false) {
      nightModeIcon.classList.remove("fa-regular", "fa-sun");
      nightModeIcon.classList.add("fa-solid", "fa-moon");
    } else {
      nightModeIcon.classList.remove("fa-solid", "fa-moon");
      nightModeIcon.classList.add("fa-regular", "fa-sun");
    }
  }

  onMount(()=>{
    toggleNightMode()
  })

  $: if(header){
    sidebarVisible == true
    ? header.classList.remove("wide")
    : header.classList.add("wide");
  }


</script>

<header class="header" bind:this={header}>
  <i 
    bind:this={nightModeIcon} 
    on:click={handleNightMode} 
    on:keypress={handleNightMode} 
    class="fa-regular fa-sun"
  ></i>
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
