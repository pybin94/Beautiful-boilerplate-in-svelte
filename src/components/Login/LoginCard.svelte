<script lang="ts">
    import { onMount } from "svelte";
    import { handelSignin } from "./LoginCard.service";
    import { getCookie } from "utils/tools";
    import { handleValidate } from "utils/tools.css";
    let identity: string;
    let rememberMe: boolean;
    let password: HTMLInputElement;
    let eyeIcon: HTMLElement;
    let passwordWrap: HTMLElement;
    let rememberMeLabel: HTMLElement;

    onMount(()=>{
        let rememberMeValue = getCookie("rememberMe");
        if ( rememberMeValue ) {
            rememberMe = true;
            identity = rememberMeValue
            rememberMeLabel.classList.add("active");
        } else {
            rememberMe = false
        }
    })

    const passwordFocus = (): void => {
        passwordWrap.classList.add("focus")
    }

    const passwordBlur = (): void => {
        passwordWrap.classList.remove("focus");
        if (!password.value) {
            password.classList.add("invalid");
            passwordWrap.classList.add("invalid");
        } else {
            password.classList.remove("invalid");
            passwordWrap.classList.remove("invalid");
        }
    }

    const checkRememberMe = (): void => {
        rememberMeLabel.classList.toggle("active");

        rememberMe == true
        ? rememberMe = false
        : rememberMe = true;
    }

    const revealPassword = (): void => {
        if(password.type == "text") {
            password.type = "password"
            eyeIcon.classList.add("fa-eye")
            eyeIcon.classList.remove("fa-eye-slash")
        } else {
            password.type = "text"
            eyeIcon.classList.remove("fa-eye")
            eyeIcon.classList.add("fa-eye-slash")
        }
    }

</script>
<article class="login">
    <div class="login__title">
        <img class="login__title__logo" src="/src/assets/logo.png" alt="">
        <p class="login__title__text">{process.env.SITENAME}</p>
    </div>
    <form class="login__form" on:submit|preventDefault={()=>{handelSignin(identity, password.value, rememberMe)}}>
        <p class="login__form__text">User ID</p>
        <input 
            class="login__form__id" 
            type="text" 
            required 
            placeholder=""
            bind:value={identity}
            on:blur={(e)=>{handleValidate(e)}}
            on:keypress={(e)=>{handleValidate(e)}}
        >
        <p id="password" class="login__form__text">Password</p>
        <div class="login__form__password" bind:this={passwordWrap}>
            <input 
                type="password" 
                required 
                placeholder="Password"
                bind:this={password} 
                on:blur={passwordBlur} 
                on:focus={passwordFocus}
            >
            <i 
                class="fa-regular fa-eye"
                bind:this={eyeIcon} 
                on:click={revealPassword} 
                on:keypress={revealPassword} 
            ></i>
        </div>
        <div class="login__form__remember-me">
            <input id="rememberMe" type="checkbox" on:click={checkRememberMe} >
            <label for="rememberMe" bind:this={rememberMeLabel}>Remember Me</label>
        </div>
        <button type="submit">Log In</button>
    </form>
</article>

<style lang="scss">
    @import "./LoginCard.scss";
</style>