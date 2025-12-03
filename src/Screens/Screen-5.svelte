<script>
    import Icon from '../lib/Icons.svelte'
    import ThreeParticles from '../lib/ThreeParticles.svelte';
    export let goto
</script>
<main>
    <div class = 'w-[475px] p-4 h-screen bg-black overflow-hidden relative'>
        <div class = 'absolute inset-0 z-0 pointer-events-none opacity-60 blur-md'>
            <ThreeParticles />
        </div>
        <div class = 'relative z-10 flex flex-col justify-between h-full'>
            <div class = 'w-full text-white flex flex-row justify-between items-center sticky mb-5 -ml-2'>
                <button class = 'cursor-pointer' on:click={() => goto('screen4')}>
                    <Icon icon = 'material-symbols-light:close-rounded' showCircle = {false} />
                </button>
                <div class = 'flex flex-row -mr-2'>
                    <Icon icon = 'material-symbols-light:ink-pen-rounded' showCircle = {false} height = {10}/>
                    <div class = 'text-yellow-400'>
                        <Icon icon = 'material-symbols-light:pentagon-rounded' showCircle = {false} height = {10} />
                    </div>
                </div>
            </div>
            <div class = 'text-white font-serif font-bold text-center'>
                <p>Describe what might be causing you to feel</p>
                <p style = "color: {localStorage.getItem('Color')}" class = 'text-xl font-extrabold'>{localStorage.getItem("Emotion")}</p>
            </div>
            <div class = ' text-white flex flex-row justify-between items-start'>
                <div class = 'flex flex-row'>
                    <Icon icon = 'material-symbols-light:mic' fill = '#242424' size = {20} width = {8} height = {8} />
                    <Icon icon = 'weui:camera-outlined' fill = '#242424' size = {20} width = {8} height = {8} />
                    <Icon icon = 'octicon:sparkle-24' fill = '#242424' size = {20} width = {8} height = {8} />
                </div>
                <button class='text-black cursor-pointer' on:click={() => goto('screen6')}>
                    <Icon icon = 'material-symbols-light:arrow-forward-rounded' fill = '#ffffff' size = {20} />
                </button>
            </div>
        </div>
    </div>
</main>
