<script>
    import Icon from '../lib/Icons.svelte'
    import ThreeParticles from '../lib/ThreeParticles.svelte';
    import YouFelt from '../lib/YouFelt.svelte'
    export let goto
    let buttons1 = ['Driving', 'Eating', 'Fitness', 'Hobbies', 'Resting', 'Sleeping', 'Studying']
    let buttons2 = ['By Myself', 'Co-workers', 'Family', 'Friends', 'Pets']
    let buttons3 = ['College', 'Commuting', 'Home', 'Outside', 'School', 'Work']
</script>
<main>
    <div class = 'w-[475px] p-4 h-screen bg-black overflow-hidden relative'>
        <div class = 'absolute inset-0 z-0 pointer-events-none opacity-60 blur-md'>
            <ThreeParticles colorParticles = {localStorage.getItem("Color")} />
        </div>
        <div class = 'relative z-10 flex flex-col h-full'>
            <div class = 'w-full text-white flex flex-row justify-between items-center sticky mb-5 -ml-2'>
                <button class = 'cursor-pointer' on:click={() => goto('screen3')}>
                    <Icon icon = 'material-symbols-light:close-rounded' showCircle = {false} />
                </button>
                <div class = 'flex flex-row -mr-2'>
                    <Icon icon = 'material-symbols-light:ink-pen-rounded' showCircle = {false} height = {10}/>
                    <div style = 'color:{localStorage.getItem("Color")}'>
                        <Icon icon = 'material-symbols-light:pentagon-rounded' showCircle = {false} height = {10} />
                    </div>
                </div>
            </div>
            <div class = 'w-full h-1/7 text-3xl text-left font-serif font-semibold'>
                <p class = 'text-white'>What were you doing</p>
                <p class = 'text-white'>when you felt <i style = "color: {localStorage.getItem('Color')}">{localStorage.getItem('Emotion')}</i></p>
            </div>
            <div class = 'flex flex-col'>
                <p class = 'text-white'>Themes</p>
                <YouFelt buttons = {buttons1} />
            </div>
            <div class = 'flex flex-col'>
                <p class = 'text-white'>People</p>
                <YouFelt buttons = {buttons2} />
            </div>
            <div class = 'flex flex-col'>
                <p class = 'text-white'>Places</p>
                <YouFelt buttons = {buttons3} />
            </div>
        </div>
        <button class = 'bottom-4 right-4 absolute z-20 cursor-pointer' on:click={() => goto('screen5')}>
            <Icon icon = 'material-symbols-light:arrow-forward-rounded' size = {20} fill = 'white'/>
        </button>
    </div>
</main>
