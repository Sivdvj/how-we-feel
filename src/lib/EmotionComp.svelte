<script>
    import Ecomp1 from './Ecomp1.svelte'
    let data = JSON.parse(localStorage.getItem("data")) || []
</script>
<main>
    <div class = 'space-y-4'>
        {#each Object.entries(data) as [id, userdata]}
            <Ecomp1 color={userdata.color} text={userdata.emotion}/>
        {/each}
    </div>
</main>
