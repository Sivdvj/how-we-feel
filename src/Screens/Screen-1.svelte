<script>
    import Checkin from '../lib/Checkin.svelte'
    import Navigation from '../lib/Navigation.svelte'
    import Ecomp from '../lib/EmotionComp.svelte'
    export let goto
</script>

<main>
    <div class = 'space-y-20 w-[475px] p-4 h-screen bg-black overflow-y-auto scrollbar-hide scroll-smooth'>
        <div class = 'h-2/3'>
            <Checkin {goto} />
        </div>
        <div class = 'mb-20'>
            <Ecomp />
        </div>
    </div>
    <div class = 'absolute z-10 bottom-0 w-[475px] h-24 bg-gradient-to-t from-black/95 from-60% to-transparent to-100%'>
        <Navigation />
    </div>
</main>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
</style>