<script>
    import Plus from "@iconify-svelte/material-symbols-light/add-2-rounded"
    import Data from "@iconify-svelte/material-symbols-light/bar-chart-rounded"
    import Tools from "@iconify-svelte/material-symbols-light/arrows-more-down-outline-rounded"
    import Ppl from "@iconify-svelte/material-symbols-light/group-outline-rounded"
</script>
<div class = 'flex flex-row justify-between items-end h-full w-full text-white text-sm pl-5 pr-5 pb-3'>
    <div class = 'flex flex-col justify-between items-center opacity-100'>
        <Plus class ='w-10 h-10' />
        <p>Check in</p>
    </div>
    <div class = 'flex flex-col justify-between items-center opacity-60'>
        <Tools class = 'w-10 h-10' />
        <p>Tools</p>
    </div>
    <div class = 'flex flex-col justify-between items-center opacity-60'>
        <Ppl class = 'w-10 h-10' />
        <p>Friends</p>
    </div>
    <div class = 'flex flex-col justify-between items-center opacity-60'>
        <Data class = 'w-10 h-10'/>
        <p>Analyze</p>
    </div>
</div>