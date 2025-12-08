<script>
    import {onMount} from 'svelte'
    import Ecomp1 from './Ecomp1.svelte'
    import { request } from './Auth';
    
    let data = {}
    onMount(async () => {
        data = await request("/data")
        data = data.Emotion
    })
    function getImage(color){
        if(color == "#ffa500") return "src/assets/1.png"
        else if(color == "#83f28f") return "src/assets/2.png"
        else if(color == "#90d5ff") return "src/assets/3.png"
        else return "src/assets/4.png"
    }
</script>
<main>
    <div class = 'flex flex-col-reverse'>
        {console.log(data)}
        {#each Object.entries(data) as [id, userdata]}
            <Ecomp1 color={userdata.color} text={userdata.emotion} image={getImage(userdata.color)}/>
        {/each}
    </div>
</main>
