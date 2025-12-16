<script>
    import {onMount} from 'svelte'
    import Ecomp1 from './Ecomp1.svelte'
    import { request } from './Auth';
    
    let data = {}
    onMount(async () => {
        data = await request("/data")
        data = data.Emotion
    })
    
    // TODO: change image paths based on color
    function getImage(color){
        if(color == "#ffa500") return "assets/1.png"
        else if(color == "#83f28f") return "assets/2.png"
        else if(color == "#90d5ff") return "assets/3.png"
        else return "assets/4.png"
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
