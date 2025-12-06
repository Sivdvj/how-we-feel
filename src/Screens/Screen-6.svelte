<script>
    import Icon from '../lib/Icons.svelte'
    import ThreeParticles from '../lib/ThreeParticles.svelte';
    export let goto


</script>
<main>
    <div class = 'w-[475px] p-4 h-screen bg-black overflow-hidden relative'>
        <div class = 'absolute inset-0 z-0 pointer-events-none opacity-60 blur-md'>
            <ThreeParticles colorParticles = {localStorage.getItem("Color")} />
        </div>
        <div class = 'flex flex-col w-full h-full relative z-10'>
            <div class = 'w-full flex flex-row justify-between text-white'>
                <button class = 'cursor-pointer' on:click={() => goto('screen5')}>
                    <Icon icon = 'material-symbols-light:arrow-back-rounded' showCircle = {false} />
                </button>
                <Icon icon = 'mdi-light:paperclip' showCircle = {false} height = {8} />
            </div>
            <div class = ' py-5 text-white font-bold font-serif text-4xl'>
                <p>Time, weather,</p>
                <p>sleep & exercise</p>
            </div>
            <div class = 'grid grid-cols-3 grid-rows-3 text-white gap-2 py-8'>
                <div class = 'col-span-3 flex flex-row justify-between items-center  bg-gray-700/40 rounded-full p-8'>
                    <p>October 23, Thursday<br />12:57 pm</p>
                    <Icon icon = 'mdi-light:calendar' showCircle = {false} />
                </div>
                <div class = 'row-span-2 flex flex-col justify-between items-center  bg-gray-700/40 rounded-full p-8 text-center'>
                    <Icon icon = 'ion:cloud-outline' showCircle = {false} />
                    <p>Weather<br/><span class = 'text-sm'>31&deg;C</span></p>
                </div>
                <div class = 'row-span-2 flex flex-col justify-between items-center  bg-gray-700/40 rounded-full p-8 text-center'>
                    <Icon icon = 'solar:moon-sleep-linear' showCircle = {false} height = {8} />
                    <p>Sleep<br/><span class = 'text-sm'>0 min</span></p>
                </div>
                <div class = 'row-span-2 flex flex-col justify-between items-center  bg-gray-700/40 rounded-full p-8 text-center'>
                    <Icon icon = 'tabler:run' showCircle = {false} />
                    <p>Steps<br/><span class = 'text-sm'>603 steps</span></p>
                </div>
            </div>
            <div class = 'grid grid-cols-7 grid-rows-1 text-white gap-2 mt-auto'>
                <button class = 'col-span-6 text-center bg-white/80 text-black p-4 rounded-full font-semibold hover:bg-gray-100/60 cursor-pointer' 
                    on:click={async () => {
                        let emo = localStorage.getItem("Emotion")
                        let color = localStorage.getItem("Color")
                        let Id = localStorage.getItem("currID")
                        try{
                            await fetch("http://localhost:3000/save", {
                            method : "POST",
                            headers : {"Content-Type" : "application/json"},
                            body : JSON.stringify({Id, emo, color})
                            })
                        } catch (err){
                            console.error("Fetch Failed", err)
                        }
                        goto('screen7')
                    }}
                >
                    <p>Save</p>
                </button>
                <div class = 'rounded-full flex items-center justify-center text-yellow-100' style = 'background-color:{localStorage.getItem("Color")}'>
                    <Icon icon = 'fluent:people-48-regular' showCircle = {false} size = {10} />
                </div>
            </div>
        </div>

    </div>
</main>
