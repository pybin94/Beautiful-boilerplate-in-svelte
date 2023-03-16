<script lang="ts">
    import { got } from "lib/tools";

    let identity: string;
    let password: HTMLInputElement;
    let eyeIcon: any;
    let passwordWrap: any;

    const passwordFocus = () => {
        console.log("sad")
    }

    const revealPassword = () => {
        if(password.type == "text") {
            password.type = "password"
            eyeIcon.classList.add("fa-eye")
            eyeIcon.classList.remove("fa-eye-slash")
        } else {
            password.type = "text"
            eyeIcon.classList.remove("fa-eye")
            eyeIcon.classList.add("fa-eye-slash")
        }
        
        console.log(password.value)
    }

    const handelSubmit = async (): Promise<void> => {
        let params = {
            identity,
            password: password.value
        }

        const response = await got("/signin", "POST", params);
        console.log(response)
        if (response.status === 1) {
            location.reload();
        } else {
            alert("회원 정보가 올바르지 않습니다")
        }
    }
</script>
<article class="login">
    <p class="login__title">MONNALISA</p>
    <form class="login__form" on:submit|preventDefault={handelSubmit}>
        <p class="login__form__text">User ID</p>
        <input class="login__form__id" type="text" bind:value={identity}>
        <p id="password" class="login__form__text">Password</p>
        <div on:focus={passwordFocus} class="login__form__password">
            <input type="password" bind:this={password}>
            <i 
            class="fa-regular fa-eye"
            bind:this={eyeIcon} 
            on:click={revealPassword} 
            on:keydown={revealPassword} 
            ></i>
        </div>
        <button type="submit">Log In</button>
    </form>
</article>

<style lang="scss">
    @import "./Login.scss";
</style>