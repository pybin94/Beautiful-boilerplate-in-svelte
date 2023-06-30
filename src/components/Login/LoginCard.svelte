<script lang="ts">
    import { onMount } from "svelte";
    import { deleteCookie, getCookie, got, setCookie } from "utils/helpers";
    import { popup } from "utils/popup";
    import Toggle from "utils/Toggle.svelte";
    import { handleValidate } from "utils/validator";

    let identity: string;
    let rememberMe: boolean;
    let password: HTMLInputElement;
    let eyeIcon: HTMLElement;
    let passwordWrap: HTMLElement;
    let slider: HTMLElement;
    let thumb: HTMLElement;
    let captcha: boolean = false;
    let activeEvent: boolean = false;

    onMount(()=>{
        let rememberMeValue = getCookie("rememberMe");
        if ( rememberMeValue ) {
            rememberMe = true;
            identity = rememberMeValue
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

    export const handleSignin = async (identity: string, password: string, rememberMe: boolean): Promise<void> => {
        if(captcha == false) return popup("Slide Me를 밀어주세요.", 0)

        let params = {
            identity,
            password,
            captcha,
        }

        const response = await got("/signin", "POST", params);

        if (response.status === 1) {
            rememberMe == true
            ? setCookie("rememberMe", identity)
            : deleteCookie("rememberMe")
            setCookie("adminInfo", JSON.stringify(response.data))
            location.reload();
        } else {
            thumb.style.left = 42 - slider.offsetWidth  + 'px';
            captcha = false;
            activeEvent = false;
            popup("회원 정보가 올바르지 않습니다.", 0)
        }
    }

    const checkRememberMe = (): void => {
        rememberMe = !rememberMe
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

    const handleDrag = (e: any) => {
        e.preventDefault();
        if(captcha == true) return;
        if(activeEvent == false) return;

        let shiftX = e.clientX - slider.getBoundingClientRect().left;
        let rightEdge = slider.offsetWidth - 22;
        let newLeft = e.clientX - shiftX - slider.getBoundingClientRect().left;

        if (shiftX <= 22) {
            shiftX = 22;
        }

        if (shiftX >= rightEdge) {
            shiftX = rightEdge;
            captcha = true;
        }

        thumb.style.left = shiftX - slider.offsetWidth + 22 + 'px';
    }

    const handleDragStart = (e: any) => {
        activeEvent = true;
        document.addEventListener("mousemove", (e) => {
            handleDrag(e)
        })
    }

    const handleDragEnd = (e: any) => {
        activeEvent = false;        
        document.removeEventListener('mousemove', (e) => {
            handleDrag(e)
        })
        if(captcha == false) thumb.style.left = 42 - slider.offsetWidth  + 'px';
    }

    const handleTouch = (e: any) => {
        let touchLocation = e.targetTouches[0]
        if(captcha == true) return;
        if(activeEvent == false) return;

        let shiftX = Math.floor((touchLocation.pageX - 50))
        let rightEdge = slider.offsetWidth - 22;

        if (shiftX <= 22) {
            shiftX = 22;
        }

        if (shiftX >= rightEdge) {
            shiftX = rightEdge;
            captcha = true;
        }

        thumb.style.left = shiftX - slider.offsetWidth + 22 + 'px';
    }

    const handleTouchStart = () => {
        activeEvent = true;
    }

    const handleTouchEnd = () => {
        activeEvent = false;
        if(captcha == false) thumb.style.left = 42 - slider.offsetWidth  + 'px';
    }
</script>
<article class="login content" on:selectstart={(e)=>{e.preventDefault()}}>
    <div class="login__title">
        <img class="login__title__logo" src="/src/assets/logo.png" alt="">
        <p class="login__title__text">{process.env.SITENAME}</p>
    </div>
    <form class="login__form" on:submit|preventDefault={()=>{handleSignin(identity, password.value, rememberMe)}}>
        <p class="login__form__text">User ID</p>
        <input 
            class="login__form__id" 
            type="text" 
            required 
            placeholder="User ID"
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
        <p>Slide Me</p>
        <div class="login__form__captcha" bind:this={slider}>
            <p class="login__form__captcha__text">옆으로 밀어주세요.</p>
            <div 
                id="thumb"
                class="login__form__captcha__slider"
                bind:this={thumb}
                on:mousedown={(e)=>{handleDragStart(e)}}
                on:mouseup={(e)=>{handleDragEnd(e)}}
                on:touchstart={(e)=>{handleTouchStart()}}
                on:touchmove={(e)=>{handleTouch(e)}}
                on:touchend={(e)=>{handleTouchEnd()}}
            >
                <div class="login__form__captcha__slider__button">
                    <i class="fa-solid fa-angles-right"></i>
                </div>
            </div>
        </div>
        <div class="login__form__remember-me">
            <Toggle toggle={rememberMe} handleToggle={checkRememberMe}/>
            <p>Remember Me</p>
        </div>
        <button type="submit">Log In</button>
    </form>
</article>

<style lang="scss">
    @import "./LoginCard.scss";
</style>