<script>
    import Icons from "../lib/Icons.svelte"
    import {onMount} from 'svelte'
    import { request } from "../lib/Auth";
    export let goto

    let data = {}
    onMount(async () => {
        let res = await request('/sessions')
        data = res.list
        console.log(data)
    })

</script>
<main>
    <div class = 'w-[475px] p-4 h-screen bg-black overflow-y-auto scrollbar-hide scroll-smooth space-y-5'>
        <div class = 'w-full flex flex-row justify-between items-start'>
            <button class='text-white opacity-60 cursor-pointer hover:opacity-100' on:click={() => goto('screen1')}>
                <Icons icon='material-symbols-light:arrow-back-rounded' size={10} showCircle={false} />
            </button>
            <button class='text-black opacity-60 font-serif rounded-3xl cursor-pointer hover:opacity-100 bg-white py-1 px-4' 
                on:click={async() => {
                    await request("/revokeAll")
                    window.location.reload()
                }}>
                Revoke all
            </button>

            <button class='text-white opacity-60 cursor-pointer hover:opacity-100' 
                on:click={async () => {
                    await request("/logout")
                    localStorage.clear()
                }}>
                <div class="w-8 h-8 hidden"></div>
                <Icons icon='solar:logout-outline' size={8} showCircle={false} />
            </button>
        </div>
        <div class = 'w-full flex flex-col-reverse'>
            {#each Object.entries(data) as [id, session]}
                <div class="w-full mb-4 font-serif">
                    <div class="bg-white opacity-85 flex flex-row justify-between rounded-xl p-4">
                        <div class="flex flex-col">
                            <div><strong>Device: </strong>{session.userAgent}</div>
                            <div><strong>Created at:</strong>{new Date(session.createdAt).toLocaleString()}</div>
                            {#if session.isCurrent}
                                <div class="text-green-600 font-bold">(Current Session)</div>
                            {/if}
                        </div>
                        {#if !session.isCurrent}
                            <button class="hover:cursor-pointer bg-gray-200 text-black rounded-3xl py-2 px-4 h-[40px] hover:bg-red-700 hover:text-white" 
                                on:click={async () => {
                                    await request('/revoke', {Sid: session.Sid})
                                    window.location.reload()
                                }}>
                            Revoke</button> 
                        {/if}
                    </div>                   
                </div>
            {/each}
        </div>
    </div>
</main>
