<script>
    import {onMount} from 'svelte'
    import Emotion from '../lib/Emotions.svelte'
    import Icons from  '../lib/Icons.svelte'
    import {emotion, colors, texts} from '../store.js'

    let offsetX = 0, offsetY = 0, timeout
    export let goto
    onMount(() =>{
        let prevX = 0, prevY = 0
        window.addEventListener('touchstart', (e) => {
            prevX = e.touches[0].pageX;
            prevY = e.touches[0].pageY;
        })
        window.addEventListener('touchmove', (e) => {
            let x = e.touches[0].pageX;
            let y = e.touches[0].pageY;
            
            let deltaX = x - prevX;
            let deltaY = y - prevY;
            
            offsetX += deltaX;
            offsetY += deltaY;
            
            prevX = x;
            prevY = y;

            if(offsetX > 600) offsetX = 600;
            if(offsetX < -600) offsetX = -600;
            if(offsetY > 600) offsetY = 600;
            if(offsetY < -600) offsetY = -600;     
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
        <div class = 'absolute left-1/2 top-1/2' style = 'transform: translate(calc(-50% + {offsetX}px), calc(-50% + {offsetY}px))'>
            <Emotion {offsetX} {offsetY} />
        </div>
        <div class = 'w-[450px] h-[100px] bg-gray-800 opacity-98 rounded-full absolute bottom-5 left-0 right-0 mx-auto flex flex-row justify-between items-center pb-5 pt-5 pl-10 pr-2'>
            <div class = 'text-md'>
                <p style = "color: {$colors}" class = 'font-bold text-lg'>{$emotion}</p>
                <p class = 'text-white'>{$texts}</p>
            </div>
            <button class = 'cursor-pointer' 
                on:click={() => {
                    localStorage.setItem("Emotion", ($emotion))
                    localStorage.setItem("Color", ($colors))
                    localStorage.setItem("Text", ($texts))
                    goto('screen4')
                }}>
                <div class = 'w-20 h-20 hidden'></div>
                <Icons icon = 'material-symbols-light:arrow-forward-rounded' size = {20} opacity = {100} fill = '#ffffff' />
            </button>
        </div>
    </div>
</main>