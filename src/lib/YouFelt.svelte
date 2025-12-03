<script>
    export let buttons = []

    function toggleColor(index){
    }
</script>

<div class = 'flex flex-wrap space-x-1 space-y-2 justify-start items-start py-5'>
    {#each buttons as i}
        <button class = 'text-white text-[15px] bg-gray-700/50 px-6 py-3 rounded-full hover:bg-gray-500/50' on:click={() => {toggleColor()}}>{i}</button>
    {/each}
</div>