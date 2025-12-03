<script>
    import gradient from '../assets/gradient.jpg'
    import ele from '../assets/ele.png'
    export let color='#ffffff'
    export let text=''
</script>
<div class = 'w-full h-48 rounded-3xl overflow-hidden bg-black flex flex-col justify-between relative'>
    <img src = {gradient} alt = 'gradient' class = 'w-full h-full opacity-40 shrink-0 absolute z-0' />
    <div class = 'p-4 flex flex-row justify-between relative z-1 w-full items-start'>
        <div class = 'font-sans text-sm text-white'>
            <p>Sun Oct 12</p>
            <p>6:21 pm</p>
        </div>
        <div class = 'font-sans text-sm text-white flex flex-row space-x-2'>
            <button class = 'bg-gray-700/50 px-3 py-1 rounded-4xl hover:bg-gray-500/50'>Reflect</button>
            <button class = 'bg-gray-700/50 px-3 py-1 rounded-4xl hover:bg-gray-500/50'>Tools</button>
        </div>
    </div>
    <div class = 'p-4 flex flex-row justify-between relative z-1 w-full items-end'>
        <div class = 'text-xl text-white'>
            <p class = 'italic'>I'm feeling</p>
            <p class = 'font-bold' style='color:{color}'>{text}</p>
        </div>
        <div>
            <img src ={ele} alt = 'element' class = 'w-20 h-20' />
        </div>

    </div>
</div>

<style>

</style>