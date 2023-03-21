<script lang="ts">
    export let toggleStatus;

    let toggleStateus:boolean = true;

    const handleToggle = (): void => {
        toggleStateus = !toggleStateus;
        console.log(toggleStateus)
    }

    $: toggleStatus, toggleStatus === 1 ? toggleStateus = true : toggleStateus = false;
</script>

<div id="sliderToggle" class="slider-toggle {toggleStateus === true ? "active" : "inactive"}">
    <span class="label">ON</span>
    <div class="slider">
        <button id="toggle" class="toggle" on:click={handleToggle}>
            <span class="grip"></span>
        </button>
    </div>
    <span class="label">OFF</span>
</div>

<style lang="scss">
    .slider-toggle {
        position: absolute;
        top: 50%; 
        left: 0; 
        right: 0;
        height: 32px;
        margin-top: -16px;
        line-height: 32px;

        .slider {
            position: absolute;
            display: inline-block;
            background: gray;
            left: 50%;
            width:80px; 
            height:32px;
            margin-left: -40px;
            border-radius: 4px;
            cursor: pointer;
            box-shadow:
                0 1px 0 rgba(255,255,255,.5),
                inset 0 4px 0 rgba(0,0,0,.2);

            .toggle {
                position: absolute;
                top:-4px; 
                left:4px;
                width: 32px;
                border-radius: 4px;
                transition: left .3s;

                .grip {
                    position: absolute;
                    top:50%; left:8px; right:8px;
                    margin-top: -3px;
                    height: 2px;
                    background: rgba(255,255,255,.9);

                    &::before {
                        content: '';
                        position: absolute;
                        top:-4px; left:0;
                        width:100%; height:100%;
                        background: inherit;
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        top:4px; left:0;
                        width:100%; height:100%;
                        background: inherit;
                    }
                }
            }
        }

        &.active {
            .label:first-of-type {
                color: #333;
            }
        }
        &.inactive {
            .toggle {
                left: 44px; 
            }

            .label:last-of-type {
                color: #333;
            }
        }

        .label {
            position: absolute;
            font-family: 'Droid Sans', sans-serif;
            font-size: 14px;
            font-style: italic;
            color: #bbb;
            transition: color .3s;

            &:first-of-type { 
                right:50%; 
                margin-right:50px;
            }

            &:last-of-type { 
                left:50%; 
                margin-left:50px; 
            }
        }
    }
</style>