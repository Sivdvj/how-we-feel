<script>
    import { colors, emotion, texts} from "../store";

    function getColor(i, j){
        if(i < 6 && j < 6) return '#ffa500';
        else if(i < 6 && j < 12) return '#ffda03';
        else if(i >= 6 && j < 6) return '#90d5ff';
        else return '#83f28f';
    }

    export let offsetX;
    export let offsetY;

    let t

    function getClosestToCenter(offsetX, offsetY) {
        const gridCenterX = 600;
        const gridCenterY = 600;
        

        const targetX = gridCenterX - offsetX;
        const targetY = gridCenterY - offsetY;

        const closestI = Math.max(0, Math.min(11, Math.floor(targetY / 100))); //max and min so that it stays within the range 0 to 11
        const closestJ = Math.max(0, Math.min(11, Math.floor(targetX / 100)));
     
        return {i: closestI, j: closestJ};
    }

    function getText(i, j){
        if(i < 6 && j < 6){
            t = 'feeling annoyed'
            return 'angry'
        }
        else if(i < 6 && j < 12){
            t = 'feeling ecstatic'
            return 'happy'
        }
        else if(i >= 6 && j < 6){
            t = 'feeling depressed'
            return 'sad'
        }else{
            t = 'feeling loved'
            return 'loved'
        }
    }

    $:closest = getClosestToCenter(offsetX, offsetY);  //state - so that UI keeps updating - when canvas moves the parent passes the offset to the child
    $:if (closest){
        let text = getText(closest.i, closest.j)
        let color = getColor(closest.i, closest.j)
        // localStorage.setItem("Emotion", text)
        // localStorage.setItem("Color", color) 
        // localStorage.setItem("Text", t)
        texts.set(t)
        emotion.set(text)
        colors.set(color)
    }


</script>

<div class = 'grid grid-cols-12 w-[1200px] h-[1200px]'>
    {#each {length : 12}, i}
        {#each {length : 12}, j}
            <svg class = 'size-[100px]' viewBox = '0 0 24 24'>
                {#if i === closest.i && j === closest.j}
                    <rect x = '0' y = '0' width = '24' height = '24' fill = {getColor(i, j)} />
                {:else}
                    <circle cx = '12' cy = '12' r = '12' fill = {getColor(i, j)} />
                {/if}
                <text x='50%' y='50%' font-size='5' font-family='serif' text-anchor='middle' dominant-baseline='middle'>
                    {getText(i, j)}
                </text>
            </svg>
        {/each}
    {/each}
</div>