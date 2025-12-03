<script>
    import {onMount} from 'svelte'
    import Emotion from '../lib/Emotions.svelte'
    import Icons from  '../lib/Icons.svelte'
    import {emotion, colors, texts} from '../store.js'

    let offsetX = 0, offsetY = 0, timeout
    export let goto
    onMount(() =>{
        window.addEventListener('touchmove', (e) => {
            let x = e.touches[0].pageX - window.innerWidth/2;
            let y = e.touches[0].pageY - window.innerHeight/2; //mouse position relative to the center - now its like a 2D plane

            offsetX = x * 1.5;
            offsetY = y * 1.5;
            clearTimeout(timeout);
            
            timeout = setTimeout(() => {            
                offsetX += 50;
                offsetY += 50;
            }, 100);
        })
    })

</script>

<main>
    <div class = 'w-[475px] h-screen bg-black overflow-hidden relative p-4'>
        <div class = 'w-full h-1/7 flex flex-row justify-between items-start text-white relative z-1'>
            <button class = 'cursor-pointer' on:click={() => goto('screen2')}>
                <Icons icon = 'material-symbols-light:close-rounded' opacity = {80} width = {8} height = {8} />
            </button>
            <div class = 'flex flex-row'>
                <Icons icon = 'material-symbols-light:question-mark-rounded' opacity = {80} width = {8} height = {8} />
                <Icons icon = 'material-symbols-light:search-rounded' opacity = {80} width = {8} height = {8} />
            </div>
        </div>
        <div class = 'absolute transition-transform left-1/2 top-1/2 duration-1000 ease-out' style = 'transform: translate(calc(-50% + {offsetX}px), calc(-50% + {offsetY}px))'>
            <Emotion {offsetX} {offsetY} />
        </div>
        <div class = 'w-[450px] h-[100px] bg-gray-800 opacity-98 rounded-full absolute bottom-5 left-0 right-0 mx-auto flex flex-row justify-between items-center pb-5 pt-5 pl-10 pr-2'>
            <div class = 'text-md'>
                <p style = "color: {$colors}" class = 'font-bold text-lg'>{$emotion}</p>
                <p class = 'text-white'>{$texts}</p>
            </div>
            <button class = 'cursor-pointer' 
                on:click={() => {
                    goto('screen4')
                }}>
                <Icons icon = 'material-symbols-light:arrow-forward-rounded' size = {20} opacity = {100} fill = '#ffffff' />
            </button>
        </div>
    </div>
</main>