<script>
    import Ecomp from '../lib/EmotionComp.svelte'
    import Icons from "../lib/Icons.svelte"
    export let goto
    let data = JSON.parse(localStorage.getItem("data"))
</script>
<main>
    <div class = 'w-[475px] p-4 h-screen bg-black overflow-y-auto scrollbar-hide scroll-smooth space-y-5'>
        <button class = 'text-3xl text-white flex justify-center w-full opacity-80' on:click={() => goto('screen1')}>
            <Icons icon = 'material-symbols-light:family-home-outline-rounded' size={20} width={20} height={20} showCircle={false}/>
        </button>
        <Ecomp />

    </div>

</main>
