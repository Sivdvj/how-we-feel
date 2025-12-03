<script>
    import PreEmo from '../lib/PreEmo.svelte'
    export let goto
</script>
<main>
    <div class = 'w-[475px] p-4 h-screen bg-black overflow-y-auto scrollbar-hide scroll-smooth'>
        <PreEmo {goto} />
    </div>
</main>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display : none;
    }
</style>