<script>
    import Settings from "@iconify-svelte/material-symbols-light/settings-outline-rounded"
    import Donate from "@iconify-svelte/material-symbols-light/heart-plus-outline"
    import Icons from "./Icons.svelte"
    export let goto
</script>

<div class = 'w-full h-full flex flex-col p-y-0'>
    <div class = 'w-full h-1/7 flex flex-row justify-between items-start'>
        <div>
            <Settings class = 'h-8 w-8 text-white opacity-70'/>
        </div>
        <div class = 'text-white flex flex-row space-x-10 text-sm'>
            <button class = 'bg-gray-700/50 px-3 py-1 rounded-4xl hover:bg-gray-500/50'>24 emotions</button>
            <button class = 'bg-gray-700/50 px-3 py-1 rounded-4xl hover:bg-gray-500/50'>0 day streak</button>
        </div>
        <div>
            <Donate class = 'h-8 w-8 text-white opacity-70' />
        </div>
    </div>
    <div class = 'w-full h-6/7'>
        <p class = 'text-white font-bold font-serif text-center text-3xl'>How are you feeling<br />this evening?</p>
        <div class = 'h-full flex justify-center items-center relative'>
            <button class='absolute z-10 flex flex-col items-center cursor-pointer' 
                on:click={() => {
                    let curr = localStorage.getItem("currID");
                    curr = curr ? (parseInt(curr) + 1).toString() : '1';
                    localStorage.setItem("currID", curr);
                    
                    goto("screen2");
                }}>
                <Icons icon='material-symbols-light:add-2-rounded' size={12} fill='#ffffff'/>
                <!-- <Settings class = 'h-8 w-8 text-white opacity-70'/> -->
                <div class="w-12 h-12 hidden"></div>
                <p class = 'text-white text-xs'>Check in</p>
            </button>
            <svg class = 'animate-spin size-90 text-white opacity-30 spin-slow' viewBox = '0 0 20 20'>
                <defs>
                    <linearGradient id='grad'>
                        <stop offset = "0%" stop-color = 'white' stop-opacity = 1 />
                        <stop offset = "100%" stop-color = 'white' stop-opacity = 0 />
                    </linearGradient>
                </defs>
                <circle cx = '10' cy = '10' r = '8' stroke = "url('#grad')" stroke-width = '1.3' stroke-dasharray = '62.83' stroke-dashoffset = '31.4' stroke-linecap = 'round' />
            </svg>
        </div>
        
    </div>
</div>

<style>
    .spin-slow {
        animation : spin 7s linear infinite;
    }
</style>